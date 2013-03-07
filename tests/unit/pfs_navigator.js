module("Navigator");

//Simulator a Firefox 3.5 Mac OS X
// mocks out the navigator.plugins object, which sometimes acts as an array, sometimes as an object
var testBrowserNavigatorPlugins = {
    length: 5,
    "0": {
        name: "Shockwave Flash", description: "Shockwave Flash 10.0 r12",
        length: 2,
        "0": {type: "application/x-shockwave-flash"},
        "1": {type: "application/futuresplash"}
    },
    "1": {
        name: "Default Plugin", description: "Gecko default plugin",
        length: 1,
        "0": {type: "*"}
    },
    "2": {
        name: "QuickTime Plug-in 7.6.2",
        description: "The QuickTime Plugin allows you to view a wide variety of multimedia content in web pages. For more information, visit the <A HREF=http://www.apple.com/quicktime>QuickTime</A> Web site.",
        length: 76,
        "0": {type: "application/sdp"} ,"1": {type: "application/x-sdp"} ,"2": {type: "application/x-rtsp"} ,"3": {type: "video/quicktime"} ,"4": {type: "video/x-msvideo"} ,"5": {type: "video/msvideo"} ,"6": {type: "video/avi"} ,"7": {type: "video/flc"} ,"8": {type: "application/x-ogg"} ,"9": {type: "application/ogg"} ,"10": {type: "video/x-ogg"} ,"11": {type: "video/ogg"} ,"12": {type: "application/x-annodex"} ,"13": {type: "application/annodex"} ,"14": {type: "video/x-annodex"} ,"15": {type: "video/annodex"} ,"16": {type: "audio/x-wav"} ,"17": {type: "audio/wav"} ,"18": {type: "audio/aiff"} ,"19": {type: "audio/x-aiff"} ,"20": {type: "audio/basic"} ,"21": {type: "audio/mid"} ,"22": {type: "audio/x-midi"} ,"23": {type: "audio/midi"} ,"24": {type: "audio/vnd.qcelp"} ,"25": {type: "audio/x-gsm"} ,"26": {type: "audio/AMR"} ,"27": {type: "audio/aac"} ,"28": {type: "audio/x-aac"} ,"29": {type: "audio/x-caf"} ,"30": {type: "audio/vnd.qcelp"} ,"31": {type: "audio/ac3"} ,"32": {type: "audio/x-ac3"} ,"33": {type: "audio/x-ogg"} ,"34": {type: "audio/ogg"} ,"35": {type: "audio/x-speex"} ,"36": {type: "audio/speex"} ,"37": {type: "audio/x-annodex"} ,"38": {type: "audio/annodex"} ,"39": {type: "video/x-mpeg"} ,"40": {type: "video/mpeg"} ,"41": {type: "audio/mpeg"} ,"42": {type: "audio/x-mpeg"} ,"43": {type: "video/3gpp"} ,"44": {type: "audio/3gpp"} ,"45": {type: "video/3gpp2"} ,"46": {type: "audio/3gpp2"} ,"47": {type: "video/sd-video"} ,"48": {type: "application/x-mpeg"} ,"49": {type: "video/mp4"} ,"50": {type: "audio/mp4"} ,"51": {type: "audio/x-m4a"} ,"52": {type: "audio/x-m4p"} ,"53": {type: "audio/x-m4b"} ,"54": {type: "video/x-m4v"} ,"55": {type: "audio/mpeg"} ,"56": {type: "audio/x-mpeg"} ,"57": {type: "audio/mp3"} ,"58": {type: "audio/x-mp3"} ,"59": {type: "audio/mpeg3"} ,"60": {type: "audio/x-mpeg3"} ,"61": {type: "image/x-bmp"} ,"62": {type: "image/x-macpaint"} ,"63": {type: "image/pict"} ,"64": {type: "image/x-pict"} ,"65": {type: "image/png"} ,"66": {type: "image/x-png"} ,"67": {type: "image/x-quicktime"} ,"68": {type: "image/x-sgi"} ,"69": {type: "image/x-targa"} ,"70": {type: "image/tiff"} ,"71": {type: "image/x-tiff"} ,"72": {type: "image/jp2"} ,"73": {type: "image/jpeg2000"} ,"74": {type: "image/jpeg2000-image"} ,"75": {type: "image/x-jpeg2000-image"}
    },
    "3": {
        name: "iPhotoPhotocast",
        description: "iPhoto6",
        length: 1,
        "0": {type: "application/photo"}
    },
    "4": {
        name: "Java Embedding Plugin 0.9.7.1",
        description: "Runs Java applets using the latest installed versions of Java. For more information: <A HREF=http://javaplugin.sourceforge.net/>Java Embedding Plugin</A>. Run version test: <A HREF=http://gemal.dk/browserspy/java.html>Java Information</A>.",
        length: 1,
        "0": {type: "application/x-java-applet"} // and many more 
    }
};

