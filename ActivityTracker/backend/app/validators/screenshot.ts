import vine from '@vinejs/vine';

export const uploadScreenshotValidator = vine.compile(
  vine.object({
    screenshot: vine.file({
      size: '10mb',
      extnames: ['jpg', 'jpeg', 'png', 'webp'],
    }),
    activityTime: vine.string().optional(),
  }),
);
