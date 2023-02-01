import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { ticketRouter } from "./routers/ticket";
import { authRouter } from "./routers/auth";
import { checkinRouter } from "./routers/checkin";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  ticket: ticketRouter,
  checkin: checkinRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
