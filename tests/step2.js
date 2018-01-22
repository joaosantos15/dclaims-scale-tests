var Web3 = require('web3')
var articleIdsList = require('./articlesList.js')
const Hypercerts = require('../hypercerts-core/src/hc-core.js') // testing
var stopWatch = require('timer-timer')
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

stopWatch.init()

var fs = require('fs')

global.collectedData = []

let RPC_ADDRESS
let CONTRACT_ADDRESS

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider)
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider('http://146.193.41.153:8545'))
}

if (process.argv[2] === undefined) {
  CONTRACT_ADDRESS = '0xa3c511b7958aac6dd2c8275bac60663a0968301c'
} else {
  CONTRACT_ADDRESS = process.argv[2]
}

if (process.argv[3] === undefined) {
  RPC_ADDRESS = 'http://146.193.41.153:8545'
} else {
  RPC_ADDRESS = process.argv[3]
}

let END_AT_MINUTE

if (process.argv[4] === undefined) {
  END_AT_MINUTE = 1
} else {
  END_AT_MINUTE = process.argv[4]
}

let QUERY_INTERVAL

if (process.argv[5] === undefined) {
  QUERY_INTERVAL = 20
} else {
  QUERY_INTERVAL = process.argv[5]
}

let hypercertsSetup =
  {
    initType: 2,
    ethereumRPC: 'http://localhost:8545',
    contractAddress: CONTRACT_ADDRESS // rinkeby
  }

let articlesList = articleIdsList.list
/*
Hypercerts.init(hypercertsSetup).then(value => {
  for (let i = 0; i < articlesList.length; i++) {
    stopWatch.mark('get-claims-count-start-' + i)
    Hypercerts.getClaimsByIndex(articlesList[i]).then(value => {
      stopWatch.mark('get-claims-count-stop-' + i)
      stopWatch.measure('get-claims-count-' + i, 'get-claims-count-start-' + i, 'get-claims-count-stop-' + i)
      console.log('val: ' + value)
    })
  }
})
*/

Hypercerts.init(hypercertsSetup).then(value => {
  setInterval(fetchClaimsFromArticle, QUERY_INTERVAL * 1000)
})

function fetchClaimsFromArticle () {
  return new Promise(function (resolve, reject) {
    console.log('fetching one...')
    let articleId = articlesList[Math.floor(Math.random() * articlesList.length)]
    stopWatch.mark('get-claims-count-start-' + articleId.substring(1, 5))
    Hypercerts.getClaimsByIndex(articleId).then(value => {
      stopWatch.mark('get-claims-count-stop-' + articleId.substring(1, 5))
      stopWatch.measure('ts-' + new Date().getTime().toString() + '-get-claims-count-' + articleId.substring(1, 5), 'get-claims-count-start-' + articleId.substring(1, 5), 'get-claims-count-stop-' + articleId.substring(1, 5))
      console.log('finished fetching...')
      resolve(value)
    })
  })
}

function sendValues (value) {
  return new Promise(function (resolve, reject) {
    var data = null
    var xhr = new XMLHttpRequest()
    xhr.withCredentials = true

    console.log(value)

    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === 4) {
        console.log(this.responseText)
        resolve(this.responseText)
      }
    })

    xhr.open('GET', 'http://turbina.gsd.inesc-id.pt:3000/?a=' + value)
    xhr.setRequestHeader('cache-control', 'no-cache')

    xhr.send(data)
    console.log('SENT!')
  })
}

function phoneHome () {
  let cena = stopWatch.dump()
  let b = JSON.stringify(cena)

  // console.log(b)
  sendValues(b).then(console.log)
}

setTimeout(phoneHome, END_AT_MINUTE * 60 * 1000)
