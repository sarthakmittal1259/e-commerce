import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { cartActions } from '../store/cartSlice';
import defaultImage from '../assets/product_default_image.png'; 

const HomePage = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (product) => {
    dispatch(cartActions.addToCart(product));
  };

  return (
    <div className="home-page">
      <div className="product-page">
        <h1>My Market</h1>
        <button onClick={() => navigate('/cart')}>Checkout</button>
        
        {/* Search Bar and Clear Button */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-bar"
          />
          <button onClick={handleClearSearch} className="clear-btn">
            Clear
          </button>
        </div>
        
        <div className="product-list">
          {filteredProducts.map(product => (
            <div key={product.id} className="product">
              <h2>{product.name}</h2>
              <img 
                src={ defaultImage || product.image} 
                alt={product.name} 
                className="product-image"
              />
              <p>${product.price}</p>
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
