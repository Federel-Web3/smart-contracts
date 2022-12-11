import { ethers } from "hardhat";
import chai from "chai";
import { Registry } from "../types";
import { RegistryDAO } from "../types";
import { GoodsAndRealEstate } from "../types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

const { expect } = chai;

//Test the contracts/Registry/Registry.sol contract
describe("Registry", () => {
    let registry: Registry;
    let registryDAO: RegistryDAO;
    let goodsAndRealEstate: GoodsAndRealEstate;
    let employee: SignerWithAddress;
    
    //deploy the RegistryDAO contract
    it("Should deploy RegistryDAO and GoodsAndRealState", async () => {
        const [acc1, acc2] = await ethers.getSigners();
        const RegistryDAOFactory = await ethers.getContractFactory("RegistryDAO");
        registryDAO = await RegistryDAOFactory.deploy([acc1.address, acc2.address]);
        const minVotes = await registryDAO.minVotesRequired();
        expect(minVotes.toString()).to.equal("1");

        const GoodsAndRealEstateFactory = await ethers.getContractFactory("GoodsAndRealEstate");
        goodsAndRealEstate = await GoodsAndRealEstateFactory.deploy();

    });

    it("Incorporations should start only once", async () => {
        const accounts = await ethers.getSigners();
        
        const RegistryFactory = await ethers.getContractFactory("Registry");
        registry = await RegistryFactory.deploy(registryDAO.address, goodsAndRealEstate.address);
        
        registry.incorporateStart(1);
        expect(registry.incorporateStart(1)).to.be.revertedWith("someone already started this incorporation");

    });

    it("Incorporations should revert only once", async () => {
        registry.revertIncorporation(1);
        expect(registry.revertIncorporation(1)).to.be.revertedWith("incorporation already reverted");

    });
    
    it("Incorporations should finish only once", async () => {
        registry.incorporateStart(1);
        registry.finishIncorporation(1);
        expect(registry.finishIncorporation(1)).to.be.revertedWith("incorporation already finished");
    });

    it("Finish incorporation substitution", async () => {
        registry.finishIncorporation(1);
        expect(registry.finishIncorporation(1)).to.be.revertedWith("incorporation already finished");
    });


});