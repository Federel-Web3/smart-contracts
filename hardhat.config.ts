import * as dotenv from "dotenv";
dotenv.config();
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";


const PRIVATE_KEY = process.env.PRIVATE_KEY;



const config: HardhatUserConfig = {
	solidity: "0.8.17",
	networks: {
		hardhat: {
			allowUnlimitedContractSize: true,
		},
		celo: {
			url: "https://celo-mainnet-rpc.allthatnode.com/",
			accounts: [String(PRIVATE_KEY)],
			allowUnlimitedContractSize: true,
		},
		alfajores: {
			url: "https://celo-alfajores-rpc.allthatnode.com/",
			accounts: [String(PRIVATE_KEY)],
			allowUnlimitedContractSize: true,
		},
	},
	typechain: {
		outDir: "types",
		target: "ethers-v5",
		alwaysGenerateOverloads: true, // should overloads with full signatures like deposit(uint256) be generated always, even if there are no overloads?
	},
};

export default config;
