import { Route } from 'react-router';
import Error404 from '@/components/errors/Error404';
import Index from '@/pages/workspace/Index';
import NoteList from '@/pages/myNote/NoteList';

export const MyNoteRoute = (
    <Route path="notes" element={<Index />}>
        <Route index element={<NoteList />} />
        {/* <Route path="create" element={<WorkspaceCreate />} />
        <Route path="edit/:id" element={<WorkspaceEdit />} />
        <Route path="delete/:id" element={<WorkspaceDelete />} /> */}
        {/* <Route path="details/:id" element={<NoteDetails />} />  */}
        <Route
            path="*"
            element={<Error404 title="Could Not Find Workspace." />}
        />
    </Route>
);
