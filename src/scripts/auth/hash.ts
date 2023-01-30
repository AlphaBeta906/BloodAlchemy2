import { genSaltSync, hashSync, compareSync } from "bcryptjs";

export function getHash(password: string) {
	var salt = genSaltSync(10);
	var hash = hashSync(password, salt);

	return { hash, salt };
}

export function validateHash(password: string, hash: string): boolean {
	return compareSync(password, hash);
}