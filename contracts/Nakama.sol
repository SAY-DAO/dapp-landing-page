// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Nakama is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(string => bool) _doneNeeds;
    address [] donors;

    constructor() public ERC721("Nakama", "NAK") {}

    function awardItem(address _donor, string memory _tokenURI) public returns (uint256) {
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

    function getDonors()  public  view returns( address [] memory ) {
    return donors;
}

}