/*
  Warnings:

  - Made the column `name` on table `Ticket` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Ticket_number_key";

-- AlterTable
ALTER TABLE "Ticket" ALTER COLUMN "name" SET NOT NULL;

-- CreateTable
CREATE TABLE "Person" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "coat_check" BOOLEAN NOT NULL,
    "checked_coat" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);
