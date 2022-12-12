import { ethers } from "hardhat";

async function main() {
    const [owner1, owner2] = await ethers.getSigners();
    console.log("address: ", owner1.address);
    console.log("balance: ", (await owner1.getBalance()).toString());
  
    const ERC1155 = "0x415d8B75d168d0aa722dAB5CcDB8c122553c4C16";
    const registryDAO = "0x1723642DC542d480A5D7a323779B6390A78950bF";
    const registry = "0x06D15664b28d5eCC525ec137E2A30B8Fe25a7567";
  
    const registryDAO_getFactory = await ethers.getContractFactory("RegistryDAO");
    const RegistryDAO = await registryDAO_getFactory.attach(registryDAO);
    
    console.log("Contract address", RegistryDAO.address);

    //Making a proposal to give owner2 the role of tabeliao
    const role = await RegistryDAO.getEmployeeRole();
    const tx = await RegistryDAO.connect(owner1).proposeRole(role, owner1.address, "Dando role de employee para Cicrano", "Cicrano", 1);
    tx.wait();
    console.log("Proposed ", tx);
    const tx2 = await RegistryDAO.connect(owner1).vote(1, true);
    tx2.wait();
    console.log("Voted ", tx2);
  
  }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  