import {
  signAndBroadcast,
  addExtraMsgConstructors,
  getTable,
  getTableRaw,
  getFieldOptions,
  getApp,
  setBaseUrl,
  getBaseUrl,
  getChainId,
  setChainId,
  uriBuilder,
  restGet,
  detectChain,
  sign,
} from "dbchain-js-client";
import * as extraMsgConstructors from "./extra_messages";
import xiaoyao from "@/assets/js/global.js";

import { bs58 } from "bs58";
// inject messages to tx Factory
addExtraMsgConstructors(extraMsgConstructors);

//////////////////
//              //
// transactions //
//              //
//////////////////

async function createApplication(
  name,
  description,
  permissionRequired,
  callback
) {
  await signAndBroadcast(
    "MsgCreateApplication",
    {
      name: name,
      description: description,
      permissionRequired: permissionRequired,
    },
    callback
  );
}
/**
 *
 * @param {*} appCode
 * @param {String} permissionRequired   required  or unrequired
 * @param {*} callback
 */
async function setDatabasePermission(appCode, permissionRequired, callback) {
  await signAndBroadcast(
    "MsgSetDatabasePermission",
    {
      appCode: appCode,
      permissionRequired: permissionRequired,
    },
    callback
  );
}

async function createTable(appCode, tableName, callback) {
  await signAndBroadcast(
    "MsgCreateTable",
    {
      appCode: appCode,
      tableName: tableName,
    },
    callback
  );
}

async function dropTable(appCode, tableName, callback) {
  await signAndBroadcast(
    "MsgDropTable",
    {
      appCode: appCode,
      tableName: tableName,
    },
    callback
  );
}

async function addField(appCode, tableName, fieldName, callback) {
  await signAndBroadcast(
    "MsgAddColumn",
    {
      appCode: appCode,
      tableName: tableName,
      fieldName: fieldName,
    },
    callback
  );
}

async function dropField(appCode, tableName, fieldName, callback) {
  await signAndBroadcast(
    "MsgDropColumn",
    {
      appCode: appCode,
      tableName: tableName,
      fieldName: fieldName,
    },
    callback
  );
}

async function modifyTableOption(appCode, tableName, action, option, callback) {
  await signAndBroadcast(
    "MsgModifyOption",
    {
      appCode: appCode,
      tableName: tableName,
      action: action,
      option: option,
    },
    callback
  );
}

async function modifyFieldOption(
  appCode,
  tableName,
  fieldName,
  action,
  option,
  callback
) {
  await signAndBroadcast(
    "MsgModifyColumnOption",
    {
      appCode: appCode,
      tableName: tableName,
      fieldName: fieldName,
      action: action,
      option: option,
    },
    callback
  );
}

async function setFieldType(appCode, tableName, fieldName, DataType, callback) {
  console.log(appCode, tableName, fieldName, DataType);
  await signAndBroadcast(
    "MsgSetColumnType",
    {
      appCode: appCode,
      tableName: tableName,
      fieldName: fieldName,
      DataType: DataType,
    },
    callback
  );
}

async function setFieldMemo(appCode, tableName, fieldName, memo, callback) {
  await signAndBroadcast(
    "MsgSetColumnMemo",
    {
      appCode: appCode,
      tableName: tableName,
      fieldName: fieldName,
      memo: memo,
    },
    callback
  );
}

async function modifyGroup(appCode, action, group, callback) {
  await signAndBroadcast(
    "MsgModifyGroup",
    {
      appCode: appCode,
      action: action,
      group: group,
    },
    callback
  );
}

async function setGroupMemo(appCode, group, memo, callback) {
  await signAndBroadcast(
    "MsgSetGroupMemo",
    {
      appCode: appCode,
      group: group,
      memo: memo,
    },
    callback
  );
}

async function modifyGroupMember(appCode, group, action, member, callback) {
  await signAndBroadcast(
    "MsgModifyGroupMember",
    {
      appCode: appCode,
      group: group,
      action: action,
      member: member,
    },
    callback
  );
}

async function addInsertFilter(appCode, tableName, filter, callback) {
  await signAndBroadcast(
    "MsgAddInsertFilter",
    {
      appCode: appCode,
      tableName: tableName,
      filter: filter,
    },
    callback
  );
}

