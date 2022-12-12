import { ethers } from "hardhat";

async function main() {
    const [owner1, owner2] = await ethers.getSigners();
    console.log("address: ", owner1.address);
    console.log("balance: ", (await owner1.getBalance()).toString());
  
    const registry = "0x06D15664b28d5eCC525ec137E2A30B8Fe25a7567";
    const ERC1155 = "0x415d8B75d168d0aa722dAB5CcDB8c122553c4C16";

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
  