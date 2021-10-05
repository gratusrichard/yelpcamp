// requirements
const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
const appError = require('../utils/AppError')
const validationSchema = require('../schemas/validation');






function incomingValidation(req,res,next){

    const campgroundSchema = validationSchema.validationSchema
    const {error} = campgroundSchema.validate(req.body);
     
     if(error){
        const msg = error.details.map(el => el.message).join(',')

         next( new appError(msg, 400))
}
else next()
}

function reviewValidation(req,res,next){


    const campgroundSchema = validationSchema.reviewSchema
     const {error} = campgroundSchema.validate(req.body);
     
     if (error){

        const msg = error.details.map(el => el.message)
        next(new appError(msg,200))
        console.log(msg);
     }
     else next()
}




router.get('/', async (req,res,next)=>{

    if(success) = 
    
    try {
        const camps = await Campground.find({})
    res.render('campgrounds/index',{camps,success})
    } catch (error) {
        next(error)
    }
     
 
   
})


router.get('/new', (req,res) => {

    res.render('campgrounds/new')
})

router.post('/new',incomingValidation,async (req,res,next) => {
    try {

     const body = req.body
    const camps = await new Campground(body);
    await camps.save()
    req.flash('success', 'successfully Made a new campground')
    res.redirect('/campgrounds/'+ camps.id) 
    } catch (error) {
        next(new appError(error, 404))
    } 
     
})

router.get('/:id', async (req,res,next) => {

    try {
        const camps = await Campground.findById(req.params.id).populate('rating')
        
    res.render('campgrounds/show',{camps, message : req.flash('success')})
        
    } catch (error) {
        next(new appError("didn't worked", 404))
    }
    
})
router.get('/:id/edit', async (req,res,next) =>{
    try {
        const id = req.params.id;
         const camps = await Campground.findById(id)
    res.render('campgrounds/edit', {id,camps})
        
    } catch (error) {
        next(error)
    }
        

})
router.delete('/:id/delete',async (req,res,next) =>{
    try {
        const id = req.params.id;
    await Campground.findByIdAndDelete(id)
    res.redirect('/campgrounds')
    } catch (error) {
        next(error)
    }
    
})

router.put('/:id/edit/' ,async (req,res,next) => {
    try{
    id = req.params.id;
   await Campground.findByIdAndUpdate(id, req.body);  
   res.redirect('/campgrounds')    
    }
    catch(e){
        next(new appError("unfortunately something gone wrong :(", 500));
    } 
})



module.exports = router