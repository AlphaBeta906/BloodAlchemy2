// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
import { z } from "zod";

import toJSON from "@/lib/toJSON";

const prisma = new PrismaClient();

/**
 * It either returns a list of elements or a single element, depending on whether the query string is
 * empty or not
 * @param {NextApiRequest} req - NextApiRequest - This is the request object that Next.js gives us.
 * @param res - NextApiResponse<object | null>
 * @returns An array of elements
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<object | null>) {
	const query = req.query;

	if (Object.keys(query).length === 0) {
		const getElems = await prisma.element.findMany({
			skip: 0,
			take: 4,
		});
	
		res.status(200).json(toJSON(getElems));
	} else {
		const schema = z.object({
			name: z.string()
		});

		if (!schema.safeParse(query).success) {
			res.status(422).json(null);
			return;
		}

		const getElem = await prisma.element.findUnique({
			where: {
				name: query.name?.toString()
			}
		});

		if (getElem === null) {
			res.status(404).json(null);
			return;
		}

		res.status(200).json(toJSON(getElem ?? {}));
		return;
	}
}