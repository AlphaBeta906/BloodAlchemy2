import jwt from "jsonwebtoken";

export function generateToken(username) {
	return jwt.sign({ username }, import.meta.env.JWT_SECRET, {
		expiresIn: "365d"
	});
}

export function verifyToken(token) {
	return jwt.verify(token, import.meta.env.JWT_SECRET);
}