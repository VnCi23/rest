const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/my-api', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a Mongoose schema for a user
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

// Create a Mongoose model for a user
const User = mongoose.model('User', userSchema);

// Define routes for creating, retrieving, updating, and deleting users
app.post('/users', (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) return res.status(500).send(err);
    res.send(user);
  });
});

app.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) return res.status(500).send(err);
    res.send(users);
  });
});

app.get('/users/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) return res.status(500).send(err);
    res.send(user);
  });
});

app.put('/users/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, user) => {
    if (err) return res.status(500).send(err);
    res.send(user);
  });
});

app.delete('/users/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, user) => {
    if (err) return res.status(500).send(err);
    res.send(user);
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));