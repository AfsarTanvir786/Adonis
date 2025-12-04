import { useEffect } from 'react';
import { authService } from '@/services/api/authService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate, isPending, error, isSuccess } = useMutation({
        mutationFn: () => authService.logout(),
        onSuccess: () => {
            // Invalidate all auth-related queries
            queryClient.invalidateQueries({ queryKey: ['auth'] });
            queryClient.invalidateQueries({ queryKey: ['user'] });
            
            // Clear all cached data
            queryClient.clear();
            
            console.log('Logout successful, all data cleared');
        },
        onError: (error) => {
            // Even if logout API fails, clear client-side data
            console.error('Logout API error (but cleaning up anyway):', error);
            
            // Force cleanup
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            queryClient.clear();
        },
    });

    // Trigger logout when component mounts
    useEffect(() => {
        mutate();
    }, [mutate]);

    // Navigate after mutation completes (success or error)
    useEffect(() => {
        if (isSuccess || error) {
            const timer = setTimeout(() => {
                navigate('/auth/login', { replace: true });
            }, 3000);
            
            return () => clearTimeout(timer);
        }
    }, [isSuccess, error, navigate]);

    if (isPending) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                    <p className="text-lg">Logging out...</p>
                </div>
            </div>
        );
    }

    // Show success message even if there was an error
    // (because we still cleaned up client-side)
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
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
                <p className="text-sm text-gray-600 mt-2">Redirecting to login...</p>
            </div>
        </div>
    );
}

export default Logout;