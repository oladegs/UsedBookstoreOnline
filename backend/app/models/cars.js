const mongoose = require('mongoose');
//This file defines the schema for the Car model.


const carSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  isAvailable: {
    type: Boolean, // Assuming "isAvailable" is a boolean field
    required: true, // You can change this to false if it's not required
  },

  // Adds relationship with User
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
}
  // Other attributes specific to a car
}, {
  timestamps: true, // Automatically add "createdAt" and "updatedAt" timestamps
},
{
    collection: "cars"
});

// Ensure virtual fields are serialised.
carSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;