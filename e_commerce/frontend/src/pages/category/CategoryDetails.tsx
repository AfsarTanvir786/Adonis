import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { CategoryService } from '@/services/api/categoryService';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

function CategoryDetails() {
  const { id } = useParams<{ id: string }>();
    const categoryId = Number(id);

    const {
        data: category,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['categories', categoryId],
        queryFn: () => CategoryService.get(categoryId),
        enabled: !!id,
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching category details</p>;
    if (!category) return <p>No category found</p>;

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
                    <b>Name: </b>
                    {category.name}
                </p>
                <p className="mb-2">
                    <b>Description: </b>
                    {category.description}
                </p>
            </CardContent>
            <CardFooter className="pt-0">
                <Button>Read More</Button>
            </CardFooter>
        </Card>
    );
}

export default CategoryDetails;