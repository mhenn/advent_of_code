var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var fs = require('fs');
var readline = require('readline');
var Decision = {
    X: 1,
    Y: 2,
    Z: 3
};
var OutcomeScore = {
    Loss: 0,
    Draw: 3,
    Win: 6
};
var Matchup = {
    A: {
        X: "Draw",
        Y: "Win",
        Z: "Loss"
    },
    B: {
        X: "Loss",
        Y: "Draw",
        Z: "Win"
    },
    C: {
        X: "Win",
        Y: "Loss",
        Z: "Draw"
    }
};
function reverse(Matchup) {
    var reversed = {};
    for (var key in Matchup) {
        var rev = Object.entries(Matchup[key]).map(function (_a) {
            var k = _a[0], v = _a[1];
            return [v, k];
        });
        reversed[key] = Object.fromEntries(rev);
    }
    return reversed;
}
var GameOutcome = {
    X: "Loss",
    Y: "Draw",
    Z: "Win"
};
function calculateScore(opponent, player) {
    return Decision[player] + OutcomeScore[Matchup[opponent][player]];
}
function calcRoundTwo(opponent, outcome, matchup) {
    var state = GameOutcome[outcome];
    var decisionScore = Decision[matchup[opponent][state]];
    return OutcomeScore[state] + decisionScore;
}
function main() {
    var _a, e_1, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var sum, match, rl, _d, rl_1, rl_1_1, line, _e, opponent, player, e_1_1;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    sum = 0;
                    match = reverse(Matchup);
                    rl = readline.createInterface({ input: fs.createReadStream("./static/input") });
                    _f.label = 1;
                case 1:
                    _f.trys.push([1, 6, 7, 12]);
                    _d = true, rl_1 = __asyncValues(rl);
                    _f.label = 2;
                case 2: return [4 /*yield*/, rl_1.next()];
                case 3:
                    if (!(rl_1_1 = _f.sent(), _a = rl_1_1.done, !_a)) return [3 /*break*/, 5];
                    _c = rl_1_1.value;
                    _d = false;
                    try {
                        line = _c;
                        _e = line.split(" "), opponent = _e[0], player = _e[1];
                        //sum += calculateScore(opponent, player)
                        sum += calcRoundTwo(opponent, player, match);
                    }
                    finally {
                        _d = true;
                    }
                    _f.label = 4;
                case 4: return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_1_1 = _f.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _f.trys.push([7, , 10, 11]);
                    if (!(!_d && !_a && (_b = rl_1["return"]))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _b.call(rl_1)];
                case 8:
                    _f.sent();
                    _f.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12:
                    console.log(sum);
                    return [2 /*return*/];
            }
        });
    });
}
main();
