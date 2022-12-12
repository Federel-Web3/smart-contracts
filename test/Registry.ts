import { ethers } from "hardhat";
import chai from "chai";
import { Registry, RegistryDAO, GoodsAndRealEstate } from "../types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ipfsHashes } from "../utils/ipfsHashes";
import { BigNumberish } from "ethers";

const { expect } = chai;

// Test the contracts/Registry/Registry.sol contract
describe("Registry", () => {
  let registry: Registry;
  let registryDAO: RegistryDAO;
  let goodsAndRealEstate: GoodsAndRealEstate;
  const mintedIds: BigNumberish[] = [];
  let employee: SignerWithAddress;
  let tabeliao: SignerWithAddress;
  const firstHalfIpfsHashes = ipfsHashes.slice(0, 50);
  const lastHalfIpfsHases = ipfsHashes.slice(51, ipfsHashes.length);

  // deploy the RegistryDAO contract
  it("Should deploy RegistryDAO and GoodsAndRealState", async () => {
    const [acc1, acc2] = await ethers.getSigners();
    const RegistryDAOFactory = await ethers.getContractFactory("RegistryDAO");
    registryDAO = await RegistryDAOFactory.deploy([acc1.address, acc2.address]);
    const minVotes = await registryDAO.minVotesRequired();
    expect(minVotes.toString()).to.equal("1");

    const GoodsAndRealEstateFactory = await ethers.getContractFactory(
      "GoodsAndRealEstate"
    );
    goodsAndRealEstate = await GoodsAndRealEstateFactory.deploy();
  });

  it("should assign one employee and one tabelião ", async () => {
    const [acc1, , acc3, acc4] = await ethers.getSigners();

    const role = await registryDAO.getEmployeeRole();
    const role2 = await registryDAO.getTabeliaoRole();

    await registryDAO
      .connect(acc1)
      .proposeRole(
        role,
        acc3.address,
        "adicionado funcionário",
        "Jailson Mendes",
        1
      );

    await registryDAO
      .connect(acc1)
      .proposeRole(
        role2,
        acc4.address,
        "adicionado tabelião",
        "Jailson Mendes",
        1
      );

    employee = acc3;
    tabeliao = acc4;
  });

  it("should vote and execute for tabeliao and employee assign", async () => {
    const [acc1] = await ethers.getSigners();

    await registryDAO.connect(acc1).vote(0, true);
    await registryDAO.connect(acc1).vote(1, true);

    await registryDAO.executeFromExecutor(0);
    await registryDAO.executeFromExecutor(1);
  });

  it("it should deploy registry", async () => {
    const RegistryFactory = await ethers.getContractFactory("Registry");
    registry = await RegistryFactory.deploy(
      registryDAO.address,
      goodsAndRealEstate.address
    );
  });

  it(`should mint a bunch of nfts 
  (half of the available cids) and give approval to Registry contract`, async () => {
    for (let i = 0; i < firstHalfIpfsHashes.length; i++) {
      const ipfsHash = firstHalfIpfsHashes[i];
      const tx = await goodsAndRealEstate
        .connect(employee)
        .mint(ethers.utils.toUtf8Bytes(ipfsHash));
      const minedTx = await tx.wait();
      if (!minedTx.events) throw Error("failed to send event");
      for (let i = 0; i < minedTx.events?.length; i++) {
        const event = minedTx?.events[i];
        if (!event) throw Error("no event");
        if (event.event === "Mint") {
          // é onde fica o inteiro do event que é mintado
          if (event.args) mintedIds.push(event.args[1]);
        }
      }
    }
    await goodsAndRealEstate
      .connect(employee)
      .setApprovalForAll(registry.address, true);
  });

  it("should start incoporation of a bunch of nfts", async () => {
    for (let i = 0; i < mintedIds.length; i++) {
      await registry.connect(employee).startIncorporation(mintedIds[i]);
    }
  });

  it("should finish incoporation of a bunch of nfts", async () => {
    for (let i = 0; i < mintedIds.length; i++) {
      await registry.connect(tabeliao).finishIncorporation(mintedIds[i]);
    }
  });

  it("should finish incorporation update  of a bunch of nfts", async () => {
    const lastMintedIds: BigNumberish[] = [];
    for (let i = 0; i < lastHalfIpfsHases.length; i++) {
      const ipfsHash = lastHalfIpfsHases[i];
      const tx = await goodsAndRealEstate
        .connect(employee)
        .mint(ethers.utils.toUtf8Bytes(ipfsHash));
      const minedTx = await tx.wait();
      if (!minedTx.events) throw Error("failed to send event");
      for (let i = 0; i < minedTx.events?.length; i++) {
        const event = minedTx?.events[i];
        if (!event) throw Error("no event");
        if (event.event === "Mint") {
          // é onde fica o inteiro do event que é mintado
          if (event.args) lastMintedIds.push(event.args[1]);
        }
      }
    }

    // the first part of the array will be the that are being updated
    // the last part are the ones that will update
    // so the last part has to be minted

    const startedToUpdateIds = lastMintedIds.splice(0, 10);

    for (let i = 0; i < 10; i++) {
      await registry
        .connect(employee)
        .startIncorporation(startedToUpdateIds[i]);
      await registry
        .connect(tabeliao)
        .finishIncorporation(startedToUpdateIds[i]);

      await registry.connect(employee).startIncorporation(lastMintedIds[i]);

      await registry
        .connect(tabeliao)
        .finishIncorporationUpdate(lastMintedIds[i], startedToUpdateIds[i]);
    }
  });

  it("should revert an incorporation", async () => {
    await registry.connect(tabeliao).revertIncorporation(mintedIds[3]);
  });
});
