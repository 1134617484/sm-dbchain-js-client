const CryptoJS = require("crypto-js");
const low = require('lowdb')
// import * as low from 'lowdb';
// import  {  low ,  JSONFile  }  from  'lowdb' 
// import * as CryptoJS from 'crypto-js'

import LocalStorage from 'lowdb/adapters/LocalStorage'
import help from './help_doc.js'

const jsonTemplate = {
    baseUrl: '',// 访问链地址
    chainId: '',// 访问链id
    passphrase: '',//密码
    priKey: '',// 私钥
    pubKey: '',// 公钥
    address: '',// 地址
    userName: '',//用户名
};
let iswindow = function () {
    try {
        if (window) {
            return true
        }
        return false
    } catch (error) {
        return false
    }
}
const getDefaultConfig = (json) => {
    let aesJson = CryptoJS.AES.encrypt(JSON.stringify(json), 'secret key 123').toString();
    return aesJson
}

export const getConfig = (key) => {
    let ciphertext = db.getState()

    let dbchain=ciphertext.dbchain;
    var bytes = CryptoJS.AES.decrypt(dbchain, 'secret key 123');
    var aesJson =JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    if (key) return aesJson[key]
    return aesJson
}
export const getConfigJson = () => {
    return getConfig()
}
export const setConfig = (json = {}) => {
    json = { ...getConfig(), ...json }
    let aesJson = getDefaultConfig(json);
    db.setState({dbchain:aesJson})
    db.write()
    let a=db.getState();
    return getConfigJson()
}
export const asConsole=async (fn)=>{
   let a=await fn;
   console.log(a)
   return a
}



let adapter = '';
if (iswindow()) {
    adapter = new LocalStorage('db')
} else {
    // import * as FileSync from 'lowdb/adapters/FileSync'
    const FileSync = require('lowdb/adapters/FileSync')
    adapter = new FileSync('./db.json')
}

const db = low(adapter)

let jsonStr=getDefaultConfig(jsonTemplate)

db.defaults({dbchain:jsonStr}).write()


// 重置记录文件
export const resetConfig = () => {
    setConfig(getDefaultConfig(jsonTemplate))
}



export let createdUserInfo =(mnemonic = '', passphrase = '123456') => {
    console.log(`助记词：${mnemonic},密码：${passphrase};生成账号信息===`)
    if (!mnemonic || !passphrase) return console.log('请传入助记词和密码')
    if (!dbchain.validateMnemonic(mnemonic)) {
        return console.log('助记词不合法')
    }
    dbchain.createAndStoreKey(mnemonic, passphrase)
    // 设置密码
    dbchain.savePassphrase('123456')
    console.log('设置密码结束')
    console.log('config2=======' + JSON.stringify(dbchain.getConfig()))
    // 查询密码
    let pwd = dbchain.getPassphrase()
    console.log('查询密码结束:====' + pwd)
    // 是否有密码
    console.log('是否有账号信息' + dbchain.hasKey())
    // 是否有密码
    console.log('是否有密码' + dbchain.hasPassphrase())
    // 获取私钥
    console.log('我的私钥=-===' + dbchain.getPrivKey())
    // 获取公钥
    console.log('我的公钥=-===' + dbchain.getPubKey())
    // 获取地址
    console.log('我的地址=-===' + dbchain.getAddress())
    console.log('userInfo=======' + JSON.stringify(dbchain.getConfig()))
    //获取积分
    // let account=await dbchain.getAccount()
   let account= asConsole(dbchain.getAccount())
    console.log('获取积分=-===' + account)
    return account
}

export const HELP = () => {
    console.info(help)
}