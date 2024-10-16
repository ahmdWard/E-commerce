const express= require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')

dotenv.config()

const globalErrors = require('./middlewares/errorMiddleWare')
const productRouter= require('./routes/productRoutes')
const userRouter = require('./routes/userRoutes')


const app =express()

app.use(express.json())


const NODE_ENV = process.env.NODE_ENV
if (NODE_ENV === 'development') {
    app.use(morgan('dev'))
    console.log(`mode ${NODE_ENV}`);
}

app.use('/api/v1/product',productRouter)
app.use('/api/v1/user',userRouter)

app.use(globalErrors)

module.exports=app