import { useCompany } from '@/hooks/query/useCompany';
import type { RootState } from '@/store';
import { useSelector } from 'react-redux';

function Company() {
    const user = useSelector((state: RootState) => state.authentication.user);
    if(!user){
        return <>Please enter first</>;
    }
    const { data: company, isLoading, isError } = useCompany(user.companyId);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching company details</p>;
    if (!company) return <p>No company found</p>;

  return (
      <>
          <div>Company Details</div>
          <p>-------------------------------------</p>
          <div>
              <p>Company Name: {company.data?.name}</p>
              <p>Total user: </p>
              <p>Total workspace: </p>
          </div>
      </>
  );
}

export default Company