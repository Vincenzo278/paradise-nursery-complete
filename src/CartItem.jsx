import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart
} from './CartSlice';

export default function CartItem() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items || []);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="page">
      <div className="heading">
        <h1>Shopping Cart</h1>
      </div>

      {cart.length === 0 ? (
        <div className="empty">
          <h2>Your cart is empty</h2>
          <p>Add some beautiful plants to your cart.</p>
          <Link to="/plants" className="button">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-row" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div>
                <h2>{item.name}</h2>
                <p>Unit Price: ${item.price.toFixed(2)}</p>
                <p>
                  Total: ${(item.price * item.quantity).toFixed(2)}
                </p>

                <div className="quantity">
                  <button onClick={() => dispatch(decreaseQuantity(item.id))}>
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button onClick={() => dispatch(increaseQuantity(item.id))}>
                    +
                  </button>
                </div>

                <button
                  className="button danger"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          <div className="cart-total">
            <h2>Total Amount: ${total.toFixed(2)}</h2>
            <button
              className="button"
              onClick={() => alert('Order placed successfully!')}
            >
              Checkout
            </button>

            <Link to="/plants" className="button secondary">
              Continue Shopping
            </Link>
          </div>
        </>
      )}
    </main>
  );
}