import { useState } from 'react'
import { api } from '@/services/api'

function UploadImage() {
  const [file, setFile] = useState<File | null>(null)
  const [activityDate, setActivityDate] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    setError(null)
    setSuccess(null)

    if (!selectedFile) return

    if (!allowedTypes.includes(selectedFile.type)) {
      setError('Only JPG, JPEG, PNG, WEBP images are allowed')
      return
    }

    setFile(selectedFile)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!file) {
      setError('Please select an image')
      return
    }

    const formData = new FormData()
    formData.append('image', file)

    // activityDate is optional
    if (activityDate) {
      formData.append('activityTime', activityDate)
    }

    try {
      setLoading(true)

      await api.post('/screenshots/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      setSuccess('Image uploaded successfully')
      setFile(null)
      setActivityDate('')
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Upload failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-xl font-semibold mb-4">Upload Screenshot</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Image */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Screenshot Image
          </label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            onChange={handleFileChange}
            className="w-full border p-2 rounded"
          />
          <p className="text-xs text-gray-500 mt-1">
            Allowed: JPG, JPEG, PNG, WEBP
          </p>
        </div>

        {/* Activity Date (optional) */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Activity Date (optional)
          </label>
          <input
            type="datetime-local"
            value={activityDate}
            onChange={(e) => setActivityDate(e.target.value)}
            max={new Date().toISOString()}
            className="w-full border p-2 rounded"
          />
          <p className="text-xs text-gray-500 mt-1">
            If empty, today will be used
          </p>
        </div>

        {/* Errors */}
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  )
}

export default UploadImage
