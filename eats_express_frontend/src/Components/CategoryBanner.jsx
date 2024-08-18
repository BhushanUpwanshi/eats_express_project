import { Card } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
// import 'swiper/css';
// import 'swiper/css/pagination';
import { Pagination } from "swiper/modules";
import { FaCartShopping } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";

export const CategoryBanner = () => {
  const subTitle = "Choose Any Category";
  const btnText = "Get Started Now";

  const categoryList = [
    {
      imgUrl:
        "https://png.pngtree.com/png-clipart/20210128/ourmid/pngtree-anthropomorphic-vegetable-combination-cute-png-image_2838643.jpg",
      imgAlt: "Vegies img",
      iconName: "icofont-brand-windows",
      title: "Vegetables",
    },
    {
      imgUrl:
        "https://png.pngtree.com/png-clipart/20190613/original/pngtree-fruit-platter-with-cute-fruits-png-image_3597529.jpg",
      imgAlt: "Fruits img",
      iconName: "icofont-brand-windows",
      title: "Fruits",
    },
    {
      imgUrl:
        "https://static.vecteezy.com/system/resources/previews/003/721/948/original/cute-composition-of-sweet-dairy-products-with-berries-cocktail-and-ice-cream-raspberry-and-strawberry-yogurts-isolated-on-white-background-vector.jpg",
      imgAlt: "Dairy img",
      iconName: "icofont-brand-windows",
      title: "Dairy-Products",
    },
  ];

  return (
    <div className="flex flex-col justify-center my-6">
      <div className="px-4">
        <h2 className="text-4xl text-center font-bold my-11 text-black">
          {" "}
          {subTitle}
        </h2>
      </div>

      {/* Cards */}
      <div className="flex justify-center items-center gap-16 ">
        {categoryList.map((book, idx) => (
          <Link key={idx} to={`/shop`} className="flex flex-col justify-center items-center border rounded-md gap-4">
            <img className="w-[250px] h-[250px]" src={book.imgUrl} alt="" />
            <h3 className="font-bold text-xl text-blue-700 p-2">{book.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};
