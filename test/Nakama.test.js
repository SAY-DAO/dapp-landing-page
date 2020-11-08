const Nakama = artifacts.require("Nakama");

require("chai").use(require("chai-as-promised")).should();

contract("Nakama", () => {
  let nakama;

  before(async () => {
    // nakama = await Nakama.deployed();
    accounts = await web3.eth.getAccounts();

    // create a separate instance of the contract on the ganache network
    nakama = await new web3.eth.Contract(Nakama.abi)
      .deploy({ data: Nakama.bytecode })
      .send({ from: accounts[0], gas: 6721975, gasPrice: 20000000000 });

    needs = [
      "/child/1/need/45",
      "/child/56/need/6",
      "/child/12/need/5",
      "/child/13/need/15",
      "/child/2/need/233",
      "/child/32/need/231",
      "/child/21/need/243",
      "/child/2/need/43",
      "/child/8/need/83",
      "/child/5/need/3",
    ];
  });

  describe("deployment", async () => {
    it("deploys successfully", async () => {
      const address = nakama.options.address;

      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
      assert.ok(address);
    });
    it("has a name", async () => {
      const name = await nakama.methods.name().call();
      assert.equal(name, "Nakama");
    });

    it("has a symbol", async () => {
      const symbol = await nakama.methods.symbol().call();
      assert.equal(symbol, "NAK");
    });
    it("has SAY as account[0]", async () => {
      assert.equal(await nakama.methods.SAY().call(), accounts[0]);
    });
  });

  describe("minting", async () => {
    it("does NOT allow 0 value to mint", async () => {
      await nakama.methods.awardToken(accounts[0], needs[0]).send({
        from: accounts[0],
        value: await web3.utils.toWei("0.00009", "ether"),
        gas: 6721975,
        gasPrice: 20000000000,
      }).should.be.rejected;
    });

    it("creates a new token for the account and transfer it", async () => {
      const token = await nakama.methods
        .awardToken(accounts[1], needs[1])
        .send({
          from: accounts[1],
          value: web3.utils.toWei("0.1", "ether"),
          gas: 6721975,
          gasPrice: 20000000000,
        });
      const totalSupply = await nakama.methods.totalSupply().call();
      assert.equal(totalSupply, 1);

      const transfer = token.events.Transfer.returnValues;
      assert.equal(
        token.from.toUpperCase(),
        accounts[1].toUpperCase(),
        "calls awardToken from correct account"
      );
      assert.equal(
        transfer.from,
        "0x0000000000000000000000000000000000000000",
        "transfers from is correct"
      );
      assert.equal(
        transfer.to.toUpperCase(),
        accounts[1].toUpperCase(),
        "token is transfered"
      );
    });
    it("rejects minting for the same need twice", async () => {
      // Failure - Same need should not be rewarded
      await nakama.methods.awardToken(accounts[8], needs[1]).send({
        from: accounts[8],
        value: await web3.utils.toWei("0.2", "ether"),
        gas: 6721975,
        gasPrice: 20000000000,
      }).should.be.rejected;
    });
    it("does NOT mint twice for the same address", async () => {
      await nakama.methods.awardToken(accounts[1], needs[7]).send({
        from: accounts[1],
        value: web3.utils.toWei("0.1", "ether"),
        gas: 6721975,
        gasPrice: 20000000000,
      }).should.be.rejected;
    });
  });

  describe("indexing", async () => {
    it("lists done needs", async () => {
      //    Mint 3 more tokens
      await nakama.methods.awardToken(accounts[2], needs[2]).send({
        from: accounts[2],
        value: web3.utils.toWei("0.002", "ether"),
        gas: 6721975,
        gasPrice: 20000000000,
      });
      await nakama.methods.awardToken(accounts[3], needs[3]).send({
        from: accounts[3],
        value: web3.utils.toWei("0.002", "ether"),
        gas: 6721975,
        gasPrice: 20000000000,
      });
      await nakama.methods.awardToken(accounts[4], needs[4]).send({
        from: accounts[4],
        value: web3.utils.toWei("0.002", "ether"),
        gas: 6721975,
        gasPrice: 20000000000,
      });

      const totalSupply = await nakama.methods.totalSupply().call();
      let tokenURI;
      let result = [];

      for (var i = 1; i <= totalSupply; i++) {
        tokenURI = await nakama.methods.tokenURI(i).call();
        result.push(tokenURI);
      }

      let expected = [needs[1], needs[2], needs[3], needs[4]];
      assert.equal(
        result.join(","),
        expected.join(","),
        "correct token indexing"
      );
    });
  });
  describe("NAK holder transfers ETH", async () => {
    it("sends eth to SAY address", async () => {
      const SAY = await nakama.methods.SAY().call();
      const balanceBefore = await web3.eth.getBalance(SAY);
      const totalSupplyBefore = await nakama.methods.totalSupply().call();

      await nakama.methods.transferAmount(accounts[1], needs[9]).send({
        from: accounts[9],
        value: web3.utils.toWei("0.2", "ether"),
        gas: 6721975,
        gasPrice: 20000000000,
      });
      // already completed the need
      const balanceAfter = await web3.eth.getBalance(SAY);
      const totalSupplyAfter = await nakama.methods.totalSupply().call();
      assert.ok(
        balanceAfter - balanceBefore > 190000000000000000,
        "increases SAY balance"
      );
      assert.ok(
        totalSupplyAfter === totalSupplyBefore,
        "does NOT create a token but transfers ETH"
      );
    });
  });
});
