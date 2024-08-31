const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { song: null, error: null });
});

app.post('/search', async (req, res) => {
    const query = req.body.query;
    const url = `https://ai.xterm.codes/api/downloader/youtube?type=mp3&url=${encodeURIComponent(query)}`;

    try {
        const response = await axios.get(url);
        if (response.data.status) {
            const songData = response.data.data;
            res.render('index', { song: songData });
        } else {
            res.render('index', { error: 'Song not found.' });
        }
    } catch (error) {
        console.error(error);
        res.render('index', { error: 'Failed to fetch song details.' });
    }
});

app.listen(3000, () => {
    console.log('Music player is running on http://localhost:3000');
});
