import { ethers } from "hardhat";
import chai from "chai";
import { RegistryDAO } from "../types";

const { expect } = chai;

describe("RegistryDAO", () => {
  let registryDAO: RegistryDAO;

  it("Should deploy RegistryDAO", async () => {
    const [acc1, acc2] = await ethers.getSigners();

    const RegistryDAOFactory = await ethers.getContractFactory("RegistryDAO");

    registryDAO = await RegistryDAOFactory.deploy([acc1.address, acc2.address]);

    const minVotes = await registryDAO.minVotesRequired();

    expect(minVotes.toString()).to.equal("1");
  });

  it("only overseers should be able to make proposals", async () => {
    const accounts = await ethers.getSigners();
  });

  it("only overseers should be able to vote for proposals", async () => {});

  it("proposal can only be executed after reaching the amount of votes required", async () => {});

  it("proposal role receiver should receive the role", async () => {});
});
