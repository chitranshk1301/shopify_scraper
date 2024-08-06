import React, { useState } from 'react';
import ScraperForm from './components/ScraperForm';
import ProductCard from './components/ProductCard';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="App">
      <h1>Shopify Product Scraper</h1>
      <ScraperForm setProducts={setProducts} setLoading={setLoading} />
      {loading && <p>Loading...</p>}
      <div className="product-grid">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
}

export default App;