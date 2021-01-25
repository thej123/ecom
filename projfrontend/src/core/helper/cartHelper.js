
// the 'next' is basically a callback that can be given by the user who uses addItemCart function
export const addItemToCart = (item, next) => {
    let cart = [];
    // check if it is a browser
    if (typeof window != undefined) {
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
