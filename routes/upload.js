var express = require('express');
var router = express.Router();
const vision = require('@google-cloud/vision');
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, 'imagefile.jpg');
    }
});
var upload = multer({ storage: storage });

router.post('/', upload.single('imagefile'), function(req, res, next) {
    extractTextFromInputImageAndSendResponse(req, res);
});

module.exports = router;

// TODO: Rewrite & Move this function to a separate file.
// No business logic should be kept inside routes(Controller).
function extractTextFromInputImageAndSendResponse(req, res) {
    // console.log('testing:' + req.body.test1);
    const client = new vision.ImageAnnotatorClient();
    const fileName = './uploads/imagefile.jpg';
    client.documentTextDetection(fileName).then(results => {
        const fullTextAnnotation = results[0].fullTextAnnotation;
        var jsonResponse = {};
        jsonResponse.fulltext = fullTextAnnotation.text;
        res.send(jsonResponse);
    }).catch(err => {
        res.send(err);
    });
}
