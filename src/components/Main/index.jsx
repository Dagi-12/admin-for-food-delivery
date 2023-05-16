import styles from "./styles.module.css";
import React, { useEffect } from "react";
import { useState } from "react";


const Main = () => {
  const [data, setData] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar + " flex items-center justify-between shadow bg-gradient-to-r from-teal-400 to-white h-16"}>
  <h1 className="text-3xl font-bold text-white ml-5">Admin</h1>
  <button className="px-4 py-2 rounded text-white bg-red-500 hover:bg-red-600 ml-auto mr-10 " onClick={handleLogout}>
    Logout
  </button>
</nav>

    <div className="relative w-full h-80">
  <img src={require("../../assets/images/food.jpg")} className="w-full h-full object-cover" alt="your-image-description" />
 <a href="/add-menu">
  <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-8 py-3 rounded-lg text-white bg-green-500 hover:bg-green-600 text-lg font-medium">
    Add Menu
  </button>
</a>

</div>



      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        <div className={`bg-gradient-to-br from-green-200 to-yellow-200 rounded-lg shadow-lg p-4`}>
          <h2 className="text-lg font-bold mb-2">Partner Request</h2>
          <a href="/partner-request" className="px-4 py-2 rounded text-white bg-green-500 hover:bg-green-600">
            Show Requests
          </a>
        </div>
        <div className={`bg-gradient-to-br from-green-200 to-yellow-200 rounded-lg shadow-lg p-4`}>
          <h2 className="text-lg font-bold mb-2">Rider Application</h2>
          <a href="/rider-application" className="px-4 py-2 rounded text-white bg-green-500 hover:bg-green-600">
            Show Applications
          </a>
        </div>
        <div className={`bg-gradient-to-br from-green-200 to-yellow-200 rounded-lg shadow-lg p-4`}>
          <h2 className="text-lg font-bold mb-2">Customer Feedbacks</h2>
          <a href="/feedback" className="px-4 py-2 rounded text-white bg-green-500 hover:bg-green-600">
            Show Feedbacks
          </a>
        </div>
      </div>
    </div>
  );
};

export default Main;
