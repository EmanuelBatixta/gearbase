/*
  Warnings:

  - Added the required column `category` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `torque` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transmission` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('SEDAN', 'SUV', 'VAN', 'HATCHBACK', 'COUPE', 'TRUCK');

-- CreateEnum
CREATE TYPE "Transmission" AS ENUM ('AUTOMATIC', 'MANUAL');

-- CreateEnum
CREATE TYPE "FuelType" AS ENUM ('GASOLINE', 'DIESEL', 'ELECTRIC', 'HIBRID', 'ETHANOL');

-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "acceleration" DOUBLE PRECISION,
ADD COLUMN     "category" "Category" NOT NULL,
ADD COLUMN     "fuel_type" "FuelType"[],
ADD COLUMN     "torque" INTEGER NOT NULL,
ADD COLUMN     "transmission" "Transmission" NOT NULL;
