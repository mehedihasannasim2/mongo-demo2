
// _id: 5a724953ab83547957541e6a



// 12 bytes
    // 4 bytes: timestamp
    // 3 bytes: machine identifier
    // 2 bytes: process identifier
    // 3 bytes: counter

// 1 byte = 8 bits
// 2 ^ 8 = 256
// 2 ^ 24 = 16M

// Driver -> MongoDB


import mongoose from "mongoose";

const id = new mongoose.Types.ObjectId();
console.log(id); 
console.log(id.getTimestamp()); 

const isValid = mongoose.Types.ObjectId.isValid('668fc2b892f287b2ed834c1d')
console.log(isValid);