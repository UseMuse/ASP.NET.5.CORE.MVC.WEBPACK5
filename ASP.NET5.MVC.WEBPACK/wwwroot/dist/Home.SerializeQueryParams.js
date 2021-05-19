/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/Home/SerializeQueryParams.js":
/*!*********************************************!*\
  !*** ./src/js/Home/SerializeQueryParams.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! serialize-query-params */ "./node_modules/serialize-query-params/esm/index.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_serializeQueryParams) {
  "use strict";

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function setArrayParamUrl(name, array) {
    if (array) {
      var encodedQuery = (0, _serializeQueryParams.encodeQueryParams)(_defineProperty({}, name, _serializeQueryParams.DelimitedArrayParam), _defineProperty({}, name, array));
      var newLocation = (0, _serializeQueryParams.updateInLocation)(encodedQuery, location);
      window.history.replaceState(newLocation.query, '', "".concat(location.pathname).concat(newLocation.search));
    }
  }

  function getArrayParamUrl(name) {
    var ulrParams = getUrlParam();
    var params = (0, _serializeQueryParams.decodeQueryParams)(_defineProperty({}, name, _serializeQueryParams.DelimitedArrayParam), _defineProperty({}, name, ulrParams[name]));
    return params[name];
  }

  function setObjParamUrl(name, propName, value) {
    var obj = getObjParamUrl(name);

    if (obj === null) {
      obj = {};
    }

    obj[propName] = value;
    var encodedColSearchQuery = (0, _serializeQueryParams.encodeQueryParams)(_defineProperty({}, name, _serializeQueryParams.ObjectParam), _defineProperty({}, name, obj));
    var newLocation = (0, _serializeQueryParams.updateInLocation)(encodedColSearchQuery, location);
    window.history.replaceState(newLocation.query, '', "".concat(location.pathname).concat(newLocation.search));
  }

  function getObjParamUrl(name) {
    var propName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var ulrParams = getUrlParam();

    if (ulrParams.hasOwnProperty(name) === false) {
      return null;
    }

    var params = (0, _serializeQueryParams.decodeQueryParams)(_defineProperty({}, name, _serializeQueryParams.ObjectParam), _defineProperty({}, name, ulrParams[name]));

    if (propName) {
      if (params[name].hasOwnProperty(propName) === false) {
        return null;
      }

      var asd = params[name][propName];
      return asd;
    }

    var qwe = params[name];
    return qwe;
  }

  function getUrlParam() {
    var urlParams = new URLSearchParams(location.search);
    var ulrParams = Object.fromEntries(urlParams);
    return ulrParams;
  }

  module.exports = {
    serializeQueryParams: {
      setArrayParamUrl: setArrayParamUrl,
      getArrayParamUrl: getArrayParamUrl,
      setObjParamUrl: setObjParamUrl,
      getObjParamUrl: getObjParamUrl,
      getUrlParam: getUrlParam
    }
  };
});

/***/ }),

/***/ "./node_modules/decode-uri-component/index.js":
/*!****************************************************!*\
  !*** ./node_modules/decode-uri-component/index.js ***!
  \****************************************************/
/***/ ((module) => {

"use strict";

var token = '%[a-f0-9]{2}';
var singleMatcher = new RegExp(token, 'gi');
var multiMatcher = new RegExp('(' + token + ')+', 'gi');

function decodeComponents(components, split) {
	try {
		// Try to decode the entire string first
		return decodeURIComponent(components.join(''));
	} catch (err) {
		// Do nothing
	}

	if (components.length === 1) {
		return components;
	}

	split = split || 1;

	// Split the array in 2 parts
	var left = components.slice(0, split);
	var right = components.slice(split);

	return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
}

function decode(input) {
	try {
		return decodeURIComponent(input);
	} catch (err) {
		var tokens = input.match(singleMatcher);

		for (var i = 1; i < tokens.length; i++) {
			input = decodeComponents(tokens, i).join('');

			tokens = input.match(singleMatcher);
		}

		return input;
	}
}

function customDecodeURIComponent(input) {
	// Keep track of all the replacements and prefill the map with the `BOM`
	var replaceMap = {
		'%FE%FF': '\uFFFD\uFFFD',
		'%FF%FE': '\uFFFD\uFFFD'
	};

	var match = multiMatcher.exec(input);
	while (match) {
		try {
			// Decode as big chunks as possible
			replaceMap[match[0]] = decodeURIComponent(match[0]);
		} catch (err) {
			var result = decode(match[0]);

			if (result !== match[0]) {
				replaceMap[match[0]] = result;
			}
		}

		match = multiMatcher.exec(input);
	}

	// Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else
	replaceMap['%C2'] = '\uFFFD';

	var entries = Object.keys(replaceMap);

	for (var i = 0; i < entries.length; i++) {
		// Replace all decoded components
		var key = entries[i];
		input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
	}

	return input;
}

module.exports = function (encodedURI) {
	if (typeof encodedURI !== 'string') {
		throw new TypeError('Expected `encodedURI` to be of type `string`, got `' + typeof encodedURI + '`');
	}

	try {
		encodedURI = encodedURI.replace(/\+/g, ' ');

		// Try the built in decoder first
		return decodeURIComponent(encodedURI);
	} catch (err) {
		// Fallback to a more advanced decoder
		return customDecodeURIComponent(encodedURI);
	}
};


/***/ }),

/***/ "./node_modules/filter-obj/index.js":
/*!******************************************!*\
  !*** ./node_modules/filter-obj/index.js ***!
  \******************************************/
/***/ ((module) => {

"use strict";

module.exports = function (obj, predicate) {
	var ret = {};
	var keys = Object.keys(obj);
	var isArr = Array.isArray(predicate);

	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		var val = obj[key];

		if (isArr ? predicate.indexOf(key) !== -1 : predicate(key, val, obj)) {
			ret[key] = val;
		}
	}

	return ret;
};


/***/ }),

/***/ "./node_modules/query-string/index.js":
/*!********************************************!*\
  !*** ./node_modules/query-string/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

const strictUriEncode = __webpack_require__(/*! strict-uri-encode */ "./node_modules/strict-uri-encode/index.js");
const decodeComponent = __webpack_require__(/*! decode-uri-component */ "./node_modules/decode-uri-component/index.js");
const splitOnFirst = __webpack_require__(/*! split-on-first */ "./node_modules/split-on-first/index.js");
const filterObject = __webpack_require__(/*! filter-obj */ "./node_modules/filter-obj/index.js");

const isNullOrUndefined = value => value === null || value === undefined;

