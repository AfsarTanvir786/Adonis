import { Route } from 'react-router';
import Error404 from '@/components/errors/Error404';
import Index from '@/pages/workspace/Index';
import WorkspaceList from '@/pages/workspace/WorkspaceList';
import WorkspaceDetails from '@/pages/workspace/WorkspaceDetails';
import WorkspaceEdit from '@/pages/workspace/WorkspaceEdit';
import WorkspaceDeleteButton from '@/pages/workspace/WorkspaceDeleteButton';
import WorkspaceCreate from '@/pages/workspace/WorkspaceCreate';

export const WorkspaceRoutes = (
  <Route path="workspaces" element={<Index />}>
    <Route index element={<WorkspaceList />} />
    <Route path="edit/:id" element={<WorkspaceEdit />} />
    <Route path="delete/:id" element={<WorkspaceDeleteButton />} />
    <Route path="create" element={<WorkspaceCreate />} />
    <Route
      path="details/:id"
      element={<WorkspaceDetails canManage={false} />}
    />
    <Route path="*" element={<Error404 title="Could Not Find Workspace." />} />
  </Route>
);
