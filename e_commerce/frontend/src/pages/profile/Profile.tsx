import type { RootState } from '@/store';
import { useSelector } from 'react-redux';

function Profile() {
    const user = useSelector((state: RootState) => state.authentication.user);
    return (
        <>
            <p>Profile</p>
            <p>Id: {user.id}</p>
            <p>Name: {user.fullName}</p>
            <p>Email: {user.email}</p>
        </>
    );
}

export default Profile;
