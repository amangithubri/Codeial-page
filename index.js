const express = require('express');
const cookieParser=require('cookie-parser');
const app =express();
const port=8000;
const expressLayouts =require('express-ejs-layouts');
const db=require('./config/mongoose');
const session =require ('express-session');
const passport =require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo');
// const session = require('express-session');
// const passport = require('passport');
// const passportLocal = require('./config/passport-local-strategy');
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));
app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// app.use('/', require('./routes'));

app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:'codeial',
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            // mongooseConnection:db,
            mongoUrl:'mongodb://127.0.0.1/codeial_development',
            autoRemove:'disabled'
        },
        function(err){
            console.log(err || 'connect mongodb setup ok');
        }
    
    )
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});
 