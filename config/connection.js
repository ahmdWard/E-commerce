const dotenv= require('dotenv')
const mongoose =require('mongoose')
dotenv.config()

const url=process.env.MONGO_URL

const dbConnection=()=>{
    mongoose
        .connect(url)
            .then((conn)=>{
                console.log(`DB connection established successfully ${conn.connection.host}`)
    })
}
module.exports=dbConnection