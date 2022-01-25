const mongoose = require('mongoose');

const connectdb = () => {
    mongoose.connect('mongodb://localhost:27017/twitter', (error) => {
    if (error) console.log('error in connecting db', error);
    else console.log('db connected');
});
}

module.exports = connectdb;