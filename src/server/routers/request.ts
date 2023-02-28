import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { router, procedure } from "@/server/trpc";
import { prisma } from "@/lib/prisma";
import { DateTime } from "luxon";

export const elementRouter = router({
	createRequest: procedure
		.input(
			z.object({
				reaction: z.string(),
				creator: z.number(),
				result: z.string()
			})
		)
		.mutation(async ({ input }) => {
			const existRequest = await prisma.user.findUnique({
				where: {
					username: input.reaction
				}
			});

			if (existRequest) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: "Reaction exists"
				});
			}

			const reaction = await prisma.request.create({
				data: {
					reaction: input.reaction,
					result: input.result,
					votes: [
						{"reaction": input.result, "bet": 0}
					],
					date_of_expiry: DateTime.utc().plus({ hours: 12}).toJSDate()
				}
			});

			return reaction;
		})
});