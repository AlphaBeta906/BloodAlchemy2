import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

import toJSON from "@/lib/toJSON";

const prisma = new PrismaClient();

/**
 * It takes a request, checks if the request has a username parameter, and if it does, it returns the
 * user with that username
 * @returns A user object
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<object | null>) {
	const { username } = req.query;

	if (typeof username === "string") {
		const getUser = await prisma.user.findUnique({
			where: {
				username: username
			}
		});

		if (getUser === null) {
			res.status(404).json(null);
			return;
		}

		res.status(200).json(toJSON(getUser ?? {}));
		return;
	}

	res.status(422).json(null);
}