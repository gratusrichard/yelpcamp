// requirements
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');
const methodOverride = require('method-override')
const engine = require ('ejs-mate');
const appError = require('./utils/AppError')
const validationSchema = require('./schemas/validation');
const Review = require('./models/reviews');
const campgroundRoute = require('./routes/campground')
const reviewRoute = require('./routes/reviews')
var flash = require('connect-flash')
const session = require('express-session')



// creating an express app
const app = express();


// setting views directory
app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.engine('ejs',engine)

// urlparser
app.use(express.urlencoded({extended : true}))

// connection opening for mongoose
mongoose.connect('mongodb://localhost:27017/yelpcamp').then(() => {
console.log("Connection Opened for mongoose ")
}).catch((err) => {
 console.log( "connection did not opened due to the error:  " + err);

    throw appError(501,'there is an error with the database right now.')
})

// method overriding
app.use(methodOverride('_method'))

//session
const sessionConfig = {secret: "this is a secret for no reason", 
resave : false,
saveUninitialized :true,
cookie: {
    httpOnly : true,
    expires : Date.now() + 1000 * 60 * 60* 24 * 7  
}
}
app.use(session(sessionConfig))

//flash
app.use(flash())
app.use((req,res,next) => {
res.locals.success = req.flash('success')
next()
})



//routing
app.use('/campgrounds', campgroundRoute)
app.use('/campgrounds/:id/review', reviewRoute)

//setting public directories

app.use(express.static(path.join(__dirname, 'public')))



// starting connection

app.listen(3000, (req,res) => {
console.log("listening on port 3000");
})




app.get('/', (req,res) => {
    res.render('home')
})



app.all('*', (req,res,next) => {

    next(new appError("sorry this is not a valid page", 404)) 
})

app.use((err,req,res,next)=>{
    const {message = "something went wrong", statusCode = 500} = err;
    res.status(statusCode).render('error', {err})


})


