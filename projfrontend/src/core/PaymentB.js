import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { cartEmpty } from './helper/cartHelper'
import { getMeToken, processPayment } from './helper/paymentHelper'
import { createOrder } from './helper/orderHelper'
import { isAuthenticated, signout } from '../auth/helper'

import DropIn from 'braintree-web-drop-in-react'

const PaymentB = ({
    products,
    reload = undefined,
    // Recieve a function and throw back that function
    setReload = (f) => f,
}) => {

    const [info, setInfo] = useState({
        loading: false,
        sucess: false,
        clientToken: null,
        error: "",
        instance: {}
    })

    const userId = isAuthenticated() && isAuthenticated().user.id
    const token = isAuthenticated() && isAuthenticated().token

    const getToken = (userId, token) => {
        getMeToken(userId, token)
        .then(info => {
            if (info.error) {
                setInfo({
                    ...info,
                    error: info.error,
                })
                // signout takes a callback - so i can use it to redirect the user to login/homepage
                signout(() => {
                    return <Redirect to="/" />
                })
            } else {
                const clientToken = info.client_token
                // below is the same as 'setInfo({clientToken : clientToken})' - JS figures that out automatically
                setInfo({clientToken})
            }
        })
        .catch(e => console.log(e))
    }

    //  call getToken before component is mounted - i.e info variable gets filled first with the clientToken etc
    useEffect(() => {
        getToken(userId, token)
    }, [])

    const getAmount = () => {
        let amount = 0;
        products.map(p => {
            amount += parseInt(p.price)
        })
        return amount
    }

    const showBtnDropIn = () => {
        return (
            <div>
                {
                    info.clientToken !== null && products.length > 0 ?
                    (
                        <div>
                            <DropIn
                            options={{authorization: info.clientToken}}
                            onInstance={instance => (info.instance = instance)}
                            >
                                
                            </DropIn>
                            
                            <button className="btn btn-block btn-success">Pay</button>
                        </div>
                    ) :
                    (
                        <h3>Please Log in First or Add something in Cart</h3>
                        
                    )
                }
            </div>
        )
    }

    return (
        <div>
            <h3>Your bill is {getAmount()}</h3>
            {showBtnDropIn()}
            
        </div>
    )
}

export default PaymentB