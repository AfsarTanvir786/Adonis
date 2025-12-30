import app from '@adonisjs/core/services/app';
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http';

export default class HttpExceptionHandler extends ExceptionHandler {
  protected debug = !app.inProduction;

  async handle(error: any, ctx: HttpContext) {
    const { response } = ctx;

    if (error.code === 'E_INVALID_CREDENTIALS') {
      return ctx.response.status(401).send({
        errors: [
          { message: 'Authentication failed: Invalid email or password.' },
        ],
      });
    }

    if (error.code === 'E_ROW_NOT_FOUND') {
      return response.notFound({
        success: false,
        message: 'Resource not found',
      });
    }

    return super.handle(error, ctx);
  }

  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx);
  }
}
