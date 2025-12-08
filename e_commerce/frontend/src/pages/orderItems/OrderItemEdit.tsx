import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { orderItemService } from '@/services/api/orderItemService';
import type { OrderItem } from '@/types/type';
import { Label } from '@radix-ui/react-label';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function OrderItemEdit() {
    const { id } = useParams<{ id: string }>();
    const orderItemId = Number(id);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // 1. Fetching existing orderItem data using React Query
    const {
        data: orderItem,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['orderItems', orderItemId],
        queryFn: () => orderItemService.get(orderItemId),
        enabled: !!id,
    });

    // 2. Local form state
    const [formData, setFormData] = useState({
        orderId: 0,
        productId: 0,
        quantity: 0,
        unitPrice: 0,
        subTotal: 0,
    });

    // 3. Populate form when orderItem data is fetched
    useEffect(() => {
        if (orderItem) {
            setFormData({
                orderId: orderItem.orderId,
                productId: orderItem.productId,
                quantity: orderItem.quantity,
                unitPrice: orderItem.unitPrice,
                subTotal: orderItem.subTotal,
            });
        }
    }, [orderItem]);

    // 4. Update mutation
    const mutation = useMutation({
        mutationFn: (payload: Partial<OrderItem>) =>
            orderItemService.update(orderItemId, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['orderItems', orderItemId],
            });
            navigate(`/orderItems/details/${orderItemId}`);
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: Number(value),
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching orderItem details</p>;
    if (!orderItem) return <p>No orderItem found</p>;

    return (
        <div className="max-w-150 m-2 bg-[#a09584] rounded p-4">
            <h1 className="text-2xl font-bold mb-4">Edit orderItem</h1>
            <form onSubmit={handleSubmit}>
                <div className="m-2 p-1">
                    <Label>
                        Order Id:
                        <Input
                            type="number"
                            name="orderId"
                            value={formData.orderId}
                            onChange={handleChange}
                        />
                    </Label>
                </div>

                <div className="m-2 p-1">
                    <Label>
                        Product Id:
                        <Input
                            type="number"
                            name="productId"
                            value={formData.productId}
                            onChange={handleChange}
                        />
                    </Label>
                </div>

                <div className="m-2 p-1">
                    <Label>
                        Quantity:
                        <Input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                        />
                    </Label>
                </div>

                <div className="m-2 p-1">
                    <Label>
                        Sub Total:
                        <Input
                            type="number"
                            name="subTotal"
                            value={formData.subTotal}
                            onChange={handleChange}
                        />
                    </Label>
                </div>

                <div className="text-center">
                    <Button
                        className="m-1"
                        type="submit"
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending ? 'Updating...' : 'Update'}
                    </Button>
                </div>
                {mutation.error && (
                    <p className="text-red-500">Failed to update.</p>
                )}
            </form>
        </div>
    );
}

export default OrderItemEdit;
