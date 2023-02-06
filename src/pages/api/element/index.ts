// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

import toJSON from "@/lib/toJSON";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse<object>) {
	const getElems = await prisma.element.findMany({
		skip: 0,
		take: 4,
	});

	res.status(200).json(toJSON(getElems));
}