import { PrismaClient } from "@prisma/client";
import toJSON from "../../scripts/toJSON";

const prisma = new PrismaClient();

/**
 * It takes a request, checks if the request has a query parameter called `element`, and if it does, it
 * returns the element with that name
 * @returns A element object
 */
export const get = async ({ request }) => {
	const url = new URL(request.url);
	const params = new URLSearchParams(url.search);

	if (params.get("name") !== undefined) {
		const getElem = await prisma.element.findUnique({
			where: {
				name: params.get("name")
			}
		});

		if (getElem === null) {
			return new Response(null, {
				status: 204
			});
		}

		return new Response(toJSON(getElem), {
			status: 200,
		});
	}
    
	return new Response(null, {
		status: 422
	});
};