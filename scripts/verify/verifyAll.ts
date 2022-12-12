import { run, ethers } from "hardhat";

async function main() {
  const [acc1, acc2] = await ethers.getSigners();

  const ERC1155 = "0x70E3b68E7bbdf525babE5B0Ec4d8f3EA676f1345";
  const registryDAO = "0x3f7C7BA8689bcD40F9bF04a8ce78E95C9BcA43De";
  const registry = "0xFC22fB792c33d687A41679D62eC2a9E2eEC44A3f";

  try {
    await run("verify:verify", {
      address: ERC1155,
    });
  } catch (e) {
    console.log(e);
  }

  try {
    await run("verify:verify", {
      address: registryDAO,
      constructorArguments: [[acc1.address, acc2.address]],
    });
  } catch (e) {
    console.log(e);
  }

  try {
    await run("verify:verify", {
      address: registry,
      constructorArguments: [registryDAO, ERC1155],
    });
  } catch (e) {
    console.log(e);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
