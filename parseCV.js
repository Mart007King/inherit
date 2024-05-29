
const fs = require('fs');
const pdf = require('pdf-parse');
const { extractRawText } = require('docx-parser');
const nlp = require('compromise');

async function extractTextFromPdf(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdf(dataBuffer);
  return data.text;
}

async function extractTextFromDocx(filePath) {
  const text = await extractRawText(filePath);
  return text;
}

function extractDetails(text) {
  const doc = nlp(text);
  const details = {
    name: doc.people().out('text'),
    email: doc.emails().out('text'),
    phone: doc.phoneNumbers().out('text'),
    // Add more fields as needed
  };
  return details;
}

async function parseCV(filePath) {
  let text = '';
  if (filePath.endsWith('.pdf')) {
    text = await extractTextFromPdf(filePath);
  } else if (filePath.endsWith('.docx')) {
    text = await extractTextFromDocx(filePath);
  }

  const details = extractDetails(text);
  console.log(JSON.stringify(details));
}

if (process.argv.length < 3) {
  console.error('Please provide the path to the CV file as an argument');
  process.exit(1);
}

const filePath = process.argv[2];
parseCV(filePath).catch(err => {
  console.error('Error parsing CV:', err);
});
