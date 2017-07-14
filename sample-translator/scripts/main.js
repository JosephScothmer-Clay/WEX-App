document.addEventListener("deviceready", onDeviceReady, false); 

function onDeviceReady() {
    navigator.splashscreen.hide(); //Hides the navigator
    bindSelect(); //calls the function bindSelect
}

function bindSelect() { // Puts languages in a list
    var culture = [
        {key: "af-ZA", value: "           Afrikaans"}, //Different languages in a list
        {key: "sq-AL", value: "            Albanian"},
        {key: "am-AM", value: "             Amharic"},
        {key: "ar-SA", value: "              Arabic"},
        {key: "hy-AM", value: "            Armenian"},
        {key: "az-AZ", value: "         Azerbaijani"},
        {key: "bjs-BJS", value: "           Bengali"},
        {key: "eu-ES", value: "              Basque"},
        {key: "be-BY", value: "            Bielarus"},
        {key: "bi-BI", value: "             Bislama"},
        {key: "bs-BA", value: "             Bosnian"},
        {key: "br-FR", value: "              Breton"},
        {key: "bg-BG", value: "           Bulgarian"},
        {key: "my-MM", value: "             Burmese"},
        {key: "ca-ES", value: "             Catalan"},
        {key: "cb-PH", value: "             Cebuano"},
        {key: "ch-CH", value: "            Chamorro"},
        {key: "zh-CN", value: "Chinese (Simplified)"},
        {key: "zh-TW", value: " Chinese Traditional"},
        {key: "hr-HR", value: "            Croatian"},// Can translate in to many for example Croatian
        {key: "cs-CZ", value: "               Czech"},
        {key: "da-DK", value: "              Danish"},
        {key: "nl-NL", value: "               Dutch"},
        {key: "et-EE", value: "            Estonian"},
        {key: "fi-FI", value: "             Finnish"},
        {key: "fr-FR", value: "              French"},
        {key: "ka-GE", value: "            Georgian"},
        {key: "de-DE", value: "              German"},
        {key: "el-GR", value: "               Greek"},
        {key: "XN-US", value: "            Hawaiian"},
        {key: "he-IL", value: "              Hebrew"},
        {key: "hi-IN", value: "               Hindi"},
        {key: "hu-HU", value: "           Hungarian"},
        {key: "is-IS", value: "           Icelandic"},
        {key: "id-ID", value: "          Indonesian"},
        {key: "it-IT", value: "             Italian"},
        {key: "ko-KR", value: "              Korean"},
        {key: "ku-TR", value: "             Kurdish"},
        {key: "la-XN", value: "               Latin"},
        {key: "lv-LV", value: "             Latvian"},
        {key: "lt-LT", value: "          Lithuanian"},
        {key: "lb-LB", value: "       Luxembourgish"},
        {key: "mk-MK", value: "          Macedonian"},
        {key: "mn-MN", value: "           Mongolian"},
        {key: "ne-NP", value: "              Nepali"},
        {key: "no-NO", value: "           Norwegian"},
        {key: "ur-PK", value: "           Pakistani"},
        {key: "pa-IN", value: "             Panjabi"},
        {key: "fa-IR", value: "             Persian"},
        {key: "pl-PL", value: "              Polish"},
        {key: "pt-PT", value: "          Portuguese"},
        {key: "ro-RO", value: "            Romanian"},
        {key: "ru-RU", value: "             Russian"},
        {key: "sr-RS", value: "             Serbian"},
        {key: "sk-SK", value: "              Slovak"},
        {key: "sl-SI", value: "           Slovenian"},
        {key: "es-ES", value: "             Spanish"},
        {key: "sv-SE", value: "             Swedish"},
        {key: "de-CH", value: "        Swiss German"},
        {key: "th-TH", value: "                Thai"},
        {key: "bo-CN", value: "             Tibetan"},
        {key: "tr-TR", value: "             Turkish"},
        {key: "tk-TK", value: "             Turkmen"},
        {key: "uk-UA", value: "           Ukrainian"},
        {key: "uz-UZ", value: "               Uzbek"},
        {key: "vi-VN", value: "          Vietnamese"},
        {key: "cy-GB", value: "               Welsh"},
        {key: "wo-SN", value: "               Wolof"},
        {key: "xh-ZA", value: "               Xhosa"},
        {key: "yi-YD", value: "             Yiddish"},
        {key: "zu-ZU", value: "                Zulu"}
    ];

    for (var i in culture) {
        var obj = culture[i];
        var index = 0;
        var key, val;
        for (var prop in obj) {
            switch (index++) {
                case 0:
                    key = obj[prop];
                    break;
                case 1:
                    val = obj[prop];
                    break;
                default:
                    break;
            }
        }
        $("select").append("<option value=\"" + key + "\">" + val + "</option>");//Adds child element on to select
    }
}


