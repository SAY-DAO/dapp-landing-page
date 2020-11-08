// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Nakama is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
//    every donor has an address, a newTokenId and multiple done needs
    struct Donor {
        uint256 newTokenId;
        address account;
        uint256 donation;
        mapping(string => bool) doneNeeds;
    }
    address payable public  SAY ;
    mapping(address => Donor) donors;
//    "require" needs to be mapped to a bool
    mapping(address => bool) allDonors;
    mapping(string => bool) allDoneNeeds;
    uint256 numDonors;
    uint256 numDoneNeeds;

    constructor() public ERC721("Nakama", "NAK")  {
        SAY = msg.sender;
    }

    function newDonor(uint256 newTokenId , address account) private returns (uint donorID) {
        donorID = numDonors++;
        // We cannot use "donors[account] = Donor(newTokenId, account, 0)"
        Donor storage d = donors[account];
        d.newTokenId = newTokenId;
        d.account = account;
        allDonors[account] = true;
    }

    function completedNeed (address account, string memory need) private {
        Donor storage d = donors[account];
        allDoneNeeds[need] = true;
        d.doneNeeds[need] = true;
        numDoneNeeds++;

        d.donation += msg.value;
    }

    function transferAmount(address account, string memory need) public payable{
        require(msg.value > 0.0001 ether);
        require(!allDoneNeeds[need]);
        require(allDonors[account]);
        completedNeed(account, need);
        SAY.transfer(msg.value);
    }

    function awardToken(address account, string memory need) payable public returns (uint256) {
        //  to avoid creating newTokenId with 0 value
        require(msg.value > 0.0001 ether);
        require(!allDoneNeeds[need]);
        require(!allDonors[account]);
        _tokenIds.increment();
        //  if address already has a _tokenId do not mint

        uint256 newTokenId = _tokenIds.current();
        //  Mints tokenId and transfers it to to.
        _safeMint(account, newTokenId);
        //  Sets _tokenURI as a unique id.
        _setTokenURI(newTokenId, need);
        //  stores the donor
        newDonor(newTokenId, account);
        completedNeed(account, need);
        //  transfer the money to SAY
        SAY.transfer(msg.value);
    return newTokenId;
    }
}