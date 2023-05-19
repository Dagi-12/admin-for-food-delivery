// import styles from "./styles.module.css";
// import React, { useEffect } from "react";
// import { useState } from "react";
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// export default function PartnerRequest() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:4000/getAllPartners", {
//       method: "GET",
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data, "partnerData");
//         setData(data.data);
//       });
//   }, []);

//   const addPartner = (partnerId) => {
//     fetch("http://localhost:4000/api/restaurants", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data.find((partner) => partner._id === partnerId)),
//     })
//       .then((res) => res.json())
//       .then((data) => toast.success("Registered") , console.log(data))
//       .catch((err) =>   console.error(err), toast.error("Same Request Exist"));
//   };

//   return (
//     <>
//       <div className="text-center py-4 px-2 my-4">
//         <h2 className="font-bold text-4xl text-gray-600">PartnerRequest</h2>
//       </div>

//       <div className={styles.grid_container}>
//         {data.map((partner) => (
//           <div key={partner._id} className={styles.grid_item}>
//             <h3>{partner.restaurantName}</h3>
//             <p>{partner.location}</p>
//             <p>{partner.deliveryAreas}</p>
//             <p>{partner.email}</p>
//             <p>{partner.phone}</p>
//             <p>{partner.recentAchivements}</p>
//            <button
//               className="bg-orange-400 text-gray-50 rounded-md p-1 hover:bg-black hover:text-white"
//               onClick={() => addPartner(partner._id)}
//             >
//               Add To Collection
//             </button>
//           </div>
//         ))}
//       </div>    <ToastContainer />
//     </>
//   );
// }
import styles from "./styles.module.css";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//FaSave
import { FaDownload } from "react-icons/fa";
export default function PartnerRequest() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/getAllPartners", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "partnerData");
        setData(data.data);
      });
  }, []);

  const [addedPartners, setAddedPartners] = useState([]);

  const addPartner = async (partnerId) => {
    try {
      const res = await fetch("http://localhost:4000/api/restaurants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data.find((partner) => partner._id === partnerId)),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Registered"); // Show success toast
        setAddedPartners((prevAddedPartners) => [
          ...prevAddedPartners,
          partnerId,
        ]); // Update added partners state
      } else {
        toast.error("Same Request Exist"); // Show error toast
      }
    } catch (error) {
      console.error(error);
      toast.error("Error occurred"); // Show error toast
    }
  };

  return (
    <div className="p-5">
      <div className="text-center py-4 px-2 my-4">
        <h2 className="font-bold text-4xl text-gray-600">PartnerRequest</h2>
      </div>

      <div className={styles.grid_container}>
        {data.map((partner) => (
          <div key={partner._id} className={styles.grid_item}>
            <h3>{partner.restaurantName}</h3>
            <p> <span className="font-bold mb-10">Location:</span>  {partner.location}</p>
            <p><span className="font-bold mb-10">Delivery areas:</span>  {partner.deliveryAreas}</p>
            <p><span className="font-bold mb-10">Email :</span> {partner.email}</p>
            <p><span className="font-bold mb-10">Phone:</span> {partner.phone}</p>
            <p><span className="font-bold mb-10">Achivements:</span> {partner.recentAchivements}</p>
            {!addedPartners.includes(partner._id) && (
              <button
                className="bg-orange-400 text-gray-50 rounded-md p-1 hover:bg-black hover:text-white"
                onClick={() => addPartner(partner._id)}
              >
              <FaDownload className="inline-block mr-2" />  Add To Collection
              </button>
            )}
          </div>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
}

