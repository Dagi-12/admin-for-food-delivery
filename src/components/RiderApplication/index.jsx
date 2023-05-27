import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTrash } from "react-icons/fa";
import AdminFooter from "../Admin Footer";

export default function RiderApplication() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/getRiderApplication", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "RiderApplications");
        setData(data.data);
      });
  }, []);

  const deleteRiderApplication = async (riderId) => {
    try {
      const res = await fetch(`http://localhost:4000/deleteRiderApplication/${riderId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setData((prevData) => prevData.filter((rider) => rider._id !== riderId));
        toast.success("Rider application deleted successfully");
      } else {
        console.error("Failed to delete rider application");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error Occured");
    }
  };

  const addToCollection = async (rider) => {
  try {
    const res = await fetch("http://localhost:4000/api/validriders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rider),
    });

    if (res.ok) {
      const result = await res.json();
      if (result.error) {
        toast.warning("Rider already exists in the collection");
      } else {
        toast.success("Rider added to collection successfully");
      }
    } else {
      toast.error("Failed to add rider to collection");
    }
  } catch (error) {
    console.error(error);
    toast.error("Error Occurred");
  }
};


  return (
    <>
      <div className="p-5">
        <div className="text-center py-4 px-2 my-4">
          <h2 className="font-bold text-4xl text-red-500 ">Rider Applications</h2>
          <div className="h-1 w-full bg-gray-400 mx-auto mt-5 mb-5"></div>
        </div>

        <div className="grid grid-cols-1 ">
          {data.map((rider) => (
            <div
              key={rider._id}
              className="border-2 border-gray-300 rounded-lg p-4  shadow-md shadow-red-500 mb-5"
            >
              <h3 className="bg-orange-400 text-white py-2 px-4 rounded-md">
                {rider.firstName} {rider.lastName}
              </h3>
              <p className="mt-4">
                <span className="font-bold mb-10">Email:</span> {rider.email}
              </p>
              <p className="mt-4">
                <span className="font-bold mb-10">Phone:</span> {rider.phone}
              </p>
              <p className="mt-4">
                <span className="font-bold mb-10">VehicleType:</span> {rider.vehicleType}
              </p>
              <p className="mt-4">
                <span className="font-bold mb-10">About AboutYourSelf:</span> {rider.AboutYourSelf}
              </p>
              <button
                className="bg-red-500 text-white py-1 px-3 rounded-md mt-4"
                onClick={() => deleteRiderApplication(rider._id)}
              >
                <FaTrash className="inline-block mr-2" /> Delete
              </button>
              <button
                className="bg-green-500 text-white py-1 px-3 rounded-md mt-4 ml-2"
                onClick={() => addToCollection(rider)}
              >
                Add to Valid Riders
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
