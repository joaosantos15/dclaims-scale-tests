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
  CONTRACT_ADDRESS = '0x839d642c4047ab336a4bd6809af916c6e202bff6'
} else {
  CONTRACT_ADDRESS = process.argv[2]
}

if (process.argv[3] === undefined) {
  RPC_ADDRESS = 'http://146.193.41.153:8545'
} else {
  RPC_ADDRESS = process.argv[3]
}

let hypercertsSetup =
  {
    initType: 2,
    ethereumRPC: 'http://localhost:8545',
    contractAddress: CONTRACT_ADDRESS // rinkeby
  }

let articlesList = articleIdsList.list
Hypercerts.init(hypercertsSetup).then(value => {
  for (let i = 0; i < articlesList.length; i++) {
    stopWatch.mark('get-claims-count-start-' + i)
    Hypercerts.getClaimsByIndex(articlesList[i]).then(value => {
      stopWatch.mark('get-claims-count-stop-' + i)
      stopWatch.measure('get-claims-count-' + i, 'get-claims-count-start-' + i, 'get-claims-count-stop-' + i)
    })
  }
})

function sendValues (value) {
  return new Promise(function (resolve, reject) {
    var data = null
    var xhr = new XMLHttpRequest()
    xhr.withCredentials = true

    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === 4) {
        console.log(this.responseText)
        resolve(this.responseText)
      }
    })

    xhr.open('GET', 'http://localhost:3000/?a=' + value)
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

setTimeout(phoneHome, 10 * 1000)
