import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { orderItemService } from '@/services/api/orderItemService';
import type { OrderItem } from '@/types/type';
import { Label } from '@radix-ui/react-label';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

function OrderItemCreate() {
    const queryClient = useQueryClient();

    const { register, handleSubmit, reset } = useForm<Partial<OrderItem>>();

    const { mutate, isPending, error } = useMutation({
        mutationFn: (data: Partial<OrderItem>) => orderItemService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orderItems'] });
            reset();
        },
    });

    const onSubmit = (data: Partial<OrderItem>) => mutate(data);

    return (
        <div className="justify-center m-2 p-3 bg-[#90a88f] rounded-2xl max-w-100">
            <h2>Create Order Item</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="m-2">
                    <Label>Order id</Label>
                    <Input
                        type="number"
                        {...register('orderId', { required: true })}
                    />
                </div>

                <div className="m-2">
                    <Label>Product id</Label>
                    <Input
                        type="number"
                        {...register('productId', { required: true })}
                    />
                </div>

                <div className="m-2">
                    <Label>Quantity</Label>
                    <Input
                        type="number"
                        {...register('quantity', { required: true })}
                    />
                </div>

                <div className="m-2">
                    <Label>Unit Price</Label>
                    <Input
                        type="number"
                        {...register('unitPrice', { required: true })}
                    />
                </div>

                <div className="m-2">
                    <Label>Sub Total</Label>
                    <Input
                        type="number"
                        {...register('subTotal', { required: true })}
                    />
                </div>

                <Button className="m-1" type="submit" disabled={isPending}>
                    {isPending ? 'Creating...' : 'Create'}
                </Button>

                {error && <p className="text-red-500">Failed to create.</p>}
            </form>
        </div>
    );
}
export default OrderItemCreate;