function encoderForArrayFormat(options) {
	switch (options.arrayFormat) {
		case 'index':
			return key => (result, value) => {
				const index = result.length;

				if (
					value === undefined ||
					(options.skipNull && value === null) ||
					(options.skipEmptyString && value === '')
				) {
					return result;
				}

				if (value === null) {
					return [...result, [encode(key, options), '[', index, ']'].join('')];
				}

				return [
					...result,
					[encode(key, options), '[', encode(index, options), ']=', encode(value, options)].join('')
				];
			};

		case 'bracket':
			return key => (result, value) => {
				if (
					value === undefined ||
					(options.skipNull && value === null) ||
					(options.skipEmptyString && value === '')
				) {
					return result;
				}

				if (value === null) {
					return [...result, [encode(key, options), '[]'].join('')];
				}

				return [...result, [encode(key, options), '[]=', encode(value, options)].join('')];
			};

		case 'comma':
		case 'separator':
		case 'bracket-separator': {
			const keyValueSep = options.arrayFormat === 'bracket-separator' ?
				'[]=' :
				'=';

			return key => (result, value) => {
				if (
					value === undefined ||
					(options.skipNull && value === null) ||
					(options.skipEmptyString && value === '')
				) {
					return result;
				}

				// Translate null to an empty string so that it doesn't serialize as 'null'
				value = value === null ? '' : value;

				if (result.length === 0) {
					return [[encode(key, options), keyValueSep, encode(value, options)].join('')];
				}

				return [[result, encode(value, options)].join(options.arrayFormatSeparator)];
			};
		}

		default:
			return key => (result, value) => {
				if (
					value === undefined ||
					(options.skipNull && value === null) ||
					(options.skipEmptyString && value === '')
				) {
					return result;
				}

				if (value === null) {
					return [...result, encode(key, options)];
				}

				return [...result, [encode(key, options), '=', encode(value, options)].join('')];
			};
	}
}

function parserForArrayFormat(options) {
	let result;

	switch (options.arrayFormat) {
		case 'index':
			return (key, value, accumulator) => {
				result = /\[(\d*)\]$/.exec(key);

				key = key.replace(/\[\d*\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = {};
				}

				accumulator[key][result[1]] = value;
			};

		case 'bracket':
			return (key, value, accumulator) => {
				result = /(\[\])$/.exec(key);
				key = key.replace(/\[\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = [value];
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};

		case 'comma':
		case 'separator':
			return (key, value, accumulator) => {
				const isArray = typeof value === 'string' && value.includes(options.arrayFormatSeparator);
				const isEncodedArray = (typeof value === 'string' && !isArray && decode(value, options).includes(options.arrayFormatSeparator));
				value = isEncodedArray ? decode(value, options) : value;
				const newValue = isArray || isEncodedArray ? value.split(options.arrayFormatSeparator).map(item => decode(item, options)) : value === null ? value : decode(value, options);
				accumulator[key] = newValue;
			};

		case 'bracket-separator':
			return (key, value, accumulator) => {
				const isArray = /(\[\])$/.test(key);
				key = key.replace(/\[\]$/, '');

				if (!isArray) {
					accumulator[key] = value ? decode(value, options) : value;
					return;
				}

				const arrayValue = value === null ?
					[] :
					value.split(options.arrayFormatSeparator).map(item => decode(item, options));

				if (accumulator[key] === undefined) {
					accumulator[key] = arrayValue;
					return;
				}

				accumulator[key] = [].concat(accumulator[key], arrayValue);
			};

		default:
			return (key, value, accumulator) => {
				if (accumulator[key] === undefined) {
					accumulator[key] = value;
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};
	}
}

function validateArrayFormatSeparator(value) {
	if (typeof value !== 'string' || value.length !== 1) {
		throw new TypeError('arrayFormatSeparator must be single character string');
	}
}

function encode(value, options) {
	if (options.encode) {
		return options.strict ? strictUriEncode(value) : encodeURIComponent(value);
	}

	return value;
}

function decode(value, options) {
	if (options.decode) {
		return decodeComponent(value);
	}

	return value;
}

function keysSorter(input) {
	if (Array.isArray(input)) {
		return input.sort();
	}

	if (typeof input === 'object') {
		return keysSorter(Object.keys(input))
			.sort((a, b) => Number(a) - Number(b))
			.map(key => input[key]);
	}

	return input;
}

function removeHash(input) {
	const hashStart = input.indexOf('#');
	if (hashStart !== -1) {
		input = input.slice(0, hashStart);
	}

	return input;
}

function getHash(url) {
	let hash = '';
	const hashStart = url.indexOf('#');
	if (hashStart !== -1) {
		hash = url.slice(hashStart);
	}

	return hash;
}

function extract(input) {
	input = removeHash(input);
	const queryStart = input.indexOf('?');
	if (queryStart === -1) {
		return '';
	}

	return input.slice(queryStart + 1);
}

function parseValue(value, options) {
	if (options.parseNumbers && !Number.isNaN(Number(value)) && (typeof value === 'string' && value.trim() !== '')) {
		value = Number(value);
	} else if (options.parseBooleans && value !== null && (value.toLowerCase() === 'true' || value.toLowerCase() === 'false')) {
		value = value.toLowerCase() === 'true';
	}

	return value;
}

function parse(query, options) {
	options = Object.assign({
		decode: true,
		sort: true,
		arrayFormat: 'none',
		arrayFormatSeparator: ',',
		parseNumbers: false,
		parseBooleans: false
	}, options);

	validateArrayFormatSeparator(options.arrayFormatSeparator);

	const formatter = parserForArrayFormat(options);

	// Create an object with no prototype
	const ret = Object.create(null);

	if (typeof query !== 'string') {
		return ret;
	}

	query = query.trim().replace(/^[?#&]/, '');

	if (!query) {
		return ret;
	}

	for (const param of query.split('&')) {
		if (param === '') {
			continue;
		}

		let [key, value] = splitOnFirst(options.decode ? param.replace(/\+/g, ' ') : param, '=');

		// Missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		value = value === undefined ? null : ['comma', 'separator', 'bracket-separator'].includes(options.arrayFormat) ? value : decode(value, options);
		formatter(decode(key, options), value, ret);
	}

	for (const key of Object.keys(ret)) {
		const value = ret[key];
		if (typeof value === 'object' && value !== null) {
			for (const k of Object.keys(value)) {
				value[k] = parseValue(value[k], options);
			}
		} else {
			ret[key] = parseValue(value, options);
		}
	}

	if (options.sort === false) {
		return ret;
	}

	return (options.sort === true ? Object.keys(ret).sort() : Object.keys(ret).sort(options.sort)).reduce((result, key) => {
		const value = ret[key];
		if (Boolean(value) && typeof value === 'object' && !Array.isArray(value)) {
			// Sort object keys, not values
			result[key] = keysSorter(value);
		} else {
			result[key] = value;
		}

		return result;
	}, Object.create(null));
}

exports.extract = extract;
exports.parse = parse;

exports.stringify = (object, options) => {
	if (!object) {
		return '';
	}

	options = Object.assign({
		encode: true,
		strict: true,
		arrayFormat: 'none',
		arrayFormatSeparator: ','
	}, options);

	validateArrayFormatSeparator(options.arrayFormatSeparator);

	const shouldFilter = key => (
		(options.skipNull && isNullOrUndefined(object[key])) ||
		(options.skipEmptyString && object[key] === '')
	);

	const formatter = encoderForArrayFormat(options);

	const objectCopy = {};

	for (const key of Object.keys(object)) {
		if (!shouldFilter(key)) {
			objectCopy[key] = object[key];
		}
	}

	const keys = Object.keys(objectCopy);

	if (options.sort !== false) {
		keys.sort(options.sort);
	}

	return keys.map(key => {
		const value = object[key];

		if (value === undefined) {
			return '';
		}

		if (value === null) {
			return encode(key, options);
		}

		if (Array.isArray(value)) {
			if (value.length === 0 && options.arrayFormat === 'bracket-separator') {
				return encode(key, options) + '[]';
			}

			return value
				.reduce(formatter(key), [])
				.join('&');
		}

		return encode(key, options) + '=' + encode(value, options);
	}).filter(x => x.length > 0).join('&');
};

exports.parseUrl = (url, options) => {
	options = Object.assign({
		decode: true
	}, options);

	const [url_, hash] = splitOnFirst(url, '#');

	return Object.assign(
		{
			url: url_.split('?')[0] || '',
			query: parse(extract(url), options)
		},
		options && options.parseFragmentIdentifier && hash ? {fragmentIdentifier: decode(hash, options)} : {}
	);
};

exports.stringifyUrl = (object, options) => {
	options = Object.assign({
		encode: true,
		strict: true
	}, options);

	const url = removeHash(object.url).split('?')[0] || '';
	const queryFromUrl = exports.extract(object.url);
	const parsedQueryFromUrl = exports.parse(queryFromUrl, {sort: false});

	const query = Object.assign(parsedQueryFromUrl, object.query);
	let queryString = exports.stringify(query, options);
	if (queryString) {
		queryString = `?${queryString}`;
	}

	let hash = getHash(object.url);
	if (object.fragmentIdentifier) {
		hash = `#${encode(object.fragmentIdentifier, options)}`;
	}

	return `${url}${queryString}${hash}`;
};

exports.pick = (input, filter, options) => {
	options = Object.assign({
		parseFragmentIdentifier: true
	}, options);

	const {url, query, fragmentIdentifier} = exports.parseUrl(input, options);
	return exports.stringifyUrl({
		url,
		query: filterObject(query, filter),
		fragmentIdentifier
	}, options);
};

exports.exclude = (input, filter, options) => {
	const exclusionFilter = Array.isArray(filter) ? key => !filter.includes(key) : (key, value) => !filter(key, value);

	return exports.pick(input, exclusionFilter, options);
};


/***/ }),

/***/ "./node_modules/query-string/package.json":
/*!************************************************!*\
  !*** ./node_modules/query-string/package.json ***!
  \************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"_args":[["query-string@7.0.0","D:\\\\repos\\\\ASP.NET5.MVC.WEBPACK\\\\ASP.NET5.MVC.WEBPACK\\\\ClientApp"]],"_from":"query-string@7.0.0","_id":"query-string@7.0.0","_inBundle":false,"_integrity":"sha512-Iy7moLybliR5ZgrK/1R3vjrXq03S13Vz4Rbm5Jg3EFq1LUmQppto0qtXz4vqZ386MSRjZgnTSZ9QC+NZOSd/XA==","_location":"/query-string","_phantomChildren":{},"_requested":{"type":"version","registry":true,"raw":"query-string@7.0.0","name":"query-string","escapedName":"query-string","rawSpec":"7.0.0","saveSpec":null,"fetchSpec":"7.0.0"},"_requiredBy":["/"],"_resolved":"https://registry.npmjs.org/query-string/-/query-string-7.0.0.tgz","_spec":"7.0.0","_where":"D:\\\\repos\\\\ASP.NET5.MVC.WEBPACK\\\\ASP.NET5.MVC.WEBPACK\\\\ClientApp","author":{"name":"Sindre Sorhus","email":"sindresorhus@gmail.com","url":"https://sindresorhus.com"},"bugs":{"url":"https://github.com/sindresorhus/query-string/issues"},"dependencies":{"decode-uri-component":"^0.2.0","filter-obj":"^1.1.0","split-on-first":"^1.0.0","strict-uri-encode":"^2.0.0"},"description":"Parse and stringify URL query strings","devDependencies":{"ava":"^1.4.1","benchmark":"^2.1.4","deep-equal":"^1.0.1","fast-check":"^1.5.0","tsd":"^0.7.3","xo":"^0.24.0"},"engines":{"node":">=6"},"files":["index.js","index.d.ts"],"funding":"https://github.com/sponsors/sindresorhus","homepage":"https://github.com/sindresorhus/query-string#readme","keywords":["browser","querystring","query","string","qs","param","parameter","url","parse","stringify","encode","decode","searchparams","filter"],"license":"MIT","name":"query-string","repository":{"type":"git","url":"git+https://github.com/sindresorhus/query-string.git"},"scripts":{"benchmark":"node benchmark.js","test":"xo && ava && tsd"},"version":"7.0.0"}');

/***/ }),

/***/ "./node_modules/serialize-query-params/esm/decodeQueryParams.js":
/*!**********************************************************************!*\
  !*** ./node_modules/serialize-query-params/esm/decodeQueryParams.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "decodeQueryParams": () => (/* binding */ decodeQueryParams)
/* harmony export */ });
/**
 * Convert the values in query to strings via the encode functions configured
 * in paramConfigMap
 *
 * @param paramConfigMap Map from query name to { encode, decode } config
 * @param query Query updates mapping param name to decoded value
 */
