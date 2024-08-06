import axios from 'axios';

export const getRobotsTxt = async (domain) => {
  const response = await axios.get(`https://${domain}/robots.txt`);
  return response.data;
};

export const extractMainSitemap = (robotsTxt) => {
  const sitemapLine = robotsTxt.split('\n').find(line => line.startsWith('Sitemap:'));
  return sitemapLine ? sitemapLine.split(': ')[1].trim() : null;
};