async function dropInsertFilter(appCode, tableName, callback) {
  await signAndBroadcast(
    "MsgDropInsertFilter",
    {
      appCode: appCode,
      tableName: tableName,
    },
    callback
  );
}

async function addTrigger(appCode, tableName, trigger, callback) {
  await signAndBroadcast(
    "MsgAddTrigger",
    {
      appCode: appCode,
      tableName: tableName,
      trigger: trigger,
    },
    callback
  );
}

async function dropTrigger(appCode, tableName, callback) {
  await signAndBroadcast(
    "MsgDropTrigger",
    {
      appCode: appCode,
      tableName: tableName,
    },
    callback
  );
}

async function setTableMemo(appCode, tableName, memo, callback) {
  await signAndBroadcast(
    "MsgSetTableMemo",
    {
      appCode: appCode,
      tableName: tableName,
      memo: memo,
    },
    callback
  );
}

// to freeze the schema, set the status to "frozen"
// to unfreeze the schema, set the status to "unfrozen"
async function setSchemaStatus(appCode, status, callback) {
  if (status != "frozen" && status != "unfrozen") {
    return;
  }
  await signAndBroadcast(
    "MsgSetSchemaStatus",
    {
      appCode: appCode,
      status: status,
    },
    callback
  );
}

async function addDatabaseUser(appCode, address, callback) {
  await signAndBroadcast(
    "MsgModifyDatabaseUser",
    {
      appCode: appCode,
      action: "add",
      address: address,
    },
    callback
  );
}

async function dropDatabaseUser(appCode, address, callback) {
  await signAndBroadcast(
    "MsgModifyDatabaseUser",
    {
      appCode: appCode,
      action: "drop",
      address: address,
    },
    callback
  );
}

async function getFieldType(appCode, tableName, fieldName) {
  var uri = uriBuilder("column-data-type", appCode, tableName, fieldName);
  var response = await restGet(uri);
  return response.data.result;
}

/////////////
//         //
// Queries //
//         //
/////////////

async function canAddFieldOption(appCode, tableName, fieldName, option) {
  var uri = uriBuilder(
    "can_add_column_option",
    appCode,
    tableName,
    fieldName,
    option
  );
  var response = await restGet(uri);
  if (response.data.result == null) {
    return [];
  } else {
    return response.data.result;
  }
}

/**
 * 是否能正确设置字段类型
 * @param {*} appCode
 * @param {*} tableName
 * @param {*} fieldName
 * @param {*} option
 * @returns
 */
async function canSetFieldType(appCode, tableName, fieldName, DataType) {
  var uri = uriBuilder(
    "can_set_column_data_type",
    appCode,
    tableName,
    fieldName,
    DataType
  );
  var response = await restGet(uri);
  if (response.data.result == null) {
    return [];
  } else {
    return response.data.result;
  }
}

/**
 * Public function that composes attributes associated with the specified table
 * @param {String} appCode
 * @param {String} tableName
 * @returns {Array}
 */
async function getTableFieldsDetail(appCode, tableName) {
  var fields = await getTable(appCode, tableName);
  let memos = (await getTableRaw(appCode, tableName, "memos")) || [];
  let fieldsIndex = await getFieldIndex(appCode, tableName);
  console.log(fieldsIndex);
  memos = memos.slice(3, memos.length);
  var result = [];
  for (var i = 0; i < fields.length; i++) {
    var options = await getFieldOptions(appCode, tableName, fields[i]);

    let fieldType = await getFieldType(appCode, tableName, fields[i]);

    result.push({
      name: fields[i],
      options: options,
      fieldType: fieldType || "",
      comment: memos[i] ? memos[i] : "",
      fieldIndex: fieldsIndex.indexOf(fields[i]) == -1 ? false : true,
    });
  }
  return result;
}

/**
 * Whether the current user has permission to modify the table structure(当前用户是否具有修改表结构的权限)
 *
 * @param {String} appCode
 * @returns {Boolean} true||false
 */
async function isAdmin(appCode) {
  let activeMenu = await getApp(appCode);
  // console.log(activeMenu);
  let isadmin = activeMenu.schema_frozen;
  return isadmin;
}
/**
 *
 * @param {*} baseurl
 * @param {*} chainId
 */
