import { PrismaClient } from "@prisma/client";
import pkg from "bcryptjs";
const { genSaltSync, hashSync } = pkg;
import process from "process";

// Remember to do TRUNCATE TABLE "User" RESTART IDENTITY CASCADE; before this script if you are resetting the element table

export function getHash(password: string): { hash: string, salt: string } {
	const salt = genSaltSync(10);
	const hash = hashSync(password, salt);

	return { hash, salt };
}

const prisma = new PrismaClient();

const { hash, salt } = getHash(process.env.PASSWORD as string);

await prisma.user.create({
	data: {
		username: "AlphaBeta906",
		password: hash,
		watts: 100,
		barrels: [],
		salt: salt
	}
});

await prisma.element.create({
	data: {
		name: "Fire",
		color: "FFA500",
		generation: 1,
		complexity: 1,
		creatorId: 1,
		found: {
			createMany: {
				data: [
					{ userId: 1 }
				]
			}
		},
	}
});

await prisma.element.create({
	data: {
		name: "Water",
		color: "1CA3EC",
		generation: 1,
		complexity: 1,
		creatorId: 1,
		found: {
			createMany: {
				data: [
					{ userId: 1 }
				]
			}
		},
	}
});

await prisma.element.create({
	data: {
		name: "Earth",
		color: "836539",
		generation: 1,
		complexity: 1,
		creatorId: 1,
		found: {
			createMany: {
				data: [
					{ userId: 1 }
				]
			}
		},
	}
});

await prisma.element.create({
	data: {
		name: "Air",
		color: "A6E7FF",
		generation: 1,
		complexity: 1,
		creatorId: 1,
		found: {
			createMany: {
				data: [
					{ userId: 1 }
				]
			}
		},
	}
});

await prisma.user.update({
	where: {
		username: "AlphaBeta906",
	},
	data: {
		elements: {
			connectOrCreate: [
				{
					where: { elementId_userId: { elementId: 1, userId: 1 } },
					create:{ elementId: 1},
				},
				{
					where: { elementId_userId: { elementId: 1, userId: 1 } },
					create:{ elementId: 1},
				},
				{
					where: { elementId_userId: { elementId: 1, userId: 1 } },
					create:{ elementId: 1},
				},
				{
					where: { elementId_userId: { elementId: 1, userId: 1 } },
					create:{ elementId: 1},
				},
			]	
		},
		creations: {
			connect: [
				{ id: 1 },
				{ id: 2 },
				{ id: 3 },
				{ id: 4 },
			]
		},
	}
});

console.log("All good.");