const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser')
const v1Router = require('./src/v1/routes/credit_card.router');

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use('/api/v1', v1Router);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})