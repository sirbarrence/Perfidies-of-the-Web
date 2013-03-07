module("listPluginInfos");
asyncTest("list plugins for a mime-type pfs2 callback", function() {
    var incCallbackCount = 0;
    var currentPlugins = Pfs.UI.browserPlugins({
        length: 1,
        "0": {
            name: "",
            description: "",
            version: "0",
            length: 1,
            "0": {
                type: "audio/x-foobar-audio"
            }
        }
    });

    Pfs.listPluginInfos(navigatorInfo, currentPlugins, function(pfsResponse){
        console.log(pfsResponse);
        incCallbackCount++;
        deepEqual(pfsResponse.name, "Foobar Media Viewer", "Given audio/x-foobar-audio we should list Foobar plugin");
        deepEqual(pfsResponse.url, "http://example.com/foobar.zip", "Given audio/x-foobar-audio we should list Foobar install url");
        deepEqual(pfsResponse.status, Pfs.CURRENT, "This plugin should seen as current");
       }, function() {
        start();
        equal(incCallbackCount, 1, "One plugin queried, only once callback expected");
      });
});

asyncTest("list multiple plugins for multiple different mime-types", function() {
    var incCallbackCount = 0;
    var sawFlash = false,
        sawFoobar = false;
    var currentPlugins = Pfs.UI.browserPlugins({ length: 1, "0": {
                        name: "", description: "", version: "0",
                        length: 3, "0": {type: "audio/x-foobar-audio"}, "1": {type: "application/x-shockwave-flash"},
                                   "2": {type: "fake/mime-type"}}});

    Pfs.listPluginInfos(navigatorInfo, currentPlugins, function(pfsResponse) {
        incCallbackCount++;
        if (pfsResponse.name == "Foobar Media Viewer") {
            sawFoobar = true;
            deepEqual(pfsResponse.url, "http://example.com/foobar.zip", "Given audio/x-foobar-audio we should list Foobar plugin url");
        } else if (pfsResponse.name == "Adobe Flash Player") {
            sawFlash = true;
            deepEqual(pfsResponse.url, "http://www.adobe.com/go/getflashplayer", "Given application/x-shockwave-flash we should list Flash plugin url");
        }
      }, function(){
        start();
        equal(incCallbackCount, 2, "One plugin queried, only once callback expected");
        equal(sawFlash, true, "We should have seen flash");
        equal(sawFoobar, true, "We should have seen Foobar");
      });
});
