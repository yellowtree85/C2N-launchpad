require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-web3");
require("@openzeppelin/hardhat-upgrades");
// require("@nomicfoundation/hardhat-verify");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    hardhat: {
      chainId: 31337,
    },
    local: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
      accounts: [process.env.LOCAL_PRIVATE_KEY],
    },
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/Qgj1xB_R16qJTLiMqlM46bmi0xUTEXsJ",
      // url: "https://ethereum-sepolia.blockpi.network/v1/rpc/public",
      accounts: [process.env.PRIVATE_KEY],
    },
    arb_sepolia: {
      url: "https://arb-sepolia.g.alchemy.com/v2/Qgj1xB_R16qJTLiMqlM46bmi0xUTEXsJ",
      // url: "https://public.stackup.sh/api/v1/node/arbitrum-sepolia",
      chainId: 421614,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  solidity: {
    version: "0.6.12",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  etherscan: {
    apiKey: {
      arb_sepolia: process.env.ETHERSCAN_API_KEY,
      sepolia: process.env.ARBISCAN_API_KEY,
    },
    customChains: [
      //npx hardhat verify --list-networks
      {
        network: "arb_sepolia",
        chainId: 421614,
        urls: {
          apiURL: "https://api-sepolia.arbiscan.io/api",
          browserURL: "https://sepolia.arbiscan.io",
        },
      },
    ],
  },
  sourcify: {
    enabled: true,
  },
};
