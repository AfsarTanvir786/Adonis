import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CategoryService } from '@/services/api/categoryService';
import type { Category } from '@/types/type';
import { Label } from '@radix-ui/react-label';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

function CategoryCreate() {
    const queryClient = useQueryClient();

    const { register, handleSubmit, reset } = useForm<Partial<Category>>();

    const { mutate, isPending, error } = useMutation({
        mutationFn: (data: Partial<Category>) => CategoryService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            reset();
        },
    });

    const onSubmit = (data: Partial<Category>) => mutate(data);

    return (
        <div className="justify-center m-2 p-3 bg-[#90a88f] rounded-2xl max-w-100">
            <h2>Create Product</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="m-2">
                    <Label>Name</Label>
                    <Input {...register('name', { required: true })} />
                </div>

                <div className="m-2">
                    <Label>Description</Label>
                    <Input {...register('description')} />
                </div>

                <Button className="m-1" type="submit" disabled={isPending}>
                    {isPending ? 'Creating...' : 'Create'}
                </Button>

                {error && <p className="text-red-500">Failed to create.</p>}
            </form>
        </div>
    );
}

export default CategoryCreate;
