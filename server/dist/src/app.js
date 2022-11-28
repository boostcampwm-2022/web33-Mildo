"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var apis_1 = __importDefault(require("./apis"));
var dotenv_1 = __importDefault(require("dotenv"));
var mongoDB_1 = __importDefault(require("./apis/config/mongoDB"));
var cors_1 = __importDefault(require("cors"));
var constants_1 = require("./apis/config/constants");
dotenv_1.default.config();
var app = (0, express_1.default)();
var clientURL = process.env.NODE_ENV === constants_1.DEVELOPMENT
    ? process.env.CLIENT_URL_DEVELOPMENT
    : process.env.CLIENT_URL_PRODUCTION;
app.use((0, cors_1.default)({ origin: clientURL, credentials: true }));
app.get('/', function (_, res) {
    res.send('Hello World!');
});
(0, mongoDB_1.default)();
app.use('/api', apis_1.default);
app.listen(process.env.API_SERVER_PORT, function () {
    console.log("[API SERVER] listening on *:".concat(process.env.API_SERVER_PORT));
    console.log("[NODE MODE] ".concat(process.env.NODE_ENV));
    console.log(clientURL);
});
//# sourceMappingURL=app.js.map