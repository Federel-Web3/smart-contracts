import { ethers } from "hardhat";

async function main() {
  const [acc1] = await ethers.getSigners();

  // insert previous contracts deployed addresses here
  const ERC1155Adress = "";
  const RegistryDAOAccess = "";

  console.log("address: ", acc1.address);
  console.log("balance: ", (await acc1.getBalance()).toString());

  const Registry = await ethers.getContractFactory("Registry");
  const registry = await Registry.deploy(RegistryDAOAccess, ERC1155Adress);

  console.log("registryDAO address", registry.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