function setDefaultParams(
  baseurl = xiaoyao.appData.baseUrl,
  chainId = xiaoyao.appData.chainId
) {
  let dbchain_base_url = window.localStorage.getItem("dbchain_base_url") || "";
  let dbchain_chain_id = window.localStorage.getItem("dbchain_chain_id") || "";
  dbchain_base_url ? "" : setBaseUrl(baseurl); //服务器地址
  dbchain_chain_id ? "" : setChainId(chainId);
}

async function getDatabaseUsers(appCode) {
  // console.log(appCode);
  var uri = uriBuilder("app_users", appCode);
  var response = await restGet(uri);
  return response.data.result;
}

/**
 * 查询当前库所有自定义函数名列表
 * @param {*} appCode 你的库appCode
 * @returns {Array} 返回当前库所有自定义函数列表
 */
async function getFunctions(appCode) {
  var uri = uriBuilder("functions", appCode);
  var response = await restGet(uri);
  let data = response.data.result;
  // console.log(data)
  let arrSort = data.sort(function (s, t) {
    let a = s.toLowerCase();
    let b = t.toLowerCase();
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });
  // console.log(arrSort)
  return arrSort;
}

/**
 * 根据指定自定义函数名查询自定义函数详情
 * @param {*} appCode 你的库appCode
 * @param {*} functionName  你的自定义函数名
 * @returns {Object} 返回查询到的自定义函数详情
 */
async function getFunctionOptions(appCode, functionName) {
  var uri = uriBuilder("functionInfo", appCode, functionName);
  var response = await restGet(uri);
  return response.data.result;
}

/**
 * 根据指定自定义函数名查询自定义函数详情
 * @param {*} appCode 你的库appCode
 * @param {*} functionName  你的自定义函数名
 * @returns {Object} 返回查询到的自定义函数详情
 */
async function addFunctions(appCode, Description = "", Body, callback) {
  if (!appCode || !Body) {
    console.log(appCode, Description, Body);
    return console.error("请完善你的自定义函数");
  }
  // console.log(appCode, Description, Body, callback)
  await signAndBroadcast(
    "MsgAddFunction",
    {
      appCode,
      FunctionName: "",
      Description,
      Body,
    },
    callback
  );
}

/**
 * 查询当前库所有自定义查询器名列表
 * @param {*} appCode 你的库appCode
 * @returns {Array} 返回当前库所有自定义函数列表
 */
async function getCustomQueriers(appCode) {
  var uri = uriBuilder("custom-queriers", appCode);
  var response = await restGet(uri);
  let data = response.data.result;
  console.log(data);
  let arrSort = data.sort(function (s, t) {
    let a = s.toLowerCase();
    let b = t.toLowerCase();
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });
  console.log(arrSort);
  return arrSort;
}

/**
 * 根据指定自定义函数名查询自定义函数详情
 * @param {*} appCode 你的库appCode
 * @param {*} functionName  你的自定义函数名
 * @returns {Object} 返回查询到的自定义函数详情
 */
async function getCustomQuerierOptions(appCode, functionName) {
  var uri = uriBuilder("custom-querierInfo", appCode, functionName);
  var response = await restGet(uri);
  return response.data.result;
}

/**
 * 根据指定自定义函数名查询自定义函数详情
 * @param {*} appCode 你的库appCode
 * @param {*} QuerierName  你的自定义函数名
 * @returns {Object} 返回查询到的自定义函数详情
 */
async function addCustomQuerier(appCode, Description = "", Body, callback) {
  if (!appCode || !Body) {
    console.log(appCode, (Description = ""), Body);
    return console.error("请完善你的自定义查询器");
  }
  console.log(appCode, Description, Body, callback);
  await signAndBroadcast(
    "MsgAddCustomQuerier",
    {
      appCode,
      QuerierName: "",
      Description,
      Body,
    },
    callback
  );
}
/**
 * 根据指定自定义查询器名移除自定义查询器
 * @param {*} appCode 你的库appCode
 * @param {*} QuerierName  你的自定义查询器名
 * @returns
 */
async function dropCustomQuerier(appCode, QuerierName, callback) {
  await signAndBroadcast(
    "MsgDropCustomQuerier",
    {
      appCode,
      QuerierName,
    },
    callback
  );
}

