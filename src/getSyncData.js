const lastSync = require('./syncTemplate');

function getSyncData(fullData) {
  const syncData = { ...lastSync };
  syncData.shop_id = fullData.params.shop_id;
  const results = fullData.results;
  results.forEach((result) => {
    let newListing = Object.create(syncData.listings[0]);
    newListing.listing_id = result.listing_id;
    newListing.title = result.title;
    newListing.state_tsz = result.state_tsz;
    newListing.state = result.state;
    syncData.listings.push(newListing);
  });
  // remove the blank template object from the array
  syncData.listings.shift();
  return syncData;
}

module.exports = getSyncData;
