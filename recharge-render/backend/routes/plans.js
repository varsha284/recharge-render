const express = require('express');
const Plan = require('../models/Plan');
const router = express.Router();

// Get all active plans with optional filtering
router.get('/', async (req, res) => {
  try {
    const { operator, type } = req.query;
    const filter = { active: true };
    
    if (operator) filter.operator = operator;
    if (type) filter.type = type;

    const plans = await Plan.find(filter).sort({ amount: 1 });
    res.json(plans);
  } catch (_error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get plan by ID
router.get('/:id', async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan || !plan.active) {
      return res.status(404).json({ message: 'Plan not found' });
    }
    res.json(plan);
  } catch (_error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;