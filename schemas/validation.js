const joi = require ('joi');

module.exports.validationSchema =  joi.object({
    title: joi.string().required(),
    location:  joi.string().required(),
    price : joi.number().min(0).required(),
    image : joi.string().required(),
    description: joi.string().required()
});



module.exports.reviewSchema = joi.object({

    body: joi.string().required(),
    rating: joi.number().required()

})