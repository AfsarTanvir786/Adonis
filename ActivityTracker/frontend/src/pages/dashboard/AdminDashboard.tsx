import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Calendar, Clock, User2, ZoomIn } from 'lucide-react';
import { api } from '@/services/api';
import { type User } from '@/type/type';

// Types
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
  url: string;
}

interface Data{
  data: Screenshot[]
}

interface ScreenshotGroup {
  [hour: string]: {
    [interval: string]: Screenshot[];
  };
}

// Format date for API (YYYY-MM-DD)
const formatDateForAPI = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Group screenshots by hour and 10-minute intervals
const groupScreenshots = (screenshots: Screenshot[]): ScreenshotGroup => {
  const grouped: ScreenshotGroup = {};

  screenshots.forEach((screenshot) => {
    const date = new Date(screenshot.activityTime);
    const hour = date.getHours();
    const minute = date.getMinutes();

    const intervalStart = Math.floor(minute / 10) * 10;
    const hourKey = `${hour.toString().padStart(2, '0')}:00`;
    const intervalKey = `${hour.toString().padStart(2, '0')}:${intervalStart.toString().padStart(2, '0')}`;

    if (!grouped[hourKey]) {
      grouped[hourKey] = {};
    }

    if (!grouped[hourKey][intervalKey]) {
      grouped[hourKey][intervalKey] = [];
    }

    grouped[hourKey][intervalKey].push(screenshot);
  });

  return grouped;
};

// Format time
const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

// Format file size
const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
};

// ScreenshotItem Component
const ScreenshotItem = ({
  screenshot,
  onSelect,
}: {
  screenshot: Screenshot;
  onSelect: (url: string) => void;
}) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      key={screenshot.id}
      className="m-4"
      onClick={() => onSelect(screenshot.filePath)}
    >
      {imageError ? (
        <div className="aspect-video bg-red-100 flex flex-col items-center justify-center text-center p-2">
          <p className="text-red-700 font-semibold">Image not found</p>
          <p className="text-xs text-red-600 truncate mt-1">
            Path: {screenshot.filePath}
          </p>
        </div>
      ) : (
        <img src={screenshot.filePath} alt={screenshot.fileName} />
      )}

      {/* Overlay */}
      {/* {!imageError && (
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
          <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      )} */}

      {/* Info */}
      <div className="p-2 bg-white">
        <p className="text-xs text-gray-600 truncate">{screenshot.fileName}</p>
        <div className="flex items-center justify-between mt-1">
          <p className="text-xs font-medium text-gray-900">
            {formatTime(screenshot.activityTime)}
          </p>
          <p className="text-xs text-gray-500">
            {formatFileSize(screenshot.fileSize)}
          </p>
        </div>
      </div>
    </div>
  );
};

