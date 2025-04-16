const express = require('express');
const app = express();

// Tambahkan ini di atas semua route
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ... semua require lainnya seperti path, mongoose, routes, dll
const mongoose = require('mongoose');
const path = require('path');
const books = require('./routes/books');
const locationRoutes = require('./routes/locations');
const authRoutes = require('./routes/auth');
const indexRoutes = require('./routes/index');

// session dan bodyParser
const session = require("express-session");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended:true }));

app.use(session({
  secret : 'some_secret_key',
  resave : false,
  saveUninitialized : true,
}));

// Routing
app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/books', books);

// Static file
app.use(express.static(path.join(__dirname, 'public')));
app.use('/eBook', express.static(path.join(__dirname, 'eBook')));

// View engine
app.set('view engine', 'ejs');

// DB Connection
mongoose.connect('mongodb://localhost/TesManagemenBuku')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
