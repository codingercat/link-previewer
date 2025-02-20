const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');

const { getUrlPreview } = require('./url.controller');

const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
const PORT = process.env.SERVER_PORT || 5000;

app.use(bodyParser.json());
app.use(cors({ origin: "*" }));
app.use(express.json());

app.get('/health', (req,res) =>{
    return res.status(200).json({status : "Server Running"});
});

app.post("/preview", async (req, res) => {
    try {
        console.log("🔹 Incoming Request Body:", req.body);
        
        const { url } = req.body;
        if (!url) {
            console.error("❌ Missing URL in Request");
            return res.status(400).json({ error: "URL is required" });
        }

        // Your existing preview logic...

        res.json({ title, description, image });
    } catch (error) {
        console.error("❌ Server Error:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.listen(PORT, hostname => {
    console.log("Server is running: %s", PORT);
})
