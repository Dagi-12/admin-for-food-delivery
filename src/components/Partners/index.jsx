import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminFooter from '../Admin Footer';
import { FaTrash,FaArrowAltCircleLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
export default function Partners() {

   //1
   const [validRiders, setValidRiders] = useState([]);

useEffect(() => {
  fetch('http://localhost:4000/api/validriders')
    .then((response) => response.json())
    .then((data) => {
      const formattedData = data.map(({ firstName, lastName, email, phone, vehicleType }) => (
        [firstName, lastName, email, phone, vehicleType,]
      ));
      setValidRiders(formattedData);
    })
    .catch((error) => console.error(error));
}, []);
const formattedValidRiders = validRiders.map((rider) => `➡️${rider.join(", ")}\n`);

  //1
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

  //sending email
   const handlePartnersContact = (email) => {
    const emailSubject = 'Regarding Providing You With Delivey Persons  ';
    const emailBody = `Dear Partner , Here is a list of our valid delivery personnel with their respective contact addresses in the form of firstname, lastname, email, phone, and vehicle type:- \n${formattedValidRiders} So any time there is an order you can contact them and they will deliver the items you are going to provided them. Thanks for working with us.` ;
    const encodedSubject = encodeURIComponent(emailSubject);
    const encodedBody = encodeURIComponent(emailBody);
    const mailtoLink = `https://mail.google.com/mail/?view=cm&to=${email}&su=${encodedSubject}&body=${encodedBody}`;
    const emailWindow= window.open(mailtoLink, '_blank');

    
    // Check if the email window is opened
    if (emailWindow) {
      // Display a success toast message
      toast.success('Email sent successfully!');
    } else {
      // Display an error toast message if the email window fails to open
      toast.error('Failed to open email window!');
    }

  };
  //
  return (
    <>
      <div>
        <div className="text-center py-4 px-2 my-4 ">
          <h2 className="font-bold text-4xl text-white mb-5 mt-5 bg-gray-400 rounded-lg p-2">
           <Link to="/" className=" ">
              <FaArrowAltCircleLeft className="inline-block mr-5 ml-5 text-4xl hover:text-black" />
              
        </Link>  LIST OF CURRENTLY WORKING WITH PARTNERED ENTITIES
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
                  {/*  <p>
                <span className="font-bold mb-10">Email :</span> <span className=" hover:text-orange-600 
                hover:cursor-pointer" onClick={() => handlePartnersContact(partner.email)}>{partner.email}</span>
              </p> */}
                  <td className="py-2 px-4 border-b hover:text-orange-600 
                hover:cursor-pointer" onClick={() => handlePartnersContact(restaurant.email)}>{restaurant.email}</td>
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
     <div className="position bottom-0 left-0 w-full  text-center mt-20">
    <AdminFooter /></div>
    </>
  );
}
