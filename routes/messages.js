const router = require('express').Router();
const Message = require('../models/Message');

router.get('/', async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const message = new Message({
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
  });

  try {
    const newMessage = await message.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (message == null) {
      return res.status(404).json({ message: 'Cannot find message' });
    }
    await message.deleteOne();
    res.json({ message: 'Deleted Message' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
