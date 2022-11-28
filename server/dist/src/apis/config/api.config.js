"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SEOUL_CITY_API_BASE_URL = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.SEOUL_CITY_API_BASE_URL = "http://openapi.seoul.go.kr:8088/".concat(process.env.SEOUL_CITY_API_ACCESS_KEY_SUB, "/xml/citydata/1/5/");
//# sourceMappingURL=api.config.js.map