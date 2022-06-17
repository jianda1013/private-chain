let Web3 = require('web3');
let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const abi = require('./abi.json');
const readline = require('readline')

/*---------------------------*/
//  show admin () => (Str)
//  list user () => (Array[Str])
//  add user (Str) => (Object)
//  unlock  (Str) => (Bool)
//  get money   (Str) => (Num)
//  give money (Str, Str, Num) => (Bool)
//
//  register (Str) => (Bool)
//  parkingIn (Str) => (Str)                    // By Provider
//  parkingOut (Str) => ()
//  search_driver () => (Array[Object])
//  search_Deployer (Str) => (Array[Object])    // By Provider
//  pay () => (Bool)
/*---------------------------*/
let address;

const contract = new web3.eth.Contract(abi, '0x878EAB6e33089eA5e3D7cE570e417027535Feb7C')



function newAccounts(password) {
    return new Promise((resolve, reject) => {
        web3.eth.personal.newAccount(password, (err, address) => {
            err ? reject(err) : resolve(address)
        });
    })
}

function getAccounts() {
    return new Promise((resolve, reject) => {
        web3.eth.getAccounts((err, account) => {
            err ? reject(err) : resolve(account)
        })
    })
}

function unLock(password) {
    return new Promise((resolve, reject) => {
        web3.eth.personal.unlockAccount(address, password, 600, err => {
            err ? reject(err) : resolve(true)
        });
    })
}

async function getMoney() {
    return web3.eth.getBalance(address)
}

function giveMoney(reciever, value) {
    return new Promise((resolve, reject) => {
        web3.eth.sendTransaction({ from: address, to: reciever, value }, (err, receipt) => {
            err ? reject(err) : resolve(receipt)
        });
    })
}

function getContract() {
    return contract.options.jsonInterface
}

function approve(reciever, value) {
    return new Promise((resolve, reject) => {
        contract.methods.approve(reciever, value).send({ from: address })
            .then(result => resolve(result))
            .catch(err => reject(err))
    })
}

function transfer(reciever, value) {
    return new Promise((resolve, reject) => {
        contract.methods.transfer(reciever, value).send({ from: address })
            .then(result => { console.log(result); resolve(result) })
            .catch(err => reject(err))
    })
}


function regist(car_id) {
    return new Promise((resolve, reject) => {
        contract.methods.register(car_id).send({ from: address })
            .then(result => { console.log(result); resolve(result) })
            .catch(err => reject(err))
    })
}

function parkingIn(car_id) {
    return new Promise((resolve, reject) => {
        contract.methods.parkingIn(car_id).send({ from: address })
            .then(result => { console.log(result); resolve(result) })
            .catch(err => reject(err))
    })
}

function parkingOut(car_id) {
    return new Promise((resolve, reject) => {
        contract.methods.parkingOut(car_id).send({ from: address })
            .then(result => { console.log(result); resolve(result) })
            .catch(err => reject(err))
    })
}

function search_driver() {
    return new Promise((resolve, reject) => {
        contract.methods.search_driver().send({ from: address })
            .then(result => { console.log(result); resolve(result) })
            .catch(err => reject(err))
    })
}

function search_Deployer(car_id) {
    return new Promise((resolve, reject) => {
        contract.methods.search_Deployer(car_id).send({ from: address })
            .then(result => { console.log(result); resolve(result) })
            .catch(err => reject(err))
    })
}

function pay() {
    return new Promise((resolve, reject) => {
        contract.methods.pay().send({ from: address })
            .then(result => { console.log(result); resolve(result) })
            .catch(err => reject(err))
    })
}

function setAddress(addr) {
    address = addr;
    return true;
}


var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var waitForUserInput = function () {
    rl.question("Command: ", async (answer) => {
        let result;
        switch (answer) {
            case "exit":
                rl.close();
                break;
            case "newAccount":
                rl.question("password: ", async (password) => {
                    result = await newAccounts(password)
                    console.log(`Account Address: ${result}`);
                    waitForUserInput();
                });
                break;
            case "getAccount":
                result = await getAccounts()
                console.log(`Address List: ${result}`);
                waitForUserInput();
                break;
            // need Addr
            case "setAddr":
                rl.question("address: ", (address) => {
                    setAddress(address)
                    console.log(`Set Address: ${address}`);
                    waitForUserInput();
                });
                break;
            case "unLock":
                rl.question("password: ", async (password) => {
                    result = await unLock(password).catch(err => { return err });
                    console.log(`Unlock Address: ${result}`);
                    waitForUserInput();
                });
                break;
            case "getMoney":
                result = await getMoney()
                console.log(`Wallet Is: ${result}`);
                waitForUserInput();
                break;
            case "giveMoney":
                rl.question("reciever: ", (reciever) => {
                    rl.question("value: ", async (value) => {
                        result = await giveMoney(reciever, value).catch(err => { return err });
                        console.log(`Give Money Result: ${result}`);
                        waitForUserInput();
                    })
                })
                break;
            case "getContract":
                result = getContract()
                console.log(result);
                console.log(`Contract List: ${result}`);
                waitForUserInput();
                break;

            case "transfer":
                rl.question("reciever: ", (reciever) => {
                    rl.question("value: ", async (value) => {
                        result = await transfer(reciever, value).catch(err => { return err });
                        console.log(`Transfer Money Result: ${result}`);
                        waitForUserInput();
                    })
                })
                break;

            case "approve":
                rl.question("reciever: ", (reciever) => {
                    rl.question("value: ", async (value) => {
                        result = await approve(reciever, value).catch(err => { return err });
                        console.log(`Approve Money Result: ${result}`);
                        waitForUserInput();
                    })
                })
                break;
            case "regist":
                rl.question("Car ID: ", async (car_id) => {
                    result = await regist(car_id).catch(err => { return err });
                    console.log(`Car Regist: ${result}`);
                    waitForUserInput();
                });
                break;
            case "parkingIn":
                rl.question("Car ID: ", async (car_id) => {
                    result = await parkingIn(car_id).catch(err => { return err });
                    console.log(`Parking in: ${result}`);
                    waitForUserInput();
                });
                break;
            case "parkingOut":
                rl.question("Car ID: ", async (car_id) => {
                    result = await parkingOut(car_id).catch(err => { return err });
                    console.log(`Parking in: ${result}`);
                    waitForUserInput();
                });
                break;
            case "searchDriver":
                result = await search_driver()
                console.log(`Driver List: ${result}`);
                waitForUserInput();
                break;
            case "searchDeployer":
                rl.question("Car ID: ", async (car_id) => {
                    result = await search_Deployer(car_id).catch(err => { return err });
                    console.log(`Parking in: ${result}`);
                    waitForUserInput();
                });
                break;
            case "pay":
                result = await pay()
                console.log(`Pay: ${result}`);
                waitForUserInput();
                break;
            default:
                console.log('==')
                waitForUserInput();
                break;
        }
    });
}

waitForUserInput();