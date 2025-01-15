const express = require('express');
const app = express();
const port = 3000;

const notificationsRouter = require('./routes/notifications');
const pingRouter = require('./routes/ping');

app.use('/notifications', notificationsRouter);
app.use('/ping', pingRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
