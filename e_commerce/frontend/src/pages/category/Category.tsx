import type { Category } from '@/types/type';

function SingleCategory({ category }: { category: Category }) {
    return (
        <div className="m-1 p-1 w-[350px] rounded-[2vw] bg-[#90a88f]">
            <div>
                <p className="bg-blen">
                    <b>Title: </b>
                    {category.name}
                </p>
                <p className="mb-2">
                    <b>Description: </b>
                    {category.description
                        ? category.description
                        : 'No description'}
                </p>
            </div>
        </div>
    );
}

export default SingleCategory;
