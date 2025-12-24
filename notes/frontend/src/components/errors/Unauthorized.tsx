import { Link, useLocation } from 'react-router';

export default function Unauthorized() {
  const location = useLocation();

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <h1 className="text-4xl font-bold text-red-600">403</h1>

        <h2 className="mt-2 text-xl font-semibold text-gray-800">
          Access Denied
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          You don’t have permission to access this page.
        </p>

        {location.state?.from && (
          <p className="mt-1 text-xs text-gray-500">
            Attempted to access: <span className="italic">{location.state.from}</span>
          </p>
        )}

        <div className="mt-6 flex justify-center gap-3">
          <Link
            to="/dashboard"
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Go to Dashboard
          </Link>

          <Link
            to="/auth/login"
            className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
