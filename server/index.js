const express = require('express');
const PORT = process.env.PORT || 3000;
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(express.static(path.join(__dirname, '../client/src')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let sampleDictionary = [ 'ABA', 'ADS', 'CAT', 'DOGS', 'TAC', 'ATC' ];

app.post('/findwords', (req, res) => {
  let letters = req.body.input.toUpperCase();
  let hasAllLettersBoolean = (letters, dictonaryWord) => {
    let result = true;
    for (var i = 0; i < letters.length; i++) {
      let item = letters[i];
      result = result && dictonaryWord.indexOf(item)
    }
    return result;
  }
  let dictionary = fs.readFile(path.join(__dirname,'../dictionary/dictionary1.txt'), "utf8", (err, data) => {
    if (err) { console.log('Error! in fs readFile', err)} 
    sampleDictionary = data.split('\n');
  });

  let filtered = sampleDictionary.filter((item,i) => {
    // return item.length === letters.length && item.indexOf(letters[0]) > -1 && item.indexOf(letters[1]) > -1 && item.indexOf(letters[2]) > -1;
    return item.length === letters.length && hasAllLettersBoolean(letters, item);
  })
})

app.listen(PORT, (err) => {  
  if (err) { return console.log('failure at app.listen in server/index =>', err) }
  console.log(`server is listening on ${PORT}`)
})
