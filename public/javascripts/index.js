var currLangSelection = 'af';

var languageDict = {
    'Afrikaans': 'af',
    'Arabic': 'ar',
    'Bengali': 'bn',
    'Chinese': 'zh-CN',
    'English': 'en',
    'French': 'fr',
    'German': 'de',
    'Greek': 'el',
    'Gujarati': 'gu',
    'Hebrew': 'he**',
    'Hindi': 'hi',
    'Indonesian': 'id',
    'Italian': 'it',
    'Japanese': 'ja',
    'Kannada': 'kn',
    'Korean': 'ko',
    'Malayalam': 'ml',
    'Marathi': 'mr',
    'Nepali': 'ne',
    'Pashto': 'ps',
    'Persian': 'fa',
    'Polish': 'pl',
    'Portuguese': 'pt',
    'Punjabi': 'pa',
    'Russian': 'ru',
    'Sindhi': 'sd',
    'Sinhalese': 'si',
    'Spanish': 'es',
    'Swahili': 'sw',
    'Tamil': 'ta',
    'Telugu': 'te',
    'Turkish': 'tr',
    'Urdu': 'ur',
    'Vietnamese': 'vi',
    'Xhosa': 'xh',
    'Zulu': 'zu'
};

//On HTML Page load
$(document).ready(function() {
    document.getElementById("fileInputBtn").addEventListener("change", readFile);
    $("#extractBtn").click(function() {
        uploadImageToServer();
    }); 
    $("#translateBtn").click(function() {
        fetchTranslationFromServer();
    });
    $("#speechBtn").click(function() {
        createAudioFile();
    });
    populateLanguageDropdownList();
});

function fetchTranslationFromServer() {
    var inputTextStr = document.getElementById("outputTxt").innerHTML;
    var langCode = currLangSelection;
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

function createAudioFile() {
    var inputTextStr = document.getElementById("outputTxt").innerHTML;
    let body = {};
    body.input = inputTextStr;
    $.post("/textToSpeech", body, function (response) {
        console.log(response)
        if(response) {
            $.post("/mp3", body, function (response) {
                //window.open('http://localhost:2000/')
                $('#frameDiv').html('<iframe src="http://localhost:2000/"></iframe>')
            });  
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

function populateLanguageDropdownList() {
    let languageDropdownList = document.getElementById('languageDropdown');
    for (let key in languageDict) {
        if (languageDict.hasOwnProperty(key)) {
            let anchorElement = document.createElement('a');
            anchorElement.setAttribute('class', 'dropdown-item');
            anchorElement.setAttribute('onmouseover', '');
            anchorElement.setAttribute('style', 'cursor: pointer;');
            anchorElement.innerHTML = key;
            anchorElement.addEventListener("click", function (event) {
                $("#btnLanguageDropdown").text(key);
                currLangSelection = languageDict[key];
            });
            languageDropdownList.appendChild(anchorElement);
        }
    }      
}
