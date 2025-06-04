const hre = require("hardhat");
const { saveContractAddress, getSavedContractAddresses } = require("../utils");
const { ethers, upgrades, run, network } = require("hardhat");
const { getImplementationAddress } = require("@openzeppelin/upgrades-core");
const config = require("../configs/config.json");
// const fs = require("fs");
// const path = require("path");
async function main() {
  // npx hardhat run --network arb_sepolia .\scripts\interacts\interact_sales.js
  const c = config[hre.network.name];
  const contracts = getSavedContractAddresses()[hre.network.name];
  const allocationStakingProxyAddress = contracts["AllocationStakingProxy"];
  console.log("AllocationStakingProxy Address:", allocationStakingProxyAddress);

  const allocationStaking = await ethers.getContractAt(
    "AllocationStaking",
    allocationStakingProxyAddress
  );
  const salesFactory = await hre.ethers.getContractAt(
    "SalesFactory",
    contracts["SalesFactory"]
  );

  const lastDeployedSale = await salesFactory.getLastDeployedSale();
  console.log("lastDeployedSale address is: ", lastDeployedSale);
  const sales = await ethers.getContractAt("C2NSale", lastDeployedSale);

  const player = "0xeb1544E9415D9D781e85e320504673648DeCa9F9";
  await sales.isRegistered(player).then((isRegistered) => {
    console.log("Is player registered in sales:", isRegistered);
  });
  await sales.isParticipated(player).then((isParticipated) => {
    console.log("Is player participated in sales:", isParticipated);
  });
  await sales.sale().then((sale) => {
    console.log("Player sale info:", sale);
  });
  await sales.vestingPercentPerPortion(0).then((vestingPercentPerPortion) => {
    console.log(
      "Player vestingPercentPerPortion[0]:",
      vestingPercentPerPortion
    );
  });
  await sales.userToParticipation(player).then((userToParticipation) => {
    console.log("Player userToParticipation:", userToParticipation);
    // Check if isPortionWithdrawn exists
    if (userToParticipation.isPortionWithdrawn) {
      for (let i = 0; i < userToParticipation.isPortionWithdrawn.length; i++) {
        console.log(
          `userToParticipation.isPortionWithdrawn[${i}]:`,
          userToParticipation.isPortionWithdrawn[i]
        );
      }
    } else {
      console.log("userToParticipation.isPortionWithdrawn is undefined");
    }
  });
  await sales.vestingPortionsUnlockTime(0).then((vestingPortionsUnlockTime) => {
    console.log(
      "Player vestingPortionsUnlockTime[0]:",
      vestingPortionsUnlockTime
    );
  });
  const userInfo = await allocationStaking.userInfo(0, player);
  console.log("player userInfo", userInfo);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
