const {validationResult} = require('express-validator')
const Category = require('../models/Category')
const Product = require('../models/Product')
const Cart = require('../models/Cart')
const uuid = require('uuid')
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      const extension = file.originalname.split('.').pop();
      const filename = `${uuidv4()}.${extension}`;
      cb(null, filename);
    }
  });
  
  const upload = multer({ storage: storage }).array('files', 5);
class productController{
    async createCategory(req, res){
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message:"Ошибка добавления товара"})
            }
            
            
            const {name} = req.body
            const category = new Category({name})
            await category.save() 
            return res.json({message: "Категория была добавлена"})
        }catch(e){
            console.log(e)
        }
    }

    // async createProduct(req,res){
    //     try{
    //         const errors = validationResult(req)
    //         if(!errors.isEmpty()){
    //             return res.status(400).json({message:"Ошибка добавления товара"})
    //         }
    //         const {name, description, category_id, size, price} = req.body
            
            
            
    //         const product = new Product({name, description, category_id, size, price})
    //         await product.save()
    //         return res.json({message: "Товар был добавлен"})
    //     } catch(e){
    //         console.log(e)
    //         return res.status(400).json({message: 'Ошибка добавления товара'})
    //     }
    // }
    
    
   
    async createProduct(req, res) {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ message: "Ошибка добавления товара" });
        }
    
       
    
        
    
        // Upload multiple images
        upload(req, res, async (err) => {
          if (err instanceof multer.MulterError) {
            console.log(err);
            return res.status(400).json({ message: 'Ошибка загрузки фотографий' });
          } else if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Внутренняя ошибка сервера' });
          }
    
          // Images uploaded successfully
          const { name, description, category_id, size, price } = req.body;
          const images = req.files.map((file) => file.filename);
          console.log("g"+images)
          const product = new Product({ name, description, category_id, size, price, img:images });
    
    
          await product.save();
    
          return res.json({ message: "Товар был добавлен" });
        });
      } catch (e) {
        console.log(e);
        return res.status(400).json({ message: 'Ошибка добавления товара' });
      }
    }


    async getAll(req, res){
        try{
            const products = await Product.find()
            return res.json(products)
        } catch(e){}
    }



    async productInCart(req,res){
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message:"Ошибка добавления товара в корзину"})
            }
            const {product_id, count} = req.body
            const user = req.user
            const user_id = {...user}.id
            
            const cart = new Cart({user_id, product_id, count})
            await cart.save()
            return res.json({message: "Товар был добавлен в корзину"})
        } catch(e){
            const errors = validationResult(req)
            console.log(e)
            console.log(errors)
            return res.status(400).json({message: 'Ошибка добавления товара в корзину'})
        }
    }

    async getMyCart(req,res){
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message:"Ошибка получения корзины"})
            }
            const user = req.user
            const user_id = user.id
            const cart = await Cart.find({user_id:user_id})
            res.json(cart)
        }catch(e){
            console.log(e)
            return res.status(400).json({message: 'Ошибка получения корзины'})
        }
        
    }


    async deleteFromCart(req, res){
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.json({message:"Ошибка удаления товара из корзины"})
            }
            const user = req.user
            const user_id = user.id
            const product_id = req.body
            const cart = await Cart.find({user_id:user_id, product_id: product_id})
            return res.json(cart)
        } catch(e){
            const errors = validationResult(req)
            console.log(e)
            return res.json({message:"ошибка удаления из корзины1"})
        }
        
    }


    async findProduct(req, res) {
      const searchText = req.body.searchText.toString();
      try {
        const products = await Product.find({ name: { $regex: searchText, $options: 'i' } });
        res.status(200).json(products);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }
    
}



module.exports = new productController()