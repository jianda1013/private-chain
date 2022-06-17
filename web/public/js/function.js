let url = 'http://localhost:8545'
let id = 1;


function request(method, ){

}

function regist() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url,
            type: "POST",
            data: JSON.stringify({
                "jsonrpc": "2.0",
                "id": id++,
                "method": "eth_accounts",
                "params": []
            }),
            contentType: "application/json",
            dataType: "json",
            success: (re) => {
                resolve(re.msg);
            },
            err: (er) => {
                console.log(er)
            }
        })
    })
}