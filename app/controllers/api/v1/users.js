const usersService = require("../../../services/users")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
    async register(req, res) {
        const { email, username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        usersService.create({
                email: email.toLowerCase(),
                username,
                password: hashedPassword,
            })
            .then((createdUser) => {
                res.status(201).json({
                    status: "Success",
                    message: "User Successfully Registered!",
                    data: {
                        id: createdUser.id,
                        email: createdUser.email,
                        username
                    }
                });
            }).catch((err) => {
                res.status(400).json({
                    status: "FAIL",
                    message: err.message,
                });
            });
    },

    async getUserData(req, res) {
        const user = await usersService.get(req.params.id)
        if (!user) {
            res.status(404).json({
                status: "FAIL",
                message: `User with id ${req.params.id} not found!`,
            });
            return;
        }

        usersService.get(req.params.id)
            .then(() => {
                res.status(200).json({
                    status: "success",
                    data: user
                })
            }).catch((err) => {
                res.status(400).json({
                    status: "FAIL",
                    message: err.message
                })
            })
    },

    async login(req, res) {
        const user = req.user;

        const token = jwt.sign({
            id: user.id,
            email: user.email,
            username: user.username,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }, process.env.JWT_PRIVATE_KEY || 'apahayo', {
            expiresIn: '1h'
        });

        res.status(201).json({
            id: user.id,
            email: user.email,
            username: user.username,
            token,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });
    },

    async whoAmI(req, res) {
        res.status(200).json(req.user);
    },

    async getAllUsers(req, res) {
        usersService.list()
            .then((allUsers) => {
                res.status(200).json({
                    status: "success",
                    data: {
                        allUsers
                    }
                })
            }).catch((err) => {
                res.status(400).json({
                    status: "FAIL",
                    message: err.message
                })
            })
    },

    async update(req, res) {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await usersService.get(req.params.id)
        if (!user) {
            res.status(404).json({
                status: "FAIL",
                message: `User with id ${req.params.id} not found!`,
            });
            return;
        }

        if (username.length < 5) {
            res.status(400).json({
                status: 'failed',
                message: 'Username must have at least 5 characters!'
            })
            return;
        }

        if (password.length < 8) {
            res.status(400).json({
                status: 'failed',
                message: 'Password must have at least 8 characters!'
            })
            return;
        }

        const uniqueName = await usersService.getOne({
            where: {
                username
            }
        })

        if (uniqueName) {
            res.status(404).json({
                status: "FAIL",
                message: "Username already taken!",
            });
            return;
        }

        usersService.update(req.params.id, {
            username,
            password: hashedPassword
        }).then(() => {
            res.status(200).json({
                status: "OK",
                message: `User with id ${req.params.id} has been updated.`,
            });
        }).catch((err) => {
            res.status(422).json({
                status: "FAIL",
                message: err.message,
            });
        });
    },

    async delete(req, res) {

        const user = await usersService.get(req.params.id)
        if (!user) {
            res.status(404).json({
                status: "FAIL",
                message: `User with id ${req.params.id} not found!`,
            });
            return;
        }

        usersService.delete(req.params.id)
            .then(() => {
                res.status(200).json({
                    status: "OK",
                    message: `User with id ${req.params.id} has been deleted.`
                })
            }).catch((err) => {
                res.status(422).json({
                    status: "FAIL",
                    message: err.message,
                });
            });
    },

    async intoAdmin(req, res) {
        /**
         * This function for superadmin only
         */

        const user = await usersService.get(req.params.id)
        if (!user) {
            res.status(404).json({
                status: "FAIL",
                message: `User with id ${req.params.id} not found!`,
            });
            return;
        }

        const admin = req.body.isAdmin;

        usersService.update(req.params.id, {
            isAdmin: admin
        }).then(() => {
            var addString = '';
            if (admin == true) {
                addString = 'now';
            } else {
                addString += "no longer"
            };

            res.status(200).json({
                status: "OK",
                message: `User with id ${req.params.id} is ${addString} an admin.`,
            });
        }).catch((err) => {
            res.status(422).json({
                status: "FAIL",
                message: err.message,
            });
        });

    }
};