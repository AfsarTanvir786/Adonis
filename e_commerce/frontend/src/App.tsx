import { RouterProvider } from 'react-router';
import { router } from './router/IndexRoute'; 

export default function App() {
    return <RouterProvider router={router} />;
}
