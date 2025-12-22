import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { useCompany } from '@/hooks/query/useCompany';
import RequireLogin from '@/utils/requireLogin';

function Company() {
  const user = useSelector((state: RootState) => state.authentication.user);

  if (!user || user.name === 'no user') {
    return <RequireLogin message="Please login to view your company details" />;
  }

  const { data: company, isLoading, isError } = useCompany(user.companyId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-600">Loading company details...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-red-600">Failed to fetch company details</p>
      </div>
    );
  }

  if (!company?.data) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p>No company found</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Company Details</h1>
      <hr className="mb-4" />

      <p>
        Company Name: <b>{company.data.name}</b>
      </p>
      <p>
        Total Users: <b>{company.data.users.length}</b>
      </p>

      <div className="mt-5">
        <h3 className="font-semibold mb-3">Users</h3>

        <div className="grid grid-cols-1 gap-4">
          {company.data.users.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-xl shadow-sm p-4 border"
            >
              <p>
                User ID: <b>{user.id}</b>
              </p>
              <p>
                Name: <b>{user.name}</b>
              </p>
              <p>
                Email: <b>{user.email}</b>
              </p>
              <p>
                Role: <b>{user.role}</b>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Company;
