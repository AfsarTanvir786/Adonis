import type { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import SingleNote from './Note';
import { useMyNoteList } from '@/hooks/query/note/useMyNoteList';
import RequireLogin from '@/utils/requireLogin';

function NoteList() {
    const user = useSelector((state: RootState) => state.authentication.user);

    if (!user || user.name === 'no user') {
        return <RequireLogin message="Please login to view your note list" />;
    }
    const { data: noteList, isLoading, isError } = useMyNoteList(user.id);
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
