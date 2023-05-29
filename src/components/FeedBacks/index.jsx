import React, { useEffect, useState } from "react";
import AdminFooter from "../Admin Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTrash ,FaArrowAltCircleLeft} from "react-icons/fa";
import { Link } from "react-router-dom";
export default function FeedBack() {
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

  const deleteFeedback = async (feedbackId) => {
    try {
      const res = await fetch(`http://localhost:4000/deleteFeedback/${feedbackId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setData((prevData) => prevData.filter((feedback) => feedback._id !== feedbackId));
         toast.success("Feedback deleted successfully");
      } else {
       toast.error("Failed to delete feedback");
      }
    } catch (error) {
      toast.error("Error occurred");
    }
  };

  return (
    <>
      <div className="text-center py-4 px-2 my-4">
        <h2 className="font-bold text-4xl text-green-500"><Link to="/" className=" ">
              <FaArrowAltCircleLeft className="inline-block mr-5 ml-5 text-4xl hover:text-black" />
              
        </Link>FeedBacks</h2>
        <div className="h-1 w-full bg-teal-500 mx-auto mt-5 mb-5"></div>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 ml-4 mr-5">
        {data.map((feedback) => (
          <div
            key={feedback._id}
            className="border-2 border-gray-300 rounded-lg p-4 shadow-md shadow-sky-500"
          >
            <h3 className="bg-emerald-400 text-white py-2 px-4 rounded-md">
              {feedback.email}
            </h3>
            <p className="mt-4">{feedback.feedback}</p>
            <button
              className="bg-red-500 text-white py-1 px-3 rounded-md mt-4"
              onClick={() => deleteFeedback(feedback._id)}
            >
              <FaTrash className="inline-block mr-2" /> Delete
            </button>
          </div>
        ))}
      </div>
      <div className="position bottom-0 left-0 w-full  text-center mt-20">
    <AdminFooter /></div>
    </>
  );
}
