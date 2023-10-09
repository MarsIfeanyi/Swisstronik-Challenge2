import { ethers, network } from "hardhat";
const { verify } = require("../../utils/verify");

async function main() {
  const constructorParams = 6430754;

  const securePasswordContract = await ethers.deployContract("SecurePassword", [
    constructorParams,
  ]);

  console.log("Deploying SecurePassword Contract to Mumbai Testnet");
  // @ts-ignore
  await securePasswordContract.waitForDeployment(10);

  console.log(`SecurePassword Deployed at ${securePasswordContract.target}`);

  if (
    network.config.chainId === 80001 ||
    (1291 && process.env.ETHERSCAN_API_KEY)
  ) {
    console.log("Waiting for block confirmations...");

    //wait for 10 block confirmations before verifying the transaction
    // @ts-ignore
    await securePasswordContract.waitForDeployment(10);
    await verify(securePasswordContract.target, [constructorParams]);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
