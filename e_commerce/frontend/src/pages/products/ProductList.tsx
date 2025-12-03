import SingleProduct from './SingleProduct';
import { useProducts } from '@/hooks/query/useProducts';

function ProductList() {
    const { data: productList, isLoading, isError } = useProducts();

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error Fetching products</p>;

    return (
        <div className="m-2 p-2 justify-around">
            {productList?.map((p) => (
                <SingleProduct key={p.id} product={p} />
            ))}
        </div>
    );
}

export default ProductList;
