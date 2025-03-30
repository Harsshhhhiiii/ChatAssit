import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useLogout = () => {
  const { setAuthUser } = useAuthContext(); // Get setAuthUser from context
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("chat-user");

    setAuthUser(null); 
    toast.success("Logged out successfully.");
    navigate("/login"); 
  };

  return { logout };
};

export default useLogout;