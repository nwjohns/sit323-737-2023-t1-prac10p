const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();

// MongoDB connection URL
const url = 'mongodb://admin:password@34.87.247.23:27017/database';

// Define routes
app.get('/', (req, res) => {
  res.send('Welcome to the Suburbs Database App!');
});

app.get('/suburbs', (req, res) => {
  // Connect to MongoDB
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
      console.error('Error connecting to MongoDB:', err);
      res.status(500).send('Error connecting to MongoDB');
      return;
    }

    // Access the suburbs collection
    const db = client.db();
    const suburbsCollection = db.collection('suburbs');

    // Fetch all suburbs
    suburbsCollection.find().toArray((err, suburbs) => {
      if (err) {
        console.error('Error retrieving suburbs:', err);
        res.status(500).send('Error retrieving suburbs');
        return;
      }

      // Return the suburbs as JSON
      res.json(suburbs);
    });
  });
});

app.post('/suburbs', (req, res) => {
  // Connect to MongoDB
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
      console.error('Error connecting to MongoDB:', err);
      res.status(500).send('Error connecting to MongoDB');
      return;
    }

    // Access the suburbs collection
    const db = client.db();
    const suburbsCollection = db.collection('suburbs');

    // Extract suburb name from request body
    const { suburb } = req.body;

    // Insert suburb into the collection
    suburbsCollection.insertOne({ name: suburb }, (err, result) => {
      if (err) {
        console.error('Error inserting suburb:', err);
        res.status(500).send('Error inserting suburb');
        return;
      }

      // Return success message
      res.send('Suburb added successfully');
    });
  });
});

// Health endpoint
app.get('/health', (req, res) => {
  res.sendStatus(200);
});

// Start the server
app.listen(80, '0.0.0.0', () => {
  console.log('App listening on port 80');
});
