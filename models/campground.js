const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const CampgroundSchema = new Schema({
    title: String,
    price: Number,
    description: String,
    location: String,
    image: String,
    rating: [{
       type: mongoose.Types.ObjectId, ref: 'Review'
    }]

})


CampgroundSchema.post('findOneAndDelete', (doc) => {
console.log(doc)
    
})


module.exports = mongoose.model('Campground', CampgroundSchema);