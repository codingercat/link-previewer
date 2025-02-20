const axios = require ("axios");
const cheerio = require("cheerio");
const { object, string, ValidationError } = require("yup");

const schema = object( {
    url: string().url().required(),
});


const getUrlPreview = async (req, res) => {
  try {
      const { url } = req.body;

      if (!url) {
          console.error("❌ Error: No URL provided in request.");
          return res.status(400).json({ error: "URL is required" });
      }

      console.log(`🔎 Fetching preview for: ${url}`);

      const response = await axios.get(url, { timeout: 5000 }); // Add timeout to prevent long waits
      console.log(`✅ Fetched response with status: ${response.status}`);

      const $ = cheerio.load(response.data);
      const title = $("title").text() || "No Title";
      const description =
          $('meta[name="description"]').attr("content") || "No Description";
      const image = $('meta[property="og:image"]').attr("content") || "";

      console.log(`📝 Extracted: title=${title}, description=${description}, image=${image}`);

      res.json({ title, description, image });
  } catch (error) {
      console.error("❌ Error fetching URL preview:", error);
      res.status(500).json({ error: "Something went wrong!", details: error.message });
  }
};

module.exports = {
    getUrlPreview,
};