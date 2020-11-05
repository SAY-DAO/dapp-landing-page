const Nakama = artifacts.require('Nakama')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const web3 = new Web3(ganache.provider)

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Nakama', (accounts) => {
        let contract

        before(async () => {
            // accounts = await web3.eth.getAccount
             nakama = await Nakama.deployed();

             tokenURIs = [
                 'https://sayapp.company/child/1/need/45',
                 'https://sayapp.company/child/56/need/6',
                 'https://sayapp.company/child/12/need/5',
                 'https://sayapp.company/child/13/need/15',
                 'https://sayapp.company/child/2/need/23',
                 'https://sayapp.company/child/2/need/23',
                 'https://sayapp.company/child/2/need/23'
                 ]
        });

        describe('deployment', async () => {

            it('deploys successfully', async () => {
                const address = nakama.address;
                assert.notEqual(address, 0x0);
                assert.notEqual(address, '');
                assert.notEqual(address, null);
                assert.notEqual(address, undefined);
                assert.ok(nakama.address)
            });

            it('has a name', async () => {
                const name = await nakama.name();
                assert.equal(name, 'Nakama');
            });

            it('has a symbol', async () => {
                const symbol = await nakama.symbol();
                assert.equal(symbol, 'NAK');
            });
        })

        describe('minting', async () => {
            // it('does not allow 0 value to mint', async() => {
            //     const token = await nakama.awardItem(accounts[0], tokenURIs[0]).send({
            //         from: accounts[0],
            //         value: web3.utils.toWei('0', 'ether')
            //     }).should.be.rejected;
            //
            // });

            it('creates a new token for accounts[0]', async () => {
                const token = await nakama.awardItem(accounts[0], tokenURIs[0])
                const totalSupply = await nakama.totalSupply()
                assert.equal(totalSupply, 1);

                // const result = token.logs[0].args;
                // assert.equal(result.tokenId.toNumber(), 1, 'id is correct');
                // assert.equal(result.from, '0x0000000000000000000000000000000000000000', 'from is correct');
                // assert.equal(result.to, accounts[0], 'to is correct');
                //
                // // Failure - Same need should not be rewarded
                // await nakama.awardItem(accounts[0], tokenURIs[0]).should.be.rejected;
            });

        })

        describe('indexing', async () => {
            it('lists done needs', async() => {
            //    Mint 3 more tokens
                await nakama.awardItem(accounts[1], tokenURIs[1]);
                await nakama.awardItem(accounts[2], tokenURIs[2]);
                await nakama.awardItem(accounts[3], tokenURIs[3]);

                const totalSupply = await nakama.totalSupply();
                let tokenURI;
                let result = [];

                for (var i=1; i<=totalSupply; i++) {
                    tokenURI = await nakama.tokenURI(i);
                    result.push(tokenURI)
                }

                let expected = [tokenURIs[0], tokenURIs[1], tokenURIs[2], tokenURIs[3]];
                assert.equal(result.join(','), expected.join(','));
            });

            it('does not mint twice fo an address', async() => {
                await nakama.awardItem(accounts[3], tokenURIs[4]).should.be.rejected;
            })
        })
    }
)