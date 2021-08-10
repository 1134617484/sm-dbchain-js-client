[中文](https://github.com/dbchaincloud/js-client/blob/master/README_ch.md)

# sm-dbChain-js-client

---

dbChain js-client is the JavaScript implementation of the client side library of dbChain, the blockchain database. With the js-client, developers can quickly start a dbChain application in minutes.

The SM-dbchain-js-client uses SM2 encryption and has the same function as the DBchain-js-client

The js-client provides JavaScript functions for

- Generating mnemonic and private/public key pairs 
- Checking whether key exists
- Accessing passphrase
- Retrieving list of tables of a database
- Retrieving the options of a talbe
- Retrieving columns of a table
- Retrieving options of a column
- Inserting a row into a table
- Retrieving all rows of a table
- Searching for rows contain certain field value

## Install

If you are using scaffolding such as Webpack, the user can either clone the project code directly into the node_modules project or install the NPM package directly

```shell
yarn add sm-dbchain-js-client
```

or

```shell
npm install --save sm-dbchain-js-client
```


## Usage

#### Generating mnemonic and private/public key pais
```javascript
import { newMnemonic, createAndStoreKey } from "sm-dbchain-js-client";

const mnemonic = newMnemonic();
// brown deliver ignore estate adjust pond final inject wear return sword silent
const passphrase = "123345678"
createAndStoreKey(mnemonic, passphrase)
```

#### Checking whether key exists
```javascript
import { hasKey } from 'sm-dbchain-js-client;
if(!hasKey()) {
  console.log("User needs to generate and save key pairs")
}
```

#### Accessing passphrase
```javascript
import { hasPassphrase, savePassphrase } from 'sm-dbchain-js-client;

if(!hasPassphrase()) {
  console.log("User needs to input passphrase");
}

// when user login with a passphrase, we usually save it to browser session storage
var passphrase = "12345678"
if (savePassphrase(passphrase)) {
  console.log("passphrase saved successfully");
} else {
  console.log("passphrase is invalid");
}
```

#### Retrieving list of tables of a database
```javascript
import { getTables } from "sm-dbchain-js-client";

const appCode = "DJ1PGEQ45A";
const tables = await getTables(appCode);
/*
[
  "supplier",
  "product",
  "customer"
]
*/
```

#### Retrieving the options of a table
```javascript
import { getTableOptions } from "sm-dbchain-js-client";

const appCode = "DJ1PGEQ45A";
const tableName = "supplier";
const options = await getTableOptions(appCode, tableName);
/*
[
  "public"
]
*/
```

#### Retrieving columns of a table
```javascript
import { getTable } from "sm-dbchain-js-client";

const appCode = "DJ1PGEQ45A";
const tableName = "supplier";
const options = await getTable(appCode, tableName);
/*
[
  "name",
  "phone",
  "address_id"
]
*/
```
#### Retrieving options of a column
```javascript
import { getFieldOptions } from "sm-dbchain-js-client";

const appCode = "DJ1PGEQ45A";
const tableName = "supplier";
const fieldName = "phone";
const options = await getFieldOptions(appCode, tableName, fieldName);
/*
[
  "not-null"
]
*/
```
#### Inserting a row into a table
```javascript
import { insertRow } from "sm-dbchain-js-client";

const appCode = "DJ1PGEQ45A";
const tableName = "supplier";

var record = {};
record.name = "Super supplier"
record.phone = "18888888888";
record.address_id = "5";

const options = await insertRow(appCode, tableName, record, function() {
  console.log("inserting record succeeded");
});
```

#### Retrieving id of all rows in a table
```javascript
import { getAllIds } from "sm-dbchain-js-client";

const appCode = "DJ1PGEQ45A";
const tableName = "supplier";
const ids = await getAllIds(appCode, tableName);
/*
[
  "1",
  "2",
  "3",
  "4"
]
*/
```

#### Retrieving a row from a table
```javascript
import { getRow } from "sm-dbchain-js-client";

const appCode = "DJ1PGEQ45A";
const tableName = "supplier";
const record = await getRow(appCode, tableName, "1");
/*
{
  name: "Super supplier",
  phone: "18888888888",
  address_id: "5"
}
*/
```

## License

dbChain js-client is licensed under the Apache-2.0 License.
