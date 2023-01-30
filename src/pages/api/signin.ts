import type { APIRoute } from 'astro';

import { PrismaClient } from "@prisma/client";

import toJSON from "../../scripts/toJSON";
import { generateToken } from "../../scripts/auth/jwt";
import { getHash } from "../../scripts/auth/hash";

const prisma = new PrismaClient();

/**
 * It creates a new user in the database, and returns a token
 * @returns A new response with the user and token
 */
export const post: APIRoute = async ({ request }) => {
	const body = await request.json();

	const keysToCheck = ["username", "password"];

	const hasAllKeys = keysToCheck.every(key => Object.keys(body).includes(key));

	if (!hasAllKeys) {
		return new Response(null, {
			status: 422
		});
	}

	const existsUser = await prisma.user.findUnique({
		where: {
			username: body.username
		}
	});

	if (existsUser) {
		return new Response(null, {
			status: 400
		});
	}

	const { hash, salt } = getHash(body.password);

	const user = await prisma.user.create({
		data: {
			username: body.username,
			password: hash,
			elements: [1, 2, 3, 4],
			watts: 100,
			barrels: [],
			salt: salt
		}
	});

	const token = generateToken(body.username);

	return new Response(toJSON({ user: user, token: token }), {
		status: 201
	});
};