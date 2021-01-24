import React from 'react'

const ImageHelper = ({product}) => {

    const imageurl = product ? product.image : `https://images.pexels.com/photos/3183132/pexels-photo-3183132.jpeg?cs=srgb&dl=pexels-fauxels-3183132.jpg&fm=jpg`

    return (
        <div className="rounded border border-success p-2">
            <img src={imageurl}
            alt=""
            style={{maxHeight:"100%", maxWidth:"100%"}}
            className="mb-3 rounded"
             />

        </div>
    )
}

export default ImageHelper