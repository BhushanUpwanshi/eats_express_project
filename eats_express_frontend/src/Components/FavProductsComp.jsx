import React,{useEffect,useState} from 'react'
import { ProductCardComp } from './ProductCardComp';
import axios from 'axios';
export default function FavProductsComp() {
    const[products,setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/products');
        
            setProducts(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {   
        fetchProducts();
    }, []);
  return (
    <div >
        <ProductCardComp productsprop={products} headline="Best Selling Products" ></ProductCardComp>
    </div>
  )
}
