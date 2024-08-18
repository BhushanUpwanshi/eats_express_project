import axios from "axios";
import { Card } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
export const FavouriteComp = () => {
  const [favProducts, setFavProducts] = useState([]);
  const userId = localStorage.getItem("userid");
  const fetchfav = async () => {
    try {
      // const response = await fetch(`http://localhost:8080/products/getfavs/${userId}`);
      const response = await fetch(`http://localhost:8080/products`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setFavProducts(data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setError("Failed to fetch cart items");
    }
  };
  const removeFavorite = async (productId) => {
    try {
      await axios.delete(
        `http://localhost:8080/product/delfav/${productId}/${userId}`
      );
      toast.success("Removed");
      // setFavProducts(favProducts.filter((product) => product.productId !== productId));
      fetchfav();

      // Remove the Product from the list
    } catch (error) {
      console.error("Error removing favorite product:", error);
      setError("Failed to remove favorite product");
    }
  };

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

  useEffect(() => {
    fetchfav();
  }, []);

  return (
    <div className="mt-20 px-4 lg:px-24">
      <h3 className="mb-5 ml-2 mt-11 text-3xl text-blue-700 font-bold">
        Favourite Products
      </h3>
      <div className="grid gap-8 my-12 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1">
        {favProducts.length ? (
          favProducts.map((product) => (
            <div
              key={product.productId}
              className="border rounded-md grid grid-rows-8"
              // href={`/products/${product.productId}`}
            >
              <div className="row-span-7 grid grid-rows-3 gap-2">
                <img
                  className="row-span-2 w-full h-[250px] object-cover rounded-md"
                  src={product.imgUrl}
                  alt=""
                />
                <div className="px-4 row-span-1">
                  <h2 className="text-lg font-bold text-blue-700">
                    {product.productName}
                  </h2>
                  <p className="text-sm ">By : {product.vendorName}</p>
                  {/* <p className='text-sm text-gray-700 mt-2'>{product.description}</p> */}
                  <div className="">
                    <p className="text-sm ">Quantity: {product.quantity}</p>
                    <p className="text-md mt-2 font-medium">
                      Price: Rs {product.price}
                    </p>
                  </div>
                </div>
              </div>
              <div className="px-2 row-span-1 flex justify-end items-center">
                <button
                  type="button"
                  className="rounded-lg bg-blue-700 px-2 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => addtocart(product.productId)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-xl ml-2 mt-5 bg-slate-300 rounded p-3  font-bold">
            No favourite Products
          </div>
        )}
      </div>
    </div>
  );
};
