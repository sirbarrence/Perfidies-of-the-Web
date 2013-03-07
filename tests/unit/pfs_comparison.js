test("compVersionChain", function(){
    equal(Pfs.compVersionChain([7, 6, 2], [7, 6, 1]), 1, "First version chain is newer");
    equal(Pfs.compVersionChain([7, 6, 1], [7, 6, 2]), -1, "First version chain is older");
    equal(Pfs.compVersionChain([7, 6, 2], [7, 6, 2]), 0, "Same versions should be 0");
    
    equal(Pfs.compVersionChain([7, 6, 2, 'b'], [7, 6, 1, 'a']), 1, "First version chain is newer and uses char");
    
    equal(Pfs.compVersionChain([7, 6], [7, 6, 1]), -1, "First version chain is older and has fewer version components");
    equal(Pfs.compVersionChain([7, 9], [7, 6, 1]), 1, "First version chain is newer and has fewer version components");
    
    equal(Pfs.compVersionChain([1, 2], [1, 2, 0]), 0, "Extra Version Chain components that are zero should be treated as equal");
});
test("compVersion", function(){
    equal(Pfs.compVersion("QuickTime Plug-in 7.6.2", "QuickTime Plug-in 7.6.1"), 1, "Comparing a newer plugin should return a 1");
});
