import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
import { z } from "zod";

import toJSON from "@/lib/toJSON";
import { generateToken } from "@/lib/auth/jwt";
import { getHash } from "@/lib/auth/hash";
import bodyParse from "@/lib/bodyParse";

const prisma = new PrismaClient();

/**
 * It creates a new user in the database, and returns a token
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

	if (!schema.safeParse(body).success) {
		res.status(422).json(null);
		return;
	}

	const existsUser = await prisma.user.findUnique({
		where: {
			username: body.username
		}
	});

	if (existsUser) {
		res.status(400).json(null);
		return;
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

	res.status(201).json(toJSON({ user: user, token: token }));
}