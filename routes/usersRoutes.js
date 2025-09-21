const express = require('express');
const { register, login } = require('../controllers/usersController');

const router = express.Router();

router.post('/register', async (req, res) => {

  const user = req.body;

  try{
    await register(user);
    res.send({
      success : true
    })
  }catch(error){

    res.status(400).send({
      success : false,
      error : error.message
    })
  }
});

router.post('/login', async (req, res) => {
  try{
    const token = await login(req.body.email, req.body.password);

    res.send({
      success : true,
      token : token
    })
  }catch(error){

    res.status(401).send({
      success : false,
      error : error
    })
  }
})

module.exports = router;
