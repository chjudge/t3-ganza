import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { prisma } from "@/server/db";

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

  giveTicket: publicProcedure
    .input(z.object({ number: z.number().int(), name: z.string().nullable() }))
    .query(({ input }) => {
      //make db call to check if name is associated with ticket
      //return name and mark as checked in, otherwise return empty string and prompt for name

      prisma.ticket.create({
        data: {
          number: 16,
          name: input.name,
        },
      }).then((ticket) => {
        console.log('ticket created', ticket.number, ticket.name);
        return {
          ok: true,
          ticket: ticket
        };
      })
      .catch((e) => {
        //rejection handler
        console.log(e);
      });
      
      return {
        ok: false
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
