import type { APIRoute } from "astro";

import { PrismaClient } from "@prisma/client";
import toJSON from "../../scripts/toJSON";

const prisma = new PrismaClient();

/**
 * It gets an element from the database
 * @returns A response object with the status code 200 and the JSON string of the elements.
 */
export const get: APIRoute = async ({ request }) => {
	const url = new URL(request.url);
	const params = new URLSearchParams(url.search);

	if (params.get("name") !== null) {
		const getElem = await prisma.element.findUnique({
			where: {
				name: params.get("name") ?? undefined
			}
		});

		if (getElem === null) {
			return new Response(null, {
				status: 404
			});
		}

		return new Response(toJSON(getElem), {
			status: 200,
		});
	} else {
		const getElems = await prisma.element.findMany({
			skip: 0,
			take: 4,
		});

		return new Response(toJSON(getElems), {
			status: 200
		});
	}
};