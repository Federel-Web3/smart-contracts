import { ethers } from "hardhat";
import chai from "chai";
import { RegistryDAO } from "../types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

const { expect } = chai;

describe("RegistryDAO", () => {
  let registryDAO: RegistryDAO;
  let employee: SignerWithAddress;

  it("Should deploy RegistryDAO", async () => {
    const [acc1, acc2] = await ethers.getSigners();

    const RegistryDAOFactory = await ethers.getContractFactory("RegistryDAO");

    registryDAO = await RegistryDAOFactory.deploy([acc1.address, acc2.address]);

    const minVotes = await registryDAO.minVotesRequired();

    expect(minVotes.toString()).to.equal("1");
  });

  it("only overseers should be able to make proposals", async () => {
    const accounts = await ethers.getSigners();

    employee = accounts[3];
    const role = await registryDAO.getEmployeeRole();

    await registryDAO
      .connect(accounts[1])
      .proposeRole(
        role,
        employee.address,
        "adicionado funcionário",
        "Jailson Mendes",
        1
      );
  });

  it("only overseers should be able to make proposals", async () => {
    const accounts = await ethers.getSigners();

    const role = await registryDAO.getEmployeeRole();

    const tx = registryDAO
      .connect(accounts[3])
      .proposeRole(
        role,
        employee.address,
        "adicionado funcionário",
        "Jailson Mendes",
        1
      );
    expect(tx).to.be.revertedWith("only overseer allowed");
  });

  it("should read roles", async () => {
    await registryDAO.getEmployeeRole();
    await registryDAO.getOverseerRole();
    await registryDAO.getTabeliaoRole();
  });

  it("only overseers should be able to vote proposals", async () => {
    const accounts = await ethers.getSigners();
    const tx = registryDAO.connect(accounts[3]).vote(0, true);
    expect(tx).to.be.revertedWith("only overseer allowed");
  });

  it("proposal can only be executed after reaching the amount of votes required", async () => {
    const tx = registryDAO.execute(0);

    expect(tx).to.be.revertedWith(
      "The proposal does not have the required amount of votes to pass"
    );
  });

  it("overseers should be able to vote", async () => {
    const accounts = await ethers.getSigners();
    await registryDAO.connect(accounts[0]).vote(0, true);
  });

  it("overseers should not be able to vote twice", async () => {
    const accounts = await ethers.getSigners();
    const tx = registryDAO.connect(accounts[0]).vote(0, true);

    expect(tx).to.be.revertedWith(
      "This overseer already voted on this proposal"
    );
  });

  it("proposal role receiver should receive the role after execution", async () => {
    await registryDAO.executeFromExecutor(0);

    const role = await registryDAO.getEmployeeRole();
    const hasRole = await registryDAO.hasRole(role, employee.address);
    expect(hasRole).to.be.true;
  });

  it("should revert if execution is attemted again", async () => {
    const tx = registryDAO.executeFromExecutor(0);

    expect(tx).to.be.revertedWith("proposal already executed");
  });

  it("should be possible to renounce roles", async () => {
    const role = await registryDAO.getEmployeeRole();

    await registryDAO.connect(employee).renounceRole(role, employee.address);
    const hasRole = await registryDAO.hasRole(role, employee.address);
    expect(hasRole).to.be.false;
  });

  it("should be possible to propose overseer role", async () => {
    const accounts = await ethers.getSigners();

    const role = await registryDAO.getOverseerRole();

    await registryDAO
      .connect(accounts[1])
      .proposeRole(
        role,
        employee.address,
        "adicionado supervisor",
        "Paulo Guina",
        1
      );
  });

  it("should grant supervisor role after voting", async () => {
    const accounts = await ethers.getSigners();

    const role = await registryDAO.getOverseerRole();

    await registryDAO.connect(accounts[0]).vote(1, true);

    await registryDAO.executeFromExecutor(1);

    const hasRole = await registryDAO.hasRole(role, employee.address);
    expect(hasRole).to.be.true;
    const overseersAmount = await registryDAO._overseersAmount();

    expect(overseersAmount.toString()).to.be.equal("3");
  });

  it("should grant supervisor role after voting", async () => {
    const role = await registryDAO.getOverseerRole();

    await registryDAO.connect(employee).renounceRole(role, employee.address);

    const hasRole = await registryDAO.hasRole(role, employee.address);
    expect(hasRole).to.be.false;
    const overseersAmount = await registryDAO._overseersAmount();

    expect(overseersAmount.toString()).to.be.equal("2");
  });
});
