import { ethers } from "hardhat";
import chai from "chai";
import { BigNumberish } from "ethers";
import { ipfsHashes } from "../utils/ipfsHashes";
import { GoodsAndRealEstate } from "../types";

const { expect } = chai;

describe("ERC1155", () => {
  let goodsAndRealEstate: GoodsAndRealEstate;
  const mintedIds: BigNumberish[] = [];

  it("Should mint an Immobile", async () => {
    const accounts = await ethers.getSigners();

    const Immobile = await ethers.getContractFactory("GoodsAndRealEstate");
    goodsAndRealEstate = await Immobile.deploy();

    const tx = await goodsAndRealEstate.mint(
      ethers.utils.toUtf8Bytes(ipfsHashes[0])
    );
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

    const balance = await goodsAndRealEstate.balanceOf(
      accounts[0].address,
      mintedIds[0]
    );

    expect(balance.toString()).to.equal("1");
  });

  it("should mint many immobiles", async () => {
    for (let i = 1; i < 10; i++) {
      const tx = await goodsAndRealEstate.mint(
        ethers.utils.toUtf8Bytes(ipfsHashes[i])
      );
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

    expect(mintedIds.length).to.be.equal(10);
  });

  it("Should check minted ipfs item", async () => {
    const cid = await goodsAndRealEstate["_immobiles(uint256)"](mintedIds[0]);
    expect(ethers.utils.toUtf8String(cid)).to.be.equal(ipfsHashes[0]);
  });

  it("Should not allow to mint the same immobile twice", async () => {
    const tx = goodsAndRealEstate.mint(ethers.utils.toUtf8Bytes(ipfsHashes[0]));
    expect(tx).to.be.revertedWith("Immobile already exists");
  });
});
