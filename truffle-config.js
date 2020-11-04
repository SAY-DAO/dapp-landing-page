const path = require("path");
const HDWalletProvider = require('truffle-hdwallet-provider')


module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache-cli, geth or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    //

    // Ganache-CLI
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(
            'sweet lucky guitar walk hold fitness pioneer above because coast butter arctic',
            'https://rinkeby.infura.io/v3/91804a85068e4116a4cafec2644c5158'
        );
      },
      network_id: '4',
    },

    develop: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },

  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "^0.6.2"
      // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  }
};
