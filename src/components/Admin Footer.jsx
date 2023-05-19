import { FaRegCopyright } from "react-icons/fa";

const AdminFooter = () => {
  return (
    <footer className="bg-black py-4 text-center">
      <div className="text-white">
        <p className="text-l text-b">
          Admin Page For Online Food Delivery
        </p>
        <p className="text-xs mt-1">
          &copy; {new Date().getFullYear()} All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default AdminFooter;
