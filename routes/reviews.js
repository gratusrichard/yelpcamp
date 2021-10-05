const express = require('express')
const router = express.Router({mergeParams: true});
const Review = require('../models/reviews');
const validationSchema = require('../schemas/validation');
const Campground = require('../models/campground');


//testing the validation using joi

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


router.post('/',reviewValidation, async (req,res,next) => {

    try {
        const id = req.params.id;
        const camps = await Campground.findById(id);
        const newReview = new Review(req.body);
        await newReview.save();
        camps.rating.push(newReview);
        await camps.save()
    res.redirect('/campgrounds/' + id)    
        } catch (error) {
        next(error)
    }
    
    
    })
    
    router.delete('/campgrounds/:id/review/:campID',async (req,res) => {
        const id = req.params.id;
       const reviewID = req.params.campID
    
     await Campground.findByIdAndUpdate(id,{$pull:{rating : reviewID}});
       
       
    
    
     
     await Review.findByIdAndDelete(reviewID)
     res.redirect('/campgrounds/' + id)
  
    
    })


    module.exports = router