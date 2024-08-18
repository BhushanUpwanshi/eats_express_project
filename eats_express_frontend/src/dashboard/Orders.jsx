import axios from "axios";
import { Table } from "flowbite-react";
import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:8080/orders");
      console.log(res.data);
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div className="w-full mt-16 ml-52">
      <div className="w-full flex justify-between mb-8 py-4 px-6">
        <h2 className="text-3xl font-bold">Orders</h2>
      </div>
      <Table hoverable className="w-full float-right">
        <Table.Head>
          <Table.HeadCell>Order ID</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Order Date</Table.HeadCell>
          <Table.HeadCell>Payment ID</Table.HeadCell>
          <Table.HeadCell>Total Amount</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          {/* <Table.HeadCell>
            <span>Action</span>
          </Table.HeadCell> */}
        </Table.Head>
        {Array.isArray(orders) && orders.length > 0 ? (
          orders.map((order, idx) => (
            <Table.Body
              key={idx}
              className="w-full divide-y hover:bg-slate-100 text-center"
            >
              <Table.Row className="w-full bg-white hover:bg-slate-100">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                  {order?.orderId}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                  {order?.email}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                  {order?.orderDate}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                  {order?.payment?.paymentId}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                  {order?.totalAmount}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                  Order placed
                  {/* {order?.totalAmount} */}
                </Table.Cell>
                {/* <Table.Cell>
                  <button
                    onClick={() =>
                      navigate(
                        `/admin/dashboard/manage-users/edit/${order.userId}`
                      )
                    }
                    className="font-semibold text-cyan-600 px-4 py-1 rounded-lg hover:bg-gray-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteUser(order.userId)}
                    className="bg-red-600 py-1 font-semibold text-white rounded-lg px-4 ml-5"
                  >
                    Delete
                  </button>
                </Table.Cell> */}
              </Table.Row>
            </Table.Body>
          ))
        ) : (
          <Table.Body className="divide-y">
            <Table.Row>
              <Table.Cell
                mt-5
                colSpan={6}
                className="text-center text-xl font-bold"
              >
                No users available
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        )}
      </Table>
    </div>
  );
};

export default Orders;
