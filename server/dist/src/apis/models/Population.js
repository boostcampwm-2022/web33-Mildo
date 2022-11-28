"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var populationSchema = new mongoose_1.Schema({
    areaName: {
        type: String,
        maxlength: 20,
        required: true
    },
    populationMax: {
        type: Number,
        required: true
    },
    populationMin: {
        type: Number,
        required: true
    },
    populationLevel: {
        type: String,
        required: true
    },
    populationTime: {
        type: Date,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});
var Population = mongoose_1.default.model('population', populationSchema);
exports.default = Population;
//# sourceMappingURL=Population.js.map