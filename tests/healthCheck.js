Web3 = require('web3')

if (process.argv[3] === 'turbina') {
  web3 = new Web3(new Web3.providers.HttpProvider('http://146.193.41.153:8545'))
} else {
  web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
}
// web3 = new Web3(new Web3.providers.HttpProvider('http://146.193.41.153:8545'))
var ipfsAPI = require('ipfs-api')
var ipfs = ipfsAPI('/ip4/127.0.0.1/tcp/5001')

console.log('- Eth on:\t' + web3.eth.accounts[0])
var account = web3.eth.accounts[0]
console.log('- Eth acc:\t' + web3.personal.unlockAccount(account, process.argv[2], 600))

ipfs.id(function (err, identity) {
  if (err) {
    throw err
  }
  console.log('- IPFS:\t' + identity.id)
})
