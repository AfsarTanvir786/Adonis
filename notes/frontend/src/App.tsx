import { RouterProvider } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './store';
import { router } from './router/IndexRoute';

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />;
    </Provider>
  );
}
