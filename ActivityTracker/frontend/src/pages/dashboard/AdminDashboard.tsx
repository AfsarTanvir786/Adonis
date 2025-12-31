import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Calendar, Clock, User2 } from 'lucide-react'
import { api } from '@/services/api'
import { ScreenshotItem } from './ScreenshotItem'
import { getUsers } from '@/hooks/admin/getUsers'

/* ================= TYPES ================= */

interface Screenshot {
  id: number
  userId: number
  companyId: number
  fileName: string
  filePath: string
  fileSize: number
  activityTime: string
  createdAt: string
  updatedAt: string
  url?: string
}

type GroupMode = 'none' | 'hour' | 'min'

type FlatResponse = Screenshot[]
type HourResponse = Record<string, Screenshot[]>
type MinResponse = Record<string, Record<string, Screenshot[]>>

/* ================= HELPERS ================= */

const formatDateForAPI = (date: Date): string => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/* ================= PAGE ================= */

export default function AdminDashboard() {
  const [selectedUserId, setSelectedUserId] = useState(-1)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [groupMode, setGroupMode] = useState<GroupMode>('min')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  /* ===== USERS ===== */

  const { data: users, isLoading: usersLoading } = getUsers();

  /* ===== SCREENSHOTS ===== */

  const { data, isLoading, error } = useQuery<
    FlatResponse | HourResponse | MinResponse
  >({
    queryKey: [
      'screenshots',
      selectedUserId,
      formatDateForAPI(selectedDate),
      groupMode,
    ],
    queryFn: async () => {
      let endpoint = '/auth/screenshots'
      if (groupMode === 'hour') endpoint = '/auth/screenshots/hour'
      if (groupMode === 'min') endpoint = '/auth/screenshots/min'

      const res = await api.get(endpoint, {
        params: {
          userId: selectedUserId,
          date: formatDateForAPI(selectedDate),
        },
      })

      return res.data.data
    },
    enabled: hasSubmitted && selectedUserId !== -1,
  })

  /* ================= RENDER ================= */

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* FILTERS */}
      <div className="bg-white p-6 rounded mb-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="flex items-center gap-2 text-sm mb-1">
              <User2 size={16} /> Employee
            </label>
            <select
              className="w-full border p-2 rounded"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(Number(e.target.value))}
            >
              <option value={-1}>Select employee</option>
              {!usersLoading &&
                users?.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm mb-1">
              <Calendar size={16} /> Date
            </label>
            <input
              type="date"
              value={formatDateForAPI(selectedDate)}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="text-sm mb-1 block">Group By</label>
            <select
              className="w-full border p-2 rounded"
              value={groupMode}
              onChange={(e) => setGroupMode(e.target.value as GroupMode)}
            >
              <option value="min">Hour → 10 min</option>
              <option value="hour">Hour</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>

        <button
          onClick={() => setHasSubmitted(true)}
          className="px-6 py-2 bg-blue-600 text-white rounded"
        >
          View
        </button>
      </div>

      {/* RESULTS */}
      {hasSubmitted && (
        <div className="bg-white p-6 rounded">
          {isLoading && <p>Loading…</p>}
          {error && <p className="text-red-600">Failed to load</p>}

          {/* NO GROUP */}
          {groupMode === 'none' && Array.isArray(data) && data.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              {data.map((s) => (
                <ScreenshotItem
                  key={s.id}
                  screenshot={s}
                  onSelect={setSelectedImage}
                />
              ))}
            </div>
          )}

          {/* HOUR */}
          {groupMode === 'hour' &&
            data &&
            !Array.isArray(data) &&
            Object.entries(data as HourResponse).map(([hour, shots]) => (
              <div key={hour} className="mb-6">
                <h3 className="flex items-center gap-2 font-semibold mb-2">
                  <Clock size={16} /> {hour}:00
                </h3>
                <div className="grid grid-cols-4 gap-4">
                  {shots.map((s) => (
                    <ScreenshotItem
                      key={s.id}
                      screenshot={s}
                      onSelect={setSelectedImage}
                    />
                  ))}
                </div>
              </div>
            ))}

          {/* HOUR → 10 MIN */}
          {groupMode === 'min' &&
            data &&
            !Array.isArray(data) &&
            Object.entries(data as MinResponse).map(([hour, intervals]) => (
              <div key={hour} className="mb-8">
                <h3 className="font-semibold mb-2">{hour}:00</h3>

                {Object.entries(intervals).map(([interval, shots]) => (
                  <div key={interval} className="mb-4 ml-4">
                    <p className="text-sm text-gray-600 mb-2">
                      <b>
                        {interval} – {shots.length} screenshots
                      </b>
                    </p>
                    <div className="grid grid-cols-4 gap-4">
                      {shots.map((s) => (
                        <ScreenshotItem
                          key={s.id}
                          screenshot={s}
                          onSelect={setSelectedImage}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </div>
      )}

      {/* MODAL */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            className="max-h-[90vh] max-w-[90vw] rounded"
          />
        </div>
      )}
    </div>
  );
}
