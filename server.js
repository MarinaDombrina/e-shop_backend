const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())


const start = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/')
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log('Error: ' + e)
    }
}

start()