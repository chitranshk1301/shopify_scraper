import * as robotsService from '../services/robotsService.js';
import * as sitemapService from '../services/sitemapService.js';
import * as productService from '../services/productService.js';
import * as llmService from '../services/llmService.js';

export const scrapeProducts = async (req, res) => {
  try {
    const { domain } = req.body;
    
    const robotsTxt = await robotsService.getRobotsTxt(domain);
    const mainSitemapUrl = robotsService.extractMainSitemap(robotsTxt);
    
    const productSitemapUrl = await sitemapService.findProductSitemap(mainSitemapUrl);
    const productUrls = await sitemapService.getProductUrls(productSitemapUrl);
    
    const products = await productService.getProductDetails(productUrls.slice(0, 5));
    
    const summarizedProducts = await Promise.all(
      products.map(async (product) => ({
        ...product,
        summary: await llmService.summarizeProduct(product.description)
      }))
    );

    res.json(summarizedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while scraping' });
  }
};
