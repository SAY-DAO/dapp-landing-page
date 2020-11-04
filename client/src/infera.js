const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const {abi, evm} = require('./compile');
const bytecode = evm.bytecode.object

const provider = new HDWalletProvider(
    'sweet lucky guitar walk hold fitness pioneer above because coast butter arctic',
    'https://rinkeby.infura.io/v3/91804a85068e4116a4cafec2644c5158'
);
const web3 = new Web3(provider)

const deploy = async () => {
    const accounts = await web3.eth.getAccounts()
    console.log('Attempting to delpy', accounts[0])

    const results = await new web3.eth.Contract(abi)
        .deploy({data: bytecode})
        .send({from: accounts[0], gas: '1000000'})

    console.log(abi)
    console.log("Contract deployed to", results.options.address)
}
deploy()