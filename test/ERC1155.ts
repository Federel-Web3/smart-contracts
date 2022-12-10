import { ethers } from "hardhat";
// import { ipfsHashes } from "../utils/ipfsHashes";
import chai from "chai";

const {expect} = chai;

describe("ERC1155", function () {

	
	it("Should mint an Immobile", async function () {
		const accounts = await ethers.getSigners();

		// const Immobile = await ethers.getContractFactory("GoodsAndRealEstate");
		//  const immobile = await Immobile.deploy();

		// console.log(ipfsHashes);
		
		// immobile.mint(ipfsHashes[0]);
		// const balance = await immobile.balanceOf(accounts[0].address, 0);
		// expect(balance).to.equal(1);
	});
	
});
