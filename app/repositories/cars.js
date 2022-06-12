const { cars } = require("../models");

module.exports = {
    create(inputData) {
        return cars.create(inputData);
    },

    update(id, updatedData) {
        return cars.update(updatedData, {
            where: {
                id,
            },
        });
    },

    delete(id) {
        return cars.destroy({
            where: {
                id
            }
        });
    },

    find(id) {
        return cars.findByPk(id);
    },

    findOne(key) {
        return cars.findOne(key);
    },

    findAll() {
        return cars.findAll();
    },

    findAllOnlyWith(params) {
        return cars.findAll(params);
    },

    getTotalCars(total) {
        return cars.count(total);
    },
};