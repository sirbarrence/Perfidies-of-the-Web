module("Integration for Web Badges and PFS2");
var navigatorInfo = Pfs.UI.browserInfo();

asyncTest("old plugin, badge stops on first old plugin for browser pfs2 callback", 3, function() {
    var incCallbackCount = 0,
        expectedCallbackCount = 1,
        oldPlugins = Pfs.UI.browserPlugins(
                    { length: 2,
                      "0": {
                        name: "Unknown Plugin",
                        description: "Unknown 5000",
                        length: 1,
                        "0": {
                            type: "application/photo"
                        }
                    },
                      "1":{
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

    Pfs.findPluginInfos(navigatorInfo, oldPlugins,
        function(pfsResponse) {
            if (incCallbackCount === 0) {
                deepEqual(pfsResponse.pluginInfo.raw.name, "Foobar Media Viewer", "If I'm red... This test is invalid, we didn't ask for Foobar Media first. Rewrite this test");
                // okay we know we are dealing with Foobar
                deepEqual(pfsResponse.status, Pfs.UNKNOWN, "This plugin should be seen as unknown");
            }
            incCallbackCount++;
            this.stopFindingPluginInfos();
        },
        function() {
            deepEqual(incCallbackCount, expectedCallbackCount, "We stopped at the first plugin which was outdated, right?");
            start();
        }
    );
});
