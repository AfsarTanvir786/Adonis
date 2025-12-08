import { useOrderItems } from '@/hooks/query/useOrderItems';
import OrderItem from './OrderItem';

function OrderItemList() {
    const { data: orderList, isLoading, isError } = useOrderItems();

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error Fetching products</p>;
    return (
        <div className="m-2 p-2 justify-around">
            {orderList?.map((oi) => (
                <OrderItem key={oi.id} orderItem={oi} />
            ))}
        </div>
    );
}

export default OrderItemList;
