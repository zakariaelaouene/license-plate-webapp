/*
  Warnings:

  - You are about to drop the column `registrationNumber` on the `cars` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `cars` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[licence_plate]` on the table `cars` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `licence_plate` to the `cars` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Flag" AS ENUM ('RED', 'YELLOW', 'GREEN');

-- DropIndex
DROP INDEX "cars_registrationNumber_key";

-- AlterTable
ALTER TABLE "cars" DROP COLUMN "registrationNumber",
DROP COLUMN "updated_at",
ADD COLUMN     "flag" "Flag" NOT NULL DEFAULT 'GREEN',
ADD COLUMN     "licence_plate" TEXT NOT NULL,
ADD COLUMN     "owner" TEXT,
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "captures" (
    "id" SERIAL NOT NULL,
    "location" TEXT,
    "cars_id" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "captures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "violations" (
    "id" SERIAL NOT NULL,
    "description" TEXT,
    "car_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "violations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "captures_createdAt_idx" ON "captures"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "cars_licence_plate_key" ON "cars"("licence_plate");

-- CreateIndex
CREATE INDEX "cars_licence_plate_idx" ON "cars"("licence_plate");

-- AddForeignKey
ALTER TABLE "captures" ADD CONSTRAINT "captures_cars_id_fkey" FOREIGN KEY ("cars_id") REFERENCES "cars"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "violations" ADD CONSTRAINT "violations_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE SET NULL ON UPDATE CASCADE;
