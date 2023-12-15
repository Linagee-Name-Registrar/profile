import { ethers } from 'ethers';
import dotenv from 'dotenv';

dotenv.config();

const infuraApiKey = process.env.INFURA_API_KEY; // Replace with your Infura API key
const walletAddress = process.env.ADDRESS; // Replace with the target Ethereum wallet address

const infuraUrl = `https://mainnet.infura.io/v3/${infuraApiKey}`;
const provider = new ethers.providers.JsonRpcProvider(infuraUrl);

const transferTopic = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef" //ethers.utils.id('Transfer(address,address,uint256)');


async function getNFTsOwnedByAddress(walletAddress) {
  const paddedWalletAddress = ethers.utils.hexZeroPad(ethers.utils.getAddress(walletAddress), 32);

  const filterTo = {
    address: null, // No specific contract address
    fromBlock: 0,
    toBlock: 'latest',
    topics: [transferTopic, null, paddedWalletAddress, null],
  };

  const filterFrom = {
    address: null,
    fromBlock: 0,
    toBlock: 'latest',
    topics: [transferTopic, paddedWalletAddress, null],
  };

  const transfersTo = await provider.getLogs(filterTo);
  const transfersFrom = await provider.getLogs(filterFrom);

  const transferLogs = transfersTo.concat(transfersFrom);

  const uniqueNFTs = new Map();

  transferLogs.forEach((log) => {
    try {
      console.log('Raw log data:', log.data);

      // Parse the log using ethers.js parseLog method
      const parsedLog = ethers.utils.parseLog(log);
      console.log('Parsed log data:', parsedLog);

      const tokenId = parsedLog.values[2].toString();
      const contractAddress = log.address.toLowerCase();

      const key = `${contractAddress}-${tokenId}`;

      if (!uniqueNFTs.has(key)) {
        uniqueNFTs.set(key, { tokenId, contractAddress });
      }
    } catch (error) {
      console.error('Error parsing log data:', error.message);
    }
  });

  return Array.from(uniqueNFTs.values());
}

async function main() {
  try {
    const ownedNFTs = await getNFTsOwnedByAddress(walletAddress);
    console.log(`NFTs owned by address ${walletAddress}:`, ownedNFTs);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();