import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;

const SCAN_KEY = process.env.SCAN_KEY;

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
  etherscan: {
    apiKey: String(SCAN_KEY),
  },
  typechain: {
    outDir: "types",
    target: "ethers-v5",
    alwaysGenerateOverloads: true, // should overloads with full signatures like deposit(uint256) be generated always, even if there are no overloads?
  },
};

export default config;
