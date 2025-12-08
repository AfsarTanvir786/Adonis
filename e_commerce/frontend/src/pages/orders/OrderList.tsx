import { useOrders } from '@/hooks/query/useOrders';
import SingleOrder from './Order';

function OrderList() {
    const { data: orderList, isLoading, isError } = useOrders();

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error Fetching products</p>;

    return (
        <div className="m-2 p-2 justify-around">
            {orderList?.map((o) => (
                <SingleOrder key={o.id} order={o} />
            ))}
        </div>
    );
}

export default OrderList;
