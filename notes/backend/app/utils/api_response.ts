export function apiSuccess(message: string, data?: any) {
  return {
    success: true,
    message,
    data,
  }
}

export function apiError(message: string, data?: any) {
  return {
    success: false,
    message,
    data,
  }
}
