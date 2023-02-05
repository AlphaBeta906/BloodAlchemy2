import { sign, verify } from "jsonwebtoken";

export function generateToken(username: string) {
	return sign({ username }, import.meta.env.JWT_SECRET, {
		expiresIn: "365d"
	});
}

export function verifyToken(token: string) {
	return verify(token, import.meta.env.JWT_SECRET);
}