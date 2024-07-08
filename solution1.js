/*
Exercise:
- Get all the published backend courses, 
- sort them by their name, 
- pick only their name and author
- And display them
PROCESS: load mongoose model >> connect to new mongodb >> create a schema (shape of collection) >> write query 
*/

// import express from 'express';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/mongo-exercises');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5, 
        maxlength: 255,
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network']
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            // isAsync: true,
            validator: function(v) {
                return new Promise((callbacks) => {
                    setTimeout(() => {
                        const result = v && v.length > 0;
                        callbacks(result);
                    }, 4000);

                });
            },
            message: 'A course should have at least one tag.'
        },
    }, 
    date: { type: Date, default: Date.now},
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() { return this.isPublished; },
        min: 10,
        max: 20000
    }
});

const Course = mongoose.model('Course', courseSchema)

async function createCourse() {
    const course = new Course({
        name: 'django Course',
        category: 'web',
        author: "jupitar",
        tags: ['backend'],
        isPublished: true,
        price: 1500
    });
    
    try {
        const result = await course.save();
        console.log(result);
    }
    catch (ex) {
        console.log(ex.message);
    }
}
createCourse();

async function getCourses() {
    return await Course
        .find({ isPublished: true, tags: 'backend'})
        .sort({ name: 1})
        .select({ name: 1, author: 1 })
        // .select('name author')
    
}

// for printing the data in terminal
async function run () {
    const courses = await getCourses();
    console.log(courses);
}

run();
