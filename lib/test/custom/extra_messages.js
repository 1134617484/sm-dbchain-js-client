export function MsgCreateApplication(
  senderAddress,
  { name, description, permissionRequired }
) {
  return {
    type: "dbchain/CreateApplication",
    value: {
      name: name,
      description: description,
      permission_required: permissionRequired,
      owner: senderAddress,
    },
  };
}

export function MsgSetDatabasePermission(
  senderAddress,
  { appCode, permissionRequired }
) {
  return {
    type: "dbchain/SetDatabasePermission",
    value: {
      app_code: appCode,
      permission_required: permissionRequired,
      owner: senderAddress,
    },
  };
}

export function MsgCreateTable(senderAddress, { appCode, tableName }) {
  return {
    type: "dbchain/CreateTable",
    value: {
      app_code: appCode,
      table_name: tableName,
      fields: ["id"],
      owner: senderAddress,
    },
  };
}

export function MsgDropTable(senderAddress, { appCode, tableName }) {
  return {
    type: "dbchain/DropTable",
    value: {
      app_code: appCode,
      table_name: tableName,
      owner: senderAddress,
    },
  };
}

export function MsgAddColumn(senderAddress, { appCode, tableName, fieldName }) {
  return {
    type: "dbchain/AddColumn",
    value: {
      app_code: appCode,
      table_name: tableName,
      field: fieldName,
      owner: senderAddress,
    },
  };
}

export function MsgDropColumn(
  senderAddress,
  { appCode, tableName, fieldName }
) {
  return {
    type: "dbchain/DropColumn",
    value: {
      app_code: appCode,
      table_name: tableName,
      field: fieldName,
      owner: senderAddress,
    },
  };
}

export function MsgModifyOption(
  senderAddress,
  { appCode, tableName, action, option }
) {
  return {
    type: "dbchain/ModifyOption",
    value: {
      app_code: appCode,
      table_name: tableName,
      action: action,
      option: option,
      owner: senderAddress,
    },
  };
}

export function MsgModifyColumnOption(
  senderAddress,
  { appCode, tableName, fieldName, action, option }
) {
  return {
    type: "dbchain/ModifyColumnOption",
    value: {
      app_code: appCode,
      table_name: tableName,
      field_name: fieldName,
      action: action,
      option: option,
      owner: senderAddress,
    },
  };
}

export function MsgSetColumnType(
  senderAddress,
  { appCode, tableName, fieldName, DataType }
) {
  return {
    type: "dbchain/SetColumnDataType",
    value: {
      app_code: appCode,
      table_name: tableName,
      field_name: fieldName,
      data_type: DataType,
      owner: senderAddress,
    },
  };
}

export function MsgSetColumnMemo(
  senderAddress,
  { appCode, tableName, fieldName, memo }
) {
  return {
    type: "dbchain/SetColumnMemo",
    value: {
      app_code: appCode,
      table_name: tableName,
      field_name: fieldName,
      memo: memo,
      owner: senderAddress,
    },
  };
}

export function MsgModifyGroup(senderAddress, { appCode, action, group }) {
  return {
    type: "dbchain/ModifyGroup",
    value: {
      app_code: appCode,
      action: action,
      group: group,
      owner: senderAddress,
    },
  };
}

export function MsgSetGroupMemo(senderAddress, { appCode, group, memo }) {
  return {
    type: "dbchain/SetGroupMemo",
    value: {
      app_code: appCode,
      group: group,
      memo: memo,
      owner: senderAddress,
    },
  };
}

export function MsgModifyGroupMember(
  senderAddress,
  { appCode, group, action, member }
) {
  return {
    type: "dbchain/ModifyGroupMember",
    value: {
      app_code: appCode,
      group: group,
      action: action,
      member: member,
      owner: senderAddress,
    },
  };
}

export function MsgAddInsertFilter(
  senderAddress,
  { appCode, tableName, filter }
) {
  return {
    type: "dbchain/AddInsertFilter",
    value: {
      app_code: appCode,
      table_name: tableName,
      filter: filter,
      owner: senderAddress,
    },
  };
}

export function MsgDropInsertFilter(senderAddress, { appCode, tableName }) {
  return {
    type: "dbchain/DropInsertFilter",
    value: {
      app_code: appCode,
      table_name: tableName,
      owner: senderAddress,
    },
  };
}

export function MsgAddTrigger(senderAddress, { appCode, tableName, trigger }) {
  return {
    type: "dbchain/AddTrigger",
    value: {
      app_code: appCode,
      table_name: tableName,
      trigger: trigger,
      owner: senderAddress,
    },
  };
}

