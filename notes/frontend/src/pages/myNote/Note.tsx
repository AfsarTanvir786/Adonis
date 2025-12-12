import type { Note } from '@/types/type';

function SingleNote({ note, canManage }: { note: Note; canManage: boolean }) {
    // const queryClient = useQueryClient();
    // const dispatch = useDispatch<AppDispatch>();
    // const { mutate, isPending } = useMutation({
    //     mutationFn: (data: Partial<CartItem>) => CartItemService.create(data),
    //     onSuccess: () => {
    //         queryClient.invalidateQueries({ queryKey: ['cartItems'] });
    //         dispatch(cartSlice.actions.addItem({ Note }));
    //     },
    // });
    // const cartId = useSelector((state: RootState) => state.cart.cartId);
    // const handleAddToCart = () => {
    //     console.log('click on add to cart.', cartId, Note.id);
    //     mutate({
    //         cartId: cartId,
    //         NoteId: Note.id,
    //         quantity: 1,
    //     });
    // };
    return (
        <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
            <h3 className="text-xl font-semibold mb-3">{note.title}</h3>

            <p className="mb-2 text-sm">
                <span className="font-medium">Content: </span>
                {note.content}
            </p>

            <p className="mb-2 text-sm">
                <span className="font-medium">Type: </span>
                {note.type}
            </p>

            <p className="mb-2 text-sm">
                <span className="font-medium">Published: </span>
                {note.isDraft ? 'No' : 'Yes'}
            </p>
            <p>creator id: {note.userId}</p>
            <p>Workspace id: {note.workspaceId}</p>
            <p>User Id: {note.userId}</p>

            {/* {!canManage && (
                <button
                    onClick={handleAddToCart}
                    disabled={isPending}
                    className="mt-4 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md shadow disabled:opacity-60"
                >
                    {isPending ? 'Adding...' : 'Add to Cart'}
                </button>
            )}
            {canManage && (
                <div className="mt-4 flex gap-3">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md shadow">
                        <Link
                            to={`/Notes/edit/${Note.id}`}
                            state={canManage}
                        >
                            Edit
                        </Link>
                    </button>

                    <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md shadow">
                        <Link
                            to={`/Notes/delete/${Note.id}`}
                            state={canManage}
                        >
                            Delete
                        </Link>
                    </button>
                </div>
            )} */}
        </div>
    );
}

export default SingleNote;
