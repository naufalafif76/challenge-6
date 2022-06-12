/**
 * @file contains a functions that : 
 * 1. Checking whether the req.email || password || username is in the table or not.
 * 2. Checking the request comes from user that is Admin, superAdmin or not.
 */

const usersService = require("../services/users")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
    async checkData(req, res, next) {
        const email = req.body.email.toLowerCase();
        const password = req.body.password;
        const username = req.body.username;

        const user = await usersService.getOne({
            where: { email }
        })

        const uniqueName = await usersService.getOne({
            where: { username }
        })

        if (!user) {
            res.status(404).json({
                status: "FAIL",
                message: `Email not found!`,
            });
            return;
        }

        if (!uniqueName) {
            res.status(404).json({
                status: "FAIL",
                message: `username not found!`,
            });
            return;
        }

        const comparePassword = await bcrypt.compareSync(password, user.password)

        if (!comparePassword) {
            res.status(401).json({
                message: 'Wrong Password. Please Try Again!'
            });
            return;
        }
        req.user = user;
        next();
    },
}