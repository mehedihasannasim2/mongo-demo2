import express from 'express';
import mongoose from 'mongoose';


const app = express()
const port = 3000;
app.use(express.json())

app.get('/', (req, res) => {
    res.send('hello world')
})

// const userSchema = new mongoose.Schema({
    // username: String,
    // roll: Number,
    // isSmart: Boolean

const courseSchema = new mongoose.Schema({

    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

// const userModel = mongoose.model('User', userSchema);


// pascal case Course to name our classes
const Course = mongoose.model('Course', courseSchema);
// camel case course to name our objects
const course = new Course({
    name: 'Node.js Course',
    author: "hasan",
    tags: ['node', 'backend'],
    isPublished: true
});


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