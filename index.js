import express from 'express';
import mongoose from 'mongoose';


const app = express()
const port = 3000;
app.use(express.json())

app.get('/', (req, res) => {
    res.send('hello world')
})

const userSchema = new mongoose.Schema({
    username: String,
    roll: Number,
    isSmart: Boolean
})

const userModel = mongoose.model('User', userSchema);

app.post('/', async (req, res) => {
    const receiveData = req.body;
    const createData = await userModel.create(receiveData);
    res.json(createData)
})

const startServer = async () => {
    await mongoose.connect("mongodb://localhost:27017/playground");
    console.log('connected to monggoooooo');
    app.listen(port, () => {
        console.log('server is running');
    });
}

startServer();