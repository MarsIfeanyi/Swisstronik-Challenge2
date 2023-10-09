import { ethers } from "hardhat";

async function main() {
  const constructorParams = 64643074;

  const swisstronikContract = await ethers.deployContract("SecurePassword", [
    constructorParams,
  ]);

  console.log("Deploying SecurePassword Contract to Swisstronik Testnet");

  await swisstronikContract.waitForDeployment();

  console.log(`SecurePassword Deployed at ${swisstronikContract.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
