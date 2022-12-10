import { ethers } from "hardhat";
import chai from "chai";
import { BigNumberish } from "ethers";
import { ipfsHashes } from "../utils/ipfsHashes";
import { RegistryDAO } from "../types";

const { expect } = chai;

describe("RegistryDAO", () => {
    let registryDAO: RegistryDAO;
    const mintedIds: BigNumberish[] = [];
    
    it("Should deploy RegistryDAO", async () => {
        const [acc1,acc2] = await ethers.getSigners();

        const Immobile = await ethers.getContractFactory("RegistryDAO");
        registryDAO = await Immobile.deploy([acc1.address,acc2.address]);

        expect(await registryDAO.minVotesRequired()).to.equal(1);

    });
    
});