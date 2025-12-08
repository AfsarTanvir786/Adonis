import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';
import { orderService } from '@/services/api/orderService';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

function OrderDetails() {
    const { id } = useParams<{ id: string }>();
    const orderId = Number(id);

    const {
        data: order, // here data is renamed as order
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['order', orderId],
        queryFn: () => orderService.get(orderId),
        enabled: !!id, // do not run until id is valid
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching order details</p>;
    if (!order) return <p>No order found</p>;

    return (
        <Card className="mt-6 w-96 m-4">
            <CardHeader color="blue-gray" className="m-2 relative h-56">
                <img
                    src="/src/assets/images/404_space-gif.gif"
                    alt="card-image"
                />
            </CardHeader>

            <CardContent>
                <p className="bg-blen">
                    <b>Order Items: </b>
                    {order.orderItems}
                </p>
                <p className="mb-2">
                    <b>Total Price: </b>
                    {order.totalPrice}
                </p>
                <p className="mb-2">
                    <b>Order Status: </b>
                    {order.orderStatus}
                </p>
                <p className="mb-2">
                    <b>Payment Status: </b>
                    {order.paymentStatus}
                </p>
                <p className="mb-2">
                    <b>Customer Id: </b>
                    {order.customerId}
                </p>
            </CardContent>
            <CardFooter className="pt-0">
                <Button>Read More</Button>
            </CardFooter>
        </Card>
    );
}

export default OrderDetails;
