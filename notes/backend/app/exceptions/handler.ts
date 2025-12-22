import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'
import type { StatusPageRange, StatusPageRenderer } from '@adonisjs/core/types/http'

export default class HttpExceptionHandler extends ExceptionHandler {
  protected debug = !app.inProduction

  // Disable HTML status pages for API backend
  protected renderStatusPages = false

  protected statusPages: Record<StatusPageRange, StatusPageRenderer> = {
    '404': (error, { view }) => {
      return view.render('pages/errors/not_found', { error })
    },
    '500..599': (error, { view }) => {
      return view.render('pages/errors/server_error', { error })
    },
  }

  async handle(error: any, ctx: HttpContext) {
    const { response } = ctx

    // Vine validation errors (your main problem)
    if (error.code === 'E_INVALID_CREDENTIALS') {
      return ctx.response.status(401).send({
        errors: [
          { message: 'Authentication failed: Invalid email or password.' },
        ],
      });
    }

    // Model not found (example)
    if (error.code === 'E_ROW_NOT_FOUND') {
      return response.notFound({
        success: false,
        message: 'Resource not found',
      })
    }

    return super.handle(error, ctx)
  }

  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
