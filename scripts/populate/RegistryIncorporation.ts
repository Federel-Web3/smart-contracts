import { ethers } from "hardhat";

async function main() {
    const [owner1, owner2] = await ethers.getSigners();
    console.log("address: ", owner1.address);
    console.log("balance: ", (await owner1.getBalance()).toString());
  
    const ERC1155 = "0x70E3b68E7bbdf525babE5B0Ec4d8f3EA676f1345";
    const registryDAO = "0x3f7C7BA8689bcD40F9bF04a8ce78E95C9BcA43De";
    const registry = "0xFC22fB792c33d687A41679D62eC2a9E2eEC44A3f";

    const registry_getFactory = await ethers.getContractFactory("Registry");
    const Registry = await registry_getFactory.attach(registry);
    
    const GoodsAndRealEstateFactory = await ethers.getContractFactory("GoodsAndRealEstate");
    const GoodsAndRealEstate = await GoodsAndRealEstateFactory.attach(ERC1155);
    
    console.log("Contract address", Registry.address);

    const tx = await GoodsAndRealEstate.setApprovalForAll(registry, true);
    tx.wait();
    console.log("Approved ", tx);

    //Start a incorporation
    const tx2 = await Registry.startIncorporation("17143978500875269463955704067490711958975068019597006118855384996001033162156");
    tx2.wait();
    console.log("Started incorporation ", tx2);
    


  }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  