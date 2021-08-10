import * as dbchain from '../index.js'
var test01 = require( "../dbchain-js-client.js" );
console.log(test01)
let addlog=(msg)=>{
    return dbchain.addlog(msg)
}

console.log(dbchain)
console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
// dbchain.setConfig({baseUrl:'http://192.168.0.18/relay',chainId:'testnet'})
// dbchain.getConfig()

dbchain.setConfig({baseUrl:'http://192.168.0.18/relay',chainId:'testnet'})
console.log('lowdb================='+dbchain.getConfig())

// 创建助记词
addlog('创建助记词开始');
let mnemonic=dbchain.newMnemonic()
console.log('创建助记词结束:===='+mnemonic)
addlog('创建助记词结束:===='+mnemonic)
// 设置密码
addlog('设置密码')
dbchain.savePassphrase('123456')
addlog('设置密码结束:====')
console.log('getConfig======'+dbchain.getConfig())

addlog('当前config:===='+JSON.stringify(dbchain.getConfig()))


// // 查询密码
// addlog('查询密码')
// let password=dbchain.getPassphrase('123456')
// addlog('查询密码结束:===='+password)

// //创建库
// dbchain.createAndStoreKey 

