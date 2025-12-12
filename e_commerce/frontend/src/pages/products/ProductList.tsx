import type { RootState } from '@/store';
import SingleProduct from './SingleProduct';
import { useProducts } from '@/hooks/query/useProducts';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';

function ProductList() {
    const { data: productList, isLoading, isError } = useProducts();
    const user = useSelector((state: RootState) => state.authentication.user);
    const canManage = user.userType === 'admin' || user.userType === 'employee';

    if (isLoading) return <p className="text-center mt-10">Loading...</p>;
    if (isError)
        return <p className="text-center mt-10">Error fetching products</p>;

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Products</h2>

                {canManage && (
                    <Button
                        variant="outline"
                        className="bg-indigo-500 text-white hover:bg-indigo-600 shadow-md"
                    >
                        Add New Product
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {productList?.map((p) => (
                    <SingleProduct
                        key={p.id}
                        product={p}
                        canManage={canManage}
                    />
                ))}
            </div>
        </div>
    );
}

export default ProductList;
