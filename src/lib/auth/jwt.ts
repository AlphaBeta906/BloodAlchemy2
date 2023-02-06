import { sign, verify } from "jsonwebtoken";

export function generateToken(username: string) {
	return sign({ username }, process.env.JWT_SECRET, {
		expiresIn: "365d"
	});
}

export function verifyToken(token: string) {
	return verify(token, process.env.JWT_SECRET);
}