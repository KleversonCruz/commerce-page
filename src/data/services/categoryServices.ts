import { api } from "@data/services/api";

export async function GetCategories(queryParams?: any) {
    const { shopId, page, name, limit } = queryParams || {};

    var response = await api.get('/category', { params: { shopId, name, page, limit } })
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
