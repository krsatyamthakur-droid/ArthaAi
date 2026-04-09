const express = require('express');
const Quiz = require('../models/quiz');
const router = express.Router();

// POST /api/quiz/submit
router.post('/submit', async (req, res) => {
    try {
        const { username, mobileno, email, answers } = req.body;

        // Validation
        if (!username || !mobileno || !email) {
            return res.status(400).json({ 
                success: false, 
                message: "Name, Mobile, and Email are all required." 
            });
        }

        // Create the quiz entry
        const entry = new Quiz({
            username,
            mobileno,
            email,
            answers: answers || {},
            // You can also calculate the score here if you want to store it on the backend
            status: 'completed'
        });

        await entry.save();

        res.status(201).json({
            success: true,
            message: "Successfully joined the waitlist!",
            data: entry
        });

    } catch (error) {
        console.error("Quiz submission error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Internal server error. Please try again later." 
        });
    }
});

module.exports = router;
