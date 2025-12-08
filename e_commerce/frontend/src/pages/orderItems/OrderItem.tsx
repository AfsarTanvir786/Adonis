import type { OrderItem as OrderItemType} from '@/types/type';

function OrderItem({ orderItem }: { orderItem: OrderItemType }) {
    return (
        <div className="m-4 p-2 rounded-[2vw] bg-[#90a88f]">
            <div>
                <p className="bg-blen">
                    <b>Order Id: </b>
                    {orderItem.orderId}
                </p>
                <p className="mb-2">
                    <b>Product Id: </b>
                    {orderItem.productId}
                </p>
                <p className="mb-2">
                    <b>Qantity: </b>
                    {orderItem.quantity}
                </p>
                <p className="mb-2">
                    <b>Per Unit Cost: </b>
                    {orderItem.unitPrice}
                </p>
                <p className="mb-2">
                    <b>Total: </b>
                    {orderItem.subTotal}
                </p>
            </div>
        </div>
    );
}

export default OrderItem;
