"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectRedis = exports.redisClient = void 0;
const redis_1 = require("redis");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.redisClient = (0, redis_1.createClient)({
    socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
        connectTimeout: 50000
    },
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD
});
exports.redisClient.on('connect', () => {
    console.log('[REDIS] CONNECTED');
});
exports.redisClient.on('error', err => {
    console.log(err);
});
const connectRedis = async () => {
    await exports.redisClient.connect();
    return;
};
exports.connectRedis = connectRedis;
//# sourceMappingURL=redis.connect.js.map