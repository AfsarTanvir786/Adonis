import { Route } from 'react-router';
import Error404 from '@/components/errors/Error404';
import NoteList from '@/lib/pages/myNote/NoteList';
import NoteCreate from '@/lib/pages/myNote/NoteCreate';
import NoteEdit from '@/lib/pages/myNote/NoteEdit';
import NoteDetails from '@/lib/pages/myNote/NoteDetails';
import Index from '@/lib/pages/myNote/Index';
import HistoryList from '@/lib/pages/myNote/history/HistoryList';

export const MyNoteRoute = (
  <Route path="notes" element={<Index />}>
    <Route index element={<NoteList />} />
    <Route path="create" element={<NoteCreate />} />
    <Route path="edit/:id" element={<NoteEdit />} />
    <Route path="details/:id" element={<NoteDetails />} />
    <Route path=":id/history" element={<HistoryList />} />
    <Route path="*" element={<Error404 title="Could Not Find Note." />} />
  </Route>
);
