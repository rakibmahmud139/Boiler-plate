"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    filter() {
        const queryObj = Object.assign({}, this.query);
        const { minPrice, maxPrice } = queryObj, otherFilters = __rest(queryObj, ["minPrice", "maxPrice"]);
        if (minPrice !== undefined && maxPrice !== undefined) {
            this.modelQuery = this.modelQuery.find({
                productPrice: { $gte: minPrice, $lte: maxPrice },
            });
        }
        this.modelQuery = this.modelQuery.find(otherFilters);
        return this;
    }
}
exports.default = QueryBuilder;
