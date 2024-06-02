import { LitContracts } from "@lit-protocol/contracts-sdk";
import { LitNodeClient, encryptString } from "@lit-protocol/lit-node-client";

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

export const encryptMessage = async(userSessionSigs) => {
  const chain = 'ethereum';
  const accessControlConditions = [
    {
      contractAddress: '',
      standardContractType: '',
      chain,
      method: 'eth_getBalance',
      parameters: [':userAddress', 'latest'],
      returnValueTest: {
        comparator: '>=',
        value: '0',
      },
    },
  ];
  const message = 'Hello world';
  const client = new LitNodeClient({
    litNetwork: 'cayenne'
  });
  await client.connect();
  const { ciphertext, dataToEncryptHash } = await encryptString(
    {
      accessControlConditions,
      sessionSigs: {userSessionSigs}, // your session
      chain,
      dataToEncrypt: message,
    },
    client
  );

  console.log("cipher text:", ciphertext, "hash:", dataToEncryptHash);

  decryptMessage(userSessionSigs, accessControlConditions, ciphertext, dataToEncryptHash, client);
}

export const decryptMessage = async (userSessionSigs, accessControlConditions, ciphertext, dataToEncryptHash, client) => {
  const code = `(async () => {
    const resp = await Lit.Actions.decryptAndCombine({
      accessControlConditions: ${accessControlConditions},
      ciphertext: ${ciphertext},
      dataToEncryptHash: ${dataToEncryptHash},
      authSig: null,
      chain: 'ethereum',
    });
  
    Lit.Actions.setResponse({ response: resp });
  })();`
  
  const res = await client.executeJs({
      code,
      sessionSigs: {userSessionSigs}, // your session
      jsParams: {
          accessControlConditions,
          ciphertext,
          dataToEncryptHash
      }
  });
  
  console.log("decrypted content sent from lit action:", res);
}