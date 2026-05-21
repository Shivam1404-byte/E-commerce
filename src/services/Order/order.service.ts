import {prisma} from "../../db/prisma"
import { AppError } from "../../utils/appError"

export const place_order = async (userId: string, idempotency_key: string, storeId: string) => {
    return await prisma.$transaction(async (tx) => {
        // 1. Get cart with items
        const cart = await tx.cart.findFirst({
            where: {
                user_id: userId,
                store_id: storeId
            },
            include: { cart_items: true }
        })

        if (!cart || cart.cart_items.length === 0) {
            throw new AppError("Cart not found or empty", 404)
        }

        // 2. Lock rows — prevents concurrent orders depleting same stock
        const productIds = cart.cart_items.map(item => item.product_id)
        await tx.$queryRaw`
            SELECT * FROM "Product"
            WHERE id = ANY(${productIds}::uuid[])
            FOR UPDATE
        `

        // 3. Fetch products normally after lock
        const products = await tx.product.findMany({
            where: { id: { in: productIds } }
        })

        // 4. Check stock for every item
        for (const item of cart.cart_items) {
            const product = products.find(p => p.id === item.product_id)
            if (!product) {
                throw new AppError("Product not found", 404)
            }
            if (product.stock < item.quantity) {
                throw new AppError(`Insufficient stock for ${product.name}`, 400)
            }
        }

        // 5. Deduct stock
        for (const item of cart.cart_items) {
            await tx.product.update({
                where: { id: item.product_id },
                data: { stock: { decrement: item.quantity } }
            })
        }

        const total_price = cart.cart_items.reduce((sum, item) => {
            const product = products.find(p => p.id === item.product_id)!
            return sum + Number(product.price) * item.quantity
        }, 0)

        // 6. Create order with items
        const order = await tx.order.create({
            data: {
                user_id: userId,
                store_id: storeId,
                idempotency_key,
                OrderItem: {
                    create: cart.cart_items.map(item => ({
                        product_id: item.product_id,
                        store_id: storeId,
                        quantity: item.quantity,
                        purchase_price: Number(
                            products.find(p => p.id === item.product_id)!.price
                        )
                    }))
                }
            }
        })

        // 7. Clear cart
        await tx.cartItem.deleteMany({ where: { cart_id: cart.id } })

        // 8. Simulate payment
        const paymentSuccess = Math.random() > 0.2
        const updatedOrder = await tx.order.update({
            where: { id: order.id },
            data: { status: paymentSuccess ? "COMPLETED" : "CANCELLED" }
        })

        return updatedOrder
    })
}