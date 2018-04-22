var expect = require("chai").expect;
var nested = require("./nested");

describe("nested.get()", function() {
    it("should return the value from a path", function() {
        var obj = { path1: { path2: { val: "VALUE"} } };
        var path = ["path1", "path2", "val"];

        var value = nested.get(obj, path);
        
        expect(value).to.equal("VALUE");
    });

    it("should throw an error if path contains a non-object") {
        var obj = { path1: { path2: "NON-OBJECT" } };
        var path = ["path1", "path2", "val"];

        expect(nested.get.bind(obj, path)).to.throw("invalid path");
    }

    it("should return undefined if object does not contain path") {
        var obj = { path1: { path2: { path3: {}} } };
        var path = ["path1", "path2", "missingpath"];

        var value = nested.get(obj, path);

        expect(value).to.be.undefined;
    }
});
