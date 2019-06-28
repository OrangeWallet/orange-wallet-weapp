const Buffer = require("buffer").Buffer;

const validimportKey = prvKey => {
  try {
    parseInt(prvKey, 16);
    return true;
  } catch (e) {
    return false;
  }
};

module.exports = {
  validimportKey
};
