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
// var upload = multer({ dest: 'uploads/' });
var upload = multer({ storage: storage });

// upload image to server
router.post('/', upload.single('imagefile'), function(req, res, next) {
    var x = req.body.test1;
    console.log('testing:' + x);
    // Creates a client
    const client = new vision.ImageAnnotatorClient();
    const fileName = './uploads/imagefile.jpg';
    // Read a local image as a text document
    client
    .documentTextDetection(fileName)
    .then(results => {
        const fullTextAnnotation = results[0].fullTextAnnotation;
        var jsonResponse = {};
        jsonResponse.fulltext = fullTextAnnotation.text;
        res.send(jsonResponse);
    })
    .catch(err => {
        res.send(err);
    });
});

module.exports = router;