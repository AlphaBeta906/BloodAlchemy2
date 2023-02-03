import { genSaltSync, hashSync, compareSync } from "bcryptjs";

export function getHash(password: string) {
	const salt = genSaltSync(10);
	const hash = hashSync(password, salt);

	return { hash, salt };
}

export function validateHash(password: string, hash: string): boolean {
	return compareSync(password, hash);
}