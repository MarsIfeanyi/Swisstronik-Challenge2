import { ethers } from "hardhat";
import { MUMBAI_ADDRESS } from "../addresses/address";

async function main() {
  const securePasswordContract = await ethers.getContractAt(
    "ISecurePassword",
    MUMBAI_ADDRESS
  );

  console.log(
    "\n==========Retrieving Value from Storage with Function==========\n"
  );
  const getPassword = await securePasswordContract.getPassword();
  console.log(`getPassword:: ${getPassword} \n `);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
