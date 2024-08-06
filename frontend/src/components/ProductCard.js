import React from 'react';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.title} />
      <h2>{product.title}</h2>
      <ul>
        {product.summary.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProductCard;