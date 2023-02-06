// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

import toJSON from "@/lib/toJSON";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse<object | null>) {
	const { name } = req.query;

	if (typeof name === "string") {
		const getElem = await prisma.element.findUnique({
			where: {
				name: name
			}
		});

		if (getElem === null) {
			res.status(404).json(null);
			return;
		}

		res.status(200).json(toJSON(getElem ?? {}));
		return;
	}

	res.status(422).json(null);
}