import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import AdminFooter from "../Admin Footer";
export default function DeleteMenu() {
  const [name, setName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.delete('http://localhost:4000/products', {
        params: {
          name,
          category: categoryName
        }
      });

      console.log(response.data); // Optional: Log the response from the server
      // Reset form fields
      setName("");
      setCategoryName("");
      setError(null);
      toast.success('Product Deleted successfully ✅');
    } catch (error) {
      console.error(error);
      setError("An error occurred while deleting the product");
      toast.error('An error occurred while Deleting the product');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
    <div className="flex justify-center items-center p-10 flex-grow">
      <div className="w-3/4 bg-transparent shadow-lg rounded-lg p-6" style={{ boxShadow: "0 0 10px #14CAD3" }}>
        <h2 className="text-4xl font-bold mb-4 text-center text-orange-500 mb-5">Delete Product</h2>
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

          <button
            type="submit"
            className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-md w-full"
          >
            Delete Product
          </button>
          
          <div className="text-left mt-4">
            <Link to="/" className="px-4 py-2 rounded-md bg-gray-700 text-white hover:bg-black hover:text-white ml-auto">
              <FaHome className="inline-block mr-2" />Home</Link>
          </div>
        </form>
      </div>
    </div>
    <AdminFooter/></div>
    
  );
}
