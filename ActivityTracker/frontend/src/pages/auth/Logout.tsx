import { useLogout } from '@/hooks/auth/useLogout';
import { useEffect, useRef } from 'react';

function Logout() {
  const { mutate, isPending } = useLogout();
  const hasMutated = useRef(false);

  useEffect(() => {
    if (!hasMutated.current) {
      mutate();
      hasMutated.current = true;
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        {isPending ? (
          <p className="text-gray-600">Logging out...</p>
        ) : (
          <>
            <svg
              className="w-16 h-16 text-green-500 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="text-lg text-green-600">Logged out successfully!</p>
            <p className="text-sm text-gray-600 mt-2">
              Redirecting to login...
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Logout;
