module("Pfs General Comparison");
test("parseVersion", function(){
    deepEqual(Pfs.parseVersion("QuickTime Plug-in 7.6.2"), [7, 6, 2],
           "QuickTime Plug-in 7.6.2 should give us a version chain 7 major 6 minor 2 just for the fun of it");
    deepEqual(Pfs.parseVersion("QuickTime Plug-in 7.6.2 Extra Edition"), [7, 6, 2],
           "A version may have a descriptin and a comment");
    deepEqual(Pfs.parseVersion("QuickTime Plug-in 7.6.2pre"), [7, 6, 2, "pre"],
           "pre or other codes should be part of the version component, but comments aren't");
    
    deepEqual(Pfs.parseVersion("VLC Multimedia Plugin (compatible Totem 2.26.1)"), [2, 26, 1],
           "Weird characters around the version won't break us");
});