import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
import SignUp from "./Components/Signup";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import ChatDashboard from "./Components/ChatDashboard";
import Logout from "./Components/Logout";
import { ToastContainer } from "react-toastify";
import Check from "./Components/check";

function App() {
	const { authUser } = useAuthContext();
	return (
		<div className='p-4 h-screen flex items-center justify-center'>
			<Routes>
				<Route path='/login' element={authUser ? <Navigate to='/chatdashboard' /> : <Login />} />
				<Route path='/signup' element={authUser ? <Navigate to='/chatdashboard' /> : <SignUp />} />
				<Route path='/logout' element={(authUser )? <Logout /> : <SignUp />} />
				<Route path='/chatdashboard' element={(authUser )? <ChatDashboard /> : <SignUp />} />
				<Route path='/check' element={<Check/>}  />
				<Route path='/' element={(authUser )? <ChatDashboard /> : <SignUp />} />
			</Routes>
			<Toaster />
			<ToastContainer />
		</div>
	);
}

export default App;