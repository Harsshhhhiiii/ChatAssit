import { toast } from "react-toastify";
import { useState } from "react";
import useLogout from "../Hooks/useLogout"

const Logout = () => {
    const { logout } = useLogout();
    const [confirmation, setConfirmation] = useState("");
  
    const handleLogout = async () => {
      if (confirmation.toLowerCase() === "confirm") {
       await logout();
      
      } else {
       return  toast.error("Please type 'confirm' to logout.");
      }
    };
  
    return (
      <div className="p-4 border rounded shadow-md w-80 mx-auto text-center">
        <h2 className="text-lg font-bold">Confirm Logout</h2>
        <p>Type "confirm" to log out:</p>
        <input
          type="text"
          className="border p-2 rounded w-full mt-2"
          value={confirmation}
          onChange={(e) => setConfirmation(e.target.value)}
        />
        <button
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    );
  };
  
  export default Logout;
  