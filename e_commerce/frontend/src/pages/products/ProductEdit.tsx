import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { productService } from '@/services/api/productService';
import type { Product } from '@/types/type';
import { Label } from '@radix-ui/react-label';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ProductEdit() {
    const { id } = useParams<{ id: string }>();
    const productId = Number(id);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // 1. Fetching existing product data using React Query
    const {
        data: product,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['products', productId],
        queryFn: () => productService.get(productId),
        enabled: !!id,
    });

    // 2. Local form state
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: 0,
        stock: 0,
    });

    // 3. Populate form when product data is fetched
    useEffect(() => {
        if (product) {
            setFormData({
                title: product.title,
                description: product.description,
                price: product.price,
                stock: product.stock,
            });
        }
    }, [product]);

    // 4. Update mutation
    const mutation = useMutation({
        mutationFn: (payload: Partial<Product>) =>
            productService.update(productId, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['products', productId],
            });
            navigate(`/products/details/${productId}`);
        },
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                name === 'price' || name === 'stock' ? Number(value) : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching product details</p>;
    if (!product) return <p>No product found</p>;

    return (
        <div className="max-w-150 m-2 bg-[#a09584] rounded p-4">
            <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
            <form onSubmit={handleSubmit}>
                <div className="m-2 p-1">
                    <Label>
                        Title:
                        <Input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </Label>
                </div>

                <div className="m-2 p-1">
                    <Label>
                        Description:
                        <Input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </Label>
                </div>

                <div className="m-2 p-1">
                    <Label>
                        Price:
                        <Input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                        />
                    </Label>
                </div>

                <div className="m-2 p-1">
                    <Label>
                        Stock:
                        <Input
                            type="number"
                            name="stock"
                            value={formData.stock}
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

export default ProductEdit;
