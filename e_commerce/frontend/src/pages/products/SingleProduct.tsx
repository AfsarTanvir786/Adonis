import type { Product } from '@/types/type';

function SingleProduct({ product }: { product: Product }) {
    return (
        <div className="m-4 p-2 rounded-[2vw] bg-[#90a88f]">
            <div>
                <h5 className="bg-blen">
                    <b>Title: </b>
                    {product.title}
                </h5>
            </div>
            <div>
                <p className="mb-2">
                    <b>Description: </b>
                    {product.description}
                </p>
                <p className="mb-2">
                    <b>Price: </b>
                    {product.price}
                </p>
                <p className="mb-2">
                    <b>Category: </b>
                    {product.categoryId}
                </p>
            </div>
        </div>
    );
}

export default SingleProduct;
