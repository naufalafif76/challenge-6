const jwt = require('jsonwebtoken');
const usersService = require("../services/users")

module.exports = {
    async authorize(req, res, next) {
        try {
            const token = req.headers.authorization.split("Bearer ")[1];
            const tokenPayload = jwt.verify(
                token,
                process.env.JWT_PRIVATE_KEY || "apahayo"
            );

            req.user = await usersService.get(tokenPayload.id);

            next();
        } catch (err) {
            res.status(401).json({
                error: err.message,
                message: "Unauthorized. You must login first to perform this action!"
            });
        }
    },

    async checkSameIdOrAdmin(req, res, next) {
        try {
            const id = req.params.id;
            const token = req.headers.authorization.split("Bearer ")[1];
            const tokenPayload = jwt.verify(
                token,
                process.env.JWT_PRIVATE_KEY || "apahayo"
            );

            req.user = await usersService.get(tokenPayload.id);
            const compareId = id == req.user.id;

            if (!compareId) {
                if (!req.user.isAdmin) {
                    res.status(401).json({
                        status: "FAIL",
                        message: "User who can edit or delete user data is him/herself, admin, or superadmin"
                    });
                    return;
                }
            }

            next();
        } catch (err) {
            res.status(401).json({
                error: err.message,
                message: "Unauthorized. You must login first to perform this action!"
            });
        }
    },

    async checkSuperAdmin(req, res, next) {
        try {
            const token = req.headers.authorization.split("Bearer ")[1];
            const tokenPayload = jwt.verify(
                token,
                process.env.JWT_PRIVATE_KEY || "apahayo"
            );

            req.user = await usersService.get(tokenPayload.id);
            if (!req.user.isSuperAdmin) {
                res.status(401).json({
                    status: 'FAIL',
                    message: 'You are not superadmin!'
                })
                return;
            }
            next();
        } catch (err) {
            res.status(401).json({
                error: err.message,
                message: "Unauthorized. You must login first to perform this action!"
            });
        }
    },

    async checkAdmin(req, res, next) {
        try {
            const token = req.headers.authorization.split("Bearer ")[1];
            const tokenPayload = jwt.verify(
                token,
                process.env.JWT_PRIVATE_KEY || "apahayo"
            );

            req.user = await usersService.get(tokenPayload.id);
            if (!req.user.isAdmin) {
                res.status(401).json({
                    status: 'FAIL',
                    message: 'You are not Admin!'
                })

                return;
            }
            next();
        } catch (err) {
            res.status(401).json({
                error: err.message,
                message: "Unauthorized. You must login first to perform this action!"
            });
        }
    },
}