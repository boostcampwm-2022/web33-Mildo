"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var area_config_1 = require("../config/area.config");
var xml2js_1 = __importDefault(require("xml2js"));
var axios_1 = require("../utils/axios");
var population_repository_1 = __importDefault(require("../repositories/population.repository"));
var area_service_1 = __importDefault(require("../services/area.service"));
var population_service_1 = __importDefault(require("../services/population.service"));
var parseAreaName = function (json) {
    return json['SeoulRtd.citydata']['CITYDATA'][0];
};
var parsePopulationData = function (json) {
    return json['SeoulRtd.citydata']['CITYDATA'][0]['LIVE_PPLTN_STTS'][0]['LIVE_PPLTN_STTS'][0];
};
var isVaildCityData = function (json) {
    return json['SeoulRtd.citydata'];
};
var mergeAreaCoordinatePopulation = function (areaCoordinate, areaPopulation) {
    var result = {};
    Object.keys(areaCoordinate).map(function (areaName) {
        result[areaName] = __assign(__assign({}, areaPopulation[areaName]), areaCoordinate[areaName]);
    });
    return result;
};
exports.default = {
    getCityData: function () { return __awaiter(void 0, void 0, void 0, function () {
        var cityData, _a, _b, _c, _i, areaName, cityDataXml, cityDataJson, AREA_NM, _d, AREA_PPLTN_MIN, AREA_PPLTN_MAX, AREA_CONGEST_LVL, PPLTN_TIME;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    cityData = [];
                    _a = area_config_1.AREA_NAMES;
                    _b = [];
                    for (_c in _a)
                        _b.push(_c);
                    _i = 0;
                    _e.label = 1;
                case 1:
                    if (!(_i < _b.length)) return [3, 5];
                    _c = _b[_i];
                    if (!(_c in _a)) return [3, 4];
                    areaName = _c;
                    return [4, (0, axios_1.getAxiosSeoulArea)(areaName)];
                case 2:
                    cityDataXml = _e.sent();
                    return [4, xml2js_1.default.parseStringPromise(cityDataXml)];
                case 3:
                    cityDataJson = _e.sent();
                    if (!isVaildCityData(cityDataJson)) {
                        cityData.push({
                            areaName: areaName,
                            populationMin: '',
                            populationMax: '',
                            populationLevel: '',
                            populationTime: ''
                        });
                        return [3, 4];
                    }
                    AREA_NM = parseAreaName(cityDataJson).AREA_NM;
                    _d = parsePopulationData(cityDataJson), AREA_PPLTN_MIN = _d.AREA_PPLTN_MIN, AREA_PPLTN_MAX = _d.AREA_PPLTN_MAX, AREA_CONGEST_LVL = _d.AREA_CONGEST_LVL, PPLTN_TIME = _d.PPLTN_TIME;
                    cityData.push({
                        areaName: AREA_NM[0],
                        populationMin: AREA_PPLTN_MIN[0],
                        populationMax: AREA_PPLTN_MAX[0],
                        populationLevel: AREA_CONGEST_LVL[0],
                        populationTime: PPLTN_TIME[0]
                    });
                    _e.label = 4;
                case 4:
                    _i++;
                    return [3, 1];
                case 5: return [2, cityData];
            }
        });
    }); },
    saveAreaPopulation: function (cityData) { return __awaiter(void 0, void 0, void 0, function () {
        var newCityData, areaPopulation, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newCityData = cityData.map(function (data) {
                        return __assign(__assign({}, data), { populationMin: +data.populationMin, populationMax: +data.populationMax, populationTime: new Date(data.populationTime) });
                    });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, population_repository_1.default.saveMany(newCityData)];
                case 2:
                    areaPopulation = _a.sent();
                    console.log("[MONGODB] SAVE MANY ".concat(areaPopulation));
                    return [2, true];
                case 3:
                    e_1 = _a.sent();
                    console.log("[MONGODB] ERROR ".concat(e_1));
                    return [2, false];
                case 4: return [2];
            }
        });
    }); },
    getRecentAreaInfo: function () { return __awaiter(void 0, void 0, void 0, function () {
        var recentAreaPopulation, allAreaCoordinate;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, population_service_1.default.getRecentAreaPopulation()];
                case 1:
                    recentAreaPopulation = _a.sent();
                    return [4, area_service_1.default.getAllAreaCoordinate()];
                case 2:
                    allAreaCoordinate = _a.sent();
                    if (recentAreaPopulation && allAreaCoordinate) {
                        return [2, mergeAreaCoordinatePopulation(allAreaCoordinate, recentAreaPopulation)];
                    }
                    return [2, null];
            }
        });
    }); }
};
//# sourceMappingURL=seoul.service.js.map