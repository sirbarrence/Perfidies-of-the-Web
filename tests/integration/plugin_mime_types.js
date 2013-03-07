module("knownPluginsByMimeTypes");
var makeIncCallTest = function(mimeType, expected) {
  return function(pfsResponse) {
    expected.incCallbackCount++;
    var literalMatch = false;
          for (var j=0; j < expected.names.length; j++) {
              if (pfsResponse.name == expected.names[j]) {
                  literalMatch = true;
                  if (expected.lastName != expected.names[0]) {
                      ok(pfsResponse.name != expected.lastName, "We shouldn't see the same plugin twice");
                  }
                  expected.lastName = expected.names[j];
                  break;
              }
          }
          ok(literalMatch, "Given " + mimeType + " we should see one of " + expected.names);
          if (literalMatch) {
              var urlMatch = false;
              for (j=0; j < expected.urls.length; j++) {
                  if (pfsResponse.url == expected.urls[j]) {
                      urlMatch = true;
                      break;
                  }
              }
              ok(urlMatch, "Given " + mimeType + " we should see one of these urls " + expected.urls);
          }
  };
};

var makeFinalCallTest = function(mimeType, expected) {
  return function() {
    equal(expected.incCallbackCount, expected.totalCallbacks, "We should get the correct number of callbacks");
    start();
  };
};

var testKnownPluginByMimeType = function(mimeType, expected) {
  Pfs.knownPluginsByMimeType(navigatorInfo, mimeType,
                             makeIncCallTest(mimeType, expected),
                             makeFinalCallTest(mimeType, expected));
};

var flashExpected = {
    names: ["Adobe Flash Player"],
    totalCallbacks: 1,
    lastName: "",
    urls: ["http://www.adobe.com/go/getflashplayer"],
    lastUrl: "",
    incCallbackCount: 0
};

asyncTest("Demonstrates high level API for finding plugins by mime-type", function() {
    testKnownPluginByMimeType("application/x-shockwave-flash", flashExpected);
});

asyncTest("same plugin different mime-type", function() {
    flashExpected['incCallbackCount'] = 0;
    flashExpected['lastName'] = "";
    flashExpected['lastUrl'] = "";
    testKnownPluginByMimeType("application/futuresplash", flashExpected);
});

asyncTest("divx 2 mime-type2 to 2 plugins", function() {
    var expected = {
        names: ["DivX Web Player", "VLC Multimedia Plug-in"],
        totalCallbacks: 2,
        lastName: "",
        urls: ["http://www.divx.com/en/products/software/mac/divx", "http://www.videolan.org/vlc/"],
        lastUrl: "",
        incCallbackCount: 0
    };

    testKnownPluginByMimeType("video/divx", expected);
});

asyncTest("java 2 mime-type2 to 2 plugins", function() {
    var expected = {
        names: ["Java Runtime Environment", "IcedTea Java Web Browser Plugin"],
        totalCallbacks: 2,
        lastName: "",
        urls: ["http://www.java.com/en/download/manual.jsp", "http://icedtea.classpath.org/wiki/Main_Page"],
        lastUrl: "",
        incCallbackCount: 0
    };

    testKnownPluginByMimeType("application/x-java-applet", expected);
});

asyncTest("quicktime 2 mime-type2 to 2 plugins", function() {
    var expected = {
        names: ["VLC Multimedia Plug-in", "QuickTime Plug-in"],
        totalCallbacks: 2,
        lastName: "",
        urls: ["http://www.videolan.org/vlc/", "http://www.apple.com/quicktime/download/"],
        lastUrl: "",
        incCallbackCount: 0
    };

    testKnownPluginByMimeType("video/quicktime", expected);
});
