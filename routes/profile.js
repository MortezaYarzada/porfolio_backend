const router = require('express').Router();
const Profile = require('../models/Profile');

router.get('/', async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const profile = new Profile({
    name: req.body.name,
    title: req.body.title,
    email: req.body.email,
    phone: req.body.phone,
    location: req.body.location,
    summary: req.body.summary,
    cvUrl: req.body.cvUrl,
  });

  try {
    const newProfile = await profile.save();
    res.status(201).json(newProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch('/', async (req, res) => {
  let profile;
  try {
    profile = await Profile.findOne();
    if (profile == null) {
      return res.status(404).json({ message: 'Cannot find profile' });
    }

    if (req.body.name != null) {
      profile.name = req.body.name;
    }
    if (req.body.title != null) {
      profile.title = req.body.title;
    }
    if (req.body.email != null) {
      profile.email = req.body.email;
    }
    if (req.body.phone != null) {
      profile.phone = req.body.phone;
    }
    if (req.body.location != null) {
      profile.location = req.body.location;
    }
    if (req.body.summary != null) {
      profile.summary = req.body.summary;
    }
    if (req.body.cvUrl != null) {
      profile.cvUrl = req.body.cvUrl;
    }

    const updatedProfile = await profile.save();
    res.json(updatedProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
