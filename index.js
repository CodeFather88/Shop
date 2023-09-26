//https://cloud.mongodb.com/v2/642032551d8fcc1c06d14016#/metrics/replicaSet/65047094ac2ef3223fc3d3ee/explorer/test/users/find ссылка на  бд

const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./Routes/authRouter')
const productRouter = require('./Routes/productRouter')
const PORT = process.env.PORT || 5000
const app = express()
const path = require('path')

// настройка для работы со статическими файлами
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use(express.json())
app.use('/auth', authRouter)
app.use('/product', productRouter)

const start = async() => {
    try{
        await mongoose.connect('mongodb+srv://admin:admin@cluster0.fdkhkyl.mongodb.net/')  
        app.listen(PORT, ()=> console.log('server started on ',PORT))
    }
    catch(e){
        console.log(e)
    }
}

start()