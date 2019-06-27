const getEcPair = () => {
  const sm2 = require("miniprogram-sm-crypto").sm2;
  let keypair = sm2.generateKeyPairHex();
  const privateKey = keypair.privateKey;

  const EC = require("elliptic").ec;
  const ec = new EC("secp256k1");
  const key = ec.keyFromPrivate(privateKey);
  const publicKey = key.getPublic(true, "hex");
  return { privateKey, publicKey };
};

module.exports = {
  getEcPair: getEcPair
};
