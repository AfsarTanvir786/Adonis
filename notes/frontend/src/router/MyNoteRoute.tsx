import { Route } from 'react-router';
import Error404 from '@/components/errors/Error404';
import NoteList from '@/pages/myNote/NoteList';
import NoteCreate from '@/pages/myNote/NoteCreate';
import NoteEdit from '@/pages/myNote/NoteEdit';
import NoteDetails from '@/pages/myNote/NoteDetails';
import Index from '@/pages/myNote/Index';
import HistoryList from '@/pages/myNote/history/HistoryList';

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
