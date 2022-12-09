import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
const fs = require('fs')
const path = require('path')
const privateKeyFile = path.join(__dirname, './.secret')
const Account = require('./celo_account');

const config: HardhatUserConfig = {
  solidity: "0.8.17",
};

export default config;
