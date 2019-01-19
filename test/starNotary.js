//import 'babel-polyfill';
const StarNotary = artifacts.require('./StarNotary.sol')

contract('StarNotary', accounts => {

const name = "SE7EN";
const symbol = "SVEN"

const starName = 'Blue Star'
const story = 'Blue star is not Green Star'
const ra = '032.155'
const dec = '121.874'
const mag = '245.978'

const starName2 = 'Green Star'
const story2 = 'Green Star is not Blue Star'
const ra2 = "48.155"
const dec2 = '98.874'
const mag2 = '112.245'

const token1 = 101;
const token2 = 202;

let defaultAccount = accounts[0];
let account1 = accounts[1];
let account2 = accounts[2];

  beforeEach(async() => { 
    this.contract = await StarNotary.new({from: defaultAccount})
  })

  it('The token name and token symbol are added properly.', async () => {

    expect(await this.contract.symbol()).to.equal(symbol);
    expect(await this.contract.name()).to.equal(name);
  })
  
  it('2 users can exchange their stars', async() =>  {

      await this.contract.createStar(starName, story, ra, dec, mag, token1, {from: account1});

      await this.contract.createStar(starName2, story2, ra2, dec2, mag2, token2, {from: account2});

      await this.contract.approve(account1, token2, {from:account2});

      await this.contract.exchangeStars(token1, token2, account2, {from: account1});

      assert.equal(await this.contract.ownerOf.call(token1), account2);
      assert.equal(await this.contract.ownerOf.call(token2), account1);
    });


    it('Stars Tokens can be transferred from one address to another', async() =>{

      await this.contract.createStar(starName, story, ra, dec, mag, token1, {from:account1});

      await this.contract.transferStar(account2, token1, {from:account1});

      assert.equal(await this.contract.ownerOf.call(token1), account2);
    });

  });
