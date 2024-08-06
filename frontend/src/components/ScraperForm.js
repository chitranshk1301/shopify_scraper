import React, { useState } from 'react';
import axios from 'axios';

function ScraperForm({ setProducts, setLoading }) {
  const [domain, setDomain] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/scrape', { domain });
      setProducts(response.data);
    } catch (error) {
      console.error('Error scraping products:', error);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        placeholder="Enter Shopify domain"
        required
      />
      <button type="submit">Scrape Products</button>
    </form>
  );
}

export default ScraperForm;