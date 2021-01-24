import React from 'react'
import ImageHelper from './helper/imageHelper'

const Card = ({
    // variables given to the Card component, along with 2 more variables with defaults already set by us
    product,
    addtoCart = true,
    removeFromCart = false

}) => {
    const cartTitle = product ? product.name : "A photo from pexels"
    const cartDescription = product ? product.description : "Default description"
    const cartPrice = product ? product.price : "Default"

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
                        <button
                         onClick={() => {}}
                         className="btn btn-block btn-outline-success mt-2 mb-2"
                        >
                         Add to Cart
                        </button>
                    </div>
                    <div className="col-12">
                        <button
                         onClick={() => {}}
                         className="btn btn-block btn-outline-danger mt-2 mb-2"
                        >
                         Remobe from cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card