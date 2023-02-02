/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { prisma } from "@/server/db";

export const checkinRouter = createTRPCRouter({
  checkin: publicProcedure
    .input(z.object({ name: z.string(), coat_check: z.boolean() }))
    .mutation(async ({ input }) => {
      if (!input.coat_check) {
        try {
          const person = await prisma.person.create({ data: { ...input } });
          console.log(person);
          return {
            success: true,
          };
        } catch (error) {
          console.log(error);
          return {
            success: false,
          };
        }
      } else {
        const people = await prisma.person.findMany({
          where: {
            coat_check_number: {
              gt: 0,
            },
          },
          orderBy: {
            coat_check_number: "desc",
          },
        });

        const numbers = people.map((person) => person.coat_check_number);

        let num = 1;
        while (numbers.includes(num)) {
          num++;
        }

        console.log(num);

        try {
          const person = await prisma.person.create({
            // validate name not null and stuff
            data: {
              ...input,
              coat_check_number: input.coat_check ? num : 0,
            },
          });
          return {
            success: true,
            number: person.coat_check_number,
          };
        } catch (error) {
          console.log(error);
          return {
            success: false,
          };
        }
      }
    }),

    counter: publicProcedure
    .input(z.object({ increment: z.boolean() }))
    .mutation(async ({ input }) => {
      try {
        await prisma.counter.update({
        where: {
          id: 'counter',
        },
        data: {
          count: {
            increment: input.increment ? 1 : -1,
          },
        },
      });

      const count = await prisma.counter.findUnique({
        where: {
          id: 'counter',
        },
        select: {
          count: true,
        },
      });

      return {
        success: true,
        count: count
      };
      } catch (error) {
        return {
          success: false,
        }
      }
    }),

    getCounter: publicProcedure
    .query(async () => {
      try {
        const count = await prisma.counter.findUnique({
          where: {
            id: 'counter',
          },
          select: {
            count: true,
          },
        });

        return {
          success: true,
          count: count
        };
      } catch (error) {
        return {
          success: false,
        }
      }
    }),
});
