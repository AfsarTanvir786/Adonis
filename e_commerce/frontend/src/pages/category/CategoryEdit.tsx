import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CategoryService } from '@/services/api/categoryService';
import type { Category } from '@/types/type';
import { Label } from '@radix-ui/react-label';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function CategoryEdit() {
  const { id } = useParams<{ id: string }>();
    const categoryId = Number(id);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // 1. Fetching existing category data using React Query
    const {
        data: category,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['categories', categoryId],
        queryFn: () => CategoryService.get(categoryId),
        enabled: !!id,
    });

    // 2. Local form state
    const [formData, setFormData] = useState({
        name: '',
        description: '',
    });

    // 3. Populate form when category data is fetched
    useEffect(() => {
        if (category) {
            setFormData({
                name: category.name,
                description: category.description
            });
        }
    }, [category]);

    // 4. Update mutation
    const mutation = useMutation({
        mutationFn: (payload: Partial<Category>) =>
            CategoryService.update(categoryId, payload),
        onSuccess: () => {
            // refresh category cache
            queryClient.invalidateQueries({
                queryKey: ['categories', categoryId],
            });
            navigate(`/categories/details/${categoryId}`);
        },
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching category details</p>;
    if (!category) return <p>No category found</p>;

    return (
        <div className="max-w-150 m-2 bg-[#a09584] rounded p-4">
            <h1 className="text-2xl font-bold mb-4">Edit Category</h1>
            <form onSubmit={handleSubmit}>
                <div className="m-2 p-1">
                    <Label>
                        Name:
                        <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </Label>
                </div>

                <div className="m-2 p-1">
                    <Label>
                        Description:
                        <Input
                            placeholder="Please enter description"
                            type="text"
                            name="description"
                            value={formData.description}
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

export default CategoryEdit;