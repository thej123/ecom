import React from 'react'
import ImageHelper from './helper/imageHelper'
import { Redirect } from 'react-router-dom'
import { addItemToCart, removeItemFromCart, loadCart, cartEmpty } from './helper/cartHelper'

// TODO: Deal with this later
const isAuthenticated = true


const Card = ({
    // variables given to the Card component, along with 2 more variables with defaults already set by us
    product,
    addtoCart = true,
    removeFromCart = false

}) => {
    const cartTitle = product ? product.name : "A photo from pexels"
    const cartDescription = product ? product.description : "Default description"
    const cartPrice = product ? product.price : "Default"

    const addToCart = () => {
        if (isAuthenticated) {
            addItemToCart(product, () => {})
            console.log("Added to cart")
        } else {
            console.log("Login Please!")
        }
    }

    const getAredirect = redirect => {
        if (redirect) {
            return <Redirect to="/cart" />
        }
    }

    const showAddToCart = addToCart => {
        return (
            // If addToCart is true then return the button. PS the html will always be true.
            addtoCart && (
                <button
                    onClick={addToCart}
                    className="btn btn-block btn-outline-success mt-2 mb-2"
                >
                    Add to Cart
                </button>
            )
        )
    }

    const showRemoveFromCart = removeFromCart => {
        return (
            removeFromCart && (
                <button
                    onClick={() => {
                        //  TODO: Handles this too!
                        removeItemFromCart(product.id)
                        console.log("Product removed from cart")
                    }}
                    className="btn btn-block btn-outline-danger mt-2 mb-2"
                >
                    Remove from cart
                </button>
            )
        )
    }

    return (
        <div className="card text-white bg-dark border border-info">
            <div className="card-header lead">{cartTitle}</div>
            <div className="card-body">
                <ImageHelper product={product}/>
                <p className="lead bg-success font-weight-normal text-wrap">
                    {cartDescription}
                </p>
                <p className="btn btn-success rounded btn-sm px-4">$ {cartPrice}</p>
                <div className="row">
                    <div className="col-12">
                        {showAddToCart(addToCart)}
                    </div>
                    <div className="col-12">
                        {showRemoveFromCart(removeFromCart)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card