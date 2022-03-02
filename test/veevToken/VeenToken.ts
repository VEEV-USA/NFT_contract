import { artifacts, ethers, waffle, upgrades } from "hardhat";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

import { VeevNFT__factory as VeevNFTFactory } from "../../src/types/factories/VeevNFT__factory";
import { Signers } from "../types";
import { expect } from "chai";
// import { shouldBehaveLikeGreeter } from "./Greeter.behavior";

describe("Veev Token Tests", function () {
  let snapshotId: number;
  before(async function () {
    this.signers = {} as Signers;

    const signers: SignerWithAddress[] = await ethers.getSigners();
    this.signers.admin = signers[0];
    this.signers.user1 = signers[1];
    this.signers.user2 = signers[2];

    const factory = new VeevNFTFactory(this.signers.admin);
    const instance = await upgrades.deployProxy(factory);
    await instance.deployed();
    const receipt = await (await instance.safeMint(this.signers.user1.address, "ipfs://asfjkldsajflkasjfl")).wait();
    console.log(receipt);
  });

  this.beforeEach(async function () {
    snapshotId = await ethers.provider.send("evm_snapshot", []);
  });

  this.afterEach(async function () {
    await ethers.provider.send("evm_revert", [snapshotId]);
  });

  it("should mint a Veev NFT", async function () {
    const factory = new VeevNFTFactory(this.signers.admin);
    const instance = await upgrades.deployProxy(factory);
    await instance.deployed();
    const receipt = await (await instance.safeMint(this.signers.user1.address, "ipfs://asfjkldsajflkasjfl")).wait();
    console.log(receipt);
    expect(await instance.ownerOf(0)).to.equal(this.signers.user1.address);
  });

  it("should not transfer a Veev NFT", async function () {
    const factory = new VeevNFTFactory(this.signers.admin);
    const instance = await upgrades.deployProxy(factory);
    await instance.deployed();
    const receipt = await (await instance.safeMint(this.signers.user1.address, "ipfs://asfjkldsajflkasjfl")).wait();
    console.log(receipt);
    const tx = await await instance.transferFrom(this.signers.user1.address, this.signers.user2.address, 0, {
      gasLimit: 1000000,
    });
    await expect(tx).to.be.revertedWith("ERC721: transfer caller is not owner nor approved");
  });
});
