const { CategoryRoutes } = require("./category");
const router = require("express").Router();
/**
 * @swagger
 *  tags:
 *      name: Admin-panel
 *      description: action of admin (add , remove , edit and any do)
 */

router.use("/category" , CategoryRoutes)

module.exports = {
    AdminRoutes: router
}