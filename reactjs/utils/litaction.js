import { LitContracts } from "@lit-protocol/contracts-sdk";

export const mintPKP = async (signer) => {
  const litContracts = new LitContracts({ signer });
  await litContracts.connect();

  const pkp = (await litContracts.pkpNftContractUtils.write.mint()).pkp;
  console.log("✅ pkp:", pkp);
}

export const getPKP = async (signer, tokenID) => {
  const litContracts = new LitContracts({ signer });
  await litContracts.connect();
  const pkp = await litContracts.pkpNftContract.read.getPubkey(tokenID);
  console.log("✅ pkp:", pkp);
}
