import { useState } from "react";
import axios from "axios";
import React from 'react'



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
    } catch (error) {
      console.error(error);
      setError("An error occurred while creating the product");
    }
  };

  return (
  <div className="max-w-md mx-auto">
    <h2 className="text-3xl font-bold mb-4">Add Product</h2>
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
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
>
Add Product
</button>
</form>

  </div>
)}


