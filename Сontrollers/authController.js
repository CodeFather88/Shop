const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const {secret} = require('../config')


const generateAccessToken = (id, roles)=>{
    const payload={
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}



class authController{


    async registration(req, res){
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message:errors})
            }
            const {email, password, username} = req.body
            const candidate = await User.findOne({email})
            if(candidate){
                return res.status(400).json({message:'Пользователь уже существует'})
            }
             
            const hashPassword = bcrypt.hashSync(password, 7)
            const userRole= await Role.findOne({value:"USER"})
            const user = new User({email, password: hashPassword, username, roles:[userRole.value], bonuses:0, address:''})
            await user.save()
            const token = generateAccessToken(user._id, user.roles, user.email)
            return res.json({message: "Пользователь был зарегистрирован", user,token})    
        } catch(e){
            
            console.log(e)
            res.status(400).json({message: "ошибка регистрации"})
        }
    }




    async login(req, res){
        try{
            const {email, password} = req.body
            const user = await User.findOne({email})
            if(!user){
                return res.status(400).json({message:"Не найден пользователь", email})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if(!validPassword){
                return res.status(400).json({message:"Пароль введен неправильно"})
            }
            const token = generateAccessToken(user._id, user.roles, user.email)
            return res.json({user,token} ) 
        } catch(e){
            console.log(e)
            res.status(400).json({message: 'Ошибка авторизации'})
        }
    }



    
    async getUsers(req, res){
        try{
            const users = await User.find()
            res.json(users)
        } catch(e){
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }

    async myProfile(req,res){
        try{

            const user = req.user
            const userId = {...user}.id
            const myProfile = await User.find({_id:userId})
             
            res.json({message:'ебаный пиздец',  myProfile})
        }catch{}
    }

}

module.exports = new authController()