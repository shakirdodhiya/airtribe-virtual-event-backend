const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const usersModel = require('../models/usersModel');

exports.verifyToken = async (req, res, next) => {
  const auth_header = req.header("Authorization");

  const token = auth_header && auth_header.split(" ")[1];

  if (!token) {
    res.status(401).send({
      success: false,
      error: 'Invalid Token'
    });

    return;
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);

    const _id = new mongoose.Types.ObjectId(`${verified.user_id}`);
    req.user_id = _id;

    const user = await usersModel.findOne({ _id: _id });

    if (user) {
      req.user = user;
      next();
    } else {
      res.status(401).send({
        success: false,
        error: 'Invalid Token'
      });

      return;
    }

  } catch (error) {
    res.status(401).send({
      success: false,
      error: 'Invalid Token'
    });

    return;
  }
}
