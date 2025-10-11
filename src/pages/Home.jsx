import React from "react";
import { Link } from "react-router-dom";



const Home = () => {
  return (
    <section className="home">
      <div className="hero">
        <h1>Welcome to MYplants 🌿</h1>
        <p className="hero-subtitle">
          Bring home fresh green vibes — indoor, outdoor & herbs.
        </p>
        <Link className="shop-btn" to="/shop">
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default Home;