var testPluginInfos = [  { "detected_version": "Shockwave Flash 10.0 r12", "mimes": [ "application/x-shockwave-flash", "application/futuresplash" ],
                           "classified": false, "raw":  testBrowserNavigatorPlugins[0]},
                      { "detected_version": "Default Plugin", "mimes": [ "*" ],
                        "classified": false, "raw":  testBrowserNavigatorPlugins[1]},
                      // { "detected_version": "QuickTime Plug-in 7.6.2", "mimes": [ "application/sdp", "application/x-sdp", "application/x-rtsp", "video/quicktime", "video/x-msvideo", "video/msvideo", "video/avi", "video/flc", "application/x-ogg", "application/ogg", "video/x-ogg", "video/ogg", "application/x-annodex", "application/annodex", "video/x-annodex", "video/annodex", "audio/x-wav", "audio/wav", "audio/aiff", "audio/x-aiff", "audio/basic", "audio/mid", "audio/x-midi", "audio/midi", "audio/vnd.qcelp", "audio/x-gsm", "audio/AMR", "audio/aac", "audio/x-aac", "audio/x-caf", "audio/vnd.qcelp", "audio/ac3", "audio/x-ac3", "audio/x-ogg", "audio/ogg", "audio/x-speex", "audio/speex", "audio/x-annodex", "audio/annodex", "video/x-mpeg", "video/mpeg", "audio/mpeg", "audio/x-mpeg", "video/3gpp", "audio/3gpp", "video/3gpp2", "audio/3gpp2", "video/sd-video", "application/x-mpeg", "video/mp4", "audio/mp4", "audio/x-m4a", "audio/x-m4p", "audio/x-m4b", "video/x-m4v", "audio/mpeg", "audio/x-mpeg", "audio/mp3", "audio/x-mp3", "audio/mpeg3", "audio/x-mpeg3", "image/x-bmp", "image/x-macpaint", "image/pict", "image/x-pict", "image/png", "image/x-png", "image/x-quicktime", "image/x-sgi", "image/x-targa", "image/tiff", "image/x-tiff", "image/jp2", "image/jpeg2000", "image/jpeg2000-image", "image/x-jpeg2000-image" ],
                      // classified: false, raw: testBrowserNavigatorPlugins[2] },
                      { "detected_version": "Shockwave Flash 10.0 r12", "mimes": [ "application/x-shockwave-flash", "application/futuresplash" ],
                        "classified": true, "raw":  testBrowserNavigatorPlugins[0] },
                      { "detected_version": "iPhoto6", "mimes": ["application/photo"],
                        "classified": false, "raw":  testBrowserNavigatorPlugins[3] },
                      { "detected_version": "Java Embedding Plugin 1.5.0.19", "mimes": ["application/x-java-applet"],
                      "detection_type": "original",
                      "classified": false, "raw": testBrowserNavigatorPlugins[4]}
                    ];

test("browserPlugins", function(){
    // mocking Java -- such an easy target, 21st century COBOL 
    PluginDetect.getVersion = function(pluginName, jarFile){
        return "1.5,0,19";
    };
    var actual = Pfs.UI.browserPlugins(testBrowserNavigatorPlugins);        
    deepEqual(actual[3].detected_version, testPluginInfos[4].detected_version,
         "Detected version matches. Note, we skip the default plugin, so it's off by 1 (3 instead of 4)");
    deepEqual(actual[3].mimes, testPluginInfos[4].mimes,
         "Mime types match");
    deepEqual(actual[3].detection_type, testPluginInfos[4].detection_type,
         "detection_type matches");
    deepEqual(actual[3].classified, testPluginInfos[4].classified,
         "classified is the same");
    deepEqual(actual[3].raw, testPluginInfos[4].raw,
         "Underlying raw plugin is the same");
});
