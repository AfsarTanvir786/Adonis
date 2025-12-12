import type { RootState } from '@/store';
import { useSelector } from 'react-redux';

function Profile() {
    const user = useSelector((state: RootState) => state.authentication.user);
    if(!user) {
        return <p>Please enter first</p>;
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
