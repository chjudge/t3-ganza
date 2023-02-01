import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { prisma } from "@/server/db";

export const ticketRouter = createTRPCRouter({
  checkTicket: publicProcedure
    .input(z.object({ number: z.number() }))
    .mutation(({ input }) => {
      //make db call to check if name is associated with ticket
      //return name and mark as checked in, otherwise return empty string and prompt for name
      prisma.ticket
        .findUnique({
          where: {
            number: input.number,
          },
        })
        .then((ticket) => {
          if (ticket) {
            console.log(`ticket found`, ticket.number, ticket.name);

            prisma.ticket
              .update({
                where: {
                  number: ticket.number,
                },
                data: {
                  checkedIn: true,
                },
              })
              .catch((e) => {
                console.log(e);
              });

            return {
              success: true,
              name: ticket.name,
            };
          }
          console.log("ticket not found");

          return {
            success: false,
          };
        })
        .catch((e) => {
          console.log(e);
          return {
            success: false,
          };
        });
    }),

  giveTicket: publicProcedure
    .input(z.object({ number: z.number().int(), name: z.string().nullable() }))
    .mutation(({ input }) => {
      //make db call to check if name is associated with ticket
      //return name and mark as checked in, otherwise return empty string and prompt for name

      prisma.ticket
        .create({
          data: {
            number: input.number,
            name: input.name ? input.name : "",
          },
        })
        .then((ticket) => {
          console.log("ticket created", ticket.number, ticket.name);
          return {
            success: true,
            ticket: ticket,
          };
        })
        .catch((e) => {
          console.log(e);
          return {
            success: false,
          };
        });
    }),

  hasName: publicProcedure
    .input(z.object({ number: z.number().int() }))
    .query(({ input }) => {
      //make db call to check if name is associated with ticket

      prisma.ticket

        .findUnique({
          where: {
            number: input.number,
          },
        })
        .then((ticket) => {
          if (ticket) {
            console.log(`ticket found`, ticket.number, ticket.name);

            return {
              success: true,
              hasName: ticket.name ? true : false,
            };
          }
          console.log("ticket not found");

          return {
            success: false,
          };
        })
        .catch((e) => {
          console.log(e);
          return {
            success: false,
          };
        });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
