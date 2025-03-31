import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (username, res) => {
	const token = jwt.sign({ username }, process.env.JWT_SECRET, {
		expiresIn: "15d",
	});
    console.log(token)
	res.cookie("jwt", token, {
		maxAge: 15 * 24 * 60 * 60 * 1000, 
		httpOnly: true, 
		sameSite: "strict",
		secure: false,
	});
};

export default generateTokenAndSetCookie;