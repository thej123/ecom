import React, { useState, useEffect }  from 'react'
import Base from './Base'
import Card from './Card'
import { loadCart } from './helper/cartHelper'
import PaymentB from './PaymentB'



const Cart = () => {
    const [reload, setReload] = useState(false)
    const [products, setProducts] = useState([])
    // useEffect is used when you want something load before component is shown
    useEffect(() => {
        // loadCart -returns the value of 'cart' from window session
        // setProducts will set that value (object) to products variable in this component
        setProducts(loadCart())
    // The 'reload' will make sure to remount the cart component if anything changes in the useState i.e reload variable when we click 'remove from cart'
    }, [reload])

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
                    reload={reload}
                    setReload={setReload}
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
                   {products.length > 0 ? (loadAllProducts(products)) : (
                       <h4>No Products</h4>
                   )}
                   
               </div>
               <div className="col-6">
                   {products.length > 0 ? (
                       <PaymentB products={products} setReload={setReload}/>
                   ) : (
                       <h3>Please Login or add something in cart</h3>
                   )}
               </div>
           </div>
       </Base>
    )
}

export default Cart