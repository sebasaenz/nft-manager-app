export default
[
    {
        "type": "function",
        "stateMutability": "view",
        "payable": false,
        "outputs": [
            {
                "type": "bool",
                "name": ""
            }
        ],
        "name": "supportsInterface",
        "inputs": [
            {
                "type": "bytes4",
                "name": "_interfaceId"
            }
        ],
        "constant": true
    },
    {
        "type": "function",
        "stateMutability": "nonpayable",
        "payable": false,
        "outputs": [],
        "name": "setCloneFeePercentage",
        "inputs": [
            {
                "type": "uint256",
                "name": "_cloneFeePercentage"
            }
        ],
        "constant": false
    },
    {
        "type": "function",
        "stateMutability": "view",
        "payable": false,
        "outputs": [
            {
                "type": "string",
                "name": ""
            }
        ],
        "name": "name",
        "inputs": [],
        "constant": true
    },
    {
        "type": "function",
        "stateMutability": "view",
        "payable": false,
        "outputs": [
            {
                "type": "address",
                "name": ""
            }
        ],
        "name": "getApproved",
        "inputs": [
            {
                "type": "uint256",
                "name": "_tokenId"
            }
        ],
        "constant": true
    },
    {
        "type": "function",
        "stateMutability": "nonpayable",
        "payable": false,
        "outputs": [],
        "name": "approve",
        "inputs": [
            {
                "type": "address",
                "name": "_to"
            },
            {
                "type": "uint256",
                "name": "_tokenId"
            }
        ],
        "constant": false
    },
    {
        "type": "function",
        "stateMutability": "view",
        "payable": false,
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ],
        "name": "cloneFeePercentage",
        "inputs": [],
        "constant": true
    },
    {
        "type": "function",
        "stateMutability": "nonpayable",
        "payable": false,
        "outputs": [],
        "name": "setTokenURI",
        "inputs": [
            {
                "type": "uint256",
                "name": "_tokenId"
            },
            {
                "type": "string",
                "name": "_tokenURI"
            }
        ],
        "constant": false
    },
    {
        "type": "function",
        "stateMutability": "view",
        "payable": false,
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ],
        "name": "totalSupply",
        "inputs": [],
        "constant": true
    },
    {
        "type": "function",
        "stateMutability": "view",
        "payable": false,
        "outputs": [
            {
                "type": "bytes4",
                "name": ""
            }
        ],
        "name": "InterfaceId_ERC165",
        "inputs": [],
        "constant": true
    },
    {
        "type": "function",
        "stateMutability": "nonpayable",
        "payable": false,
        "outputs": [],
        "name": "transferFrom",
        "inputs": [
            {
                "type": "address",
                "name": "_from"
            },
            {
                "type": "address",
                "name": "_to"
            },
            {
                "type": "uint256",
                "name": "_tokenId"
            }
        ],
        "constant": false
    },
    {
        "type": "function",
        "stateMutability": "nonpayable",
        "payable": false,
        "outputs": [],
        "name": "setMintable",
        "inputs": [
            {
                "type": "bool",
                "name": "_isMintable"
            }
        ],
        "constant": false
    },
    {
        "type": "function",
        "stateMutability": "view",
        "payable": false,
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ],
        "name": "tokenOfOwnerByIndex",
        "inputs": [
            {
                "type": "address",
                "name": "_owner"
            },
            {
                "type": "uint256",
                "name": "_index"
            }
        ],
        "constant": true
    },
    {
        "type": "function",
        "stateMutability": "nonpayable",
        "payable": false,
        "outputs": [],
        "name": "safeTransferFrom",
        "inputs": [
            {
                "type": "address",
                "name": "_from"
            },
            {
                "type": "address",
                "name": "_to"
            },
            {
                "type": "uint256",
                "name": "_tokenId"
            }
        ],
        "constant": false
    },
    {
        "type": "function",
        "stateMutability": "view",
        "payable": false,
        "outputs": [
            {
                "type": "bool",
                "name": ""
            }
        ],
        "name": "isMintable",
        "inputs": [],
        "constant": true
    },
    {
        "type": "function",
        "stateMutability": "view",
        "payable": false,
        "outputs": [
            {
                "type": "bool",
                "name": ""
            }
        ],
        "name": "exists",
        "inputs": [
            {
                "type": "uint256",
                "name": "_tokenId"
            }
        ],
        "constant": true
    },
    {
        "type": "function",
        "stateMutability": "view",
        "payable": false,
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ],
        "name": "tokenByIndex",
        "inputs": [
            {
                "type": "uint256",
                "name": "_index"
            }
        ],
        "constant": true
    },
    {
        "type": "function",
        "stateMutability": "view",
        "payable": false,
        "outputs": [
            {
                "type": "address",
                "name": ""
            }
        ],
        "name": "ownerOf",
        "inputs": [
            {
                "type": "uint256",
                "name": "_tokenId"
            }
        ],
        "constant": true
    },
    {
        "type": "function",
        "stateMutability": "view",
        "payable": false,
        "outputs": [
            {
                "type": "uint256",
                "name": "priceFinney"
            },
            {
                "type": "uint256",
                "name": "numClonesAllowed"
            },
            {
                "type": "uint256",
                "name": "numClonesInWild"
            },
            {
                "type": "uint256",
                "name": "clonedFromId"
            }
        ],
        "name": "getKudosById",
        "inputs": [
            {
                "type": "uint256",
                "name": "_tokenId"
            }
        ],
        "constant": true
    },
    {
        "type": "function",
        "stateMutability": "view",
        "payable": false,
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ],
        "name": "balanceOf",
        "inputs": [
            {
                "type": "address",
                "name": "_owner"
            }
        ],
        "constant": true
    },
    {
        "type": "function",
        "stateMutability": "nonpayable",
        "payable": false,
        "outputs": [],
        "name": "renounceOwnership",
        "inputs": [],
        "constant": false
    },
    {
        "type": "function",
        "stateMutability": "view",
        "payable": false,
        "outputs": [
            {
                "type": "uint256",
                "name": "priceFinney"
            },
            {
                "type": "uint256",
                "name": "numClonesAllowed"
            },
            {
                "type": "uint256",
                "name": "numClonesInWild"
            },
            {
                "type": "uint256",
                "name": "clonedFromId"
            }
        ],
        "name": "kudos",
        "inputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ],
        "constant": true
    },
    {
        "type": "function",
        "stateMutability": "view",
        "payable": false,
        "outputs": [
            {
                "type": "address",
                "name": ""
            }
        ],
        "name": "owner",
        "inputs": [],
        "constant": true
    },
    {
        "type": "function",
        "stateMutability": "view",
        "payable": false,
        "outputs": [
            {
                "type": "string",
                "name": ""
            }
        ],
        "name": "symbol",
        "inputs": [],
        "constant": true
    },
    {
        "type": "function",
        "stateMutability": "nonpayable",
        "payable": false,
        "outputs": [],
        "name": "burn",
        "inputs": [
            {
                "type": "address",
                "name": "_owner"
            },
            {
                "type": "uint256",
                "name": "_tokenId"
            }
        ],
        "constant": false
    },
    {
        "type": "function",
        "stateMutability": "nonpayable",
        "payable": false,
        "outputs": [],
        "name": "setApprovalForAll",
        "inputs": [
            {
                "type": "address",
                "name": "_to"
            },
            {
                "type": "bool",
                "name": "_approved"
            }
        ],
        "constant": false
    },
    {
        "type": "function",
        "stateMutability": "nonpayable",
        "payable": false,
        "outputs": [],
        "name": "safeTransferFrom",
        "inputs": [
            {
                "type": "address",
                "name": "_from"
            },
            {
                "type": "address",
                "name": "_to"
            },
            {
                "type": "uint256",
                "name": "_tokenId"
            },
            {
                "type": "bytes",
                "name": "_data"
            }
        ],
        "constant": false
    },
    {
        "type": "function",
        "stateMutability": "nonpayable",
        "payable": false,
        "outputs": [
            {
                "type": "uint256",
                "name": "tokenId"
            }
        ],
        "name": "mint",
        "inputs": [
            {
                "type": "address",
                "name": "_to"
            },
            {
                "type": "uint256",
                "name": "_priceFinney"
            },
            {
                "type": "uint256",
                "name": "_numClonesAllowed"
            },
            {
                "type": "string",
                "name": "_tokenURI"
            }
        ],
        "constant": false
    },
    {
        "type": "function",
        "stateMutability": "view",
        "payable": false,
        "outputs": [
            {
                "type": "string",
                "name": ""
            }
        ],
        "name": "tokenURI",
        "inputs": [
            {
                "type": "uint256",
                "name": "_tokenId"
            }
        ],
        "constant": true
    },
    {
        "type": "function",
        "stateMutability": "view",
        "payable": false,
        "outputs": [
            {
                "type": "bool",
                "name": ""
            }
        ],
        "name": "isApprovedForAll",
        "inputs": [
            {
                "type": "address",
                "name": "_owner"
            },
            {
                "type": "address",
                "name": "_operator"
            }
        ],
        "constant": true
    },
    {
        "type": "function",
        "stateMutability": "payable",
        "payable": true,
        "outputs": [],
        "name": "clone",
        "inputs": [
            {
                "type": "address",
                "name": "_to"
            },
            {
                "type": "uint256",
                "name": "_tokenId"
            },
            {
                "type": "uint256",
                "name": "_numClonesRequested"
            }
        ],
        "constant": false
    },
    {
        "type": "function",
        "stateMutability": "view",
        "payable": false,
        "outputs": [
            {
                "type": "uint256",
                "name": "tokenId"
            }
        ],
        "name": "getLatestId",
        "inputs": [],
        "constant": true
    },
    {
        "type": "function",
        "stateMutability": "nonpayable",
        "payable": false,
        "outputs": [],
        "name": "transferOwnership",
        "inputs": [
            {
                "type": "address",
                "name": "_newOwner"
            }
        ],
        "constant": false
    },
    {
        "type": "function",
        "stateMutability": "nonpayable",
        "payable": false,
        "outputs": [],
        "name": "setPrice",
        "inputs": [
            {
                "type": "uint256",
                "name": "_tokenId"
            },
            {
                "type": "uint256",
                "name": "_newPriceFinney"
            }
        ],
        "constant": false
    },
    {
        "type": "function",
        "stateMutability": "view",
        "payable": false,
        "outputs": [
            {
                "type": "uint256",
                "name": "numClonesInWild"
            }
        ],
        "name": "getNumClonesInWild",
        "inputs": [
            {
                "type": "uint256",
                "name": "_tokenId"
            }
        ],
        "constant": true
    },
    {
        "type": "constructor",
        "stateMutability": "nonpayable",
        "payable": false,
        "inputs": []
    },
    {
        "type": "event",
        "name": "OwnershipRenounced",
        "inputs": [
            {
                "type": "address",
                "name": "previousOwner",
                "indexed": true
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "OwnershipTransferred",
        "inputs": [
            {
                "type": "address",
                "name": "previousOwner",
                "indexed": true
            },
            {
                "type": "address",
                "name": "newOwner",
                "indexed": true
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Transfer",
        "inputs": [
            {
                "type": "address",
                "name": "_from",
                "indexed": true
            },
            {
                "type": "address",
                "name": "_to",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "_tokenId",
                "indexed": true
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Approval",
        "inputs": [
            {
                "type": "address",
                "name": "_owner",
                "indexed": true
            },
            {
                "type": "address",
                "name": "_approved",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "_tokenId",
                "indexed": true
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ApprovalForAll",
        "inputs": [
            {
                "type": "address",
                "name": "_owner",
                "indexed": true
            },
            {
                "type": "address",
                "name": "_operator",
                "indexed": true
            },
            {
                "type": "bool",
                "name": "_approved",
                "indexed": false
            }
        ],
        "anonymous": false
    }
]