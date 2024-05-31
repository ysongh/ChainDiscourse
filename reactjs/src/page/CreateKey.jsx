import { useState } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import lighthouse from '@lighthouse-web3/sdk';

function CreateKey() {
  const [apikey, setapikey] = useState('');

  const signAuthMessage = async(signer, verificationMessage) =>{
    const signedMessage = await signer.signMessage(verificationMessage)
    return(signedMessage)
  }
  
  const getApiKey = async() =>{
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    console.log(signer);
    const verificationMessage = (
      await axios.get(
          `https://api.lighthouse.storage/api/auth/get_message?publicKey=${accounts[0]}`
      )
    ).data;
    const signedMessage = await signAuthMessage(signer, verificationMessage);
    const response = await lighthouse.getApiKey(accounts[0], signedMessage);
    console.log(response);
    setapikey(response.data.apiKey);
  }
  return (
    <div>
      <button onClick={getApiKey}>
        Get Api Key
      </button>
      <p>{apikey}</p>
    </div>
  )
}

export default CreateKey