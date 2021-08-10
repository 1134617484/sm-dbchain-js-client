let validate = {};
var ALPHABET = "qpzry9x8gf2tvdw0s3jn54khce6mua7l";

var ALPHABET_MAP = {};
for (var z = 0; z < ALPHABET.length; z++) {
  var x = ALPHABET.charAt(z);
  ALPHABET_MAP[x] = z;
}

function polymodStep(pre) {
  var b = pre >> 25;
  return (
    ((pre & 0x1ffffff) << 5) ^
    (-((b >> 0) & 1) & 0x3b6a57b2) ^
    (-((b >> 1) & 1) & 0x26508e6d) ^
    (-((b >> 2) & 1) & 0x1ea119fa) ^
    (-((b >> 3) & 1) & 0x3d4233dd) ^
    (-((b >> 4) & 1) & 0x2a1462b3)
  );
}

function prefixChk(prefix) {
  var chk = 1;
  for (var i = 0; i < prefix.length; ++i) {
    var c = prefix.charCodeAt(i);
    if (c < 33 || c > 126) return "KO";

    chk = polymodStep(chk) ^ (c >> 5);
  }
  chk = polymodStep(chk);

  for (i = 0; i < prefix.length; ++i) {
    var v = prefix.charCodeAt(i);
    chk = polymodStep(chk) ^ (v & 0x1f);
  }
  return chk;
}
/**
 * 验证密钥地址是否正确
 * @param {String} str 密钥地址字符串
 * @returns 符合则true。反之false
 */
validate.checkbech32 = function (str) {
  var LIMIT = 90;
  if (str.length < 8) return false;
  if (str.length > LIMIT) return false;

  var split = str.lastIndexOf("1");
  if (split === -1) return false;
  if (split === 0) return false;

  var prefix = str.slice(0, split);
  var wordChars = str.slice(split + 1);
  if (wordChars.length < 6) return false;

  var chk = prefixChk(prefix);
  if (typeof chk === "string") return false;

  var words = [];
  for (var i = 0; i < wordChars.length; ++i) {
    var c = wordChars.charAt(i);
    var v = ALPHABET_MAP[c];
    if (v === undefined) return false;
    chk = polymodStep(chk) ^ v;

    // not in the checksum?
    if (i + 6 >= wordChars.length) continue;
    words.push(v);
  }

  if (chk !== 1) return false;
  return true;
};

validate.checktableName = function (name) {
  let arr = ["id", "created_by", "created_at"];
  if (arr.indexOf(name) == -1) return true;
  return false;
};

export default validate;
