'use strict';

var routeMap = require('route-map');

module.exports = routeView;

function routeView(defn, args) {
    if (args.base) {
        defn = Object.keys(defn)
            .reduce(function applyBase(acc, str) {
                acc[args.base + str] = defn[str];
                return acc;
            }, {});
    }

    var match = routeMap(defn);

    var results = match(args.route);
    if (!results || results.length <= 0) {
        throw new Error('router: no match found');
    }

    
    return results.map(function(res){
        res.params.url = res.url;
        return res.fn(res.params);
    })
}
