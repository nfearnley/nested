var expect = require("chai").expect;
var nested = require("../nested");

describe("nested.get()", function() {
    it("should return the value from an array path", function() {
        var tree = { path1: { path2: { val: "VALUE"} } };
        var path = ["path1", "path2", "val"];

        var value = nested.get(tree, path);

        expect(value).to.equal("VALUE");
    });

    it("should return the value from a string path", function() {
        var tree = { path1: { path2: { val: "VALUE"} } };
        var path = "path1.path2.val";

        var value = nested.get(tree, path);

        expect(value).to.equal("VALUE");
    });

    it("should throw an error if tree contains a non-object", function() {
        var tree = { path1: { path2: "NON-OBJECT" } };
        var path = ["path1", "path2", "val"];

        expect(nested.get.bind(this, tree, path)).to.throw(nested.nonObjectError);
    });

    it("should return undefined if tree does not contain path", function() {
        var tree = { path1: { path2: { otherpath: {}} } };
        var path = ["path1", "path2", "path3", "val"];

        var value = nested.get(tree, path);

        expect(value).to.be.undefined;
    });
});

describe("nested.set()", function() {
    it("should set a nested value following an array path", function() {
        var tree = { path1:  {} };
        var path = ["path1", "path2", "val"];
        var value = "VALUE";

        var returnValue = nested.set(tree, path, value);

        console.log("TREE", tree);
        expect(returnValue).to.equal(value);
        expect(tree.path1.path2.val).to.equal(value);
    });

    it("should set a nested value following an string path", function() {
        var tree = { path1:  {} };
        var path = "path1.path2.val";;
        var value = "VALUE";

        var returnValue = nested.set(tree, path, value);

        expect(returnValue).to.equal(value);
        expect(tree.path1.path2.val).to.equal(value);
    });

    it("should throw an error if tree contains a non-object", function() {
        var tree = { path1: { path2: "NON-OBJECT" } };
        var path = ["path1", "path2", "val"];
        var value = "VALUE";

        expect(nested.set.bind(this, tree, path, value)).to.throw(nested.nonObjectError);
    });
});

