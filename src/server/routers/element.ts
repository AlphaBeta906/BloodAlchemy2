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
	element: procedure
		.query(async () => {
			const getElems = await prisma.element.findMany({
				skip: 0,
				take: 4,
			});
		
			return getElems;
		})
});