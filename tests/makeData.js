var fs = require('fs')

var nonce = require('nonce')()

exports = module.exports

function write (values) {
  var logger = fs.createWriteStream('data/log' + nonce() + '.txt')
  for (let i = 0; i < values.length; i++) {
    let n1 = values[i][0]
    let n2 = values[i][1]
    logger.write(n1 + '\t' + n2 + '\n') // append string to your file
  }
  logger.end()
}

exports.generate = function (transactions, option) {
  let results = []

  for (let i = 0; i < transactions.length; i++) {
    let id = transactions[i].id
    let timeToMine = transactions[i].miningElapsedTime
    let gas = transactions[i].transactionData.gas
    let gasPrice = transactions[i].transactionData.gasPrice
    let currTransaction = {id: id, timeToMine: timeToMine, gas: gas, gasPrice: gasPrice}
    results.push(currTransaction)
  }

  if (option === 1) {
    write(make_ID_TIME(results))
  }

  if (option === 2) {
    write(make_TIME_GASPRICE(results))
  }
}

exports.saveData = function (prefix, data) {
  let jsonData = JSON.stringify(data)

  fs.writeFile('data/' + prefix + '-transactionData-' + nonce() + '.json', jsonData, 'utf8', function (err) {
    if (err) { return console.log(err) }
    console.log('Saved file')
  })
}

function make_ID_TIME (transactions) {
  let results = []
  for (let i = 0; i < transactions.length; i++) {
    let currTransactionData = [transactions[i].id, transactions[i].timeToMine]

    results.push(currTransactionData)
  }

  return results
}

function make_TIME_GASPRICE (transactions) {
  let results = []
  for (let i = 0; i < transactions.length; i++) {
    let currTransactionData = [transactions[i].timeToMine, transactions[i].gasPrice]

    results.push(currTransactionData)
  }

  return results
}
