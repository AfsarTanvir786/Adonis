import { useEffect, useState } from 'react';
import Index from './models/product/Index';
import type { Product } from './types/type';
import Navbar from './components/layout/Navbar';

function Home() {
    // type Product = {
    //     id: number;
    //     title: string;
    //     description: string;
    //     price: number;
    //     category_id: number;
    // };
    const API_URI = 'http://localhost:3333';

    const [data, setData] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${API_URI}/api/products`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setData(result.data);
            } catch (err) {
                setError(`Error is ${err}`);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();

        return () => {
            console.log('Home is unmouting.');
        };
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    // console.log(data);
    return (
        <>
            {/* <h1>Home</h1>
            <Index productList={data} /> */}
        </>
    );
}

export default Home;
