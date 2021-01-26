import {API} from '../../backend'

export const createOrder = (userId, token, orderData) => {
    const formData = new FormData();
    // add all the orderData info into the form - ie. convert to formdata
    for (const name in orderData) {
        formData.append(name, orderData[name])
    }

    return fetch(`${API}order/add/${userId}/${token}/`, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        return response.json()
    })
    .catch(e => console.log(e))

}