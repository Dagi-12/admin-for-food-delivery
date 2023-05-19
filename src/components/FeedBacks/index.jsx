import styles from "./styles.module.css";
import React, { useEffect } from "react";
import { useState } from "react";
import AdminFooter from "../Admin Footer";

export default function FeedBack() {
  //fetching data from db
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/getFeedBack", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "FeedBack");
        setData(data.data);
      });
  }, []);

  return (
    <>
      <div className="text-center py-4 px-2 my-4">
        <h2 className="font-bold text-4xl text-green-500">FeedBacks</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 ml-4 mr-5">
        {data.map((ContactUs) => (
          <div
            key={ContactUs._id}
            className="border-2 border-gray-300 rounded-lg p-4 shadow-md shadow-sky-500"
          >
            <h3 className="bg-emerald-400 text-white py-2 px-4 rounded-md">
              {ContactUs.email}
            </h3>
            <p className="mt-4">{ContactUs.feedback}</p>
          </div>
        ))}
      </div>
      <div className="mt-5">
      <AdminFooter/></div>
    </>
  );
}
