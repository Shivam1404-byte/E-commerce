/*
  Warnings:

  - You are about to drop the `Categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductCategories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductCategories" DROP CONSTRAINT "ProductCategories_categories_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductCategories" DROP CONSTRAINT "ProductCategories_product_id_fkey";

-- DropTable
DROP TABLE "Categories";

-- DropTable
DROP TABLE "ProductCategories";

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductCategory" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "categories_id" TEXT NOT NULL,

    CONSTRAINT "ProductCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductCategory" ADD CONSTRAINT "ProductCategory_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCategory" ADD CONSTRAINT "ProductCategory_categories_id_fkey" FOREIGN KEY ("categories_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
