const hre = require("hardhat");
const { encryptDataField } = require("@swisstronik/swisstronik.js");

const sendShieldedTransaction = async (signer, destination, data, value) => {
  const rpclink = hre.network.config.url;
  const [encryptedData] = await encryptDataField(rpclink, data);
  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  });
};

async function main() {
  const contractAddress = "0xcd6268dcb887d1d9ab0bedcb104713679ec916c1";

  try {
    console.log(
      "======== Checking Initial Storage Slot Before Updating Storage =======\n"
    );

    const storageValue = await ethers.provider.getStorage(
      contractAddress,
      "0x0"
    );

    const convertToDecimal = parseInt(storageValue, 16);

    console.log(`Initial  storageValue:: ${convertToDecimal} \n`);
  } catch (error) {
    console.error("Error:", error);
  }

  const [signer] = await hre.ethers.getSigners();
  const contractFactory = await hre.ethers.getContractFactory("SecurePassword");
  const contract = contractFactory.attach(contractAddress);

  const functionName = "updatePassWord";
  const passwordToSet = 20506707892545;

  console.log("============Updating Password=============\n");

  const updatePasswordTx = await sendShieldedTransaction(
    signer,
    contractAddress,
    contract.interface.encodeFunctionData(functionName, [passwordToSet]),
    0
  );
  await updatePasswordTx.wait();
  console.log("Transaction Receipt: ", updatePasswordTx);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