var translaionURI = "http://mymemory.translated.net/api/get?q="; // Link to where translations are found
var langQS = "&langpair=";

function translate() { //creates a function in which retrives translation
    console.log("Translating...") //Shows the function has been called upon
    var from = $('#sourceLanguage').val();
    var to = $('#destLanguage').val();
    var text = $('#translateText').val(); 
    var qsVal = langQS + from + '|' + to;
    var fullURI = translaionURI + text + qsVal;

    $.ajax({
        url: fullURI, dataType: 'json', success: function (data) {
            $('#translatedText').val(data.responseData.translatedText);
        }
    });
}

$(document).on('keyup','#translateText',function(){//Every time a key has been finnished being pressed, the translation is updated
    translate(); //Translates the text entered
});

$('#translateForm').submit(function () {
    translate();
    getImages();

    return false;
});

function jsonFlickrFeed(json){ //Creates a new function
    console.log("Printing images") //Used to check if the function is called upon
    $("#images").empty(); // will clear images from previous image insersions
    $.each(json.items, function(i,item){
        if(i>=3)return; // If information is greater than 3 it will return
        $("<image style = 'max-width: calc(33% - 10px); padding: 5px; max-height: 75px;' />").attr("src", item.media.m).appendTo("#images");
    });
}
function getImages(){ // Find images from flickr
    console.log("Getting images...")//check that the function has been called upon
    var text = $('#translateText').val(); //Gets from css as an id
    $.ajax({ //requests url
        url: 'https://api.flickr.com/services/feeds/photos_public.gne',//link to find images
        dataType: 'jsonp',
        data: {"tags": text, "format": "json"}
    });
}

$(document).on('keyup', '#translateText', function(){ //calls the function
    translate(); //translates the words inputed in
    getImages(); //finds images from a link
});
var ip ="127.0.0.1";
function showTranslationsOnTable(json){//Creates a function
    if(json != null && json.length >0){ //Nothing happens if the length is 0
        $("#hist").empty(); //Makes history from js empty
        $.each(json, function(i, item){
            var td1 = "<td><i>" + item.original + "</id></td>"; // Registers the original item
            var td2 = "<td><b>" + item.translated + "</b></td>"; //Puts the the translated word in a textbox
            $("#hist").append("<tr>" + td1 + td2 + "<tr>"); //adds to history
        });
    }else{ //If the length is not 0 execute rest of programme
        $("#hist").html("<tr><td colspan = '2' style = 'text-align: center;'><i>empty</i></td><tr>");
    }
}

function getStoredTranslations(){ //Stores translations
    $.ajax({
        type: "GET",
        url: "http://" + ip + ":3000/load",
        sucess: showTranslationsOnTable //it calls the function showTranslationsOnTable if sucessful
    });
}
getStoredTranslations(); // Gets the stored translations from an id
$(document).on('click', '#save', function(){ //goes to the function
    saveTranslations();
});
function saveTranslations(){ // This will save the new translations done based on a button
    var orig = encodeURIComponent($('#translateText').val());
    var trans = encodeURIComponent($('#translatedText').val());
    $.ajax({
        type: "POST",
        url: "http://" + ip + ":3000/save" + "?o=" + orig + "&t=" + trans, 
        sucess: showTranslationsOnTable
    });
}