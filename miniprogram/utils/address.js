const blake2b = require("blake2b");
const Buffer = require("buffer").Buffer;
const NumberUtils = require("./number");
const Bech32 = require("./bech32").default;

const TYPE1 = "01";
const BIN_IDX1 = "P2PH";
const MainNetPrefix = "ckb";
const TestNetPrefix = "ckt";

const publicKeyToBlake160 = publicKey => {
  var output = new Uint8Array(32);
  var s = blake2b(32, null, null, Buffer.from("ckb-default-hash"));
  var bytes = NumberUtils.hexToBytes(publicKey);
  s = s.update(bytes);
  s.digest(output);
  const crypto = Buffer.from(output).toString("hex");
  const blake160 = crypto.slice(0, 40);
  return blake160;
};

const publicKeyToAddress = (publicKey, netType = 0) => {
  var payload = TYPE1 + _binIdx(BIN_IDX1) + publicKeyToBlake160(publicKey);
  var data = NumberUtils.hexToBytes(payload);
  var prefix = netType === 0 ? TestNetPrefix : MainNetPrefix;
  const address = Bech32.encode(prefix, Bech32.toWords(data));
  return address;
};

const _binIdx = data => {
  var bytes = NumberUtils.encodeUtf8(data);
  var result = "";
  bytes.forEach(byte => {
    result += byte.toString(16);
  });
  return result;
};

module.exports = {
  publicKeyToBlake160,
  publicKeyToAddress
};
