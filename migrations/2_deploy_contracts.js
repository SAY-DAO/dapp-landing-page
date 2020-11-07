var Nakama = artifacts.require("Nakama.sol");

module.exports = function(deployer) {
  deployer.deploy(Nakama);
};
