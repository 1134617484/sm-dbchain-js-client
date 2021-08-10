import { sign,signSm2 } from "./cosmos_sig/index"
import { getPrivKey, getPubKey, toHexString } from "./key_manager";
const bs58 =  require("bs58")
import{getVerToken}from './rest_lib'

function signForToken(str) {
  var privKey = getPrivKey();
  var pubKey = getPubKey();

  var sigObj = sign(str, privKey);
  var encodedPubKey = bs58.encode(pubKey)
  var encodedSig = bs58.encode(sigObj.signature)
  var result = `${encodedPubKey}:${str}:${encodedSig}`
  return result;
}  

function signSmForToken(str) {
  var privKey = getPrivKey();
  var pubKey = getPubKey();
console.log(pubKey)
console.log(toHexString(pubKey))
  var sigObj = signSm2(str, privKey);
console.log(sigObj)
  var encodedPubKey = bs58.encode(pubKey)
  var encodedSig = bs58.encode(sigObj.signature)
  var result = `${encodedPubKey}:${str}:${encodedSig}`
  console.log(result)
  // getVerToken(result)
  return result;
}

function createAccessToken() {
  var time = "" + Date.now();
  // var result = signForToken(time)
  var result = signSmForToken(time)
  return result
}



export { createAccessToken };
