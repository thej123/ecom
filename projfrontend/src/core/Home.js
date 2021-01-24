import React, { useState, useEffect } from 'react';
import Base from './Base';
import '../styles.css';
import {getProducts } from "./helper/coreapicalls";
import Card from './Card';


export default function Home() {
    // variable name 'products'. you will insert data into that variable using the SetProducts method
    // This managed by useState. so usestate creates an array with key 'products'. Then calls that method to fill the array
    const [products, setProducts] = useState([]);

    // useState is going to create a variable names 'error', with the default value being 'false'. 
    // Builtin method 'SetError' is going to modify this variable as needed
    const [error, setError] = useState(false);

    // Arrow function
    const loadAllProducts = () => {
        // call our 'getProducts' method
        getProducts()
        .then((data) => {
            // Callback
            if (data.error) {
                // Updating the error variable managed by the useState from above
                setError(data.error);
                // This error is the same error as the 'error' variable of useState - default being false
                console.log(error);
            } else {
                // If no errors - then call setProducts method and add stuff to the 'products' variable managed by the useState
                setProducts(data);
            }
        })
        // .catch(err => console.log(err))
    }

    // useEffect is a callback as the first parameter, second parameter being an array.
    useEffect(() => {
        loadAllProducts();
    }, [])

    return(
        <Base title="Home Page" description="Welcome to T-shirt store">
            <h1>Home component</h1>
            <div className="row">
                {products.map((product, index) => {
                    return(
                        <div key={index} className="col-4 mb-4">
                            <Card product={product}/>
                            {/* <h1>{product.name}</h1> */}
                        </div>
                    )
                })}
            </div>
        </Base>
    )
}