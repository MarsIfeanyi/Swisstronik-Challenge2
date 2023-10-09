import { ethers } from "hardhat";
import { MUMBAI_ADDRESS } from "../addresses/address";

async function main() {
  const securePasswordContract = await ethers.getContractAt(
    "ISecurePassword",
    MUMBAI_ADDRESS
  );

  console.log(
    "======== Checking Initial Storage Slot Before Updating Storage =======\n"
  );

  const slot0 = await ethers.provider.getStorage(MUMBAI_ADDRESS, "0x0");
  console.log(`Initial Storage slot: ${slot0} \n`);

  console.log("========Changing the Storage:: UpdatingPassword ==========\n");

  const updatePassword = await securePasswordContract.updatePassWord(12345678);
  await updatePassword.wait();

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
