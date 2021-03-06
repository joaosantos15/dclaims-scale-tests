var Storage = require('./storage.js')

var exports = module.exports

/**
* Initializes Hypercerts-Core. It connects to the IPFS node and to Ethereum
* @param {number} type 1 for starting a testnode with testrpc or 2 for connecting to an existing node
* @returns {Object} Instance of Ethereum smart-contract
*/

exports.init = function (type) {
  return new Promise(function (resolve, reject) {
    Storage.init(type).then(resolve)
  })
}

/**
* Issues a Claim in Hypercerts
* @param {string} claimIndex The key used to index the Claim
* @param {object} newClaim hypercerts-news-claims SingleClaim object
* @returns {Array} [claimIndex,newClaim]
*/
exports.issue = function (nkey, newClaim) {
  return new Promise(function (resolve, reject) {
    Storage.addItem(nkey, newClaim).then(resolve)
  })
}

/**
* Returns Claims from that index
* @param {string} claimIndex Value used to index the claim
* @return {Array} Array of hypercerts-news-claims SingleClaim objects
*/

exports.getClaimsByIndex = function (claimIndex) {
  return new Promise(function (fulfill, reject) {
    Storage.getClaimsListFromIpfs(claimIndex).then(value => {
      var claimsJSON = {}
      claimsJSON.claimsList = value
      stopWatch.mark('core-get-all-claims-eth-and-ipfs-stop' + claimIndex)
      stopWatch.mark('core-get-all-claims-from-ipfs-stop-' + claimIndex)
      stopWatch.measure('ts-' + new Date().getTime().toString() + 'core-get-all-claims-eth-and-ipfs-', 'core-get-all-claims-eth-and-ipfs-start' + claimIndex, 'core-get-all-claims-eth-and-ipfs-stop' + claimIndex)
      stopWatch.measure('ts-' + new Date().getTime().toString() + 'core-get-all-claims-from-ipfs', 'core-get-all-claims-from-ipfs-start-' + claimIndex, 'core-get-all-claims-from-ipfs-stop-' + claimIndex)
      fulfill(claimsJSON)
    })
  })
}

/**
* Returns the number of Claims indexed by that claimIndex
* @param {string} claimIndex Value used to index the claim
* @return {number} The count
*/
exports.getClaimsCountsByIndex = function (claimIndex) {
  return new Promise(function (resolve, reject) {
    Storage.getClaimsCount(claimIndex).then(value => resolve(value.toString()))
  })
}

/**
* Returns the Ethereum address of the active account.
* @return {string} Ethereum address
*/
exports.getUserId = function () {
  return new Promise(function (resolve, reject) {
    Storage.getUserId().then(resolve)
  })
}

exports.getClaimsCountsJSONByUrl = exports.getClaimsCountsByIndex
exports.getClaimsJSONByUrl = exports.getClaimsByIndex
exports.handleVerification = exports.issue
