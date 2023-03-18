import React from "react";
import "./App.css";
import CrowdFunding from "./CrowdFunding";
import useEthers from "./hooks/useEthers";

const contractAddress = "0x0d1E499faD787d8F2AAb77b43cB217df8d6b11dC";
const contractABI = [
  {
    "type": "function",
    "name": "campaigns",
    "inputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "type": "address",
        "name": "owner",
        "internalType": "address"
      },
      {
        "type": "string",
        "name": "title",
        "internalType": "string"
      },
      {
        "type": "string",
        "name": "description",
        "internalType": "string"
      },
      {
        "type": "uint256",
        "name": "target",
        "internalType": "uint256"
      },
      {
        "type": "uint256",
        "name": "deadline",
        "internalType": "uint256"
      },
      {
        "type": "uint256",
        "name": "amountCollected",
        "internalType": "uint256"
      },
      {
        "type": "string",
        "name": "image",
        "internalType": "string"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "createCampaign",
    "inputs": [
      {
        "type": "address",
        "name": "_owner",
        "internalType": "address"
      },
      {
        "type": "string",
        "name": "_title",
        "internalType": "string"
      },
      {
        "type": "string",
        "name": "_description",
        "internalType": "string"
      },
      {
        "type": "uint256",
        "name": "_target",
        "internalType": "uint256"
      },
      {
        "type": "uint256",
        "name": "_deadline",
        "internalType": "uint256"
      },
      {
        "type": "string",
        "name": "_image",
        "internalType": "string"
      }
    ],
    "outputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "donateToCampaign",
    "inputs": [
      {
        "type": "uint256",
        "name": "_id",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "getCampaigns",
    "inputs": [],
    "outputs": [
      {
        "type": "tuple[]",
        "name": "",
        "components": [
          {
            "type": "address",
            "name": "owner",
            "internalType": "address"
          },
          {
            "type": "string",
            "name": "title",
            "internalType": "string"
          },
          {
            "type": "string",
            "name": "description",
            "internalType": "string"
          },
          {
            "type": "uint256",
            "name": "target",
            "internalType": "uint256"
          },
          {
            "type": "uint256",
            "name": "deadline",
            "internalType": "uint256"
          },
          {
            "type": "uint256",
            "name": "amountCollected",
            "internalType": "uint256"
          },
          {
            "type": "string",
            "name": "image",
            "internalType": "string"
          },
          {
            "type": "address[]",
            "name": "donators",
            "internalType": "address[]"
          },
          {
            "type": "uint256[]",
            "name": "donations",
            "internalType": "uint256[]"
          }
        ],
        "internalType": "struct CrowdFunding.Campaign[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getDonators",
    "inputs": [
      {
        "type": "uint256",
        "name": "_id",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "type": "address[]",
        "name": "",
        "internalType": "address[]"
      },
      {
        "type": "uint256[]",
        "name": "",
        "internalType": "uint256[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "numberOfCampaigns",
    "inputs": [],
    "outputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  }
];

function App() {
  const { signer, provider, isConnected, connect } = useEthers();

  return (
    <div className="App">
      {!isConnected ? (
        <button onClick={connect}>Connecter avec MetaMask</button>
      ) : (
        <CrowdFunding
          signer={signer}
          provider={provider}
          contractAddress={contractAddress}
          contractABI={contractABI}
        />
      )}
    </div>
  );
}

export default App;
