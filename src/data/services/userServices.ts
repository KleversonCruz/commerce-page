import User from "@data/core/identity/User";
import { UserSignIn } from "@data/core/identity/UserSignIn";
import { api } from "@data/services/api";

export async function signInUser(user: UserSignIn): Promise<any> {
    var data = JSON.stringify({
        "password": user.password,
        "userName": user.userName
    });

    var response = await api.post('/User/Login', data)
        .then(response => {
            const json: any = response.data
            return {
                token: json.token,
                userData: User.createObject(json.user)
            }
        })
        .catch(error => {
            console.log(error);
        });

    return response
}

export async function registerUser(user: User): Promise<any> {
    var data = JSON.stringify(user);

    var response = await api.post('/User/Register', data)
        .then(response => {
            const json: any = response.data
            return {
                token: json.token,
                userData: User.createObject(json.user)
            }
        })
        .catch(error => {
            console.log(error);
        });

    return response
}

export async function getUserInformation(): Promise<any> {

    var response = await api.get('/User')
        .then(response => {
            const json = response.data
            return {
                userData: User.createObject(json)
            }
        })
        .catch(error => {
            console.log(error);
        });

    return response
}