function decodeQueryParams(paramConfigMap, encodedQuery) {
    var decodedQuery = {};
    // iterate over all keys in the config (#30)
    var paramNames = Object.keys(paramConfigMap);
    // ensure any non configured keys that are in the URL are also included
    for (var _i = 0, _a = Object.keys(encodedQuery); _i < _a.length; _i++) {
        var encodedKey = _a[_i];
        if (paramConfigMap[encodedKey] == null) {
            paramNames.push(encodedKey);
        }
    }
    for (var _b = 0, paramNames_1 = paramNames; _b < paramNames_1.length; _b++) {
        var paramName = paramNames_1[_b];
        var encodedValue = encodedQuery[paramName];
        if (!paramConfigMap[paramName]) {
            if (true) {
                console.warn("Passing through parameter " + paramName + " during decoding since it was not configured.");
            }
            // NOTE: we could just not include it, but it is probably convenient to have
            // it default to be a string type.
            decodedQuery[paramName] = encodedValue;
        }
        else {
            decodedQuery[paramName] = paramConfigMap[paramName].decode(encodedValue);
        }
    }
    return decodedQuery;
}


/***/ }),

/***/ "./node_modules/serialize-query-params/esm/encodeQueryParams.js":
/*!**********************************************************************!*\
  !*** ./node_modules/serialize-query-params/esm/encodeQueryParams.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "encodeQueryParams": () => (/* binding */ encodeQueryParams),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Convert the values in query to strings via the encode functions configured
 * in paramConfigMap
 *
 * @param paramConfigMap Map from query name to { encode, decode } config
 * @param query Query updates mapping param name to decoded value
 */
