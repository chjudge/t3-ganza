/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { prisma } from "@/server/db";

export const checkinRouter = createTRPCRouter({
  checkin: publicProcedure
    .input(z.object({ name: z.string(), coat_check: z.boolean() }))
    .mutation(({ input }) => {
      console.log(input);
      // make db call to find highest coat check number
      // if coat_check is true, increment number and assign to person

      if (!input.coat_check){
        prisma.person.create({// validate name not null and stuff
          data: {
            ...input,
          },
        }).then((person) => {
          console.log(person);
          return {
            success: true,
          };
        }).catch((e) => {
          console.log(e);
          return {
            success: false,
          };
        });
      }

      prisma.person
        .findMany({
          where: {
            coat_check_number: {
              gt: 0,
            },
          },
          orderBy: {
            coat_check_number: "desc",
          },
        })
        .then((people) => {
          const numbers = people.map((person) => person.coat_check_number);
          console.log(numbers);

          let num = 1;
          while (numbers.includes(num)) {
            num++;
          }

          console.log(num);

          prisma.person.create({// validate name not null and stuff
            data: {
              ...input,
              coat_check_number: input.coat_check ? num : 0,
            },
          }).then((person) => {
            console.log(person);
            return {
              success: true,
            };
          }).catch((e) => {
            console.log(e);
            return {
              success: false,
            };
          });
          
        })
        .catch((e) => {
          console.log(e);
          return {
            success: false,
          };
        });

      
    }),

  coatCheckNumber: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      prisma.person
        .findUniqueOrThrow({
          where: {
            name: input.name,
          },
        })
        .then((person) => {
          console.log(`got the number:  ${person.coat_check_number}`);
          return {
            number: person.coat_check_number,
          };
        })
        .catch((e) => {
          console.log(e);
        });
    }),


  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
