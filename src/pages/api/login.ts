import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
import { z } from "zod";

import toJSON from "@/lib/toJSON";
import { validateHash } from "@/lib/auth/hash";
import { generateToken } from "@/lib/auth/jwt";
import bodyParse from "@/lib/bodyParse";

const prisma = new PrismaClient();

/**
 * It takes a username and password from the request body, checks if the user exists, checks if the
 * password is correct, and if so, returns a token
 * @param {NextApiRequest} req - NextApiRequest - This is the request object that Next.js provides.
 * @param res - NextApiResponse<object | null>
 * @returns A user object and a token
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<object | null>) {
	const body = bodyParse(req.body);

	const schema = z.object({
		username: z.string(),
		password: z.string()
	});

	console.log(schema.safeParse(body));

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