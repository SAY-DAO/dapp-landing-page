// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Nakama is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address payable public  SAY ;
    mapping(string => bool) public _doneNeeds;
    mapping(address => bool) public _donors;

    constructor() public ERC721("Nakama", "NAK")  {
        SAY = msg.sender;
    }

    function transferAmount() public payable{
        SAY.transfer(msg.value);
    }

    function awardItem(address _donor, string memory _tokenURI) public payable returns (uint256) {
//      to avoid creating NAK with 0 value
//        require(msg.value > 0.0001 ether);
        require(!_doneNeeds[_tokenURI]);
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
//      transfer the money to SAY
        transferAmount();
//      if address already has a NAK transfer the amount but do not mint
        require(!_donors[_donor]);
//      Mints tokenId and transfers it to to.
        _safeMint(_donor, newItemId);

//      Sets _tokenURI as the tokenURI of tokenId.
        _setTokenURI(newItemId, _tokenURI);
//      One token per need
        _doneNeeds[_tokenURI] = true;
        _donors[_donor] = true;

        return newItemId;
    }
}