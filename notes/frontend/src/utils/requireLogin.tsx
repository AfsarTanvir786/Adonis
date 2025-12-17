import { Link } from "react-router-dom";

export default function RequireLogin({
    message = 'Please login to continue',
}: {
    message: string;
}) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <h2 className="text-xl font-semibold mb-2">
                You are not logged in
            </h2>
            <p className="text-gray-600 mb-4">{message}</p>

            <Link
                to="/auth/login"
                className="px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition"
            >
                Login
            </Link>
        </div>
    );
}
