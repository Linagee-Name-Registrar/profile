"use client"

import { ethers } from "ethers";
import { LNR } from "@linagee/lnr-ethers";


const infuraUrl = `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`;
const provider = new ethers.providers.JsonRpcProvider(infuraUrl);


export async function fetchNFTs(walletAddress, page) {
  const nfts = await getNFTsNoPages(walletAddress);
  //const nfts = await getNFTs(walletAddress, page);
  const nftDetails = await getAllNFTDetails(nfts);
  return(nftDetails);
}

async function getNFTsNoPages(userAddress) {
  const paddedUserAddress = ethers.utils.hexZeroPad(ethers.utils.getAddress(userAddress), 32);
  // console.log("paddedUserAddress", paddedUserAddress)
  if(parseInt(paddedUserAddress) == "0x0000000000000000000000000000000000000000000000000000000000000000"){
    return [];
  }


  const transferTopic = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";

  const filterTo = {
    address: null,
    fromBlock: 0,
    toBlock: "latest",
    topics: [transferTopic, null, paddedUserAddress, null],
  };

  const filterFrom = {
    address: null,
    fromBlock: 0,
    toBlock: "latest",
    topics: [transferTopic, paddedUserAddress, null, null],
  };

  const allLogs = [];

  const [logsTo, logsFrom] = await Promise.all([
    provider.getLogs(filterTo),
    provider.getLogs(filterFrom),
  ]);

  allLogs.push(...logsTo, ...logsFrom);


  const uniqueNFTs = findUniqueNFTs(allLogs);
  const formattedNFTs = formatResult(uniqueNFTs);

  // console.log(`Unique NFTs owned by address ${userAddress}:`);
  // console.log(formattedNFTs);
  return formattedNFTs;
}


async function getNFTs(userAddress, page) {
  // console.log("arguments", userAddress, page)
  const blocksPerPage = 100000;
  let startBlock, endBlock;

  if (page === 1) {
    startBlock = 0;
    endBlock = blocksPerPage;
  } else {
    startBlock = (page - 1) * blocksPerPage;
    endBlock = page * blocksPerPage;
  }

  const paddedUserAddress = ethers.utils.hexZeroPad(ethers.utils.getAddress(userAddress), 32);

  const latestBlock = await provider.getBlockNumber();

  const transferTopic = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";

  const filterTo = {
    address: null,
    fromBlock: latestBlock - endBlock,
    toBlock: latestBlock - startBlock,
    topics: [transferTopic, null, paddedUserAddress, null],
  };

  const filterFrom = {
    address: null,
    fromBlock: latestBlock - endBlock,
    toBlock: latestBlock - startBlock,
    topics: [transferTopic, paddedUserAddress, null, null],
  };

  const allLogs = [];
  let currentBlock = latestBlock - startBlock;

  while (currentBlock > 0 && currentBlock >= latestBlock - endBlock) {
    filterTo.fromBlock = currentBlock - blocksPerPage;
    filterTo.toBlock = currentBlock;

    filterFrom.fromBlock = currentBlock - blocksPerPage;
    filterFrom.toBlock = currentBlock;

    const [logsTo, logsFrom] = await Promise.all([
      provider.getLogs(filterTo),
      provider.getLogs(filterFrom),
    ]);

    // console.log("lengths to from", logsTo.length, logsFrom.length)

    allLogs.push(...logsTo, ...logsFrom);

    if (logsTo.length === 0 && logsFrom.length === 0) {
      break;
    }

    currentBlock -= blocksPerPage;
  }

  const uniqueNFTs = findUniqueNFTs(allLogs);
  const formattedNFTs = formatResult(uniqueNFTs);

  // console.log(`Unique NFTs owned by address ${userAddress} (Page ${page}):`);
  // console.log(formattedNFTs);
  return formattedNFTs;
}


function findUniqueNFTs(allLogs) {
    const countMap = {};
  
    for (const log of allLogs) {
      if (log.topics[3] !== undefined) {
        const key = `${log.address}_${log.topics[3]}`;
        countMap[key] = (countMap[key] || 0) + 1;
      }
    }
  
    const uniqueNFTs = allLogs.filter(log => {
      if (log.topics[3] !== undefined) {
        const key = `${log.address}_${log.topics[3]}`;
        return countMap[key] % 2 === 1;
      }
      return false;
    });
  
    return uniqueNFTs;
  }


async function getNFTDetails(nft) {
  const abi = [{"inputs":[{"internalType":"address","name":"_renderer","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"MAX_TOTAL_SUPPLY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SECS_IN_DAY","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"amount","type":"uint8"},{"internalType":"bytes32[]","name":"proof","type":"bytes32[]"}],"name":"allowlistMint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"allowlistSaleIsActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"allowlistTokensPerAddress","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"allowlistedMints","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"chaosStates","outputs":[{"internalType":"uint64","name":"anchorTimestamp","type":"uint64"},{"internalType":"uint64","name":"setDay","type":"uint64"},{"internalType":"uint128","name":"rand","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getEntropy","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"merkleTx","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mint_price","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint64","name":"_number","type":"uint64"}],"name":"observe","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"amount","type":"uint8"}],"name":"publicMint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"publicMints","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"publicSaleIsActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"publicTokensPerAddress","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renderer","outputs":[{"internalType":"contract ChaosRoadsRenderer","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"amount","type":"uint8"}],"name":"reserveMint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_allowlistSaleIsActive","type":"bool"},{"internalType":"bool","name":"_publicSaleIsActive","type":"bool"}],"name":"setAllowlistAndPublicSale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"merkleRoot","type":"bytes32"}],"name":"setAllowlistMerkleRoot","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"tokensPerAddress","type":"uint8"}],"name":"setMaxMintsPerAllowlistedAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"tokensPerAddress","type":"uint8"}],"name":"setMaxMintsPerPublicAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_merkleTx","type":"bytes32"}],"name":"setMerkleTx","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
  const contract = new ethers.Contract(nft.address, abi, provider);

  try {
    const contractName = await contract.name();
    const tokenUri = await contract.tokenURI(nft.tokenId);

    return {
      ...nft,
      contractName,
      tokenUri,
    };
  } catch (error) {
    console.error(`Error getting details for NFT: ${error.message}`);
    return null;
  }
}

async function getAllNFTDetails(nfts) {
  const detailsPromises = nfts.map(nft => getNFTDetails(nft));
  const details = await Promise.all(detailsPromises);

  // Filter out null values (failed requests)
  return details.filter(detail => detail !== null);
}

function formatResult(nfts) {
  return nfts
    .map(log => {
      const utf8Value = parseInt(log.topics[3].slice(2), 16).toString();
      return {
        address: log.address,
        tokenId: parseInt(utf8Value),
      };
    })
    .filter(nft => nft.address !== '0x2Cc8342d7c8BFf5A213eb2cdE39DE9a59b3461A7');
}
