"use client"

import { ethers } from "ethers";
import { LNR } from "@linagee/lnr-ethers";

const infuraUrl = `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`;
const provider = new ethers.providers.JsonRpcProvider(infuraUrl);
const lnr = new LNR(ethers, provider);

export async function getNames(walletAddress) {
    const names = await getAllNames(walletAddress);
    return(names)
}


async function getAllNames(nameAddress) {
    const address = await resolveOrReturn(nameAddress);
    if (!address) {
        return [];
    }

    const [unwrapped, wrapped] = await Promise.all([
        getUnwrappedNames(address),
        getWrappedNames(address),
    ]);

    console.log(unwrapped);
    console.log(wrapped);

    return unwrapped.concat(wrapped);
}

async function getWrappedNames(address) {
    const wrapperAddress = "0x2Cc8342d7c8BFf5A213eb2cdE39DE9a59b3461A7";
    const abi = [{"inputs":[{"internalType":"string","name":"_uri","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pairId","type":"uint256"},{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"bytes32","name":"namer","type":"bytes32"}],"name":"Unwrapped","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pairId","type":"uint256"},{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"bytes32","name":"namer","type":"bytes32"}],"name":"Wrapped","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"changeProxyAvail","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"changeWrapEnabled","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_name","type":"bytes32"}],"name":"createWrapper","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"nameId","type":"bytes32"}],"name":"getNameOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"idToName","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nameBytes","outputs":[{"internalType":"contract Linagee","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"nameToId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"address","name":"_param2","type":"address"},{"internalType":"bool","name":"_param3","type":"bool"}],"name":"proxySetAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"bytes32","name":"_hash","type":"bytes32"}],"name":"proxySetContent","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"address","name":"_param2","type":"address"}],"name":"proxySetSubRegistrar","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_uri","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"unwrap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"waitForWrap","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_name","type":"bytes32"}],"name":"wrap","outputs":[],"stateMutability":"nonpayable","type":"function"}]
    const contract = new ethers.Contract(wrapperAddress, abi, provider);

    const balance = (await contract.balanceOf(address)).toString();
    const tokenids = [];

    if (balance > 0) {
        const promises = [];

        for (let i = 0; i < balance; i++) {
            promises.push(handleWrappedToken(address, contract, i));
        }

        return Promise.all(promises);
    }

    return tokenids;
}

async function handleWrappedToken(address, contract, index) {
    const curId = (await contract.tokenOfOwnerByIndex(address, index)).toString();
    const curBytes = (await contract.idToName(curId)).toString();
    let curName;

    try {
        curName = (await lnr.bytes32ToString(curBytes)).toString();
        console.log(curName, "cyrr");
    } catch (e) {
        // handle the exception
    }

    const primary = undefined
    const controller = undefined

    let isValid = false;

    try {
        isValid = lnr.isNormalizedBytes(curBytes);
    } catch (e) {
        // handle the exception
    }

    return {
        address: "0x2Cc8342d7c8BFf5A213eb2cdE39DE9a59b3461A7",
        bytes: curBytes,
        name: curName + '.og',
        isValid: isValid.toString(),
        tokenId: curId,
        status: "wrapped",
        owner: address,
        primary,
        controller,
    };
}

async function getUnwrappedNames(address) {
    const gData = await loopGraph(address);
    const tokenids = [];

    if (gData && gData.length > 0) {
        const promises = gData.map(async (item) => {
            const curBytes = item.domainBytecode.toString();
            let curName;

            try {
                curName = (await lnr.bytes32ToString(curBytes)).toString();
            } catch (e) {
                curName = item.domaintoUtf8;
            }

            const primary = undefined
            const controller = undefined

            let isValid = false;

            try {
                isValid = lnr.isNormalizedBytes(curBytes);
            } catch (e) {
                // handle the exception
            }

            return {
                address: "0x5564886ca2C518d1964E5FCea4f423b41Db9F561",
                bytes: curBytes,
                name: curName + '.og',
                isValid: isValid.toString(),
                tokenId: null,
                status: "unwrapped",
                owner: address,
                primary,
                controller,
            };
        });

        return Promise.all(promises);
    }

    return tokenids;
}

export async function resolveOrReturn(nameAddress){
    let name = false;
    if(ethers.utils.isAddress(nameAddress) == true){
        //console.log("true address", nameAddress)
        return(nameAddress)
    }
    else{
        //console.log("why in here")
            try{
                const tempname = await lnr.resolveName(nameAddress);
                //console.log(tempname);
                if(ethers.utils.isAddress(tempname)){
                    name = tempname;
                }
            } catch(error){
                console.log(error)
            }

    //console.log("returning", name)
    return(name)
};
}



async function theGraph(address, offset){

    const resp = await fetch(process.env.NEXT_PUBLIC_GRAPH_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
      query {
        domains(where: {owner_contains_nocase: "${address}", registerIndex_gt: ${offset}}) {
            domainUtf8,
            domainBytecode,
            registerIndex
          }
        
    }`
      }),
    }).then((res)=>{
        return(res.json())
    })

    return(resp)
}


  async function loopGraph(address){
    const gdata=[]
    var offset = 0;
    for ( let i = 0; i>=0; i++) {
        var tokens = await theGraph(address, offset);
        console.log("tokens", tokens)
        console.log(i*100)
        if(tokens && tokens.errors == undefined){
            var resp = tokens['data']['domains'] 
            if(resp.length < 1){
                return(gdata)
            }
            console.log(resp)
            console.log('resppp', resp.slice(-1)[0].registerIndex)
            var offset = resp.slice(-1)[0].registerIndex
            console.log(offset)
            gdata.push(...resp);
           //console.log(gdata)
        } else{
            return(gdata)
        }
    }
    return(gdata)

}