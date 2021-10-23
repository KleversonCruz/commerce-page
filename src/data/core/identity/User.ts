import Customer from "../Customer"
import Role from "./Role"

export default class User {
    #id: number
    #userName: string
    #password: string
    #customer: Customer
    #userRoles: Role[]

    constructor(id: number, userName: string, password: string, customer: Customer, userRoles: Role[]) {
        this.#id = id
        this.#userName = userName
        this.#password = password
        this.#customer = customer
        this.#userRoles = userRoles
    }

    get id() {
        return this.#id
    }

    get userName() {
        return this.#userName
    }

    get password() {
        return this.#password
    }

    get customer() {
        return this.#customer
    }

    get userRoles() {
        return this.#userRoles
    }

    static createObject(obj: User): User {
        return new User(
            obj.id,
            obj.userName,
            obj.password,
            obj.customer,
            obj.userRoles,
        )
    }

    toObject() {
        return {
            id: this.#id,
            userName: this.#userName,
            password: this.#password,
            customer: this.#customer,
            userRoles: this.#userRoles,
        }
    }
}