function encodeQueryParams(paramConfigMap, query) {
    var encodedQuery = {};
    var paramNames = Object.keys(query);
    for (var _i = 0, paramNames_1 = paramNames; _i < paramNames_1.length; _i++) {
        var paramName = paramNames_1[_i];
        var decodedValue = query[paramName];
        if (!paramConfigMap[paramName]) {
            if (true) {
                console.warn("Encoding parameter " + paramName + " as string since it was not configured.");
            }
            // NOTE: we could just not encode it, but it is probably convenient to have
            // it be included by default as a string type.
            encodedQuery[paramName] =
                decodedValue == null ? decodedValue : String(decodedValue);
        }
        else {
            encodedQuery[paramName] = paramConfigMap[paramName].encode(query[paramName]);
        }
    }
    return encodedQuery;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (encodeQueryParams);


/***/ }),

/***/ "./node_modules/serialize-query-params/esm/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/serialize-query-params/esm/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "withDefault": () => (/* reexport safe */ _withDefault__WEBPACK_IMPORTED_MODULE_0__.withDefault),
/* harmony export */   "encodeDate": () => (/* reexport safe */ _serialize__WEBPACK_IMPORTED_MODULE_1__.encodeDate),
/* harmony export */   "decodeDate": () => (/* reexport safe */ _serialize__WEBPACK_IMPORTED_MODULE_1__.decodeDate),
/* harmony export */   "encodeBoolean": () => (/* reexport safe */ _serialize__WEBPACK_IMPORTED_MODULE_1__.encodeBoolean),
/* harmony export */   "decodeBoolean": () => (/* reexport safe */ _serialize__WEBPACK_IMPORTED_MODULE_1__.decodeBoolean),
/* harmony export */   "encodeNumber": () => (/* reexport safe */ _serialize__WEBPACK_IMPORTED_MODULE_1__.encodeNumber),
/* harmony export */   "decodeNumber": () => (/* reexport safe */ _serialize__WEBPACK_IMPORTED_MODULE_1__.decodeNumber),
/* harmony export */   "encodeString": () => (/* reexport safe */ _serialize__WEBPACK_IMPORTED_MODULE_1__.encodeString),
/* harmony export */   "decodeString": () => (/* reexport safe */ _serialize__WEBPACK_IMPORTED_MODULE_1__.decodeString),
/* harmony export */   "decodeEnum": () => (/* reexport safe */ _serialize__WEBPACK_IMPORTED_MODULE_1__.decodeEnum),
/* harmony export */   "encodeJson": () => (/* reexport safe */ _serialize__WEBPACK_IMPORTED_MODULE_1__.encodeJson),
/* harmony export */   "decodeJson": () => (/* reexport safe */ _serialize__WEBPACK_IMPORTED_MODULE_1__.decodeJson),
/* harmony export */   "encodeArray": () => (/* reexport safe */ _serialize__WEBPACK_IMPORTED_MODULE_1__.encodeArray),
/* harmony export */   "decodeArray": () => (/* reexport safe */ _serialize__WEBPACK_IMPORTED_MODULE_1__.decodeArray),
/* harmony export */   "encodeNumericArray": () => (/* reexport safe */ _serialize__WEBPACK_IMPORTED_MODULE_1__.encodeNumericArray),
/* harmony export */   "decodeNumericArray": () => (/* reexport safe */ _serialize__WEBPACK_IMPORTED_MODULE_1__.decodeNumericArray),
/* harmony export */   "encodeDelimitedArray": () => (/* reexport safe */ _serialize__WEBPACK_IMPORTED_MODULE_1__.encodeDelimitedArray),
/* harmony export */   "decodeDelimitedArray": () => (/* reexport safe */ _serialize__WEBPACK_IMPORTED_MODULE_1__.decodeDelimitedArray),
/* harmony export */   "encodeDelimitedNumericArray": () => (/* reexport safe */ _serialize__WEBPACK_IMPORTED_MODULE_1__.encodeDelimitedNumericArray),
/* harmony export */   "decodeDelimitedNumericArray": () => (/* reexport safe */ _serialize__WEBPACK_IMPORTED_MODULE_1__.decodeDelimitedNumericArray),
/* harmony export */   "encodeObject": () => (/* reexport safe */ _serialize__WEBPACK_IMPORTED_MODULE_1__.encodeObject),
/* harmony export */   "decodeObject": () => (/* reexport safe */ _serialize__WEBPACK_IMPORTED_MODULE_1__.decodeObject),
/* harmony export */   "encodeNumericObject": () => (/* reexport safe */ _serialize__WEBPACK_IMPORTED_MODULE_1__.encodeNumericObject),
/* harmony export */   "decodeNumericObject": () => (/* reexport safe */ _serialize__WEBPACK_IMPORTED_MODULE_1__.decodeNumericObject),
/* harmony export */   "StringParam": () => (/* reexport safe */ _params__WEBPACK_IMPORTED_MODULE_2__.StringParam),
/* harmony export */   "NumberParam": () => (/* reexport safe */ _params__WEBPACK_IMPORTED_MODULE_2__.NumberParam),
/* harmony export */   "ObjectParam": () => (/* reexport safe */ _params__WEBPACK_IMPORTED_MODULE_2__.ObjectParam),
/* harmony export */   "ArrayParam": () => (/* reexport safe */ _params__WEBPACK_IMPORTED_MODULE_2__.ArrayParam),
/* harmony export */   "NumericArrayParam": () => (/* reexport safe */ _params__WEBPACK_IMPORTED_MODULE_2__.NumericArrayParam),
/* harmony export */   "JsonParam": () => (/* reexport safe */ _params__WEBPACK_IMPORTED_MODULE_2__.JsonParam),
/* harmony export */   "DateParam": () => (/* reexport safe */ _params__WEBPACK_IMPORTED_MODULE_2__.DateParam),
/* harmony export */   "DateTimeParam": () => (/* reexport safe */ _params__WEBPACK_IMPORTED_MODULE_2__.DateTimeParam),
/* harmony export */   "BooleanParam": () => (/* reexport safe */ _params__WEBPACK_IMPORTED_MODULE_2__.BooleanParam),
/* harmony export */   "NumericObjectParam": () => (/* reexport safe */ _params__WEBPACK_IMPORTED_MODULE_2__.NumericObjectParam),
/* harmony export */   "DelimitedArrayParam": () => (/* reexport safe */ _params__WEBPACK_IMPORTED_MODULE_2__.DelimitedArrayParam),
/* harmony export */   "DelimitedNumericArrayParam": () => (/* reexport safe */ _params__WEBPACK_IMPORTED_MODULE_2__.DelimitedNumericArrayParam),
/* harmony export */   "createEnumParam": () => (/* reexport safe */ _params__WEBPACK_IMPORTED_MODULE_2__.createEnumParam),
/* harmony export */   "updateLocation": () => (/* reexport safe */ _updateLocation__WEBPACK_IMPORTED_MODULE_3__.updateLocation),
/* harmony export */   "updateInLocation": () => (/* reexport safe */ _updateLocation__WEBPACK_IMPORTED_MODULE_3__.updateInLocation),
/* harmony export */   "transformSearchStringJsonSafe": () => (/* reexport safe */ _updateLocation__WEBPACK_IMPORTED_MODULE_3__.transformSearchStringJsonSafe),
/* harmony export */   "encodeQueryParams": () => (/* reexport safe */ _encodeQueryParams__WEBPACK_IMPORTED_MODULE_4__.encodeQueryParams),
/* harmony export */   "decodeQueryParams": () => (/* reexport safe */ _decodeQueryParams__WEBPACK_IMPORTED_MODULE_5__.decodeQueryParams)
/* harmony export */ });
/* harmony import */ var _withDefault__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./withDefault */ "./node_modules/serialize-query-params/esm/withDefault.js");
/* harmony import */ var _serialize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./serialize */ "./node_modules/serialize-query-params/esm/serialize.js");
/* harmony import */ var _params__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./params */ "./node_modules/serialize-query-params/esm/params.js");
/* harmony import */ var _updateLocation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./updateLocation */ "./node_modules/serialize-query-params/esm/updateLocation.js");
/* harmony import */ var _encodeQueryParams__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./encodeQueryParams */ "./node_modules/serialize-query-params/esm/encodeQueryParams.js");
/* harmony import */ var _decodeQueryParams__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./decodeQueryParams */ "./node_modules/serialize-query-params/esm/decodeQueryParams.js");






