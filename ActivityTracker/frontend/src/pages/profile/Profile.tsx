import { Button } from '@/components/ui/button';
import { useProfile } from '@/hooks/useProfile';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

function Profile() {
  const { data, isLoading, isError } = useProfile();

  if (isLoading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading profile...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-6 text-center text-red-600">
        Failed to load profile.
      </div>
    );
  }

  const user = data;
  const company = user.company;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Back */}
      <Link to="/dashboard">
        <Button variant="outline" size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
      </Link>

      {/* Profile Card */}
      <div className="mt-4 rounded-2xl border bg-white p-6 shadow-sm space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {user.name}
            </h1>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>

          <div className="flex gap-2">
            <span className="rounded-full px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 capitalize">
              {user.role}
            </span>

            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                user.isActive
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {user.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        {/* User Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <Info label="User ID" value={user.id} />
          <Info label="Company ID" value={user.companyId} />
          <Info
            label="Last Login"
            value={
              user.lastLoginAt
                ? new Date(user.lastLoginAt).toLocaleString()
                : 'Never'
            }
          />
          <Info
            label="Member Since"
            value={
              user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : ''
            }
          />
        </div>
      </div>

      {/* Company Card */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Company Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <Info label="Company Name" value={company.name} />
          <Info label="Owner Name" value={company.ownerName} />
          <Info label="Owner Email" value={company.ownerEmail} />
          <Info
            label="Company Status"
            value={company.isActive ? 'Active' : 'Inactive'}
          />
          <Info
            label="Created At"
            value={
              company.createdAt
                ? new Date(company.createdAt).toLocaleDateString()
                : ''
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;

/* Small reusable info row */
function Info({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  );
}
