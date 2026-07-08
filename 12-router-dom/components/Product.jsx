import React from 'react'
import { useNavigate } from 'react-router-dom';

function Product({ product }) {
    const { id, name, description, price } = product;

    const navigate = useNavigate();

    return (
        <div style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
            <p>ID: {id}</p>
            <h3>Name: {name}</h3>
            <p>Description: {description}</p>
            <p>Price: ${price.toFixed(2)}</p>
            <button onClick={() => navigate(`/product-details/${id}`)}>View Details</button>
        </div>
    )
}

export default Product