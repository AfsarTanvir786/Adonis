import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { productService } from '@/services/api/productService';

function ProductDelete() {
    const { id } = useParams<{ id: string }>();
    const productId = Number(id);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { state } = useLocation();

    if (!state) {
        navigate('/products');
    }

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

    // 2. Delete mutation
    const mutation = useMutation({
        mutationFn: () => productService.remove(productId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['products', productId],
            });
            navigate('/products');
        },
    });

    async function handleDelete() {
        const confirmed = window.confirm(
            'Are you sure you want to delete this product?'
        );
        if (!confirmed) return;

        mutation.mutate();
    }

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching product details</p>;
    if (!product) return <p>No product found</p>;

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Delete Product</h2>

            <p className="mb-4 text-gray-700">
                You are about to delete product with ID: <b>{id}</b>
            </p>

            <button
                onClick={handleDelete}
                disabled={isLoading}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow disabled:opacity-50"
            >
                {isLoading ? 'Deleting...' : 'Confirm Delete'}
            </button>

            <button
                onClick={() => navigate('/products')}
                className="ml-3 px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
            >
                Cancel
            </button>
        </div>
    );
}

export default ProductDelete;
