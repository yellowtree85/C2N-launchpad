const hre = require("hardhat");
const { saveContractAddress } = require("../utils");

async function main() {
  const tokenName = "Boba Mock";
  const symbol = "BOBA";
  const totalSupply = "1000000000000000000000000000"; //1000000000 ethers (1 billion)
  const decimals = 18;

  const MCK = await hre.ethers.getContractFactory("C2NToken");
  const token = await MCK.deploy(tokenName, symbol, totalSupply, decimals);
  await token.deployed();
  console.log("Boba deployed to: ", token.address);

  saveContractAddress(hre.network.name, "BOBA-TOKEN", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
