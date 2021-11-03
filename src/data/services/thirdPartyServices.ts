import axios from "axios";

export async function getAdressByPostalCode(postalCode: string): Promise<any> {
    const axiosIntance = axios.create({
        baseURL: 'https://viacep.com.br/ws'
    })
    var response = await axiosIntance.get(`/${postalCode}/json`)
        .then(function (response) {
            console.log(response.data);
            return {
                adress: response.data
            };
        })
        .catch(function (error) {
            console.log(error);
        });
    return response;
}