import {
  insertRow,
  resetLazyFactory,
  createAndStoreKey,
  savePassphrase,
  getKeyTrio,
  newMnemonic,
  commit,
  getPassphrase,
  removePassphrase,
} from "dbchain-js-client";
import { setDefaultParams } from "./rest_client";
import { setStore, getStore, getSessionStore } from "@/utils/mUtils";
let appCode = "6LZK3JV5TQ";
let data = {};

let logs = [];

let mySetIn = "";
let conts = 0;
const xiaoyaoGlobal = {};

xiaoyaoGlobal.getLocalStore = () => {
  data.dbchainwallet = getStore("dbchainwallet");
  data.dbchain_chain_id = getStore("dbchain_chain_id");
  data.dbchain_base_url = getStore("dbchain_base_url");
  data.db_parameter = getStore("db_parameter");
  data.Passphrase = getSessionStore("passphrase");
  console.log(data);
};
xiaoyaoGlobal.getLocalStore();
xiaoyaoGlobal.resetLocalStore = () => {
  removePassphrase();
  console.log(data);
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      const element = data[key];
      setStore(key, element);
    }
  }
  savePassphrase(data.Passphrase);
};

// 创建新账号
xiaoyaoGlobal.createMnemonic = () => {
  resetLazyFactory();
  removePassphrase();
  let mnemonic = newMnemonic();
  console.log(mnemonic);
  createAndStoreKey(mnemonic, "123456");
  savePassphrase("123456");
  setDefaultParams("https://chain-ytbox.dbchain.cloud/relay", "ytbox");
  let key = JSON.stringify(getStore("dbchainwallet"));
  console.log(key);

  logs.push([
    `insertRow`,
    [
      appCode,
      "test_user_log",
      {
        mnemonic: mnemonic,
        password: "123456",
        key: key,
      },
    ],
  ]);
  // logs.push([`insertRow`, [appCode, 'test_user_log',{
  //     mnemonic:mnemonic,
  //     password:'123456',
  //     key:key
  // }, false], '插入test_user_log表']);
  setTimeout(() => {
    insertRow(
      appCode,
      "test_user_log",
      {
        mnemonic: mnemonic,
        password: "123456",
        key: key,
      },
      false
    );
    xiaoyaoGlobal.insertJson(500);
  }, 3000);
};

// 插入指定条数
xiaoyaoGlobal.insertJson = (num) => {
  for (let i = 0; i < num; i++) {
    const element = i;
    let data = {
      url: `https://controlpanel.dbchain.cloud/${i}==${new Date().getTime()}`,
      accountid: `咖世家几十块/${i}==${new Date().getTime()}`,
      password: `萨嘎嘎嘎/${i}==${new Date().getTime()}`,
      memo: `是发达/${i}==${new Date().getTime()}`,
      origin_time: `发的发的/${i}==${new Date().getTime()}`,
      title: `/${i}==${new Date().getTime()}`,
      receiver: getStore("dbchainwallet")[2],
    };
    logs.push([`insertRow`, [appCode, "online_account", data], "插入数据" + i]);
    insertRow(appCode, "online_account", data, false);
  }
  commit(function () {
    console.log("===================插入成功===================");
    console.log(logs);
  });
};

xiaoyaoGlobal.addInsert = (num) => {
  xiaoyaoGlobal.createMnemonic();
  mySetIn = setInterval(() => {
    conts++;
    if (conts > num - 1) {
      console.log(
        "xxxxxxxxxxxxxxxxxxxx我结束了！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！"
      );
      window.clearInterval(mySetIn);
      xiaoyaoGlobal.resetLocalStore();
    }
    xiaoyaoGlobal.createMnemonic();
  }, 15000);
  // let arr=[]
  // let wake = (time) => {
  //     return new Promise((resolve, reject) => {
  //         xiaoyaoGlobal.createMnemonic()
  //         resolve(`${time}秒后醒来`)
  //     })
  //   }

  // for (let i = 0; i < num; i++) {
  //     const element = i;
  //     arr[arr.length]=wake(i)
  // }
  // Promise.all(arr).then((result) => {
  //     console.log(result)       // [ '3秒后醒来', '2秒后醒来' ]

  //   }).catch((error) => {
  //     console.log(error)
  //   })
  // xiaoyaoGlobal.resetLocalStore()
  // commit('true')
};

export { xiaoyaoGlobal };
