import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
import { z } from "zod";

import toJSON from "@/lib/toJSON";
import { validateHash } from "@/lib/auth/hash";
import { generateToken } from "@/lib/auth/jwt";

const prisma = new PrismaClient();

/**
 * It takes a request, checks if the request has a username parameter, and if it does, it returns the
 * user with that username
 * @returns A user object
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<object | null>) {
	const body = JSON.parse(req.body);

	const schema = z.object({
		username: z.string(),
		password: z.string()
	});

	if (!schema.safeParse(body).success) {
		res.status(422).json(null);
		return;
	}

	const user = await prisma.user.findUnique({
		where: {
			username: body.username
		}
	});

	if (!user) {
		res.status(404).json(null);
		return;
	}

	const pwd = validateHash(body.password, user.password);

	if (!pwd) {
		res.status(401).json(null);
		return;
	}

	const token = generateToken(body.username);

	res.status(200).json(toJSON({ user: user, token: token }));
}