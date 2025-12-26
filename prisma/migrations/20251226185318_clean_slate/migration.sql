/*
  Warnings:

  - You are about to drop the `Component` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Component" DROP CONSTRAINT "Component_userId_fkey";

-- DropTable
DROP TABLE "Component";
