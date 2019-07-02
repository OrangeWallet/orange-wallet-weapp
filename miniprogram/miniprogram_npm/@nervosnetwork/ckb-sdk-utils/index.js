module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1562055042290, function(require, module, exports) {

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util = __importStar(require("util"));
const crypto_1 = __importDefault(require("./crypto"));
__export(require("./address"));
exports.blake2b = crypto_1.default.blake2b, exports.bech32 = crypto_1.default.bech32, exports.blake160 = crypto_1.default.blake160;
const textEncoder = new (typeof TextEncoder !== 'undefined' ? TextEncoder : util.TextEncoder)();
const textDecoder = new (typeof TextDecoder !== 'undefined' ? TextDecoder : util.TextDecoder)();
exports.PERSONAL = textEncoder.encode('ckb-default-hash');
exports.hexToBytes = (rawhex) => {
    let hex = rawhex.toString(16);
    hex = hex.replace(/^0x/i, '');
    hex = hex.length % 2 ? `0${hex}` : hex;
    const bytes = [];
    for (let c = 0; c < hex.length; c += 2) {
        bytes.push(parseInt(hex.substr(c, 2), 16));
    }
    return new Uint8Array(bytes);
};
exports.bytesToHex = (bytes) => {
    const hex = [];
    for (let i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xf).toString(16));
    }
    return hex.join('');
};
exports.bytesToUtf8 = (bytes) => textDecoder.decode(bytes);
exports.hexToUtf8 = (hex) => exports.bytesToUtf8(exports.hexToBytes(hex));
exports.utf8ToBytes = (str) => textEncoder.encode(str);
exports.utf8ToHex = (str) => exports.bytesToHex(exports.utf8ToBytes(str));
exports.lockScriptToHash = ({ codeHash, args }) => {
    const s = exports.blake2b(32, null, null, exports.PERSONAL);
    if (codeHash) {
        s.update(exports.hexToBytes(codeHash.replace(/^0x/, '')));
    }
    if (args && args.length) {
        args.forEach(arg => (typeof arg === 'string' ? s.update(exports.hexToBytes(arg)) : s.update(arg)));
    }
    const digest = s.digest('hex');
    return digest;
};
//# sourceMappingURL=index.js.map
}, function(modId) {var map = {"./crypto":1562055042291,"./address":1562055042294}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1562055042291, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blake2b_wasm_1 = __importDefault(require("blake2b-wasm"));
const bech32_1 = __importDefault(require("./bech32"));
const blake160_1 = __importDefault(require("./blake160"));
module.exports = {
    blake2b: blake2b_wasm_1.default,
    blake160: blake160_1.default,
    bech32: bech32_1.default,
};
exports.default = {
    blake2b: blake2b_wasm_1.default,
    blake160: blake160_1.default,
    bech32: bech32_1.default,
};
//# sourceMappingURL=index.js.map
}, function(modId) { var map = {"./bech32":1562055042292,"./blake160":1562055042293}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1562055042292, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
const ALPHABET = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';
const LIMIT = 90;
const SEPARATOR = '1';
const alphabetMap = new Map();
for (let i = 0; i < ALPHABET.length; i++) {
    const char = ALPHABET.charAt(i);
    if (alphabetMap.get(char) !== undefined) {
        throw new TypeError(`${char} is ambiguous`);
    }
    alphabetMap.set(char, i);
}
const polymodStep = (values) => {
    const b = values >> 25;
    return (((values & 0x1ffffff) << 5) ^
        (-((b >> 0) & 1) & 0x3b6a57b2) ^
        (-((b >> 1) & 1) & 0x26508e6d) ^
        (-((b >> 2) & 1) & 0x1ea119fa) ^
        (-((b >> 3) & 1) & 0x3d4233dd) ^
        (-((b >> 4) & 1) & 0x2a1462b3));
};
const prefixChecksum = (prefix) => {
    let checksum = 1;
    for (let i = 0; i < prefix.length; ++i) {
        const c = prefix.charCodeAt(i);
        if (c < 33 || c > 126)
            throw new Error(`Invalid prefix (${prefix})`);
        checksum = polymodStep(checksum) ^ (c >> 5);
    }
    checksum = polymodStep(checksum);
    for (let i = 0; i < prefix.length; ++i) {
        const v = prefix.charCodeAt(i);
        checksum = polymodStep(checksum) ^ (v & 0x1f);
    }
    return checksum;
};
exports.encode = (prefix, words, limit = LIMIT) => {
    const formattedPrefix = prefix.toLowerCase();
    if (formattedPrefix.length + 7 + words.length > limit)
        throw new TypeError('Exceeds length limit');
    let checksum = prefixChecksum(formattedPrefix);
    let result = `${formattedPrefix}${SEPARATOR}`;
    for (let i = 0; i < words.length; ++i) {
        const x = words[i];
        if (x >> 5 !== 0)
            throw new Error('Non 5-bit word');
        checksum = polymodStep(checksum) ^ x;
        result += ALPHABET.charAt(x);
    }
    for (let i = 0; i < 6; ++i) {
        checksum = polymodStep(checksum);
    }
    checksum ^= 1;
    for (let i = 0; i < 6; ++i) {
        const v = (checksum >> ((5 - i) * 5)) & 0x1f;
        result += ALPHABET.charAt(v);
    }
    return result;
};
exports.decode = (encoded, limit = LIMIT) => {
    const lowered = encoded.toLowerCase();
    const uppered = encoded.toUpperCase();
    if (encoded !== lowered && encoded !== uppered)
        throw new Error(`Mixed-case string ${encoded}`);
    const str = lowered;
    if (str.length < 8)
        throw new TypeError(`${str} too short`);
    if (str.length > limit)
        throw new TypeError('Exceeds length limit');
    const split = str.lastIndexOf(SEPARATOR);
    if (split === -1)
        throw new Error(`No separator character for ${str}`);
    if (split === 0)
        throw new Error(`Missing prefix for ${str}`);
    const prefix = str.slice(0, split);
    const wordChars = str.slice(split + 1);
    if (wordChars.length < 6)
        throw new Error('Data too short');
    let checksum = prefixChecksum(prefix);
    const words = [];
    wordChars.split('').forEach((_, i) => {
        const c = wordChars.charAt(i);
        const v = alphabetMap.get(c);
        if (v === undefined)
            throw new Error(`Unknown character ${c}`);
        checksum = polymodStep(checksum) ^ v;
        if (i + 6 < wordChars.length) {
            words.push(v);
        }
    });
    if (checksum !== 1)
        throw new Error(`Invalid checksum for ${str}`);
    return {
        prefix,
        words,
    };
};
const convert = (data, inBits, outBits, pad) => {
    let value = 0;
    let bits = 0;
    const maxV = (1 << outBits) - 1;
    const result = [];
    for (let i = 0; i < data.length; ++i) {
        value = (value << inBits) | data[i];
        bits += inBits;
        while (bits >= outBits) {
            bits -= outBits;
            result.push((value >> bits) & maxV);
        }
    }
    if (pad) {
        if (bits > 0) {
            result.push((value << (outBits - bits)) & maxV);
        }
    }
    else {
        if (bits >= inBits)
            throw new Error('Excess padding');
        if ((value << (outBits - bits)) & maxV)
            throw new Error('Non-zero padding');
    }
    return new Uint8Array(result);
};
exports.toWords = (bytes) => convert(bytes, 8, 5, true);
exports.fromWords = (words) => convert(words, 5, 8, false);
exports.default = {
    decode: exports.decode,
    encode: exports.encode,
    toWords: exports.toWords,
    fromWords: exports.fromWords,
};
//# sourceMappingURL=bech32.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1562055042293, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blake2b_wasm_1 = __importDefault(require("blake2b-wasm"));
const index_1 = require("../index");
exports.blake160 = (data, encode = 'binary') => {
    const formattedData = typeof data === 'string' ? index_1.hexToBytes(data) : data;
    const s = blake2b_wasm_1.default(32, null, null, index_1.PERSONAL);
    s.update(formattedData);
    return s.digest(encode).slice(0, encode === 'binary' ? 20 : 40);
};
exports.default = exports.blake160;
//# sourceMappingURL=blake160.js.map
}, function(modId) { var map = {"../index":1562055042290}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1562055042294, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
var AddressPrefix;
(function (AddressPrefix) {
    AddressPrefix["Mainnet"] = "ckb";
    AddressPrefix["Testnet"] = "ckt";
})(AddressPrefix = exports.AddressPrefix || (exports.AddressPrefix = {}));
var AddressType;
(function (AddressType) {
    AddressType["BinHash"] = "0x00";
    AddressType["BinIdx"] = "0x01";
})(AddressType = exports.AddressType || (exports.AddressType = {}));
var AddressBinIdx;
(function (AddressBinIdx) {
    AddressBinIdx["P2PH"] = "P2PH";
})(AddressBinIdx = exports.AddressBinIdx || (exports.AddressBinIdx = {}));
exports.defaultAddressOptions = {
    prefix: AddressPrefix.Testnet,
    type: AddressType.BinIdx,
    binIdx: AddressBinIdx.P2PH,
};
exports.toAddressPayload = (identifier, type = AddressType.BinIdx, params = AddressBinIdx.P2PH) => {
    if (typeof identifier === 'string') {
        return new Uint8Array([...__1.hexToBytes(type), ...__1.utf8ToBytes(params), ...__1.hexToBytes(identifier)]);
    }
    return new Uint8Array([...__1.hexToBytes(type), ...__1.utf8ToBytes(params), ...identifier]);
};
exports.toAddressIdentifier = exports.toAddressPayload;
exports.bech32Address = (data, { prefix = AddressPrefix.Testnet, type = AddressType.BinIdx, binIdx = AddressBinIdx.P2PH, } = exports.defaultAddressOptions) => __1.bech32.encode(prefix, __1.bech32.toWords(exports.toAddressIdentifier(data, type, binIdx)));
exports.pubkeyToAddress = (pubkey, { prefix = AddressPrefix.Testnet, type = AddressType.BinIdx, binIdx = AddressBinIdx.P2PH, } = exports.defaultAddressOptions) => {
    const identifier = __1.blake160(pubkey);
    return exports.bech32Address(identifier, {
        prefix,
        type,
        binIdx,
    });
};
exports.parseAddress = (address, prefix = AddressPrefix.Testnet, encode = 'binary') => {
    const decoded = __1.bech32.decode(address);
    if (decoded.prefix !== prefix) {
        throw new Error('Prefix not matched');
    }
    const data = __1.bech32.fromWords(new Uint8Array(decoded.words));
    return encode === 'binary' ? data : __1.bytesToHex(data);
};
//# sourceMappingURL=index.js.map
}, function(modId) { var map = {"..":1562055042290}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1562055042290);
})()
//# sourceMappingURL=index.js.map