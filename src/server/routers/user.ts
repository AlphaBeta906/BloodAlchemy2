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
	byId: procedure
		.input(
			z.object({
				id: z.number()
			})
		)
		.query(async ({ input }) => {
			const { id } = input;

			const getUser = await prisma.user.findUnique({
				where: {
					id: id
				}
			});
	
			if (getUser === null) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: `No element with ID ${id} was found`
				});
			}

			return getUser;
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
				},
				include: {
					elements: true,
				},
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
		}),
	infiniteUsers: procedure
		.input(z.object({
			limit: z.number().min(1).max(100).nullish(),
			cursor: z.number().nullish(),
		}))
		.query(async ({ input }) => {
			const limit = input.limit ?? 50;
			
			const { cursor } = input;
			const items = await prisma.user.findMany({
				take: limit + 1,
				cursor: {
					id: cursor ?? 1
				},
				orderBy: {
					id: "asc",
				},
			});

			let nextCursor: typeof cursor | undefined = undefined;
			if (items.length > limit) {
				const nextItem = items.pop();
				nextCursor = Number(nextItem?.id);
			}	

			const totalUsers = await prisma.element.count();

			return {
				items,
				totalUsers,
				nextCursor,
			};
		})
});