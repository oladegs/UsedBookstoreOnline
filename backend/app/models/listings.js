const mongoose = require('mongoose');
//This file defines the schema for the User model.

const listingSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car', // Reference to the Car model
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    images: [{
      type: String, // Store image URLs
    }],
    status: {
      type: String,
      enum: ['active', 'pending', 'sold'],
      default: 'active',
    },
    // Other attributes specific to a listing
  }, {
    timestamps: true, // Automatically add "createdAt" and "updatedAt" timestamps
  },
  {
    collection: "listing"
});
  
// Ensure virtual fields are serialised.
listingSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});
  const Listing = mongoose.model('Listing', listingSchema);
  
  module.exports = Listing;