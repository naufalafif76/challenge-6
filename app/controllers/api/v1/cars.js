const carsService = require("../../../services/cars")

module.exports = {
    async create(req, res) {
        const user = req.user;

        const {
            plate,
            manufacture,
            model,
            image,
            rentPerDay,
            capacity,
            description,
            transmission,
            available,
            type,
            year,
            availableAt,
        } = req.body;

        carsService.create({
            plate,
            manufacture,
            model,
            image,
            rentPerDay,
            capacity,
            description,
            transmission,
            available,
            type,
            year,
            availableAt,
            createdBy: user.username
        }).then((createdCar) => {
            res.status(201).json({
                status: "Success",
                message: `Car Successfully Created by ${user.username}`,
                data: {
                    id: createdCar.id,
                    plate: createdCar.plate,
                    manufacture: createdCar.manufacture,
                    model: createdCar.model,
                    image: createdCar.image,
                    rentPerDay: createdCar.rentPerDay,
                    capacity: createdCar.capacity,
                    description: createdCar.description,
                    transmission: createdCar.transmission,
                    available: createdCar.available,
                    type: createdCar.type,
                    year: createdCar.year,
                    availableAt: createdCar.availableAt,
                    createdBy: user.username
                }
            });
        }).catch((err) => {
            res.status(400).json({
                status: "FAIL",
                message: err.message,
            });
        });
    },

    async getAllCreatedCars(req, res) {

        /**
         * Showing All Cars, but with the isDeleted = false Only. 
         * Accessible for All Users
         */

        carsService.listOnly({
            where: {
                isDeleted: false
            }
        }, {
            where: {
                isDeleted: false
            }
        }).then((allCars) => {
            res.status(200).json({
                status: "success",
                data: {
                    allCars
                }
            })
        }).catch((err) => {
            res.status(400).json({
                status: "FAIL",
                message: err.message
            })
        })
    },

    async getDeletedCars(req, res) {
        /**
         * Showing All Cars, but with the isDeleted = true. 
         * Accessible only for Admin and SuperAdmin.
         */

        carsService.listOnly({
            where: {
                isDeleted: true
            }
        }, {
            where: {
                isDeleted: true
            }
        }).then((allCars) => {
            res.status(200).json({
                status: "success",
                data: {
                    allCars
                }
            })
        }).catch((err) => {
            res.status(400).json({
                status: "FAIL",
                message: err.message
            })
        })
    },

    async getEntireCars(req, res) {
        /**
         * Showing All the cars in the database. 
         * Accessible only for Admin and SuperAdmin.
         */

        carsService.list()
            .then((allCars) => {
                res.status(200).json({
                    status: "success",
                    data: {
                        allCars
                    }
                })
            }).catch((err) => {
                res.status(400).json({
                    status: "FAIL",
                    message: err.message
                })
            })
    },

    async getCar(req, res) {
        const car = await carsService.get(req.params.id)
        if (!car) {
            res.status(404).json({
                status: "FAIL",
                message: `Car with id ${req.params.id} not found!`,
            });
            return;
        }

        carsService.get(req.params.id)
            .then(() => {
                res.status(200).json({
                    status: "success",
                    data: car
                })
            }).catch((err) => {
                res.status(400).json({
                    status: "FAIL",
                    message: err.message
                })
            })
    },

    async update(req, res) {
        const {
            plate,
            manufacture,
            model,
            image,
            rentPerDay,
            capacity,
            description,
            transmission,
            available,
            type,
            year,
            availableAt
        } = req.body;
        const user = req.user;
        const car = await carsService.get(req.params.id)
        if (!car) {
            res.status(404).json({
                status: "FAIL",
                message: `Car with id ${req.params.id} not found!`,
            });
            return;
        }
        carsService.update(req.params.id, {
            plate,
            manufacture,
            model,
            image,
            rentPerDay,
            capacity,
            description,
            transmission,
            available,
            type,
            year,
            availableAt,
            updatedBy: user.username
        }).then(() => {
            res.status(200).json({
                status: "OK",
                message: `Car with id ${req.params.id} has been updated by ${user.username}.`,
            });
        }).catch((err) => {
            res.status(422).json({
                status: "FAIL",
                message: err.message,
            });
        });
    },

    async delete(req, res) {
        const user = req.user;
        const car = await carsService.get(req.params.id)
        if (!car) {
            res.status(404).json({
                status: "FAIL",
                message: `Car with id ${req.params.id} not found!`,
            });
            return;
        }

        carsService.update(req.params.id, {
            isDeleted: true,
            deletedBy: user.username
        }).then(() => {
            res.status(200).json({
                status: "OK",
                message: `Car with id ${req.params.id} has been deleted by ${user.username}.`
            })
        }).catch((err) => {
            res.status(422).json({
                status: "FAIL",
                message: err.message,
            });
        });
    },
};