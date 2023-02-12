import { sign, verify } from "jsonwebtoken";

/**
 * It takes a username and returns a signed JWT token
 * @param {string} username - The username of the user that we want to generate a token for.
 * @returns A JWT token
 */
export function generateToken(username: string) {
	return sign({ username }, process.env.JWT_SECRET, {
		expiresIn: "365d"
	});
}

/**
 * It takes a token as a parameter, and returns the result of calling the verify function from the
 * jsonwebtoken library, passing in the token and the JWT secret
 * @param {string} token - The token to verify
 * @returns A promise that resolves to the decoded token.
 */
export function verifyToken(token: string) {
	return verify(token, process.env.JWT_SECRET);
}