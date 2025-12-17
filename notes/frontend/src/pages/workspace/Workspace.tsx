import { Button } from '@/components/ui/button';
import type { AppDispatch, RootState } from '@/store';
import type { Workspace } from '@/types/type';
import RequireLogin from '@/utils/requireLogin';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';

function SingleWorkspace({
    workspace,
    canManage,
}: {
    workspace: Workspace;
    canManage: boolean;
}) {
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.authentication.user);

    if (!user || user.name === 'no user') {
        return (
            <RequireLogin message="Please login to view this workspace details" />
        );
    }
    // const queryClient = useQueryClient();
    // const dispatch = useDispatch<AppDispatch>();
    // const { mutate, isPending } = useMutation({
    //     mutationFn: (data: Partial<CartItem>) => CartItemService.create(data),
    //     onSuccess: () => {
    //         queryClient.invalidateQueries({ queryKey: ['cartItems'] });
    //         dispatch(cartSlice.actions.addItem({ Workspace }));
    //     },
    // });
    // const cartId = useSelector((state: RootState) => state.cart.cartId);
    const handleAddToCart = () => {
        console.log('click on add to cart.', workspace.id);
        // mutate({
        //     cartId: cartId,
        //     WorkspaceId: Workspace.id,
        //     quantity: 1,
        // });
    };
    return (
        <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
            <h3 className="text-xl font-semibold mb-3">{workspace.name}</h3>
            <p>workspace id : {workspace.id}</p>
            <p className="mb-2 text-sm">
                <span className="font-medium">Description: </span>
                {workspace.description}
            </p>

            <p className="mb-2 text-sm">
                <span className="font-medium">Creator id: </span>
                {workspace.userId}
            </p>

            <Button
                variant="outline"
                onClick={() => navigate(`details/${workspace.id}`)}
            >
                Explore
            </Button>
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
                            to={`/Workspaces/edit/${workspace.id}`}
                            state={canManage}
                        >
                            Edit
                        </Link>
                    </button>

                    <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md shadow">
                        <Link
                            to={`/Workspaces/delete/${workspace.id}`}
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

export default SingleWorkspace;
