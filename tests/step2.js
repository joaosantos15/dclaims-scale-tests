var Web3 = require('web3')
var dataFileGenerator = require('./makeData.js')
var fs = require('fs')

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider)
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider('http://146.193.41.153:8545'))
}

var content = fs.readFileSync(process.argv[2])
var transactionData = JSON.parse(content)

getTransactionData(transactionData)

dataFileGenerator.saveData('all', transactionData)

dataFileGenerator.generate(transactionData, 2)

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
