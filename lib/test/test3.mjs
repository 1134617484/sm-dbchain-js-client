import * as dbchain from '../dbchain-js-client'
console.log(dbchain)

let test = (num) => {
    let arr = []
    for (let index = 0; index < num; index++) {
        let mnemonic = dbchain.newMnemonic();
        let key = dbchain.createAndStoreKey(mnemonic, '123456')
        arr.length = {
            key,
            mnemonic
        }
    }
}


test(100)