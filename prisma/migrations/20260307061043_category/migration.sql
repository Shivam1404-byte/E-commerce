/*
  Warnings:

  - You are about to drop the `ProductCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductCategory" DROP CONSTRAINT "ProductCategory_categories_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductCategory" DROP CONSTRAINT "ProductCategory_product_id_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "categoryId" TEXT;

-- DropTable
DROP TABLE "ProductCategory";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
