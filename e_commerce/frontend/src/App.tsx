import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router';
// import './App.css';
import Home from './Home';
import Error404 from './components/errors/Error404';
import Layout from './models/Layout';
import ProductList from './pages/products/ProductList';
import ProductEdit from './pages/products/ProductEdit';
import ProductDetails from './pages/products/ProductDetails';
import ProductCreate from './pages/products/ProductCreate';
import ProductIndex from './pages/products/Index';
import CategoryIndex from './pages/category/Index';
import CategoryList from './pages/category/CategoryList';
import CategoryCreate from './pages/category/CategoryCreate';
import CategoryEdit from './pages/category/CategoryEdit';
import CategoryDetails from './pages/category/CategoryDetails';

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Layout />}>
                <Route path="home" element={<Home />} />

                <Route path="products" element={<ProductIndex />}>
                    <Route index element={<ProductList />} />
                    <Route path="create" element={<ProductCreate />} />
                    <Route path="edit/:id" element={<ProductEdit />} />
                    <Route path="details/:id" element={<ProductDetails />} />
                    <Route
                        path="*"
                        element={<Error404 title={'Could Not Find Product.'} />}
                    />
                </Route>

                <Route path="categories" element={<CategoryIndex />}>
                    <Route index element={<CategoryList />} />
                    <Route path="create" element={<CategoryCreate />} />
                    <Route path="edit/:id" element={<CategoryEdit />} />
                    <Route path="details/:id" element={<CategoryDetails />} />
                    <Route
                        path="*"
                        element={
                            <Error404 title={'Could Not Find Category.'} />
                        }
                    />
                </Route>

                <Route
                    path="*"
                    element={<Error404 title={'Could Not Find Page.'} />}
                />
            </Route>
        )
    );
    return <RouterProvider router={router} />;
}

export default App;
