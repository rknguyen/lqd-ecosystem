"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const bodyParser = __importStar(require("body-parser"));
const password_1 = require("@accounts/password");
const server_1 = require("@accounts/server");
const rest_express_1 = __importStar(require("@accounts/rest-express"));
const db_1 = __importDefault(require("./db"));
const mongo_1 = __importDefault(require("@accounts/mongo"));
const routes_1 = __importDefault(require("./routes"));
const Admin_1 = __importDefault(require("./models/Admin"));
const app = express_1.default();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors_1.default({
    origin: "*",
    credentials: true
}));
const accountsPassword = new password_1.AccountsPassword({
    validateNewUser: user => {
        return user;
    }
});
const accountsServer = new server_1.AccountsServer({
    db: new mongo_1.default(db_1.default.connection),
    tokenSecret: "rknguyen"
}, {
    password: accountsPassword
});
app.post("/accounts/user", rest_express_1.userLoader(accountsServer), async (req, res) => {
    const adminCond = { userID: req.user._id };
    const admin = await Admin_1.default.findOne(adminCond);
    res.json(Object.assign(Object.assign({}, req.user), { isAdmin: admin !== null }));
});
app.use(rest_express_1.default(accountsServer));
app.use(rest_express_1.userLoader(accountsServer));
// setting up routes
routes_1.default(app);
app.listen(4000, () => {
    console.log("Server listening on port 4000");
});
