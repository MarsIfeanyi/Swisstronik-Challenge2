import { ethers, network } from "hardhat";
import {
  encryptDataField,
  decryptNodeResponse,
} from "@swisstronik/swisstronik.js";
import { HttpNetworkConfig } from "hardhat/types";
import { HardhatEthersProvider } from "@nomicfoundation/hardhat-ethers/internal/hardhat-ethers-provider";
import { JsonRpcProvider } from "ethers";
import { SWISSTRONIK_ADDRESS } from "../addresses/address";

const sendShieldedQuery = async (
  provider: JsonRpcProvider | HardhatEthersProvider,
  destination: string,
  data: string
) => {
  const rpclink = (network.config as HttpNetworkConfig).url;
  const [encryptedData, usedEncryptedKey] = await encryptDataField(
    rpclink,
    data
  );
  const response = await provider.call({
    to: destination,
    data: encryptedData,
  });
  return await decryptNodeResponse(rpclink, response, usedEncryptedKey);
};
async function main() {
  const contractAddress = SWISSTRONIK_ADDRESS;

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

  const [signer] = await ethers.getSigners();
  const contractFactory = await ethers.getContractAt(
    "ISecurePassword",
    contractAddress
  );

  const functionName = "getPassword";

  console.log("=======Getting Password=======\n");
  const setMessageTx = await sendShieldedQuery(
    signer.provider,
    contractAddress,
    contractFactory.interface.encodeFunctionData(functionName)
  );

  console.log(
    "Decoded response:",
    contractFactory.interface.decodeFunctionResult(
      functionName,
      setMessageTx
    )[0]
  );
  console.log("\n");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
