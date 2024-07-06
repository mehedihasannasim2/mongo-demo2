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

async function createCourse() {
    // camel case course to name our objects
    const course = new Course({
        name: 'django Course',
        author: "hasan",
        tags: ['python', 'backend'],
        isPublished: true
    });
    
    const result = await course.save();
    console.log(result);

}
// createCourse();


async function getCourses(){
    // Comparison Operator
    // eq (equal)
    // ne (not Equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in 
    // nin (not in)

    // or
    // and
    const courses = await Course
        // .find({ author: 'hasan', isPublished: true})
        // .find({ price: { $gt: 10, $lte: 20 } })
        // .find({ price: { $in: [10, 15, 20] }})
        .find()
        .or([{ author: 'hasan'}, { isPublished: true }])
        .and([{ author: 'hasan', isPublished: true }])
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1});
    console.log(courses);
}

getCourses();


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