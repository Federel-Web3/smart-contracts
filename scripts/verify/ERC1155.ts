import { run } from "hardhat";

async function main() {
  const ERC1155 = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  try {
    await run("verify:verify", {
      address: ERC1155,
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
