import Shop from "./Shop"
import Customer from "./Customer"
import CartItem from "./CartItem"

export default class ShoppingSession {
    #id: number
    #total: number
    #customerId: number
    #customer: Customer
    #shopId: number
    #shop: Shop
    #cartItems: CartItem[]

    constructor(id: number, total: number, customerId: number, customer: Customer, shopId: number, shop: Shop, cartItems: CartItem[]) {
        this.#id = id
        this.#total = total
        this.#customerId = customerId
        this.#customer = customer
        this.#shopId = shopId
        this.#shop = shop
        this.#cartItems = cartItems
    }

    get id() {
        return this.#id
    }

    get total() {
        return this.#total
    }

    get customerId() {
        return this.#customerId
    }

    get customer() {
        return this.#customer
    }

    get shopId() {
        return this.#shopId
    }

    get shop() {
        return this.#shop
    }

    get cartItems() {
        return this.#cartItems
    }

    toObject() {
        return {
            id: this.#id,
            total: this.#total,
            customerId: this.#customerId,
            customer: this.#customer,
            shopId: this.#shopId,
            shop: this.#shop,
            cartItems: this.#cartItems.map(resp => resp.toObject()),
        }
    }

    static createObject(obj: ShoppingSession): ShoppingSession {
        return new ShoppingSession(
            obj.id,
            obj.total,
            obj.customerId,
            obj.customer,
            obj.shopId,
            obj.shop,
            obj.cartItems,
        )
    }
}

