import type { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import SingleNote from './Note';
import { useNoteList } from '@/hooks/query/useNoteList';

function NoteList({ workspaceId }: { workspaceId: number | undefined }) {
    const user = useSelector((state: RootState) => state.authentication.user);
    if (!user || !workspaceId) {
        return <>Please enter first</>;
    }
    const { data: noteList, isLoading, isError } = useNoteList(workspaceId);
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
                {noteList?.data?.map((p) => (
                    <SingleNote key={p.id} note={p} canManage={canManage} />
                ))}
            </div>
        </div>
    );
}

export default NoteList;
