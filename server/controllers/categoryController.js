import categoryModel from '../models/categoryModel.js';
import slugify from 'slugify';

export const CreateCategoryController = async (req,res) => {
   try {

     const {name} = req.body;
     if(!name){
        return res.status(401).send({
            message : "name is required"})
     }

     const existingCategory = await categoryModel.findOne({name : name});

     if(existingCategory){
         return res.status(200).send({
            success : true,
            message : "category already exist with this name"
         })
     }

     const newCategory = await categoryModel.create({name , slug : slugify(name)});

     return res.status(200).send({
           success : true,
           message : "new category created",
           newCategory
     })

     
   } catch (error) {
      console.log("error");
      res.status(500).send({
         success : false,
         error,
         message : "error in creating category"
      })
    
   }
}


export const updateCategoryController = async (req,res) => {
     
    try {

        const {name} = req.body;
        const {id} = req.params;

        const updatedCategory = await categoryModel.findByIdAndUpdate(
            id,
            {name , slug: slugify(name)},
            {new: true}
        );

        return res.status(200).send({
            success : true,
            message : 'category updated successfully',
            updatedCategory  
        });


         
    } catch (error) {
        console.log(error);
       return res.status(500).send({
            success : false,
            error,
            message : "couldn't update category"
        })
    }
};


export const showCategoryController = async (req,res) => {
    try {

        const all_Categories = await categoryModel.find({});
        return res.status(200).send({
            success : true,
            message : "all categories",
            all_Categories

        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            error,
            message : "error in showing categories"
        })
    }
}


export const singleCategoryController = async (req,res) => {
    try {
       
        // const {slug} = req.params.slug;
        const single_Category = await categoryModel.findOne({slug : req.params.slug});

        return res.status(200).send({
            success : true,
            message : " single category",
            single_Category
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "error in getting single category",
            error
        })
    }
}


export const deleteCategoryController = async (req,res) => {
    try {

        const {id} = req.params;
        const category = await categoryModel.findByIdAndDelete(id);

        return res.status(200).send({
            success : true,
            message : "successfully deleted",
            category
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            error,
            message : "error in deleting a category"
        })
    }
}