function AdminDashboard() {
  const [selectedUserId, setSelectedUserId] = useState<number>(-1);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Fetch users
  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async (): Promise<User[]> => {
      const response = await api.get('/auth/admin-dashboard');
      return response.data.users;
    },
  });

  // Fetch screenshots
  const {
    data: screenshotsData,
    isLoading: screenshotsLoading,
    error,
  } = useQuery({
    queryKey: ['screenshots', selectedUserId, formatDateForAPI(selectedDate)],
    queryFn: async () : Promise<Data> => {
      const response = await api.get('/auth/screenshots', {
        params: {
          userId: selectedUserId,
          date: formatDateForAPI(selectedDate),
        },
      });
      return response.data;
    },
    enabled: hasSubmitted && selectedUserId !== -1,
  });

  const handleSubmit = () => {
    if (selectedUserId === -1) {
      alert('Please select a user');
      return;
    }
    setHasSubmitted(true);
  };

  const handleReset = () => {
    setSelectedUserId(-1);
    setSelectedDate(new Date());
    setHasSubmitted(false);
  };

  const screenshots = screenshotsData?.data || [];
  const groupedScreenshots = groupScreenshots(screenshots);
  const selectedUser = users?.find((u) => u.id === selectedUserId);

  console.log(screenshots)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        url
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Activity Dashboard
          </h1>
          <p className="text-gray-600">
            Monitor employee screenshots and activity
          </p>
        </div>
        {/* Filter Panel */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* User Selection */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <User2 className="w-4 h-4 mr-2" />
                  Select Employee
                </label>
                <select
                  value={selectedUserId}
                  onChange={(e) => setSelectedUserId(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value={-1}>Choose an employee...</option>
                  {usersLoading ? (
                    <option disabled>Loading users...</option>
                  ) : (
                    users?.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name} ({user.email})
                      </option>
                    ))
                  )}
                </select>
              </div>

              {/* Date Selection */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  Select Date
                </label>
                <input
                  type="date"
                  value={formatDateForAPI(selectedDate)}
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  max={formatDateForAPI(new Date())}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                disabled={usersLoading}
              >
                {screenshotsLoading ? 'Loading...' : 'View Screenshots'}
              </button>

              {hasSubmitted && (
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>
        {/* Results */}
        {hasSubmitted && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            {/* Summary Header */}
            {selectedUser && (
              <div className="mb-6 pb-4 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {selectedUser.name}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {selectedUser.email}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {selectedDate.toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
                <div className="mt-4 text-sm">
                  <span className="font-medium">
                    {screenshotsData?.data?.length || 0}
                  </span>
                  <span className="text-gray-600 ml-1">Screenshots</span>
                </div>
              </div>
            )}

            {/* Loading State */}
            {screenshotsLoading && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
                <p className="text-gray-600">Loading screenshots...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center py-12">
                <p className="text-red-600">
                  Failed to load screenshots. Please try again.
                </p>
              </div>
            )}

            {/* Empty State */}
            {!screenshotsLoading && !error && screenshots.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <span className="text-2xl">📷</span>
                </div>
                <p className="text-gray-600 text-lg">
                  No screenshots found for this date
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Try selecting a different date
                </p>
              </div>
            )}

            {/* Screenshots Grouped by Time */}
            {!screenshotsLoading && !error && screenshots.length > 0 && (
              <div className="space-y-6">
                {Object.keys(groupedScreenshots)
                  .sort()
                  .map((hour) => (
                    <div
                      key={hour}
                      className="border rounded-lg overflow-hidden"
                    >
                      {/* Hour Header */}
                      <div className="bg-gray-50 px-4 py-3 border-b">
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-gray-600" />
                          <h3 className="text-lg font-semibold text-gray-900">
                            {hour}
                          </h3>
                        </div>
                      </div>

                      {/* 10-minute Intervals */}
                      {Object.keys(groupedScreenshots[hour])
                        .sort()
                        .map((interval) => (
                          <div
                            key={interval}
                            className="border-b last:border-b-0"
                          >
                            {/* Interval Header */}
                            <div className="bg-blue-50 px-4 py-2">
                              <p className="text-sm font-medium text-blue-900">
                                {interval} - {interval.split(':')[0]}:
                                {(parseInt(interval.split(':')[1]) + 10)
                                  .toString()
                                  .padStart(2, '0')}
                              </p>
                              <p className="text-xs text-blue-700">
                                {groupedScreenshots[hour][interval].length}{' '}
                                screenshot(s)
                              </p>
                            </div>

                            {/* Screenshots Grid */}
                            <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                              {groupedScreenshots[hour][interval].map(
                                (screenshot) => (
                                  <ScreenshotItem
                                    key={screenshot.id}
                                    screenshot={screenshot}
                                    onSelect={setSelectedImage}
                                  />
                                ),
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
        {/* Image Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-5xl max-h-screen bg-white rounded-lg overflow-hidden">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors z-10"
              >
                <span className="text-2xl">&times;</span>
              </button>
              <img src={selectedImage} alt="Screenshot preview" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
