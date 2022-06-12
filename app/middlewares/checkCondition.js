/**
 * @file contains a function that check condition of email, username, and password before register. 
 *
 * Conditions of email and password that allow users to register are : 
 * 1. Password must have at least 8 characters,
 * 2. The email cannot be empty,  
 * 3. Email only contains alphanumeric characters, at sign (@), and dot (.),
 * 4. Domain at the end of email must have 2 to 4 characters.
 * 5. username and email must be unique. That is, username and email must occur only once in the table.
 */


const usersService = require("../services/users")

module.exports = {
    async checkCondition(req, res, next) {
        const { email, username, password } = req.body;
        if (password.length < 8) {
            res.status(400).json({
                status: 'failed',
                message: 'Password must have at least 8 characters!'
            })
            return;
        }

        if (username.length < 5) {
            res.status(400).json({
                status: 'failed',
                message: 'Username must have at least 5 characters!'
            })
            return;
        }

        const filter = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g

        if (email == '' || email.search(filter) == -1) {
            res.status(400).json({
                status: 'failed',
                message: 'Wrong email format!'
            })
            return;
        }

        const uniqueEmail = await usersService.getOne({
            where: { email }
        });
        const uniqueUserName = await usersService.getOne({
            where: { username }
        });

        if (uniqueEmail) {
            res.status(400).json({
                status: 'failed',
                message: 'Email already taken!'
            })
            return;
        }

        if (uniqueUserName) {
            res.status(400).json({
                status: 'failed',
                message: 'Username already taken!'
            })
            return;
        }

        next();
    },
}