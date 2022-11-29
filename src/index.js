const express = require('express');
const app = express();
const api = require('./api');
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json());

app.get('/',  (req, res) => {
    res.json({
        message: "Welcome Dev"
    });
});


app.use('/api', api);

app.listen(3001, () => console.log('Servidor Enabled to http://localhost:3001') )