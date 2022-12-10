import { ethers } from "hardhat";

async function main() {
  const [owner] = await ethers.getSigners();
  console.log("address: ", owner.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
