# ERC721 Star Notarization Tokens

An ERC721 Non-fungible token to claim ownership of the stars in the sky

# Implementations in this project.

Add Smart Contract Functions: 

- Add a name and a symbol to the starNotary tokens.
- Add a function ```js lookUptokenIdToStarInfo ```, that looks up the stars using the Token ID, and then returns the name of the star.
- Add a function called ```js exchangeStars ```, so 2 users can exchange their star tokens. Do not worry about the price, just write code to exchange stars between users.
- Write a function to Transfer a Star. The function should transfer a star from the address of the caller. The function should accept 2 arguments, the address to transfer the star to, and the token ID of the star.

Add supporting Unit Tests:

- The token name and token symbol are added properly.
- 2 users can exchange their stars.
- Stars Tokens can be transferred from one address to another.

Deploy your Contract to Rinkeby:

- truffle.config file should have settings to deploy the contract to the Rinkeby Public Network.
- Infura should be used in the truffle.config file for deployment to Rinkeby.

Modify the front end of the DAPP:
- Create and functions to create new Star and Look up Star information with Star ID.

# Tech & Dependencies

* [Node.js] - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
* [Truffle] - The most popular blockchain development suite.
* [OpenZeppelin] - OpenZeppelin is a library for secure smart contract development.
* [Truffle HD Wallet] - HD Wallet-enabled Web3 provider. 
* [Infura] - Your access to the Ethereum Network.
* [Metamask] - Brings Ethereum to your browser.

### Installation

Notary Blockchain requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies and start the server.

```sh
$ cd StarNotary
$ npm install
$ truffle develop
$ truffle compile
$ truffle test
$ truffle migrate
$ npm run dev
```
The web app will be deployed to ```http://localhost:8080```

Download and install [Metamask] on Google Chrome browser to interact with contract.

Ensure to add custom RPC to Metamask at ```http://127.0.0.1:9545``` to connect with local ganache blockchain.

Preview of the Web App:

![StarNotary Webapp](https://i.imgur.com/Io82oFz.png/)

Now use Metamask to interact with the WebApp

Now to register your stars please visit [Skymap](https://in-the-sky.org/skymap.php). Find your favorite star and double click to view its co-ordinates.

#### Project Information:

 - ERC-721 Token Name: SE7EN
 - ERC-721 Token Symbol: SVEN
 - Token Address on the rinkeby Network: 0x832bBB9E3d4615DADAf5D434a04C7A6C3A2DA169


   [Truffle]: <https://github.com/trufflesuite/truffle>
   [OpenZeppelin]: <https://github.com/OpenZeppelin/openzeppelin-solidity>
   [Truffle HD Wallet]: <https://github.com/trufflesuite/truffle-hdwallet-provider>
   [Infura]: <https://infura.io/>
   [Metamask]: <https://metamask.io/>
   [node.js]: <http://nodejs.org>


