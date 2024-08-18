import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ShopComp = () => {
  const [products, setProducts] = useState([]);
  // const [cate, setCate] = useState([]);
  const [categories, setCategories] = useState({});
  const userId = localStorage.getItem("userid");
  const fetchData = async () => {
    try {
      // Fetch products
      const productsResponse = await fetch("http://localhost:8080/products");
      const productsData = await productsResponse.json();
      setProducts(productsData);

      // Fetch categories
      const categoryIds = [
        ...new Set(productsData.map((product) => product.categoryId.cateId)),
      ];
      const categoriesPromises = categoryIds.map((id) =>
        fetch(`http://localhost:8080/category/${id}`).then((res) => res.json())
      );
      const categoriesData = await Promise.all(categoriesPromises);
      const categoriesMap = categoriesData.reduce((acc, category) => {
        acc[category.categoryId] = category.categoryName;
        return acc;
      }, {});
      setCategories(categoriesMap);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const addtocart = async (productid) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/cart/public/carts/${userId}/products/${productid}/quantity/1`
      );
      console.log(response.data);
      toast.success("Added to cart");
      fetchData();
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  return (
    <div className="mt-20 px-4 lg:px-24">
      <h3 className="mb-5 ml-2 mt-11 text-3xl text-blue-700 font-bold">
        Shop Items
      </h3>
      <div className="grid gap-8 my-12 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1">
        {products.map((product) => (
          <div
            key={product.productId}
            className="border rounded-md p-2 grid grid-rows-8"
            // href={`/products/${product.productId}`}
          >
            <img className="row-span-5 w-full h-[300px] rounded-md" src={product.imgUrl} alt="" />
            <div className="row-span-2 mt-2">
              <div className="badge badge-secondary font-bold text-xs text-red-500 ">
                {categories[product.categoryId.cateId] || "Loading..."}
              </div>
              <h5 className="text-xl font-bold tracking-tight text-gray-900">
                {product.productName}
              </h5>
              <p className="font-semibold text-xs mt-2">
                By : {product.vendorName}
              </p>
              <div className="mb-5 mt-2.5 flex items-center">
                <span className="mr-2 rounded bg-amber-300 px-2 py-1 text-xs font-semibold">
                  Quantity - {product.quantity}
                </span>
              </div>
            </div>
            <div className="row-span-1 flex items-center justify-between">
              <span className="text-3xl font-bold text-gray-900">
                ₹{product.price}
              </span>
              <Link
                to=""
                className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => addtocart(product.productId)}
              >
                Add to cart
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopComp;
