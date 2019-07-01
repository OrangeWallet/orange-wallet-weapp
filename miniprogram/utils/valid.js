const validimportKey = prvKey => {
  try {
    if (prvKey === "") {
      return false;
    }
    parseInt(prvKey, 16);
    return true;
  } catch (e) {
    return false;
  }
};

module.exports = {
  validimportKey
};