/**
 * 根据指定自定义函数名移除自定义函数
 * @param {*} appCode 你的库appCode
 * @param {*} QuerierName  你的自定义函数名
 * @returns
 */
async function dropFunction(appCode, FunctionName, callback) {
  console.log(appCode, FunctionName);
  await signAndBroadcast(
    "MsgDropFunction",
    {
      appCode,
      FunctionName,
    },
    callback
  );
}

/**
 * 根据appcode废弃指定库
 * @param {*} appCode 你的库appCode
 * @returns {Object} 返回查询到的自定义函数详情
 */
async function delApplication(appCode, callback) {
  if (!appCode) {
    return console.error("无appCode");
  }
  console.log(appCode, callback);
  await signAndBroadcast(
    "MsgDropApplication",
    {
      appCode,
    },
    callback
  );
}

/**
 * 根据appcode恢复指定库
 * @param {*} appCode 你的库appCode
 * @returns {Object} 返回查询到的自定义函数详情
 */
async function RecoverApplication(appCode, callback) {
  if (!appCode) {
    return console.error("无appCode");
  }
  console.log(appCode, callback);
  await signAndBroadcast(
    "MsgRecoverApplication",
    {
      appCode,
    },
    callback
  );
}

/**
 * 根据字段名创建索引
 * @param {*} appCode 你的库appCode
 * @param {*} appCode 你的TableName
 * @param {*} appCode 你的FieldName
 * @returns {Object}
 */
async function CreateFeildIndex(appCode, TableName, FieldName, callback) {
  console.log(appCode, TableName, FieldName, callback);
  await signAndBroadcast(
    "MsgCreateIndex",
    {
      appCode,
      TableName,
      FieldName,
    },
    callback
  );
}

/**
 * 根据字段名移除索引
 * @param {*} appCode 你的库appCode
 * @param {*} TableName 你的TableName
 * @param {*} FieldName 你的FieldName
 * @returns {Object}
 */
async function DropFeildIndex(appCode, TableName, FieldName, callback) {
  console.log(appCode, TableName, FieldName, callback);
  await signAndBroadcast(
    "MsgDropIndex",
    {
      appCode,
      TableName,
      FieldName,
    },
    callback
  );
}
/**
 * 根据表名查询表中所有索引
 * @param {*} appCode 你的库appCode
 * @param {*} TableName 你的TableName
 * @returns {Object} 返回查询到的索引列表
 */
async function getFieldIndex(appCode, tableName) {
  console.log(appCode, tableName);
  var uri = uriBuilder("index", appCode, tableName);
  var response = await restGet(uri);
  return response.data.result;
}

/**
 * 设置用户最大使用空间
 * @param {*} appCode
 * @param {*} Size 单位默认kb
 */
async function setAppUserFileVolumeLimit(appCode, Size, callback) {
  await signAndBroadcast(
    "MsgSetAppUserFileVolumeLimit",
    {
      appCode,
      Size,
    },
    callback
  );
}

async function getAppUserFileVolumeLimit(appCode) {
  console.log(appCode);
  var uri = uriBuilder("application-user-file-volume-limit", appCode);
  var response = await restGet(uri);
  return response.data.result;
}

export {
  createApplication,
  createTable,
  dropTable,
  addField,
  dropField,
  modifyTableOption,
  modifyFieldOption,
  setFieldType,
  setFieldMemo,
  modifyGroup,
  modifyGroupMember,
  addInsertFilter,
  setGroupMemo,
  canAddFieldOption,
  canSetFieldType,
  dropInsertFilter,
  addTrigger,
  dropTrigger,
  setTableMemo,
  setSchemaStatus,
  setDatabasePermission,
  getTableFieldsDetail,
  isAdmin,
  setDefaultParams,
  addDatabaseUser,
  dropDatabaseUser,
  getDatabaseUsers,
  addFunctions,
  getFunctions,
  getFunctionOptions,
  dropFunction,
  getCustomQueriers,
  addCustomQuerier,
  getCustomQuerierOptions,
  dropCustomQuerier,
  delApplication,
  RecoverApplication,
  CreateFeildIndex,
  DropFeildIndex,
  getFieldIndex,
  setAppUserFileVolumeLimit,
  getAppUserFileVolumeLimit,
};
