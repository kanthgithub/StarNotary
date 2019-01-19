// Allows us to use ES6 in our migrations and tests.
require('babel-register')
var HDWalletProvider = require('truffle-hdwallet-provider');

const mnemonic = 'aim consider north pig logic siren sugar gas term try alcohol flower';
const infura = 'https://rinkeby.infura.io/v3/d530853c676f4b0e9c0b97d4fdfc8324'

// Edit truffle.config file should have settings to deploy the contract to the Rinkeby Public Network.
// Infura should be used in the truffle.config file for deployment to Rinkeby.

module.exports = {
  networks: {

    ganache: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '5777', // Match any network id,
      gas: 4612388
    },

    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, infura),
      network_id: 4,
      gas: 6700000,
      gasPrice : 10000000000
    }
  }
}
