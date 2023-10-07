import { expect } from "chai";
import { ethers } from "hardhat";
import { YourContract } from "../typechain-types";
import { Address } from "hardhat-deploy/types";

describe("YourContract", function () {
  // We define a fixture to reuse the same setup in every test.

  let yourContract: YourContract;
  let ownerAddress: Address;
  before(async () => {
    const [owner] = await ethers.getSigners();
    ownerAddress = owner.address;
    const yourContractFactory = await ethers.getContractFactory("YourContract");
    yourContract = (await yourContractFactory.deploy(owner.address)) as YourContract;
    await yourContract.deployed();
  });

  describe("Deployment", function () {
    it("Should allow setting a new message", async function () {
      const newGreeting = "Learn Scaffold-ETH 2! :)";

      await yourContract.payDerrama("hola", ownerAddress, 23);
      expect(await yourContract.pagoDerramas(ownerAddress, "hola")).to.equal(newGreeting);
    });
  });
});
