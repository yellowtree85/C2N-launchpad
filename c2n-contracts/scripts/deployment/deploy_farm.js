const hre = require("hardhat");
const { saveContractAddress, getSavedContractAddresses } = require("../utils");
const { ethers } = require("hardhat");

async function main() {
  const RPS = "100"; // reward per second
  const block = await ethers.provider.getBlock("latest"); // get current block timestamp
  const currentBlockTime = block.timestamp;
  const startTS = currentBlockTime + 400; //farm流程启动时间
  console.log("current blockstamp is : ", currentBlockTime);
  // get c2n token address from contract address file
  const c2nTokenAddress =
    getSavedContractAddresses()[hre.network.name]["C2N-TOKEN"];
  console.log("c2nTokenAddress: ", c2nTokenAddress); // reward token address

  const farm = await hre.ethers.getContractFactory("FarmingC2N");
  const Farm = await farm.deploy(
    c2nTokenAddress,
    ethers.utils.parseEther(RPS),
    startTS
  );
  await Farm.deployed();
  console.log("Farm deployed to: ", Farm.address);

  saveContractAddress(hre.network.name, "FarmingC2N", Farm.address);

  // fund the farm
  // approve the farm to spend the token
  const C2N = await hre.ethers.getContractAt("C2NToken", c2nTokenAddress);
  const approveTx = await C2N.approve(
    Farm.address,
    ethers.utils.parseEther("500000")
  );
  await approveTx.wait();
  let tx = await Farm.fund(ethers.utils.parseEther("500000"));
  await tx.wait();
  // add lp token      lpTokenAddress: stake token address
  const lpTokenAddress =
    getSavedContractAddresses()[hre.network.name]["C2N-TOKEN"];
  await Farm.add(100, lpTokenAddress, true);
  console.log("Farm funded and LP token added");

  const startTimestamp = await Farm.startTimestamp(); //1748095120
  const endTimestamp = await Farm.endTimestamp();
  console.log("farming startTimestamp : ", startTimestamp); //1748095120
  console.log("farming endTimestamp  : ", endTimestamp); //1748100120
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
