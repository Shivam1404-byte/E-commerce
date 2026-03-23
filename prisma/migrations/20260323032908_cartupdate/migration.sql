/*
  Warnings:

  - The values [ABANDONED] on the enum `CartStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CartStatus_new" AS ENUM ('ACTIVE', 'CHECKED_OUT');
ALTER TABLE "public"."Cart" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Cart" ALTER COLUMN "status" TYPE "CartStatus_new" USING ("status"::text::"CartStatus_new");
ALTER TYPE "CartStatus" RENAME TO "CartStatus_old";
ALTER TYPE "CartStatus_new" RENAME TO "CartStatus";
DROP TYPE "public"."CartStatus_old";
ALTER TABLE "Cart" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
COMMIT;

-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "price" SET DATA TYPE DECIMAL(65,30);
