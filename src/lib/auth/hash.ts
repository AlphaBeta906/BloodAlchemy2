import { genSaltSync, hashSync, compareSync } from "bcryptjs";

/**
 * It takes a password, generates a salt, and then hashes the password with the salt
 * @param {string} password - The password to hash.
 * @returns An object with two properties: hash and salt.
 */
export function getHash(password: string): { hash: string, salt: string } {
	const salt = genSaltSync(10);
	const hash = hashSync(password, salt);

	return { hash, salt };
}

/**
 * Given a password and a hash, return true if the password matches the hash, otherwise return false.
 * @param {string} password - The password to validate.
 * @param {string} hash - The hash to validate.
 * @returns A boolean value.
 */
export function validateHash(password: string, hash: string): boolean {
	return compareSync(password, hash);
}