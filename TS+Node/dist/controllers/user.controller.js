"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const user_service_1 = require("../services/user.service");
const userService = new user_service_1.UserService();
const getUser = (req, res) => {
    const user = userService.getUser();
    res.json(user);
};
exports.getUser = getUser;