if (true) {
    /*
     * run checks to ensure a valid version of query-string is installed
     * see https://github.com/pbeshai/use-query-params/issues/127 for discussion
     */
    var queryStringVersion = __webpack_require__(/*! query-string/package.json */ "./node_modules/query-string/package.json").version;
    // simple check of versions since we don't anticipate any new minor v5s and
    // don't want to require the semver package as a dependency for just a simple
    // dev check.
    var validQueryStringInstalled = /^5.1.[1-9][0-9]*/.test(queryStringVersion) ||
        /^6\./.test(queryStringVersion) || /^7\./.test(queryStringVersion);
    if (!validQueryStringInstalled) {
        throw new Error("serialize-query-params requires query-string ^5.1.1 || ^6, " +
            ("but " + queryStringVersion + " is installed. Note: you may also ") +
            "see this message if you're using use-query-params.");
    }
}


/***/ }),

/***/ "./node_modules/serialize-query-params/esm/params.js":
/*!***********************************************************!*\
  !*** ./node_modules/serialize-query-params/esm/params.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StringParam": () => (/* binding */ StringParam),
/* harmony export */   "createEnumParam": () => (/* binding */ createEnumParam),
/* harmony export */   "NumberParam": () => (/* binding */ NumberParam),
/* harmony export */   "ObjectParam": () => (/* binding */ ObjectParam),
/* harmony export */   "ArrayParam": () => (/* binding */ ArrayParam),
/* harmony export */   "NumericArrayParam": () => (/* binding */ NumericArrayParam),
/* harmony export */   "JsonParam": () => (/* binding */ JsonParam),
/* harmony export */   "DateParam": () => (/* binding */ DateParam),
/* harmony export */   "DateTimeParam": () => (/* binding */ DateTimeParam),
/* harmony export */   "BooleanParam": () => (/* binding */ BooleanParam),
/* harmony export */   "NumericObjectParam": () => (/* binding */ NumericObjectParam),
/* harmony export */   "DelimitedArrayParam": () => (/* binding */ DelimitedArrayParam),
/* harmony export */   "DelimitedNumericArrayParam": () => (/* binding */ DelimitedNumericArrayParam)
/* harmony export */ });
/* harmony import */ var _serialize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./serialize */ "./node_modules/serialize-query-params/esm/serialize.js");

/**
 * String values
 */
var StringParam = {
    encode: _serialize__WEBPACK_IMPORTED_MODULE_0__.encodeString,
    decode: _serialize__WEBPACK_IMPORTED_MODULE_0__.decodeString,
};
/**
 * String enum
 */
var createEnumParam = function (enumValues) { return ({
    encode: _serialize__WEBPACK_IMPORTED_MODULE_0__.encodeString,
    decode: function (input) { return _serialize__WEBPACK_IMPORTED_MODULE_0__.decodeEnum(input, enumValues); },
}); };
/**
 * Numbers (integers or floats)
 */
var NumberParam = {
    encode: _serialize__WEBPACK_IMPORTED_MODULE_0__.encodeNumber,
    decode: _serialize__WEBPACK_IMPORTED_MODULE_0__.decodeNumber,
};
/**
 * For flat objects where values are strings
 */
var ObjectParam = {
    encode: _serialize__WEBPACK_IMPORTED_MODULE_0__.encodeObject,
    decode: _serialize__WEBPACK_IMPORTED_MODULE_0__.decodeObject,
};
/**
 * For flat arrays of strings, filters out undefined values during decode
 */
var ArrayParam = {
    encode: _serialize__WEBPACK_IMPORTED_MODULE_0__.encodeArray,
    decode: _serialize__WEBPACK_IMPORTED_MODULE_0__.decodeArray,
};
/**
 * For flat arrays of strings, filters out undefined values during decode
 */
var NumericArrayParam = {
    encode: _serialize__WEBPACK_IMPORTED_MODULE_0__.encodeNumericArray,
    decode: _serialize__WEBPACK_IMPORTED_MODULE_0__.decodeNumericArray,
};
/**
 * For any type of data, encoded via JSON.stringify
 */
var JsonParam = {
    encode: _serialize__WEBPACK_IMPORTED_MODULE_0__.encodeJson,
    decode: _serialize__WEBPACK_IMPORTED_MODULE_0__.decodeJson,
};
/**
 * For simple dates (YYYY-MM-DD)
 */
var DateParam = {
    encode: _serialize__WEBPACK_IMPORTED_MODULE_0__.encodeDate,
    decode: _serialize__WEBPACK_IMPORTED_MODULE_0__.decodeDate,
    equals: function (valueA, valueB) {
        if (valueA === valueB)
            return true;
        if (valueA == null || valueB == null)
            return valueA === valueB;
        // ignore time of day
        return (valueA.getFullYear() === valueB.getFullYear() &&
            valueA.getMonth() === valueB.getMonth() &&
            valueA.getDate() === valueB.getDate());
    },
};
/**
 * For dates in simplified extended ISO format (YYYY-MM-DDTHH:mm:ss.sssZ or ±YYYYYY-MM-DDTHH:mm:ss.sssZ)
 */
var DateTimeParam = {
    encode: _serialize__WEBPACK_IMPORTED_MODULE_0__.encodeDateTime,
    decode: _serialize__WEBPACK_IMPORTED_MODULE_0__.decodeDateTime,
    equals: function (valueA, valueB) {
        if (valueA === valueB)
            return true;
        if (valueA == null || valueB == null)
            return valueA === valueB;
        return valueA.valueOf() === valueB.valueOf();
    },
};
/**
 * For boolean values: 1 = true, 0 = false
 */
var BooleanParam = {
    encode: _serialize__WEBPACK_IMPORTED_MODULE_0__.encodeBoolean,
    decode: _serialize__WEBPACK_IMPORTED_MODULE_0__.decodeBoolean,
};
/**
 * For flat objects where the values are numbers
 */
