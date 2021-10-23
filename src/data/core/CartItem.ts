import Product from "./Product"
import ShoppingSession from "./ShoppingSession"

export default class CartItem {
    #id: number
    #quantity: number
    #productId: number
    #product: Product
    #shoppingSessionId: number
    #shoppingSession: ShoppingSession

    constructor(id: number, quantity: number, productId: number, product: Product, shoppingSessionId: number, shoppingSession: ShoppingSession) {
        this.#id = id
        this.#quantity = quantity
        this.#productId = productId
        this.#product = product
        this.#shoppingSessionId = shoppingSessionId
        this.#shoppingSession = shoppingSession
    }

    get id() {
        return this.#id
    }

    get quantity() {
        return this.#quantity
    }

    get productId() {
        return this.#productId
    }

    get product() {
        return this.#product
    }

    get shoppingSessionId() {
        return this.#shoppingSessionId
    }

    get shoppingSession() {
        return this.#shoppingSession
    }

    toObject() {
        return {
            id: this.#id,
            quantity: this.#quantity,
            productId: this.#productId,
            product: this.#product,
            shoppingSessionId: this.#shoppingSessionId,
            shoppingSession: this.#shoppingSession,
        }
    }

    static createObject(obj: CartItem): CartItem {
        return new CartItem(
            obj.id,
            obj.quantity,
            obj.productId,
            obj.product,
            obj.shoppingSessionId,
            obj.shoppingSession,
        )
    }
}

