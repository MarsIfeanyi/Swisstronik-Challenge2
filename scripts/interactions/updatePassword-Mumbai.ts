import { ethers } from "hardhat";
import { MUMBAI_ADDRESS } from "../addresses/address";

async function main() {
  const securePasswordContract = await ethers.getContractAt(
    "ISecurePassword",
    MUMBAI_ADDRESS
  );

  // console.log(
  //   "======== Checking Initial Storage Slot Before Updating Storage =======\n"
  // );

  // const storageValue = await ethers.provider.getStorage(MUMBAI_ADDRESS, "0x0");

  // const convertToDecimal = parseInt(storageValue, 16);

  // console.log(`Initial  storageValue:: ${convertToDecimal} \n`);

  try {
    console.log(
      "======== Checking Initial Storage Slot Before Updating Storage =======\n"
    );

    const storageValue = await ethers.provider.getStorage(
      MUMBAI_ADDRESS,
      "0x0"
    );

    const convertToDecimal = parseInt(storageValue, 16);

    console.log(`Initial  storageValue:: ${convertToDecimal} \n`);
  } catch (error) {
    console.error("Error:", error);
  }

  console.log("========Changing the Storage:: UpdatingPassword ==========\n");

  const newPassword = 1345607467456060;

  const updatePassword = await securePasswordContract.updatePassWord(
    newPassword
  );
  await updatePassword.wait();

  console.log(
    "==========Retrieving Value from Storage with Function==========\n"
  );
  const getPassword = await securePasswordContract.getPassword();
  console.log(`getPassword:: ${getPassword} \n`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
