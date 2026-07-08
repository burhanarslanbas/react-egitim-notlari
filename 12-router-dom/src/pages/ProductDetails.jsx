import React from 'react'
import { useParams } from 'react-router-dom'
import { productlist } from '../../data/products'
import Product from '../../components/Product'

function ProductDetails() {
    const { id } = useParams();
    return (
        <div>
            <h1>Product Details</h1>
            <hr />
            {
                productlist && productlist.map((product) => {
                    if (product.id === parseInt(id)) {
                        return <Product key={product.id} product={product} />
                    }
                })
            }
        </div>
    )
}

export default ProductDetails