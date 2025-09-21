const mongoose = require('mongoose');

const eventsModel = mongoose.Schema({
  title : {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  participants: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Users',
    default: []
  },
}, {
  timestamps: true // This automatically adds createdAt and updatedAt
})

module.exports = mongoose.model('Events', eventsModel)
