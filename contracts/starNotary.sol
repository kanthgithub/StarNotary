pragma solidity ^0.4.24;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721.sol';

contract StarNotary is ERC721 {


    string public constant name = "SE7EN";
    string public constant symbol = "SVEN";


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

    function exchangeStars(uint256 token1, uint256 token2, address starOwner2) public {
        
        address currentOwner = this.ownerOf(token1);
        address newOwner = starOwner2;

        require(currentOwner != newOwner);

        _removeTokenFrom(currentOwner, token1);
        _addTokenTo(newOwner, token1);

        _removeTokenFrom(newOwner, token2);
        _addTokenTo(currentOwner, token2);

    }

    function transferStar(address newStarOwner, uint256 tokenId) public {
        address currentOwner = this.ownerOf(tokenId);
        address newOwner = newStarOwner;
        require(currentOwner != newOwner);

        _removeTokenFrom(currentOwner, tokenId);
        _addTokenTo(newOwner, tokenId);
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

