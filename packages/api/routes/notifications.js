const express = require('express');
const router = express.Router();
const { BskyAgent } = require('@atproto/api');

const agent = new BskyAgent({
  service: 'https://bsky.social',
  persistSession: (evt, sess) => console.log({ evt, sess }),
});

agent.login({
  identifier: process.env.BLSKY_USERNAME,
  password: process.env.BLSKY_PASSWORD,
});

router.get('/', async (req, res) => {
  try {
    const notifications = await agent.listNotifications();
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

module.exports = router;
