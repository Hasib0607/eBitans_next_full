/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'http://moon.localhost:3000/', // Replace with your website's URL
    generateRobotsTxt: true, // Generates robots.txt file along with sitemap
    sitemapSize: 5000, // Optional: Limit number of URLs per sitemap file
    changefreq: 'daily', // Optional: Update frequency of pages
    priority: 0.7, // Optional: Default priority of pages
  };
  