const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  operator: {
    type: String,
    required: true,
    enum: ['airtel', 'jio', 'vi', 'bsnl', 'mtnl', 'aircel']
  },
  amount: {
    type: Number,
    required: true
  },
  validity: {
    type: String,
    required: true
  },
  data: {
    type: String,
    required: true
  },
  calls: {
    type: String,
    required: true
  },
  sms: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['popular', 'value', 'bestseller', 'premium', 'annual'],
    default: 'value'
  },
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Plan', planSchema);
