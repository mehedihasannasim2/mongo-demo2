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


// Approach: Update first
// Update directly
// Optionally: get the update document
async function updateCourse(id) {
    
    const course = await  Course.findByIdAndUpdate(id, {
        $set: {
            author: 'mehedi',
            isPublished: false
        }
    }, { new: true });
    console.log(course);
}

async function removeCourse(id) {
    
    const result = await Course.deleteOne({ _id: id});
    // const course = await Course.findOneAndRemove(id)
    console.log(result);
}

removeCourse('66868854aa5b5ef408b46ca1');
// updateCourse('66868854aa5b5ef408b46ca1');




async function getCourses(){
    const pageNumber = 2;
    const pageSize = 10;
    const courses = await Course
        .find({ author: 'hasan', isPublished: true})
        .skip((pageNumber- 1) * pageSize)
        .limit(pageSize)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1});
    console.log(courses);
}

// getCourses();


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