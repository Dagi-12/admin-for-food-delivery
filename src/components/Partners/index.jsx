import React, { useEffect } from "react";
import { useState } from "react";
import AdminFooter from "../Admin Footer";
export default function Partners() {
     //fetching data from db
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/getAllRestaurants", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "Registerd partners");
        setData(data.data);
      });
  }, []);
  return (
    <>
    <div>
        
      <div className="text-center py-4 px-2 my-4">
        <h2 className="font-bold text-4xl text-red-500 mb-5 mt-5">LIST OF CURRRENTLY WORKING WITH PARTNERED ENTITIES </h2>
         <div className="h-1 w-full bg-red-600 mx-auto mb-5"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {data.map((restaurant) => (
          <div
            key={restaurant._id}
            className="border-2 border-gray-300 rounded-lg p-4  shadow-md shadow-teal-300 mb-5 ml-5 mr-5" 
          >
            <h3 className="bg-gradient-to-br from-emerald-500 to-yellow-200 rounded-lg shadow-lg  text-white py-2 px-4 rounded-md">
              {restaurant.restaurantName}  
            </h3>
            <p  className="mt-4"> <span className="font-bold mb-10">Name:</span>  {restaurant.restaurantName}</p>
            <p className="mt-4"> <span className="font-bold mb-10">Location:</span>  {restaurant.location}</p>
            <p className="mt-4"><span className="font-bold mb-10">Email:</span>  {restaurant.email}</p>
            <p className="mt-4"><span className="font-bold mb-10">Phone:</span>  {restaurant.phone}</p>
          </div>
        ))}
      </div>

    </div>
     <div className="mt-5">
      <AdminFooter/></div></>
  )
}
