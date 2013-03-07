module("Mime normalization");
test("MasterMime", function(){
    var mimeMaster = Pfs.createMasterMime();
    var actual = mimeMaster.normalize("application/x-java-applet;version=1.3");
    equal(actual, "application/x-java-applet");
});
