# Link Previewer

A simple project to learn **web scraping** and **TypeScript**. This project fetches metadata (title, description, and image) from a given URL using **Axios** and **Cheerio**.

## Features
- Fetches web page metadata (title, description, and preview image).
- Uses **Cheerio** for web scraping.
- Written in **TypeScript** for type safety.
- Implements **Express.js** for API handling.

## Tech Stack
- **Node.js**
- **Express.js**
- **TypeScript**
- **Axios**
- **Cheerio**

## Installation & Setup

### Prerequisites
Make sure you have **Node.js** installed.

### Steps
1. Clone this repository:
   ```sh
   git clone https://github.com/your-username/link-previewer.git
   cd link-previewer
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   npm run dev
   ```

## API Usage

### Endpoint: `/api/preview`
- **Method:** POST
- **Request Body:**
  ```json
  {
    "url": "https://example.com"
  }
  ```
- **Response:**
  ```json
  {
    "title": "Example Title",
    "description": "Example Description",
    "image": "https://example.com/image.jpg"
  }
  ```

## License
This project is for learning purposes and follows the license terms of the original [link-previewer](https://github.com/gkhan205/link-previewer).

## Acknowledgments
- Original Creator: [gkhan205](https://github.com/gkhan205)
- Inspired by web scraping projects using Cheerio and Axios.

