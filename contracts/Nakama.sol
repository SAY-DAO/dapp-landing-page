// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Nakama is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address payable public  SAY ;
    mapping(string => bool) _doneNeeds;
    address[] _donors;

    constructor() public ERC721("Nakama", "NAK")  {
        SAY = msg.sender;
    }

    function getDonors()  public  view returns( address [] memory ) {
        return _donors;
    }

    function transferAmount() public payable{
        SAY.transfer(msg.value);
    }

    function awardItem(address _donor, string memory _tokenURI) public payable returns (uint256) {
        require(!_doneNeeds[_tokenURI]);
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
//        transfer the money to SAY
        transferAmount();
//        Mints tokenId and transfers it to to.
        _safeMint(_donor, newItemId);

//        Sets _tokenURI as the tokenURI of tokenId.
        _setTokenURI(newItemId, _tokenURI);
//        One token per need
        _doneNeeds[_tokenURI] = true;
        _donors.push(_donor);

        return newItemId;
    }
}