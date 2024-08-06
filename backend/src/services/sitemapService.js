import axios from 'axios';
import xml2js from 'xml2js';

export const findProductSitemap = async (mainSitemapUrl) => {
  const response = await axios.get(mainSitemapUrl);
  const parser = new xml2js.Parser();
  const result = await parser.parseStringPromise(response.data);
  
  const productSitemap = result.sitemapindex.sitemap.find(sitemap => 
    sitemap.loc[0].includes('products')
  );
  
  return productSitemap ? productSitemap.loc[0] : null;
};

export const getProductUrls = async (productSitemapUrl) => {
  const response = await axios.get(productSitemapUrl);
  const parser = new xml2js.Parser();
  const result = await parser.parseStringPromise(response.data);
  
  return result.urlset.url.map(url => url.loc[0]);
};