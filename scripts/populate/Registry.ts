import { ethers } from "hardhat";

async function main() {
  const [owner] = await ethers.getSigners();
  console.log("address: ", owner.address);
  console.log("balance: ", (await owner.getBalance()).toString());

  const ERC1155 = "0x415d8B75d168d0aa722dAB5CcDB8c122553c4C16";
  const registryDAO = "0x1723642DC542d480A5D7a323779B6390A78950bF";
  const registry = "0x06D15664b28d5eCC525ec137E2A30B8Fe25a7567";

  const Immobile = await ethers.getContractFactory("GoodsAndRealEstate");
  const goodsAndRealEstate = await Immobile.attach(ERC1155);

  console.log("contract address", goodsAndRealEstate.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
