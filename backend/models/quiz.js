const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    mobileno: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    // Optional: Store the quiz answers and the calculated score
    answers: {
        type: Map,
        of: mongoose.Schema.Types.Mixed,
        default: {}
    },
    score: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['completed', 'partial'],
        default: 'completed'
    }
}, {
    timestamps: true
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
