import { useState } from "react";
import axios from "axios";
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import AdminFooter from "../Admin Footer";

export default function AddMenu()  {
  const [name, setName] = useState("");
  const [adjective, setAdjective] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryEmail, setCategoryEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData()
    data.append("name",name)
    data.append("adjective",adjective)
    data.append("description",description)
    data.append("price",price)
    data.append("category",categoryName)
    data.append('email',categoryEmail)
    data.append('imageUrl',imageUrl)



    try {
      const response = await axios.post('http://localhost:4000/products', {
        name,
        adjective,
        description,
        price,
        category:categoryName ,
        email:categoryEmail,
        imageUrl,
      });

      console.log(response.data); // Optional: Log the response from the server
      // Reset form fields
      setName("");
      setAdjective("");
      setDescription("");
      setPrice("");
      setCategoryName("");
      setCategoryEmail("");
      setImageUrl("");
      setError(null);
       toast.success('Product created successfully ✅');
    } catch (error) {
      console.error(error);
      setError("An error occurred while creating the product");
       toast.error(' An error occurred while creating the product');
    }
  };

  return (
    <>
    <div className="m-10 ">
<div className="flex justify-center items-center p-10" >
  <div className="w-3/4 bg-transparent shadow-lg rounded-lg p-6" style={{ boxShadow: "0 0 10px #14CAD3" }}>
    <ToastContainer />
    <h2 className="text-4xl font-bold mb-4 text-center text-orange-500 mb-5">Add Product</h2>
    {error && (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md mb-4">
        {error}
      </div>
    )}
    
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block font-bold mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="w-full border border-gray-300 rounded-md py-2 px-3"
          value={name}
        
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="adjective" className="block font-bold mb-2">
          Adjective
        </label>
        <input
          type="text"
          id="adjective"
          className="w-full border border-gray-300 rounded-md py-2 px-3"
          value={adjective}
          onChange={(e) => setAdjective(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block font-bold mb-2">
          Description
        </label>
        <textarea
          id="description"
          className="w-full border border-gray-300 rounded-md py-2 px-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block font-bold mb-2">
          Price
        </label>
        <input
          type="text"
          id="price"
          className="w-full border border-gray-300 rounded-md py-2 px-3"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="categoryName" className="block font-bold mb-2">
          Category Name
        </label>
        <input
          type="text"
          id="categoryName"
          className="w-full border border-gray-300 rounded-md py-2 px-3"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="categoryEmail" className="block font-bold mb-2">
          Category Email
        </label>
        <input
          type="email"
          id="categoryEmail"
          className="w-full border border-gray-300 rounded-md py-2 px-3"
          value={categoryEmail}
          onChange={(e) => setCategoryEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="imageUrl" className="block font-bold mb-2">
          Image URL
        </label>
        <input
          type="text"
          id="imageUrl"
          className="w-full border border-gray-300 rounded-md py-2 px-3"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-orange-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-md w-full"
>
Add Product
</button>
<div className="text-left mt-4">
            <Link to="/" className="px-4 py-2 rounded-md bg-gray-700 text-white hover:bg-black hover:text-white ml-auto">
              <FaHome className="inline-block mr-2" />Home</Link>
          </div>
</form>
</div>
 
  </div>

</div><AdminFooter/></>
)}


