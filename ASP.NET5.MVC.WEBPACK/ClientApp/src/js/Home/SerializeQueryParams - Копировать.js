﻿import {
    stringify,
    encodeQueryParams,
    decodeQueryParams,
    NumberParam,
    StringParam,
    BooleanParam,
    DelimitedArrayParam,
    ObjectParam,
    updateLocation,
    updateInLocation
} from 'serialize-query-params';

export const serializeQueryParams = {
    setArrayParamUrl: (name, array) => {
        if (array) {
            const encodedQuery = encodeQueryParams(
                { [name]: DelimitedArrayParam },
                { [name]: array }
            );
            let newLocation = updateInLocation(encodedQuery, location);
            window.history.replaceState(newLocation.query, '', `${location.pathname}${newLocation.search}`);
        }
    },
    getArrayParamUrl: (name) => {
        const ulrParams = getUrlParam();
        const params = decodeQueryParams(
            { [name]: DelimitedArrayParam },
            { [name]: ulrParams[name] }
        );
        return params[name];
    },

    setObjParamUrl: (name, propName, value) => {
        let obj = getObjParamUrl(name);
        if (obj === null) {
            obj = {};
        }
        obj[propName] = value;

        const encodedColSearchQuery = encodeQueryParams(
            { [name]: ObjectParam },
            { [name]: obj }
        );
        let newLocation = updateInLocation(encodedColSearchQuery, location);
        window.history.replaceState(newLocation.query, '', `${location.pathname}${newLocation.search}`);
    },

    getObjParamUrl: (name, propName = null) => {
        const ulrParams = getUrlParam();
        if (ulrParams.hasOwnProperty(name) === false) { return null; }
        const params = decodeQueryParams(
            { [name]: ObjectParam },
            { [name]: ulrParams[name] }
        );
        if (propName) {
            if (params[name].hasOwnProperty(propName) === false) { return null; }
            let asd = params[name][propName];
            return asd;
        }
        let qwe = params[name];
        return qwe;
    },

    getUrlParam: () => {
        const urlParams = new URLSearchParams(location.search);
        const ulrParams = Object.fromEntries(urlParams)
        return ulrParams;
    }
}
