import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { router, procedure } from "@/server/trpc";
import { prisma } from "@/lib/prisma";
import { validateHash, getHash } from "@/lib/auth/hash";
import { generateToken } from "@/lib/auth/jwt";

export const authRouter = router({
	signin: procedure
		.input(
			z.object({
				username: z.string(),
				password: z.string()
			})
		)
		.mutation(async ({ input }) => {
			const existsUser = await prisma.user.findUnique({
				where: {
					username: input.username
				}
			});
		
			if (existsUser) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: `Username "${input.username}" exists`
				});
			}
		
			const { hash, salt } = getHash(input.password);
		
			const user = await prisma.user.create({
				data: {
					username: input.username,
					password: hash,
					elements: [1, 2, 3, 4],
					watts: 100,
					barrels: [],
					salt: salt
				}
			});
		
			const token = generateToken(input.username);
		
			return {
				token: token,
				user: user
			};
		}),
	login: procedure
		.input(
			z.object({
				username: z.string(),
				password: z.string()
			})
		)
		.mutation(async ({ input }) => {
			const user = await prisma.user.findUnique({
				where: {
					username: input.username
				}
			});
		
			if (!user) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: `No user with username "${input.username}" was found`
				});
			}
		
			const pwd = validateHash(input.password, user.password);
		
			if (!pwd) {
				throw new TRPCError({
					code: "UNAUTHORIZED",
					message: "You have typed the wrong password"
				});
			}
		
			const token = generateToken(input.username);

			return {
				token: token,
				user: user,
			};
		})
});