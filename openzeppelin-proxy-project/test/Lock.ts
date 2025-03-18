import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre, { ethers, ignition } from "hardhat";
import lockModule from "../ignition/modules/Lock";
import upgradeModule from "../ignition/modules/Upgrade";
import lockV2Module from "../ignition/modules/LockV2";

describe("Lock", function () {

  describe("Proxy Interaction", function () {
    it("Should be interactable via proxy", async function () {
      const { lock } = await ignition.deploy(lockModule);
      expect(await lock.unlockTime()).to.equal(1893456000);
    });
    it("Should be already initialized", async function () {
      const { lock } = await ignition.deploy(lockModule);
      expect(lock.initialize(0)).to.be.reverted;
    });
    it("Should upgrade", async function () {
      const [mainAccount, otherAccount] = await ethers.getSigners();
      const { lock } = await ignition.deploy(lockV2Module);
      expect(await lock.owner()).to.equal(mainAccount.address);
      await lock.changeOwner(otherAccount.address);
      expect(await lock.owner()).to.equal(otherAccount.address);
    })
  });
});
