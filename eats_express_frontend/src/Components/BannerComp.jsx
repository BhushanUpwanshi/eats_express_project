import React, { useState } from "react";
import axios from "axios"; // Ensure axios is imported
import EffectCard from "./EffectCard";
import { Link, useNavigate } from "react-router-dom";

export default function BannerComp() {
  const [productName, setProductName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProductName(e.target.value);
  };

  const getProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/products/productname/${productName}`
      );
      console.log(response);
      // navigate(`/products/${response.data.productId}`);
      navigate(`http://localhost:8080/products/${params.id}`);

    } catch (error) {
      console.error("Error fetching product:", error);
      setError("Failed to find the product");
    }
  };

  return (
    <div className="px-4 lg:px-24 bg-green-200 flex items-center">
      <div className="flex flex-col md:flex-row justify-start  items-center gap-12 py-40 ">
        {/* Left */}
        <div className="md:w-1/2 h-full mr-24 space-y-8">
          <h2 className="text-5xl font-bold leading-snug text-black">
            Explore the Organic Products{" "}
            <span className="text-slate-600">
              take a Step towards healty habits
            </span>
          </h2>
          <p className="md:w-4/5 font-medium">
            Explore and order Organic Products with assured Quality. explore
            Organic vegetables, fruits and Dairy-Products and enjoy Natural
            Products.
          </p>
          <input
            type="text"
            id="product"
            name="product"
            placeholder="Search a Product"
            value={productName}
            className="py-2 px-2 rounded-s-sm outline-none"
            onChange={handleChange}
          />
          <button
            className="px-6 py-2 bg-green-800 hover:bg-black transition-all ease-in duration-200 text-white font-medium"
            type="button"
            onClick={getProduct}
          >
            Search
          </button>
          {error && <p className="text-red-500">{error}</p>}
          <Link to="/shop" className="block">
            <button className="font-semibold text-white bg-green-800 px-5 py-2  rounded hover:bg-black transition-all duration-300">
              Explore Now
            </button>
          </Link>
        </div>
        <img
          src="https://www.rebootwithjoe.com/wp-content/uploads/2012/05/organic-produce.jpg"
          alt=""
        />
      </div>
    </div>
  );
}
