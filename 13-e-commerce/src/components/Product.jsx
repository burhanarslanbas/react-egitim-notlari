import React from 'react'
import '../css/Product.css'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function Product({ product }) {
    const { title, description, price, category, images } = product;

    const navigate = useNavigate();
    return (
        <div className="product-card">
            <img className="product-image" src={images[0]} alt={title} />
            <div className="product-info">
                <h2 className="product-title">{title}</h2>
                <p className="product-category">{category.name}</p>
                <p className="product-price">${price.toFixed(2)}</p>
                <div style={{ display: 'flex' }}>
                    <button onClick={() => navigate(`/product-details/${product.id}`)} className="btn-view-details">İncele</button>
                    <button className="btn-add-to-cart" onClick={() => navigate(`/product-details/${product.id}`)}>
                        Sepete Ekle
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Product