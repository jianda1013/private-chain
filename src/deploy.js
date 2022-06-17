let Web3 = require('web3')
let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const abi = require('./abi.json');
const bytecode = require('./bytecode.json');

var newContract = new web3.eth.Contract(abi);
let sdata = newContract.deploy({
	data: '0x' + bytecode.object,
	arguments: ["parkcoin", "parkcoin", 10000000, 100, 1, 20]
}).encodeABI();


async function deployContract() {
	// wait 10 sec for first block mine to get fund
	await new Promise(resolve => setInterval(resolve, 10000));

	let receipt = await web3.eth.sendTransaction({
		from: '0x72120D4950a83Fa0Ab3bA910C4469f975badFBD2',
		data: sdata // deploying a contracrt
	}).catch(err => { throw err });

	console.log(receipt);
	return receipt.contractAddress;
}


deployContract().catch(err => console.log(err));

