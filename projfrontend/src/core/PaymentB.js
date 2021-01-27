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

    const userId = isAuthenticated && isAuthenticated().user.id
    const token = isAuthenticated && isAuthenticated().token

    const getToken = (userId, token) => {
        getMeToken(userId, token)
        .then(response => {
            if (response.error) {
                setInfo({
                    ...response,
                    error: response.error,
                })
                // signout takes a callback - so i can use it to redirect the user to login/homepage
                signout(() => {
                    return <Redirect to="/" />
                })
            } else {
                console.log("1", info)
                console.log("2", response)

                const clientToken = response.clientToken
                // below is the same as 'setInfo({clientToken : clientToken})' - JS figures that out automatically
                setInfo({clientToken: clientToken})
                console.log("3", info)

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

    const onPurchase = () => {
        //after user presses the 'Pay' button - we want deactivate the button so that user doesnt double pay
        console.log("4",info)
        setInfo({ loading: true })
        let nonce;
        console.log("5", info)
        // requestPaymentMethod - from braintree
        let getNonce = info.instance.requestPaymentMethod()
        .then(data => {
            // braintree gives the nonce
            nonce = data.nonce
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getAmount()
            };
            processPayment(userId, token, paymentData)
            .then(response => {
                if (response.error) {
                    if (response.code == '1') {
                        console.log("PAYMENT FAILED")
                        signout(() => {
                            return <Redirect to="/" />
                        })
                    }
                } else {
                    setInfo({...info,
                        success: response.success, loading: false
                    })
                    console.log("PAYMENT SUCCESS")
                    // empty the cart
                    let product_names = ""
                    products.forEach(function(item){
                        product_names += item.name + ", "
                    })
                    const orderData = {
                        products: product_names,
                        transaction_id: response.transaction.id,
                        amount: response.transaction.amount
                    }
                    createOrder(userId,token, orderData)
                    .then(response => {
                        if (response.error) {
                            if (response.code == '1') {
                                console.log("ORDER FAILED")
                            }
                            signout(() => {
                                return <Redirect to="/" />
                            })
                        } else{
                            if (response.success == true) {
                                console.log("ORDER PLACED")
                            }
                        }
                    })
                    .catch(error => {
                        setInfo({loading:false, success: false})
                        console.log("ORDER FAILED", error)
                    })
                    cartEmpty(() => {
                        console.log("CART IS EMPTIEd OUT")
                    })
                    setReload(!reload)
                }
            })
            .catch(e => console.log(e))
        })
        .catch(e => console.log("NONCE error", e))
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
                            onInstance={(instance) => (info.instance = instance)}
                            >
                                
                            </DropIn>
                            
                            <button
                            onClick={onPurchase}
                            className="btn btn-block btn-success">Pay</button>
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
            <h3>Your bill is ${getAmount()}</h3>
            {showBtnDropIn()}
            
        </div>
    )
}

export default PaymentB