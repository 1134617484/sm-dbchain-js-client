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
 * ?????????????????????????????????
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
 * Whether the current user has permission to modify the table structure(????????????????????????????????????????????????)
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
  dbchain_base_url ? "" : setBaseUrl(baseurl); //???????????????
  dbchain_chain_id ? "" : setChainId(chainId);
}

async function getDatabaseUsers(appCode) {
  // console.log(appCode);
  var uri = uriBuilder("app_users", appCode);
  var response = await restGet(uri);
  return response.data.result;
}

/**
 * ?????????????????????????????????????????????
 * @param {*} appCode ?????????appCode
 * @returns {Array} ??????????????????????????????????????????
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
 * ?????????????????????????????????????????????????????????
 * @param {*} appCode ?????????appCode
 * @param {*} functionName  ????????????????????????
 * @returns {Object} ???????????????????????????????????????
 */
async function getFunctionOptions(appCode, functionName) {
  var uri = uriBuilder("functionInfo", appCode, functionName);
  var response = await restGet(uri);
  return response.data.result;
}

/**
 * ?????????????????????????????????????????????????????????
 * @param {*} appCode ?????????appCode
 * @param {*} functionName  ????????????????????????
 * @returns {Object} ???????????????????????????????????????
 */
async function addFunctions(appCode, Description = "", Body, callback) {
  if (!appCode || !Body) {
    console.log(appCode, Description, Body);
    return console.error("??????????????????????????????");
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
 * ????????????????????????????????????????????????
 * @param {*} appCode ?????????appCode
 * @returns {Array} ??????????????????????????????????????????
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
 * ?????????????????????????????????????????????????????????
 * @param {*} appCode ?????????appCode
 * @param {*} functionName  ????????????????????????
 * @returns {Object} ???????????????????????????????????????
 */
async function getCustomQuerierOptions(appCode, functionName) {
  var uri = uriBuilder("custom-querierInfo", appCode, functionName);
  var response = await restGet(uri);
  return response.data.result;
}

/**
 * ?????????????????????????????????????????????????????????
 * @param {*} appCode ?????????appCode
 * @param {*} QuerierName  ????????????????????????
 * @returns {Object} ???????????????????????????????????????
 */
async function addCustomQuerier(appCode, Description = "", Body, callback) {
  if (!appCode || !Body) {
    console.log(appCode, (Description = ""), Body);
    return console.error("?????????????????????????????????");
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
 * ?????????????????????????????????????????????????????????
 * @param {*} appCode ?????????appCode
 * @param {*} QuerierName  ???????????????????????????
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
 * ???????????????????????????????????????????????????
 * @param {*} appCode ?????????appCode
 * @param {*} QuerierName  ????????????????????????
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
 * ??????appcode???????????????
 * @param {*} appCode ?????????appCode
 * @returns {Object} ???????????????????????????????????????
 */
async function delApplication(appCode, callback) {
  if (!appCode) {
    return console.error("???appCode");
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
 * ??????appcode???????????????
 * @param {*} appCode ?????????appCode
 * @returns {Object} ???????????????????????????????????????
 */
async function RecoverApplication(appCode, callback) {
  if (!appCode) {
    return console.error("???appCode");
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
 * ???????????????????????????
 * @param {*} appCode ?????????appCode
 * @param {*} appCode ??????TableName
 * @param {*} appCode ??????FieldName
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
 * ???????????????????????????
 * @param {*} appCode ?????????appCode
 * @param {*} TableName ??????TableName
 * @param {*} FieldName ??????FieldName
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
 * ????????????????????????????????????
 * @param {*} appCode ?????????appCode
 * @param {*} TableName ??????TableName
 * @returns {Object} ??????????????????????????????
 */
async function getFieldIndex(appCode, tableName) {
  console.log(appCode, tableName);
  var uri = uriBuilder("index", appCode, tableName);
  var response = await restGet(uri);
  return response.data.result;
}

/**
 * ??????????????????????????????
 * @param {*} appCode
 * @param {*} Size ????????????kb
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
