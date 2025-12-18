const express = require('express');
const Transaction = require('../models/Transaction');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// Get user transactions
router.get('/', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id });
    res.json(transactions);
  } catch (_error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create transaction
router.post('/', auth, async (req, res) => {
  try {
    const transaction = new Transaction({
      ...req.body,
      userId: req.user.id
    });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (_error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all transactions (admin only)
router.get('/admin/all', adminAuth, async (req, res) => {
  try {
    const transactions = await Transaction.find().populate('userId', 'name email');
    res.json(transactions);
  } catch (_error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update transaction (admin only)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json(transaction);
  } catch (_error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete transaction (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json({ message: 'Transaction deleted' });
  } catch (_error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
