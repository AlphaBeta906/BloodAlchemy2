import { PrismaClient } from "@prisma/client";
import toJSON from "../../scripts/toJSON";

const prisma = new PrismaClient();

/**
 * It takes a request, checks if the request has a username parameter, and if it does, it returns the
 * user with that username
 * @returns A user object
 */
export const get = async ({ request }) => {
	const url = new URL(request.url);
	const params = new URLSearchParams(url.search);

	if (params.get("username") !== null) {
		const getUser = await prisma.user.findUnique({
			where: {
				username: params.get("username")
			}
		});

		if (getUser === null) {
			return new Response(null, {
				status: 404
			});
		}

		return new Response(toJSON(getUser), {
			status: 200,
		});
	}

	return new Response(null, {
		status: 422,
	});
};