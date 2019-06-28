const WalletStoreKey = "Wallet";

const prvKeyTopubKey = privateKey => {
  const EC = require("elliptic").ec;
  const ec = new EC("secp256k1");
  const key = ec.keyFromPrivate(privateKey);
  return key.getPublic(true, "hex");
};

const generateEcPair = () => {
  const sm2 = require("miniprogram-sm-crypto").sm2;
  let keypair = sm2.generateKeyPairHex();
  const privateKey = keypair.privateKey;

  return { privateKey, publicKey: prvKeyTopubKey(privateKey) };
};

const ecPairFromPriavteKey = privateKey => {
  return { privateKey, publicKey: prvKeyTopubKey(privateKey) };
};

const cryptPassword = password => {
  const blake2b = require("blake2b");
  const Buffer = require("buffer").Buffer;

  var output = new Uint8Array(32);
  var input = Buffer.from(password);
  var hash = blake2b(32);
  hash = hash.update(input);
  output = hash.digest(output);
  return output;
};

const encryptWallet = (ecPair, password) => {
  const blake2b = cryptPassword(password);
  const CryptoJS = require("crypto-js");
  return CryptoJS.AES.encrypt(
    JSON.stringify(ecPair),
    blake2b.toString()
  ).toString();
};

const decryptWallet = (data, password) => {
  const blake2b = cryptPassword(password);
  const CryptoJS = require("crypto-js");
  const bytes = CryptoJS.AES.decrypt(data, blake2b.toString());
  return bytes.toString(CryptoJS.enc.Utf8);
};

const write = callBacks => {
  const data = encryptWallet(callBacks.ecPair, callBacks.password);
  console.log(data);
  wx.setStorage({
    key: WalletStoreKey,
    data,
    success: callBacks.success,
    fail: callBacks.fail,
    complete: callBacks.complete
  });
};

const read = callBacks => {
  try {
    wx.getStorage({
      key: WalletStoreKey,
      success(res) {
        try {
          const wallet = decryptWallet(res.data, callBacks.password);
          callBacks.success(wallet);
        } catch (e) {
          callBacks.fail("密码错误");
        }
      }
    });
  } catch (e) {
    console.log(e);
    callBacks.fail("读取失败，请刷新重试");
  }
};

module.exports = {
  write,
  read,
  generateEcPair,
  ecPairFromPriavteKey
};
