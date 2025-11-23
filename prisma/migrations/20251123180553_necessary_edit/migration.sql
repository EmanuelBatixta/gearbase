/*
  Warnings:

  - The values [HIBRID] on the enum `FuelType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "FuelType_new" AS ENUM ('GASOLINE', 'DIESEL', 'ELECTRIC', 'HYBRID', 'ETHANOL', 'FLEX');
ALTER TABLE "Car" ALTER COLUMN "fuel_type" TYPE "FuelType_new" USING ("fuel_type"::text::"FuelType_new");
ALTER TYPE "FuelType" RENAME TO "FuelType_old";
ALTER TYPE "FuelType_new" RENAME TO "FuelType";
DROP TYPE "public"."FuelType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Car" ALTER COLUMN "fuel_type" SET NOT NULL,
ALTER COLUMN "fuel_type" SET DATA TYPE "FuelType";
