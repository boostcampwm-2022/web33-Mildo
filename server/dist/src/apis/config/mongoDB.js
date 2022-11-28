"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var connectMongoDB = function () {
    mongoose_1.default
        .connect(process.env.MONGODB_CONNECT_URI)
        .then(function () {
        console.log('[MONGODB] CONNECTED');
    })
        .catch(function (e) {
        console.log("[MONGODB] ERROR ".concat(e));
    });
};
exports.default = connectMongoDB;
//# sourceMappingURL=mongoDB.js.map