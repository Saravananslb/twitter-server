const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require('./Route');
require('./db/config')();
const PORT = process.env.PORT || 5000;

const app = express();

// Middlewares
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb', extended: true, parameterLimit:50000 }));
app.use(express.urlencoded({extended: true, limit: '50mb'}));
app.use(express.json({limit: '100mb', extended: true, parameterLimit:50000}));

app.use('/api/v1', routes);

app.listen(PORT, () => {
    console.log(`app is listening in the port ${PORT}`)
});

// module.exports = {
//     upload
// }