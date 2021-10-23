import ShoppingSession from "@data/core/ShoppingSession";
import { api } from "@data/services/api";

export async function GetShoppingSessionById(shopId: number) {
    var response = await api.get(`/ShoppingSession/${shopId}`)
        .then(response => {
            const json = response.data
            if (json) {
                return {
                    data: ShoppingSession.createObject(json)
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

export async function AddShoppingSession(shoppingSession: ShoppingSession) {
    var formData = JSON.stringify(shoppingSession);

    var config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    var response = await api.post('/ShoppingSession', formData, config)
        .then(response => {
            if (response.status === 200) {
                return response.status
            }
        })
        .catch(error => {
            console.log(error);
            throw new Error(error);
        });

    return response
}

export async function UpdateShoppingSession(shoppingSession: ShoppingSession) {
    var formData = JSON.stringify(shoppingSession);

    var config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    var response = await api.put(`/ShoppingSession/${shoppingSession.shopId}`, formData, config)
        .then(response => {
            if (response.status === 200) {
                return response.status
            }
        })
        .catch(error => {
            console.log(error);
            throw new Error(error);
        });

    return response
}
