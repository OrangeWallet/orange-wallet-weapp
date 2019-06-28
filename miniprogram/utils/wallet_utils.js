const CryptoJS = require("crypto-js");
const blake2b = require("blake2b");
const Buffer = require("buffer").Buffer;

const WalletStoreKey = "Wallet";

const prvKeyTopubKey = privateKey => {
  const EC = require("elliptic").ec;
  const ec = new EC("secp256k1");
  const key = ec.keyFromPrivate(privateKey);
  return key.getPublic(true, "hex");
};

const generateEcPair = () => {
  return new Promise((resolve, reject) => {
    wx.cloud
      .callFunction({
        name: "random"
      })
      .then(res => {
        const randoms = res.result;
        const sm2 = require("miniprogram-sm-crypto").sm2;
        const sm2Random = sm2.generateKeyPairHex();
        var output = new Uint8Array(32);
        var hash = blake2b(32);
        for (let i = 0; i < 10000; i++) {
          hash = hash.update(
            Buffer.from(randoms[parseInt(Math.random() * 10, 10)])
          );
          hash = hash.update(Buffer.from(Date.now().toString()));
        }
        hash = hash.update(Buffer.from(sm2Random.toString("hex")));
        output = hash.digest(output);
        const privateKey = Buffer.from(output).toString("hex");
        resolve({ privateKey, publicKey: prvKeyTopubKey(privateKey) });
      })
      .catch(error => {
        reject(error);
      });
  });
};

const ecPairFromPriavteKey = privateKey => {
  return { privateKey, publicKey: prvKeyTopubKey(privateKey) };
};

const cryptPassword = password => {
  var output = new Uint8Array(32);
  var input = Buffer.from(password);
  var hash = blake2b(32);
  hash = hash.update(input);
  output = hash.digest(output);
  return output;
};

const encryptWallet = (ecPair, password) => {
  const blake2b = cryptPassword(password);
  if (ecPair.privateKey != "") {
    ecPair.privateKey = CryptoJS.AES.encrypt(
      ecPair.privateKey,
      blake2b.toString()
    ).toString();
  }
  return JSON.stringify(ecPair);
};

const decryptWallet = (data, password) => {
  const ecPair = JSON.parse(data);
  const blake2b = cryptPassword(password);
  if (ecPair.privateKey != "") {
    const bytes = CryptoJS.AES.decrypt(ecPair.privateKey, blake2b.toString());
    ecPair.privateKey = bytes.toString(CryptoJS.enc.Utf8);
  }
  return ecPair;
};

const write = callBacks => {
  const data = encryptWallet(callBacks.ecPair, callBacks.password);
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
