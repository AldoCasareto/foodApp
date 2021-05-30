const router = require('express').Router();
const Food = require('../models/Food');

//create new food

router.post('/', async (req, res) => {
  const newFood = new Food(req.body);

  try {
    const savedFood = await newFood.save();
    res.status(200).send(savedFood);
  } catch (error) {
    console.log(error);
  }
});

//get food

router.get('/', async (req, res) =>{
    try {
        const Foods = await Food.find()
        res.status(200).json(Foods) 
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;
