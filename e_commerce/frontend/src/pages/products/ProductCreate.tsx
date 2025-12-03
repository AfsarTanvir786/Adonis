import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { productService } from '@/services/api/productService';
import type { Product } from '@/types/type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

function ProductCreate() {
    const queryClient = useQueryClient();

    const { register, handleSubmit, reset } = useForm<Partial<Product>>();

    const { mutate, isPending, error } = useMutation({
        mutationFn: (data: Partial<Product>) => productService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            reset();
        },
    });

    const onSubmit = (data: Partial<Product>) => mutate(data);

    return (
        <div className="justify-center m-2 p-3 bg-[#90a88f] rounded-2xl max-w-100">
            <h2>Create Product</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="m-2">
                    <Label>Name</Label>
                    <Input {...register('title', { required: true })} />
                </div>

                <div className="m-2">
                    <Label>Price</Label>
                    <Input
                        type="number"
                        {...register('price', { required: true })}
                    />
                </div>

                <div className="m-2">
                    <Label>Description</Label>
                    <textarea {...register('description')} />
                </div>

                <div className="m-2">
                    <Label>In stock</Label>
                    <Input type="number" {...register('stock')} />
                </div>

                <div className="m-2">
                    <Label>Category Id</Label>
                    <Input type="number" {...register('categoryId')} />
                </div>

                <Button className="m-1" type="submit" disabled={isPending}>
                    {isPending ? 'Creating...' : 'Create'}
                </Button>

                {error && (
                    <p className="text-red-500">Failed to create.</p>
                )}
            </form>
        </div>
    );
}

export default ProductCreate;
