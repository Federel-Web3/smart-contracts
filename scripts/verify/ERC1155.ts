import { run } from "hardhat";

async function main() {
  const ERC1155 = "0x92fBfA287A0F39c32AED0Dd8E9f5D2b17243e0eD";

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
