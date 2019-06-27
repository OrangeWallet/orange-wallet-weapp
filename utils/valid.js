const validPrvKey = prvKey => {
  prvKey = prvKey.replace("0x", "");
  const Buffer = require("buffer").Buffer;
  const buffer = Buffer.from(prvKey);
  if (buffer.length != 64) {
    return false;
  }
  try {
    parseInt(prvKey, 16);
    return true;
  } catch (e) {
    return false;
  }
};

module.exports = {
  validPrvKey
};
