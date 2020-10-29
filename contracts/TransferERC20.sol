// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract TransferERC20 {
    address payable public  owner ;
    address[] public donors;

    constructor () public {
        owner = msg.sender;
    }


    function awardItem(uint needEthCost) payable public{
        require(msg.value > needEthCost );
        donors.push(msg.sender);
        address payable myAccount = 0xdD870fA1b7C4700F2BD7f44238821C26f7392148;
        myAccount.transfer(address(this).balance);
    }
}