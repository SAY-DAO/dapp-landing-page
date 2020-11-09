const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");


module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    // truffle migrate --network rinkeby
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(
          "sweet lucky guitar walk hold fitness pioneer above because coast butter arctic",
          "https://rinkeby.infura.io/v3/187f0c9471ef426a84f48d4be7f81042"
        );
      },
      network_id: "4",
    },

    live: {
      provider: function () {
        return new HDWalletProvider(
          "",
          "https://mainnet.infura.io/v3/187f0c9471ef426a84f48d4be7f81042"
        );
      },
      network_id: "1",
      networkCheckTimeout: 20000,
      // timeoutBlocks: 100,
      gasPrice: 18000000000,
      gas: 4000000,
    },

    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*", // match any network
      websockets: true,
    },
    // ganache: {
    //   host: "127.0.0.1",     // Localhost (default: none)
    //   port: 7545,            // Standard Ethereum port (default: none)
    //   network_id: "*",       // Any network (default: none)
    // },
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "^0.6.2",
      // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //   optimizer: {
      //     enabled: false,
      //     runs: 200
      //   },
      //  evmVersion: "byzantium"
      // }
      // }
    },
  },
};
