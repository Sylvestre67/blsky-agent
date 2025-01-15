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

router.post('/', (req, res) => {
  const bskyClientResponse = "Pong from BlueSky client!";
  res.json({ message: bskyClientResponse });
});

module.exports = router;
