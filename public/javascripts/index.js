//On HTML Page load
$(document).ready(function() {
    document.getElementById("fileInputBtn").addEventListener("change", readFile);
    $("#extractBtn").click(function() {
        uploadImageToServer();
    }); 
    $("#translateBtn").click(function() {
        fetchTranslationFromServer();
    });
});

function fetchTranslationFromServer() {
    var inputTextStr = document.getElementById("outputTxt").innerHTML;
    var langCode = 'ru';
    const body = {
        inputStr: inputTextStr,
        languageCode: langCode,
    };
    $.post("/translate", body, function (response) {
        if(response.success) {
            document.getElementById("outputTxt").innerHTML = response.translation;
        } else {
            window.alert(JSON.stringify(response.error));
        }
    });
}

/*
POST request with encryption type as 'multipart/form-data' that's
required by the 'multer' library to process and save uploaded files
*/
function uploadImageToServer() {
    var fileInput = document.getElementById("fileInputBtn");
    var file = fileInput.files[0];
    var formData = new FormData();
    formData.append('imagefile', file);//Append Image file to form data
    // formData.append('test1', 'abc');//Append any other key-value pair to form data
    $.ajax({
        url: "/upload",
        type: "POST",
        data: formData,
        cache: false,
        type: "POST",
        enctype: 'multipart/form-data',
        processData: false, // tell jQuery not to process the data
        contentType: false, // tell jQuery not to set contentType     
        success: function(res) {
            var respTxt = res.fulltext;
            document.getElementById("outputTxt").innerHTML = respTxt;
        },
        error: function(err){
            alert('Error: ' + JSON.stringify(err));
        }
    });
}

function readFile() {
    if (this.files && this.files[0]) {
        var FR= new FileReader();
        FR.addEventListener("load", function(e) {
            document.getElementById("inputImg").src = e.target.result;
        }); 
        FR.readAsDataURL( this.files[0] );
    }
}