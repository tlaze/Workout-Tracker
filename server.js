const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const homeRoutes = require('./routes/homeRoutes.js');
const apiRoutes = require('./routes/apiRoutes.js');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/Workout', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

app.use(homeRoutes);
app.use(apiRoutes);

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
});