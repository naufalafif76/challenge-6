const carsRepository = require("../repositories/cars");

module.exports = {
    create(requestBody) {
        return carsRepository.create(requestBody);
    },

    update(id, requestBody) {
        return carsRepository.update(id, requestBody);
    },

    delete(id) {
        return carsRepository.delete(id);
    },

    async list() {
        try {
            const cars = await carsRepository.findAll();
            const carsCount = await carsRepository.getTotalCars();

            return {
                data: cars,
                count: carsCount,
            };
        } catch (err) {
            throw err;
        }
    },

    async listOnly(params, total) {
        try {
            const cars = await carsRepository.findAllOnlyWith(params);
            const carsCount = await carsRepository.getTotalCars(total);

            return {
                data: cars,
                count: carsCount,
            };
        } catch (err) {
            throw err;
        }
    },

    get(id) {
        return carsRepository.find(id);
    },

    getOne(key) {
        return carsRepository.findOne(key);
    }
};