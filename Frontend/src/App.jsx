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
import ChatHistory from "./Components/ChatHistory";
import ImportantMessages from "./Components/ImportantMessages";
import Home from "./Components/Home";
import Full_Tasks from "./Components/Full_Tasks";
import TaskList from "./Components/TaskList";
import Tasks from "./Components/HomePageComponents/Tasks/Tasks";
import SalesDashboard from "./Components/SalesDashboard";
import InsightsDashboard from "./Components/InsightsDashboard";

function App() {
	const { authUser } = useAuthContext();
	console.log(authUser);
	return (
		<div className='p-4 h-screen flex items-center justify-center'>
			<Routes>
				<Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
				<Route path='/signup' element={<SignUp />} />
				<Route path='/logout' element={(authUser )? <Logout /> : <SignUp />} />
				{/* <Route path='/chatdashboard' element={(authUser )? <ChatDashboard /> : <SignUp />} /> */}
				<Route path='/' element={(authUser )? <Home /> : <SignUp />} />
				<Route path='/previous-chats/:username' element={(authUser )? <ChatHistory /> : <Login />} />
				<Route path='/groups/:groupName' element={(authUser )? <ImportantMessages /> : <Login />} />
				<Route path='/tasks' element={(authUser )? <TaskList /> : <SignUp />}/>
				{/* <Route path='/insights' element={(authUser )? <TaskList /> : <SignUp />}/> */}

				<Route path='/sales' element={(authUser )? <SalesDashboard /> : <SignUp />}/>
				<Route path='/insights' element={(authUser )? <InsightsDashboard/> : <SignUp />}/>
			</Routes>
			<Toaster />
			<ToastContainer />
		</div>
	);
}

export default App;