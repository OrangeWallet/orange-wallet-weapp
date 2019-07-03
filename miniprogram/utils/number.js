const hexToBytes = rawhex => {
  let hex = rawhex.toString(16);

  hex = hex.replace(/^0x/i, "");
  hex = hex.length % 2 ? `0${hex}` : hex;

  const bytes = [];
  for (let c = 0; c < hex.length; c += 2) {
    bytes.push(parseInt(hex.substr(c, 2), 16));
  }
  return new Uint8Array(bytes);
};

const encodeUtf8 = text => {
  const code = encodeURIComponent(text);
  const bytes = [];
  for (var i = 0; i < code.length; i++) {
    const c = code.charAt(i);
    if (c === "%") {
      const hex = code.charAt(i + 1) + code.charAt(i + 2);
      const hexVal = parseInt(hex, 16);
      bytes.push(hexVal);
      i += 2;
    } else bytes.push(c.charCodeAt(0));
  }
  return bytes;
};

const decodeUtf8 = bytes => {
  var encoded = "";
  for (var i = 0; i < bytes.length; i++) {
    encoded += "%" + bytes[i].toString(16);
  }
  return decodeURIComponent(encoded);
};

module.exports = {
  hexToBytes,
  encodeUtf8,
  decodeUtf8
};
