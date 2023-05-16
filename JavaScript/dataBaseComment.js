const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const pool = mysql.createPool({
    host: 'sql110.epizy.com', // Replace XXX with the correct number
    user: 'epiz_33876439',
    password: 'wzLuqX6BJ4JSeoQ',
    database: 'epiz_33876439_professors_comment',
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
app.post('/api/comments', (req, res) => {
    const { professor, comment } = req.body;

    if (!professor || !comment) {
        return res.status(400).json({ error: 'Professor and comment are required' });
    }

    const query = 'INSERT INTO comments (professor, comment) VALUES (?, ?)';
    const queryParams = [professor, comment];

    pool.query(query, queryParams, (err, result) => {
        if (err) {
            console.error('Error inserting comment:', err);
            res.status(500).json({ error: 'Failed to insert comment' });
        } else {
            res.status(201).json({ message: 'Comment successfully added' });
        }
    });
});

