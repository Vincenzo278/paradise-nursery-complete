import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart
} from './CartSlice.jsx';

function Navbar() {
  const cart = useSelector(state => state.cart.items || []);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="navbar">
      <Link className="brand" to="/">Paradise Nursery</Link>

      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/plants">Plants</NavLink>
        <NavLink to="/cart">
          🛒 Cart ({count})
        </NavLink>
      </nav>
    </header>
  );
}

export default function CartItem() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.items || []);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar />

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
            {cart.map(item => (
              <div className="cart-row" key={item.id}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />

                <div className="cart-item-details">
                  <h2 className="cart-item-name">
                    {item.name}
                  </h2>

                  <p className="cart-item-cost">
                    Unit Price: ${item.price.toFixed(2)}
                  </p>

                  <p className="cart-item-total">
                    Total: ${(item.price * item.quantity).toFixed(2)}
                  </p>

                  <div className="quantity">
                    <button
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                      aria-label={`Decrease ${item.name} quantity`}
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => dispatch(increaseQuantity(item.id))}
                      aria-label={`Increase ${item.name} quantity`}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="button danger cart-item-delete"
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
                onClick={() => alert('Coming Soon!')}
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
    </>
  );
}