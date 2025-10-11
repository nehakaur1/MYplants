import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductCard = ({ plant }) => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);

  const handleAdd = () => {
    const quantity = Math.max(1, Number(qty) || 1);
    dispatch(addToCart({ ...plant, quantity }));
    // optional: small visual feedback
    alert(`${plant.name} added (${quantity})`);
  };

  return (
    <div className="product-card">
      <img src={plant.image} alt={plant.name} />
      <h3>{plant.name}</h3>
      <p className="price">₹{plant.price}</p>
      <div className="qty-row">
        <input
          type="number"
          min="1"
          className="quantity-input"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
        />
        <button className="add-btn" onClick={handleAdd}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
