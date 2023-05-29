import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import PartnerRequest from "./components/PartnerRequest";
import RiderApplication from "./components/RiderApplication";
import FeedBack from "./components/FeedBacks";
import AddMenu from "./components/AddMenu";
import DeleteMenu from "./components/AddMenu/delete";
import Partners from "./components/Partners/";
import Riders from "./components/Riders";
import Orders from "./components/Orders";
import AdminFooter from "./components/Admin Footer";

function App() {
	const user = localStorage.getItem("token");
	
	return (
		
		<Routes>
			{user && <Route path="/" element={<Main />} />}
			<Route path="/signup" element={<Signup />} />
			<Route path="/login" element={<Login />} />
			<Route path="/rider-application" element={<RiderApplication />} />
			<Route path="/feedback" element={<FeedBack />} />
			<Route path="/partner-request" element={<PartnerRequest />} />
			<Route path="/add-menu" element={<AddMenu />} />
			<Route path="/delete-menu" element={<DeleteMenu />} />
			<Route path="/partners" element={<Partners />} />
			<Route path="/riders" element={<Riders />} />
			<Route path="/orders" element={<Orders />} />
			
			<Route path="/" element={<Navigate to="/login" replace />} />
		</Routes>
	);
}

export default App;
