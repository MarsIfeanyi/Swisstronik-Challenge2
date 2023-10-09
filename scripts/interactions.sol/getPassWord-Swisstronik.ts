import { ethers } from "hardhat";
import { SWISSTRONIK_ADDRESS } from "../addresses/address";

async function main() {
  const securePasswordContract = await ethers.getContractAt(
    "ISecurePassword",
    SWISSTRONIK_ADDRESS
  );

  console.log(
    "==========Retrieving Value from Storage with Function=========="
  );
  const getPassword = await securePasswordContract.getPassword();
  console.log(`getPassword:: ${getPassword} `);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
