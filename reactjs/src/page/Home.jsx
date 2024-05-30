import React from 'react';
import { ethers } from 'ethers';
import {
  LitNodeClient,
} from "@lit-protocol/lit-node-client";
import {
  LitPKPResource,
  LitActionResource,
  generateAuthSig,
  createSiweMessageWithRecaps,
  LitAccessControlConditionResource,
  LitAbility,
} from "@lit-protocol/auth-helpers";
import { LitContracts } from "@lit-protocol/contracts-sdk";

import { connect } from '../../utils/supabase';

function Home({ ethAddress, setETHAddress }) {
  const connectMetamask = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setETHAddress(accounts[0]);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    console.log(signer);

    try {
      const response = await fetch('http://localhost:4000/siwe-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address: signer.address }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const messageToSign = await response.json();
      console.log(messageToSign);
      const signature = await signer.signMessage(messageToSign);
      console.log(signature);
    } catch (error) {
      console.error(error);
    }
  }

  const connectingToLitNode = async () => {
    const litNodeClient = new LitNodeClient({
      litNetwork: 'cayenne',
      debug: true,
    });

    console.log("Connecting to LitNode...");
    await litNodeClient.connect();
    console.log(litNodeClient.config);
    console.log(litNodeClient.connectedNodes);

    const latestBlockhash = await litNodeClient.getLatestBlockhash();
    console.log("latestBlockhash:", latestBlockhash);

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setETHAddress(accounts[0]);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    console.log(signer);

    const litContracts = new LitContracts({ signer });
    await litContracts.connect();

    const pkp = (await litContracts.pkpNftContractUtils.write.mint()).pkp;
    console.log("✅ pkp:", pkp);

    const sessionSigs = await litNodeClient.getSessionSigs({
      chain: "ethereum",
      expiration: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // 24 hours
      resourceAbilityRequests: [
        {
          resource: new LitActionResource("*"),
          ability: LitAbility.LitActionExecution,
        },
      ],
      authNeededCallback: async ({ resourceAbilityRequests, expiration, uri }) => {
        const toSign = await createSiweMessageWithRecaps({
          uri,
          expiration,
          resources: resourceAbilityRequests,
          walletAddress: signer.address,
          nonce: await litNodeClient.getLatestBlockhash(),
          litNodeClient,
        });
    
        return await generateAuthSig({
          signer: signer,
          toSign,
        });
      },
    });

    console.log("✅ sessionSigs:", sessionSigs);
  }

  const connectSupabase = async () => {
    connect();
  }
  
  const disconnectLitNode = async () => {
    const litNodeClient = new LitNodeClient({
      litNetwork: 'cayenne',
      debug: true,
    });

    await litNodeClient.disconnect();
  }

  return (
    <div className="min-h-screen">
      <main className="container mx-auto my-8 px-4">
        <section className="text-center my-12">
          <h2 className="text-4xl font-bold mb-4">Welcome to ChainDiscourse</h2>
          <p className="text-lg text-gray-700">A decentralized platform for meaningful conversations.</p>
          <button
            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={connectingToLitNode}
          >
            {ethAddress ? ethAddress.slice(0, 5) + "..." + ethAddress.slice(37, 42) : 'Connect Wallet'}
          </button>
          <button
            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={disconnectLitNode}
          >
            Disconnect
          </button>
          <button
            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={connectSupabase}
          >
            Connect Supabase
          </button>
        </section>

        <section id="features" className="my-12">
          <h3 className="text-3xl font-bold mb-6">Features</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-bold mb-2">Decentralized Network</h4>
              <p className="text-gray-700">Enjoy secure and private conversations on our decentralized platform.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-bold mb-2">Crypto Integration</h4>
              <p className="text-gray-700">Seamless integration with your favorite cryptocurrencies.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-bold mb-2">Secure Communication</h4>
              <p className="text-gray-700">Your conversations are protected with end-to-end encryption.</p>
            </div>
          </div>
        </section>

        <section id="about" className="my-12">
          <h3 className="text-3xl font-bold mb-6">About Us</h3>
          <p className="text-gray-700 leading-relaxed">
            ChainDiscourse is built by a team of passionate developers and blockchain enthusiasts. Our mission is to provide a secure and decentralized platform for meaningful conversations. Join us on our journey to revolutionize online communication.
          </p>
        </section>
      </main>
    </div>
  );
}

export default Home;
