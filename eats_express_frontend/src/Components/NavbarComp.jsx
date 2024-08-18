import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBarsStaggered, FaCartShopping, FaXmark } from "react-icons/fa6";
import { GiBurningBook } from "react-icons/gi";
export default function NavbarComp() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setSticky] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  useEffect(() => {
    const handelScroll = () => {
      if (window.scrollY > 100) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", handelScroll);
    return () => {
      window.addEventListener("scroll", handelScroll);
    };
  }, []);

  const userId = localStorage.getItem("userid");

  const navItem = [
    { link: "home", path: "/" },
    { link: "shop", path: "/shop" },
    { link: "Favourite", path: "/favs" },
    { link: "cart", path: "/cart" },
    { link: "admin", path: "/admin/dashboard" },
  ];

  useEffect(() => {
    if (userId) {
      navItem.push({ link: "logout", path: "/logout" });
    } else {
      navItem.push({ link: "login", path: "/login" });
    }
  }, [userId]);

  return (
    <header className="w-full fixed top-0 left-0 right-0 backdrop-blur-lg bg-white/30 border">
      <nav className={`py-5 lg:px-24 px-4 `}>
        <div className="flex justify-between items-center text-base gap-8">
          {/* Logo Here */}
          <Link
            to="/"
            className="text-2xl font-bold text-green-900 flex flex-col items-center gap-2"
          >
            ^..^ Organic Eats Express{" "}
          </Link>

          {/* nav items for large device */}

          <ul className="md:flex space-x-12 hidden">
            {navItem.map(({ link, path }) => (
              <Link
                key={path}
                to={path}
                className="block text-base uppercase cursor-pointer hover:text-green-500"
              >
                {link}
              </Link>
            ))}
          </ul>

          <div className="hidden lg:flex lg:gap-4 ">
            {userId ? (
              <>
                <Link
                  to="/cart"
                  className="text-green-500 hover:text-green-600"
                >
                  <FaCartShopping className="h-6 w-6" />
                </Link>
                <Link
                  to="/logout"
                  className="text-green-500 hover:text-green-600"
                >
                  Logout
                </Link>
              </>
            ) : (
              <Link to="/login" className="text-green-500 hover:text-green-600">
                Login
              </Link>
            )}
          </div>

          {/* menu btn for the mobile devices */}
          <div className="block md:hidden lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <FaXmark className="h-5 w-5 text-black" />
              ) : (
                <FaBarsStaggered className="h-5 w-5 text-black" />
              )}
            </button>
          </div>
        </div>
        <div
          className={`space-y-4 px-4 mt-16 py-7 bg-green-400 ${
            isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"
          }`}
        >
          {navItem.map(({ link, path }) => (
            <Link
              key={path}
              to={path}
              className="block text-base text-white uppercase cursor-pointer "
            >
              {link}
            </Link>
          ))}
          {userId ? (
            <Link to="/logout" className="block text-base text-white uppercase cursor-pointer ">
              Logout
            </Link>
          ) : (
            <Link to="/login" className="block text-base text-white uppercase cursor-pointer ">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
