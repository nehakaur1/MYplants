import React, { useState } from "react";
import { plants } from "../data";
import ProductCard from "../components/ProductCard";

const Shop = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("none");

  const categories = ["All", ...Array.from(new Set(plants.map((p) => p.category)))];

  const filtered = plants
    .filter((p) => (category === "All" ? true : p.category === category))
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    return 0;
  });

  return (
    <div className="shop-page">


      <div className="filters">
        <input
          type="text"
          placeholder="Search plants..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="none">Sort</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
        </select>
      </div>

      <div className="product-grid">
        {sorted.length ? sorted.map((p) => <ProductCard key={p.id} plant={p} />) : <p>No plants found.</p>}
      </div>
    </div>
  );
};

export default Shop;
