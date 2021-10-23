import ShoppingSession from "@data/core/ShoppingSession"
import { GetShoppingSessionById } from "@data/services/shoppingSessionServices"
import useApp from "./UseApp"
import useAuth from "./UseAppAuth"

export default function useShoppingSession() {
    const { shop } = useApp()

    async function addProductInCart(shoppingSession: ShoppingSession){
        
    }
    return {
        
    }
}