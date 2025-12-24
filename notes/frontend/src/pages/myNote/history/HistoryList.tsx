import { Button } from '@/components/ui/button';
import { Link, useParams } from 'react-router-dom';
import { useHistoryList } from '@/hooks/query/my_note_history/useHistories';
import SingleHistory from './History';
import { ArrowLeft } from 'lucide-react';

function HistoryList() {
  const { id } = useParams<{ id: string }>();
  const { data: historyList, isLoading, isError } = useHistoryList(Number(id));

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError) return <p className="text-center mt-10">Error fetching Notes</p>;

  return (
    <div className="p-4">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to={`/notes/details/${id}`}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Note History</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {historyList?.data?.map((p) => (
          <SingleHistory key={p.id} history={p} />
        ))}
      </div>
    </div>
  );
}

export default HistoryList;
