const mongoose = require('mongoose');

const usersModel = mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  email : {
    type : String,
    unique : true,
    required : true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'] // regex validation for email
  },
  password : {
    type : String,
    required : true
  },
  role : {
    type : String,
    enum : ['Organizer', 'Attendee'],
    default : 'Attendee'
  }
}, {
  timestamps: true // This automatically adds createdAt and updatedAt
})

module.exports = mongoose.model('Users', usersModel)
