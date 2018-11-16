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
  var target = req.body.languageCode;

  //to check if Language select is supported by textToSpeech
  var lang_obj = ["ja","ko","de","en","es","fr","it","sv","pt","tr"];

  if(lang_obj.indexOf(target.toString()) == -1)
  {
    console.log('I am here');
    var target='en';
    console.log('value assigned');
   }
 
  console.log(target);

    var request = {
      input: {text: text},
      // Select the language and SSML Voice Gender (optional)
      voice: { languageCode: target, ssmlGender: 'NEUTRAL'},  //languageCode: 'en-US',
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