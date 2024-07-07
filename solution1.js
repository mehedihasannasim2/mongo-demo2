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
    name: String,
    author: String,
    tags: [ String ], 
    date: Date,
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema)


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
