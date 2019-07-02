module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1562055042267, function(require, module, exports) {

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ckb_sdk_rpc_1 = __importDefault(require("@nervosnetwork/ckb-sdk-rpc"));
const ckb_sdk_address_1 = __importDefault(require("@nervosnetwork/ckb-sdk-address"));
const utils = __importStar(require("@nervosnetwork/ckb-sdk-utils"));
class Core {
    constructor(nodeUrl) {
        this.utils = utils;
        this.config = {
            systemCellInfo: {
                codeHash: '',
                outPoint: {
                    blockHash: '',
                    cell: {
                        txHash: '',
                        index: '0',
                    },
                },
            },
        };
        this.generateAddress = (privateKey, { prefix = utils.AddressPrefix.Testnet, type = utils.AddressType.BinIdx, binIdx = utils.AddressBinIdx.P2PH } = {
            prefix: utils.AddressPrefix.Testnet,
            type: utils.AddressType.BinIdx,
            binIdx: utils.AddressBinIdx.P2PH,
        }) => new ckb_sdk_address_1.default(privateKey, {
            prefix,
            type,
            binIdx,
        });
        this.loadSystemCell = () => __awaiter(this, void 0, void 0, function* () {
            const block = yield this.rpc.getBlockByNumber('0');
            if (!block)
                throw new Error('Cannot load the genesis block');
            const cellTx = block.transactions[0];
            if (!cellTx)
                throw new Error('Cannot load the transaction which has the system cell');
            const cell = cellTx.outputs[1];
            if (!cell)
                throw new Error('Cannot load the system cell');
            const s = this.utils.blake2b(32, null, null, this.utils.PERSONAL);
            s.update(this.utils.hexToBytes(cell.data.replace(/^0x/, '')));
            const codeHash = s.digest('hex');
            const outPoint = {
                blockHash: block.header.hash.replace(/^0x/, ''),
                cell: {
                    txHash: cellTx.hash.replace(/^0x/, ''),
                    index: '1',
                },
            };
            this.config.systemCellInfo = {
                codeHash,
                outPoint,
            };
            return this.config.systemCellInfo;
        });
        this.signWitnesses = (key) => ({ transactionHash, witnesses = [], }) => {
            if (!key)
                throw new Error('Private key or address object is required');
            if (!transactionHash)
                throw new Error('Transaction hash is required');
            const addrObj = typeof key === 'string' ? this.generateAddress(key) : key;
            const signedWitnesses = witnesses.map(witness => {
                const oldData = witness.data || [];
                const s = this.utils.blake2b(32, null, null, this.utils.PERSONAL);
                s.update(this.utils.hexToBytes(transactionHash.replace(/^0x/, '')));
                oldData.forEach(datum => {
                    s.update(this.utils.hexToBytes(datum));
                });
                const message = s.digest('hex');
                const data = [`0x${addrObj.signRecoverable(message)}`, ...oldData];
                return {
                    data,
                };
            });
            return signedWitnesses;
        };
        this.signTransaction = (key) => (transaction) => __awaiter(this, void 0, void 0, function* () {
            if (!key)
                throw new Error('Private key or address object is required');
            if (!transaction)
                throw new Error('Transaction is required');
            if (!transaction.witnesses)
                throw new Error('Witnesses is required');
            if (transaction.witnesses.length < transaction.inputs.length)
                throw new Error('Invalid count of witnesses');
            const transactionHash = yield this.rpc.computeTransactionHash(transaction);
            const signedWitnesses = yield this.signWitnesses(key)({
                transactionHash,
                witnesses: transaction.witnesses,
            });
            return Object.assign({}, transaction, { witnesses: signedWitnesses });
        });
        this._node = {
            url: nodeUrl,
        };
        this.rpc = new ckb_sdk_rpc_1.default(nodeUrl);
        const computeTransactionHashMethod = {
            name: 'computeTransactionHash',
            method: '_compute_transaction_hash',
            paramsFormatters: [this.rpc.paramsFormatter.toRawTransaction],
        };
        this.rpc.addMethod(computeTransactionHashMethod);
    }
    setNode(node) {
        if (typeof node === 'string') {
            this._node.url = node;
        }
        else {
            this._node = node;
        }
        this.rpc.setNode(this._node);
        return this._node;
    }
    get node() {
        return this._node;
    }
}
exports.default = Core;
//# sourceMappingURL=index.js.map
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1562055042267);
})()
//# sourceMappingURL=index.js.map