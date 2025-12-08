import type { User } from '@/types/type';

function Customer({ user }: { user: User }) {
    return (
        <div className="m-4 p-2 rounded-[2vw] bg-[#90a88f]">
            <div>
                <p>Customer Details</p>
                <p>-------------------------------------------</p>
                <p>Id: {user.id}</p>
                <p>Name: {user.fullName}</p>
                <p>Email: {user.email}</p>
                <p>Created At: {user.createdAt.toString()}</p>
                <p>Updated At: {user.updatedAt.toString()}</p>
            </div>
        </div>
    );
}

export default Customer;
