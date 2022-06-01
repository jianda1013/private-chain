// const EthereumTx = require('ethereumjs-tx').Transaction

let Web3 = require('web3')

let web3 = new Web3("http://127.0.0.1:8545");

var myContract = new web3.eth.Contract(
	[
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "name_",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "symbol_",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "initialSupply",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "parkingLots",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "perHalfHour_",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "MaximumInOneday_",
					"type": "uint256"
				}
			],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "owner",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "spender",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "Approval",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "from",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "to",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "Transfer",
			"type": "event"
		},
		{
			"inputs": [],
			"name": "MaximumInOneday",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_owner",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "_spender",
					"type": "address"
				}
			],
			"name": "allowance",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "spender",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "_value",
					"type": "uint256"
				}
			],
			"name": "approve",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_account",
					"type": "address"
				}
			],
			"name": "balanceOf",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "_license",
					"type": "string"
				}
			],
			"name": "checkStatus",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "decimals",
			"outputs": [
				{
					"internalType": "uint8",
					"name": "",
					"type": "uint8"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_address",
					"type": "address"
				}
			],
			"name": "getInfoIn",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_address",
					"type": "address"
				}
			],
			"name": "getInfoOut",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getOut",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "len",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "name",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "_license",
					"type": "string"
				}
			],
			"name": "parkingIn",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "parkingLotOwner",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "parkingOut",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "perHalfHour",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "_license",
					"type": "string"
				}
			],
			"name": "register",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "remainingLots",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "search",
			"outputs": [
				{
					"components": [
						{
							"internalType": "uint256",
							"name": "timeEnter",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "timeOut",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "dollars",
							"type": "uint256"
						},
						{
							"internalType": "bool",
							"name": "pay",
							"type": "bool"
						}
					],
					"internalType": "struct ParkingChain.Payment[]",
					"name": "",
					"type": "tuple[]"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "symbol",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "totalLots",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "totalSupply",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_to",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "_value",
					"type": "uint256"
				}
			],
			"name": "transfer",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_from",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "_to",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "_value",
					"type": "uint256"
				}
			],
			"name": "transferFrom",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		}
	]
);

myContract.options.address = '0x367BA4161Ec5ce38612b0ab3964bB5A64EC8d591'

//post

// myContract.methods.writeData('666').send({from: '0xb77C4F4A93a17D73aDcBF93191A399a4Ca69E72C'})
// .then(function(receipt){
//     // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
//     console.log(receipt);
// });


//get

myContract.methods.search().call({from: '0x8FDda5E85f1139cD69018F573eC7E4ab2055a196'})
.then(function(receipt){
    // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
    console.log(receipt);
});
