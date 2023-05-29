import React, { useEffect, useState } from 'react';
import { FaSortAlphaUp, FaEraser,FaArrowAltCircleLeft } from 'react-icons/fa';
import AdminFooter from "../Admin Footer";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [sortedOrders, setSortedOrders] = useState([]);
  const [isSortedAscending, setIsSortedAscending] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/orders');
      const data = await response.json();
      setOrders(data);
      setSortedOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  const sortOrdersByName = () => {
    const sorted = [...sortedOrders].sort((a, b) => {
      const nameA = a.cart[0].category.name.toLowerCase();
      const nameB = b.cart[0].category.name.toLowerCase();

      if (nameA < nameB) {
        return isSortedAscending ? -1 : 1;
      }
      if (nameA > nameB) {
        return isSortedAscending ? 1 : -1;
      }
      return 0;
    });

    setSortedOrders(sorted);
    setIsSortedAscending(!isSortedAscending);
  };

  const clearOrders = async () => {
    setShowModal(true);
  };

  const handleConfirmClear = async () => {
    try {
      await fetch('http://localhost:4000/api/orders', { method: 'DELETE' });
      setOrders([]);
      setSortedOrders([]);
      setShowModal(false);
      toast.success("Order Cleared")
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  };

  const handleCancelClear = () => {
    setShowModal(false);
  };

  return (
    <><div className="text-center py-4 px-2 my-4">
        <h2 className="font-bold text-4xl text-white  mt-2 bg-gray-400 rounded-lg p-2">
         <Link to="/" className=" ">
              <FaArrowAltCircleLeft className="inline-block mr-5 ml-5 text-4xl hover:text-black" />
              
        </Link> Order Table
        </h2>
       
      </div>
       <div className="h-1 w-full bg-teal-600 mx-auto mb-10"></div>
    <div className="container mx-auto">
      
      <button
        className="mb-4 bg-green-500 hover:bg-black text-white font-bold py-2 px-4 rounded"
        onClick={sortOrdersByName}
      >
        <FaSortAlphaUp className="inline-block mr-2" /> Sort by Name
      </button>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="bg-teal-300">
            <th className="py-2">Name</th>
            <th className="py-2">Number of items purchased</th>
            <th className="py-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {sortedOrders.map((order, index) => (
            <tr
              key={order._id}
              className={`${index % 2 === 0 ? 'bg-white' : 'bg-teal-100'}`}
            >
              <td className="p-2">{order.cart[0].category.name}</td>
              <td className="p-2 text-center">{order.cart.length}</td>
              <td className="p-2">{new Date(order.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={clearOrders}
      >
        <FaEraser className="inline-block mr-2" /> Clear All
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded p-6">
            <p className="mb-4">Are you sure you want to clear all the order history?</p>
            <div className="flex justify-end">
              <button
                className="mr-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleConfirmClear}
              >
                Yes
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleCancelClear}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
     <div className="position bottom-0 left-0 w-full  text-center mt-20">
    <AdminFooter /></div></>
  );
};

export default OrderTable;
