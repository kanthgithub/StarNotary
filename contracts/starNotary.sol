pragma solidity ^0.4.24;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721.sol';

contract StarNotary is ERC721 {


    string public constant name = "SE7EN";
    string public constant symbol = "SVEN";
    uint public INITIAL_SUPPLY = 10000;


    struct Coordinates {
        string ra;
        string dec;
        string mag;
    }

    struct Star { 
        string name;
        string story;
        Coordinates coordinates;
    }

    mapping(uint256 => Star) public tokenIdToStarInfo; 
    mapping(uint256 => uint256) public starsForSale;
    mapping(bytes32 => bool) public starHashMap;


    function createStar(string name, string story,  string ra, string dec, string mag, uint256 tokenId) public {
        //check if tokenId already exists
        require(keccak256(abi.encodePacked(tokenIdToStarInfo[tokenId].name)) == keccak256(""));

        //check input 
        require(keccak256(abi.encodePacked(ra)) != keccak256(""));
        require(keccak256(abi.encodePacked(dec)) != keccak256(""));
        require(keccak256(abi.encodePacked(mag)) != keccak256(""));
        require(tokenId != 0);
        require(!checkIfStarExist(ra, dec, mag));

        Coordinates memory newCoordinates = Coordinates(ra, dec, mag);
        Star memory newStar = Star(name, story, newCoordinates);

        tokenIdToStarInfo[tokenId] = newStar;

        bytes32 hash = generateStarHash(ra, dec, mag);
        starHashMap[hash] = true;

        _mint(msg.sender, tokenId);
    }

    function putStarUpForSale(uint256 tokenId, uint256 price) public { 
        require(this.ownerOf(tokenId) == msg.sender);

        starsForSale[tokenId] = price;
    }

    function exchangeStars(uint256 token1, uint256 token2, address starOwner2) public {
        require(this.ownerOf(token1) == msg.sender);

        _removeTokenFrom(msg.sender, token1);
        _addTokenTo(starOwner2, token1);

        _removeTokenFrom(starOwner2, token2);
        _addTokenTo(msg.sender, token2);
    }

    function buyStar(uint256 tokenId) public payable { 
        require(starsForSale[tokenId] > 0);
        
        uint256 starCost = starsForSale[tokenId];
        address starOwner = this.ownerOf(tokenId);
        require(msg.value >= starCost);

        _removeTokenFrom(starOwner, tokenId);
        _addTokenTo(msg.sender, tokenId);
        
        starOwner.transfer(starCost);

        if (msg.value > starCost) { 
            msg.sender.transfer(msg.value - starCost);
        }
    }

    function getOwnerOf(uint256 tokenId) public view returns(address owner){
        return this.ownerOf(tokenId);
    }

    function checkIfStarExist(string ra, string dec, string mag) public view returns(bool) {
        return starHashMap[generateStarHash(ra, dec, mag)];
    }

    function generateStarHash(string ra, string dec, string mag) private pure returns(bytes32) {
        return keccak256(abi.encodePacked(ra, dec, mag));
    }

    function tokenIdToStarInfo(uint256 tokenId) public view returns(string, string, string, string, string) {
        return (tokenIdToStarInfo[tokenId].name,
         tokenIdToStarInfo[tokenId].story,
        tokenIdToStarInfo[tokenId].coordinates.ra,
        tokenIdToStarInfo[tokenId].coordinates.dec,
        tokenIdToStarInfo[tokenId].coordinates.mag);
    }

    function mint(uint256 tokenId) public {
        super._mint(msg.sender, tokenId);
    }

}

