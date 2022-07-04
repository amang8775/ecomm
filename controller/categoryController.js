const Category = require('../models/categoryModel')
const Products = require('../models/productModel')
const categoryController = {
    getCategory : async(req,res)=>{
      try {

        const categories =  await Category.find()
        if(!categories) return res.status(400).json("no category exist")

        res.status(200).json(categories)
      } catch (error) {
        return res.status(500).json(error.message)
      }
    },
    createCategory : async(req,res)=>{
        try {
            const {name} = req.body
            const  temp =  await Category.findOne({name})
           
            if(temp) return res.status(400).json("category exist")

            const newCategory = new Category({name})

            await newCategory.save()
            res.json({msg: "Created a category"})


          } catch (error) {
            return res.status(500).json(error.message)
          }
    },
    deleteCategory : async(req,res)=>{
        try {
         
           const products = await Products.findOne({category : req.body.name});
           if(products) return res.status(400).send("Please first delete product with a relationship")

           await Category.findByIdAndDelete(req.body.id);
            res.json({msg : "category deleted"})
           
        } catch (error) {
          return res.status(500).json(error.message)
        }
    }

}

module.exports = categoryController;