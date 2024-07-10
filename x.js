// Trade off between query performance vs consistency

// Using References (Normalization) -> CONSISTENCY
let author = {
    name: 'mehedi nasim'
}

let course = {
    author: 'id'
}


// Using Embedded Documents (Denormalization) -> PERFORMANCE
let course = {
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