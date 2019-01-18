pragma solidity ^0.4.24;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721.sol';

contract StarNotary is ERC721 {


    //string public constant name = "SE7EN";
    //string public constant symbol = "SVEN";
    //string public constant TokenID = "2409";


    struct Coordinates {
        string ra;
        string dec;
        string mag;
    }

    struct Star { 
        string starName;
        string story;
        Coordinates coordinates;
    }

    mapping(uint256 => Star) public tokenIdToStarInfo; 
    mapping(uint256 => uint256) public starsForSale;
    mapping(bytes32 => bool) public starHashMap;


    function createStar(string starName, string story,  string ra, string dec, string mag, uint256 tokenId) public {
        //check if tokenId already exists
        require(keccak256(abi.encodePacked(tokenIdToStarInfo[tokenId].starName)) == keccak256(""));

        //check input 
        require(keccak256(abi.encodePacked(ra)) != keccak256(""));
        require(keccak256(abi.encodePacked(dec)) != keccak256(""));
        require(keccak256(abi.encodePacked(mag)) != keccak256(""));
        require(tokenId != 0);
        require(!checkIfStarExist(ra, dec, mag));

        Coordinates memory newCoordinates = Coordinates(ra, dec, mag);
        Star memory newStar = Star(starName, story, newCoordinates);

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
        address currentOwner = this.ownerOf(token1);
        address newOwner = starOwner2;

        require(currentOwner != newOwner);

        transferFrom(currentOwner, newOwner, token1);

        approve(currentOwner, token2);

        transferFrom(newOwner, currentOwner, token2);

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

    function transferStar(address transferTo, uint256 tokenId) public payable {
        require(this.ownerOf(tokenId) == msg.sender);
        
        _removeTokenFrom(msg.sender, tokenId);
        _addTokenTo(transferTo, tokenId);
    }

    function checkIfStarExist(string ra, string dec, string mag) public view returns(bool) {
        return starHashMap[generateStarHash(ra, dec, mag)];
    }

    function generateStarHash(string ra, string dec, string mag) private pure returns(bytes32) {
        return keccak256(abi.encodePacked(ra, dec, mag));
    }

    function tokenIdToStarInfo(uint256 tokenId) public view returns(string, string, string, string, string) {
        return (tokenIdToStarInfo[tokenId].starName,
         tokenIdToStarInfo[tokenId].story,
        tokenIdToStarInfo[tokenId].coordinates.ra,
        tokenIdToStarInfo[tokenId].coordinates.dec,
        tokenIdToStarInfo[tokenId].coordinates.mag);
    }

    function mint(uint256 tokenId) public {
        super._mint(msg.sender, tokenId);
    }

}

