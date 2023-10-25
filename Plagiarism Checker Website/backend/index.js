const express = require('express');
const bodyParser = require('body-parser');
const cors=require("cors")

// Create an Express application
const app = express()

app.use(express.json())
app.use(cors())

const port = 3000;

app.use(bodyParser.json());

app.post('/checkPlagiarism', (req, res) => {
  const { textToCheck, originalText } = req.body;

  function checkForPlagiarism(textToCheck, originalText) {
    textToCheck = textToCheck.toLowerCase();
    originalText = originalText.toLowerCase();

    const wordsToCheck = textToCheck.split(' ');
    const originalWords = originalText.split(' ');

    const uniqueWords = new Set(originalWords);

    let matchingWords = 0;

    for (const word of wordsToCheck) {
      if (uniqueWords.has(word)) {
        matchingWords++;
      }
    }

    const plagiarismPercentage = (matchingWords / wordsToCheck.length) * 100;

    return plagiarismPercentage;
  }

  const plagiarismPercentage = checkForPlagiarism(textToCheck, originalText);

  if (plagiarismPercentage > 50) {
    res.json({ plagiarism: true, percentage: plagiarismPercentage });
  } else {
    res.json({ plagiarism: false, percentage: plagiarismPercentage });
  }
});

app.get("/",async (req,res) => {
    res.send("Welcome to backend")
})
app.listen(port, () => {
  console.log(`Plagiarism Checker API is running on port ${port}`);
});
