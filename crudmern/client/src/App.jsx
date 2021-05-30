import React from 'react';
import './App.css';
import { format } from 'timeago.js';
import { useEffect, useState } from 'react';
import { Room, Star } from '@material-ui/icons';
import axios from 'axios';

const App = () => {
  const [food, setFood] = useState([]);
  const [foodName, setFoodName] = useState('');
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const [newFoodName, setNewFoodName] = useState('');
  const [showUpdateInput, setShowUpdateInput] = useState(true);

  const getFood = async () => {
    try {
      const res = await axios.get('/foods');
      setFood(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFood();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFood = {
      foodName,
      comment,
      rating,
    };
    try {
      const res = await axios.post('/foods', newFood);
      setFood([...food, res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const updateName = (id) => {
    setShowUpdateInput(!showUpdateInput);
    console.log(food._id)
    console.log(food);
    console.log(id);
    id === food._id ? console.log('yeah') : console.log('try again ');
  };

  const handleDelete = (id) => {
    const recordToDelete = food.filter((f) => id !== f._id);
    setFood(recordToDelete);
  };

  return (
    <>
      <main className=''>
        <h1>My Food Log</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <label>Food Name</label>

            <input onChange={(e) => setFoodName(e.target.value)} type='text' />
            <label>
              Rating
              <select onChange={(e) => setRating(e.target.value)}>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
              </select>
            </label>
            <textarea
              onChange={(e) => setComment(e.target.value)}
              placeholder='write a comment'
              cols='30'
              rows='2'
            />

            <button type='submit'>Add</button>
          </form>
        </div>
      </main>
      <div className='output'>
        {food.map((f) => (
          <>
            <div key={f._id}>
              {console.log()}
              <h3>
                {showUpdateInput ? (
                  f.foodName
                ) : (
                  <input
                    placeholder='enter new name'
                    onChange={(e) => setNewFoodName(e.target.value)}
                    type='text'
                  />
                )}
              </h3>
              <p>{Array(f.rating).fill(<Star className='stars' />)} </p>
              <p>{f.comment}</p>
              {/* {console.log(f, f.foodName, f.rating, f.comment, f._id)} */}
            </div>
            <button onClick={() => handleDelete(f._id)}>Delete</button>
            <button onClick={() => updateName(f._id)}>Update Name</button>
          </>
        ))}
      </div>
    </>
  );
};

export default App;
