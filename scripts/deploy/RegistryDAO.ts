import { ethers } from "hardhat";

async function main() {
  const [acc1, acc2] = await ethers.getSigners();
  console.log("address: ", acc2.address);
  console.log("balance: ", (await acc2.getBalance()).toString());

  const RegistryDAO = await ethers.getContractFactory("RegistryDAO");
  const registryDAO = await RegistryDAO.deploy([acc1.address, acc2.address]);

  console.log("registryDAO address", registryDAO.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
