import { scryptSync } from "crypto";
import toJSON from "../../scripts/toJSON";

/**
 * It takes a password and salt, hashes the password with the salt, and returns the hash
 * @returns The password hash
 */
export const get = async ({ request }) => {
	const url = new URL(request.url);
	const params = new URLSearchParams(url.search);

	const getHash = (password) => scryptSync(password, params.get("salt"), 32).toString("hex");

	const password = getHash(params.get("password"));

	return new Response(toJSON({
		password: password
	}), {
		status: 200
	});
};