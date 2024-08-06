import axios from 'axios';
import cheerio from 'cheerio';

export const getProductDetails = async (productUrls) => {
  return Promise.all(productUrls.map(async (url) => {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    
    return {
      title: $('h1').first().text().trim(),
      imageUrl: $('img[itemprop="image"]').attr('src'),
      description: $('div[itemprop="description"]').text().trim(),
    };
  }));
};