import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  checkUser: publicProcedure
    .input(z.object({ username: z.string(), password: z.string() }))
    .query(({ input }) => {
      //make db call to check if name is associated with ticket
      //return name and mark as checked in, otherwise return empty string and prompt for name

      const result = false;
      return {
        username: input.username,
        result: result,
      };
    }),
});
