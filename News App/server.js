//chatgpt
const express = require('express');
const mongoose = require('mongoose');
const fetch = require('node-fetch');
const app = express();
const PORT = 3000;

const API_KEY = "daef703f4a264ab4a0ddec798334117a";
const url = "https://newsapi.org/v2/everything?q=";

// MongoDB connection
const mongoURI = 'YOUR_MONGODB_CONNECTION_STRING';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Define a schema and model
const newsSchema = new mongoose.Schema({
  title: String,
  description: String,
  urlToImage: String,
  url: String,
  source: {
    name: String,
  },
  publishedAt: Date,
});

const News = mongoose.model('News', newsSchema);

app.use(express.json());

app.get('/fetch-news', async (req, res) => {
  const query = req.query.q || 'World';
  console.log(`Fetching news for query: ${query}`);
  try {
    const response = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await response.json();
    console.log(`Fetched ${data.articles.length} articles`);
    
    const articles = data.articles.map(article => ({
      title: article.title,
      description: article.description,
      urlToImage: article.urlToImage,
      url: article.url,
      source: {
        name: article.source.name,
      },
      publishedAt: article.publishedAt,
    }));

    await News.insertMany(articles);
    console.log('Articles saved to database');
    res.json({ articles });
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).send('Error fetching news');
  }
});




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
