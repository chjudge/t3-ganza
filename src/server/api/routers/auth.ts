import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { prisma } from "@/server/db";

export const authRouter = createTRPCRouter({
  checkUser: publicProcedure
    .input(z.object({ username: z.string(), password: z.string() }))
    .query( async ({ input }) => {
      //make db call to check if username and password are correct

      const user = await prisma.user.findFirst({
        where: {
          AND: [
            {
              username:{
                equals: input.username
              }
            },
            {
              password: {
                equals: input.password
              }
            },
          ],
        },
      });

      if (user) {
        return {
          username: input.username,
          result: true,
        };
      }

      const result = false;
      return {
        username: input.username,
        result: result,
      };
    }),
});
