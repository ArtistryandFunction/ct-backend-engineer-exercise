const fs = require('fs');
const https = require('https');
const getSyncData = require('./getSyncData');
const etsyConfig = require('./etsyConfig');
const program = require('commander');

program
  .version(require('../package.json').version)
  .option('-s --shopID <required>', 'Shop ID')
  .parse(process.argv);

function syncShop() {
  const shop_id = program.shopID;
  const apiKey = etsyConfig.apiKey;
  const options = {
    host: etsyConfig.host,
    path: `/v2/shops/${shop_id}/listings/active?api_key=${apiKey}`,
  }
  https.get(options, (res) => {
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => {
      rawData += chunk;
    });
    res.on('end', () => {
      const etsyData = JSON.parse(rawData);
      const syncedPath = `src/syncedShops/${shop_id}_sync.json`;
      const syncedData = getSyncData(etsyData);
      if(fs.existsSync(syncedPath)) {
        fs.readFile(syncedPath, 'utf8', (readFileErr, previousSyncRaw) => {
          if (readFileErr) throw readFileErr;
          const previousSync = JSON.parse(previousSyncRaw);
          console.log(`Shop ID ${shop_id}`);
          if (JSON.stringify(syncedData) === JSON.stringify(previousSync)) {
            console.log('No Changes since last sync');
          } else {
            const newListings = syncedData.listings;
            const previousListings = previousSync.listings;
            newListings.forEach((newListing) => {
              if(!previousListings.includes(newListing.listing_id)) {
                console.log(`+ added listing ${newListing.listing_id} ${newListing.title}`);
              }
              if(previousListings.includes(newListing.listing_id)) {
                if(!JSON.stringify(previousListings).includes(JSON.stringify(newListing))) {
                  console.log(`listing ${newListing.listing_id} state changed to ${newListing.state}`);
                }
              }
            });
            previousListings.forEach((previousListing) => {
              if(!newListings.includes(previousListing.listing_id)) {
                console.log(`- removed listing ${previousListing.listing_id} ${previousListing.title}`);
              }
            });
          }
        });
      } else {
        fs.writeFile(syncedPath, JSON.stringify(syncedData), (writeFileErr) => {
          if (writeFileErr) throw writeFileErr;
        });
      }
    });
  });
}

module.exports = syncShop;

syncShop();
