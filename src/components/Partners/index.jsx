import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminFooter from '../Admin Footer';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Partners() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/restaurants');
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/restaurants/${id}`);
      // Refresh the data after successful deletion
      fetchData();
      toast.success('Restaurant Deleted');
    } catch (error) {
      console.error(error);
      toast.error('Error occurred');
    }
  };

  return (
    <>
      <div>
        <div className="text-center py-4 px-2 my-4 ">
          <h2 className="font-bold text-4xl text-white mb-5 mt-5 bg-gray-400 rounded-lg p-2">
            LIST OF CURRENTLY WORKING WITH PARTNERED ENTITIES
          </h2>
          <div className="h-1 w-full bg-red-600 mx-auto mb-5"></div>
        </div>

        <div className="overflow-x-auto ml-2 mr-2">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b bg-teal-300 text-white">Name</th>
                <th className="py-2 px-4 border-b bg-teal-300 text-white">Location</th>
                <th className="py-2 px-4 border-b bg-teal-300 text-white">Email</th>
                <th className="py-2 px-4 border-b bg-teal-300 text-white">Phone</th>
                <th className="py-2 px-4 border-b bg-teal-300 text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((restaurant, index) => (
                <tr key={restaurant._id} className={index % 2 === 0 ? 'bg-teal-100' : 'bg-white'}>
                  <td className="py-2 px-4 border-b">{restaurant.restaurantName}</td>
                  <td className="py-2 px-4 border-b">{restaurant.location}</td>
                  <td className="py-2 px-4 border-b">{restaurant.email}</td>
                  <td className="py-2 px-4 border-b">{restaurant.phone}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDelete(restaurant._id)}
                    >
                      <FaTrash className="inline-block mr-2" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-5">
        <AdminFooter />
      </div>
    </>
  );
}
