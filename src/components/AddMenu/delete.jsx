import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import { FaArrowAltCircleLeft} from "react-icons/fa";
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
      // setCategoryName("");
      setError(null);
      toast.success('Product Deleted successfully ✅');
    } catch (error) {
      console.error(error);
      setError("An error occurred while deleting the product");
      toast.error('An error occurred while Deleting the product');
    }
  };

  return (
    <>
      <div className="bg-gray-800 py-6">
        <h2 className="text-4xl font-bold text-white text-center py-2 shadow-lg">
          Deleting Products From the Menu Page
        </h2>
      </div>
      <div className="min-h-screen flex flex-col sm:items-center justify-center sm:p-2">
        <div className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto ">
          <div className="bg-transparent shadow-xl shadow-red-500 rounded-xl p-6">
            <h2 className="text-4xl font-bold mb-4 text-center text-orange-500">
              <Link to="/" className=" ">
                <FaArrowAltCircleLeft className="inline-block mr-5 ml-5 text-4xl hover:text-black" />
              </Link>
              Delete Product
            </h2>
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
            </form>
          </div>
        </div>
      </div>
      <AdminFooter />
    </>
  );
}
