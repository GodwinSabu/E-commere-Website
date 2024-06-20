
const express = require("express");
const cors =require("cors")
const ErrorHandler = require("./middileware/error");
console.log('ooooooooppps');
const app = express()
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
// const fileUpload = require("express-fileupload")

app.use(cors({
    origin: "http://localhost:3000/", // Replace with your frontend URL
    credentials: true,
}));    
// http://192.168.11.103:3000

app.use(express.json()) 
app.use(cookieParser())
app.use("/", express.static("uploads")) 
app.use(bodyParser.urlencoded({extended: true, }))

// app.listen(8000, () => {
//     console.log('Servereeeee is running on http://localhost:8000');
//   });

// app.use(fileUpload({useTempFiles: true}))

// const corsOptions = {
//     origin: "http://localhost:3000", // Replace with your front-end's URL
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true,
//   };
  
//   app.use(cors(corsOptions));


// CONFIG 
if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({
        path:"backend/config/.env"
    })
}
// Headers('Access-Control-Allow-Headers: Content-Type, X-Auth-Token,Origin, Authorization')




// import routes
const user = require("./controller/user")
const shop = require("./controller/shop")
const product = require("./controller/product")
const event = require("./controller/event");
const coupoun = require("./controller/coupounCode");




app.use("/api/user", user)
app.use("/api/shop", shop)
app.use("/api/product", product)
app.use("/api/event", event)
app.use("/api/coupoun", coupoun)



// it's for ErrorHandling
// app.use(ErrorHandler)

// // it's for ErrorHandling
app.use(ErrorHandler)




// const allowedOrigins = ['http://localhost:3000'];
// app.use(cors(corsOptions));



module.exports = app;
