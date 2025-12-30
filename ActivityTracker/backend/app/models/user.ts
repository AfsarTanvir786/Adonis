import { DateTime } from 'luxon';
import hash from '@adonisjs/core/services/hash';
import { compose } from '@adonisjs/core/helpers';
import {
  BaseModel,
  belongsTo,
  column,
  hasMany,
  hasOne,
} from '@adonisjs/lucid/orm';
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid';
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens';
import type {
  BelongsTo,
  HasMany,
  HasOne,
} from '@adonisjs/lucid/types/relations';
import Company from './company.js';
import UserToken from './user_token.js';
import ImageUpload from './image_upload.js';

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
});

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column({ columnName: 'company_id' })
  declare companyId: number;

  @column()
  declare email: string;

  @column({ serializeAs: null })
  declare password: string;

  @column()
  declare role: 'admin' | 'employee';

  @column({ columnName: 'is_active' })
  declare isActive: boolean;

  @column({ columnName: 'last_login_at' })
  declare lastLoginAt: DateTime | null;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null;

  @belongsTo(() => Company)
  declare company: BelongsTo<typeof Company>;

  @hasOne(() => UserToken)
  declare token: HasOne<typeof UserToken>;

  @hasMany(() => ImageUpload)
  declare imageUploads: HasMany<typeof ImageUpload>;

  static accessTokens = DbAccessTokensProvider.forModel(User);
}
