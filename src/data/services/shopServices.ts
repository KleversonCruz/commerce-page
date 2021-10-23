import Shop from "@data/core/Shop";
import { api } from "@data/services/api";

export async function GetShops(name?: string, limit?: number, page?: number): Promise<any> {
    var response = await api.get('/Shop', { params: { name, limit, page } })
        .then(response => {
            const json: any = response.data
            if (json) {
                return {
                    data: json.items.map(s => (
                        Shop.createObject(s)
                    ))
                }
            }
            return {
                data: null
            }
        })
        .catch(error => {
            console.log(error);
            throw new Error(error);
        });

    return response
}

export async function GetShopById(shopId: number) {
    var response = await api.get(`/Shop/${shopId}`)
        .then(response => {
            const json = response.data
            if (json) {
                return {
                    data: Shop.createObject(json)
                }
            }
            return {
                data: null
            }
        })
        .catch(error => {
            console.log(error);
            return null;
        });

    return response
}