// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
import { z } from "zod";

import toJSON from "@/lib/toJSON";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse<object | null>) {
	const query = req.query;

	if (Object.keys(query).length !== 0) {
		const schema = z.object({
			username: z.string()
		});
		
		if (!schema.safeParse(query).success) {
			res.status(422).json(null);
			return;
		}

		const getUser = await prisma.user.findUnique({
			where: {
				username: query.username?.toString()
			}
		});

		if (getUser === null) {
			res.status(404).json(null);
			return;
		}

		res.status(200).json(toJSON(getUser ?? {}));
		return;
	}

	res.status(501).json(null);
}