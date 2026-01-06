// app/services/jwt_service.ts
import jwt from 'jsonwebtoken';
import env from '#start/env';
import User from '#models/user';
import UserToken from '#models/user_token';
import { DateTime } from 'luxon';

interface JWTPayload {
  userId: number;
  email: string;
  role: 'admin' | 'employee';
  companyId: number;
}

export default class JWTService {
  private static JWT_SECRET = env.get('JWT_SECRET');
  private static ROTATION_DAYS = env.get('JWT_ROTATION_DAYS', 30); // Default 30 days

  /**
   * Generate JWT token for user
   */
  static generateToken(user: User): string {
    const payload: JWTPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      companyId: user.companyId,
    };

    // Token never expires (as per requirement)
    return jwt.sign(payload, this.JWT_SECRET);
  }

  /**
   * Verify and decode JWT token
   */
  static verifyToken(token: string): JWTPayload {
    try {
      return jwt.verify(token, this.JWT_SECRET) as JWTPayload;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  /**
   * Create or update user token in database
   */
  static async createOrUpdateToken(user: User): Promise<string> {
    const token = this.generateToken(user);

    // Check if user already has a token
    const existingToken = await UserToken.query()
      .where('user_id', user.id)
      .first();

    if (existingToken) {
      // Check if rotation is needed
      const shouldRotate = await this.shouldRotateToken(existingToken);

      if (shouldRotate) {
        existingToken.token = token;
        existingToken.lastRotatedAt = DateTime.now();
        await existingToken.save();
      }

      return existingToken.token;
    } else {
      // Create new token
      await UserToken.create({
        userId: user.id,
        token: token,
        lastRotatedAt: DateTime.now(),
      });

      return token;
    }
  }

  /**
   * Check if token should be rotated based on rotation days
   */
  static async shouldRotateToken(userToken: UserToken): Promise<boolean> {
    const daysSinceRotation = DateTime.now().diff(
      userToken.lastRotatedAt,
      'days',
    ).days;
    return daysSinceRotation >= this.ROTATION_DAYS;
  }

  /**
   * Rotate token manually (can be called on each login or periodically)
   */
  static async rotateToken(userId: number): Promise<string> {
    const user = await User.findOrFail(userId);
    const newToken = this.generateToken(user);

    const userToken = await UserToken.query()
      .where('user_id', userId)
      .firstOrFail();

    userToken.token = newToken;
    userToken.lastRotatedAt = DateTime.now();
    await userToken.save();

    return newToken;
  }

  /**
   * Get user from token
   */
  static async getUserFromToken(token: string): Promise<User | null> {
    try {
      const payload = this.verifyToken(token);

      // Verify token exists in database
      const userToken = await UserToken.query()
        .where('user_id', payload.userId)
        .where('token', token)
        .first();

      if (!userToken) {
        return null;
      }

      // Get user with company
      const user = await User.query()
        .where('id', payload.userId)
        .where('is_active', true)
        .preload('company')
        .first();

      if (!user || !user.company.isActive) {
        return null;
      }

      // Auto-rotate token if needed
      const shouldRotate = await this.shouldRotateToken(userToken);
      if (shouldRotate) {
        await this.rotateToken(user.id);
      }

      return user;
    } catch (error) {
      return null;
    }
  }

  /**
   * Revoke token (delete from database)
   */
  static async revokeToken(userId: number): Promise<void> {
    await UserToken.query().where('user_id', userId).delete();
  }

  /**
   * Decode token without verification (for debugging)
   */
  static decodeToken(token: string): JWTPayload | null {
    try {
      return jwt.decode(token) as JWTPayload;
    } catch (error) {
      return null;
    }
  }
}
