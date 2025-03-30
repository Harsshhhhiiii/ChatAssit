import bcrypt from "bcryptjs";
import User from "../Models/usermodel.js";
import generateTokenAndSetCookie from "../Utils/generateToken.js";

export const signupf = async (req, res) => {
	try {
		const {  username, password, confirmPassword } = req.body;

		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}

		const user = await User.findOne({ username });

		if (user) {
			return res.status(400).json({ error: "Username already exists" });
		}  

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		
		const newUser = new User({
			
			username,
			password: hashedPassword
			
		});
		generateTokenAndSetCookie(newUser.username, res);
		if (newUser) {
			
			await newUser.save();
            
			res.status(201).json({
				
				username: newUser.username,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

 export const loginf = async (req, res) => {
 
  try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
  
		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		generateTokenAndSetCookie(user.username, res);
   
		res.status(200).json({
			
			username: user.username,
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

 export const logoutf = async (req, res) => {

    try {
      res.cookie("jwt", "", { maxAge: 0 });
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      console.log("Error in logout controller", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

 




