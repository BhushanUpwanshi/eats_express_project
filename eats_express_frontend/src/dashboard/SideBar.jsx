import { Sidebar } from "flowbite-react";
import { BiBuoy } from "react-icons/bi";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiOutlineCloudUpload,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import { Link } from "react-router-dom";

export const SideBar = () => {
  return (
    <>
      <div className="h-full fixed left-0 top-[4.5rem] z-50">
        <Sidebar
          aria-label="Sidebar with content separator example"
          className="h-full "
        >
          {/* <Sidebar.Logo href="#" img={""} imgAlt="Organic Eats Express ">
                Organic_Eats_Express
            </Sidebar.Logo> */}
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Link to={"/admin/dashboard"}>
                <Sidebar.Item href="/admin/dashboard" icon={HiChartPie}>
                  Welcome Admin
                </Sidebar.Item>
              </Link>
              <Link to={"/admin/dashboard/upload"}>
                <Sidebar.Item
                  href="/admin/dashboard/upload"
                  icon={HiOutlineCloudUpload}
                >
                  Upload Product
                </Sidebar.Item>
              </Link>
              <Link to={"/admin/dashboard/manage-products"}>
                <Sidebar.Item
                  href="/admin/dashboard/manage-products"
                  icon={HiInbox}
                >
                  Manage Products
                </Sidebar.Item>
              </Link>
              <Link to={"/admin/dashboard/manage-users"}>
                <Sidebar.Item
                  href="/admin/dashboard/manage-users"
                  icon={HiUser}
                >
                  Manage Users
                </Sidebar.Item>
              </Link>
              <Link to={"/admin/dashboard/category"}>
                <Sidebar.Item
                  href="/admin/dashboard/category"
                  icon={HiShoppingBag}
                >
                  Manage Category
                </Sidebar.Item>
              </Link>
              <Sidebar.Item href="/login" icon={HiArrowSmRight}>
                Sign In
              </Sidebar.Item>
              <Sidebar.Item href="/logout" icon={HiTable}>
                Logout
              </Sidebar.Item>
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              <Sidebar.Item href="/admin/dashboard/orders" icon={HiChartPie}>
                Orders
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiViewBoards}>
                Documentation
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={BiBuoy}>
                Help
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>
    </>
  );
};
