import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import PageContainer from './container/PageContainer'
import ProductList from './components/ProductList'
import RouterConfig from './config/RouterConfig'
import { BrowserRouter } from 'react-router-dom'
import Loading from './components/Loading'
import Drawer from '@mui/material/Drawer';
import { useSelector, useDispatch } from 'react-redux';
import { removeProductFromBasket, toggleDrawer, calculateTotalPrice } from './redux/slices/basketSlice';
import Snackbar from '@mui/material/Snackbar';

function App() {
  const { products, drawerOpen, totalPrice } = useSelector((store) => store.basket);
  const dispatch = useDispatch();
  const removeFromBasket = (productId) => {
    dispatch(removeProductFromBasket(productId));
    <Snackbar
      open={true}
      autoHideDuration={3000}
      message="Ürün sepetten çıkarıldı"
    />
  };
  useEffect(() => {
    dispatch(calculateTotalPrice());
  }, [products, dispatch]);

  return (
    <PageContainer>
      <Header />
      <RouterConfig />
      <Loading />
      <Drawer anchor="right" open={drawerOpen} onClose={() => dispatch(toggleDrawer())}>
        <div className="basket-drawer">
          <div className="basket-header">
            <h2 className="basket-title">Sepet</h2>
            <button className="hide-basket-button" onClick={() => dispatch(toggleDrawer())}>Sepeti Gizle</button>
          </div>
          {products && products.map((product) => (
            <div key={product.id} className="basket-item">
              <img className="basket-item-image" src={product.images && product.images[0]} alt={product.title} />
              <div className="basket-item-details">
                <h4>{product.title}</h4>
                <p>Adet: {product.quantity}</p>
                <p>Tutar: ${product.price}</p>
                <button className="remove-button" onClick={() => removeFromBasket(product.id)}>Sepetten Çıkar</button>
              </div>
            </div>
          ))}
          <h3 className="basket-total">Toplam: ${totalPrice.toFixed(2)}</h3>
        </div>
      </Drawer>
    </PageContainer >
  )
}

export default App
