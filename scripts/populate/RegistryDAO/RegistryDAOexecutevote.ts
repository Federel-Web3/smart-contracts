import { ethers } from "hardhat";

async function main() {
    const [owner1, owner2] = await ethers.getSigners();
    console.log("address: ", owner1.address);
    console.log("balance: ", (await owner1.getBalance()).toString());
  
    const ERC1155 = "0x70E3b68E7bbdf525babE5B0Ec4d8f3EA676f1345";
    const registryDAO = "0x3f7C7BA8689bcD40F9bF04a8ce78E95C9BcA43De";
    const registry = "0xFC22fB792c33d687A41679D62eC2a9E2eEC44A3f";
  
    const registryDAO_getFactory = await ethers.getContractFactory("RegistryDAO");
    const RegistryDAO = await registryDAO_getFactory.attach(registryDAO);
    
    console.log("Contract address", RegistryDAO.address);

    //Execute votes for proposal 0 and 1
    const tx = await RegistryDAO.connect(owner1).executeFromExecutor(0);
    tx.wait();
    console.log("Executed ", tx);

    const tx2 = await RegistryDAO.connect(owner1).executeFromExecutor(1);
    tx2.wait();
    console.log("Executed ", tx2);
    
  
}
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });