const scrape = require('website-scraper').default;

const options = {
    urls: ['https://solpyagent.xyz/'],
    directory: './site',
    recursive: true,
    maxDepth: 2,
    ignoreErrors: true,
};

scrape(options).then((result) => {
    console.log("Scraping completed!");
}).catch((err) => {
    console.error("Scraping failed", err);
});
