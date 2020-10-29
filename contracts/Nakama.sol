// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Nakama is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

//    address payable public say;
    mapping(string => bool) _doneNeeds;
    address [] donors;
    uint256 public needValue;

    constructor() public ERC721("Nakama", "NAK") {
        say = msg.sender;
    }

    function getDonors()  public  view returns( address [] memory ) {
        return donors;
    }


    function convert(uint256 needEthCost) payable public {
        uint256 amount = msg.value;
        uint256 newAmount = amount * 10**18;
        send(needEthCost, newAmount);
    }


    function send(uint256 needEthCost, uint newAmount) public payable {
        require(newAmount > needEthCost );
        donors.push(msg.sender);
        say.transfer(address(this).balance);
    }


    function awardItem(address _donor, string memory _tokenURI, uint256 needEthCost) public returns (uint256) {
        convert(needEthCost);
        require(!_doneNeeds[_tokenURI]);
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
//        Mints tokenId and transfers it to to.
        _safeMint(_donor, newItemId);
        donors.push(_donor);
//        Sets _tokenURI as the tokenURI of tokenId.
        _setTokenURI(newItemId, _tokenURI);
//        One token per need
        _doneNeeds[_tokenURI] = true;


        return newItemId;
    }
}