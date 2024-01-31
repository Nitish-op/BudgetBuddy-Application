var express = require('express');
var router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/register', async (req, res) => {
try {
const { username,email,password } = req.body; 
const use = new User({ username,email, password });
const hashedPassword = await bcrypt.hash(password, 10);
const user = new User({ username, password: hashedPassword });
await user.save();
res.send({ message: 'User registered successfully' });
} catch (error) {
res.send({ error: 'Registration failed' });
}
});


router.post('/login', async (req, res) => {
try {
const { username, password } = req.body;
// const user = await User.findOne({ username });

if(await User.findOne({username:username})){
    userinfo = await User.findOne({username:username})
                        .select('_id username password')
                        .then((result)=>{
                           return result;
                        })
}
else{
   userinfo = await User.findOne({email:username})
                        .select('_id username password')
                        .then((result)=>{
                           return result;
                        })
}
console.log(userinfo);

if (!userinfo) {
return res.send({ error: 'User not found' });
}
else if(password!=userinfo.password)
{
   return res.send(401).json({ error: 'Authentication failed' });
}
else{
   res.send(userinfo);
}

// const token = jwt.sign({ userId: userinfo._id }, 'your-secret-key', {
// expiresIn: '1h',
// });
// res.send(200).json({ token });

}
catch (error) {
res.send(500).json({ error: 'Login failed' });
}
});

module.exports = router;