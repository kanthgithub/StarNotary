// Import the page's CSS. Webpack will know what to do with it.
import '../css/main.css'
import '../css/utils.css'
import '../css/animate.css'
import '../css/hotsnackbar.css'
import '../scripts/hotsnackbar'

// Import libraries we need.
import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'

const hotsnackbar = require('./hotsnackbar');

// Import our contract artifacts and turn them into usable abstractions.
import StarNotaryArtifact from '../../build/contracts/StarNotary.json'

// StarNotary is our usable abstraction, which we'll use through the code below.
const StarNotary = contract(StarNotaryArtifact)

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;
var star;


const App = {
  start: function () {
    const self = this

    StarNotary.setProvider(web3.currentProvider);
    
    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function (err, accs) {
      if (err != null) {
        alert('There was an error fetching your accounts.')
        return
      }

      if (accs.length === 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.")
        return
      }

      accounts = accs
      account = accounts[0]

    })
  },

  setStatus: function (message) {
    const status = document.getElementById('status')
    status.innerHTML = message
  },

  createStar : async() => {
    const name = "Star Name:" + document.getElementById("star-name").value
    const story = "Story: " + document.getElementById("story").value
    const ra = "Right Ascension: " + document.getElementById("right-ascension").value
    const dec = "Declination: " + document.getElementById("declination").value
    const mag = "Magnitude: " + document.getElementById("magnitude").value
    const tokenId = document.getElementById("token-id").value

    StarNotary.deployed().then(function(instance) {
      star = instance;
      return star.createStar(name, story, ra, dec, mag, tokenId, {from: account, gas:4000000});
    }).then(function(error, result) {
      if (!error){
        hotsnackbar(false, "txHash:" + result + ", transaction pending");
        let starClaimedEvent = starNotary.Transfer()
        starClaimedEvent.watch(function(error, result) {
            if (!error) {
                hotsnackbar(false, 'transaction complete!' + result);
            } else {
                hotsnackbar(false, 'watching for star claimed event is failing' + result);
            }
        })
    }
    }).catch(function(e) {
      console.log(e);
      hotsnackbar(false, 'Error sending coin; see log.');
    });
  },

  getStarInfo : async() => {
    const tokenId = document.getElementById("cliamed-token-id").value

    StarNotary.deployed().then(function(instance){
      star = instance;
      return star.tokenIdToStarInfo.call(tokenId, {from:account}); 
    }).then(function(value){
        var formatString = value.valueOf().toString();
        formatString = formatString.replace(/,/g, "\n");
        document.getElementById("star-info").value = formatString;
        hotsnackbar(false, 'Star Information Updated!');
    }).catch(function (e){
      console.log(e)
    });
  },

  createToken : async () => {
    StarNotary.deployed().then(function(instance){
      star = instance;
      return  await star.mintUniqueTokenTo(account, 'se7en', 'SEVN', {from: accounts[0]});
    }).then(function(error, result){
      if(error) {
        hotsnackbar(false, 'Oops! Token cannot be created!');
      }
    });   
  }

}


window.App = App

window.addEventListener('load', async() => {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (window.ethereum) {
    window.web3 = new Web3(ethereum);
    try {
        // Request account access if needed
        await ethereum.enable();
    } catch (error) {
        // User denied account access...
    }
  } else if (window.web3) {
      window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn(
      'No web3 detected. Falling back to http://127.0.0.1:9545.' +
      ' You should remove this fallback when you deploy live, as it\'s inherently insecure.' +
      ' Consider switching to Metamask for development.' +
      ' More info here: http://truffleframework.com/tutorials/truffle-and-metamask'
    )
    // https://rinkeby.infura.io/v3/d530853c676f4b0e9c0b97d4fdfc8324
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:9545'))
  }

  App.start()
})
