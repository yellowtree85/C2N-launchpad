const hre = require("hardhat");
const { saveContractAddress, getSavedContractAddresses } = require("../utils");
const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");
async function main() {
  const farmAddress =
    getSavedContractAddresses()[hre.network.name]["FarmingC2N"];
  console.log("FarmingC2N address:", farmAddress);

  const farming = await ethers.getContractAt("FarmingC2N", farmAddress);
  const startTimestamp = await farming.startTimestamp(); //1748095120
  const endTimestamp = await farming.endTimestamp();
  console.log("startTimestamp : ", startTimestamp); //1748095120
  console.log("endTimestamp  : ", endTimestamp); //1748100120
  console.log(
    "current blockstamp is : ",
    (await ethers.provider.getBlock("latest")).timestamp
  );
  const duration = endTimestamp.sub(startTimestamp); // BigNumber subtraction
  console.log("duration       : ", duration.toString());

  // update pool accEarnedPerShare  只有产生 交易的时候才会更新，block.timestamp is the last block timestamp
  let tx = await farming.updatePool(0);
  await tx.wait();

  const reward = await farming.pending(
    0,
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
  ); // 0 is the poolId
  console.log("current reward is : ", reward);

  const poolInfo = await farming.poolInfo(0);
  console.log("poolInfo", poolInfo);

  const userInfo = await farming.userInfo(
    0,
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
  );
  console.log("userInfo", userInfo);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
