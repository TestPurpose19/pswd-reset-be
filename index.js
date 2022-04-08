require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db.js");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const passwordResetRoutes = require("./routes/passwordReset");
const path = require("path");


// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors({
    "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}))

app.get('/', function (req, res) {
    res.send('Hurray...Server is Working!!!')
  })

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/password-reset", passwordResetRoutes);


if(process.env.NODE_ENV ==='production')
{
    app.use('/' , express.static('client/build'))

    app.get('*' , (req , res)=>{

        res.sendFile(path.resolve(__dirname  , 'client/build/index.html'))

    })
}


const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
