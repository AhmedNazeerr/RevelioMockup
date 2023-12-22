const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    make: {
      type: String,
      required: [true, 'Please provide product make'],
    },
    model: {
      type: String,
      required: [true, 'Please provide product model'],
    },
    variant: {
      type: String,
      required: [true, 'Please provide Variant'],
    },
    registration: {
      type: String,
      required: [true, 'Please provide Registration'],
    },
    mileage: {
      type: Number,
      required: [true, 'Please provide Mileage'],
    },
    numberOfOwners: {
      type: Number,
      required: [true, 'Please provide Num of Owners'],
    },
    specification: {
      type: String,
      required: [true, 'Please provide Specifications'],
    },
    serviceHistory: {
      type: String,
      required: [true, 'Please provide Service History'],
    },
    askingPrice: {
      type: Number,
      required: [true, 'Please provide Asking Price'],
    },
    capClean: {
      type: Number,
      required: [true, 'Please provide Cap clean'],
    },
    autoTraderDetail: {
      type: String,
      required: [true, 'Please provide auto trader details'],
    },
    images: {
      type: [String], 
        },
    about:{
      type: String,
      required: [true, 'Please provide about the car details'],
        },
        preparation:{
          type: String,
          required: [true, 'Please provide about the car details'],
        },
        miles:{
          type:Number,
          required:[true,"please provide miles"]
        }
  },
  { timestamps: true}
);

module.exports = mongoose.model('Product', ProductSchema);
