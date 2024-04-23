const TronWeb = require('tronweb');

tronWeb = new TronWeb(new TronWeb.providers.HttpProvider("https://api.trongrid.io"), new TronWeb.providers.HttpProvider("https://api.trongrid.io"), new TronWeb.providers.HttpProvider("https://api.trongrid.io"));

async function generate() {
    const account = await tronWeb.createAccount();
    console.log(account.privateKey, account.address.base58);
}

async function transferUSDT() {
    key = process.argv[2];
    from = process.argv[3];
    to = process.argv[4];
    amount = process.argv[5];
    console.log(`Transferring USDT key: ${key}, from: ${from}, to: ${to}, amount: ${amount}`);

    try {
        await tronWeb.setPrivateKey(key);
	const contractInstance = await this.tronWeb.contract().at("TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t");

        let txid = await contractInstance.transfer(to, amount*1000000).send({
            "feeLimit": 30000000,
            "call_value": 0,
            "owner_address": from
	});
	console.log(txid);
    } catch (e) {
        console.log(e);
    }
}

async function transferTRX() {
    key = process.argv[2];
    from = process.argv[3];
    to = process.argv[4];
    amount = process.argv[5];
    
    console.log(`Transferring TRX key: ${key}, from: ${from}, to: ${to}, amount: ${amount}`);
    try {
        await tronWeb.setPrivateKey(key);
        let txid = await tronWeb.trx.sendTransaction(to, amount*1000000, key);
	console.log(txid);
    } catch (e) {
        console.log(e);
    }
}

//generate();
transferUSDT();
//transferTRX();
