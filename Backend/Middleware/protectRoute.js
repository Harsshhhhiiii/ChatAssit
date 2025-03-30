import jwt from "jsonwebtoken";
import User from "../Models/usermodel.js";

const protectRoute = async (req, res, next) => {
	try {
		const token = req.cookies.jwt; 
		console.log(token)

		if (!token) {
			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
		}
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		console.log("decoded meassage "+decoded);

		if (!decoded) {
            console.log("not decoded token not found")
			return res.status(401).json({ error: "Unauthorized - Invalid Token" });

		}

		const user = await User.findOne( {username : decoded.username}).select("-password");
		console.log(user);

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		req.user = user;

		next();
	} catch (error) {
		console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export default protectRoute;