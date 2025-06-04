const hre = require("hardhat");
const { saveContractAddress, getSavedContractAddresses } = require("../utils");
const { ethers, upgrades, run, network } = require("hardhat");
const { getImplementationAddress } = require("@openzeppelin/upgrades-core");
const config = require("../configs/config.json");
// const fs = require("fs");
// const path = require("path");
async function main() {
  // npx hardhat run --network arb_sepolia .\scripts\interacts\interact_idoStaking.js
  const c = config[hre.network.name];
  const contracts = getSavedContractAddresses()[hre.network.name];
  const allocationStakingProxyAddress = contracts["AllocationStakingProxy"];
  console.log("AllocationStakingProxy Address:", allocationStakingProxyAddress);

  const allocationStaking = await ethers.getContractAt(
    "AllocationStaking",
    allocationStakingProxyAddress
  );

  const startTimestamp = await allocationStaking.startTimestamp(); //1748095120
  const endTimestamp = await allocationStaking.endTimestamp();
  console.log("startTimestamp : ", startTimestamp); //1748095120
  console.log("endTimestamp  : ", endTimestamp); //1748100120
  console.log(
    "current blockstamp is : ",
    (await ethers.provider.getBlock("latest")).timestamp
  );
  const duration = endTimestamp.sub(startTimestamp); // arb_sepolia BigNumber subtraction 1000000000 ~=31.7 years
  console.log("duration       : ", duration.toString());

  // update pool accEarnedPerShare  只有产生 交易的时候才会更新，block.timestamp is the last block timestamp
  // let tx = await allocationStaking.updatePool(0);
  // await tx.wait();

  const player = "0xeb1544E9415D9D781e85e320504673648DeCa9F9";
  const reward = await allocationStaking.pending(0, player); // 0 is the poolId
  console.log("player current reward is : ", reward);

  const poolInfo = await allocationStaking.poolInfo(0);
  console.log("poolInfo", poolInfo);

  const userInfo = await allocationStaking.userInfo(0, player);
  console.log("player userInfo", userInfo);

  let proxyAddress = allocationStaking.address;
  if (!proxyAddress.startsWith("0x")) {
    proxyAddress = "0x" + proxyAddress;
  }

  console.log("Using proxy address to fetch implementation:", proxyAddress);

  const currentImplAddress = await getImplementationAddress(
    ethers.provider,
    proxyAddress
  );
  console.log(
    `Please verify the implementation address: ${currentImplAddress}`
  );
  // let currentImplAddress = await upgrades.erc1967.getImplementationAddress(
  //   ethers.provider,
  //   allocationStaking.address
  // ); //获取当前的实现合约地址
  // console.log(
  //   `Please verify the implementation address: ${currentImplAddress}`
  // );
  const c2nTokenAddress = contracts["C2N-TOKEN"];
  console.log("c2nTokenAddress: ", c2nTokenAddress);
  const salesFactoryAddress = contracts["SalesFactory"];
  console.log("SalesFactory Address:", salesFactoryAddress);
  console.log("stakeStartTimestamp: ", startTimestamp);
  // verify 验证合约 实现合约的参数是传给initialize函数的
  // await verify(allocationStaking.address); use this to verify the proxy contract
  // await verify(currentImplAddress);
  // await verify(currentImplAddress, [
  //   c2nTokenAddress,
  //   ethers.utils.parseEther(c.allocationStakingRPS),
  //   startTimestamp,
  //   salesFactoryAddress,
  // ]);
}
// verify function run verify task
async function verify(contractAddress) {
  try {
    console.log("Verifying contract...");
    await run("verify:verify", {
      address: contractAddress,
      // constructorArguments: args,
    });
    console.log("Contract verified!");
  } catch (error) {
    console.log("verify error");
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("Contract already verified");
    } else {
      console.error(error);
    }
  }
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
