const express = require('express');
const User = require('../models/User');
const Plan = require('../models/Plan');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// Get all users (admin only)
router.get('/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all plans (admin only)
router.get('/plans', adminAuth, async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update the POST /plans route
router.post('/plans', adminAuth, async (req, res) => {
  const { operator, amount, validity, data, calls, sms, type } = req.body;

  try {
    const plan = new Plan({
      operator,
      amount,
      validity,
      data,
      calls,
      sms,
      type: type || 'value'
    });

    await plan.save();
    res.json(plan);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update the PUT /plans/:id route
router.put('/plans/:id', adminAuth, async (req, res) => {
  const { operator, amount, validity, data, calls, sms, type, active } = req.body;

  try {
    let plan = await Plan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    plan.operator = operator || plan.operator;
    plan.amount = amount || plan.amount;
    plan.validity = validity || plan.validity;
    plan.data = data || plan.data;
    plan.calls = calls || plan.calls;
    plan.sms = sms || plan.sms;
    plan.type = type || plan.type;
    if (active !== undefined) plan.active = active;

    await plan.save();
    res.json(plan);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});



// Delete a plan (admin only)
router.delete('/plans/:id', adminAuth, async (req, res) => {
  try {
    let plan = await Plan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    await Plan.findByIdAndRemove(req.params.id);
    res.json({ message: 'Plan removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
