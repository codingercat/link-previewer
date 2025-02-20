// server/url.controller.js
const axios = require("axios");
const cheerio = require("cheerio");

const getUrlPreview = async (req, res) => {
    try {
        console.log("Processing preview request for URL:", req.body.url);
        const { url } = req.body;

        if (!url) {
            console.log("No URL provided");
            return res.status(400).json({ error: "URL is required" });
        }

        console.log(`Fetching URL: ${url}`);
        
        const response = await axios.get(url, {
            timeout: 5000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        console.log("Successfully fetched URL");

        const $ = cheerio.load(response.data);
        
        const title = $("title").text() || "No Title";
        const description = $('meta[name="description"]').attr("content") || "No Description";
        const image = $('meta[property="og:image"]').attr("content") || "";

        console.log("Extracted data:", { title, description, image });

        res.json({ title, description, image });
    } catch (error) {
        console.error("Error in getUrlPreview:", error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getUrlPreview,
};