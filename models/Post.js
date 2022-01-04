const mongoose = require('mongoose'); // Import Mongoose module

// Create schema for posts
const PostSchema = ({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Posts', PostSchema); // Export model (with name and schema to associate)