import React from 'react'

function Product({ productName, productPrice }) {
    // Destructuring props
    // const { productName, productPrice } = props; // { productName: "Laptop", productPrice: "17000 TL" }
    return (
        <div>
            <div>ÜRÜN BİLGİLERİ</div>
            <hr />
            <div>
                <div>İsim: {productName}</div>
                <div>Fiyat: {productPrice}</div>
            </div>
        </div>
    )
}

export default Product