var NumericObjectParam = {
    encode: _serialize__WEBPACK_IMPORTED_MODULE_0__.encodeNumericObject,
    decode: _serialize__WEBPACK_IMPORTED_MODULE_0__.decodeNumericObject,
};
/**
 * For flat arrays of strings, filters out undefined values during decode
 */
var DelimitedArrayParam = {
    encode: _serialize__WEBPACK_IMPORTED_MODULE_0__.encodeDelimitedArray,
    decode: _serialize__WEBPACK_IMPORTED_MODULE_0__.decodeDelimitedArray,
};
/**
 * For flat arrays where the values are numbers, filters out undefined values during decode
 */
var DelimitedNumericArrayParam = {
    encode: _serialize__WEBPACK_IMPORTED_MODULE_0__.encodeDelimitedNumericArray,
    decode: _serialize__WEBPACK_IMPORTED_MODULE_0__.decodeDelimitedNumericArray,
};


/***/ }),

/***/ "./node_modules/serialize-query-params/esm/serialize.js":
/*!**************************************************************!*\
  !*** ./node_modules/serialize-query-params/esm/serialize.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "encodeDate": () => (/* binding */ encodeDate),
/* harmony export */   "decodeDate": () => (/* binding */ decodeDate),
/* harmony export */   "encodeDateTime": () => (/* binding */ encodeDateTime),
/* harmony export */   "decodeDateTime": () => (/* binding */ decodeDateTime),
/* harmony export */   "encodeBoolean": () => (/* binding */ encodeBoolean),
/* harmony export */   "decodeBoolean": () => (/* binding */ decodeBoolean),
/* harmony export */   "encodeNumber": () => (/* binding */ encodeNumber),
/* harmony export */   "decodeNumber": () => (/* binding */ decodeNumber),
/* harmony export */   "encodeString": () => (/* binding */ encodeString),
/* harmony export */   "decodeString": () => (/* binding */ decodeString),
/* harmony export */   "decodeEnum": () => (/* binding */ decodeEnum),
/* harmony export */   "encodeJson": () => (/* binding */ encodeJson),
/* harmony export */   "decodeJson": () => (/* binding */ decodeJson),
/* harmony export */   "encodeArray": () => (/* binding */ encodeArray),
/* harmony export */   "decodeArray": () => (/* binding */ decodeArray),
/* harmony export */   "encodeNumericArray": () => (/* binding */ encodeNumericArray),
/* harmony export */   "decodeNumericArray": () => (/* binding */ decodeNumericArray),
/* harmony export */   "encodeDelimitedArray": () => (/* binding */ encodeDelimitedArray),
/* harmony export */   "decodeDelimitedArray": () => (/* binding */ decodeDelimitedArray),
/* harmony export */   "encodeDelimitedNumericArray": () => (/* binding */ encodeDelimitedNumericArray),
/* harmony export */   "decodeDelimitedNumericArray": () => (/* binding */ decodeDelimitedNumericArray),
/* harmony export */   "encodeObject": () => (/* binding */ encodeObject),
/* harmony export */   "decodeObject": () => (/* binding */ decodeObject),
/* harmony export */   "encodeNumericObject": () => (/* binding */ encodeNumericObject),
/* harmony export */   "decodeNumericObject": () => (/* binding */ decodeNumericObject)
/* harmony export */ });
var __spreadArrays = (undefined && undefined.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
/**
 * Interprets an encoded string and returns either the string or null/undefined if not available.
 * Ignores array inputs (takes just first element in array)
 * @param input encoded string
 */
function getEncodedValue(input, allowEmptyString) {
    if (input == null) {
        return input;
    }
    // '' or []
    if (input.length === 0 &&
        (!allowEmptyString || (allowEmptyString && input !== ''))) {
        return null;
    }
    var str = input instanceof Array ? input[0] : input;
    if (str == null) {
        return str;
    }
    if (!allowEmptyString && str === '') {
        return null;
    }
    return str;
}
/**
 * Interprets an encoded string and return null/undefined or an array with
 * the encoded string contents
 * @param input encoded string
 */
function getEncodedValueArray(input) {
    if (input == null) {
        return input;
    }
    return input instanceof Array ? input : input === '' ? [] : [input];
}
/**
 * Encodes a date as a string in YYYY-MM-DD format.
 *
 * @param {Date} date
 * @return {String} the encoded date
 */
function encodeDate(date) {
    if (date == null) {
        return date;
    }
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return year + "-" + (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day);
}
/**
 * Converts a date in the format 'YYYY-mm-dd...' into a proper date, because
 * new Date() does not do that correctly. The date can be as complete or incomplete
 * as necessary (aka, '2015', '2015-10', '2015-10-01').
 * It will not work for dates that have times included in them.
 *
 * If an array is provided, only the first entry is used.
 *
 * @param  {String} input String date form like '2015-10-01'
 * @return {Date} parsed date
 */
function decodeDate(input) {
    var dateString = getEncodedValue(input);
    if (dateString == null)
        return dateString;
    var parts = dateString.split('-');
    // may only be a year so won't even have a month
    if (parts[1] != null) {
        parts[1] -= 1; // Note: months are 0-based
    }
    else {
        // just a year, set the month and day to the first
        parts[1] = 0;
        parts[2] = 1;
    }
    var decoded = new (Date.bind.apply(Date, __spreadArrays([void 0], parts)))();
    if (isNaN(decoded.getTime())) {
        return null;
    }
    return decoded;
}
/**
 * Encodes a date as a string in ISO 8601 ("2019-05-28T10:58:40Z") format.
 *
 * @param {Date} date
 * @return {String} the encoded date
 */
function encodeDateTime(date) {
    if (date == null) {
        return date;
    }
    return date.toISOString();
}
/**
 * Converts a date in the https://en.wikipedia.org/wiki/ISO_8601 format.
 * For allowed inputs see specs:
 *  - https://tools.ietf.org/html/rfc2822#page-14
 *  - http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15
 *
 * If an array is provided, only the first entry is used.
 *
 * @param  {String} input String date form like '1995-12-17T03:24:00'
 * @return {Date} parsed date
 */
function decodeDateTime(input) {
    var dateString = getEncodedValue(input);
    if (dateString == null)
        return dateString;
    var decoded = new Date(dateString);
    if (isNaN(decoded.getTime())) {
        return null;
    }
    return decoded;
}
/**
 * Encodes a boolean as a string. true -> "1", false -> "0".
 *
 * @param {Boolean} bool
 * @return {String} the encoded boolean
 */
function encodeBoolean(bool) {
    if (bool == null) {
        return bool;
    }
    return bool ? '1' : '0';
}
/**
 * Decodes a boolean from a string. "1" -> true, "0" -> false.
 * Everything else maps to undefined.
 *
 * If an array is provided, only the first entry is used.
 *
 * @param {String} input the encoded boolean string
 * @return {Boolean} the boolean value
 */
function decodeBoolean(input) {
    var boolStr = getEncodedValue(input);
    if (boolStr == null)
        return boolStr;
    if (boolStr === '1') {
        return true;
    }
    else if (boolStr === '0') {
        return false;
    }
    return null;
}
/**
 * Encodes a number as a string.
 *
 * @param {Number} num
 * @return {String} the encoded number
 */
function encodeNumber(num) {
    if (num == null) {
        return num;
    }
    return String(num);
}
/**
 * Decodes a number from a string. If the number is invalid,
 * it returns undefined.
 *
 * If an array is provided, only the first entry is used.
 *
 * @param {String} input the encoded number string
 * @return {Number} the number value
 */
function decodeNumber(input) {
    var numStr = getEncodedValue(input);
    if (numStr == null)
        return numStr;
    if (numStr === '')
        return null;
    var result = +numStr;
    return result;
}
/**
 * Encodes a string while safely handling null and undefined values.
 *
 * @param {String} str a string to encode
 * @return {String} the encoded string
 */
function encodeString(str) {
    if (str == null) {
        return str;
    }
    return String(str);
}
/**
 * Decodes a string while safely handling null and undefined values.
 *
 * If an array is provided, only the first entry is used.
 *
 * @param {String} input the encoded string
 * @return {String} the string value
 */
function decodeString(input) {
    var str = getEncodedValue(input, true);
    if (str == null)
        return str;
    return String(str);
}
/**
 * Decodes an enum value while safely handling null and undefined values.
 *
 * If an array is provided, only the first entry is used.
 *
 * @param {String} input the encoded string
 * @param {String[]} enumValues allowed enum values
 * @return {String} the string value from enumValues
 */
function decodeEnum(input, enumValues) {
    var str = decodeString(input);
    if (str == null)
        return str;
    return enumValues.includes(str) ? str : undefined;
}
/**
 * Encodes anything as a JSON string.
 *
 * @param {Any} any The thing to be encoded
 * @return {String} The JSON string representation of any
 */
function encodeJson(any) {
    if (any == null) {
        return any;
    }
    return JSON.stringify(any);
}
/**
 * Decodes a JSON string into javascript
 *
 * If an array is provided, only the first entry is used.
 *
 * @param {String} input The JSON string representation
 * @return {Any} The javascript representation
 */
function decodeJson(input) {
    var jsonStr = getEncodedValue(input);
    if (jsonStr == null)
        return jsonStr;
    var result = null;
    try {
        result = JSON.parse(jsonStr);
    }
    catch (e) {
        /* ignore errors, returning undefined */
    }
    return result;
}
/**
 * Encodes an array as a JSON string.
 *
 * @param {Array} array The array to be encoded
 * @return {String[]} The array of strings to be put in the URL
 * as repeated query parameters
 */
function encodeArray(array) {
    if (array == null) {
        return array;
    }
    return array;
}
/**
 * Decodes an array or singular value and returns it as an array
 * or undefined if falsy. Filters out undefined values.
 *
 * @param {String | Array} input The input value
 * @return {Array} The javascript representation
 */
function decodeArray(input) {
    var arr = getEncodedValueArray(input);
    if (arr == null)
        return arr;
    return arr;
}
/**
 * Encodes a numeric array as a JSON string.
 *
 * @param {Array} array The array to be encoded
 * @return {String[]} The array of strings to be put in the URL
 * as repeated query parameters
 */
function encodeNumericArray(array) {
    if (array == null) {
        return array;
    }
    return array.map(String);
}
/**
 * Decodes an array or singular value and returns it as an array
 * or undefined if falsy. Filters out undefined and NaN values.
 *
 * @param {String | Array} input The input value
 * @return {Array} The javascript representation
 */
function decodeNumericArray(input) {
    var arr = decodeArray(input);
    if (arr == null)
        return arr;
    return arr.map(function (d) { return (d === '' || d == null ? null : +d); });
}
/**
 * Encodes an array as a delimited string. For example,
 * ['a', 'b'] -> 'a_b' with entrySeparator='_'
 *
 * @param array The array to be encoded
 * @param entrySeparator The string used to delimit entries
 * @return The array as a string with elements joined by the
 * entry separator
 */
function encodeDelimitedArray(array, entrySeparator) {
    if (entrySeparator === void 0) { entrySeparator = '_'; }
    if (array == null) {
        return array;
    }
    return array.join(entrySeparator);
}
/**
 * Decodes a delimited string into javascript array. For example,
 * 'a_b' -> ['a', 'b'] with entrySeparator='_'
 *
 * If an array is provided as input, only the first entry is used.
 *
 * @param {String} input The JSON string representation
 * @param entrySeparator The array as a string with elements joined by the
 * entry separator
 * @return {Array} The javascript representation
 */
function decodeDelimitedArray(input, entrySeparator) {
    if (entrySeparator === void 0) { entrySeparator = '_'; }
    var arrayStr = getEncodedValue(input, true);
    if (arrayStr == null)
        return arrayStr;
    if (arrayStr === '')
        return [];
    return arrayStr.split(entrySeparator);
}
/**
 * Encodes a numeric array as a delimited string. (alias of encodeDelimitedArray)
 * For example, [1, 2] -> '1_2' with entrySeparator='_'
 *
 * @param {Array} array The array to be encoded
 * @return {String} The JSON string representation of array
 */
var encodeDelimitedNumericArray = encodeDelimitedArray;
/**
 * Decodes a delimited string into javascript array where all entries are numbers
 * For example, '1_2' -> [1, 2] with entrySeparator='_'
 *
 * If an array is provided as input, only the first entry is used.
 *
 * @param {String} jsonStr The JSON string representation
 * @return {Array} The javascript representation
 */
function decodeDelimitedNumericArray(arrayStr, entrySeparator) {
    if (entrySeparator === void 0) { entrySeparator = '_'; }
    var decoded = decodeDelimitedArray(arrayStr, entrySeparator);
    if (decoded == null)
        return decoded;
    return decoded.map(function (d) { return (d === '' || d == null ? null : +d); });
}
/**
 * Encode simple objects as readable strings. Works only for simple,
 * flat objects where values are numbers, strings.
 *
 * For example { foo: bar, boo: baz } -> "foo-bar_boo-baz"
 *
 * @param {Object} object The object to encode
 * @param {String} keyValSeparator="-" The separator between keys and values
 * @param {String} entrySeparator="_" The separator between entries
 * @return {String} The encoded object
 */
function encodeObject(obj, keyValSeparator, entrySeparator) {
    if (keyValSeparator === void 0) { keyValSeparator = '-'; }
    if (entrySeparator === void 0) { entrySeparator = '_'; }
    if (obj == null)
        return obj; // null or undefined
    if (!Object.keys(obj).length)
        return ''; // {} case
    return Object.keys(obj)
        .map(function (key) { return "" + key + keyValSeparator + obj[key]; })
        .join(entrySeparator);
}
/**
 * Decodes a simple object to javascript. Currently works only for simple,
 * flat objects where values are strings.
 *
 * For example "foo-bar_boo-baz" -> { foo: bar, boo: baz }
 *
 * If an array is provided as input, only the first entry is used.
 *
 * @param {String} input The object string to decode
 * @param {String} keyValSeparator="-" The separator between keys and values
 * @param {String} entrySeparator="_" The separator between entries
 * @return {Object} The javascript object
 */
function decodeObject(input, keyValSeparator, entrySeparator) {
    if (keyValSeparator === void 0) { keyValSeparator = '-'; }
    if (entrySeparator === void 0) { entrySeparator = '_'; }
    var objStr = getEncodedValue(input, true);
    if (objStr == null)
        return objStr;
    if (objStr === '')
        return {};
    var obj = {};
    var keyValSeparatorRegExp = new RegExp(keyValSeparator + "(.*)");
    objStr.split(entrySeparator).forEach(function (entryStr) {
        var _a = entryStr.split(keyValSeparatorRegExp), key = _a[0], value = _a[1];
        obj[key] = value;
    });
    return obj;
}
/**
 * Encode simple objects as readable strings. Alias of encodeObject.
 *
 * For example { foo: 123, boo: 521 } -> "foo-123_boo-521"
 *
 * @param {Object} object The object to encode
 * @param {String} keyValSeparator="-" The separator between keys and values
 * @param {String} entrySeparator="_" The separator between entries
 * @return {String} The encoded object
 */
var encodeNumericObject = encodeObject;
/**
 * Decodes a simple object to javascript where all values are numbers.
 * Currently works only for simple, flat objects.
 *
 * For example "foo-123_boo-521" -> { foo: 123, boo: 521 }
 *
 * If an array is provided as input, only the first entry is used.
 *
 * @param {String} input The object string to decode
 * @param {String} keyValSeparator="-" The separator between keys and values
 * @param {String} entrySeparator="_" The separator between entries
 * @return {Object} The javascript object
 */
function decodeNumericObject(input, keyValSeparator, entrySeparator) {
    if (keyValSeparator === void 0) { keyValSeparator = '-'; }
    if (entrySeparator === void 0) { entrySeparator = '_'; }
    var decoded = decodeObject(input, keyValSeparator, entrySeparator);
    if (decoded == null)
        return decoded;
    // convert to numbers
    var decodedNumberObj = {};
    for (var _i = 0, _a = Object.keys(decoded); _i < _a.length; _i++) {
        var key = _a[_i];
        decodedNumberObj[key] = decodeNumber(decoded[key]);
    }
    return decodedNumberObj;
}


/***/ }),

