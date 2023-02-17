import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { router, procedure } from "@/server/trpc";
import { prisma } from "@/lib/prisma";

export const elementRouter = router({
	byName: procedure
		.input(
			z.object({
				name: z.string()
			})
		)
		.query(async ({ input }) => {
			const { name } = input;

			const getElem = await prisma.element.findUnique({
				where: {
					name: name
				}
			});

			console.log(getElem);

			if (getElem === null) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: `No element with name "${name}" was found`
				});
			}

			return getElem;
		}),
	infiniteElements: procedure
		.input(z.object({
			limit: z.number().min(1).max(100).nullish(),
			cursor: z.number().nullish(),
		}))
		.query(async ({ input }) => {
			const limit = input.limit ?? 50;
			
			const { cursor } = input;
			const items = await prisma.element.findMany({
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

			const totalElems = await prisma.element.count();

			return {
				items,
				totalElems,
				nextCursor,
			};
		})
});