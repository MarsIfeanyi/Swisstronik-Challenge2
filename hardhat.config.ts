import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

import "dotenv/config";

const MUMBAI_RPC_URL = process.env.MUMBAI_RPC_URL;
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETH_MAINNET_RPC_URL = process.env.ETH_MAINNET_RPC_URL;

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      forking: {
        // @ts-ignore
        url: ETH_MAINNET_RPC_URL,
      },
    },

    swisstronik: {
      url: "https://json-rpc.testnet.swisstronik.com/",
      //@ts-ignore
      accounts: [PRIVATE_KEY],
      chainId: 1291,
    },

    mumbai: {
      url: MUMBAI_RPC_URL,
      // @ts-ignore
      accounts: [PRIVATE_KEY],
      chainId: 80001,
      gas: 5000000, //units of gas you are willing to pay, aka gas limit
      gasPrice: 50000000000,
    },

    localhost: {
      url: "http://localhost:8545",
      chainId: 31337,
    },
  },
  solidity: "0.8.8",
  etherscan: {
    apiKey: POLYGONSCAN_API_KEY,
  },
};

export default config;
