document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    navigator.splashscreen.hide();
    bindSelect();
}

function bindSelect() {
    var culture = [
        {key: "af-ZA", value:"Afrikaans"}, 
        {key: "sq-AL", value: "Albanian"},
        {key: "am-AM", value: "Amharic"},
        {key: "ar-SA", value: "Arabic"},
        {key: "hy-AM", value: "Armenian"},
        {key: "az-AZ", value: "Azerbaijani"},
        {key: "bjs-BJS", value: "Bengali"},
        {key: "eu-ES", value: "Basque"},
        {key: "be-BY", value: "Bielarus"},
        {key: "bi-BI", value: "Bislama"},
        {key: "bs-BA", value: "Bosnian"},
        {key: "br-FR", value: "Breton"},
        {key: "bg-BG", value: "Bulgarian"},
        {key: "my-MM", value: "Burmese"},
        {key: "ca-ES", value: "Catalan"},
        {key: "cb-PH", value: "Cebuano"},
        {key: "ch-CH", value: "Chamorro"},
        {key: "zh-CN", value: "Chinese (Simplified)"},
        {key: "zh-TW", value: "Chinese Traditional"},
        {key: "hr-HR", value: "Croatian"},
        {key: "cs-CZ", value: "Czech"},
        {key: "da-DK", value: "Danish"},
        {key: "nl-NL", value: "Dutch"},
        {key: "et-EE", value: "Estonian"},
        {key: "fi-FI", value: "Finnish"},
        {key: "fr-FR", value: "French"},
        {key: "ka-GE", value: "Georgian"},
        {key: "de-DE", value: "German"},
        {key: "el-GR", value: "Greek"},
        {key: "XN-US", value: "Hawaiian"},
        {key: "he-IL", value: "Hebrew"},
        {key: "hi-IN", value: "Hindi"},
        {key: "hu-HU", value: "Hungarian"},
        {key: "is-IS", value: "Icelandic"},
        {key: "id-ID", value: "Indonesian"},
        {key: "it-IT", value: "Italian"},
        {key: "ko-KR", value: "Korean"},
        {key: "ku-TR", value: "Kurdish"},
        {key: "la-XN", value: "Latin"},
        {key: "lv-LV", value: "Latvian"},
        {key: "lt-LT", value: "Lithuanian"},
        {key: "lb-LB", value: "Luxembourgish"},
        {key: "mk-MK", value: "Macedonian"},
        {key: "mn-MN", value: "Mongolian"},
        {key: "ne-NP", value: "Nepali"},
        {key: "no-NO", value: "Norwegian"},
        {key: "ur-PK", value: "Pakistani"},
        {key: "pa-IN", value: "Panjabi"},
        {key: "fa-IR", value: "Persian"},
        {key: "pl-PL", value: "Polish"},
        {key: "pt-PT", value: "Portuguese"},
        {key: "ro-RO", value: "Romanian"},
        {key: "ru-RU", value: "Russian"},
        {key: "sr-RS", value: "Serbian"},
        {key: "sk-SK", value: "Slovak"},
        {key: "sl-SI", value: "Slovenian"},
        {key: "es-ES", value: "Spanish"},
        {key: "sv-SE", value: "Swedish"},
        {key: "de-CH", value: "Swiss German"},
        {key: "th-TH", value: "Thai"},
        {key: "bo-CN", value: "Tibetan"},
        {key: "tr-TR", value: "Turkish"},
        {key: "tk-TK", value: "Turkmen"},
        {key: "uk-UA", value: "Ukrainian"},
        {key: "uz-UZ", value: "Uzbek"},
        {key: "vi-VN", value: "Vietnamese"},
        {key: "cy-GB", value: "Welsh"},
        {key: "wo-SN", value: "Wolof"},
        {key: "xh-ZA", value: "Xhosa"},
        {key: "yi-YD", value: "Yiddish"},
        {key: "zu-ZU", value: "Zulu"}
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
        $("select").append("<option value=\"" + key + "\">" + val + "</option>");
    }
}

var translaionURI = "http://mymemory.translated.net/api/get?q=";
var langQS = "&langpair=";

function translate() {
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

$('#translateButton').click(function () {
    translate();
});

$('#translateForm').submit(function () {
    translate();

    return false;
});