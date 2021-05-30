const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema(
  {
    foodName: {
      type: String,
      require: true,
    },
    comment: {
      type: String,
      require: true,
    },
    rating: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

const Food = mongoose.model('foodData', FoodSchema);

module.exports = Food;
