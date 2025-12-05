import Customer from './Customer';
import { useCustomers } from '@/hooks/query/useCustomers';

function CustomerList() {
    const { data: customerList, isLoading, isError } = useCustomers();

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error Fetching products</p>;
    return (
        <div className="m-2 p-2 justify-around">
            {customerList?.map((c) => (
                <Customer key={c.id} user={c} />
            ))}
        </div>
    );
}

export default CustomerList;
