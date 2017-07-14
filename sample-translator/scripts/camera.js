function takePhoto() {
    var options = {
        quality : 75,
        allowEdit: 'True'
    };
    navigator.camera.getPicture(function(photoString){
        $("#imagesss").empty();
        $("<img style='height: 100%; width: 100%' />").attr("src", photoString).appendTo('#imagesss');
            
    }, function(){
        console.log("Failure")
        
    }
)};

$("#photoButton").click(function() {
    takePhoto();
    return false;
});

function savePhoto(photoString, filename) {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
        alert('file system open ' + fs.name);
        fs.root.getFile("file.txt", { create: true, exclusive: false }, function(fileEntry){
            alert('in create file');

            alert("fileEntry is file?" + fileEntry.isFile.toString());
            fileEntry.name == 'file.txt'
            fileEntry.fullPath == '/file.jpg'
            writeFile(fileEntry, photoString);

        }, function(e){
            alert("Couldn't load file system...")
            alert(e)
        });

function writeFile(fileEntry, dataObj) {
    alert('in write file')
    file.Entry.createWriter(function(fileWriter) {

        fileWriter.onwriteend = function() {
            alert("Successful file write...");
            readFile(fileEntry);
        };

        if (!dataObj) {
            dataObj = new Blob(['some file data'], { type: 'text/plain'});
        }

        fileWriter.write(dataObj);
    }, function(e){
        alert("couldn't create fileWriter")
        alert(e)
    });
}
    })

}

$("savePic").click(function() {
    var photosrc = $('.photo').attr('src');
    saveToFile(photosrc, 'ourfile');
});

