// Trade off between query performance vs consistency

// Using References (Normalization) -> CONSISTENCY
let author1 = {
    name: 'mehedi nasim'
}

let course1 = {
    author: 'id'
}


// Using Embedded Documents (Denormalization) -> PERFORMANCE
let course2 = {
    author: {
        name: 'mehedi nasim'
    }
}


// Hybrid
let author = {
    name: 'nasim'
}

let course = {
    author: {
        id: 'ref',
        name: 'nasim'
    }
}