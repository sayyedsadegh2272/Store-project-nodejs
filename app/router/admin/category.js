const { CategoryController } = require("../../http/controllers/admin/category.controller");

const router = require("express").Router();
/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          tags: [Admin-panel]
 *          summary: create new category title
 *          parameters:
 *              -   in: formData
 *                  type: string
 *                  required: true
 *                  name: title
 *              -   in: formData
 *                  type: string
 *                  required: false
 *                  name: parent
 *          responses:
 *              201:
 *                  description: success
 */
router.post("/add" , CategoryController.addCategory)
/**
 * @swagger
 *  /admin/category/parents:
 *      get:
 *          tags: [Admin-panel]
 *          summary: get All parents of category or category Heads
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/parents" , CategoryController.getAllParents )
/**
 * @swagger
 *  /admin/category/children/{parent}:
 *      get:
 *          tags: [Admin-panel]
 *          summary: get all child of special parent by id of parent
 *          parameters:
 *              -   in: path
 *                  name: parent
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */
 router.get("/children/:parent" , CategoryController.getChildOfParents )
 /**
 * @swagger
 *  /admin/category/all:
 *      get:
 *          tags: [Admin-panel]
 *          summary: get All Categories
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/all" , CategoryController.getAllCategory)
/**
 * @swagger
 *  /admin/category/remove/{id}:
 *      delete:
 *          tags: [Admin-panel]
 *          summary: remove category by object-id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */
 router.delete("/remove/:id" , CategoryController.removeCategory)
module.exports = {
    CategoryRoutes : router
}