import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../redux/slices/productSlice'
import Product from '../components/Product'
import '../css/Product.css'

function ProductList() {
    const dispatch = useDispatch();
    const { products } = useSelector((store) => store.product);

    // Products içerisindeki ürünlerde görsellerin url'i https://i.imgur.com ile başlayanları seçen fonksiyon
    // Görsel sorunu olmayan ürünleri filtrelemek için kullanılır
    const filteredProducts = products?.filter((product) => {
        return product.images?.some((img) => img.startsWith('https://i.imgur.com'));
    });

    useEffect(() => {
        dispatch(getAllProducts());
    }, [])
    return (
        <div className="flex-row" style={{ flexWrap: 'wrap' }}>
            {
                filteredProducts && filteredProducts.map((product) => (
                    <Product key={product.id} product={product} />
                ))
            }
        </div>
    )
}

export default ProductList