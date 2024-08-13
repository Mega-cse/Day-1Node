import express from 'express';
import fs from 'fs';
import path from 'path';
import { format } from 'date-fns';
const app = express();
const PORT = 4001;
const folderPath = path.join('TimeStamp');

// Endpoint to create a file with the current timestamp
app.get('/create-file', (req, res) => {
  const now = new Date();
  const formattedDate = format(now, 'dd-MM-yyyy-HH-mm-ss');
  const filePath = path.join(folderPath, `${formattedDate}.txt`);
  const content = formattedDate;

  fs.writeFile(filePath, content, 'utf8', (err) => {
    if (err) {
      return res.status(500).send('Error writing file');
    }
    res.status(200).send(`File created: ${filePath}`);
  });
});

// Endpoint to list all text files in the folder
app.get('/list-files', (req, res) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return res.status(500).send('Error reading directory');
    }
    const txtFiles = files.filter(file => path.extname(file) === '.txt');
    res.json(txtFiles);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
