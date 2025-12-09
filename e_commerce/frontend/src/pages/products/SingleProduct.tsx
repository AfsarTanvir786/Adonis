import type { Product } from '@/types/type';
import { Link } from 'react-router';

function SingleProduct({
    product,
    canManage,
}: {
    product: Product;
    canManage: boolean;
}) {
    return (
        <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
            <h3 className="text-xl font-semibold mb-3">{product.title}</h3>

            <p className="mb-2 text-sm">
                <span className="font-medium">Description: </span>
                {product.description}
            </p>

            <p className="mb-2 text-sm">
                <span className="font-medium">Price: </span>${product.price}
            </p>

            <p className="mb-2 text-sm">
                <span className="font-medium">Category: </span>
                {product.categoryId}
            </p>

            {canManage && (
                <div className="mt-4 flex gap-3">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md shadow">
                        <Link
                            to={`/products/edit/${product.id}`}
                            state={canManage}
                        >
                            Edit
                        </Link>
                    </button>

                    <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md shadow">
                        <Link
                            to={`/products/delete/${product.id}`}
                            state={canManage}
                        >
                            Delete
                        </Link>
                    </button>
                </div>
            )}
        </div>
    );
}

export default SingleProduct;
