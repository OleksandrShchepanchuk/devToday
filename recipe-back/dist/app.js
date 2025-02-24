"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const recipes_routes_1 = __importDefault(require("./routes/recipes.routes"));
const cors_1 = __importDefault(require("cors"));
function createServer() {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({
        origin: "http://localhost:3001", // or your production domain
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        credentials: true, // if you need cookies
    }));
    app.use(express_1.default.json());
    app.use("/recipes", recipes_routes_1.default);
    app.get("/health", (req, res) => {
        res.json({ status: "OK" });
    });
    return app;
}
exports.default = createServer;
