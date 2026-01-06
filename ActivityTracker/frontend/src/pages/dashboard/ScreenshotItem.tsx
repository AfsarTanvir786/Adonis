import { useState } from 'react';

interface Screenshot {
  id: number;
  userId: number;
  companyId: number;
  fileName: string;
  filePath: string;
  fileSize: number;
  activityTime: string;
  createdAt: string;
  updatedAt: string;
  url?: string;
}

/* ================= HELPERS ================= */

const formatTime = (dateString: string): string => {
  const date = new Date(dateString);

  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
};

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
};

/* ================= COMPONENTS ================= */

export const ScreenshotItem = ({
  screenshot,
  onSelect,
}: {
  screenshot: Screenshot;
  onSelect: (url: string) => void;
}) => {
  const [error, setError] = useState(false);
  const imageUrl = screenshot.url ?? screenshot.filePath;

  return (
    <div className="cursor-pointer" onClick={() => onSelect(imageUrl)}>
      {error ? (
        <div className="aspect-video bg-red-100 flex items-center justify-center text-xs text-red-700">
          Image not found
        </div>
      ) : (
        <img
          src={imageUrl}
          onError={() => setError(true)}
          className="w-full aspect-video object-cover rounded"
        />
      )}

      <div className="mt-1 text-xs flex justify-between">
        <span>{formatTime(screenshot.activityTime)}</span>
        <span>{formatFileSize(screenshot.fileSize)}</span>
      </div>
    </div>
  );
};
