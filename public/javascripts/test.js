$(document).ready(function() {
    document.getElementById("inp").addEventListener("change", readFile);
    $("#myBtn").click(function() {
        var fileInput = document.getElementById("inp");
        var file = fileInput.files[0];
        var formData = new FormData();
        formData.append('imagefile', file);
        formData.append('test1', 'abc');
        formData.append('test2', 'def');
        formData.append('test3', 'ghi');
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
                //alert('success: ' + JSON.stringify(res));
                const respTxt = res.fulltext;
                document.getElementById("outputTxt").innerHTML = respTxt;
            },
            error: function(err){
                alert('Error: ' + JSON.stringify(err));
            }
        });
    }); 
});

function readFile() {
    if (this.files && this.files[0]) {
        var FR= new FileReader();
        FR.addEventListener("load", function(e) {
            document.getElementById("myimg").src = e.target.result;
        }); 
        FR.readAsDataURL( this.files[0] );
    }
}
