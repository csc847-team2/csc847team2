var currLangSelection = 'en';

//On HTML Page load
$(document).ready(function() {
    document.getElementById("fileInputBtn").addEventListener("change", readFile);
    $("#extractBtn").click(function() {
        uploadImageToServer();
    }); 
    $("#translateBtn").click(function() {
        fetchTranslationFromServer();
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

// TODO: Rewrite this method. Code is too repititive.
function populateLanguageDropdownList() {
    var languageDropdownList = document.getElementById('languageDropdown');
    let anchorElement = document.createElement('a');
        anchorElement.setAttribute('class', 'dropdown-item');
        anchorElement.setAttribute('onmouseover', '');
        anchorElement.setAttribute('style', 'cursor: pointer;');
        anchorElement.innerHTML = 'English';
        anchorElement.addEventListener("click", function (event) {
            $("#btnLanguageDropdown").text('English');
            currLangSelection = 'en';
        });
        languageDropdownList.appendChild(anchorElement);
        let anchorElement2 = document.createElement('a');
        anchorElement2.setAttribute('class', 'dropdown-item');
        anchorElement2.setAttribute('onmouseover', '');
        anchorElement2.setAttribute('style', 'cursor: pointer;');
        anchorElement2.innerHTML = 'Hindi';
        anchorElement2.addEventListener("click", function (event) {
            $("#btnLanguageDropdown").text('Hindi');
            currLangSelection = 'hi';
        });
        languageDropdownList.appendChild(anchorElement2);
        let anchorElement3 = document.createElement('a');
        anchorElement3.setAttribute('class', 'dropdown-item');
        anchorElement3.setAttribute('onmouseover', '');
        anchorElement3.setAttribute('style', 'cursor: pointer;');
        anchorElement3.innerHTML = 'Russian';
        anchorElement3.addEventListener("click", function (event) {
            $("#btnLanguageDropdown").text('Russian');
            currLangSelection = 'ru';
        });
        languageDropdownList.appendChild(anchorElement3);
        let anchorElement4 = document.createElement('a');
        anchorElement4.setAttribute('class', 'dropdown-item');
        anchorElement4.setAttribute('onmouseover', '');
        anchorElement4.setAttribute('style', 'cursor: pointer;');
        anchorElement4.innerHTML = 'Spanish';
        anchorElement4.addEventListener("click", function (event) {
            $("#btnLanguageDropdown").text('Spanish');
            currLangSelection = 'es';
        });
        languageDropdownList.appendChild(anchorElement4);
    return anchorElement;
}
