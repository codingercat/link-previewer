// server/index.js
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const { getUrlPreview } = require('./url.controller');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// Test route
app.get('/health', (req, res) => {
    console.log("Health check endpoint hit");
    res.json({ status: "Server is running" });
});

app.post("/preview", (req, res) => {
    console.log("Preview endpoint hit with body:", req.body);
    getUrlPreview(req, res);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});