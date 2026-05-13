/*
  Warnings:

  - You are about to drop the column `total_price` on the `Order` table. All the data in the column will be lost.
  - Added the required column `store_id` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Cart_user_id_store_id_key";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "total_price";

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "store_id" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Cart_user_id_store_id_idx" ON "Cart"("user_id", "store_id");

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
