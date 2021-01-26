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
    
    // This section is turned into a for loop below
    // Destructuring user object
    // const {email, password} = user;
    // formData.append('email', email)
    // formData.append('password', password)

    // we are assigning every key in user object to the formdata object. So it will be email and password that gets passed to the formdata object
    for (const name in user) {
        formData.append(name, user[name])
    }

    return fetch(`${API}user/login/`, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        console.log("SUCCESS", response);
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
        // TODO: compare JWT with database json token
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