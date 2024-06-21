const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/newsDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const newsSchema = new mongoose.Schema({
    title: String,
    description: String,
    url: String,
    urlToImage: String,
    publishedAt: Date,
    source: {
        id: String,
        name: String,
    },
});

const News = mongoose.model('News', newsSchema);

app.post('/save-article', async (req, res) => {
    try {
        const article = req.body;
        const newsArticle = new News(article);
        await newsArticle.save();
        res.status(200).send('Article saved successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error saving the article.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
