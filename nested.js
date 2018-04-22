var nested = {};

function setNested(tree, path, value) {
    if (typeof path === "string") {
        path = path.split(".");
    }
    var leaf = tree;
    path.forEach(function(p, i) {
        if (i === path.length - 1 && value !== undefined) {
            leaf[p] = value;;
        }
        else if (leaf[p] === undefined) {
            leaf[p] = {};
        }
        else if (typeof leaf[p] !== object) {
            throw "Invalid path";
        }
        leaf = leaf[p];
    });
   
}
nested.set = setNested;

function getNested(tree, path) {
    if (typeof path === "string") {
        path = path.split(".");
    }
    var leaf = tree;
    path.forEach(function(p, i) {
        if (i === path.length - 1 || leaf === undefined) {
            return leaf;
        }
        else if (typeof leaf[p] !== object) {
            throw "Invalid path";
        }
        leaf = leaf[p];
    });
}
nested.get = getNested;

module.exports = nested;

