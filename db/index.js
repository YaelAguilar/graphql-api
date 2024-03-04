const mongoose = require('mongoose')

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://213452:ON9qhpc6wVEnlLbN@cluster0.yrkpxzi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log('MongoDB connected');
}

module.exports = { connectDB };