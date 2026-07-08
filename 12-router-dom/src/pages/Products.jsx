import React from 'react'
import Product from '../../components/Product'
import { productlist } from '../../data/products'

function Products() {
    return (
        <div>
            <h1>Products</h1>
            {productlist.map((product) => (
                <Product key={product.id} product={product} />
            ))}
        </div>
    )
}

export default Products