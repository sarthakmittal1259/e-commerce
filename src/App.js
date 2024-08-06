import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import HomePage from './pages/ProductPage.js';
import CartPage from './pages/CartPage.js';
import { cartActions } from './store/cartSlice';

const App = () => {
  // Define a list of products
  const products = [
    { id: 1, name: 'Wireless Ear', price: 10, image: 'image1.jpg' },
    { id: 2, name: 'Bluetooth Spk', price: 20, image: 'image2.jpg' },
    { id: 3, name: 'Smartphone C', price: 30, image: 'image3.jpg' },
    { id: 4, name: '4K Ultra TV', price: 80, image: 'image4.jpg' },
    { id: 5, name: 'Mechanical Kb', price: 40, image: 'image5.jpg' },
    { id: 6, name: 'Gaming Mouse', price: 50, image: 'image6.jpg' },
    { id: 7, name: 'External SSD', price: 60, image: 'image7.jpg' },
    { id: 8, name: 'HD Webcam Pr', price: 70, image: 'image8.jpg' },
    { id: 9, name: 'USB Charger', price: 90, image: 'image9.jpg' },
    { id: 10, name: 'Wireless KB', price: 15, image: 'image10.jpg' },
    { id: 11, name: 'Bluetooth Hs', price: 11, image: 'image11.jpg' },
    { id: 12, name: 'Smartwatch G', price: 12, image: 'image12.jpg' },
    { id: 13, name: 'Portable Bt', price: 56, image: 'image13.jpg' },
    { id: 14, name: 'Action Cam 4', price: 65, image: 'image14.jpg' },
  ];
  
  



  // Get cart items and dispatch function from Redux store
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  // Calculate total price of cart items
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Route for HomePage */}
          <Route path="/" element={<HomePage products={products} addToCart={(product) => dispatch(cartActions.addToCart({id:product.id}))} />} />
          {/* Route for CartPage */}
          <Route path="/cart" element={
            <CartPage
              cartItems={cartItems}
              removeFromCart={(id) => dispatch(cartActions.removeFromCart({id}))}
              updateQuantity={(id, quantity) => dispatch(cartActions.updateQuantity({id, quantity}))}
              totalPrice={totalPrice}
            />
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
