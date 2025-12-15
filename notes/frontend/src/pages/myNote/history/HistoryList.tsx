import type { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Link, useParams } from 'react-router-dom';
import { useHistoryList } from '@/hooks/query/useHistories';
import History from './History';
import SingleHistory from './History';

function HistoryList() {
    const { id } = useParams<{ id: string }>();
    const user = useSelector((state: RootState) => state.authentication.user);
    if (!user) {
        return <>Please enter first</>;
    }
    const { data: historyList, isLoading, isError } = useHistoryList(Number(id));
    // const user = useSelector((state: RootState) => state.authentication.user);
    const canManage = user.role === 'admin';

    if (isLoading) return <p className="text-center mt-10">Loading...</p>;
    if (isError)
        return <p className="text-center mt-10">Error fetching Notes</p>;

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Notes</h2>

                {canManage && (
                    <Button
                        variant="outline"
                        className="bg-indigo-500 text-white hover:bg-indigo-600 shadow-md"
                    >
                        <Link to={'/Notes/create'} state={canManage}>
                            Add New Note
                        </Link>
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {historyList?.data?.map((p) => (
                    <SingleHistory
                        key={p.id}
                        history={p}
                        canManage={canManage}
                    />
                ))}
            </div>
        </div>
    );
}

export default HistoryList;
