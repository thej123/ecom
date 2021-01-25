
// the 'next' is basically a callback that can be given by the user who uses addItemCart function
export const addItemToCart = (item, next) => {
    let cart = [];
    // check if it is a browser
    if (typeof window !== undefined) {
        // add existing items in my cart to this local cart variable
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"))
        }

        cart.push({
            // access everything in 'item' argument and set it cart
            ...item
        });
        // set this info in window's localStorage for next times use like saving in cookies
        localStorage.setItem("cart", JSON.stringify(cart))
        // Call the next function passed by the user - this is how he can chain methods together
        next();
    }
}

// returns the cart info
export const loadCart = () => {
    if (typeof window !== undefined) {
        if (localStorage.getItem("cart")) {
            return JSON.parse(localStorage.getItem("cart"))
        }
    }
}

// deletes item from cart
export const removeItemFromCart = (productId) => {
    let cart = []
    if (typeof window !== undefined) {
        // add everything in localstorage's cart to local cart variable
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"))
        }

        // map(look) through the cart items
        cart.map((product, i) => {
            // if the product id match - splice (remove) that item from the cart array
            if (product.id === productId) {
                cart.splice(i,1)
            }
        })
        // set the local cart to the localStorage's cart
        localStorage.setItem("cart", JSON.stringify(cart))
    }
    // incase they want see the cart in console
    return cart
}

// Empty the localStrage's cart
export const cartEmpty = (next) => {
    if (typeof window !== undefined) {
        // remove everything
        localStorage.removeItem("cart")
        // add back an empty cart variable back to the localStorage
        let cart = []
        localStorage.setItem("cart". JSON.stringify(cart))
        // allow user to chain functions
        next()
    }
}