/***/ "./node_modules/serialize-query-params/esm/updateLocation.js":
/*!*******************************************************************!*\
  !*** ./node_modules/serialize-query-params/esm/updateLocation.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "transformSearchStringJsonSafe": () => (/* binding */ transformSearchStringJsonSafe),
/* harmony export */   "updateLocation": () => (/* binding */ updateLocation),
/* harmony export */   "updateInLocation": () => (/* binding */ updateInLocation)
/* harmony export */ });
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! query-string */ "./node_modules/query-string/index.js");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

/**
 * An example of a transformSearchString function that undoes encoding of
 * common JSON characters that are technically allowed in URLs.
 */
var JSON_SAFE_CHARS = "{}[],\":"
    .split('')
    .map(function (d) { return [d, encodeURIComponent(d)]; });
function transformSearchStringJsonSafe(searchString) {
    var str = searchString;
    for (var _i = 0, JSON_SAFE_CHARS_1 = JSON_SAFE_CHARS; _i < JSON_SAFE_CHARS_1.length; _i++) {
        var _a = JSON_SAFE_CHARS_1[_i], char = _a[0], code = _a[1];
        str = str.replace(new RegExp('\\' + code, 'g'), char);
    }
    return str;
}
/**
 * Update a location, wiping out parameters not included in encodedQuery
 * If a param is set to undefined it will be removed from the URL.
 */
