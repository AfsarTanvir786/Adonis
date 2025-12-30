import { useProfile } from '@/hooks/useProfile';

function Profile() {
  const { data, isLoading, isError } = useProfile();
  if (isLoading) return <p>Loading ...</p>;
  if (isError || !data) return <p>Error + {isError} ...</p>;
  const user = data
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
