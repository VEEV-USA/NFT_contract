const { ethers, upgrades } = require("hardhat");

async function main() {
  const veevNFTFactory = await ethers.getContractFactory("VeevNFT");
  const instance = await upgrades.deployProxy(veevNFTFactory, { initializer: "initialize" });
  await instance.deployed();
  console.log("Veev NFT deployed to:", instance.address);
}

void main();
