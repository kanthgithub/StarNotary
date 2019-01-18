//import 'babel-polyfill';
const StarNotary = artifacts.require('./StarNotary.sol')

contract('StarNotary', accounts => {

const name = "SE7EN";
const symbol = "SVEN"

const starName = 'Star power 103!'
const story = 'I love my wonderful star'
const ra = 'ra_032.155'
const dec = 'dec_121.874'
const mag = 'mag_245.978'
const starName2 = 'Star power 104!'

let defaultAccount = accounts[0];
let account1 = accounts[1];
let account2 = accounts[2];
let starPrice = web3.toWei(.01, "ether");

beforeEach(async() => { 
  this.contract = await StarNotary.new({from: defaultAccount})
})

/*it('The token name and token symbol are added properly', async () => {
   expect(await this.contract.symbol()).to.equal(symbol)
   expect(await this.contract.name()).to.equal(name)
  }); */
  
  describe('Exchange Stars', () =>  {
    let token1 = 101;
    let token2 = 202;

    it('User 1 creates Star', async() => {
      await this.contract.createStar(starName, story, ra, dec, mag, token1, {from: account1});
      assert.equal(await this.contract.ownerOf.call(token1), account1);
    });

    it('User 2 creates Star', async() => {
      await this.contract.createStar(starName2, story, ra, dec, mag, token2, {from: account2});
      assert.equal(await this.contract.ownerOf.call(token2), account2);
    });

    it('Users exchange Stars', async() => {
      await this.contract.exchangeStars(token1, token2, account2);
      assert.equal(await this.contract.ownerOf.call(token2), account2);
      console.log(await this.contract.ownerOf.call(token2));
    });

  });

  
   /* it('Stars Tokens can be transferred from one address to another', async () =>{
      let tokenId = 101;
  
      await instance.createStar(starName, story, ra, dec, mag, tokenId, {from: defaultAccount});
  
      await instance.exchangeStars(account1, tokenId, {from: defaultAccount});
  
      assert.equal(await instance.ownerOf.call(tokenId), account1);
    }); */
  
  });

  
  /*it('can Create a Star', async() => {
    let tokenId = 1;
    await instance.createStar('Awesome Star!', tokenId, {from: accounts[0]})
    assert.equal(await instance.tokenIdToStarInfo.call(tokenId), 'Awesome Star!')
  });

  it('lets user1 put up their star for sale', async() => {
    let user1 = accounts[1]
    let starId = 2;
    let starPrice = web3.toWei(.01, "ether")
    await instance.createStar('awesome star', starId, {from: user1})
    await instance.putStarUpForSale(starId, starPrice, {from: user1})
    assert.equal(await instance.starsForSale.call(starId), starPrice)
  });

  it('lets user1 get the funds after the sale', async() => {
    let user1 = accounts[1]
    let user2 = accounts[2]
    let starId = 3
    let starPrice = web3.toWei(.01, "ether")
    await instance.createStar('awesome star', starId, {from: user1})
    await instance.putStarUpForSale(starId, starPrice, {from: user1})
    let balanceOfUser1BeforeTransaction = web3.eth.getBalance(user1)
    await instance.buyStar(starId, {from: user2, value: starPrice})
    let balanceOfUser1AfterTransaction = web3.eth.getBalance(user1)
    assert.equal(balanceOfUser1BeforeTransaction.add(starPrice).toNumber(), balanceOfUser1AfterTransaction.toNumber());
  });

  it('lets user2 buy a star, if it is put up for sale', async() => {
    let user1 = accounts[1]
    let user2 = accounts[2]
    let starId = 4
    let starPrice = web3.toWei(.01, "ether")
    await instance.createStar('awesome star', starId, {from: user1})
    await instance.putStarUpForSale(starId, starPrice, {from: user1})
    let balanceOfUser1BeforeTransaction = web3.eth.getBalance(user2)
    await instance.buyStar(starId, {from: user2, value: starPrice});
    assert.equal(await instance.ownerOf.call(starId), user2);
  });

  it('lets user2 buy a star and decreases its balance in ether', async() => {
    let user1 = accounts[1]
    let user2 = accounts[2]
    let starId = 5
    let starPrice = web3.toWei(.01, "ether")
    await instance.createStar('awesome star', starId, {from: user1})
    await instance.putStarUpForSale(starId, starPrice, {from: user1})
    let balanceOfUser1BeforeTransaction = web3.eth.getBalance(user2)
    const balanceOfUser2BeforeTransaction = web3.eth.getBalance(user2)
    await instance.buyStar(starId, {from: user2, value: starPrice, gasPrice:0})
    const balanceAfterUser2BuysStar = web3.eth.getBalance(user2)
    assert.equal(balanceOfUser2BeforeTransaction.sub(balanceAfterUser2BuysStar), starPrice);
  }); */



  // Write Tests for:

// 1) The token name and token symbol are added properly.
// 2) 2 users can exchange their stars.
// 3) Stars Tokens can be transferred from one address to another.
