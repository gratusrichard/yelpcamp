
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelpcamp').then(() => {
console.log("Connection Open for mongoose :)")
}).catch((err) => {
 console.log( "connection did not opened :( due to the error:  " + err);
})

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor((Math.random()*20)+10)

        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            price: price,
            image: 'https://source.unsplash.com/collection/483251/1600x900',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac elementum erat. Pellentesque dolor purus, molestie a interdum in, blandit eget felis. Integer blandit diam non augue ullamcorper condimentum. Maecenas consectetur eleifend nulla at tristique. In suscipit, ex nec malesuada pulvinar'
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})