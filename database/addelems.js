import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Remember to do TRUNCATE TABLE element RESTART IDENTITY; before this script if you are resetting the element table

await prisma.element.create({
	data: {
		name: "Fire",
		color: "FFA500",
		generation: 1,
		complexity: 1,
		date_of_creation: new Date(),
		creator: "AlphaBeta906"
	}
});

await prisma.element.create({
	data: {
		name: "Water",
		color: "1CA3EC",
		generation: 1,
		complexity: 1,
		date_of_creation: new Date(),
		creator: "AlphaBeta906"
	}
});

await prisma.element.create({
	data: {
		name: "Earth",
		color: "836539",
		generation: 1,
		complexity: 1,
		date_of_creation: new Date(),
		creator: "AlphaBeta906"
	}
});

await prisma.element.create({
	data: {
		name: "Air",
		color: "A6E7FF",
		generation: 1,
		complexity: 1,
		date_of_creation: new Date(),
		creator: "AlphaBeta906"
	}
});

console.log("All good.");