module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1562055042268, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const defaultRPC_1 = __importDefault(require("./defaultRPC"));
const method_1 = __importDefault(require("./method"));
const paramsFormatter_1 = __importDefault(require("./paramsFormatter"));
const resultFormatter_1 = __importDefault(require("./resultFormatter"));
class CKBRPC extends defaultRPC_1.default {
    constructor(url) {
        super();
        this.node = {
            url: '',
        };
        this.methods = [];
        this.paramsFormatter = paramsFormatter_1.default;
        this.resultFormatter = resultFormatter_1.default;
        this.setDebugLevel = (level) => {
            method_1.default.debugLevel = level;
        };
        this.addMethod = (options) => {
            const method = new method_1.default(this.node, options);
            this.methods.push(method);
            Object.defineProperty(this, options.name, {
                value: method.call,
                enumerable: true,
            });
        };
        this.setNode({
            url,
        });
        this.defaultMethods.map(this.addMethod);
    }
    setNode(node) {
        Object.assign(this.node, node);
        return this.node;
    }
}
exports.default = CKBRPC;
//# sourceMappingURL=index.js.map
}, function(modId) {var map = {"./defaultRPC":1562055042269,"./method":1562055042272,"./paramsFormatter":1562055042270,"./resultFormatter":1562055042271}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1562055042269, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const paramsFormatter_1 = __importDefault(require("./paramsFormatter"));
const resultFormatter_1 = __importDefault(require("./resultFormatter"));
const defaultRPC = [
    {
        name: 'getBlockByNumber',
        method: 'get_block_by_number',
        paramsFormatters: [paramsFormatter_1.default.toNumber],
        resultFormatters: resultFormatter_1.default.toBlock,
    },
    {
        name: 'getBlock',
        method: 'get_block',
        paramsFormatters: [paramsFormatter_1.default.toHash],
        resultFormatters: resultFormatter_1.default.toBlock,
    },
    {
        name: 'getTransaction',
        method: 'get_transaction',
        paramsFormatters: [paramsFormatter_1.default.toHash, paramsFormatter_1.default.toNumber, paramsFormatter_1.default.toNumber],
        resultFormatters: resultFormatter_1.default.toTransactionWithStatus,
    },
    {
        name: 'getBlockHash',
        method: 'get_block_hash',
        paramsFormatters: [paramsFormatter_1.default.toNumber],
    },
    {
        name: 'getTipHeader',
        method: 'get_tip_header',
        paramsFormatters: [],
        resultFormatters: resultFormatter_1.default.toHeader,
    },
    {
        name: 'getCellsByLockHash',
        method: 'get_cells_by_lock_hash',
        paramsFormatters: [paramsFormatter_1.default.toHash, paramsFormatter_1.default.toNumber, paramsFormatter_1.default.toNumber],
        resultFormatters: resultFormatter_1.default.toCellsIncludingOutPoint,
    },
    {
        name: 'getLiveCell',
        method: 'get_live_cell',
        paramsFormatters: [paramsFormatter_1.default.toOutPoint],
        resultFormatters: resultFormatter_1.default.toCellWithStatus,
    },
    {
        name: 'getTipBlockNumber',
        method: 'get_tip_block_number',
        paramsFormatters: [],
        resultFormatters: resultFormatter_1.default.toNumber,
    },
    {
        name: 'getBlockchainInfo',
        method: 'get_blockchain_info',
        paramsFormatters: [],
        resultFormatters: resultFormatter_1.default.toBlockchainInfo,
    },
    {
        name: 'sendTransaction',
        method: 'send_transaction',
        paramsFormatters: [paramsFormatter_1.default.toRawTransaction],
        resultFormatters: resultFormatter_1.default.toHash,
    },
    {
        name: 'localNodeInfo',
        method: 'local_node_info',
        paramsFormatters: [],
        resultFormatters: resultFormatter_1.default.toNodeInfo,
    },
    {
        name: 'txPoolInfo',
        method: 'tx_pool_info',
        paramsFormatters: [],
        resultFormatters: resultFormatter_1.default.toTxPoolInfo,
    },
    {
        name: 'getPeers',
        method: 'get_peers',
        paramsFormatters: [],
        resultFormatters: resultFormatter_1.default.toPeers,
    },
    {
        name: 'getPeersState',
        method: 'get_peers_state',
        paramsFormatters: [],
        resultFormatters: resultFormatter_1.default.toPeersState,
    },
    {
        name: 'getCurrentEpoch',
        method: 'get_current_epoch',
        paramsFormatters: [],
        resultFormatters: resultFormatter_1.default.toEpoch,
    },
    {
        name: 'getEpochByNumber',
        method: 'get_epoch_by_number',
        paramsFormatters: [paramsFormatter_1.default.toNumber],
        resultFormatters: resultFormatter_1.default.toEpoch,
    },
    {
        name: 'dryRunTransaction',
        method: 'dry_run_transaction',
        paramsFormatters: [paramsFormatter_1.default.toRawTransaction],
    },
    {
        name: 'deindexLockHash',
        method: 'deindex_lock_hash',
        paramsFormatters: [paramsFormatter_1.default.toHash],
    },
    {
        name: 'getLiveCellsByLockHash',
        method: 'get_live_cells_by_lock_hash',
        paramsFormatters: [paramsFormatter_1.default.toHash, paramsFormatter_1.default.toPageNumber, paramsFormatter_1.default.toPageSize, paramsFormatter_1.default.toReverseOrder],
        resultFormatters: resultFormatter_1.default.toLiveCellsByLockHash,
    },
    {
        name: 'getLockHashIndexStates',
        method: 'get_lock_hash_index_states',
        paramsFormatters: [],
        resultFormatters: resultFormatter_1.default.toLockHashIndexStates,
    },
    {
        name: 'getTransactionsByLockHash',
        method: 'get_transactions_by_lock_hash',
        paramsFormatters: [paramsFormatter_1.default.toHash, paramsFormatter_1.default.toPageNumber, paramsFormatter_1.default.toPageSize, paramsFormatter_1.default.toReverseOrder],
        resultFormatters: resultFormatter_1.default.toTransactionsByLockHash,
    },
    {
        name: 'indexLockHash',
        method: 'index_lock_hash',
        paramsFormatters: [paramsFormatter_1.default.toHash],
        resultFormatters: resultFormatter_1.default.toLockHashIndexState,
    },
];
class DefaultRPC {
    constructor() {
        this.defaultMethods = defaultRPC;
    }
}
exports.DefaultRPC = DefaultRPC;
exports.default = DefaultRPC;
//# sourceMappingURL=defaultRPC.js.map
}, function(modId) { var map = {"./paramsFormatter":1562055042270,"./resultFormatter":1562055042271}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1562055042270, function(require, module, exports) {

var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const formatter = {
    toScript: (_a) => {
        var { codeHash: code_hash } = _a, rest = __rest(_a, ["codeHash"]);
        return (Object.assign({ code_hash }, rest));
    },
    toHash: (hash) => (hash.startsWith('0x') ? hash : `0x${hash}`),
    toCellOutPoint: (_a) => {
        var { txHash: tx_hash } = _a, rest = __rest(_a, ["txHash"]);
        return (Object.assign({ tx_hash }, rest));
    },
    toOutPoint: (_a) => {
        var { cell = null, blockHash: block_hash = null } = _a, rest = __rest(_a, ["cell", "blockHash"]);
        return (Object.assign({ cell: cell ? formatter.toCellOutPoint(cell) : cell, block_hash }, rest));
    },
    toNumber: (number) => number.toString(),
    toInput: (_a) => {
        var { previousOutput } = _a, rest = __rest(_a, ["previousOutput"]);
        return (Object.assign({ previous_output: formatter.toOutPoint(previousOutput) }, rest));
    },
    toOutput: (_a) => {
        var { lock, type } = _a, rest = __rest(_a, ["lock", "type"]);
        return (Object.assign({ lock: formatter.toScript(lock), type: type ? formatter.toScript(type) : null }, rest));
    },
    toRawTransaction: (_a) => {
        var { version, deps, inputs, outputs } = _a, rest = __rest(_a, ["version", "deps", "inputs", "outputs"]);
        const formattedInputs = inputs.map(input => formatter.toInput(input));
        const formattedOutputs = outputs.map(output => formatter.toOutput(output));
        const formattedDeps = deps.map(dep => formatter.toOutPoint(dep));
        const tx = Object.assign({ version, deps: formattedDeps, inputs: formattedInputs, outputs: formattedOutputs }, rest);
        return tx;
    },
    toPageNumber: (pageNo = '1') => pageNo.toString(),
    toPageSize: (pageSize = 50) => {
        const size = +pageSize || 50;
        if (size > 50)
            throw new Error('Page size is up to 50');
        if (size < 0)
            throw new Error('Page size is expected to be positive');
        return `${size}`;
    },
    toReverseOrder: (reverse = false) => !!reverse,
};
exports.default = formatter;
//# sourceMappingURL=paramsFormatter.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1562055042271, function(require, module, exports) {

var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const formatter = {
    toNumber: (number) => number.toString(),
    toHash: (hash) => hash,
    toHeader: (header) => {
        if (!header)
            return header;
        const { transactions_root, proposals_hash, witnesses_root, uncles_hash, uncles_count, parent_hash } = header, rest = __rest(header, ["transactions_root", "proposals_hash", "witnesses_root", "uncles_hash", "uncles_count", "parent_hash"]);
        return Object.assign({ parentHash: parent_hash, transactionsRoot: transactions_root, proposalsHash: proposals_hash, witnessesRoot: witnesses_root, unclesHash: uncles_hash, unclesCount: uncles_count }, rest);
    },
    toScript: (script) => {
        if (!script)
            return script;
        const { code_hash: codeHash } = script, rest = __rest(script, ["code_hash"]);
        return Object.assign({ codeHash }, rest);
    },
    toInput: (input) => {
        if (!input)
            return input;
        const { previous_output: previousOutput } = input, rest = __rest(input, ["previous_output"]);
        return Object.assign({ previousOutput: formatter.toOutPoint(previousOutput) }, rest);
    },
    toOutput: (output) => {
        if (!output)
            return output;
        const { lock, type } = output, rest = __rest(output, ["lock", "type"]);
        return Object.assign({ lock: formatter.toScript(lock), type: type ? formatter.toScript(type) : type }, rest);
    },
    toCellOutPoint: (cellOutPoint) => {
        if (!cellOutPoint)
            return cellOutPoint;
        const { tx_hash: txHash } = cellOutPoint, rest = __rest(cellOutPoint, ["tx_hash"]);
        return Object.assign({ txHash }, rest);
    },
    toOutPoint: (outPoint) => {
        if (!outPoint)
            return outPoint;
        const { block_hash: blockHash = null, cell = null } = outPoint;
        return {
            blockHash,
            cell: cell ? formatter.toCellOutPoint(cell) : cell,
        };
    },
    toTransaction: (tx) => {
        if (!tx)
            return tx;
        const { deps = [], inputs = [], outputs = [] } = tx, rest = __rest(tx, ["deps", "inputs", "outputs"]);
        return Object.assign({ deps: deps.map(formatter.toOutPoint), inputs: inputs.map(formatter.toInput), outputs: outputs.map(formatter.toOutput) }, rest);
    },
    toUncleBlock: (uncleBlock) => {
        if (!uncleBlock)
            return uncleBlock;
        const { header } = uncleBlock, rest = __rest(uncleBlock, ["header"]);
        return Object.assign({ header: formatter.toHeader(header) }, rest);
    },
    toBlock: (block) => {
        if (!block)
            return block;
        const { header, uncles = [], transactions = [] } = block, rest = __rest(block, ["header", "uncles", "transactions"]);
        return Object.assign({ header: formatter.toHeader(header), uncles: uncles.map(formatter.toUncleBlock), transactions: transactions.map(formatter.toTransaction) }, rest);
    },
    toAlertMessage: (alertMessage) => {
        if (!alertMessage)
            return alertMessage;
        const { notice_until: noticeUntil } = alertMessage, rest = __rest(alertMessage, ["notice_until"]);
        return Object.assign({ noticeUntil }, rest);
    },
    toBlockchainInfo: (info) => {
        if (!info)
            return info;
        const { is_initial_block_download: isInitialBlockDownload, median_time: medianTime, alerts } = info, rest = __rest(info, ["is_initial_block_download", "median_time", "alerts"]);
        return Object.assign({ isInitialBlockDownload,
            medianTime, alerts: alerts.map(formatter.toAlertMessage) }, rest);
    },
    toNodeInfo: (info) => {
        if (!info)
            return info;
        const { node_id: nodeId, is_outbound: isOutbound } = info, rest = __rest(info, ["node_id", "is_outbound"]);
        return Object.assign({ nodeId,
            isOutbound }, rest);
    },
    toTxPoolInfo: (info) => {
        if (!info)
            return info;
        const { last_txs_updated_at: lastTxsUpdatedAt, total_tx_cycles: totalTxCycles, total_tx_size: totalTxSize } = info, rest = __rest(info, ["last_txs_updated_at", "total_tx_cycles", "total_tx_size"]);
        return Object.assign({ lastTxsUpdatedAt,
            totalTxCycles,
            totalTxSize }, rest);
    },
    toPeers: (nodes = []) => nodes.map(formatter.toNodeInfo),
    toPeersState: (state) => {
        if (!state)
            return state;
        const { last_updated: lastUpdated, blocks_in_flight: blocksInFlight } = state, rest = __rest(state, ["last_updated", "blocks_in_flight"]);
        return Object.assign({ lastUpdated,
            blocksInFlight }, rest);
    },
    toCell: (cell) => {
        if (!cell)
            return cell;
        const { lock, type } = cell, rest = __rest(cell, ["lock", "type"]);
        return Object.assign({ lock: formatter.toScript(lock), type: type ? formatter.toScript(type) : null }, rest);
    },
    toCellWithStatus: (cellWithStatus) => {
        if (!cellWithStatus)
            return cellWithStatus;
        const { cell } = cellWithStatus, rest = __rest(cellWithStatus, ["cell"]);
        return Object.assign({ cell: formatter.toCell(cell) }, rest);
    },
    toCells: (cells = []) => cells.map(formatter.toCell),
    toCellIncludingOutPoint: (cell) => {
        if (!cell)
            return cell;
        const { lock, out_point } = cell, rest = __rest(cell, ["lock", "out_point"]);
        return Object.assign({ lock: formatter.toScript(lock), outPoint: formatter.toOutPoint(out_point) }, rest);
    },
    toCellsIncludingOutPoint: (cells = []) => cells.map(formatter.toCellIncludingOutPoint),
    toTransactionWithStatus: (txWithStatus) => {
        if (!txWithStatus)
            return txWithStatus;
        const { transaction, tx_status: { block_hash: blockHash, status } } = txWithStatus, rest = __rest(txWithStatus, ["transaction", "tx_status"]);
        return Object.assign({ transaction: formatter.toTransaction(transaction), txStatus: {
                blockHash,
                status,
            } }, rest);
    },
    toEpoch: (epoch) => {
        if (!epoch)
            return epoch;
        const { epoch_reward: epochReward, start_number: startNumber } = epoch, rest = __rest(epoch, ["epoch_reward", "start_number"]);
        return Object.assign({ epochReward,
            startNumber }, rest);
    },
    toTransactionPoint: (transactionPoint) => {
        if (!transactionPoint)
            return transactionPoint;
        const { block_number: blockNumber, tx_hash: txHash } = transactionPoint, rest = __rest(transactionPoint, ["block_number", "tx_hash"]);
        return Object.assign({ blockNumber,
            txHash }, rest);
    },
    toTransactionsByLockHash: (transactions) => {
        if (!transactions)
            return transactions;
        return transactions.map(tx => ({
            consumedBy: tx.consumed_by ? formatter.toTransactionPoint(tx.consumed_by) : tx.consumed_by,
            createdBy: formatter.toTransactionPoint(tx.created_by),
        }));
    },
    toLiveCellsByLockHash: (cells) => {
        if (!cells)
            return cells;
        return cells.map(cell => ({
            cellOutput: formatter.toCell(cell.cell_output),
            createdBy: formatter.toTransactionPoint(cell.created_by),
        }));
    },
    toLockHashIndexState: (index) => {
        if (!index)
            return index;
        const { block_hash: blockHash, block_number: blockNumber, lock_hash: lockHash } = index, rest = __rest(index, ["block_hash", "block_number", "lock_hash"]);
        return Object.assign({ blockHash,
            blockNumber,
            lockHash }, rest);
    },
    toLockHashIndexStates: (states) => {
        if (!states)
            return states;
        return states.map(formatter.toLockHashIndexState);
    },
};
exports.default = formatter;
//# sourceMappingURL=resultFormatter.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1562055042272, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const enum_1 = require("./enum");
class Method {
    constructor(node, options) {
        this.options = {
            name: '',
            method: '',
            paramsFormatters: [],
            resultFormatters: undefined,
        };
        this.call = (...params) => {
            const data = params.map((p, i) => (this.options.paramsFormatters[i] && this.options.paramsFormatters[i](p)) || p);
            const id = Math.round(Math.random() * 10000);
            const payload = {
                id,
                method: this.options.method,
                params: data,
                jsonrpc: '2.0',
            };
            return axios_1.default({
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                data: payload,
                url: this.node.url,
            }).then(res => {
                if (res.data.id !== id) {
                    throw new Error('JSONRPC id not match');
                }
                if (Method.debugLevel === enum_1.DebugLevel.On) {
                    console.group();
                    console.group();
                    console.info(enum_1.LogColor.Cyan, `\n----- ${this.options.name} request -----`, enum_1.LogColor.Reset);
                    console.info(JSON.stringify(payload, null, 2));
                    console.groupEnd();
                    console.group();
                    console.info(enum_1.LogColor.Cyan, `----- ${this.options.name} response -----`, enum_1.LogColor.Reset);
                    console.info(JSON.stringify(res.data, null, 2));
                    console.groupEnd();
                    console.groupEnd();
                }
                if (res.data.error) {
                    throw new Error(JSON.stringify(res.data.error));
                }
                return this.options.resultFormatters ? this.options.resultFormatters(res.data.result) : res.data.result;
            });
        };
        this.node = node;
        this.options = options;
    }
}
Method.debugLevel = enum_1.DebugLevel.Off;
exports.default = Method;
//# sourceMappingURL=method.js.map
}, function(modId) { var map = {"./enum":1562055042273}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1562055042273, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var DebugLevel;
(function (DebugLevel) {
    DebugLevel[DebugLevel["Off"] = 0] = "Off";
    DebugLevel[DebugLevel["On"] = 1] = "On";
})(DebugLevel = exports.DebugLevel || (exports.DebugLevel = {}));
var LogColor;
(function (LogColor) {
    LogColor["Reset"] = "\u001B[0m";
    LogColor["Black"] = "\u001B[30m";
    LogColor["Red"] = "\u001B[31m";
    LogColor["Green"] = "\u001B[32m";
    LogColor["Yellow"] = "\u001B[33m";
    LogColor["Blue"] = "\u001B[34m";
    LogColor["Magenta"] = "\u001B[35m";
    LogColor["Cyan"] = "\u001B[36m";
    LogColor["White"] = "\u001B[37m";
})(LogColor = exports.LogColor || (exports.LogColor = {}));
//# sourceMappingURL=enum.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1562055042268);
})()
//# sourceMappingURL=index.js.map