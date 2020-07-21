const express = require("express");
const morgan = require('morgan');
const app = express();
const userRoutes =  require('./routes/users-routes.js');
const profileRoutes =  require('./routes/trainer-routes.js');
const colors = require('colors');
const bodyParser = require('body-parser')

//Init Middleware

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use((error,req,res,next) => {
  if( error instanceof SyntaxError) {
    return res.status(500).send({data: "La data envíada no es correcta"});
  }
  next();
})

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
// Init Routes
app.use('/api/users', userRoutes)
app.use('/api/profile', profileRoutes)

module.exports = app;