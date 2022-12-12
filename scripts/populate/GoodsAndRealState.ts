import { ethers } from "hardhat";
import { text } from "stream/consumers";
import { ipfsHashes } from "../../utils/ipfsHashes";
//Populate the testnet with proposals and data
async function main() {
  const [acc1, acc2] = await ethers.getSigners();

  console.log("address: ", acc1.address);
  console.log("balance: ", (await acc1.getBalance()).toString());

  const ERC1155 = "0x70E3b68E7bbdf525babE5B0Ec4d8f3EA676f1345";
  const registryDAO = "0x3f7C7BA8689bcD40F9bF04a8ce78E95C9BcA43De";
  const registry = "0xFC22fB792c33d687A41679D62eC2a9E2eEC44A3f";

  const Immobile = await ethers.getContractFactory("GoodsAndRealEstate");
  const goodsAndRealEstate = await Immobile.attach(ERC1155);
  
  console.log("contract address", goodsAndRealEstate.address);
  //Minting 10 tokens
  for (let i = 0; i < 10; i++) {
    const tx = await goodsAndRealEstate.mint(ethers.utils.toUtf8Bytes(ipfsHashes[i]));
    tx.wait();
    console.log("minted", ipfsHashes[i]);
  }

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
