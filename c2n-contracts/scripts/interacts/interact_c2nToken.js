const hre = require("hardhat");
const { saveContractAddress, getSavedContractAddresses } = require("../utils");
const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");
async function main() {
  const c2nTokenAddress =
    getSavedContractAddresses()[hre.network.name]["C2N-TOKEN"];
  // const c2nTokenAddress = addrs.local["C2N-TOKEN"];

  // npx hardhat run --network arb_sepolia scripts/interacts/interact_c2nToken.js
  // const c2nTokenAddress = "0xe7E0a310d9c546C79E234cA2C40eF6e7826e8dED";
  console.log("c2n Token address:", c2nTokenAddress);
  const c2nToken = await ethers.getContractAt("C2NToken", c2nTokenAddress);
  // const c2nTokenName = await c2nToken.name();
  // console.log("c2n Token name:", `${await c2nToken.name()}`);

  // owner balance
  const owner = "0x99519313208858E2c35da7Dd5449449eA88a4493";
  console.log("Owner address:", owner);
  await c2nToken.balanceOf(owner).then((balance) => {
    console.log(
      "c2n Token balance of owner:%s",
      ethers.utils.formatEther(balance)
    );
    return balance;
  });

  // player balance
  const player = "0xeb1544E9415D9D781e85e320504673648DeCa9F9";
  console.log("player address:", player);
  await c2nToken.balanceOf(player).then((balance) => {
    console.log(
      "c2n Token balance of player: %s",
      ethers.utils.formatEther(balance)
    );
  });

  // airdrop contract balance
  const airdropAddress =
    getSavedContractAddresses()[hre.network.name]["Airdrop-C2N"]; //0x3542B9c4e52ABc981E4c1a8658C370F931FA44aa
  await c2nToken.balanceOf(airdropAddress).then((balance) => {
    console.log(
      "c2n Token balance of Airdrop contract:%s",
      ethers.utils.formatEther(balance)
    );
  });
  ``;

  //staking withdraw
  const allocationStakingProxyAddress =
    getSavedContractAddresses()[hre.network.name]["AllocationStakingProxy"];
  // console.log("AllocationStakingProxy Address:", allocationStakingProxyAddress);

  const allocationStaking = await ethers.getContractAt(
    "AllocationStaking",
    allocationStakingProxyAddress
  );
  await allocationStaking.deposited(0, player).then((amount) => {
    console.log(
      "AllocationStaking deposited of player:%s",
      ethers.utils.formatEther(amount)
    );
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
