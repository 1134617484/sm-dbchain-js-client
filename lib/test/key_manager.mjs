import * as dbchain from '../index.js'
// import * as dbchain from '../../dist/js/dbchain-js-client.js'
// let dbchain = require('../../dist/js/dbchain-js-client.js')
// let dbchain = require('../index.js')
let setBaseInfo=async (baseUrl='http://192.168.0.18/relay',chainId='testnet')=>{
    let ischain =await dbchain.detectChain(baseUrl,chainId)
    console.log('是否可以查看base信息'+JSON.stringify(ischain))
    if(!ischain.status){
        return console.error('访参访问失败')
    }
    dbchain.setConfig({baseUrl,chainId})
}
// 创建助记词
let mnemonic=dbchain.newMnemonic()
console.log('创建助记词结束:===='+mnemonic)
//验证助记词
console.log('验证助记词：==='+dbchain.validateMnemonic(mnemonic))
console.log('config0======='+JSON.stringify(dbchain.getConfig()))

//生成账号信息

let setUserInfo=(mnemonic='',passphrase='123456')=>{
    console.log(`助记词：${mnemonic},密码：${passphrase};生成账号信息===`)
    if(!dbchain.validateMnemonic(mnemonic)){
        return  console.log('助记词不合法')
    }
    dbchain.createAndStoreKey(mnemonic,passphrase)
    // console.log('生成地址成功')
    // console.log('config1======='+JSON.stringify(dbchain.getConfig()))
    //删除密码
    // dbchain.removePassphrase()
    // 设置密码
    
    dbchain.savePassphrase('123456')
    console.log('设置密码结束')
    console.log('config2======='+JSON.stringify(dbchain.getConfig()))
    // 查询密码
    
    let pwd=dbchain.getPassphrase()
    console.log('查询密码结束:===='+pwd)
    
    // 是否有密码
    console.log('是否有账号信息'+dbchain.hasKey())
    
    // 是否有密码
    console.log('是否有密码'+dbchain.hasPassphrase())
    
    // 获取私钥
    console.log('我的私钥=-==='+dbchain.getPrivKey())
    // 获取公钥
    console.log('我的公钥=-==='+dbchain.getPubKey())
    // 获取地址
    console.log('我的地址=-==='+dbchain.getAddress())
    console.log('userInfo======='+JSON.stringify(dbchain.getConfig()))
    //获取积分
    console.log('获取积分=-==='+dbchain.getAddress())
}
setBaseInfo()
setUserInfo('that admit intact embody expect awesome make olive help bring medal anchor','123456')

// 查询积分
let getaccount=async ()=>{
    let address=dbchain.getAddress()
    console.log(address)
    let account=await dbchain.getAccount(address)
    console.log(account)
}
console.log('当前积分是：========'+getaccount())

