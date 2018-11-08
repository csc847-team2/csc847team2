var express = require('express');
var router = express.Router();
const fs = require('fs');
// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');

router.post('/', function(req, res, next) {
  // Creates a client
  const client = new textToSpeech.TextToSpeechClient();
  // The text to synthesize
  const text = req.body.input;
  // Construct the request
  const request = {
    input: {text: text},
    // Select the language and SSML Voice Gender (optional)
    voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
    // Select the type of audio encoding
    audioConfig: {audioEncoding: 'MP3'},
  };

  // Performs the Text-to-Speech request
  client.synthesizeSpeech(request, (err, response) => {
    if (err) {
      console.error('ERROR:', err);
      return;
    }

    // Write the binary audio content to a local file
    fs.writeFile('txtSpeechOutput.mp3', response.audioContent, 'binary', err => {
      if (err) {
        console.error('ERROR:', err);
        return;
      }
      console.log('Audio content written to file: txtSpeechOutput.mp3');
      res.sendStatus(200)
    });

    /*fs.readFile('./routes/txtSpeechOutput.mp3', 'utf8', function(err, contents) {
      //console.log(contents);
      console.log('created file')
      //res.send('success')
    });
    console.log('after calling readFile');*/
  });
});

module.exports = router;