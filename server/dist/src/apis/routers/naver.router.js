"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var naver_controller_1 = __importDefault(require("../controllers/naver.controller"));
var router = express_1.default.Router();
router.get('/', naver_controller_1.default.getGeoCodingFromCoords);
exports.default = router;
//# sourceMappingURL=naver.router.js.map