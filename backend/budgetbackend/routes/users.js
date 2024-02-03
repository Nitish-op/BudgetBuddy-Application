var express = require('express');
var router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Card = require('../models/Cards')

router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if username or email already exists
        const existingUser = await User.findOne({ $or: [{ username: username }, { email: email }] });
        if (existingUser) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword
        });

        // Save the new user to the database
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Registration failed' });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user exists by username or email
        let user = await User.findOne({ $or: [{ username: username }, { email: username }] });
         console.log(user,username,password);
        // If user does not exist, send error response
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if password is correct
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed' });
        }

        // If both username/email and password are correct, send user info
        res.json({
            _id: user._id,
            username: user.username
            // Add any other user information you want to send
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Login failed' });
    }
});

router.post('/newcard', async (req, res) => {
    try {
       const card = new Card(req.body);
       await card.save();
       res.send(card).status(201);
     } catch (error) {
       res.send({ error: error.message }).status(400);
     }
  });
 
 
 router.get('/allcards', async (req, res) => {
    try {
       const cards = await Card.find();
       res.send(cards).status(200);
     } catch (error) {
       res.send({ error: error.message }).status(500);
     }
  });
 
 
 router.put('/allcards/cardNumber', async (req, res) => {
    const cardNumber  = req.body;
    try {
      const updatedCard = await Card.findByIdAndUpdate(cardNumber, req.body, { new: true });
  
      if (!updatedCard) {
        return res.send({ error: 'Card not found' }).status(404);
      }
      if(updatedCard){
      return res.send(updatedCard).status(200);
      }
     } 
     catch (error) {
      res.send({ error: error.message }).status(400);
    }
  }); 
 
 
 router.delete('/allcards/cardNumber', async (req, res) => {
    const cardNumber = req.body;
  
    try {
      const deletedCard = await Card.findByIdAndDelete(cardNumber);
  
      if (!deletedCard) {
        return res.send({ error: 'Card not found' }).status(404);
      }
      if(deletedCard){
      res.send({ message: 'Card deleted successfully' }).status(200);
      }
    } catch (error) {
      res.send({ error: error.message }).status(400);
    }
  });


module.exports = router;