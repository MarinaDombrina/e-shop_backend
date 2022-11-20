const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routers');

const PORT = process.env.PORT || 5000

const app = express()

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            
    optionSuccessStatus:200
}

app.use(express.json())
app.use(cors(corsOptions));
app.use('/api', router)


const start = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/')
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log('Error: ' + e)
    }
}

start()