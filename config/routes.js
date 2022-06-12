const express = require("express");
const controllers = require("../app/controllers");
const middlewares = require("../app/middlewares");
const appRoute = express.Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

/**
 * SWAGGER OPEN API DOCUMENTATION ROUTES
 */

appRoute.use("/api/v1/docs", swaggerUi.serve);
appRoute.get("/api/v1/docs", swaggerUi.setup(swaggerDocument));

/** 
 * USER API ROUTES 
 */

appRoute.post("/api/v1/register",
    middlewares.checkCondition.checkCondition,
    controllers.api.v1.users.register
);

appRoute.get("/api/v1/users/:id",
    middlewares.authorization.authorize,
    controllers.api.v1.users.getUserData
);

appRoute.put("/api/v1/users/:id",
    middlewares.authorization.checkSameIdOrAdmin,
    controllers.api.v1.users.update
);

appRoute.delete("/api/v1/users/:id",
    middlewares.authorization.checkSameIdOrAdmin,
    controllers.api.v1.users.delete
);

appRoute.post("/api/v1/login",
    middlewares.checkExistence.checkData,
    controllers.api.v1.users.login
);

appRoute.get("/api/v1/dashboard",
    middlewares.authorization.authorize,
    controllers.api.v1.users.whoAmI
);

appRoute.put("/api/v1/users/:id/update-admin",
    middlewares.authorization.checkSuperAdmin,
    controllers.api.v1.users.intoAdmin
);

appRoute.get("/api/v1/users",
    middlewares.authorization.authorize,
    controllers.api.v1.users.getAllUsers
);


/** 
 * CAR API ROUTES
 */

appRoute.post("/api/v1/create-data-car",
    middlewares.authorization.checkAdmin,
    controllers.api.v1.cars.create
);

appRoute.get("/api/v1/cars",
    middlewares.authorization.authorize,
    controllers.api.v1.cars.getAllCreatedCars
);

appRoute.get("/api/v1/cars/deleted",
    middlewares.authorization.checkAdmin,
    controllers.api.v1.cars.getDeletedCars
);

appRoute.get("/api/v1/cars/entire",
    middlewares.authorization.checkAdmin,
    controllers.api.v1.cars.getEntireCars
);

appRoute.get("/api/v1/cars/:id",
    middlewares.authorization.authorize,
    controllers.api.v1.cars.getCar
);

appRoute.put("/api/v1/cars/:id",
    middlewares.authorization.checkAdmin,
    controllers.api.v1.cars.update
);

appRoute.delete("/api/v1/cars/:id",
    middlewares.authorization.checkAdmin,
    controllers.api.v1.cars.delete
);


appRoute.use(controllers.api.main.onLost);
appRoute.use(controllers.api.main.onError);


module.exports = appRoute