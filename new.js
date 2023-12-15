const { ethers } = require("ethers");
const  dotenv  = require("dotenv");
const isEqual = require('lodash/isEqual');
dotenv.config();


const infuraApiKey = process.env.INFURA_API_KEY; // Replace with your Infura API key
const walletAddress = process.env.ADDRESS; // Replace with the target Ethereum wallet address

const infuraUrl = `https://mainnet.infura.io/v3/${infuraApiKey}`;
const provider = new ethers.providers.JsonRpcProvider(infuraUrl);

const nftStorage = {}; // Stores historical ownership data (tokenAddress => previousOwners)
const transferTopic = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"//ethers.utils.id('Transfer(address,address,uint256)');



async function getNFTs() {
  const paddedWalletAddress = ethers.utils.hexZeroPad(ethers.utils.getAddress(walletAddress), 32);  // Create a filter for events where the user is the recipient
  const filterTo = {
    address: null,
    fromBlock: 0, // Start from genesis block
    toBlock: "latest",
    topics: [transferTopic, null, paddedWalletAddress, null],
  };

  const filterFrom = {
    address: null,
    fromBlock: 0, // Start from genesis block
    toBlock: "latest",
    topics: [transferTopic,paddedWalletAddress, null , null],
  };




  const logs = await provider.getLogs(filterTo);
  console.log(logs.length)

  let toNfts = [];
  for (const log of logs) {
    // console.log(log)
    const tokenAddress = log.address;
    const tokenId = log.topics[3] || undefined// Extract token ID from topic
    const newOwner = log.topics[2] || undefined;

    // console.log("newOwner", newOwner)
    // console.log("myAddress", paddedWalletAddress)

    // // Update ownership data for transferred NFTs
    // if (!nftStorage[tokenAddress]) nftStorage[tokenAddress] = [];
    // nftStorage[tokenAddress].push(paddedWalletAddress);

    // Check if currently owned by the user
    if (newOwner && newOwner.toLowerCase() === paddedWalletAddress.toLowerCase() && tokenId) {
      toNfts.push({ "tokenAddress": tokenAddress, "tokenId": tokenId });
    }
  }

  console.log("toNfts ", toNfts)

  const fromLogs = await provider.getLogs(filterFrom);
  

  let fromNfts = [];
  for (const log of fromLogs) {
    // console.log(log)
    const tokenAddress = log.address;
    const tokenId = log.topics[3] || undefined// Extract token ID from topic
    const newOwner = log.topics[2] || undefined;

    // console.log("newOwner", newOwner)
    // console.log("myAddress", paddedWalletAddress)

    // // Update ownership data for transferred NFTs
    // if (!nftStorage[tokenAddress]) nftStorage[tokenAddress] = [];
    // nftStorage[tokenAddress].push(paddedWalletAddress);

    // Check if currently owned by the user
    if (newOwner && newOwner.toLowerCase() === paddedWalletAddress.toLowerCase() && tokenId) {
      fromNfts.push({ "tokenAddress": tokenAddress, "tokenId": tokenId });
    }
  }

  const owned = findUniqueObjects(fromNfts, toNfts);

  console.log("from nfts ", toNfts)

  // // Filter out previously owned NFTs based on ownership history
  // toNfts = toNfts.filter((nft) => {
  //   const previousOwners = nftStorage[nft.tokenAddress];
  //   return !previousOwners || !previousOwners.includes(paddedWalletAddress);
  // });

  console.log(`owned NFTs for address ${walletAddress}:`);
  console.log(owned);
}
function findUniqueObjects(list1, list2) {
  const uniqueObjects = new Set();

  // Function to convert an object to a string for comparison
  const stringifyObject = (obj) => JSON.stringify(obj, Object.keys(obj).sort());

  // Add objects from list1 to the set
  list1.forEach(obj => uniqueObjects.add(stringifyObject(obj)));

  // Check and add objects from list2 that are not present in list1
  list2.forEach(obj => {
    const stringifiedObject = stringifyObject(obj);
    if (!uniqueObjects.has(stringifiedObject)) {
      uniqueObjects.add(stringifiedObject);
    } else {
      // If already present, remove from the set (to keep it unique)
      uniqueObjects.delete(stringifiedObject);
    }
  });

  // Convert the set back to an array of objects
  const result = Array.from(uniqueObjects).map(obj => JSON.parse(obj));

  return result;
}


getNFTs();
