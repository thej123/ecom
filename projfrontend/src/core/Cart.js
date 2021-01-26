import React, { useState, useEffect }  from 'react'
import Base from './Base'
import Card from './Card'
import { loadCart } from './helper/cartHelper'



const Cart = () => {
    
    const [products, setProducts] = useState([])
    // useEffect is used when you want something load before component is shown
    useEffect(() => {
        // loadCart -returns the value of 'cart' from window session
        // setProducts will set that value (object) to products variable in this component
        setProducts(loadCart())
    }, [])

    const loadAllProducts = (products) => {
        return (
            <div>
                {/* If i use {} then i need to use the return key. OR we need to use the (). Look carefully at the brackets used below */}
                {products.map((product, index) => (
                    <Card
                    key={index}
                    product={product}
                    removeFromCart={true}
                    addtoCart={false}
                    />
                ))}
            </div>
        )
    }

    const loadCheckout = () => {
        return (
            <h1>Checkout</h1>
        )
    }

    return (
       <Base title="Cart Page" description="Welcome to Checkout">
           <div className="row text-centre">
               <div className="col-6">
                   {loadAllProducts(products)}
               </div>
               <div className="col-6">
                   {loadCheckout()}
               </div>
           </div>
       </Base>
    )
}

export default Cart