function updateLocation(encodedQuery, location, stringifyOptions) {
    var encodedSearchString = (0,query_string__WEBPACK_IMPORTED_MODULE_0__.stringify)(encodedQuery, stringifyOptions);
    if (stringifyOptions && stringifyOptions.transformSearchString) {
        encodedSearchString = stringifyOptions.transformSearchString(encodedSearchString);
    }
    var search = encodedSearchString.length ? "?" + encodedSearchString : '';
    var href = (0,query_string__WEBPACK_IMPORTED_MODULE_0__.parseUrl)(location.href || '').url + search;
    var newLocation = __assign(__assign({}, location), { key: "" + Date.now(), // needed for some routers (e.g. react-router)
        href: href,
        search: search, query: encodedQuery });
    return newLocation;
}
/**
 * Update a location while retaining existing parameters.
 * If a param is set to undefined it will be removed from the URL.
 */
function updateInLocation(encodedQueryReplacements, location, stringifyOptions) {
    // explicitly avoid parsing numbers to ensure the
    // return type has the same shape as EncodeQuery
    var currQuery = (0,query_string__WEBPACK_IMPORTED_MODULE_0__.parse)(location.search, { parseNumbers: false });
    var newQuery = __assign(__assign({}, currQuery), encodedQueryReplacements);
    return updateLocation(newQuery, location, stringifyOptions);
}


/***/ }),

/***/ "./node_modules/serialize-query-params/esm/withDefault.js":
/*!****************************************************************!*\
  !*** ./node_modules/serialize-query-params/esm/withDefault.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "withDefault": () => (/* binding */ withDefault),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function withDefault(param, defaultValue, includeNull) {
    if (includeNull === void 0) { includeNull = true; }
    var decodeWithDefault = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var decodedValue = param.decode.apply(param, args);
        if (decodedValue === undefined) {
            return defaultValue;
        }
        if (includeNull) {
            if (decodedValue === null) {
                return defaultValue;
            }
            else {
                return decodedValue;
            }
        }
        return decodedValue;
    };
    return __assign(__assign({}, param), { decode: decodeWithDefault });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (withDefault);


/***/ }),

/***/ "./node_modules/split-on-first/index.js":
/*!**********************************************!*\
  !*** ./node_modules/split-on-first/index.js ***!
  \**********************************************/
/***/ ((module) => {

"use strict";


module.exports = (string, separator) => {
	if (!(typeof string === 'string' && typeof separator === 'string')) {
		throw new TypeError('Expected the arguments to be of type `string`');
	}

	if (separator === '') {
		return [string];
	}

	const separatorIndex = string.indexOf(separator);

	if (separatorIndex === -1) {
		return [string];
	}

	return [
		string.slice(0, separatorIndex),
		string.slice(separatorIndex + separator.length)
	];
};


/***/ }),

/***/ "./node_modules/strict-uri-encode/index.js":
/*!*************************************************!*\
  !*** ./node_modules/strict-uri-encode/index.js ***!
  \*************************************************/
/***/ ((module) => {

"use strict";

module.exports = str => encodeURIComponent(str).replace(/[!'()*]/g, x => `%${x.charCodeAt(0).toString(16).toUpperCase()}`);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/Home/SerializeQueryParams.js");
/******/ 	var __webpack_export_target__ = this;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;
//# sourceMappingURL=Home.SerializeQueryParams.js.map