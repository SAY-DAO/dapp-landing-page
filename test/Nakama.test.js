const Nakama =artifacts.require('Nakama')

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Nakama', (accounts) => {
    let contract

    before(async () => {
        instance = await Nakama.deployed();
    });

    describe('deployment', async () => {

        it('deploys successfully', async () => {
            const address = instance.address;
            console.log(address);
            assert.notEqual(address, 0x0);
            assert.notEqual(address, '');
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
        });

        it('has a name', async () => {
            const name = await instance.name();
            assert.equal(name, 'Nakama');
        });

        it('has a symbol', async () => {
            const symbol = await instance.symbol();
            assert.equal(symbol, 'NAK');
        });
    })

}
)