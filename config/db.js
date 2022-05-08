const mongoose = require('mongoose');

mongoose
  .connect(process.env.DB_PROTOCOL+process.env.DB_USER_PASS+process.env.DB_URI+process.env.DB_DATA,{})
  .then(() => console.log('Connected to mongodb'))
  .catch( (err) => console.log('Failed to connect to mongodb', err));
