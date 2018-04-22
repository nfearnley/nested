var nested = {};

nested.invalidTreeError = "invalid tree";
nested.invalidPathError = "invalid path";
nested.nonObjectError = "path contains non-object";

function setNested(tree, path, value) {
    if (typeof tree !== "object") {
        throw nested.invalidTreeError;
    }

    if (typeof path === "string") {
        path = path.split(".");
    }
    if (!Array.isArray(path) || path.length === 0) {
        throw nested.invalidPathError; 
    }

    if (value === undefined) {
        value = {};
    }

    var prop = path.pop();
    var leaf = path.reduce(function(leaf, p) {
        if (leaf[p] === undefined) {
            leaf[p] = {};
        }
        if (typeof leaf[p] !== "object") {
            throw nested.nonObjectError;
        }
        return leaf[p];
    }, tree);

    return leaf[prop] = value;
   
}
nested.set = setNested;

function getNested(tree, path) {
    if (typeof tree !== "object") {
        throw nested.invalidTreeError;
    }

    if (typeof path === "string") {
        path = path.split(".");
    }
    if (!Array.isArray(path) || path.legth === 0) {
        throw nested.invalidPathError; 
    }

    var value = path.reduce(function(leaf, p) {
        if (leaf === undefined) {
            return undefined;
        }
        if (typeof leaf !== "object") {
            throw nested.nonObjectError;
        }
        return leaf[p];
    }, tree);

    return value; 
}
nested.get = getNested;

module.exports = nested;

