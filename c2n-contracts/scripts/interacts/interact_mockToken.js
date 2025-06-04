const hre = require("hardhat");
const { saveContractAddress, getSavedContractAddresses } = require("../utils");
const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");
// npx hardhat run --network local scripts/interacts/interact_mockToken.js
async function main() {
  const contracts = getSavedContractAddresses()[hre.network.name];
  const mockTokenAddress = contracts["MOCK-TOKEN"];
  console.log("mock Token address:", mockTokenAddress);
  const mockToken = await ethers.getContractAt("C2NToken", mockTokenAddress);

  // owner balance
  const owner = "0x99519313208858E2c35da7Dd5449449eA88a4493";
  console.log("Owner address:", owner);
  await mockToken.balanceOf(owner).then((balance) => {
    console.log(
      "mock Token balance of owner:%s",
      ethers.utils.formatEther(balance)
    );
    return balance;
  });

  // player balance
  const player = "0xeb1544E9415D9D781e85e320504673648DeCa9F9";
  console.log("player address:", player);
  await mockToken.balanceOf(player).then((balance) => {
    console.log(
      "mock Token balance of player: %s",
      ethers.utils.formatEther(balance)
    );
  });

  const salesFactory = await hre.ethers.getContractAt(
    "SalesFactory",
    contracts["SalesFactory"]
  );

  const lastDeployedSale = await salesFactory.getLastDeployedSale();
  console.log("lastDeployedSale address is: ", lastDeployedSale);

  await mockToken.balanceOf(lastDeployedSale).then((balance) => {
    console.log(
      "mock Token balance of sales contract: %s",
      ethers.utils.formatEther(balance)
    );
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
