$(document).ready(function(){
    // PFS2 only works on Firefox for now...
    if ($.browser.mozilla !== true) {
        return; 
    }
    Pfs.endpoint = window.location.protocol + "//" + 'pfs2.mozilla.org/';
    Pfs.UI.navInfo = Pfs.UI.browserInfo();
    var browserPlugins = Pfs.UI.browserPlugins(navigator.plugins);
    
    var incrementalCallbackFn = function (data) {        
        if (data.status == Pfs.DISABLE ||            
            data.status == Pfs.VULNERABLE ||
            data.status == Pfs.OUTDATED) {
            pfsNextImage = pfsUpdateImage;
            this.stopFindingPluginInfos();
        } 
    };
    var finishedCallbackFn = function() {
        $('#mozilla_plugin_checker_badge').attr('src', pfsNextImage);
    };
    Pfs.findPluginInfos(Pfs.UI.navInfo, browserPlugins, incrementalCallbackFn, finishedCallbackFn);
});