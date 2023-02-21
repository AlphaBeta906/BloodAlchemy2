import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { router, procedure } from "@/server/trpc";
import { prisma } from "@/lib/prisma";

export const userRouter = router({
	byUsername: procedure
		.input(
			z.object({
				username: z.string()
			})
		)
		.query(async ({ input }) => {
			const { username } = input;

			const getUser = await prisma.user.findUnique({
				where: {
					username: username
				}
			});
	
			if (getUser === null) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: `No element with name ${username} was found`
				});
			}

			return getUser;
		}),
	user: procedure
		.query(async () => {
			const getUsers = await prisma.user.findMany({
				skip: 0,
				take: 4,
			});
		
			return getUsers;
		}),
	getElems: procedure
		.input(
			z.object({
				username: z.string()
			})
		)
		.query(async ({ input }) => {
			const { username } = input;

			const getUser = await prisma.user.findUnique({
				where: {
					username: username
				}
			});
	
			if (getUser === null) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: `No element with name ${username} was found`
				});
			}

			const elems = [];

			for (const element in getUser.elements) {
				const getElem = await prisma.element.findUnique({
					where: {
						id: Number(element) + 1
					}
				});

				elems.push(getElem);
			}

			return elems;
		})
});