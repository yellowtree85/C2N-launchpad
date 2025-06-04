const hre = require("hardhat");
const { saveContractAddress, getSavedContractAddresses } = require("../utils");
const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");
async function main() {
  //   const airdropAddress =
  //     getSavedContractAddresses()[hre.network.name]["Airdrop-C2N"];
  //   console.log("Airdrop-C2N address:", airdropAddress);
  const tokenAddress = "0x3cB098812e55f96C8Db7D50104FFde5a76F677FB";
  console.log("c2n Token address:", tokenAddress);
  const c2nToken = await ethers.getContractAt("C2NToken", tokenAddress);
  const c2nTokenName = await c2nToken.name();
  console.log("c2n Token name:", c2nTokenName);

  const AIRDROP_CONTRACT = "0x57E9a5B762135d60d7B67c542F826E9E90E5Ec7F";
  const balanceBefore = await c2nToken.balanceOf(AIRDROP_CONTRACT);
  console.log(
    "c2n Token balance of Airdrop contract:",
    ethers.utils.formatEther(balanceBefore)
  );
  if (balanceBefore.gt(0)) {
    console.log("Airdrop contract already has C2N tokens, skipping minting.");
    return;
  }
  const tx = await c2nToken.mint(
    AIRDROP_CONTRACT,
    ethers.utils.parseEther("1000000000")
  );
  await tx.wait();
  console.log(
    `Minted 1,000,000,000 C2N tokens to Airdrop contract: ${AIRDROP_CONTRACT}`
  );
  const newBalance = await c2nToken.balanceOf(AIRDROP_CONTRACT);
  console.log(
    "New c2n Token balance of Airdrop contract:",
    newBalance.toString()
  );

  // test airdrop
  tx = await airdrop.withdrawTokens();
  await tx.wait();
  // get airdrop balance of c2n token
  const balanceAfter = await c2nToken.balanceOf(airdrop.address);
  console.log(
    "Airdrop balance of C2N token after withdrawTokens: ",
    ethers.utils.formatEther(balanceAfter)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
