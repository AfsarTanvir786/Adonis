import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';
import { orderItemService } from '@/services/api/orderItemService';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

function OrderItemDetails() {
    const { id } = useParams<{ id: string }>();
    const orderItemId = Number(id);

    const {
        data: orderItem, // here data is renamed as orderItem
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['orderItem', orderItemId],
        queryFn: () => orderItemService.get(orderItemId),
        enabled: !!id, // do not run until id is valid
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching orderItem details</p>;
    if (!orderItem) return <p>No orderItem found</p>;

    return (
        <Card className="mt-6 w-96 m-4">
            <CardHeader color="blue-gray" className="m-2 relative h-56">
                <img
                    src="/src/assets/images/404_space-gif.gif"
                    alt="card-image"
                />
            </CardHeader>

            <CardContent>
                <p className="mb-3">
                    <b>Order id: </b>
                    {orderItem.orderId}
                </p>
                <p className="mb-2">
                    <b>Product id: </b>
                    {orderItem.productId}
                </p>
                <p className="mb-2">
                    <b>Quantity: </b>
                    {orderItem.quantity}
                </p>
                <p className="mb-2">
                    <b>Per unit cost: </b>
                    {orderItem.unitPrice}
                </p>
                <p className="mb-2">
                    <b>Total: </b>
                    {orderItem.subTotal}
                </p>
            </CardContent>
            <CardFooter className="pt-0">
                <Button>Read More</Button>
            </CardFooter>
        </Card>
    );
}

export default OrderItemDetails;
