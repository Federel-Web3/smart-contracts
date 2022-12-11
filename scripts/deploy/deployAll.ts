import { ethers } from "hardhat";

// deploys all contracts

async function main() {
  const [acc1, acc2] = await ethers.getSigners();
  console.log("address: ", acc1.address);
  console.log("balance: ", (await acc1.getBalance()).toString());

  console.log("address: ", acc2.address);
  console.log("balance: ", (await acc2.getBalance()).toString());

  const Immobile = await ethers.getContractFactory("GoodsAndRealEstate");
  const goodsAndRealEstate = await Immobile.deploy();

  console.log("ERC1155 address", goodsAndRealEstate.address);

  const RegistryDAO = await ethers.getContractFactory("RegistryDAO");
  const registryDAO = await RegistryDAO.deploy([acc1.address, acc2.address]);

  console.log("registryDAO address", registryDAO.address);

  const Registry = await ethers.getContractFactory("Registry");
  const registry = await Registry.deploy(
    registryDAO.address,
    goodsAndRealEstate.address
  );

  console.log("registry address", registry.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
