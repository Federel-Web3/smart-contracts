import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
// import "hardhat-celo";
// import "@nomiclabs/hardhat-etherscan";
dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const PRIVATE_KEY_2 = process.env.PRIVATE_KEY_2;

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
      chainId: 44787,
      url: "https://celo-alfajores-rpc.allthatnode.com/",
      accounts: [String(PRIVATE_KEY), String(PRIVATE_KEY_2)],
      allowUnlimitedContractSize: true,
    },
  },
  etherscan: {
    apiKey: {
      alfajores: String(SCAN_KEY),
      celo: String(SCAN_KEY),
    },
    customChains: [
      {
        network: "alfajores",
        chainId: 44787,
        urls: {
          apiURL: "https://api-alfajores.celoscan.io/api",
          browserURL: "https://alfajores.celoscan.io/",
        },
      },
    ],
  },
  typechain: {
    outDir: "types",
    target: "ethers-v5",
    alwaysGenerateOverloads: true, // should overloads with full signatures like deposit(uint256) be generated always, even if there are no overloads?
  },
};

export default config;
