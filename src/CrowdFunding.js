import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { formatEther } from "@ethersproject/units";

const CrowdFunding = ({ signer, provider, contractAddress, contractABI }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [contract, setContract] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    if (signer) {
      setAddress(signer.getAddress());
    }
    if (provider) {
      const newContract = new Contract(contractAddress, contractABI, provider);
      setContract(newContract);
    }
  }, [signer, provider, contractAddress, contractABI]);

  useEffect(() => {
    if (contract) {
      loadCampaigns();
    }
  }, [contract]);

  const loadCampaigns = async () => {
    if (contract) {
      try {
        const campaignsArray = await contract.getCampaigns();
        setCampaigns(campaignsArray);
      } catch (err) {
        console.error("Error loading campaigns:", err);
      }
    }
  };

  const createCampaign = async (
    title,
    description,
    target,
    deadline,
    image
  ) => {
    if (signer && contract) {
      try {
        const weiTarget = ethers.utils.parseEther(target.toString());
        const timestamp = new Date(deadline).getTime() / 1000;
        const tx = await contract.connect(signer).createCampaign(
          address,
          title,
          description,
          weiTarget,
          timestamp,
          image
        );
        await tx.wait();
        loadCampaigns();
      } catch (err) {
        console.error("Error creating campaign:", err);
      }
    }
  };

  const donateToCampaign = async (campaignId, donationAmount) => {
    if (signer && contract) {
      try {
        const weiDonationAmount = ethers.utils.parseEther(
          donationAmount.toString()
        );
        const tx = await contract
          .connect(signer)
          .donateToCampaign(campaignId, { value: weiDonationAmount });
        await tx.wait();
        loadCampaigns();
      } catch (err) {
        console.error("Error donating to campaign:", err);
      }
    }
  };

  const displayCampaigns = () => {
    return campaigns.map((campaign, index) => {
      return (
        <div key={index}>
          <h2>{campaign.title}</h2>
          <p>{campaign.description}</p>
          <p>
            Amount collected: {formatEther(campaign.amountCollected)} /{" "}
            {formatEther(campaign.target)} ETH
          </p>
          <input
            type="number"
            placeholder="Donation amount (ETH)"
            onChange={(e) =>
              setDonations((prevDonations) => ({
                ...prevDonations,
                [index]: e.target.value,
              }))
            }
          />
          <button onClick={() => donateToCampaign(index, donations[index])}>
            Donate
          </button>
        </div>
      );
    });
  };

  const [newCampaign, setNewCampaign] = useState({
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });

  const [donations, setDonations] = useState({});

  return (
    <div>
      <h1>Create a new campaign</h1>
      <input
        type="text"
        placeholder="Title"
        value={newCampaign.title}
        onChange={(e) =>
          setNewCampaign({ ...newCampaign, title: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Description"
        value={newCampaign.description}
        onChange={(e) =>
          setNewCampaign({ ...newCampaign, description: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Target (ETH)"
        value={newCampaign.target}
        onChange={(e) =>
          setNewCampaign({ ...newCampaign, target: e.target.value })
        }
      />
      <input
        type="date"
        placeholder="Deadline"
        value={newCampaign.deadline}
        onChange={(e) =>
          setNewCampaign({ ...newCampaign, deadline: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Image URL"
        value={newCampaign.image}
        onChange={(e) =>
          setNewCampaign({ ...newCampaign, image: e.target.value })
        }
      />
      <button
        onClick={() =>
          createCampaign(
            newCampaign.title,
            newCampaign.description,
            newCampaign.target,
            newCampaign.deadline,
            newCampaign.image
          )
        }
      >
        Create Campaign
      </button>

      <h1>All Campaigns</h1>
      {displayCampaigns()}
    </div>
  );
};

export default CrowdFunding;

