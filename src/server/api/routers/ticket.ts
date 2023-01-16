import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const ticketRouter = createTRPCRouter({
  checkTicket: publicProcedure
    .input(z.object({ number: z.number() }))
    .query(({ input }) => {
      //make db call to check if name is associated with ticket
      //return name and mark as checked in, otherwise return empty string and prompt for name
      return {
        name: "",
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
