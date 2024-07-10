// const mongoose = require('mongoose');
import mongoose from "mongoose";

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB..'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

    
    const authorSchema = new mongoose.Schema ({
        name: String,
        bio: String, 
        website: String
    })
    
const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema ({
    name: String,
    authors: [authorSchema]
}));

async function createCourse(name, authors) {
    const course = new Course({
        name, 
        authors
    });
    const result = await course.save();
    console.log(result);
}

async function listCourses() {
    const courses = await Course.find();
    console.log(courses);
}


async function updateAuthor(courseId) {
    const course = await Course.updateOne({ _id: courseId }, {
        $set: {
            'author.name': 'john smith'
        }
    });

}
// listCourses();

async function addAuthor(courseId, author) {
    const course = await Course.findById(courseId);
    course.authors.push(author);
    course.save();

}


async function removeAuthor(courseId, authorId) {
    const course = await Course.findById(courseId);
    const author = course.authors.id(authorId);
    author.deleteOne();
    course.save();

}

// addAuthor('668e52d9e68f05fb3db16e38', new Author({ name: 'Ami'}))
removeAuthor('668e52d9e68f05fb3db16e38', '668e53f54157395b1677cbd3');

// createCourse('Python Course', [
//     new Author({ name: 'Nasim'}),
//     new Author({ name: 'mehedi'}),
//     new Author({ name: 'hasan'})
// ]);
// updateAuthor('668e4a8d74e866f8ffe0f667');