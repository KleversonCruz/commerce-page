import Product from "@data/core/Product";
import { api } from "@data/services/api";

export async function GetProducts(queryParams?: any) {
    const { shopId, categoryId, page, name, limit } = queryParams || {};

    var response = await api.get(`/Product`, { params: { shopId, categoryId, name, page, limit } })
        .then(response => {
            const json: any = response.data
            if (json) {
                return json
            }
            return {
                data: []
            }
        })
        .catch(error => {
            console.log(error);
        });

    return response
}

export async function GetProductById(queryParams?: any) {
    const { shopId, productId } = queryParams || {};

    var response = await api.get(`/Product/${productId}`)
        .then(response => {
            const json: any = response.data
            if (json) {
                return json;
            }
            return null;
        })
        .catch(error => {
            console.log(error);
        });

    return response
}
