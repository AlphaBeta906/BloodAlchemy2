import { scryptSync, randomBytes } from "crypto";

const hash = (password, salt) => scryptSync(password, salt, 32).toString("hex");

export function getHash(password) {
	const salt = randomBytes(16).toString("hex");

	const pwd = hash(password, salt);

	return { pwd, salt };
}

export function validateHash(password, salt) {
	const pwd = hash(password, salt);

	return pwd;
}