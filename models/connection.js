const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://qgadmin:n1mdagq@cluster0.zho9w.mongodb.net/tickethack';

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected'))
  .catch(error => console.error(error));