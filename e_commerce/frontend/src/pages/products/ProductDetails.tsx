import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { productService } from "@/services/api/productService";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function ProductDetails(){
    const { id } = useParams<{ id: string }>();
    const productId = Number(id);

    const {
        data: product, // here data is renamed as product
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['product', productId],
        queryFn: () => productService.get(productId),
        enabled: !!id, // do not run until id is valid
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching product details</p>;
    if (!product) return <p>No product found</p>;

    return (
        <Card className="mt-6 w-96 m-4">
            <CardHeader color="blue-gray" className="m-2 relative h-56">
                <img
                    src="/src/assets/images/404_space-gif.gif"
                    alt="card-image"
                />
            </CardHeader>

            <CardContent>
                <p className="mb-3">
                    <b>Title: </b>
                    {product.title}
                </p>
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
            </CardContent>
            <CardFooter className="pt-0">
                <Button>Read More</Button>
            </CardFooter>
        </Card>
    );
}

export default ProductDetails;
