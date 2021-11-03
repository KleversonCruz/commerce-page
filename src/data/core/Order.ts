import Customer from "./Customer"
import Shop from "./Shop"

export default class Order {
    #id: number
    #total: number
    #customerId: number
    #customer: Customer
    #orderItems: string[]
    #shopId: number
    #shop: Shop

    constructor(id: number, total: number, customerId: number, customer: Customer, orderItems: string[], shopId: number, shop: Shop) {
        this.#id = id
        this.#total = total
        this.#customerId = customerId
        this.#customer = customer
        this.#orderItems = orderItems
        this.#shopId = shopId
        this.#shop = shop
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

    get orderItems() {
        return this.#orderItems
    }

    get shopId() {
        return this.#shopId
    }

    get shop() {
        return this.#shop
    }

    toObject() {
        return {
            id: this.#id,
            total: this.#total,
            customerId: this.#customerId,
            customer: this.#customer,
            orderItems: this.#orderItems,
            shopId: this.#shopId,
            shop: this.#shop,
        }
    }

    static createVoid() {
        return new Order(
            0,
            0,
            0,
            null,
            null,
            0,
            null,
        )
    }

    static createObject(obj: Order): Order {
        return new Order(
            obj.id,
            obj.total,
            obj.customerId,
            obj.customer,
            obj.orderItems,
            obj.shopId,
            obj.shop,
        )
    }
}

