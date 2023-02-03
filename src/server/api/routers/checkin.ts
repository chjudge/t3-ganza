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

  checkout: publicProcedure
    .input(z.object({ number: z.number().int() }))
    .mutation(async ({ input }) => {
      try {
        const person = await prisma.person.update({
          where: {
            coat_check_number: input.number,
          },
          data: {
            coat_check_number: 0,
          },
        });

        const win = Math.floor((Math.random() * 10) + 1);
        return {
          success: true,
          win: win === 1,
          name: person.name,
        };
      } catch (error) {
        console.log("wrong number");
        return {
          success: false,
        };
      }
    }),

  searchNames: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ input }) => {
      try {
        const people = await prisma.person.findMany({
          where: {
            name: {
              contains: input.name,
              mode: "insensitive",
            },
            coat_check_number: {
              gt: 0,
            },
          },
          select: {
            name: true,
            coat_check_number: true,
          },
        });

        return {
          success: true,
          people: people,
        };
      } catch (error) {
        console.log(error);
        return {
          success: false,
        };
      }
    }),


  counter: publicProcedure
    .input(z.object({ increment: z.boolean() }))
    .mutation(async ({ input }) => {
      try {
        await prisma.counter.update({
          where: {
            id: input.increment ? "enter" : "exit",
          },
          data: {
            count: {
              increment: 1,
            },
          },
        });

        const counts = await prisma.counter.findMany({
          where: {
            id: {
              in: ["enter", "exit"],
            },
          },
          select: {
            count: true,
          },
          orderBy: {
            count: "desc",
          },
        });

        if (counts[0] && counts[1]) {
          const count = counts[0].count - counts[1].count;
          return {
            success: true,
            count: count,
          };
        }
        return {
          success: false,
        };
      } catch (error) {
        return {
          success: false,
        };
      }
    }),

  getCounter: publicProcedure.query(async () => {
    try {
      const counts = await prisma.counter.findMany({
        where: {
          id: {
            in: ["enter", "exit"],
          },
        },
        orderBy: {
          count: "desc",
        },
        select: {
          count: true,
        },
      });

      console.log(counts);

      if (counts[0] && counts[1]) {
        const count = counts[0].count - counts[1].count;
        return {
          success: true,
          count: count,
        };
      }
      return {
        success: false,
      };
    } catch (error) {
      return {
        success: false,
      };
    }
  }),

  getPrize: publicProcedure.query(async () => {
    try {
      const result = await prisma.person.findMany({
        where: {
          prize: false
        },
        select: {
          name: true,
        },
      });

      const names = result.map((person) => person.name);

      const name = names[Math.floor(Math.random() * names.length)];

      console.log(name);

      return {
        success: true,
        name: name,
      };
    } catch (error) {
      return {
        success: false,
      };
    }
  }
  ),
});
