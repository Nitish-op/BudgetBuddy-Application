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
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Login failed' });
    }
});

router.post('/newCard', async (req, res) => {
    try {
      const { cardNumber } = req.body;

      // Check if card already exists
      const existingCard = await Card.findOne({ cardNumber });
      if (existingCard) {
          return res.status(400).json({ error: 'Card already exists' });
      }

      // Hash the cardnumber
      // const hashedCardNumber = await bcrypt.hash(cardNumber, 10);

      // Create a new card
      const newcard = new Card({
        userName :req.body.userName,
        cardNumber: req.body.cardNumber,
        cardholderName: req.body.cardholderName,
        expirationDate: req.body.expirationDate,
        cvv: req.body.cvv,
        setLimit: req.body.setLimit,
        cardType: req.body.cardType,
        updatable: false
      });
      // Save the new card to the database
      await newcard.save();

      res.status(201).json({ message: 'card registered successfully' });
     } catch (error) {
       res.send({ error: error.message }).status(400);
     }
  });
 
 
 router.post('/allCards', async (req, res) => {
    try {
        const { userName } = req.body;  
        console.log(req.body);
        let usercard = await Card.find({  userName: userName } );
        if (!usercard) {
          return res.status(404).json({ error: 'Cards not found' });
        }
        // const decryptedCardNumber =  bcrypt.compare(usercard.cardNumber, 10);

        res.json(usercard);
     } catch (error) {
       res.send({ error: error.message }).status(500);
     }
  });
 
 
 router.put('/cardDetails', async (req, res) => {
    const cardDetails  = req.body;
    try {
      const updatedCard = await Card.findByIdAndUpdate(cardDetails, req.body, { new: true });
  
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
 
 
 router.delete('/cardDetails', async (req, res) => {
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