const dotenv= require('dotenv')
const dbConnection=require('./config/connection')
app=require('./app')
dotenv.config()

//dB connection
dbConnection()

const port= process.env.PORT||8000

app.listen(port,()=>{
    console.log(`listening to port ${port} 🚀🚀`)
})


