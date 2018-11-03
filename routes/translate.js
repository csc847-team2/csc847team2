var express = require('express');
var router = express.Router();
const {Translate} = require('@google-cloud/translate');

router.post('/', function(req, res, next) {
    translateInputAndSendResponse(req, res);
});

module.exports = router;

// TODO: Rewrite & Move this function to a separate file.
// No business logic should be kept inside routes(Controller).
function translateInputAndSendResponse(req, res) {
    const projectId = 'csc847-team2-project';
    const translate = new Translate({
        projectId: projectId,
        keyFilename: './CSC847-Team2-Project-keyfile.json'
    });
    const text = req.body.inputStr;
    const target = req.body.languageCode;
    var respJson = {};
    translate.translate(text, target).then(results => {
        const translationResult = results[0];
        respJson.success = true;
        respJson.translation = translationResult;
        res.send(respJson);
    }).catch(err => {
        respJson.success = false;
        respJson.error = err;
        res.send(respJson);
    });
}