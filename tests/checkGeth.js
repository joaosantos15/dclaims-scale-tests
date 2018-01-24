Web3 = require('web3')

web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

let peerCount = web3.net.peerCount

let latestBlock = web3.eth.getBlock('latest').number

console.log("Block: "+latestBlock+" PC: "+peerCount)

