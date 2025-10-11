import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);

  const handleCheckout = () => {
    const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn")) || false;
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    // simulated order creation - store order in localStorage
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const newOrder = {
      id: Date.now(),
      items: cartItems,
      total,
      date: new Date().toISOString(),
    };
    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));

    dispatch(clearCart());
    alert("Order placed! (simulated) — check localStorage 'orders'.");
    navigate("/");
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-info">
                <h4>{item.name}</h4>
                <p>₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}</p>
                <div className="cart-controls">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => dispatch(updateQuantity({ id: item.id, quantity: Number(e.target.value) }))}
                    className="quantity-input"
                  />
                  <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
                </div>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <h3>Total: ₹{total}</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
