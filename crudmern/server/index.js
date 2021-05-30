const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const foodRoute = require('./routes/foods');
const cors = require('cors');

dotenv.config();

app.use(express.json());
app.use(cors());
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('mongoDB connected'))
  .catch((err) => console.log(err));

app.use('/api/foods', foodRoute);

// app.post('/food', async (req, res) => {
//   const food = new FoodModel(req.body);
//   try {
//     const savedFood = await food.save();
//     res.status(200).json(food);
//     console.log(food);
//   } catch (error) {
//     console.log(error);
//   }
// });

app.listen(8000, () => {
  console.log('listening on port 8000');
});
