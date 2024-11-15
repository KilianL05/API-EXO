const express = require('express');
const chaptersRoutes = require("./routes/chapters_routes");
const cors = require('cors');
const mongoose = require('mongoose');
const {MONGO_URI} = require('./database/config');


const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch(
    (err) => {
        console.log('Error connecting to MongoDB', err);
    }
)

app.use('/chapters', chaptersRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});