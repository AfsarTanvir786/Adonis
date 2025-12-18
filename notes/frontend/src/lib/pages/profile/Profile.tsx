import type { RootState } from '@/store';
import RequireLogin from '@/utils/requireLogin';
import { useSelector } from 'react-redux';

function Profile() {
    const user = useSelector((state: RootState) => state.authentication.user);

    if (!user || user.name === 'no user') {
        return (
            <RequireLogin message="Please login to view your profile details" />
        );
    }
    return (
        <>
            <p>Profile</p>
            <p>Id: {user.id}</p>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>CompanyId: {user.companyId}</p>
        </>
    );
}

export default Profile;
