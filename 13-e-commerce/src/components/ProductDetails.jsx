import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setSelectedProduct } from '../redux/slices/productSlice';
import { addProductToBasket } from '../redux/slices/basketSlice';
import '../css/ProductDetails.css'

function ProductDetails() {

    const { id } = useParams();
    const { products, selectedProduct } = useSelector((store) => store.product)
    const { title, description, price, category, images } = selectedProduct;

    const [quantity, setQuantity] = useState(1); // Default quantity, you can manage this with state if needed
    const dispatch = useDispatch();

    useEffect(() => {
        getProductById();
    }, []);

    const getProductById = () => {
        products && products.map((product) => {
            if (product.id == id) {
                dispatch(setSelectedProduct(product));
            }
        });
    };

    const addToBasket = () => {
        const payload = { ...selectedProduct, quantity };
        dispatch(addProductToBasket(payload));
    }

    return (
        <div className="product-details-card">
            <img className="image" src={images && images[0]} alt={title} />
            <h2 className="title">{title}</h2>
            <p className="description">{description}</p>
            <p className="price">${price}</p>
            <div className="quantity-control">
                <button className="quantity-button" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    -
                </button>
                <span className="quantity">{quantity}</span>
                <button className="quantity-button" onClick={() => setQuantity(quantity + 1)}>
                    +
                </button>
            </div>
            <button className="add-to-cart-button" onClick={addToBasket}>
                Sepete Ekle
            </button>
        </div>
    )
}

export default ProductDetails