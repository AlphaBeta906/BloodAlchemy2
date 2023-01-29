import { PrismaClient } from "@prisma/client";

import toJSON from "../../scripts/toJSON";
import { generateToken } from "../../scripts/auth/jwt";
import { validateHash } from "../../scripts/auth/hash";

const prisma = new PrismaClient();

export const post = async ({ request }) => {
	const body = await request.json();

	const keysToCheck = ["username", "password"];

	const hasAllKeys = keysToCheck.every(key => Object.keys(body).includes(key));

	if (!hasAllKeys) {
		return new Response(null, {
			status: 422
		});
	}

	const user = await prisma.user.findUnique({
		where: {
			username: body.username
		}
	});

	if (!user) {
		return new Response(null, {
			status: 404
		});
	}

	const pwd = validateHash(body.password, user.salt);

	if (pwd !== user.password) {
		return new Response(null, {
			status: 401
		});
	}

	const token = generateToken(body.username);

	return new Response(toJSON({ user: user, token: token }), {
		status: 200
	});
};