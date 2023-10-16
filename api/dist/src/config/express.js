"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
function expressConfig(app) {
    app.use((0, cors_1.default)({
        credentials: true
    }));
    app.use((0, cookie_parser_1.default)());
    app.use(body_parser_1.default.json());
}
exports.default = expressConfig;
