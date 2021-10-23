import Shop from "@data/core/Shop";
import { createContext, useEffect, useState } from "react";
import { GetShopById as getLojaRequest } from "@data/services/shopServices";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";

type AppContextType = {
    shop: Shop
    isLoading: boolean
    setIsLoading
}

export const AppContext = createContext({} as AppContextType)

export function AppProvider({ children }) {
    const [shop, setShop] = useState<Shop | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const router = useRouter();
    const lojaId = +router.query.lojaId;

    useEffect(() => {
        async function load() {
            if (lojaId) {
                await getLojaRequest(lojaId).then(response => {
                    setShop(response?.data)
                    setIsLoading(false)
                })
            }
        }
        load()
    }, [lojaId]);
    

    return (
        <AppContext.Provider value={{ shop: shop, setIsLoading, isLoading }}>
            {children}
        </AppContext.Provider>
    )
}