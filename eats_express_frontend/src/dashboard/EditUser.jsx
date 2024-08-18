import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditUser = () => {
  const navigate = useNavigate()
  const { userId } = useParams();
  const [user, setUser] = useState({
    userId: 0,
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    city: "",
    state: "",
    country: "",
  });
  const getUser = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/user/${userId}`);
      if (res.data) {
        setUser(res.data);
      }
      console.log(res.data);
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:8080/user/update", user);
      console.log(res);
      toast.success("User Updated Successfully.");
      if(res.data){
        // navigate("/admin/dashboard/manage-users")
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  console.log(user);

  return (
    <div className="w-full mt-16 ml-52">
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg border mb-5">
          <h1 className="text-2xl font-semibold mb-4">Edit User</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                defaultValue={user.firstName}
                value={user.firstName}
                onChange={(e) =>
                  setUser({ ...user, firstName: e.target.value })
                }
                className="mt-1 p-2 border rounded-md w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                defaultValue={user.lastName}
                value={user.lastName}
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                className="mt-1 p-2 border rounded-md w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="mobileNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Mobile Number
              </label>
              <input
                type="text"
                id="mobileNumber"
                defaultValue={user.mobileNumber}
                value={user.mobileNumber}
                onChange={(e) =>
                  setUser({ ...user, mobileNumber: e.target.value })
                }
                className="mt-1 p-2 border rounded-md w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                defaultValue={user.email}
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="mt-1 p-2 border rounded-md w-full"
                required
              />
            </div>
            {/* <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div> */}
            <div className="mb-4">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                defaultValue={user.city}
                value={user.city}
                onChange={(e) => setUser({ ...user, city: e.target.value })}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700"
              >
                State
              </label>
              <input
                type="text"
                id="state"
                defaultValue={user.state}
                value={user.state}
                onChange={(e) => setUser({ ...user, state: e.target.value })}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                defaultValue={user.country}
                value={user.country}
                onChange={(e) => setUser({ ...user, country: e.target.value })}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Update User
            </button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default EditUser;
