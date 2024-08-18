import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageUsers = () => {
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [addUserComponent, setAddUserComponent] = useState(false);
  const [userId, setUserId] = useState(0);

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:8080/user");
      console.log(res.data);
      if (res.data) {
        setAllUsers(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      firstName,
      lastName,
      mobileNumber,
      email,
      password,
      city,
      state,
      country,
      role: "CUSTOMER", // Hidden role with default value
    };

    try {
      await axios.post("http://localhost:8080/user", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Signup successful! Redirecting to login...");
      // setTimeout(() => navigate('/login'), 2000); // Redirect to Sign In page after 2 seconds
    } catch (error) {
      toast.error("Signup failed. Please try again.");
    }
  };

  const deleteUser = async (userId) => {
    try {
      const res = await axios.delete(`http://localhost:8080/user/${userId}`);
      console.log(res.data);
      toast.success("User deleted succesfully.");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete user. Please try again.");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="w-full mt-16 ml-52">
      <div className="w-full flex justify-between mb-8 py-4 px-6">
        <h2 className="text-3xl font-bold">
          {addUserComponent ? "Add user" : "Manage your users"}
        </h2>
        {addUserComponent ? (
          <button
            className="px-2 bg-red-500 rounded-md text-white"
            onClick={() => setAddUserComponent(false)}
          >
            Cancel
          </button>
        ) : (
          <button
            className="px-2 bg-green-500 rounded-md text-white"
            onClick={() => setAddUserComponent(true)}
          >
            Add User
          </button>
        )}
      </div>
      {addUserComponent ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg border mb-5">
            <h1 className="text-2xl font-semibold mb-4">Sign Up</h1>
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
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
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
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
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
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 p-2 border rounded-md w-full"
                  required
                />
              </div>
              <div className="mb-4">
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
              </div>
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
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
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
                  value={state}
                  onChange={(e) => setState(e.target.value)}
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
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Sign Up
              </button>
            </form>
            <ToastContainer />
          </div>
        </div>
      ) : (
        <Table hoverable className="w-full float-right">
          <Table.Head>
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Email ID</Table.HeadCell>
            <Table.HeadCell>Mobile Number</Table.HeadCell>
            <Table.HeadCell>
              <span>Action</span>
            </Table.HeadCell>
          </Table.Head>
          {Array.isArray(allUsers) && allUsers.length > 0 ? (
            allUsers.map((user, idx) => (
              <Table.Body
                key={idx}
                className="w-full divide-y hover:bg-slate-100 text-center"
              >
                <Table.Row className="w-full bg-white hover:bg-slate-100">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                    {user.userId}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                    {user.firstName + " " + user.lastName}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                    {user.email}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                    {user.mobileNumber}
                  </Table.Cell>
                  <Table.Cell>
                    <button
                      onClick={() => navigate(`/admin/dashboard/manage-users/edit/${user.userId}`)}
                      className="font-semibold text-cyan-600 px-4 py-1 rounded-lg hover:bg-gray-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteUser(user.userId)}
                      className="bg-red-600 py-1 font-semibold text-white rounded-lg px-4 ml-5"
                    >
                      Delete
                    </button>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))
          ) : (
            <Table.Body className="divide-y">
              <Table.Row>
                <Table.Cell mt-5 colSpan={6} className="text-center text-xl font-bold">
                  No users available
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          )}
        </Table>
      )}
    </div>
  );
};

export default ManageUsers;
