import {API} from '../../backend'
import {cartEmpty} from '../../core/helper/cartHelper'


export const signup = (user) => {
    // calling http://localhost:8000/api/user/
    return fetch(`${API}user/`, {
        method: "post",
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const signin = (user) => {
    const formData = new FormData()

    // our backend expects the name also to be given when signin in. but signin page only ask for email and password
    // So we append the user's name into the formData before we send it to backend
    for (const name in user) {
        formData.append(name, user[name])
    }

    return fetch(`${API}user/login/`, {
        method: 'POST',
        body: FormData
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const authenticate = (data, next) => {
    if (typeof window !== undefined) {
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
}

export const isAuthenticated = () => {
    if (typeof window == undefined) {
        return false
    }
    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"))
    }
    else {
        return false
    }
}

export const signout = (next) => {
    const userId = isAuthenticated() && isAuthenticated.user.id

    if (typeof window !== undefined) {
        localStorage.removeItem("jwt");
        // cartEmpty can send a call back
        cartEmpty(()=>{});
        // next();

        return fetch(`${API}user/logout/${userId}`, {
            method: "GET"
        })
        .then(response => {
            console.log("Signout success");
            next();
        })
        .catch(err => console.log(err))
    }
}