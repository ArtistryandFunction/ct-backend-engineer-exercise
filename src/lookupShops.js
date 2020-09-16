const https = require('https');
const etsyConfig = require('./etsyConfig');

function lookupShops() {
  const apiKey = etsyConfig.apiKey;
  const options = {
    host: etsyConfig.host,
    path: `/v2/shops?api_key=${apiKey}`,
  }
  https.get(options, (res) => {
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => {
      rawData += chunk;
    });
    res.on('end', () => {
      const shopData = JSON.parse(rawData);
      console.log(shopData);
    });
  });
}

module.exports = lookupShops;

lookupShops();
