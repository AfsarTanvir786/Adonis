import type { Order } from '@/types/type';

export default function SingleOrder({ order }: { order: Order }) {
    return (
        <div className="m-4 p-2 rounded-[2vw] bg-[#90a88f]">
            <div>
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
            </div>
        </div>
    );
}
