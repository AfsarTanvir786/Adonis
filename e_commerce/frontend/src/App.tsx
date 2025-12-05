import { RouterProvider } from 'react-router';
import { router } from './router/IndexRoute'; 
import { Provider } from 'react-redux';
import { store } from './store';

export default function App() {
    return (
        <Provider store={store}>
            <RouterProvider router={router} />;
        </Provider>
    );
}
