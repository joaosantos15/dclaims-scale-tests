// const Hypercerts = require('hypercerts-core')
var fs = require('fs')
const Hypercerts = require('../hypercerts-core/src/hc-core.js') // testing
var Web3 = require('web3')
var claimsGenerator = require('./randomClaimsGenerator.js')
var articleIdsList = require('./articlesList.js')

var stopWatch = require('timer-timer')
stopWatch.init()

const NUMBER_OF_CLAIM = 20

let CONTRACT_ADDRESS

if (process.argv[2] === undefined) {
  CONTRACT_ADDRESS = '0xa3c511b7958aac6dd2c8275bac60663a0968301c'
} else {
  CONTRACT_ADDRESS = process.argv[2]
}

// http://146.193.41.153:8545
let RPC_ADDRESS

if (process.argv[3] === undefined) {
  RPC_ADDRESS = 'http://localhost:8545'
} else {
  RPC_ADDRESS = process.argv[3]
}

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider)
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider(RPC_ADDRESS))
}

let hypercertsSetup =
  {
    initType: 2,
    ethereumRPC: RPC_ADDRESS,
    contractAddress: CONTRACT_ADDRESS // rinkeby
  }

// "0xa17e3264437fda8bc6c92606dcc86bc0787f8fb09a2a53457d9256ef5d0e37b1"

var idList = articleIdsList.list

Hypercerts.init(hypercertsSetup).then(value => {
  for (let i = 0; i < NUMBER_OF_CLAIM; i++) {
    let thisClaim = claimsGenerator.generateOne()
    thisClaim.claim.id = idList[Math.floor(Math.random() * idList.length)]
    let articleId = thisClaim.claim.id
    Hypercerts.handleVerification(articleId, thisClaim).then(value2 => {
      console.log('Transaction: ' + value2)
    })
  }
})
