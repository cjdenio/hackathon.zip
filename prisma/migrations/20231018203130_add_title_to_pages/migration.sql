/*
  Warnings:

  - Added the required column `title` to the `CustomPage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CustomPage" ADD COLUMN     "title" TEXT NOT NULL;
