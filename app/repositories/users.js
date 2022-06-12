const { users } = require("../models");

module.exports = {
    create(inputData) {
        return users.create(inputData);
    },

    update(id, updatedData) {
        return users.update(updatedData, {
            where: {
                id,
            },
        });
    },

    delete(id) {
        return users.destroy({
            where: {
                id
            }
        });
    },

    find(id) {
        return users.findByPk(id);
    },

    findAll() {
        return users.findAll();
    },

    findOne(key) {
        return users.findOne(key);
    },

    getTotalUsers() {
        return users.count();
    },
};