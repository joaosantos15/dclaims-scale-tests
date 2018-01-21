const Hypercerts = require('hypercerts-core')
const HypercertsNewsClaims = require('hypercerts-news-claims')
var Web3 = require('web3')
var sleep = require('sleep')
var claimsGenerator = require('./randomClaimsGenerator.js')
var dataFileGenerator = require('./makeData.js')

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider)
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
}

let qeue = []

let NUMBER = 5
let firstBlock = 0

let hypercertsSetup =
  {
    initType: 1
  }

Hypercerts.init(hypercertsSetup).then(value => {
  firstBlock = web3.eth.getBlock('latest').number

  let promises = []
  for (let i = 0; i < NUMBER; i++) {
    let thisClaim = claimsGenerator.generateOne()
    let articleId = thisClaim.claim.id
    promises.push(Hypercerts.handleVerification(articleId, thisClaim))
    sleep.msleep(500)
  }
  Promise.all(promises).then(values => {
    for (let i = 0; i < values.length; i++) {
      qeue.push({id: i, txid: values[i], date: new Date().getTime() / 1000 })
    }

    sleep.sleep(2)
    lastBlock = web3.eth.getBlock('latest').number

    console.log('First ' + firstBlock)
    console.log('Last ' + lastBlock)
    getTransactionData(qeue)

    dataFileGenerator.generate(qeue, 2)
  })
})

function getTransactionData (myTransactions) {
  for (let i = 0; i < myTransactions.length; i++) {
    let currTx = web3.eth.getTransaction(myTransactions[i].txid)

    let minedBlockNumber = currTx.blockNumber
    let minedTime = web3.eth.getBlock(minedBlockNumber).timestamp
    currTx.minedTimestamp = minedTime
    myTransactions[i].transactionData = currTx
    myTransactions[i].miningElapsedTime = myTransactions[i].transactionData.minedTimestamp - myTransactions[i].date
    console.log(i + ' : ' + myTransactions[i].miningElapsedTime)
  }
}
/*
function getBlocks (first, last) {
  let blocks = []
  for (let i = first; i <= last; i++) {
    blocks.push(web3.eth.getBlock(i))
  }

  return blocks
}

function getTransactionsFromBlocks (blocks) {
  let transactions = []

  for (let i = 0; i < blocks.length; i++) {
    transactions = transactions.concat(blocks[i].transactions)
  }

  return transactions
}
*/
