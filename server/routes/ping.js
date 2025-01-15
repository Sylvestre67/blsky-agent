const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const huClientResponse = "Pong from hu client!";
  res.json({ message: huClientResponse });
});

module.exports = router;
