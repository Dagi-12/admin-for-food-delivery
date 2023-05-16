
import React, { useEffect } from "react";
import { useState } from "react";
export default function RiderApplication() {
  //fetching data from db
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
  return (
      <>
      <div className="text-center py-4 px-2 my-4">
        <h2 className="font-bold text-4xl text-red-500">Rider Applications</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
        {data.map((rider) => (
          <div
            key={rider._id}
            className="border-2 border-gray-300 rounded-lg p-4  shadow-md shadow-red-500"
          >
            <h3 className="bg-orange-400 text-white py-2 px-4 rounded-md">
              {rider.firstName}  {rider.lastName}
            </h3>
            <p className="mt-4">{rider.email}</p>
            <p className="mt-4">{rider.phone}</p>
            <p className="mt-4">{rider.vehicleType}</p>
            <p className="mt-4">{rider.AboutYourSelf}</p>
          </div>
        ))}
      </div>
    </>
  )
}
