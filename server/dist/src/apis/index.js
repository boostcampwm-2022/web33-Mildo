"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var seoul_router_1 = __importDefault(require("./routers/seoul.router"));
var naver_router_1 = __importDefault(require("./routers/naver.router"));
var router = express_1.default.Router();
router.use('/seoul', seoul_router_1.default);
router.use('/naver', naver_router_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map