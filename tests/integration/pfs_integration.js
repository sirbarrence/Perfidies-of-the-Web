module("Integration with PFS2");
var navigatorInfo = Pfs.UI.browserInfo();

test("inspect the navigation object", function(){
    ok(window.navigator ? true : false, "We have a navigator object");
    ok(window.navigator.plugins ? true : false, "We have a plugins object");
});

asyncTest("current plugin on browser pfs2 callback", function() {
    var incCallbackCount = 0;
    var currentPlugins = Pfs.UI.browserPlugins({
        length: 1,
        "0": {
            name: "Foobar Media Viewer",
            description: "Foobar Corporation Viewer of Media version 200.9.9",
            length: 2,
            "0": {
                type: "audio/x-foobar-audio"
            },
            "1": {
                type: "video/x-foobar-video"
            }
        }
    });

    Pfs.findPluginInfos(navigatorInfo, currentPlugins, function(pfsResponse) {
        incCallbackCount++;
        deepEqual(pfsResponse.status, Pfs.CURRENT, "This plugin should be seen as current");
    }, function(){
        start();
        deepEqual(incCallbackCount, 1, "One plugin queried, only once callback expected");
    });
});

asyncTest("old plugin on browser pfs2 callback", function() {
    var incCallbackCount = 0;
    var oldPlugins = Pfs.UI.browserPlugins({
        length: 1,
        "0": {
            name: "Foobar Media Viewer",
            description: "Foobar Corporation Viewer of Media version 200.9.8",
            length: 2,
            "0": {
                type: "audio/x-foobar-audio"
            },
            "1": {
                type: "video/x-foobar-video"
            }
        }
    });

    Pfs.findPluginInfos(navigatorInfo, oldPlugins, function(pfsResponse) {
        incCallbackCount++;
        deepEqual(pfsResponse.status, Pfs.OUTDATED, "This plugin should seen as out of date");
      }, function() {
        start();
        equal(incCallbackCount, 1, "One plugin queried, only once callback expected");
      });
});
asyncTest("vulnerable plugin on browser pfs2 callback", function() {
    var incCallbackCount = 0;
    var vulnerablePlugins = Pfs.UI.browserPlugins({
        length: 1,
        "0": {
            name: "Foobar Media Viewer",
            description: "Foobar Corporation Viewer of Media version 99.9.9",
            length: 2,
            "0": {
                type: "audio/x-foobar-audio"
            },
            "1": {
                type: "video/x-foobar-video"
            }
        }
    });

    Pfs.findPluginInfos(navigatorInfo, vulnerablePlugins, function(pfsResponse) {
        incCallbackCount++;
        deepEqual(pfsResponse.status, Pfs.VULNERABLE, "This plugin should seen as vulnerable");
      }, function() {
        start();
        equal(incCallbackCount, 1, "One plugin queried, only once callback expected");
      });
});
//TODO test disabled, put a vulnerable latest into the test database
asyncTest("unknown plugin on browser pfs2 callback", function() {
    var incCallbackCount = 0;
    var unknownPlugins = Pfs.UI.browserPlugins({ length: 1, "0": {
                        name: "Unknown Plugin", description: "Unknown 5000",
                        length: 2, "0": {type: "audio/x-foobar-audio"}, "1": {type: "video/x-foobar-video"}}});

    Pfs.findPluginInfos(navigatorInfo, unknownPlugins,
        function(pfsResponse) {
            incCallbackCount++;
            deepEqual(pfsResponse.status, Pfs.UNKNOWN, "This plugin should seen as unknown");
        },
        function() {
        start();
        equal(incCallbackCount, 1, "One plugin queried, only once callback expected");
      });
});
