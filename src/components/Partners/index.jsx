import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminFooter from "../Admin Footer";

export default function Partners() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/restaurants");
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <div className="text-center py-4 px-2 my-4">
          <h2 className="font-bold text-4xl text-red-500 mb-5 mt-5">
            LIST OF CURRENTLY WORKING WITH PARTNERED ENTITIES
          </h2>
          <div className="h-1 w-full bg-red-600 mx-auto mb-5"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data.map((restaurant) => (
            <div
              key={restaurant._id}
              className="border-2 border-gray-300 rounded-lg p-4 shadow-md shadow-teal-300 mb-5 ml-5 mr-5"
            >
              <h3 className="bg-gradient-to-br from-emerald-500 to-yellow-200 rounded-lg shadow-lg text-white py-2 px-4 rounded-md">
                {restaurant.restaurantName}
              </h3>
              <p className="mt-4">
                <span className="font-bold mb-10">Name:</span>{" "}
                {restaurant.restaurantName}
              </p>
              <p className="mt-4">
                <span className="font-bold mb-10">Location:</span>{" "}
                {restaurant.location}
              </p>
              <p className="mt-4">
                <span className="font-bold mb-10">Email:</span>{" "}
                {restaurant.email}
              </p>
              <p className="mt-4">
                <span className="font-bold mb-10">Phone:</span>{" "}
                {restaurant.phone}
              </p>

              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={() => handleDelete(restaurant._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5">
        <AdminFooter />
      </div>
    </>
  );
}
