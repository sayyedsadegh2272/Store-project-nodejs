const createError = require("http-errors");
const { CategoryModel } = require("../../../models/categories");
const { addCategorySchema } = require("../../validators/admin/category.schema");
const Controller = require("../controller");

class CategoryController extends Controller {
    async addCategory(req , res , next){
        try {
            await addCategorySchema.validateAsync(req.body);
            const {title , parent} = req.body;
            const category = await CategoryModel.create({title , parent});
            if(!category) throw createError.InternalServerError("خطای داخلی")
            return res.status(201).json({
                data : {
                    statusCode: 201 ,
                    message: "دسته بندی جدید با موفقیت افزوده شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async removeCategory(req , res , next){
        try {
            const {id} = req.params;
            const category = await this.checkExistCategory(id)
            const deleteResult= await CategoryModel.deleteOne({_id : category})
            if(deleteResult.deletedCount == 0) throw createError.InternalServerError("حذف دسته بندی انجام نشد")
            return res.status(200).json({
                data : {
                    statusCode : 200 , 
                    message : "حذف دسته بندی با موفقیت انجام شد"
                }
            })
        } catch (error) {
            
        }
    }
    async getAllParents(req , res , next){
        try {
            //we want get all parents in site 
            const parents = await CategoryModel.find({parent : undefined},{__v : 0});
            return res.status(200).json({
                data : {
                    statusCode : 200 , 
                    parents
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getChildOfParents(req , res , next){
        try {
            //we went get all child of special parent by id of parent
            const {parent} = req.params;
            const children = await CategoryModel.find({parent} , {__v : 0 , parent : 0})
            return res.status(200).json({
                data: {
                    statusCode : 200 , 
                    children
                }
            })
        } catch (error) {
            next (error)
        }
    }
    async checkExistCategory(id){
        // we want try is category find in database
        const category = await CategoryModel.findById(id);
        if(!category) throw createError.NotFound("دسته بندی یافت نشد");
        return category
    }
    async getAllCategory(req , res , next){
        try {
            // we want get all category in database
            const categories = await CategoryModel.aggregate([
                {
                    $lookup : {
                        from : "categories" , // go to the categories in database mongodb
                        localField : "_id", // and find all item has _id and parent
                        foreignField : "parent" , //id and parent is ==
                        as : "children" // get all in new object and save name children
                    }
                },
                {
                    $project : {
                        __v : 0 ,
                        "children.__v" : 0,
                        "children.parent" : 0
                    }
                },
                {
                    $match : {
                        parent : undefined
                    }
                }
            ])
            return res.status(200).json({
                data : {
                    statusCode : 200 , 
                    categories
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports ={
    CategoryController : new CategoryController()
}