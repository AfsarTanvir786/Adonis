import { useCategories } from '@/hooks/query/useCategories';
import Category from './Category';

function CategoryList() {
    const { data: categoryList, isLoading, isError } = useCategories();

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error Fetching products</p>;

    return (
        <div className="m-2 p-2 flex justify-center-safe flex-wrap">
            {categoryList?.map((c) => (
                <Category key={c.id} category={c} />
            ))}
        </div>
    );
}

export default CategoryList;