export function MsgDropTrigger(senderAddress, { appCode, tableName }) {
  return {
    type: "dbchain/DropTrigger",
    value: {
      app_code: appCode,
      table_name: tableName,
      owner: senderAddress,
    },
  };
}

export function MsgSetTableMemo(senderAddress, { appCode, tableName, memo }) {
  return {
    type: "dbchain/SetTableMemo",
    value: {
      app_code: appCode,
      table_name: tableName,
      memo: memo,
      owner: senderAddress,
    },
  };
}

export function MsgSetSchemaStatus(senderAddress, { appCode, status }) {
  return {
    type: "dbchain/SetSchemaStatus",
    value: {
      app_code: appCode,
      status: status,
      owner: senderAddress,
    },
  };
}

export function MsgModifyDatabaseUser(
  senderAddress,
  { appCode, action, address }
) {
  return {
    type: "dbchain/ModifyDatabaseUser",
    value: {
      app_code: appCode,
      action: action,
      user: address,
      owner: senderAddress,
    },
  };
}

export function MsgAddFunction(
  senderAddress,
  { appCode, FunctionName, Description, Body }
) {
  console.log(
    appCode,
    "FunctionName:" + FunctionName,
    "Description:" + Description,
    "Body:" + Body
  );
  return {
    type: "dbchain/AddFunction",
    value: {
      app_code: appCode,
      function_name: FunctionName,
      description: Description,
      body: Body,
      owner: senderAddress,
    },
  };
}

export function MsgAddCustomQuerier(
  senderAddress,
  { appCode, QuerierName, Description, Body }
) {
  console.log(
    appCode,
    "QuerierName:" + QuerierName,
    "Description:" + Description,
    "Body:" + Body
  );
  return {
    type: "dbchain/AddCustomQuerier",
    value: {
      app_code: appCode,
      querier_name: QuerierName,
      description: Description,
      body: Body,
      owner: senderAddress,
    },
  };
}

// type MsgDropFunction struct {
//   Owner sdk.AccAddress `json:"owner"`
//   AppCode string       `json:"app_code"`
//   FunctionName string  `json:"function_name"`
// }
// cdc.RegisterConcrete(MsgDropFunction{}, "dbchain/DropFunction", nil)

export function MsgDropFunction(senderAddress, { appCode, FunctionName }) {
  console.log(appCode, "FunctionName:" + FunctionName);
  return {
    type: "dbchain/DropFunction",
    value: {
      app_code: appCode,
      function_name: FunctionName,
      owner: senderAddress,
    },
  };
}

// type MsgDropCustomQuerier struct {
// 	Owner sdk.AccAddress `json:"owner"`
// 	AppCode string       `json:"app_code"`
// 	QuerierName string  `json:"querier_name"`
// }
// cdc.RegisterConcrete(MsgDropCustomQuerier{}, "dbchain/DropCustomQuerier", nil)
export function MsgDropCustomQuerier(senderAddress, { appCode, QuerierName }) {
  return {
    type: "dbchain/DropCustomQuerier",
    value: {
      app_code: appCode,
      querier_name: QuerierName,
      owner: senderAddress,
    },
  };
}

export function MsgDropApplication(senderAddress, { appCode }) {
  console.log(appCode);
  return {
    type: "dbchain/DropApplication",
    value: {
      app_code: appCode,
      owner: senderAddress,
    },
  };
}

export function MsgRecoverApplication(senderAddress, { appCode }) {
  console.log(appCode);
  return {
    type: "dbchain/RecoverApplication",
    value: {
      app_code: appCode,
      owner: senderAddress,
    },
  };
}

export function MsgCreateIndex(
  senderAddress,
  { appCode, TableName, FieldName }
) {
  console.log(appCode);
  return {
    type: "dbchain/CreateIndex",
    value: {
      app_code: appCode,
      table_name: TableName,
      field: FieldName,
      owner: senderAddress,
    },
  };
}

export function MsgDropIndex(senderAddress, { appCode, TableName, FieldName }) {
  console.log(appCode);
  return {
    type: "dbchain/DropIndex",
    value: {
      app_code: appCode,
      table_name: TableName,
      field: FieldName,
      owner: senderAddress,
    },
  };
}

export function MsgSetAppUserFileVolumeLimit(senderAddress, { appCode, Size }) {
  return {
    type: "dbchain/SetAppUserFileVolumeLimit",
    value: {
      app_code: appCode,
      size: Size,
      owner: senderAddress,
    },
  };
}
