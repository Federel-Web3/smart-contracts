import { ethers } from "hardhat";
import chai from "chai";
import { BigNumber, BigNumberish } from "ethers";
import { ipfsHashes } from "../utils/ipfsHashes";
import { GoodsAndRealEstate } from "../types";

const { expect } = chai;

describe("ERC1155", () => {
  let immobile: GoodsAndRealEstate;
  let mintedIds: BigNumberish[];

  it("Should mint an Immobile", async () => {
    const accounts = await ethers.getSigners();

    const Immobile = await ethers.getContractFactory("GoodsAndRealEstate");
    immobile = await Immobile.deploy();

    const tx = await immobile.mint(ethers.utils.toUtf8Bytes(ipfsHashes[0]));
    const minedTx = await tx.wait();

    for (let i = 0; i < minedTx.events?.length; i++) {
      const event = minedTx?.events[i];
      if (event.event === "Mint") {
        if (event?.args[1]) {
          mintedIds.push(BigNumber.from(event.args[1]));
        }
      }
    }

    const balance = await immobile.balanceOf(accounts[0].address, 0);

    expect(balance.toString()).to.equal("1");
  });

  it("Should check minted ipfs item", () => {
    console.log("aqui");
  });
});
