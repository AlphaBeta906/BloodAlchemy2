import { elementRouter } from "@/server/routers/element";
import { router } from "@/server/trpc";
import { authRouter } from "./auth";
import { userRouter } from "./user";

export const appRouter = router({
	element: elementRouter,
	user: userRouter,
	auth: authRouter
});

export type AppRouter = typeof appRouter;