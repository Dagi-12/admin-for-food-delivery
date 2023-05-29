import React, { useEffect, useState } from 'react';
import AdminFooter from "../Admin Footer";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrash ,FaArrowAltCircleLeft} from "react-icons/fa";
import { Link } from 'react-router-dom';
const Riders = () => {
  const [validRiders, setValidRiders] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/validriders')
      .then((response) => response.json())
      .then((data) => setValidRiders(data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:4000/api/validriders/${id}`, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then((data) => {
         toast.success(data.message);
        
        // Filter out the deleted rider from the state
        setValidRiders((prevRiders) => prevRiders.filter((rider) => rider._id !== id));
      })
      .catch((error) =>{  toast.error('Failed to delete rider');
       console.error(error)});
  };

  return (
    <>
     <div className="text-center py-4 px-2 my-4">
          <h2 className="font-bold text-4xl text-white mb-5 mt-5 bg-gray-400 rounded-lg p-2">
             <Link to="/" className=" ">
              <FaArrowAltCircleLeft className="inline-block mr-5 ml-5 text-4xl hover:text-black" />
              
        </Link>LIST OF VALID RIDERS
          </h2>
          <div className="h-1 w-full bg-teal-600 mx-auto mb-5"></div>
        </div>
    <div className="overflow-x-auto ml-2 mr-2">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b bg-teal-300">First Name</th>
            <th className="py-2 px-4 border-b bg-teal-300">Last Name</th>
            <th className="py-2 px-4 border-b bg-teal-300">Email</th>
            <th className="py-2 px-4 border-b bg-teal-300">Phone</th>
            <th className="py-2 px-4 border-b bg-teal-300">Vehicle Type</th>
            <th className="py-2 px-4 border-b bg-teal-300">Actions</th> {/* Added Actions column */}
          </tr>
        </thead>
        <tbody>
          {validRiders.map((rider, index) => (
            <tr key={rider._id} className={index % 2 === 0 ? 'bg-teal-100' : ''}>
              <td className="py-2 px-4 border-b">{rider.firstName}</td>
              <td className="py-2 px-4 border-b">{rider.lastName}</td>
              <td className="py-2 px-4 border-b">{rider.email}</td>
              <td className="py-2 px-4 border-b">{rider.phone}</td>
              <td className="py-2 px-4 border-b">{rider.vehicleType}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleDelete(rider._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  <FaTrash className="inline-block mr-2" /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
    <div className="position bottom-0 left-0 w-full  text-center mt-20">
    <AdminFooter /></div>
    </>
  );
};

export default Riders;
