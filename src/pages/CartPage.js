import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';
const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems);
  const totalPrice = useSelector(state => state.cart.totalPrice);
  const handleUpdateQuantity = (id, quantity) => {
    dispatch(cartActions.updateQuantity({ id, quantity }));
  };
  const navigate = useNavigate();
  const handleRemoveFromCart = (id) => {  
    dispatch(cartActions.removeFromCart({ id }));
  };

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      <button onClick={(e) => {navigate('/')}}>GO back</button>
      <div className="cart">
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <h3>{item.name}</h3>
            <p>Price: ${item.price}</p>
            <button onClick={() =>{
              if(item.quantity>1)
                handleUpdateQuantity(item.id,item.quantity - 1)
              else 
              handleRemoveFromCart(item.id)
            }}>-</button>
            <p> {item.quantity}</p>
            <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button>
            <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
          </div>
        ))}
        
        
      </div>
      <h2>Total Price: ${totalPrice}</h2>
    </div>
  );
};

export default CartPage;
