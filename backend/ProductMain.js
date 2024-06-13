const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  reviewerName: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  reviewText: { type: String, required: true },
  reviewDate: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  idPergjithshme: { type: String, required: true },
  productNameTxt: { type: String, required:false, unique: false },
  productImg: { type: String, required:false, unique: false },
  detail: { type: String, required:false, unique: false },
  sizes: { type: String, required:false, unique: false },
  color: { type: String, required:false, unique: false },
  care: { type: String, required:false, unique: false },
  priceTxt: { type: String, required:false, unique: false },
  descriptionTxt: { type: String, required:false, unique: false },
  typeTxt: { type: String, required:false, unique: false },
  gender: { type: String, required:false, unique: false },
  images: [{Tipi:String, filename: String, path: String,
  reviews: [reviewSchema]

  }]
});

const User = mongoose.model('product', userSchema);

module.exports = User;
