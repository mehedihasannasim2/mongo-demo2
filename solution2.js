/*
Exercise:
- Get all the published frontend and backend courses, 
- sort them by their price in a descending order, 
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
        .find({ isPublished: true, tags: { $in: ['frontend', 'backend']}})
        .sort('-price')
        .select('name author price')
    
}

// for printing the data in terminal
async function run () {
    const courses = await getCourses();
    console.log(courses);
}

run();
