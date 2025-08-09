"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const user_model_1 = require("../user/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_utils_1 = require("./auth.utils");
const config_1 = __importDefault(require("../../config"));
const userRegistrationIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(payload);
    return result;
});
const userLoginIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = payload;
    const user = yield user_model_1.User.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }
    const isPasswordMatched = yield bcryptjs_1.default.compare(payload.password, user.password);
    if (!isPasswordMatched) {
        throw new Error('Your password is wrong !!');
    }
    const jwtPayload = {
        _id: user._id,
        username: user.username,
        email: user.email,
        profile: user.profile,
        role: user.role,
    };
    const token = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.access_token_secret, config_1.default.access_token_expires_in);
    const { username } = user;
    const userData = { username, email };
    return {
        user: userData,
        token,
    };
});
exports.authServices = {
    userRegistrationIntoDB,
    userLoginIntoDB,
};
