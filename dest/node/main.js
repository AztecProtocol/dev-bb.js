/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 435:
/***/ ((module) => {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}


/***/ }),

/***/ 227:
/***/ ((module, exports, __webpack_require__) => {

/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */

exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
exports.destroy = (() => {
	let warned = false;

	return () => {
		if (!warned) {
			warned = true;
			console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
		}
	};
})();

/**
 * Colors.
 */

exports.colors = [
	'#0000CC',
	'#0000FF',
	'#0033CC',
	'#0033FF',
	'#0066CC',
	'#0066FF',
	'#0099CC',
	'#0099FF',
	'#00CC00',
	'#00CC33',
	'#00CC66',
	'#00CC99',
	'#00CCCC',
	'#00CCFF',
	'#3300CC',
	'#3300FF',
	'#3333CC',
	'#3333FF',
	'#3366CC',
	'#3366FF',
	'#3399CC',
	'#3399FF',
	'#33CC00',
	'#33CC33',
	'#33CC66',
	'#33CC99',
	'#33CCCC',
	'#33CCFF',
	'#6600CC',
	'#6600FF',
	'#6633CC',
	'#6633FF',
	'#66CC00',
	'#66CC33',
	'#9900CC',
	'#9900FF',
	'#9933CC',
	'#9933FF',
	'#99CC00',
	'#99CC33',
	'#CC0000',
	'#CC0033',
	'#CC0066',
	'#CC0099',
	'#CC00CC',
	'#CC00FF',
	'#CC3300',
	'#CC3333',
	'#CC3366',
	'#CC3399',
	'#CC33CC',
	'#CC33FF',
	'#CC6600',
	'#CC6633',
	'#CC9900',
	'#CC9933',
	'#CCCC00',
	'#CCCC33',
	'#FF0000',
	'#FF0033',
	'#FF0066',
	'#FF0099',
	'#FF00CC',
	'#FF00FF',
	'#FF3300',
	'#FF3333',
	'#FF3366',
	'#FF3399',
	'#FF33CC',
	'#FF33FF',
	'#FF6600',
	'#FF6633',
	'#FF9900',
	'#FF9933',
	'#FFCC00',
	'#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

// eslint-disable-next-line complexity
function useColors() {
	// NB: In an Electron preload script, document will be defined but not fully
	// initialized. Since we know we're in Chrome, we'll just detect this case
	// explicitly
	if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
		return true;
	}

	// Internet Explorer and Edge do not support colors.
	if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
		return false;
	}

	// Is webkit? http://stackoverflow.com/a/16459606/376773
	// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
		// Is firebug? http://stackoverflow.com/a/398120/376773
		(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
		// Is firefox >= v31?
		// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
		// Double check webkit in userAgent just in case we are in a worker
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	args[0] = (this.useColors ? '%c' : '') +
		this.namespace +
		(this.useColors ? ' %c' : ' ') +
		args[0] +
		(this.useColors ? '%c ' : ' ') +
		'+' + module.exports.humanize(this.diff);

	if (!this.useColors) {
		return;
	}

	const c = 'color: ' + this.color;
	args.splice(1, 0, c, 'color: inherit');

	// The final "%c" is somewhat tricky, because there could be other
	// arguments passed either before or after the %c, so we need to
	// figure out the correct index to insert the CSS into
	let index = 0;
	let lastC = 0;
	args[0].replace(/%[a-zA-Z%]/g, match => {
		if (match === '%%') {
			return;
		}
		index++;
		if (match === '%c') {
			// We only are interested in the *last* %c
			// (the user may have provided their own)
			lastC = index;
		}
	});

	args.splice(lastC, 0, c);
}

/**
 * Invokes `console.debug()` when available.
 * No-op when `console.debug` is not a "function".
 * If `console.debug` is not available, falls back
 * to `console.log`.
 *
 * @api public
 */
exports.log = console.debug || console.log || (() => {});

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	try {
		if (namespaces) {
			exports.storage.setItem('debug', namespaces);
		} else {
			exports.storage.removeItem('debug');
		}
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */
function load() {
	let r;
	try {
		r = exports.storage.getItem('debug');
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}

	// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	if (!r && typeof process !== 'undefined' && 'env' in process) {
		r = process.env.DEBUG;
	}

	return r;
}

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
	try {
		// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
		// The Browser also has localStorage in the global context.
		return localStorage;
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

module.exports = __webpack_require__(447)(exports);

const {formatters} = module.exports;

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
	try {
		return JSON.stringify(v);
	} catch (error) {
		return '[UnexpectedJSONParseError]: ' + error.message;
	}
};


/***/ }),

/***/ 447:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup(env) {
	createDebug.debug = createDebug;
	createDebug.default = createDebug;
	createDebug.coerce = coerce;
	createDebug.disable = disable;
	createDebug.enable = enable;
	createDebug.enabled = enabled;
	createDebug.humanize = __webpack_require__(435);
	createDebug.destroy = destroy;

	Object.keys(env).forEach(key => {
		createDebug[key] = env[key];
	});

	/**
	* The currently active debug mode names, and names to skip.
	*/

	createDebug.names = [];
	createDebug.skips = [];

	/**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/
	createDebug.formatters = {};

	/**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/
	function selectColor(namespace) {
		let hash = 0;

		for (let i = 0; i < namespace.length; i++) {
			hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
			hash |= 0; // Convert to 32bit integer
		}

		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
	}
	createDebug.selectColor = selectColor;

	/**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/
	function createDebug(namespace) {
		let prevTime;
		let enableOverride = null;
		let namespacesCache;
		let enabledCache;

		function debug(...args) {
			// Disabled?
			if (!debug.enabled) {
				return;
			}

			const self = debug;

			// Set `diff` timestamp
			const curr = Number(new Date());
			const ms = curr - (prevTime || curr);
			self.diff = ms;
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;

			args[0] = createDebug.coerce(args[0]);

			if (typeof args[0] !== 'string') {
				// Anything else let's inspect with %O
				args.unshift('%O');
			}

			// Apply any `formatters` transformations
			let index = 0;
			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
				// If we encounter an escaped % then don't increase the array index
				if (match === '%%') {
					return '%';
				}
				index++;
				const formatter = createDebug.formatters[format];
				if (typeof formatter === 'function') {
					const val = args[index];
					match = formatter.call(self, val);

					// Now we need to remove `args[index]` since it's inlined in the `format`
					args.splice(index, 1);
					index--;
				}
				return match;
			});

			// Apply env-specific formatting (colors, etc.)
			createDebug.formatArgs.call(self, args);

			const logFn = self.log || createDebug.log;
			logFn.apply(self, args);
		}

		debug.namespace = namespace;
		debug.useColors = createDebug.useColors();
		debug.color = createDebug.selectColor(namespace);
		debug.extend = extend;
		debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

		Object.defineProperty(debug, 'enabled', {
			enumerable: true,
			configurable: false,
			get: () => {
				if (enableOverride !== null) {
					return enableOverride;
				}
				if (namespacesCache !== createDebug.namespaces) {
					namespacesCache = createDebug.namespaces;
					enabledCache = createDebug.enabled(namespace);
				}

				return enabledCache;
			},
			set: v => {
				enableOverride = v;
			}
		});

		// Env-specific initialization logic for debug instances
		if (typeof createDebug.init === 'function') {
			createDebug.init(debug);
		}

		return debug;
	}

	function extend(namespace, delimiter) {
		const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
		newDebug.log = this.log;
		return newDebug;
	}

	/**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/
	function enable(namespaces) {
		createDebug.save(namespaces);
		createDebug.namespaces = namespaces;

		createDebug.names = [];
		createDebug.skips = [];

		let i;
		const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
		const len = split.length;

		for (i = 0; i < len; i++) {
			if (!split[i]) {
				// ignore empty strings
				continue;
			}

			namespaces = split[i].replace(/\*/g, '.*?');

			if (namespaces[0] === '-') {
				createDebug.skips.push(new RegExp('^' + namespaces.slice(1) + '$'));
			} else {
				createDebug.names.push(new RegExp('^' + namespaces + '$'));
			}
		}
	}

	/**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/
	function disable() {
		const namespaces = [
			...createDebug.names.map(toNamespace),
			...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
		].join(',');
		createDebug.enable('');
		return namespaces;
	}

	/**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/
	function enabled(name) {
		if (name[name.length - 1] === '*') {
			return true;
		}

		let i;
		let len;

		for (i = 0, len = createDebug.skips.length; i < len; i++) {
			if (createDebug.skips[i].test(name)) {
				return false;
			}
		}

		for (i = 0, len = createDebug.names.length; i < len; i++) {
			if (createDebug.names[i].test(name)) {
				return true;
			}
		}

		return false;
	}

	/**
	* Convert regexp to namespace
	*
	* @param {RegExp} regxep
	* @return {String} namespace
	* @api private
	*/
	function toNamespace(regexp) {
		return regexp.toString()
			.substring(2, regexp.toString().length - 2)
			.replace(/\.\*\?$/, '*');
	}

	/**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/
	function coerce(val) {
		if (val instanceof Error) {
			return val.stack || val.message;
		}
		return val;
	}

	/**
	* XXX DO NOT USE. This is a temporary stub function.
	* XXX It WILL be removed in the next major release.
	*/
	function destroy() {
		console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
	}

	createDebug.enable(createDebug.load());

	return createDebug;
}

module.exports = setup;


/***/ }),

/***/ 158:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */

if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
	module.exports = __webpack_require__(227);
} else {
	module.exports = __webpack_require__(39);
}


/***/ }),

/***/ 39:
/***/ ((module, exports, __webpack_require__) => {

/**
 * Module dependencies.
 */

const tty = __webpack_require__(224);
const util = __webpack_require__(837);

/**
 * This is the Node.js implementation of `debug()`.
 */

exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.destroy = util.deprecate(
	() => {},
	'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.'
);

/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

try {
	// Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
	// eslint-disable-next-line import/no-extraneous-dependencies
	const supportsColor = __webpack_require__(130);

	if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
		exports.colors = [
			20,
			21,
			26,
			27,
			32,
			33,
			38,
			39,
			40,
			41,
			42,
			43,
			44,
			45,
			56,
			57,
			62,
			63,
			68,
			69,
			74,
			75,
			76,
			77,
			78,
			79,
			80,
			81,
			92,
			93,
			98,
			99,
			112,
			113,
			128,
			129,
			134,
			135,
			148,
			149,
			160,
			161,
			162,
			163,
			164,
			165,
			166,
			167,
			168,
			169,
			170,
			171,
			172,
			173,
			178,
			179,
			184,
			185,
			196,
			197,
			198,
			199,
			200,
			201,
			202,
			203,
			204,
			205,
			206,
			207,
			208,
			209,
			214,
			215,
			220,
			221
		];
	}
} catch (error) {
	// Swallow - we only care if `supports-color` is available; it doesn't have to be.
}

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */

exports.inspectOpts = Object.keys(process.env).filter(key => {
	return /^debug_/i.test(key);
}).reduce((obj, key) => {
	// Camel-case
	const prop = key
		.substring(6)
		.toLowerCase()
		.replace(/_([a-z])/g, (_, k) => {
			return k.toUpperCase();
		});

	// Coerce string value into JS value
	let val = process.env[key];
	if (/^(yes|on|true|enabled)$/i.test(val)) {
		val = true;
	} else if (/^(no|off|false|disabled)$/i.test(val)) {
		val = false;
	} else if (val === 'null') {
		val = null;
	} else {
		val = Number(val);
	}

	obj[prop] = val;
	return obj;
}, {});

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
	return 'colors' in exports.inspectOpts ?
		Boolean(exports.inspectOpts.colors) :
		tty.isatty(process.stderr.fd);
}

/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	const {namespace: name, useColors} = this;

	if (useColors) {
		const c = this.color;
		const colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c);
		const prefix = `  ${colorCode};1m${name} \u001B[0m`;

		args[0] = prefix + args[0].split('\n').join('\n' + prefix);
		args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + '\u001B[0m');
	} else {
		args[0] = getDate() + name + ' ' + args[0];
	}
}

function getDate() {
	if (exports.inspectOpts.hideDate) {
		return '';
	}
	return new Date().toISOString() + ' ';
}

/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */

function log(...args) {
	return process.stderr.write(util.format(...args) + '\n');
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	if (namespaces) {
		process.env.DEBUG = namespaces;
	} else {
		// If you set a process.env field to null or undefined, it gets cast to the
		// string 'null' or 'undefined'. Just delete instead.
		delete process.env.DEBUG;
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
	return process.env.DEBUG;
}

/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */

function init(debug) {
	debug.inspectOpts = {};

	const keys = Object.keys(exports.inspectOpts);
	for (let i = 0; i < keys.length; i++) {
		debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
	}
}

module.exports = __webpack_require__(447)(exports);

const {formatters} = module.exports;

/**
 * Map %o to `util.inspect()`, all on a single line.
 */

formatters.o = function (v) {
	this.inspectOpts.colors = this.useColors;
	return util.inspect(v, this.inspectOpts)
		.split('\n')
		.map(str => str.trim())
		.join(' ');
};

/**
 * Map %O to `util.inspect()`, allowing multiple lines if needed.
 */

formatters.O = function (v) {
	this.inspectOpts.colors = this.useColors;
	return util.inspect(v, this.inspectOpts);
};


/***/ }),

/***/ 560:
/***/ ((module) => {

"use strict";


module.exports = (flag, argv = process.argv) => {
	const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
	const position = argv.indexOf(prefix + flag);
	const terminatorPosition = argv.indexOf('--');
	return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
};


/***/ }),

/***/ 130:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const os = __webpack_require__(37);
const tty = __webpack_require__(224);
const hasFlag = __webpack_require__(560);

const {env} = process;

let forceColor;
if (hasFlag('no-color') ||
	hasFlag('no-colors') ||
	hasFlag('color=false') ||
	hasFlag('color=never')) {
	forceColor = 0;
} else if (hasFlag('color') ||
	hasFlag('colors') ||
	hasFlag('color=true') ||
	hasFlag('color=always')) {
	forceColor = 1;
}

if ('FORCE_COLOR' in env) {
	if (env.FORCE_COLOR === 'true') {
		forceColor = 1;
	} else if (env.FORCE_COLOR === 'false') {
		forceColor = 0;
	} else {
		forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
	}
}

function translateLevel(level) {
	if (level === 0) {
		return false;
	}

	return {
		level,
		hasBasic: true,
		has256: level >= 2,
		has16m: level >= 3
	};
}

function supportsColor(haveStream, streamIsTTY) {
	if (forceColor === 0) {
		return 0;
	}

	if (hasFlag('color=16m') ||
		hasFlag('color=full') ||
		hasFlag('color=truecolor')) {
		return 3;
	}

	if (hasFlag('color=256')) {
		return 2;
	}

	if (haveStream && !streamIsTTY && forceColor === undefined) {
		return 0;
	}

	const min = forceColor || 0;

	if (env.TERM === 'dumb') {
		return min;
	}

	if (process.platform === 'win32') {
		// Windows 10 build 10586 is the first Windows release that supports 256 colors.
		// Windows 10 build 14931 is the first release that supports 16m/TrueColor.
		const osRelease = os.release().split('.');
		if (
			Number(osRelease[0]) >= 10 &&
			Number(osRelease[2]) >= 10586
		) {
			return Number(osRelease[2]) >= 14931 ? 3 : 2;
		}

		return 1;
	}

	if ('CI' in env) {
		if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI', 'GITHUB_ACTIONS', 'BUILDKITE'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
			return 1;
		}

		return min;
	}

	if ('TEAMCITY_VERSION' in env) {
		return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
	}

	if (env.COLORTERM === 'truecolor') {
		return 3;
	}

	if ('TERM_PROGRAM' in env) {
		const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

		switch (env.TERM_PROGRAM) {
			case 'iTerm.app':
				return version >= 3 ? 3 : 2;
			case 'Apple_Terminal':
				return 2;
			// No default
		}
	}

	if (/-256(color)?$/i.test(env.TERM)) {
		return 2;
	}

	if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
		return 1;
	}

	if ('COLORTERM' in env) {
		return 1;
	}

	return min;
}

function getSupportLevel(stream) {
	const level = supportsColor(stream, stream && stream.isTTY);
	return translateLevel(level);
}

module.exports = {
	supportsColor: getSupportLevel,
	stdout: translateLevel(supportsColor(true, tty.isatty(1))),
	stderr: translateLevel(supportsColor(true, tty.isatty(2)))
};


/***/ }),

/***/ 463:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.asyncMap = void 0;
/**
 * Much the same as Array.map, only it takes an async fn as an element handler, and ensures that each element handler
 * is executed sequentially.
 * The pattern of `await Promise.all(arr.map(async e => { ... }))` only works if one's happy with each element handler
 * being run concurrently.
 * If one required sequential execution of async fn's, the only alternative was regular loops with mutable state vars.
 * The equivalent with asyncMap: `await asyncMap(arr, async e => { ... })`.
 */
async function asyncMap(arr, fn) {
    const results = [];
    for (let i = 0; i < arr.length; ++i) {
        results.push(await fn(arr[i], i));
    }
    return results;
}
exports.asyncMap = asyncMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXN5bmNfbWFwL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBOzs7Ozs7O0dBT0c7QUFDSSxLQUFLLFVBQVUsUUFBUSxDQUFPLEdBQVEsRUFBRSxFQUFtQztJQUNoRixNQUFNLE9BQU8sR0FBUSxFQUFFLENBQUM7SUFDeEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUU7UUFDbkMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNuQztJQUNELE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUM7QUFORCw0QkFNQyJ9

/***/ }),

/***/ 271:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BarretenbergApiSync = exports.BarretenbergApi = void 0;
const index_js_1 = __webpack_require__(456);
const index_js_2 = __webpack_require__(678);
class BarretenbergApi {
    constructor(binder) {
        this.binder = binder;
    }
    async destroy() {
        await this.binder.wasm.destroy();
    }
    async pedersenInit() {
        const result = await this.binder.callWasmExport('pedersen___init', [], []);
        return;
    }
    async pedersenCompressFields(left, right) {
        const result = await this.binder.callWasmExport('pedersen___compress_fields', [left, right], [index_js_2.Fr]);
        return result[0];
    }
    async pedersenPlookupCompressFields(left, right) {
        const result = await this.binder.callWasmExport('pedersen___plookup_compress_fields', [left, right], [index_js_2.Fr]);
        return result[0];
    }
    async pedersenCompress(inputsBuffer) {
        const result = await this.binder.callWasmExport('pedersen___compress', [inputsBuffer], [index_js_2.Fr]);
        return result[0];
    }
    async pedersenPlookupCompress(inputsBuffer) {
        const result = await this.binder.callWasmExport('pedersen___plookup_compress', [inputsBuffer], [index_js_2.Fr]);
        return result[0];
    }
    async pedersenCompressWithHashIndex(inputsBuffer, hashIndex) {
        const result = await this.binder.callWasmExport('pedersen___compress_with_hash_index', [inputsBuffer, hashIndex], [index_js_2.Fr]);
        return result[0];
    }
    async pedersenCommit(inputsBuffer) {
        const result = await this.binder.callWasmExport('pedersen___commit', [inputsBuffer], [index_js_2.Fr]);
        return result[0];
    }
    async pedersenPlookupCommit(inputsBuffer) {
        const result = await this.binder.callWasmExport('pedersen___plookup_commit', [inputsBuffer], [index_js_2.Fr]);
        return result[0];
    }
    async pedersenPlookupCommitWithHashIndex(inputsBuffer, hashIndex) {
        const result = await this.binder.callWasmExport('pedersen___plookup_commit_with_hash_index', [inputsBuffer, hashIndex], [index_js_2.Fr]);
        return result[0];
    }
    async pedersenBufferToField(data) {
        const result = await this.binder.callWasmExport('pedersen___buffer_to_field', [data], [index_js_2.Fr]);
        return result[0];
    }
    async pedersenHashInit() {
        const result = await this.binder.callWasmExport('pedersen_hash_init', [], []);
        return;
    }
    async pedersenHashPair(left, right) {
        const result = await this.binder.callWasmExport('pedersen_hash_pair', [left, right], [index_js_2.Fr]);
        return result[0];
    }
    async pedersenHashMultiple(inputsBuffer) {
        const result = await this.binder.callWasmExport('pedersen_hash_multiple', [inputsBuffer], [index_js_2.Fr]);
        return result[0];
    }
    async pedersenHashMultipleWithHashIndex(inputsBuffer, hashIndex) {
        const result = await this.binder.callWasmExport('pedersen_hash_multiple_with_hash_index', [inputsBuffer, hashIndex], [index_js_2.Fr]);
        return result[0];
    }
    async pedersenHashToTree(data) {
        const result = await this.binder.callWasmExport('pedersen_hash_to_tree', [data], [(0, index_js_1.VectorDeserializer)(index_js_2.Fr)]);
        return result[0];
    }
    async blake2s(data) {
        const result = await this.binder.callWasmExport('blake2s', [data], [index_js_2.Buffer32]);
        return result[0];
    }
    async blake2sToField(data) {
        const result = await this.binder.callWasmExport('blake2s_to_field_', [data], [index_js_2.Fr]);
        return result[0];
    }
    async schnorrComputePublicKey(privateKey) {
        const result = await this.binder.callWasmExport('schnorr_compute_public_key', [privateKey], [index_js_2.Point]);
        return result[0];
    }
    async schnorrNegatePublicKey(publicKeyBuffer) {
        const result = await this.binder.callWasmExport('schnorr_negate_public_key', [publicKeyBuffer], [index_js_2.Point]);
        return result[0];
    }
    async schnorrConstructSignature(message, privateKey) {
        const result = await this.binder.callWasmExport('schnorr_construct_signature', [message, privateKey], [index_js_2.Buffer32, index_js_2.Buffer32]);
        return result;
    }
    async schnorrVerifySignature(message, pubKey, sigS, sigE) {
        const result = await this.binder.callWasmExport('schnorr_verify_signature', [message, pubKey, sigS, sigE], [(0, index_js_1.BoolDeserializer)()]);
        return result[0];
    }
    async schnorrMultisigCreateMultisigPublicKey(privateKey) {
        const result = await this.binder.callWasmExport('schnorr_multisig_create_multisig_public_key', [privateKey], [index_js_2.Buffer128]);
        return result[0];
    }
    async schnorrMultisigValidateAndCombineSignerPubkeys(signerPubkeyBuf) {
        const result = await this.binder.callWasmExport('schnorr_multisig_validate_and_combine_signer_pubkeys', [signerPubkeyBuf], [index_js_2.Point, (0, index_js_1.BoolDeserializer)()]);
        return result;
    }
    async schnorrMultisigConstructSignatureRound1() {
        const result = await this.binder.callWasmExport('schnorr_multisig_construct_signature_round_1', [], [index_js_2.Buffer128, index_js_2.Buffer128]);
        return result;
    }
    async schnorrMultisigConstructSignatureRound2(message, privateKey, signerRoundOnePrivateBuf, signerPubkeysBuf, roundOnePublicBuf) {
        const result = await this.binder.callWasmExport('schnorr_multisig_construct_signature_round_2', [message, privateKey, signerRoundOnePrivateBuf, signerPubkeysBuf, roundOnePublicBuf], [index_js_2.Fq, (0, index_js_1.BoolDeserializer)()]);
        return result;
    }
    async schnorrMultisigCombineSignatures(message, signerPubkeysBuf, roundOneBuf, roundTwoBuf) {
        const result = await this.binder.callWasmExport('schnorr_multisig_combine_signatures', [message, signerPubkeysBuf, roundOneBuf, roundTwoBuf], [index_js_2.Buffer32, index_js_2.Buffer32, (0, index_js_1.BoolDeserializer)()]);
        return result;
    }
    async srsInitSrs(pointsBuf, numPoints, g2PointBuf) {
        const result = await this.binder.callWasmExport('srs_init_srs', [pointsBuf, numPoints, g2PointBuf], []);
        return;
    }
    async examplesSimpleCreateAndVerifyProof() {
        const result = await this.binder.callWasmExport('examples_simple_create_and_verify_proof', [], [(0, index_js_1.BoolDeserializer)()]);
        return result[0];
    }
    async testThreads(threads, iterations) {
        const result = await this.binder.callWasmExport('test_threads', [threads, iterations], [(0, index_js_1.NumberDeserializer)()]);
        return result[0];
    }
    async testThreadAbort() {
        const result = await this.binder.callWasmExport('test_thread_abort', [], []);
        return;
    }
    async testAbort() {
        const result = await this.binder.callWasmExport('test_abort', [], []);
        return;
    }
    async commonInitSlabAllocator(circuitSize) {
        const result = await this.binder.callWasmExport('common_init_slab_allocator', [circuitSize], []);
        return;
    }
    async acirGetCircuitSizes(constraintSystemBuf) {
        const result = await this.binder.callWasmExport('acir_get_circuit_sizes', [constraintSystemBuf], [(0, index_js_1.NumberDeserializer)(), (0, index_js_1.NumberDeserializer)(), (0, index_js_1.NumberDeserializer)()]);
        return result;
    }
    async acirNewAcirComposer(sizeHint) {
        const result = await this.binder.callWasmExport('acir_new_acir_composer', [sizeHint], [index_js_2.Ptr]);
        return result[0];
    }
    async acirDeleteAcirComposer(acirComposerPtr) {
        const result = await this.binder.callWasmExport('acir_delete_acir_composer', [acirComposerPtr], []);
        return;
    }
    async acirCreateCircuit(acirComposerPtr, constraintSystemBuf, sizeHint) {
        const result = await this.binder.callWasmExport('acir_create_circuit', [acirComposerPtr, constraintSystemBuf, sizeHint], []);
        return;
    }
    async acirInitProvingKey(acirComposerPtr, constraintSystemBuf) {
        const result = await this.binder.callWasmExport('acir_init_proving_key', [acirComposerPtr, constraintSystemBuf], []);
        return;
    }
    async acirCreateProof(acirComposerPtr, constraintSystemBuf, witnessBuf, isRecursive) {
        const result = await this.binder.callWasmExport('acir_create_proof', [acirComposerPtr, constraintSystemBuf, witnessBuf, isRecursive], [(0, index_js_1.BufferDeserializer)()]);
        return result[0];
    }
    async acirLoadVerificationKey(acirComposerPtr, vkBuf) {
        const result = await this.binder.callWasmExport('acir_load_verification_key', [acirComposerPtr, vkBuf], []);
        return;
    }
    async acirInitVerificationKey(acirComposerPtr) {
        const result = await this.binder.callWasmExport('acir_init_verification_key', [acirComposerPtr], []);
        return;
    }
    async acirGetVerificationKey(acirComposerPtr) {
        const result = await this.binder.callWasmExport('acir_get_verification_key', [acirComposerPtr], [(0, index_js_1.BufferDeserializer)()]);
        return result[0];
    }
    async acirVerifyProof(acirComposerPtr, proofBuf, isRecursive) {
        const result = await this.binder.callWasmExport('acir_verify_proof', [acirComposerPtr, proofBuf, isRecursive], [(0, index_js_1.BoolDeserializer)()]);
        return result[0];
    }
    async acirGetSolidityVerifier(acirComposerPtr) {
        const result = await this.binder.callWasmExport('acir_get_solidity_verifier', [acirComposerPtr], [(0, index_js_1.StringDeserializer)()]);
        return result[0];
    }
    async acirSerializeProofIntoFields(acirComposerPtr, proofBuf, numInnerPublicInputs) {
        const result = await this.binder.callWasmExport('acir_serialize_proof_into_fields', [acirComposerPtr, proofBuf, numInnerPublicInputs], [(0, index_js_1.VectorDeserializer)(index_js_2.Fr)]);
        return result[0];
    }
    async acirSerializeVerificationKeyIntoFields(acirComposerPtr) {
        const result = await this.binder.callWasmExport('acir_serialize_verification_key_into_fields', [acirComposerPtr], [(0, index_js_1.VectorDeserializer)(index_js_2.Fr), index_js_2.Fr]);
        return result;
    }
}
exports.BarretenbergApi = BarretenbergApi;
class BarretenbergApiSync {
    constructor(binder) {
        this.binder = binder;
    }
    async destroy() {
        await this.binder.wasm.destroy();
    }
    pedersenInit() {
        const result = this.binder.callWasmExport('pedersen___init', [], []);
        return;
    }
    pedersenCompressFields(left, right) {
        const result = this.binder.callWasmExport('pedersen___compress_fields', [left, right], [index_js_2.Fr]);
        return result[0];
    }
    pedersenPlookupCompressFields(left, right) {
        const result = this.binder.callWasmExport('pedersen___plookup_compress_fields', [left, right], [index_js_2.Fr]);
        return result[0];
    }
    pedersenCompress(inputsBuffer) {
        const result = this.binder.callWasmExport('pedersen___compress', [inputsBuffer], [index_js_2.Fr]);
        return result[0];
    }
    pedersenPlookupCompress(inputsBuffer) {
        const result = this.binder.callWasmExport('pedersen___plookup_compress', [inputsBuffer], [index_js_2.Fr]);
        return result[0];
    }
    pedersenCompressWithHashIndex(inputsBuffer, hashIndex) {
        const result = this.binder.callWasmExport('pedersen___compress_with_hash_index', [inputsBuffer, hashIndex], [index_js_2.Fr]);
        return result[0];
    }
    pedersenCommit(inputsBuffer) {
        const result = this.binder.callWasmExport('pedersen___commit', [inputsBuffer], [index_js_2.Fr]);
        return result[0];
    }
    pedersenPlookupCommit(inputsBuffer) {
        const result = this.binder.callWasmExport('pedersen___plookup_commit', [inputsBuffer], [index_js_2.Fr]);
        return result[0];
    }
    pedersenPlookupCommitWithHashIndex(inputsBuffer, hashIndex) {
        const result = this.binder.callWasmExport('pedersen___plookup_commit_with_hash_index', [inputsBuffer, hashIndex], [index_js_2.Fr]);
        return result[0];
    }
    pedersenBufferToField(data) {
        const result = this.binder.callWasmExport('pedersen___buffer_to_field', [data], [index_js_2.Fr]);
        return result[0];
    }
    pedersenHashInit() {
        const result = this.binder.callWasmExport('pedersen_hash_init', [], []);
        return;
    }
    pedersenHashPair(left, right) {
        const result = this.binder.callWasmExport('pedersen_hash_pair', [left, right], [index_js_2.Fr]);
        return result[0];
    }
    pedersenHashMultiple(inputsBuffer) {
        const result = this.binder.callWasmExport('pedersen_hash_multiple', [inputsBuffer], [index_js_2.Fr]);
        return result[0];
    }
    pedersenHashMultipleWithHashIndex(inputsBuffer, hashIndex) {
        const result = this.binder.callWasmExport('pedersen_hash_multiple_with_hash_index', [inputsBuffer, hashIndex], [index_js_2.Fr]);
        return result[0];
    }
    pedersenHashToTree(data) {
        const result = this.binder.callWasmExport('pedersen_hash_to_tree', [data], [(0, index_js_1.VectorDeserializer)(index_js_2.Fr)]);
        return result[0];
    }
    blake2s(data) {
        const result = this.binder.callWasmExport('blake2s', [data], [index_js_2.Buffer32]);
        return result[0];
    }
    blake2sToField(data) {
        const result = this.binder.callWasmExport('blake2s_to_field_', [data], [index_js_2.Fr]);
        return result[0];
    }
    schnorrComputePublicKey(privateKey) {
        const result = this.binder.callWasmExport('schnorr_compute_public_key', [privateKey], [index_js_2.Point]);
        return result[0];
    }
    schnorrNegatePublicKey(publicKeyBuffer) {
        const result = this.binder.callWasmExport('schnorr_negate_public_key', [publicKeyBuffer], [index_js_2.Point]);
        return result[0];
    }
    schnorrConstructSignature(message, privateKey) {
        const result = this.binder.callWasmExport('schnorr_construct_signature', [message, privateKey], [index_js_2.Buffer32, index_js_2.Buffer32]);
        return result;
    }
    schnorrVerifySignature(message, pubKey, sigS, sigE) {
        const result = this.binder.callWasmExport('schnorr_verify_signature', [message, pubKey, sigS, sigE], [(0, index_js_1.BoolDeserializer)()]);
        return result[0];
    }
    schnorrMultisigCreateMultisigPublicKey(privateKey) {
        const result = this.binder.callWasmExport('schnorr_multisig_create_multisig_public_key', [privateKey], [index_js_2.Buffer128]);
        return result[0];
    }
    schnorrMultisigValidateAndCombineSignerPubkeys(signerPubkeyBuf) {
        const result = this.binder.callWasmExport('schnorr_multisig_validate_and_combine_signer_pubkeys', [signerPubkeyBuf], [index_js_2.Point, (0, index_js_1.BoolDeserializer)()]);
        return result;
    }
    schnorrMultisigConstructSignatureRound1() {
        const result = this.binder.callWasmExport('schnorr_multisig_construct_signature_round_1', [], [index_js_2.Buffer128, index_js_2.Buffer128]);
        return result;
    }
    schnorrMultisigConstructSignatureRound2(message, privateKey, signerRoundOnePrivateBuf, signerPubkeysBuf, roundOnePublicBuf) {
        const result = this.binder.callWasmExport('schnorr_multisig_construct_signature_round_2', [message, privateKey, signerRoundOnePrivateBuf, signerPubkeysBuf, roundOnePublicBuf], [index_js_2.Fq, (0, index_js_1.BoolDeserializer)()]);
        return result;
    }
    schnorrMultisigCombineSignatures(message, signerPubkeysBuf, roundOneBuf, roundTwoBuf) {
        const result = this.binder.callWasmExport('schnorr_multisig_combine_signatures', [message, signerPubkeysBuf, roundOneBuf, roundTwoBuf], [index_js_2.Buffer32, index_js_2.Buffer32, (0, index_js_1.BoolDeserializer)()]);
        return result;
    }
    srsInitSrs(pointsBuf, numPoints, g2PointBuf) {
        const result = this.binder.callWasmExport('srs_init_srs', [pointsBuf, numPoints, g2PointBuf], []);
        return;
    }
    examplesSimpleCreateAndVerifyProof() {
        const result = this.binder.callWasmExport('examples_simple_create_and_verify_proof', [], [(0, index_js_1.BoolDeserializer)()]);
        return result[0];
    }
    testThreads(threads, iterations) {
        const result = this.binder.callWasmExport('test_threads', [threads, iterations], [(0, index_js_1.NumberDeserializer)()]);
        return result[0];
    }
    testThreadAbort() {
        const result = this.binder.callWasmExport('test_thread_abort', [], []);
        return;
    }
    testAbort() {
        const result = this.binder.callWasmExport('test_abort', [], []);
        return;
    }
    commonInitSlabAllocator(circuitSize) {
        const result = this.binder.callWasmExport('common_init_slab_allocator', [circuitSize], []);
        return;
    }
    acirGetCircuitSizes(constraintSystemBuf) {
        const result = this.binder.callWasmExport('acir_get_circuit_sizes', [constraintSystemBuf], [(0, index_js_1.NumberDeserializer)(), (0, index_js_1.NumberDeserializer)(), (0, index_js_1.NumberDeserializer)()]);
        return result;
    }
    acirNewAcirComposer(sizeHint) {
        const result = this.binder.callWasmExport('acir_new_acir_composer', [sizeHint], [index_js_2.Ptr]);
        return result[0];
    }
    acirDeleteAcirComposer(acirComposerPtr) {
        const result = this.binder.callWasmExport('acir_delete_acir_composer', [acirComposerPtr], []);
        return;
    }
    acirCreateCircuit(acirComposerPtr, constraintSystemBuf, sizeHint) {
        const result = this.binder.callWasmExport('acir_create_circuit', [acirComposerPtr, constraintSystemBuf, sizeHint], []);
        return;
    }
    acirInitProvingKey(acirComposerPtr, constraintSystemBuf) {
        const result = this.binder.callWasmExport('acir_init_proving_key', [acirComposerPtr, constraintSystemBuf], []);
        return;
    }
    acirCreateProof(acirComposerPtr, constraintSystemBuf, witnessBuf, isRecursive) {
        const result = this.binder.callWasmExport('acir_create_proof', [acirComposerPtr, constraintSystemBuf, witnessBuf, isRecursive], [(0, index_js_1.BufferDeserializer)()]);
        return result[0];
    }
    acirLoadVerificationKey(acirComposerPtr, vkBuf) {
        const result = this.binder.callWasmExport('acir_load_verification_key', [acirComposerPtr, vkBuf], []);
        return;
    }
    acirInitVerificationKey(acirComposerPtr) {
        const result = this.binder.callWasmExport('acir_init_verification_key', [acirComposerPtr], []);
        return;
    }
    acirGetVerificationKey(acirComposerPtr) {
        const result = this.binder.callWasmExport('acir_get_verification_key', [acirComposerPtr], [(0, index_js_1.BufferDeserializer)()]);
        return result[0];
    }
    acirVerifyProof(acirComposerPtr, proofBuf, isRecursive) {
        const result = this.binder.callWasmExport('acir_verify_proof', [acirComposerPtr, proofBuf, isRecursive], [(0, index_js_1.BoolDeserializer)()]);
        return result[0];
    }
    acirGetSolidityVerifier(acirComposerPtr) {
        const result = this.binder.callWasmExport('acir_get_solidity_verifier', [acirComposerPtr], [(0, index_js_1.StringDeserializer)()]);
        return result[0];
    }
    acirSerializeProofIntoFields(acirComposerPtr, proofBuf, numInnerPublicInputs) {
        const result = this.binder.callWasmExport('acir_serialize_proof_into_fields', [acirComposerPtr, proofBuf, numInnerPublicInputs], [(0, index_js_1.VectorDeserializer)(index_js_2.Fr)]);
        return result[0];
    }
    acirSerializeVerificationKeyIntoFields(acirComposerPtr) {
        const result = this.binder.callWasmExport('acir_serialize_verification_key_into_fields', [acirComposerPtr], [(0, index_js_1.VectorDeserializer)(index_js_2.Fr), index_js_2.Fr]);
        return result;
    }
}
exports.BarretenbergApiSync = BarretenbergApiSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYmFycmV0ZW5iZXJnX2FwaS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQSxvREFNK0I7QUFDL0IsZ0RBQTRFO0FBRTVFLE1BQWEsZUFBZTtJQUMxQixZQUFtQixNQUEwQjtRQUExQixXQUFNLEdBQU4sTUFBTSxDQUFvQjtJQUFHLENBQUM7SUFFakQsS0FBSyxDQUFDLE9BQU87UUFDWCxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRCxLQUFLLENBQUMsWUFBWTtRQUNoQixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLGlCQUFpQixFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMzRSxPQUFPO0lBQ1QsQ0FBQztJQUVELEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxJQUFRLEVBQUUsS0FBUztRQUM5QyxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLDRCQUE0QixFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsYUFBRSxDQUFDLENBQUMsQ0FBQztRQUNuRyxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBRUQsS0FBSyxDQUFDLDZCQUE2QixDQUFDLElBQVEsRUFBRSxLQUFTO1FBQ3JELE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsb0NBQW9DLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxhQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzNHLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFRCxLQUFLLENBQUMsZ0JBQWdCLENBQUMsWUFBa0I7UUFDdkMsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsYUFBRSxDQUFDLENBQUMsQ0FBQztRQUM3RixPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBRUQsS0FBSyxDQUFDLHVCQUF1QixDQUFDLFlBQWtCO1FBQzlDLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsNkJBQTZCLEVBQUUsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLGFBQUUsQ0FBQyxDQUFDLENBQUM7UUFDckcsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVELEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxZQUFrQixFQUFFLFNBQWlCO1FBQ3ZFLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQzdDLHFDQUFxQyxFQUNyQyxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsRUFDekIsQ0FBQyxhQUFFLENBQUMsQ0FDTCxDQUFDO1FBQ0YsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVELEtBQUssQ0FBQyxjQUFjLENBQUMsWUFBa0I7UUFDckMsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsYUFBRSxDQUFDLENBQUMsQ0FBQztRQUMzRixPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBRUQsS0FBSyxDQUFDLHFCQUFxQixDQUFDLFlBQWtCO1FBQzVDLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsMkJBQTJCLEVBQUUsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLGFBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbkcsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVELEtBQUssQ0FBQyxrQ0FBa0MsQ0FBQyxZQUFrQixFQUFFLFNBQWlCO1FBQzVFLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQzdDLDJDQUEyQyxFQUMzQyxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsRUFDekIsQ0FBQyxhQUFFLENBQUMsQ0FDTCxDQUFDO1FBQ0YsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVELEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxJQUFnQjtRQUMxQyxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLDRCQUE0QixFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVGLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFRCxLQUFLLENBQUMsZ0JBQWdCO1FBQ3BCLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsb0JBQW9CLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzlFLE9BQU87SUFDVCxDQUFDO0lBRUQsS0FBSyxDQUFDLGdCQUFnQixDQUFDLElBQVEsRUFBRSxLQUFTO1FBQ3hDLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxhQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzNGLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFRCxLQUFLLENBQUMsb0JBQW9CLENBQUMsWUFBa0I7UUFDM0MsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsYUFBRSxDQUFDLENBQUMsQ0FBQztRQUNoRyxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBRUQsS0FBSyxDQUFDLGlDQUFpQyxDQUFDLFlBQWtCLEVBQUUsU0FBaUI7UUFDM0UsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FDN0Msd0NBQXdDLEVBQ3hDLENBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBQyxFQUN6QixDQUFDLGFBQUUsQ0FBQyxDQUNMLENBQUM7UUFDRixPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBRUQsS0FBSyxDQUFDLGtCQUFrQixDQUFDLElBQVU7UUFDakMsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBQSw2QkFBa0IsRUFBQyxhQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0csT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVELEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBZ0I7UUFDNUIsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLG1CQUFRLENBQUMsQ0FBQyxDQUFDO1FBQy9FLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFRCxLQUFLLENBQUMsY0FBYyxDQUFDLElBQWdCO1FBQ25DLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbkYsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVELEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxVQUFjO1FBQzFDLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsNEJBQTRCLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLGdCQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3JHLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFRCxLQUFLLENBQUMsc0JBQXNCLENBQUMsZUFBc0I7UUFDakQsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQywyQkFBMkIsRUFBRSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsZ0JBQUssQ0FBQyxDQUFDLENBQUM7UUFDekcsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVELEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxPQUFtQixFQUFFLFVBQWM7UUFDakUsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FDN0MsNkJBQTZCLEVBQzdCLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxFQUNyQixDQUFDLG1CQUFRLEVBQUUsbUJBQVEsQ0FBQyxDQUNyQixDQUFDO1FBQ0YsT0FBTyxNQUFhLENBQUM7SUFDdkIsQ0FBQztJQUVELEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxPQUFtQixFQUFFLE1BQWEsRUFBRSxJQUFjLEVBQUUsSUFBYztRQUM3RixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUM3QywwQkFBMEIsRUFDMUIsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFDN0IsQ0FBQyxJQUFBLDJCQUFnQixHQUFFLENBQUMsQ0FDckIsQ0FBQztRQUNGLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFRCxLQUFLLENBQUMsc0NBQXNDLENBQUMsVUFBYztRQUN6RCxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUM3Qyw2Q0FBNkMsRUFDN0MsQ0FBQyxVQUFVLENBQUMsRUFDWixDQUFDLG9CQUFTLENBQUMsQ0FDWixDQUFDO1FBQ0YsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVELEtBQUssQ0FBQyw4Q0FBOEMsQ0FBQyxlQUE0QjtRQUMvRSxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUM3QyxzREFBc0QsRUFDdEQsQ0FBQyxlQUFlLENBQUMsRUFDakIsQ0FBQyxnQkFBSyxFQUFFLElBQUEsMkJBQWdCLEdBQUUsQ0FBQyxDQUM1QixDQUFDO1FBQ0YsT0FBTyxNQUFhLENBQUM7SUFDdkIsQ0FBQztJQUVELEtBQUssQ0FBQyx1Q0FBdUM7UUFDM0MsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FDN0MsOENBQThDLEVBQzlDLEVBQUUsRUFDRixDQUFDLG9CQUFTLEVBQUUsb0JBQVMsQ0FBQyxDQUN2QixDQUFDO1FBQ0YsT0FBTyxNQUFhLENBQUM7SUFDdkIsQ0FBQztJQUVELEtBQUssQ0FBQyx1Q0FBdUMsQ0FDM0MsT0FBbUIsRUFDbkIsVUFBYyxFQUNkLHdCQUFtQyxFQUNuQyxnQkFBNkIsRUFDN0IsaUJBQThCO1FBRTlCLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQzdDLDhDQUE4QyxFQUM5QyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsd0JBQXdCLEVBQUUsZ0JBQWdCLEVBQUUsaUJBQWlCLENBQUMsRUFDcEYsQ0FBQyxhQUFFLEVBQUUsSUFBQSwyQkFBZ0IsR0FBRSxDQUFDLENBQ3pCLENBQUM7UUFDRixPQUFPLE1BQWEsQ0FBQztJQUN2QixDQUFDO0lBRUQsS0FBSyxDQUFDLGdDQUFnQyxDQUNwQyxPQUFtQixFQUNuQixnQkFBNkIsRUFDN0IsV0FBd0IsRUFDeEIsV0FBaUI7UUFFakIsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FDN0MscUNBQXFDLEVBQ3JDLENBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFdBQVcsRUFBRSxXQUFXLENBQUMsRUFDckQsQ0FBQyxtQkFBUSxFQUFFLG1CQUFRLEVBQUUsSUFBQSwyQkFBZ0IsR0FBRSxDQUFDLENBQ3pDLENBQUM7UUFDRixPQUFPLE1BQWEsQ0FBQztJQUN2QixDQUFDO0lBRUQsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFxQixFQUFFLFNBQWlCLEVBQUUsVUFBc0I7UUFDL0UsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFVBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3hHLE9BQU87SUFDVCxDQUFDO0lBRUQsS0FBSyxDQUFDLGtDQUFrQztRQUN0QyxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUM3Qyx5Q0FBeUMsRUFDekMsRUFBRSxFQUNGLENBQUMsSUFBQSwyQkFBZ0IsR0FBRSxDQUFDLENBQ3JCLENBQUM7UUFDRixPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBRUQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFlLEVBQUUsVUFBa0I7UUFDbkQsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFBLDZCQUFrQixHQUFFLENBQUMsQ0FBQyxDQUFDO1FBQy9HLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFRCxLQUFLLENBQUMsZUFBZTtRQUNuQixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLG1CQUFtQixFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM3RSxPQUFPO0lBQ1QsQ0FBQztJQUVELEtBQUssQ0FBQyxTQUFTO1FBQ2IsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3RFLE9BQU87SUFDVCxDQUFDO0lBRUQsS0FBSyxDQUFDLHVCQUF1QixDQUFDLFdBQW1CO1FBQy9DLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsNEJBQTRCLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNqRyxPQUFPO0lBQ1QsQ0FBQztJQUVELEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxtQkFBK0I7UUFDdkQsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FDN0Msd0JBQXdCLEVBQ3hCLENBQUMsbUJBQW1CLENBQUMsRUFDckIsQ0FBQyxJQUFBLDZCQUFrQixHQUFFLEVBQUUsSUFBQSw2QkFBa0IsR0FBRSxFQUFFLElBQUEsNkJBQWtCLEdBQUUsQ0FBQyxDQUNuRSxDQUFDO1FBQ0YsT0FBTyxNQUFhLENBQUM7SUFDdkIsQ0FBQztJQUVELEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxRQUFnQjtRQUN4QyxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLHdCQUF3QixFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxjQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzdGLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFRCxLQUFLLENBQUMsc0JBQXNCLENBQUMsZUFBb0I7UUFDL0MsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQywyQkFBMkIsRUFBRSxDQUFDLGVBQWUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3BHLE9BQU87SUFDVCxDQUFDO0lBRUQsS0FBSyxDQUFDLGlCQUFpQixDQUFDLGVBQW9CLEVBQUUsbUJBQStCLEVBQUUsUUFBZ0I7UUFDN0YsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FDN0MscUJBQXFCLEVBQ3JCLENBQUMsZUFBZSxFQUFFLG1CQUFtQixFQUFFLFFBQVEsQ0FBQyxFQUNoRCxFQUFFLENBQ0gsQ0FBQztRQUNGLE9BQU87SUFDVCxDQUFDO0lBRUQsS0FBSyxDQUFDLGtCQUFrQixDQUFDLGVBQW9CLEVBQUUsbUJBQStCO1FBQzVFLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQzdDLHVCQUF1QixFQUN2QixDQUFDLGVBQWUsRUFBRSxtQkFBbUIsQ0FBQyxFQUN0QyxFQUFFLENBQ0gsQ0FBQztRQUNGLE9BQU87SUFDVCxDQUFDO0lBRUQsS0FBSyxDQUFDLGVBQWUsQ0FDbkIsZUFBb0IsRUFDcEIsbUJBQStCLEVBQy9CLFVBQXNCLEVBQ3RCLFdBQW9CO1FBRXBCLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQzdDLG1CQUFtQixFQUNuQixDQUFDLGVBQWUsRUFBRSxtQkFBbUIsRUFBRSxVQUFVLEVBQUUsV0FBVyxDQUFDLEVBQy9ELENBQUMsSUFBQSw2QkFBa0IsR0FBRSxDQUFDLENBQ3ZCLENBQUM7UUFDRixPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBRUQsS0FBSyxDQUFDLHVCQUF1QixDQUFDLGVBQW9CLEVBQUUsS0FBaUI7UUFDbkUsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyw0QkFBNEIsRUFBRSxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM1RyxPQUFPO0lBQ1QsQ0FBQztJQUVELEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxlQUFvQjtRQUNoRCxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLDRCQUE0QixFQUFFLENBQUMsZUFBZSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDckcsT0FBTztJQUNULENBQUM7SUFFRCxLQUFLLENBQUMsc0JBQXNCLENBQUMsZUFBb0I7UUFDL0MsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FDN0MsMkJBQTJCLEVBQzNCLENBQUMsZUFBZSxDQUFDLEVBQ2pCLENBQUMsSUFBQSw2QkFBa0IsR0FBRSxDQUFDLENBQ3ZCLENBQUM7UUFDRixPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBRUQsS0FBSyxDQUFDLGVBQWUsQ0FBQyxlQUFvQixFQUFFLFFBQW9CLEVBQUUsV0FBb0I7UUFDcEYsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FDN0MsbUJBQW1CLEVBQ25CLENBQUMsZUFBZSxFQUFFLFFBQVEsRUFBRSxXQUFXLENBQUMsRUFDeEMsQ0FBQyxJQUFBLDJCQUFnQixHQUFFLENBQUMsQ0FDckIsQ0FBQztRQUNGLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFRCxLQUFLLENBQUMsdUJBQXVCLENBQUMsZUFBb0I7UUFDaEQsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FDN0MsNEJBQTRCLEVBQzVCLENBQUMsZUFBZSxDQUFDLEVBQ2pCLENBQUMsSUFBQSw2QkFBa0IsR0FBRSxDQUFDLENBQ3ZCLENBQUM7UUFDRixPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBRUQsS0FBSyxDQUFDLDRCQUE0QixDQUNoQyxlQUFvQixFQUNwQixRQUFvQixFQUNwQixvQkFBNEI7UUFFNUIsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FDN0Msa0NBQWtDLEVBQ2xDLENBQUMsZUFBZSxFQUFFLFFBQVEsRUFBRSxvQkFBb0IsQ0FBQyxFQUNqRCxDQUFDLElBQUEsNkJBQWtCLEVBQUMsYUFBRSxDQUFDLENBQUMsQ0FDekIsQ0FBQztRQUNGLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFRCxLQUFLLENBQUMsc0NBQXNDLENBQUMsZUFBb0I7UUFDL0QsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FDN0MsNkNBQTZDLEVBQzdDLENBQUMsZUFBZSxDQUFDLEVBQ2pCLENBQUMsSUFBQSw2QkFBa0IsRUFBQyxhQUFFLENBQUMsRUFBRSxhQUFFLENBQUMsQ0FDN0IsQ0FBQztRQUNGLE9BQU8sTUFBYSxDQUFDO0lBQ3ZCLENBQUM7Q0FDRjtBQTNVRCwwQ0EyVUM7QUFFRCxNQUFhLG1CQUFtQjtJQUM5QixZQUFtQixNQUE4QjtRQUE5QixXQUFNLEdBQU4sTUFBTSxDQUF3QjtJQUFHLENBQUM7SUFFckQsS0FBSyxDQUFDLE9BQU87UUFDWCxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRCxZQUFZO1FBQ1YsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3JFLE9BQU87SUFDVCxDQUFDO0lBRUQsc0JBQXNCLENBQUMsSUFBUSxFQUFFLEtBQVM7UUFDeEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsNEJBQTRCLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxhQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzdGLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFRCw2QkFBNkIsQ0FBQyxJQUFRLEVBQUUsS0FBUztRQUMvQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxvQ0FBb0MsRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLGFBQUUsQ0FBQyxDQUFDLENBQUM7UUFDckcsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVELGdCQUFnQixDQUFDLFlBQWtCO1FBQ2pDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLHFCQUFxQixFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxhQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZGLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFRCx1QkFBdUIsQ0FBQyxZQUFrQjtRQUN4QyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyw2QkFBNkIsRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsYUFBRSxDQUFDLENBQUMsQ0FBQztRQUMvRixPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBRUQsNkJBQTZCLENBQUMsWUFBa0IsRUFBRSxTQUFpQjtRQUNqRSxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxxQ0FBcUMsRUFBRSxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsRUFBRSxDQUFDLGFBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEgsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVELGNBQWMsQ0FBQyxZQUFrQjtRQUMvQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsYUFBRSxDQUFDLENBQUMsQ0FBQztRQUNyRixPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBRUQscUJBQXFCLENBQUMsWUFBa0I7UUFDdEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsMkJBQTJCLEVBQUUsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLGFBQUUsQ0FBQyxDQUFDLENBQUM7UUFDN0YsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVELGtDQUFrQyxDQUFDLFlBQWtCLEVBQUUsU0FBaUI7UUFDdEUsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQ3ZDLDJDQUEyQyxFQUMzQyxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsRUFDekIsQ0FBQyxhQUFFLENBQUMsQ0FDTCxDQUFDO1FBQ0YsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVELHFCQUFxQixDQUFDLElBQWdCO1FBQ3BDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLDRCQUE0QixFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3RGLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFRCxnQkFBZ0I7UUFDZCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDeEUsT0FBTztJQUNULENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxJQUFRLEVBQUUsS0FBUztRQUNsQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLGFBQUUsQ0FBQyxDQUFDLENBQUM7UUFDckYsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVELG9CQUFvQixDQUFDLFlBQWtCO1FBQ3JDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLHdCQUF3QixFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxhQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzFGLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFRCxpQ0FBaUMsQ0FBQyxZQUFrQixFQUFFLFNBQWlCO1FBQ3JFLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUN2Qyx3Q0FBd0MsRUFDeEMsQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDLEVBQ3pCLENBQUMsYUFBRSxDQUFDLENBQ0wsQ0FBQztRQUNGLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxJQUFVO1FBQzNCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLHVCQUF1QixFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFBLDZCQUFrQixFQUFDLGFBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyRyxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBRUQsT0FBTyxDQUFDLElBQWdCO1FBQ3RCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsbUJBQVEsQ0FBQyxDQUFDLENBQUM7UUFDekUsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVELGNBQWMsQ0FBQyxJQUFnQjtRQUM3QixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBRSxDQUFDLENBQUMsQ0FBQztRQUM3RSxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBRUQsdUJBQXVCLENBQUMsVUFBYztRQUNwQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyw0QkFBNEIsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsZ0JBQUssQ0FBQyxDQUFDLENBQUM7UUFDL0YsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVELHNCQUFzQixDQUFDLGVBQXNCO1FBQzNDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLDJCQUEyQixFQUFFLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxnQkFBSyxDQUFDLENBQUMsQ0FBQztRQUNuRyxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBRUQseUJBQXlCLENBQUMsT0FBbUIsRUFBRSxVQUFjO1FBQzNELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUN2Qyw2QkFBNkIsRUFDN0IsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLEVBQ3JCLENBQUMsbUJBQVEsRUFBRSxtQkFBUSxDQUFDLENBQ3JCLENBQUM7UUFDRixPQUFPLE1BQWEsQ0FBQztJQUN2QixDQUFDO0lBRUQsc0JBQXNCLENBQUMsT0FBbUIsRUFBRSxNQUFhLEVBQUUsSUFBYyxFQUFFLElBQWM7UUFDdkYsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQ3ZDLDBCQUEwQixFQUMxQixDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUM3QixDQUFDLElBQUEsMkJBQWdCLEdBQUUsQ0FBQyxDQUNyQixDQUFDO1FBQ0YsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVELHNDQUFzQyxDQUFDLFVBQWM7UUFDbkQsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsNkNBQTZDLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLG9CQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ3BILE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFRCw4Q0FBOEMsQ0FBQyxlQUE0QjtRQUN6RSxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FDdkMsc0RBQXNELEVBQ3RELENBQUMsZUFBZSxDQUFDLEVBQ2pCLENBQUMsZ0JBQUssRUFBRSxJQUFBLDJCQUFnQixHQUFFLENBQUMsQ0FDNUIsQ0FBQztRQUNGLE9BQU8sTUFBYSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCx1Q0FBdUM7UUFDckMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQ3ZDLDhDQUE4QyxFQUM5QyxFQUFFLEVBQ0YsQ0FBQyxvQkFBUyxFQUFFLG9CQUFTLENBQUMsQ0FDdkIsQ0FBQztRQUNGLE9BQU8sTUFBYSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCx1Q0FBdUMsQ0FDckMsT0FBbUIsRUFDbkIsVUFBYyxFQUNkLHdCQUFtQyxFQUNuQyxnQkFBNkIsRUFDN0IsaUJBQThCO1FBRTlCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUN2Qyw4Q0FBOEMsRUFDOUMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLHdCQUF3QixFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixDQUFDLEVBQ3BGLENBQUMsYUFBRSxFQUFFLElBQUEsMkJBQWdCLEdBQUUsQ0FBQyxDQUN6QixDQUFDO1FBQ0YsT0FBTyxNQUFhLENBQUM7SUFDdkIsQ0FBQztJQUVELGdDQUFnQyxDQUM5QixPQUFtQixFQUNuQixnQkFBNkIsRUFDN0IsV0FBd0IsRUFDeEIsV0FBaUI7UUFFakIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQ3ZDLHFDQUFxQyxFQUNyQyxDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxXQUFXLEVBQUUsV0FBVyxDQUFDLEVBQ3JELENBQUMsbUJBQVEsRUFBRSxtQkFBUSxFQUFFLElBQUEsMkJBQWdCLEdBQUUsQ0FBQyxDQUN6QyxDQUFDO1FBQ0YsT0FBTyxNQUFhLENBQUM7SUFDdkIsQ0FBQztJQUVELFVBQVUsQ0FBQyxTQUFxQixFQUFFLFNBQWlCLEVBQUUsVUFBc0I7UUFDekUsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsY0FBYyxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNsRyxPQUFPO0lBQ1QsQ0FBQztJQUVELGtDQUFrQztRQUNoQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyx5Q0FBeUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxJQUFBLDJCQUFnQixHQUFFLENBQUMsQ0FBQyxDQUFDO1FBQy9HLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBZSxFQUFFLFVBQWtCO1FBQzdDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLGNBQWMsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUEsNkJBQWtCLEdBQUUsQ0FBQyxDQUFDLENBQUM7UUFDekcsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVELGVBQWU7UUFDYixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdkUsT0FBTztJQUNULENBQUM7SUFFRCxTQUFTO1FBQ1AsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNoRSxPQUFPO0lBQ1QsQ0FBQztJQUVELHVCQUF1QixDQUFDLFdBQW1CO1FBQ3pDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLDRCQUE0QixFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDM0YsT0FBTztJQUNULENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxtQkFBK0I7UUFDakQsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQ3ZDLHdCQUF3QixFQUN4QixDQUFDLG1CQUFtQixDQUFDLEVBQ3JCLENBQUMsSUFBQSw2QkFBa0IsR0FBRSxFQUFFLElBQUEsNkJBQWtCLEdBQUUsRUFBRSxJQUFBLDZCQUFrQixHQUFFLENBQUMsQ0FDbkUsQ0FBQztRQUNGLE9BQU8sTUFBYSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxRQUFnQjtRQUNsQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsY0FBRyxDQUFDLENBQUMsQ0FBQztRQUN2RixPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBRUQsc0JBQXNCLENBQUMsZUFBb0I7UUFDekMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsMkJBQTJCLEVBQUUsQ0FBQyxlQUFlLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM5RixPQUFPO0lBQ1QsQ0FBQztJQUVELGlCQUFpQixDQUFDLGVBQW9CLEVBQUUsbUJBQStCLEVBQUUsUUFBZ0I7UUFDdkYsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQ3ZDLHFCQUFxQixFQUNyQixDQUFDLGVBQWUsRUFBRSxtQkFBbUIsRUFBRSxRQUFRLENBQUMsRUFDaEQsRUFBRSxDQUNILENBQUM7UUFDRixPQUFPO0lBQ1QsQ0FBQztJQUVELGtCQUFrQixDQUFDLGVBQW9CLEVBQUUsbUJBQStCO1FBQ3RFLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLHVCQUF1QixFQUFFLENBQUMsZUFBZSxFQUFFLG1CQUFtQixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDL0csT0FBTztJQUNULENBQUM7SUFFRCxlQUFlLENBQ2IsZUFBb0IsRUFDcEIsbUJBQStCLEVBQy9CLFVBQXNCLEVBQ3RCLFdBQW9CO1FBRXBCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUN2QyxtQkFBbUIsRUFDbkIsQ0FBQyxlQUFlLEVBQUUsbUJBQW1CLEVBQUUsVUFBVSxFQUFFLFdBQVcsQ0FBQyxFQUMvRCxDQUFDLElBQUEsNkJBQWtCLEdBQUUsQ0FBQyxDQUN2QixDQUFDO1FBQ0YsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVELHVCQUF1QixDQUFDLGVBQW9CLEVBQUUsS0FBaUI7UUFDN0QsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsNEJBQTRCLEVBQUUsQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdEcsT0FBTztJQUNULENBQUM7SUFFRCx1QkFBdUIsQ0FBQyxlQUFvQjtRQUMxQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyw0QkFBNEIsRUFBRSxDQUFDLGVBQWUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQy9GLE9BQU87SUFDVCxDQUFDO0lBRUQsc0JBQXNCLENBQUMsZUFBb0I7UUFDekMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsMkJBQTJCLEVBQUUsQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLElBQUEsNkJBQWtCLEdBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEgsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVELGVBQWUsQ0FBQyxlQUFvQixFQUFFLFFBQW9CLEVBQUUsV0FBb0I7UUFDOUUsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQ3ZDLG1CQUFtQixFQUNuQixDQUFDLGVBQWUsRUFBRSxRQUFRLEVBQUUsV0FBVyxDQUFDLEVBQ3hDLENBQUMsSUFBQSwyQkFBZ0IsR0FBRSxDQUFDLENBQ3JCLENBQUM7UUFDRixPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBRUQsdUJBQXVCLENBQUMsZUFBb0I7UUFDMUMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsNEJBQTRCLEVBQUUsQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLElBQUEsNkJBQWtCLEdBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbkgsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVELDRCQUE0QixDQUFDLGVBQW9CLEVBQUUsUUFBb0IsRUFBRSxvQkFBNEI7UUFDbkcsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQ3ZDLGtDQUFrQyxFQUNsQyxDQUFDLGVBQWUsRUFBRSxRQUFRLEVBQUUsb0JBQW9CLENBQUMsRUFDakQsQ0FBQyxJQUFBLDZCQUFrQixFQUFDLGFBQUUsQ0FBQyxDQUFDLENBQ3pCLENBQUM7UUFDRixPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBRUQsc0NBQXNDLENBQUMsZUFBb0I7UUFDekQsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQ3ZDLDZDQUE2QyxFQUM3QyxDQUFDLGVBQWUsQ0FBQyxFQUNqQixDQUFDLElBQUEsNkJBQWtCLEVBQUMsYUFBRSxDQUFDLEVBQUUsYUFBRSxDQUFDLENBQzdCLENBQUM7UUFDRixPQUFPLE1BQWEsQ0FBQztJQUN2QixDQUFDO0NBQ0Y7QUEvU0Qsa0RBK1NDIn0=

/***/ }),

/***/ 630:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HeapAllocator = void 0;
const index_js_1 = __webpack_require__(456);
const index_js_2 = __webpack_require__(463);
/**
 * Keeps track of heap allocations so they can be easily freed.
 * The WASM memory layout has 1024 bytes of unused "scratch" space at the start (addresses 0-1023).
 * We can leverage this for IO rather than making expensive bb_malloc bb_free calls.
 * Heap allocations will be created for input/output args that don't fit into the scratch space.
 * Input and output args can use the same scratch space as it's assume all input reads will be performed before any
 * output writes are performed.
 */
class HeapAllocator {
    constructor(wasm) {
        this.wasm = wasm;
        this.allocs = [];
        this.inScratchRemaining = 1024;
        this.outScratchRemaining = 1024;
    }
    async copyToMemory(bufferable) {
        return await (0, index_js_2.asyncMap)(bufferable.map(index_js_1.serializeBufferable), async (buf) => {
            if (buf.length <= this.inScratchRemaining) {
                const ptr = (this.inScratchRemaining -= buf.length);
                await this.wasm.writeMemory(ptr, buf);
                return ptr;
            }
            else {
                const ptr = await this.wasm.call('bbmalloc', buf.length);
                await this.wasm.writeMemory(ptr, buf);
                this.allocs.push(ptr);
                return ptr;
            }
        });
    }
    async getOutputPtrs(objs) {
        return await (0, index_js_2.asyncMap)(objs, async (obj) => {
            // If the obj is variable length, we need a 4 byte ptr to write the serialized data address to.
            // WARNING: 4 only works with WASM as it has 32 bit memory.
            const size = obj.SIZE_IN_BYTES || 4;
            if (size <= this.outScratchRemaining) {
                return (this.outScratchRemaining -= size);
            }
            else {
                const ptr = await this.wasm.call('bbmalloc', size);
                this.allocs.push(ptr);
                return ptr;
            }
        });
    }
    addOutputPtr(ptr) {
        if (ptr >= 1024) {
            this.allocs.push(ptr);
        }
    }
    async freeAll() {
        for (const ptr of this.allocs) {
            await this.wasm.call('bbfree', ptr);
        }
    }
}
exports.HeapAllocator = HeapAllocator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhcF9hbGxvY2F0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYmFycmV0ZW5iZXJnX2JpbmRlci9oZWFwX2FsbG9jYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxvREFBb0Y7QUFFcEYsb0RBQWlEO0FBRWpEOzs7Ozs7O0dBT0c7QUFDSCxNQUFhLGFBQWE7SUFLeEIsWUFBb0IsSUFBK0M7UUFBL0MsU0FBSSxHQUFKLElBQUksQ0FBMkM7UUFKM0QsV0FBTSxHQUFhLEVBQUUsQ0FBQztRQUN0Qix1QkFBa0IsR0FBRyxJQUFJLENBQUM7UUFDMUIsd0JBQW1CLEdBQUcsSUFBSSxDQUFDO0lBRW1DLENBQUM7SUFFdkUsS0FBSyxDQUFDLFlBQVksQ0FBQyxVQUF3QjtRQUN6QyxPQUFPLE1BQU0sSUFBQSxtQkFBUSxFQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsOEJBQW1CLENBQUMsRUFBRSxLQUFLLEVBQUMsR0FBRyxFQUFDLEVBQUU7WUFDckUsSUFBSSxHQUFHLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtnQkFDekMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNwRCxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDdEMsT0FBTyxHQUFHLENBQUM7YUFDWjtpQkFBTTtnQkFDTCxNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3pELE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUN0QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdEIsT0FBTyxHQUFHLENBQUM7YUFDWjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBa0I7UUFDcEMsT0FBTyxNQUFNLElBQUEsbUJBQVEsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFDLEdBQUcsRUFBQyxFQUFFO1lBQ3RDLCtGQUErRjtZQUMvRiwyREFBMkQ7WUFDM0QsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLGFBQWEsSUFBSSxDQUFDLENBQUM7WUFFcEMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFO2dCQUNwQyxPQUFPLENBQUMsSUFBSSxDQUFDLG1CQUFtQixJQUFJLElBQUksQ0FBQyxDQUFDO2FBQzNDO2lCQUFNO2dCQUNMLE1BQU0sR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNuRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdEIsT0FBTyxHQUFHLENBQUM7YUFDWjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFlBQVksQ0FBQyxHQUFXO1FBQ3RCLElBQUksR0FBRyxJQUFJLElBQUksRUFBRTtZQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxPQUFPO1FBQ1gsS0FBSyxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQzdCLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ3JDO0lBQ0gsQ0FBQztDQUNGO0FBakRELHNDQWlEQyJ9

/***/ }),

/***/ 643:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HeapAllocatorSync = void 0;
const index_js_1 = __webpack_require__(456);
/**
 * Keeps track of heap allocations so they can be easily freed.
 * The WASM memory layout has 1024 bytes of unused "scratch" space at the start (addresses 0-1023).
 * We can leverage this for IO rather than making expensive bb_malloc bb_free calls.
 * Heap allocations will be created for input/output args that don't fit into the scratch space.
 * Input and output args can use the same scratch space as it's assume all input reads will be performed before any
 * output writes are performed.
 */
class HeapAllocatorSync {
    constructor(wasm) {
        this.wasm = wasm;
        this.allocs = [];
        this.inScratchRemaining = 1024;
        this.outScratchRemaining = 1024;
    }
    copyToMemory(bufferable) {
        return bufferable.map(index_js_1.serializeBufferable).map(buf => {
            if (buf.length <= this.inScratchRemaining) {
                const ptr = (this.inScratchRemaining -= buf.length);
                this.wasm.writeMemory(ptr, buf);
                return ptr;
            }
            else {
                const ptr = this.wasm.call('bbmalloc', buf.length);
                this.wasm.writeMemory(ptr, buf);
                this.allocs.push(ptr);
                return ptr;
            }
        });
    }
    getOutputPtrs(objs) {
        return objs.map(obj => {
            // If the obj is variable length, we need a 4 byte ptr to write the serialized data address to.
            // WARNING: 4 only works with WASM as it has 32 bit memory.
            const size = obj.SIZE_IN_BYTES || 4;
            if (size <= this.outScratchRemaining) {
                return (this.outScratchRemaining -= size);
            }
            else {
                const ptr = this.wasm.call('bbmalloc', size);
                this.allocs.push(ptr);
                return ptr;
            }
        });
    }
    addOutputPtr(ptr) {
        if (ptr >= 1024) {
            this.allocs.push(ptr);
        }
    }
    freeAll() {
        for (const ptr of this.allocs) {
            this.wasm.call('bbfree', ptr);
        }
    }
}
exports.HeapAllocatorSync = HeapAllocatorSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhcF9hbGxvY2F0b3Jfc3luYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iYXJyZXRlbmJlcmdfYmluZGVyL2hlYXBfYWxsb2NhdG9yX3N5bmMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsb0RBQW9GO0FBR3BGOzs7Ozs7O0dBT0c7QUFDSCxNQUFhLGlCQUFpQjtJQUs1QixZQUFvQixJQUFzQjtRQUF0QixTQUFJLEdBQUosSUFBSSxDQUFrQjtRQUpsQyxXQUFNLEdBQWEsRUFBRSxDQUFDO1FBQ3RCLHVCQUFrQixHQUFHLElBQUksQ0FBQztRQUMxQix3QkFBbUIsR0FBRyxJQUFJLENBQUM7SUFFVSxDQUFDO0lBRTlDLFlBQVksQ0FBQyxVQUF3QjtRQUNuQyxPQUFPLFVBQVUsQ0FBQyxHQUFHLENBQUMsOEJBQW1CLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDbkQsSUFBSSxHQUFHLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtnQkFDekMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNwRCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ2hDLE9BQU8sR0FBRyxDQUFDO2FBQ1o7aUJBQU07Z0JBQ0wsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDbkQsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdEIsT0FBTyxHQUFHLENBQUM7YUFDWjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGFBQWEsQ0FBQyxJQUFrQjtRQUM5QixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDcEIsK0ZBQStGO1lBQy9GLDJEQUEyRDtZQUMzRCxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsYUFBYSxJQUFJLENBQUMsQ0FBQztZQUVwQyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7Z0JBQ3BDLE9BQU8sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLElBQUksSUFBSSxDQUFDLENBQUM7YUFDM0M7aUJBQU07Z0JBQ0wsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUM3QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdEIsT0FBTyxHQUFHLENBQUM7YUFDWjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFlBQVksQ0FBQyxHQUFXO1FBQ3RCLElBQUksR0FBRyxJQUFJLElBQUksRUFBRTtZQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQztJQUVELE9BQU87UUFDTCxLQUFLLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQy9CO0lBQ0gsQ0FBQztDQUNGO0FBakRELDhDQWlEQyJ9

/***/ }),

/***/ 730:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BarretenbergBinderSync = exports.BarretenbergBinder = void 0;
const heap_allocator_js_1 = __webpack_require__(630);
const index_js_1 = __webpack_require__(463);
const heap_allocator_sync_js_1 = __webpack_require__(643);
/**
 * Calls a WASM export function, handles allocating/freeing of memory, and serializing/deserializing to types.
 *
 * Notes on function binding ABI:
 * All functions can have an arbitrary number of input and output args.
 * All arguments must be pointers.
 * Input args are determined by being const or pointer to const.
 * Output args must come after input args.
 * All input data is big-endian.
 * All output data is big-endian, except output heap alloc pointers.
 * As integer types are converted to/from big-endian form, we shouldn't have to worry about memory alignment. (SURE?)
 * All functions should return void.
 * This binding function is responsible for allocating argument memory (including output memory).
 * Variable length output args are allocated on the heap, and the resulting pointer is written to the output arg ptr,
 * hence the above statement remains true.
 * Binding will free any variable length output args that were allocated on the heap.
 */
class BarretenbergBinder {
    constructor(wasm) {
        this.wasm = wasm;
    }
    async callWasmExport(funcName, inArgs, outTypes) {
        const alloc = new heap_allocator_js_1.HeapAllocator(this.wasm);
        const inPtrs = await alloc.copyToMemory(inArgs);
        const outPtrs = await alloc.getOutputPtrs(outTypes);
        await this.wasm.call(funcName, ...inPtrs, ...outPtrs);
        const outArgs = this.deserializeOutputArgs(outTypes, outPtrs, alloc);
        await alloc.freeAll();
        return outArgs;
    }
    deserializeOutputArgs(outTypes, outPtrs, alloc) {
        return (0, index_js_1.asyncMap)(outTypes, async (t, i) => {
            if (t.SIZE_IN_BYTES) {
                const slice = await this.wasm.getMemorySlice(outPtrs[i], outPtrs[i] + t.SIZE_IN_BYTES);
                return t.fromBuffer(slice);
            }
            const slice = await this.wasm.getMemorySlice(outPtrs[i], outPtrs[i] + 4);
            const ptr = new DataView(slice.buffer, slice.byteOffset, slice.byteLength).getUint32(0, true);
            alloc.addOutputPtr(ptr);
            return t.fromBuffer(await this.wasm.getMemorySlice(ptr));
        });
    }
}
exports.BarretenbergBinder = BarretenbergBinder;
class BarretenbergBinderSync {
    constructor(wasm) {
        this.wasm = wasm;
    }
    callWasmExport(funcName, inArgs, outTypes) {
        const alloc = new heap_allocator_sync_js_1.HeapAllocatorSync(this.wasm);
        const inPtrs = alloc.copyToMemory(inArgs);
        const outPtrs = alloc.getOutputPtrs(outTypes);
        this.wasm.call(funcName, ...inPtrs, ...outPtrs);
        const outArgs = this.deserializeOutputArgs(outTypes, outPtrs, alloc);
        alloc.freeAll();
        return outArgs;
    }
    deserializeOutputArgs(outTypes, outPtrs, alloc) {
        return outTypes.map((t, i) => {
            if (t.SIZE_IN_BYTES) {
                const slice = this.wasm.getMemorySlice(outPtrs[i], outPtrs[i] + t.SIZE_IN_BYTES);
                return t.fromBuffer(slice);
            }
            const slice = this.wasm.getMemorySlice(outPtrs[i], outPtrs[i] + 4);
            const ptr = new DataView(slice.buffer, slice.byteOffset, slice.byteLength).getUint32(0, true);
            alloc.addOutputPtr(ptr);
            return t.fromBuffer(this.wasm.getMemorySlice(ptr));
        });
    }
}
exports.BarretenbergBinderSync = BarretenbergBinderSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYmFycmV0ZW5iZXJnX2JpbmRlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwyREFBb0Q7QUFFcEQsb0RBQWlEO0FBQ2pELHFFQUE2RDtBQUU3RDs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUNILE1BQWEsa0JBQWtCO0lBQzdCLFlBQW1CLElBQStDO1FBQS9DLFNBQUksR0FBSixJQUFJLENBQTJDO0lBQUcsQ0FBQztJQUV0RSxLQUFLLENBQUMsY0FBYyxDQUFDLFFBQWdCLEVBQUUsTUFBb0IsRUFBRSxRQUFzQjtRQUNqRixNQUFNLEtBQUssR0FBRyxJQUFJLGlDQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNDLE1BQU0sTUFBTSxHQUFHLE1BQU0sS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoRCxNQUFNLE9BQU8sR0FBRyxNQUFNLEtBQUssQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEQsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQztRQUN0RCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNyRSxNQUFNLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN0QixPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBRU8scUJBQXFCLENBQUMsUUFBc0IsRUFBRSxPQUFpQixFQUFFLEtBQW9CO1FBQzNGLE9BQU8sSUFBQSxtQkFBUSxFQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxDQUFDLGFBQWEsRUFBRTtnQkFDbkIsTUFBTSxLQUFLLEdB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

/***/ }),

/***/ 640:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BarretenbergWasm = void 0;
const tslib_1 = __webpack_require__(582);
const events_1 = __webpack_require__(361);
const debug_1 = tslib_1.__importDefault(__webpack_require__(158));
const comlink_1 = __webpack_require__(375);
const index_js_1 = __webpack_require__(324);
const barretenberg_wasm_1 = __webpack_require__(319);
const debug = (0, debug_1.default)('bb.js:wasm');
events_1.EventEmitter.defaultMaxListeners = 30;
class BarretenbergWasm {
    constructor() {
        this.memStore = {};
        this.workers = [];
        this.remoteWasms = [];
        this.nextWorker = 0;
        this.nextThreadId = 1;
        this.isThread = false;
        this.logger = debug;
    }
    static async new() {
        const barretenberg = new BarretenbergWasm();
        await barretenberg.init(1);
        return barretenberg;
    }
    /**
     * Construct and initialise BarretenbergWasm within a Worker. Return both the worker and the wasm proxy.
     * Used when running in the browser, because we can't block the main thread.
     */
    static async newWorker(threads) {
        const worker = (0, barretenberg_wasm_1.createWorker)();
        const wasm = (0, barretenberg_wasm_1.getRemoteBarretenbergWasm)(worker);
        await wasm.init(threads, (0, comlink_1.proxy)(debug));
        return { worker, wasm };
    }
    getNumThreads() {
        return this.workers.length + 1;
    }
    /**
     * Init as main thread. Spawn child threads.
     */
    async init(threads = Math.min((0, barretenberg_wasm_1.getNumCpu)(), BarretenbergWasm.MAX_THREADS), logger = debug, initial = 25, maximum = 2 ** 16) {
        this.logger = logger;
        const initialMb = (initial * 2 ** 16) / (1024 * 1024);
        const maxMb = (maximum * 2 ** 16) / (1024 * 1024);
        this.logger(`initial mem: ${initial} pages, ${initialMb}MiB. ` +
            `max mem: ${maximum} pages, ${maxMb}MiB. ` +
            `threads: ${threads}`);
        this.memory = new WebAssembly.Memory({ initial, maximum, shared: threads > 1 });
        // Annoyingly the wasm declares if it's memory is shared or not. So now we need two wasms if we want to be
        // able to fallback on "non shared memory" situations.
        const code = await (0, barretenberg_wasm_1.fetchCode)(threads > 1 ? 'barretenberg-threads.wasm' : 'barretenberg.wasm');
        const { instance, module } = await WebAssembly.instantiate(code, this.getImportObj(this.memory));
        this.instance = instance;
        // Init all global/static data.
        this.call('_initialize');
        // Create worker threads. Create 1 less than requested, as main thread counts as a thread.
        this.logger('creating worker threads...');
        this.workers = (await Promise.all(Array.from({ length: threads - 1 }).map(barretenberg_wasm_1.createWorker)));
        this.remoteWasms = await Promise.all(this.workers.map(barretenberg_wasm_1.getRemoteBarretenbergWasm));
        await Promise.all(this.remoteWasms.map(w => w.initThread(module, this.memory)));
        this.logger('init complete.');
    }
    /**
     * Init as worker thread.
     */
    async initThread(module, memory) {
        this.isThread = true;
        this.logger = (0, barretenberg_wasm_1.threadLogger)() || this.logger;
        this.memory = memory;
        this.instance = await WebAssembly.instantiate(module, this.getImportObj(this.memory));
    }
    /**
     * Called on main thread. Signals child threads to gracefully exit.
     */
    async destroy() {
        await Promise.all(this.workers.map(w => w.terminate()));
    }
    getImportObj(memory) {
        /* eslint-disable camelcase */
        const importObj = {
            // We need to implement a part of the wasi api:
            // https://github.com/WebAssembly/WASI/blob/main/phases/snapshot/docs.md
            // We literally only need to support random_get, everything else is noop implementated in barretenberg.wasm.
            wasi_snapshot_preview1: {
                random_get: (out, length) => {
                    out = out >>> 0;
                    const randomData = (0, index_js_1.randomBytes)(length);
                    const mem = this.getMemory();
                    mem.set(randomData, out);
                },
                clock_time_get: (a1, a2, out) => {
                    out = out >>> 0;
                    const ts = BigInt(new Date().getTime()) * 1000000n;
                    const view = new DataView(this.getMemory().buffer);
                    view.setBigUint64(out, ts, true);
                },
                proc_exit: () => {
                    this.logger('HUNG: proc_exit was called. This is caused by unstable experimental wasi pthreads. Try again.');
                    this.logger(new Error().stack);
                    (0, barretenberg_wasm_1.killSelf)();
                },
            },
            wasi: {
                'thread-spawn': (arg) => {
                    arg = arg >>> 0;
                    const id = this.nextThreadId++;
                    const worker = this.nextWorker++ % this.remoteWasms.length;
                    // this.logger(`spawning thread ${id} on worker ${worker} with arg ${arg >>> 0}`);
                    this.remoteWasms[worker].call('wasi_thread_start', id, arg).catch(this.logger);
                    // this.remoteWasms[worker].postMessage({ msg: 'thread', data: { id, arg } });
                    return id;
                },
            },
            // These are functions implementations for imports we've defined are needed.
            // The native C++ build defines these in a module called "env". We must implement TypeScript versions here.
            env: {
                env_hardware_concurrency: () => {
                    // If there are no workers (we're already running as a worker, or the main thread requested no workers)
                    // then we return 1, which should cause any algos using threading to just not create a thread.
                    return this.remoteWasms.length + 1;
                },
                /**
                 * The 'info' call we use for logging in C++, calls this under the hood.
                 * The native code will just print to std:err (to avoid std::cout which is used for IPC).
                 * Here we just emit the log line for the client to decide what to do with.
                 */
                logstr: (addr) => {
                    const str = this.stringFromAddress(addr);
                    const m = this.getMemory();
                    const str2 = `${str} (mem: ${(m.length / (1024 * 1024)).toFixed(2)}MiB)`;
                    this.logger(str2);
                    if (str2.startsWith('WARNING:')) {
                        this.logger(new Error().stack);
                    }
                },
                get_data: (keyAddr, outBufAddr) => {
                    const key = this.stringFromAddress(keyAddr);
                    outBufAddr = outBufAddr >>> 0;
                    const data = this.memStore[key];
                    if (!data) {
                        this.logger(`get_data miss ${key}`);
                        return;
                    }
                    // this.logger(`get_data hit ${key} size: ${data.length} dest: ${outBufAddr}`);
                    // this.logger(Buffer.from(data.slice(0, 64)).toString('hex'));
                    this.writeMemory(outBufAddr, data);
                },
                set_data: (keyAddr, dataAddr, dataLength) => {
                    const key = this.stringFromAddress(keyAddr);
                    dataAddr = dataAddr >>> 0;
                    this.memStore[key] = this.getMemorySlice(dataAddr, dataAddr + dataLength).slice();
                    // this.logger(`set_data: ${key} length: ${dataLength}`);
                },
                memory,
            },
        };
        /* eslint-enable camelcase */
        return importObj;
    }
    exports() {
        return this.instance.exports;
    }
    /**
     * When returning values from the WASM, use >>> operator to convert signed representation to unsigned representation.
     */
    call(name, ...args) {
        if (!this.exports()[name]) {
            throw new Error(`WASM function ${name} not found.`);
        }
        try {
            return this.exports()[name](...args) >>> 0;
        }
        catch (err) {
            const message = `WASM function ${name} aborted, error: ${err}`;
            this.logger(message);
            this.logger(err.stack);
            if (this.isThread) {
                (0, barretenberg_wasm_1.killSelf)();
            }
            else {
                throw err;
            }
        }
    }
    memSize() {
        return this.getMemory().length;
    }
    getMemorySlice(start, end) {
        return this.getMemory().subarray(start, end);
    }
    writeMemory(offset, arr) {
        const mem = this.getMemory();
        mem.set(arr, offset);
    }
    // PRIVATE METHODS
    getMemory() {
        return new Uint8Array(this.memory.buffer);
    }
    stringFromAddress(addr) {
        addr = addr >>> 0;
        const m = this.getMemory();
        let i = addr;
        for (; m[i] !== 0; ++i)
            ;
        const textDecoder = new TextDecoder('ascii');
        return textDecoder.decode(m.slice(addr, i));
    }
}
exports.BarretenbergWasm = BarretenbergWasm;
BarretenbergWasm.MAX_THREADS = 32;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFycmV0ZW5iZXJnX3dhc20uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYmFycmV0ZW5iZXJnX3dhc20vYmFycmV0ZW5iZXJnX3dhc20udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLG1DQUFzQztBQUN0QywwREFBZ0M7QUFDaEMscUNBQXdDO0FBQ3hDLGlEQUFpRDtBQUNqRCxpRUFPbUM7QUFFbkMsTUFBTSxLQUFLLEdBQUcsSUFBQSxlQUFXLEVBQUMsWUFBWSxDQUFDLENBQUM7QUFFeEMscUJBQVksQ0FBQyxtQkFBbUIsR0FBRyxFQUFFLENBQUM7QUFFdEMsTUFBYSxnQkFBZ0I7SUFBN0I7UUFFVSxhQUFRLEdBQWtDLEVBQUUsQ0FBQztRQUc3QyxZQUFPLEdBQWEsRUFBRSxDQUFDO1FBQ3ZCLGdCQUFXLEdBQTZCLEVBQUUsQ0FBQztRQUMzQyxlQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsaUJBQVksR0FBRyxDQUFDLENBQUM7UUFDakIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixXQUFNLEdBQTBCLEtBQUssQ0FBQztJQTJOaEQsQ0FBQztJQXpOUSxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUc7UUFDckIsTUFBTSxZQUFZLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO1FBQzVDLE1BQU0sWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQixPQUFPLFlBQVksQ0FBQztJQUN0QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBZ0I7UUFDNUMsTUFBTSxNQUFNLEdBQUcsSUFBQSxnQ0FBWSxHQUFFLENBQUM7UUFDOUIsTUFBTSxJQUFJLEdBQUcsSUFBQSw2Q0FBeUIsRUFBQyxNQUFNLENBQUMsQ0FBQztRQUMvQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUEsZUFBSyxFQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7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

/***/ }),

/***/ 995:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(582);
tslib_1.__exportStar(__webpack_require__(640), exports);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYmFycmV0ZW5iZXJnX3dhc20vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaUVBQXVDIn0=

/***/ }),

/***/ 319:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.killSelf = exports.threadLogger = exports.getNumCpu = exports.getRemoteBarretenbergWasm = exports.createWorker = exports.fetchCode = void 0;
const tslib_1 = __webpack_require__(582);
const worker_threads_1 = __webpack_require__(267);
const path_1 = __webpack_require__(17);
const url_1 = __webpack_require__(310);
const promises_1 = __webpack_require__(292);
const os_1 = tslib_1.__importDefault(__webpack_require__(37));
const comlink_1 = __webpack_require__(375);
const node_endpoint_js_1 = __webpack_require__(575);
const fs_1 = __webpack_require__(147);
async function fetchCode(name) {
    const __dirname = (0, path_1.dirname)((0, url_1.fileURLToPath)("file:///mnt/user-data/jony/barretenberg/ts/src/barretenberg_wasm/node/index.ts"));
    return await (0, promises_1.readFile)(__dirname + `/../../${name}`);
}
exports.fetchCode = fetchCode;
function createWorker() {
    const __dirname = (0, path_1.dirname)((0, url_1.fileURLToPath)("file:///mnt/user-data/jony/barretenberg/ts/src/barretenberg_wasm/node/index.ts"));
    return new worker_threads_1.Worker(__dirname + `/worker.js`);
}
exports.createWorker = createWorker;
function getRemoteBarretenbergWasm(worker) {
    return (0, comlink_1.wrap)((0, node_endpoint_js_1.nodeEndpoint)(worker));
}
exports.getRemoteBarretenbergWasm = getRemoteBarretenbergWasm;
function getNumCpu() {
    return os_1.default.cpus().length;
}
exports.getNumCpu = getNumCpu;
/**
 * In node, the message passing is different to the browser. When using 'debug' in the browser, we seemingly always
 * get our logs, but in node it looks like it's dependent on the chain of workers from child to main thread be
 * unblocked. If one of our threads aborts, we can't see it as the parent is blocked waiting on threads to join.
 * To work around this in node, threads will by default write directly to stdout.
 */
function threadLogger() {
    return (msg) => {
        (0, fs_1.writeSync)(1, msg + '\n');
    };
}
exports.threadLogger = threadLogger;
function killSelf() {
    // Extordinarily hard process termination. Due to how parent threads block on child threads etc, even process.exit
    // doesn't seem to be able to abort the process. The following does.
    process.kill(process.pid);
    throw new Error();
}
exports.killSelf = killSelf;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYmFycmV0ZW5iZXJnX3dhc20vbm9kZS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsbURBQXdDO0FBQ3hDLCtCQUErQjtBQUMvQiw2QkFBb0M7QUFDcEMsMENBQXVDO0FBQ3ZDLG9EQUFvQjtBQUVwQixxQ0FBK0I7QUFDL0IseURBQWtEO0FBQ2xELDJCQUErQjtBQUV4QixLQUFLLFVBQVUsU0FBUyxDQUFDLElBQVk7SUFDMUMsTUFBTSxTQUFTLEdBQUcsSUFBQSxjQUFPLEVBQUMsSUFBQSxtQkFBYSxFQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMxRCxPQUFPLE1BQU0sSUFBQSxtQkFBUSxFQUFDLFNBQVMsR0FBRyxVQUFVLElBQUksRUFBRSxDQUFDLENBQUM7QUFDdEQsQ0FBQztBQUhELDhCQUdDO0FBRUQsU0FBZ0IsWUFBWTtJQUMxQixNQUFNLFNBQVMsR0FBRyxJQUFBLGNBQU8sRUFBQyxJQUFBLG1CQUFhLEVBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzFELE9BQU8sSUFBSSx1QkFBTSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUMsQ0FBQztBQUM5QyxDQUFDO0FBSEQsb0NBR0M7QUFFRCxTQUFnQix5QkFBeUIsQ0FBQyxNQUFjO0lBQ3RELE9BQU8sSUFBQSxjQUFJLEVBQW1CLElBQUEsK0JBQVksRUFBQyxNQUFNLENBQUMsQ0FBMkIsQ0FBQztBQUNoRixDQUFDO0FBRkQsOERBRUM7QUFFRCxTQUFnQixTQUFTO0lBQ3ZCLE9BQU8sWUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQztBQUMxQixDQUFDO0FBRkQsOEJBRUM7QUFFRDs7Ozs7R0FLRztBQUNILFNBQWdCLFlBQVk7SUFDMUIsT0FBTyxDQUFDLEdBQVcsRUFBRSxFQUFFO1FBQ3JCLElBQUEsY0FBUyxFQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDM0IsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUpELG9DQUlDO0FBRUQsU0FBZ0IsUUFBUTtJQUN0QixrSEFBa0g7SUFDbEgsb0VBQW9FO0lBQ3BFLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFCLE1BQU0sSUFBSSxLQUFLLEVBQUUsQ0FBQztBQUNwQixDQUFDO0FBTEQsNEJBS0MifQ==

/***/ }),

/***/ 575:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.nodeEndpoint = void 0;
function nodeEndpoint(nep) {
    const listeners = new WeakMap();
    return {
        postMessage: nep.postMessage.bind(nep),
        addEventListener: (_, eh) => {
            const l = (data) => {
                if ('handleEvent' in eh) {
                    eh.handleEvent({ data });
                }
                else {
                    eh({ data });
                }
            };
            nep.on('message', l);
            listeners.set(eh, l);
        },
        removeEventListener: (_, eh) => {
            const l = listeners.get(eh);
            if (!l) {
                return;
            }
            nep.off('message', l);
            listeners.delete(eh);
        },
        start: nep.start && nep.start.bind(nep),
    };
}
exports.nodeEndpoint = nodeEndpoint;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZV9lbmRwb2ludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iYXJyZXRlbmJlcmdfd2FzbS9ub2RlL25vZGVfZW5kcG9pbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsU0FBZ0IsWUFBWSxDQUFDLEdBQWlCO0lBQzVDLE1BQU0sU0FBUyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFDaEMsT0FBTztRQUNMLFdBQVcsRUFBRSxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDdEMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFNLEVBQUUsRUFBTyxFQUFFLEVBQUU7WUFDcEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFTLEVBQUUsRUFBRTtnQkFDdEIsSUFBSSxhQUFhLElBQUksRUFBRSxFQUFFO29CQUN2QixFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztpQkFDMUI7cUJBQU07b0JBQ0wsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztpQkFDZDtZQUNILENBQUMsQ0FBQztZQUNGLEdBQUcsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLENBQUM7UUFDRCxtQkFBbUIsRUFBRSxDQUFDLENBQU0sRUFBRSxFQUFPLEVBQUUsRUFBRTtZQUN2QyxNQUFNLENBQUMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxDQUFDLEVBQUU7Z0JBQ04sT0FBTzthQUNSO1lBQ0QsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdEIsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN2QixDQUFDO1FBQ0QsS0FBSyxFQUFFLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO0tBQ3hDLENBQUM7QUFDSixDQUFDO0FBekJELG9DQXlCQyJ9

/***/ }),

/***/ 255:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toBufferBE = exports.toBigIntBE = void 0;
function toBigIntBE(bytes) {
    // A Buffer in node, *is* a Uint8Array. We can't refuse it's type.
    // However the algo below only works on an actual Uint8Array, hence we make a new one to be safe.
    bytes = new Uint8Array(bytes);
    let bigint = BigInt(0);
    const view = new DataView(bytes.buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
        bigint = (bigint << BigInt(8)) + BigInt(view.getUint8(i));
    }
    return bigint;
}
exports.toBigIntBE = toBigIntBE;
function toBufferBE(value, byteLength = 32) {
    const bytes = new Uint8Array(byteLength);
    const view = new DataView(bytes.buffer);
    for (let i = 0; i < byteLength; i++) {
        view.setUint8(byteLength - i - 1, Number(value & BigInt(0xff)));
        value >>= BigInt(8);
    }
    return bytes;
}
exports.toBufferBE = toBufferBE;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYmlnaW50LWFycmF5L2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLFNBQWdCLFVBQVUsQ0FBQyxLQUFpQjtJQUMxQyxrRUFBa0U7SUFDbEUsaUdBQWlHO0lBQ2pHLEtBQUssR0FBRyxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QixJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkIsTUFBTSxJQUFJLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3hDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3pDLE1BQU0sR0FBRyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzNEO0lBQ0QsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQVZELGdDQVVDO0FBRUQsU0FBZ0IsVUFBVSxDQUFDLEtBQWEsRUFBRSxVQUFVLEdBQUcsRUFBRTtJQUN2RCxNQUFNLEtBQUssR0FBRyxJQUFJLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN6QyxNQUFNLElBQUksR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDeEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNuQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoRSxLQUFLLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3JCO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDO0FBUkQsZ0NBUUMifQ==

/***/ }),

/***/ 603:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Crs = void 0;
var crs_1 = __webpack_require__(596);
Object.defineProperty(exports, "Crs", ({ enumerable: true, get: function () { return crs_1.Crs; } }));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY3JzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1DQUFrQztBQUF6QiwwRkFBQSxHQUFHLE9BQUEifQ==

/***/ }),

/***/ 344:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NetCrs = void 0;
/**
 * Downloader for CRS from the web or local.
 */
class NetCrs {
    constructor(
    /**
     * The number of circuit gates.
     */
    numPoints) {
        this.numPoints = numPoints;
    }
    /**
     * Download the data.
     */
    async init() {
        await this.downloadG1Data();
        await this.downloadG2Data();
    }
    async downloadG1Data() {
        const g1Start = 28;
        const g1End = g1Start + this.numPoints * 64 - 1;
        const response = await fetch('https://aztec-ignition.s3.amazonaws.com/MAIN%20IGNITION/monomial/transcript00.dat', {
            headers: {
                Range: `bytes=${g1Start}-${g1End}`,
            },
            cache: 'force-cache',
        });
        return (this.data = new Uint8Array(await response.arrayBuffer()));
    }
    /**
     * Download the G2 points data.
     */
    async downloadG2Data() {
        const g2Start = 28 + 5040000 * 64;
        const g2End = g2Start + 128 - 1;
        const response2 = await fetch('https://aztec-ignition.s3.amazonaws.com/MAIN%20IGNITION/sealed/transcript00.dat', {
            headers: {
                Range: `bytes=${g2Start}-${g2End}`,
            },
            cache: 'force-cache',
        });
        return (this.g2Data = new Uint8Array(await response2.arrayBuffer()));
    }
    /**
     * G1 points data for prover key.
     * @returns The points data.
     */
    getG1Data() {
        return this.data;
    }
    /**
     * G2 points data for verification key.
     * @returns The points data.
     */
    getG2Data() {
        return this.g2Data;
    }
}
exports.NetCrs = NetCrs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0X2Nycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jcnMvbmV0X2Nycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQTs7R0FFRztBQUNILE1BQWEsTUFBTTtJQUlqQjtJQUNFOztPQUVHO0lBQ2EsU0FBaUI7UUFBakIsY0FBUyxHQUFULFNBQVMsQ0FBUTtJQUNoQyxDQUFDO0lBRUo7O09BRUc7SUFDSCxLQUFLLENBQUMsSUFBSTtRQUNSLE1BQU0sSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzVCLE1BQU0sSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCxLQUFLLENBQUMsY0FBYztRQUNsQixNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbkIsTUFBTSxLQUFLLEdBQUcsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUVoRCxNQUFNLFFBQVEsR0FBRyxNQUFNLEtBQUssQ0FBQyxtRkFBbUYsRUFBRTtZQUNoSCxPQUFPLEVBQUU7Z0JBQ1AsS0FBSyxFQUFFLFNBQVMsT0FBTyxJQUFJLEtBQUssRUFBRTthQUNuQztZQUNELEtBQUssRUFBRSxhQUFhO1NBQ3JCLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksVUFBVSxDQUFDLE1BQU0sUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLLENBQUMsY0FBYztRQUNsQixNQUFNLE9BQU8sR0FBRyxFQUFFLEdBQUcsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNsQyxNQUFNLEtBQUssR0FBRyxPQUFPLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUVoQyxNQUFNLFNBQVMsR0FBRyxNQUFNLEtBQUssQ0FBQyxpRkFBaUYsRUFBRTtZQUMvRyxPQUFPLEVBQUU7Z0JBQ1AsS0FBSyxFQUFFLFNBQVMsT0FBTyxJQUFJLEtBQUssRUFBRTthQUNuQztZQUNELEtBQUssRUFBRSxhQUFhO1NBQ3JCLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksVUFBVSxDQUFDLE1BQU0sU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsU0FBUztRQUNQLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNuQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsU0FBUztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0NBQ0Y7QUFqRUQsd0JBaUVDIn0=

/***/ }),

/***/ 664:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IgnitionFilesCrs = exports.SRS_DEV_PATH = void 0;
const fs_1 = __webpack_require__(147);
const promises_1 = __webpack_require__(292);
const path_1 = __webpack_require__(17);
const url_1 = __webpack_require__(310);
/**
 * The path to our SRS object, assuming that we are in barretenberg/ts folder.
 */
exports.SRS_DEV_PATH = (0, path_1.dirname)((0, url_1.fileURLToPath)("file:///mnt/user-data/jony/barretenberg/ts/src/crs/node/ignition_files_crs.ts")) + '/../../../cpp/srs_db/ignition/monomial';
/**
 * Downloader for CRS from a local file (for Node).
 */
class IgnitionFilesCrs {
    constructor(
    /**
     * The number of circuit gates.
     */
    numPoints, path = exports.SRS_DEV_PATH) {
        this.numPoints = numPoints;
        this.path = path;
    }
    static defaultExists() {
        return (0, fs_1.existsSync)(exports.SRS_DEV_PATH);
    }
    /**
     * Read the data file.
     */
    async init() {
        // We need this.numPoints number of g1 points.
        // numPoints should be circuitSize + 1.
        const g1Start = 28;
        const g1End = g1Start + this.numPoints * 64;
        const data = await (0, promises_1.readFile)(this.path + '/transcript00.dat');
        this.data = data.subarray(g1Start, g1End);
        this.g2Data = await (0, promises_1.readFile)(this.path + '/g2.dat');
    }
    /**
     * G1 points data for prover key.
     * @returns The points data.
     */
    getG1Data() {
        return this.data;
    }
    /**
     * G2 points data for verification key.
     * @returns The points data.
     */
    getG2Data() {
        return this.g2Data;
    }
}
exports.IgnitionFilesCrs = IgnitionFilesCrs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWduaXRpb25fZmlsZXNfY3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Nycy9ub2RlL2lnbml0aW9uX2ZpbGVzX2Nycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyQkFBZ0M7QUFDaEMsMENBQXVDO0FBQ3ZDLCtCQUErQjtBQUMvQiw2QkFBb0M7QUFFcEM7O0dBRUc7QUFDVSxRQUFBLFlBQVksR0FBRyxJQUFBLGNBQU8sRUFBQyxJQUFBLG1CQUFhLEVBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLHdDQUF3QyxDQUFDO0FBRS9HOztHQUVHO0FBQ0gsTUFBYSxnQkFBZ0I7SUFJM0I7SUFDRTs7T0FFRztJQUNhLFNBQWlCLEVBQ3pCLE9BQU8sb0JBQVk7UUFEWCxjQUFTLEdBQVQsU0FBUyxDQUFRO1FBQ3pCLFNBQUksR0FBSixJQUFJLENBQWU7SUFDMUIsQ0FBQztJQUVKLE1BQU0sQ0FBQyxhQUFhO1FBQ2xCLE9BQU8sSUFBQSxlQUFVLEVBQUMsb0JBQVksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRDs7T0FFRztJQUNILEtBQUssQ0FBQyxJQUFJO1FBQ1IsOENBQThDO1FBQzlDLHVDQUF1QztRQUN2QyxNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbkIsTUFBTSxLQUFLLEdBQUcsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBRTVDLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBQSxtQkFBUSxFQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsbUJBQW1CLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRTFDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxJQUFBLG1CQUFRLEVBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsU0FBUztRQUNQLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNuQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsU0FBUztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0NBQ0Y7QUE5Q0QsNENBOENDIn0=

/***/ }),

/***/ 596:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Crs = void 0;
const tslib_1 = __webpack_require__(582);
const net_crs_js_1 = __webpack_require__(344);
const ignition_files_crs_js_1 = __webpack_require__(664);
const fs_1 = __webpack_require__(147);
const promises_1 = __webpack_require__(292);
const debug_1 = tslib_1.__importDefault(__webpack_require__(158));
const debug = (0, debug_1.default)('bb.js:crs');
/**
 * Generic CRS finder utility class.
 */
class Crs {
    constructor(numPoints, path) {
        this.numPoints = numPoints;
        this.path = path;
    }
    static async new(numPoints) {
        const crs = new Crs(numPoints, './crs');
        await crs.init();
        return crs;
    }
    async init() {
        (0, fs_1.mkdirSync)(this.path, { recursive: true });
        const size = await (0, promises_1.readFile)(this.path + '/size', 'ascii').catch(() => undefined);
        if (size && +size >= this.numPoints) {
            debug(`using cached crs of size: ${size}`);
            return;
        }
        const crs = ignition_files_crs_js_1.IgnitionFilesCrs.defaultExists() ? new ignition_files_crs_js_1.IgnitionFilesCrs(this.numPoints) : new net_crs_js_1.NetCrs(this.numPoints);
        if (crs instanceof net_crs_js_1.NetCrs) {
            debug(`downloading crs of size: ${this.numPoints}`);
        }
        else {
            debug(`loading igntion file crs of size: ${this.numPoints}`);
        }
        await crs.init();
        (0, fs_1.writeFileSync)(this.path + '/size', this.numPoints.toString());
        (0, fs_1.writeFileSync)(this.path + '/g1.dat', crs.getG1Data());
        (0, fs_1.writeFileSync)(this.path + '/g2.dat', crs.getG2Data());
    }
    /**
     * G1 points data for prover key.
     * @returns The points data.
     */
    getG1Data() {
        return (0, fs_1.readFileSync)(this.path + '/g1.dat');
    }
    /**
     * G2 points data for verification key.
     * @returns The points data.
     */
    getG2Data() {
        return (0, fs_1.readFileSync)(this.path + '/g2.dat');
    }
}
exports.Crs = Crs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY3JzL25vZGUvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDhDQUF1QztBQUN2QyxtRUFBMkQ7QUFDM0QsMkJBQTREO0FBQzVELDBDQUF1QztBQUN2QywwREFBZ0M7QUFFaEMsTUFBTSxLQUFLLEdBQUcsSUFBQSxlQUFXLEVBQUMsV0FBVyxDQUFDLENBQUM7QUFFdkM7O0dBRUc7QUFDSCxNQUFhLEdBQUc7SUFDZCxZQUE0QixTQUFpQixFQUFrQixJQUFZO1FBQS9DLGNBQVMsR0FBVCxTQUFTLENBQVE7UUFBa0IsU0FBSSxHQUFKLElBQUksQ0FBUTtJQUFHLENBQUM7SUFFL0UsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBaUI7UUFDaEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2pCLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVELEtBQUssQ0FBQyxJQUFJO1FBQ1IsSUFBQSxjQUFTLEVBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzFDLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBQSxtQkFBUSxFQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNqRixJQUFJLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ25DLEtBQUssQ0FBQyw2QkFBNkIsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUMzQyxPQUFPO1NBQ1I7UUFFRCxNQUFNLEdBQUcsR0FBRyx3Q0FBZ0IsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSx3Q0FBZ0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksbUJBQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDakgsSUFBSSxHQUFHLFlBQVksbUJBQU0sRUFBRTtZQUN6QixLQUFLLENBQUMsNEJBQTRCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1NBQ3JEO2FBQU07WUFDTCxLQUFLLENBQUMscUNBQXFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1NBQzlEO1FBQ0QsTUFBTSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDakIsSUFBQSxrQkFBYSxFQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUM5RCxJQUFBLGtCQUFhLEVBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxTQUFTLEVBQUUsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7UUFDdEQsSUFBQSxrQkFBYSxFQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxFQUFFLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRDs7O09BR0c7SUFDSCxTQUFTO1FBQ1AsT0FBTyxJQUFBLGlCQUFZLEVBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsU0FBUztRQUNQLE9BQU8sSUFBQSxpQkFBWSxFQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDLENBQUM7SUFDN0MsQ0FBQztDQUNGO0FBNUNELGtCQTRDQyJ9

/***/ }),

/***/ 85:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.newBarretenbergApiAsync = exports.BarretenbergApiAsync = exports.newBarretenbergApiSync = void 0;
const index_js_1 = __webpack_require__(271);
const index_js_2 = __webpack_require__(730);
const index_js_3 = __webpack_require__(995);
/**
 * Returns a single threaded, synchronous, barretenberg api.
 * Can be used on the main thread to perform small light-weight requests like hashing etc.
 */
async function newBarretenbergApiSync() {
    return new index_js_1.BarretenbergApiSync(new index_js_2.BarretenbergBinderSync(await index_js_3.BarretenbergWasm.new()));
}
exports.newBarretenbergApiSync = newBarretenbergApiSync;
class BarretenbergApiAsync extends index_js_1.BarretenbergApi {
    constructor(worker, wasm) {
        super(new index_js_2.BarretenbergBinder(wasm));
        this.worker = worker;
        this.wasm = wasm;
    }
    async getNumThreads() {
        return await this.wasm.getNumThreads();
    }
    async destroy() {
        await this.wasm.destroy();
        await this.worker.terminate();
    }
}
exports.BarretenbergApiAsync = BarretenbergApiAsync;
/**
 * Returns a multi threaded, asynchronous, barretenberg api.
 * It runs in a worker, and so can be used within the browser to execute long running, multi-threaded requests
 * like proof construction etc.
 */
async function newBarretenbergApiAsync(threads) {
    const { wasm, worker } = await index_js_3.BarretenbergWasm.newWorker(threads);
    return new BarretenbergApiAsync(worker, wasm);
}
exports.newBarretenbergApiAsync = newBarretenbergApiAsync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZmFjdG9yeS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyREFBb0Y7QUFDcEYsOERBQTZGO0FBQzdGLDREQUF5RjtBQUV6Rjs7O0dBR0c7QUFDSSxLQUFLLFVBQVUsc0JBQXNCO0lBQzFDLE9BQU8sSUFBSSw4QkFBbUIsQ0FBQyxJQUFJLGlDQUFzQixDQUFDLE1BQU0sMkJBQWdCLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzNGLENBQUM7QUFGRCx3REFFQztBQUVELE1BQWEsb0JBQXFCLFNBQVEsMEJBQWU7SUFDdkQsWUFBb0IsTUFBVyxFQUFVLElBQTRCO1FBQ25FLEtBQUssQ0FBQyxJQUFJLDZCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFEbEIsV0FBTSxHQUFOLE1BQU0sQ0FBSztRQUFVLFNBQUksR0FBSixJQUFJLENBQXdCO0lBRXJFLENBQUM7SUFFRCxLQUFLLENBQUMsYUFBYTtRQUNqQixPQUFPLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQsS0FBSyxDQUFDLE9BQU87UUFDWCxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDMUIsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2hDLENBQUM7Q0FDRjtBQWJELG9EQWFDO0FBRUQ7Ozs7R0FJRztBQUNJLEtBQUssVUFBVSx1QkFBdUIsQ0FBQyxPQUFnQjtJQUM1RCxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxHQUFHLE1BQU0sMkJBQWdCLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ25FLE9BQU8sSUFBSSxvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDaEQsQ0FBQztBQUhELDBEQUdDIn0=

/***/ }),

/***/ 465:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RawBuffer = void 0;
const tslib_1 = __webpack_require__(582);
tslib_1.__exportStar(__webpack_require__(603), exports);
tslib_1.__exportStar(__webpack_require__(995), exports);
tslib_1.__exportStar(__webpack_require__(271), exports);
tslib_1.__exportStar(__webpack_require__(85), exports);
var index_js_1 = __webpack_require__(678);
Object.defineProperty(exports, "RawBuffer", ({ enumerable: true, get: function () { return index_js_1.RawBuffer; } }));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLHlEQUErQjtBQUMvQix1RUFBNkM7QUFDN0Msc0VBQTRDO0FBQzVDLDZEQUFtQztBQUNuQyw2Q0FBNkM7QUFBcEMscUdBQUEsU0FBUyxPQUFBIn0=

/***/ }),

/***/ 324:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(582);
tslib_1.__exportStar(__webpack_require__(98), exports);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcmFuZG9tL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlEQUErQiJ9

/***/ }),

/***/ 98:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.randomBytes = void 0;
const crypto_1 = __webpack_require__(113);
function randomBytes(len) {
    return new Uint8Array((0, crypto_1.randomBytes)(len));
}
exports.randomBytes = randomBytes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcmFuZG9tL25vZGUvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQTBEO0FBRTFELFNBQWdCLFdBQVcsQ0FBQyxHQUFXO0lBQ3JDLE9BQU8sSUFBSSxVQUFVLENBQUMsSUFBQSxvQkFBaUIsRUFBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ2hELENBQUM7QUFGRCxrQ0FFQyJ9

/***/ }),

/***/ 366:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BufferReader = void 0;
class BufferReader {
    constructor(buffer, offset = 0) {
        this.buffer = buffer;
        this.index = offset;
    }
    static asReader(bufferOrReader) {
        return bufferOrReader instanceof BufferReader ? bufferOrReader : new BufferReader(bufferOrReader);
    }
    readNumber() {
        const dataView = new DataView(this.buffer.buffer, this.buffer.byteOffset + this.index, 4);
        this.index += 4;
        return dataView.getUint32(0, false);
    }
    readBoolean() {
        this.index += 1;
        return Boolean(this.buffer.at(this.index - 1));
    }
    readBytes(n) {
        this.index += n;
        return this.buffer.slice(this.index - n, this.index);
    }
    readNumberVector() {
        return this.readVector({
            fromBuffer: (reader) => reader.readNumber(),
        });
    }
    readVector(itemDeserializer) {
        const size = this.readNumber();
        const result = new Array(size);
        for (let i = 0; i < size; i++) {
            result[i] = itemDeserializer.fromBuffer(this);
        }
        return result;
    }
    readArray(size, itemDeserializer) {
        const result = new Array(size);
        for (let i = 0; i < size; i++) {
            result[i] = itemDeserializer.fromBuffer(this);
        }
        return result;
    }
    readObject(deserializer) {
        return deserializer.fromBuffer(this);
    }
    peekBytes(n) {
        return this.buffer.subarray(this.index, n ? this.index + n : undefined);
    }
    readString() {
        return new TextDecoder().decode(this.readBuffer());
    }
    readBuffer() {
        const size = this.readNumber();
        return this.readBytes(size);
    }
    readMap(deserializer) {
        const numEntries = this.readNumber();
        const map = {};
        for (let i = 0; i < numEntries; i++) {
            const key = this.readString();
            const value = this.readObject(deserializer);
            map[key] = value;
        }
        return map;
    }
}
exports.BufferReader = BufferReader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVmZmVyX3JlYWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJpYWxpemUvYnVmZmVyX3JlYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFhLFlBQVk7SUFFdkIsWUFBb0IsTUFBa0IsRUFBRSxNQUFNLEdBQUcsQ0FBQztRQUE5QixXQUFNLEdBQU4sTUFBTSxDQUFZO1FBQ3BDLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO0lBQ3RCLENBQUM7SUFFTSxNQUFNLENBQUMsUUFBUSxDQUFDLGNBQXlDO1FBQzlELE9BQU8sY0FBYyxZQUFZLFlBQVksQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxJQUFJLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNwRyxDQUFDO0lBRU0sVUFBVTtRQUNmLE1BQU0sUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDMUYsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUM7UUFDaEIsT0FBTyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRU0sV0FBVztRQUNoQixJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztRQUNoQixPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVNLFNBQVMsQ0FBQyxDQUFTO1FBQ3hCLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxD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

/***/ }),

/***/ 456:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(582);
tslib_1.__exportStar(__webpack_require__(366), exports);
tslib_1.__exportStar(__webpack_require__(629), exports);
tslib_1.__exportStar(__webpack_require__(247), exports);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VyaWFsaXplL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZEQUFtQztBQUNuQywyREFBaUM7QUFDakMseURBQStCIn0=

/***/ }),

/***/ 629:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StringDeserializer = exports.BufferDeserializer = exports.VectorDeserializer = exports.NumberDeserializer = exports.BoolDeserializer = void 0;
const buffer_reader_js_1 = __webpack_require__(366);
function BoolDeserializer() {
    return {
        SIZE_IN_BYTES: 1,
        fromBuffer: (buf) => {
            const reader = buffer_reader_js_1.BufferReader.asReader(buf);
            return reader.readBoolean();
        },
    };
}
exports.BoolDeserializer = BoolDeserializer;
function NumberDeserializer() {
    return {
        SIZE_IN_BYTES: 4,
        fromBuffer: (buf) => {
            const reader = buffer_reader_js_1.BufferReader.asReader(buf);
            return reader.readNumber();
        },
    };
}
exports.NumberDeserializer = NumberDeserializer;
function VectorDeserializer(t) {
    return {
        fromBuffer: (buf) => {
            const reader = buffer_reader_js_1.BufferReader.asReader(buf);
            return reader.readVector(t);
        },
    };
}
exports.VectorDeserializer = VectorDeserializer;
function BufferDeserializer() {
    return {
        fromBuffer: (buf) => {
            const reader = buffer_reader_js_1.BufferReader.asReader(buf);
            return reader.readBuffer();
        },
    };
}
exports.BufferDeserializer = BufferDeserializer;
function StringDeserializer() {
    return {
        fromBuffer: (buf) => {
            const reader = buffer_reader_js_1.BufferReader.asReader(buf);
            return reader.readString();
        },
    };
}
exports.StringDeserializer = StringDeserializer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0X3R5cGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VyaWFsaXplL291dHB1dF90eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlEQUFrRDtBQU9sRCxTQUFnQixnQkFBZ0I7SUFDOUIsT0FBTztRQUNMLGFBQWEsRUFBRSxDQUFDO1FBQ2hCLFVBQVUsRUFBRSxDQUFDLEdBQThCLEVBQUUsRUFBRTtZQUM3QyxNQUFNLE1BQU0sR0FBRywrQkFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQyxPQUFPLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM5QixDQUFDO0tBQ0YsQ0FBQztBQUNKLENBQUM7QUFSRCw0Q0FRQztBQUVELFNBQWdCLGtCQUFrQjtJQUNoQyxPQUFPO1FBQ0wsYUFBYSxFQUFFLENBQUM7UUFDaEIsVUFBVSxFQUFFLENBQUMsR0FBOEIsRUFBRSxFQUFFO1lBQzdDLE1BQU0sTUFBTSxHQUFHLCtCQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzFDLE9BQU8sTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzdCLENBQUM7S0FDRixDQUFDO0FBQ0osQ0FBQztBQVJELGdEQVFDO0FBRUQsU0FBZ0Isa0JBQWtCLENBQUksQ0FBZ0I7SUFDcEQsT0FBTztRQUNMLFVBQVUsRUFBRSxDQUFDLEdBQThCLEVBQUUsRUFBRTtZQUM3QyxNQUFNLE1BQU0sR0FBRywrQkFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQyxPQUFPLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsQ0FBQztLQUNGLENBQUM7QUFDSixDQUFDO0FBUEQsZ0RBT0M7QUFFRCxTQUFnQixrQkFBa0I7SUFDaEMsT0FBTztRQUNMLFVBQVUsRUFBRSxDQUFDLEdBQThCLEVBQUUsRUFBRTtZQUM3QyxNQUFNLE1BQU0sR0FBRywrQkFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQyxPQUFPLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUM3QixDQUFDO0tBQ0YsQ0FBQztBQUNKLENBQUM7QUFQRCxnREFPQztBQUVELFNBQWdCLGtCQUFrQjtJQUNoQyxPQUFPO1FBQ0wsVUFBVSxFQUFFLENBQUMsR0FBOEIsRUFBRSxFQUFFO1lBQzdDLE1BQU0sTUFBTSxHQUFHLCtCQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzFDLE9BQU8sTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzdCLENBQUM7S0FDRixDQUFDO0FBQ0osQ0FBQztBQVBELGdEQU9DIn0=

/***/ }),

/***/ 247:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.serializeBufferable = exports.deserializeArrayFromVector = exports.serializeBufferArrayToVector = exports.deserializeField = exports.deserializeInt32 = exports.deserializeUInt32 = exports.deserializeBool = exports.deserializeBufferFromVector = exports.serializeDate = exports.deserializeBigInt = exports.serializeBigInt = exports.serializeBufferToVector = exports.uint8ArrayToHexString = exports.concatenateUint8Arrays = exports.numToUInt8 = exports.numToInt32BE = exports.numToUInt32BE = exports.numToUInt32LE = exports.boolToBuffer = void 0;
const raw_buffer_js_1 = __webpack_require__(867);
// For serializing bool.
function boolToBuffer(b) {
    const buf = new Uint8Array(1);
    buf[0] = b ? 1 : 0;
    return buf;
}
exports.boolToBuffer = boolToBuffer;
// For serializing numbers to 32 bit little-endian form.
function numToUInt32LE(n, bufferSize = 4) {
    const buf = new Uint8Array(bufferSize);
    new DataView(buf.buffer).setUint32(buf.byteLength - 4, n, true);
    return buf;
}
exports.numToUInt32LE = numToUInt32LE;
// For serializing numbers to 32 bit big-endian form.
function numToUInt32BE(n, bufferSize = 4) {
    const buf = new Uint8Array(bufferSize);
    new DataView(buf.buffer).setUint32(buf.byteLength - 4, n, false);
    return buf;
}
exports.numToUInt32BE = numToUInt32BE;
// For serializing signed numbers to 32 bit big-endian form.
function numToInt32BE(n, bufferSize = 4) {
    const buf = new Uint8Array(bufferSize);
    new DataView(buf.buffer).setInt32(buf.byteLength - 4, n, false);
    return buf;
}
exports.numToInt32BE = numToInt32BE;
// For serializing numbers to 8 bit form.
function numToUInt8(n) {
    const buf = new Uint8Array(1);
    buf[0] = n;
    return buf;
}
exports.numToUInt8 = numToUInt8;
function concatenateUint8Arrays(arrayOfUint8Arrays) {
    const totalLength = arrayOfUint8Arrays.reduce((prev, curr) => prev + curr.length, 0);
    const result = new Uint8Array(totalLength);
    let length = 0;
    for (const array of arrayOfUint8Arrays) {
        result.set(array, length);
        length += array.length;
    }
    return result;
}
exports.concatenateUint8Arrays = concatenateUint8Arrays;
function uint8ArrayToHexString(uint8Array) {
    return uint8Array.reduce((accumulator, byte) => accumulator + byte.toString(16).padStart(2, '0'), '');
}
exports.uint8ArrayToHexString = uint8ArrayToHexString;
// For serializing a buffer as a vector.
function serializeBufferToVector(buf) {
    return concatenateUint8Arrays([numToInt32BE(buf.length), buf]);
}
exports.serializeBufferToVector = serializeBufferToVector;
function serializeBigInt(n, width = 32) {
    const buf = new Uint8Array(width);
    for (let i = 0; i < width; i++) {
        buf[width - i - 1] = Number((n >> BigInt(i * 8)) & 0xffn);
    }
    return buf;
}
exports.serializeBigInt = serializeBigInt;
function deserializeBigInt(buf, offset = 0, width = 32) {
    let result = 0n;
    for (let i = 0; i < width; i++) {
        result = (result << BigInt(8)) | BigInt(buf[offset + i]);
    }
    return { elem: result, adv: width };
}
exports.deserializeBigInt = deserializeBigInt;
function serializeDate(date) {
    return serializeBigInt(BigInt(date.getTime()), 8);
}
exports.serializeDate = serializeDate;
function deserializeBufferFromVector(vector, offset = 0) {
    const length = new DataView(vector.buffer, vector.byteOffset + offset, 4).getUint32(0, false);
    const adv = 4 + length;
    const elem = vector.slice(offset + 4, offset + adv);
    return { elem, adv };
}
exports.deserializeBufferFromVector = deserializeBufferFromVector;
function deserializeBool(buf, offset = 0) {
    const adv = 1;
    const elem = buf[offset] !== 0;
    return { elem, adv };
}
exports.deserializeBool = deserializeBool;
function deserializeUInt32(buf, offset = 0) {
    const adv = 4;
    const elem = new DataView(buf.buffer, buf.byteOffset + offset, adv).getUint32(0, false);
    return { elem, adv };
}
exports.deserializeUInt32 = deserializeUInt32;
function deserializeInt32(buf, offset = 0) {
    const adv = 4;
    const elem = new DataView(buf.buffer, buf.byteOffset + offset, adv).getInt32(0, false);
    return { elem, adv };
}
exports.deserializeInt32 = deserializeInt32;
function deserializeField(buf, offset = 0) {
    const adv = 32;
    const elem = buf.slice(offset, offset + adv);
    return { elem, adv };
}
exports.deserializeField = deserializeField;
// For serializing an array of fixed length elements.
function serializeBufferArrayToVector(arr) {
    return concatenateUint8Arrays([numToUInt32BE(arr.length), ...arr.flat()]);
}
exports.serializeBufferArrayToVector = serializeBufferArrayToVector;
function deserializeArrayFromVector(deserialize, vector, offset = 0) {
    let pos = offset;
    const size = new DataView(vector.buffer, vector.byteOffset + pos, 4).getUint32(0, false);
    pos += 4;
    const arr = new Array(size);
    for (let i = 0; i < size; ++i) {
        const { elem, adv } = deserialize(vector, pos);
        pos += adv;
        arr[i] = elem;
    }
    return { elem: arr, adv: pos - offset };
}
exports.deserializeArrayFromVector = deserializeArrayFromVector;
/**
 * Serializes a list of objects contiguously for calling into wasm.
 * @param objs - Objects to serialize.
 * @returns A buffer list with the concatenation of all fields.
 */
function serializeBufferable(obj) {
    if (Array.isArray(obj)) {
        return serializeBufferArrayToVector(obj.map(serializeBufferable));
    }
    else if (obj instanceof raw_buffer_js_1.RawBuffer) {
        return obj;
    }
    else if (obj instanceof Uint8Array) {
        return serializeBufferToVector(obj);
    }
    else if (typeof obj === 'boolean') {
        return boolToBuffer(obj);
    }
    else if (typeof obj === 'number') {
        return numToUInt32BE(obj);
    }
    else if (typeof obj === 'bigint') {
        return serializeBigInt(obj);
    }
    else if (typeof obj === 'string') {
        return serializeBufferToVector(new TextEncoder().encode(obj));
    }
    else {
        return obj.toBuffer();
    }
}
exports.serializeBufferable = serializeBufferable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWFsaXplLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcmlhbGl6ZS9zZXJpYWxpemUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMERBQW1EO0FBRW5ELHdCQUF3QjtBQUN4QixTQUFnQixZQUFZLENBQUMsQ0FBVTtJQUNyQyxNQUFNLEdBQUcsR0FBRyxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5QixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQixPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFKRCxvQ0FJQztBQUVELHdEQUF3RDtBQUN4RCxTQUFnQixhQUFhLENBQUMsQ0FBUyxFQUFFLFVBQVUsR0FBRyxDQUFDO0lBQ3JELE1BQU0sR0FBRyxHQUFHLElBQUksVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3ZDLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2hFLE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQUpELHNDQUlDO0FBRUQscURBQXFEO0FBQ3JELFNBQWdCLGFBQWEsQ0FBQyxDQUFTLEVBQUUsVUFBVSxHQUFHLENBQUM7SUFDckQsTUFBTSxHQUFHLEdBQUcsSUFBSSxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDdkMsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDakUsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBSkQsc0NBSUM7QUFFRCw0REFBNEQ7QUFDNUQsU0FBZ0Is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

/***/ }),

/***/ 940:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var Buffer = __webpack_require__(300)["Buffer"];

var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Fq = exports.Fr = void 0;
const index_js_1 = __webpack_require__(324);
const index_js_2 = __webpack_require__(255);
const index_js_3 = __webpack_require__(456);
class Fr {
    constructor(value) {
        this.value = value;
        if (value > Fr.MAX_VALUE) {
            throw new Error(`Fr out of range ${value}.`);
        }
    }
    static random() {
        const r = (0, index_js_2.toBigIntBE)((0, index_js_1.randomBytes)(64)) % Fr.MODULUS;
        return new this(r);
    }
    static fromBuffer(buffer) {
        const reader = index_js_3.BufferReader.asReader(buffer);
        return new this((0, index_js_2.toBigIntBE)(reader.readBytes(this.SIZE_IN_BYTES)));
    }
    static fromBufferReduce(buffer) {
        const reader = index_js_3.BufferReader.asReader(buffer);
        return new this((0, index_js_2.toBigIntBE)(reader.readBytes(this.SIZE_IN_BYTES)) % Fr.MODULUS);
    }
    static fromString(str) {
        return this.fromBuffer(Buffer.from(str.replace(/^0x/i, ''), 'hex'));
    }
    toBuffer() {
        return (0, index_js_2.toBufferBE)(this.value, Fr.SIZE_IN_BYTES);
    }
    toString() {
        return '0x' + (0, index_js_3.uint8ArrayToHexString)(this.toBuffer());
    }
    equals(rhs) {
        return this.value === rhs.value;
    }
    isZero() {
        return this.value === 0n;
    }
}
exports.Fr = Fr;
_a = Fr;
Fr.ZERO = new Fr(0n);
Fr.MODULUS = 0x30644e72e131a029b85045b68181585d2833e84879b9709143e1f593f0000001n;
Fr.MAX_VALUE = _a.MODULUS - 1n;
Fr.SIZE_IN_BYTES = 32;
class Fq {
    constructor(value) {
        this.value = value;
        if (value > Fq.MAX_VALUE) {
            throw new Error(`Fq out of range ${value}.`);
        }
    }
    static random() {
        const r = (0, index_js_2.toBigIntBE)((0, index_js_1.randomBytes)(64)) % Fq.MODULUS;
        return new this(r);
    }
    static fromBuffer(buffer) {
        const reader = index_js_3.BufferReader.asReader(buffer);
        return new this((0, index_js_2.toBigIntBE)(reader.readBytes(this.SIZE_IN_BYTES)));
    }
    static fromBufferReduce(buffer) {
        const reader = index_js_3.BufferReader.asReader(buffer);
        return new this((0, index_js_2.toBigIntBE)(reader.readBytes(this.SIZE_IN_BYTES)) % Fr.MODULUS);
    }
    static fromString(str) {
        return this.fromBuffer(Buffer.from(str.replace(/^0x/i, ''), 'hex'));
    }
    toBuffer() {
        return (0, index_js_2.toBufferBE)(this.value, Fq.SIZE_IN_BYTES);
    }
    toString() {
        return '0x' + this.value.toString(16);
    }
    equals(rhs) {
        return this.value === rhs.value;
    }
    isZero() {
        return this.value === 0n;
    }
}
exports.Fq = Fq;
_b = Fq;
Fq.MODULUS = 0x30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd47n;
Fq.MAX_VALUE = _b.MODULUS - 1n;
Fq.SIZE_IN_BYTES = 32;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3R5cGVzL2ZpZWxkcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsaURBQWlEO0FBQ2pELHVEQUFrRTtBQUNsRSxvREFBNEU7QUFFNUUsTUFBYSxFQUFFO0lBTWIsWUFBNEIsS0FBYTtRQUFiLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDdkMsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDLFNBQVMsRUFBRTtZQUN4QixNQUFNLElBQUksS0FBSyxDQUFDLG1CQUFtQixLQUFLLEdBQUcsQ0FBQyxDQUFDO1NBQzlDO0lBQ0gsQ0FBQztJQUVELE1BQU0sQ0FBQyxNQUFNO1FBQ1gsTUFBTSxDQUFDLEdBQUcsSUFBQSxxQkFBVSxFQUFDLElBQUEsc0JBQVcsRUFBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUM7UUFDbkQsT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFpQztRQUNqRCxNQUFNLE1BQU0sR0FBRyx1QkFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QyxPQUFPLElBQUksSUFBSSxDQUFDLElBQUEscUJBQVUsRUFBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFpQztRQUN2RCxNQUFNLE1BQU0sR0FBRyx1QkFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QyxPQUFPLElBQUksSUFBSSxDQUFDLElBQUEscUJBQVUsRUFBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNqRixDQUFDO0lB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

/***/ }),

/***/ 986:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Buffer128 = exports.Buffer64 = exports.Buffer32 = void 0;
const index_js_1 = __webpack_require__(324);
const index_js_2 = __webpack_require__(456);
class Buffer32 {
    constructor(buffer) {
        this.buffer = buffer;
    }
    static fromBuffer(buffer) {
        const reader = index_js_2.BufferReader.asReader(buffer);
        return new Buffer32(reader.readBytes(this.SIZE_IN_BYTES));
    }
    static random() {
        return new Buffer32((0, index_js_1.randomBytes)(this.SIZE_IN_BYTES));
    }
    toBuffer() {
        return this.buffer;
    }
}
exports.Buffer32 = Buffer32;
Buffer32.SIZE_IN_BYTES = 32;
class Buffer64 {
    constructor(buffer) {
        this.buffer = buffer;
    }
    static fromBuffer(buffer) {
        const reader = index_js_2.BufferReader.asReader(buffer);
        return new Buffer64(reader.readBytes(this.SIZE_IN_BYTES));
    }
    static random() {
        return new Buffer64((0, index_js_1.randomBytes)(this.SIZE_IN_BYTES));
    }
    toBuffer() {
        return this.buffer;
    }
}
exports.Buffer64 = Buffer64;
Buffer64.SIZE_IN_BYTES = 64;
class Buffer128 {
    constructor(buffer) {
        this.buffer = buffer;
    }
    static fromBuffer(buffer) {
        const reader = index_js_2.BufferReader.asReader(buffer);
        return new Buffer128(reader.readBytes(this.SIZE_IN_BYTES));
    }
    static random() {
        return new Buffer128((0, index_js_1.randomBytes)(this.SIZE_IN_BYTES));
    }
    toBuffer() {
        return this.buffer;
    }
}
exports.Buffer128 = Buffer128;
Buffer128.SIZE_IN_BYTES = 128;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZml4ZWRfc2l6ZV9idWZmZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdHlwZXMvZml4ZWRfc2l6ZV9idWZmZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaURBQWlEO0FBQ2pELG9EQUFxRDtBQUVyRCxNQUFhLFFBQVE7SUFHbkIsWUFBNEIsTUFBa0I7UUFBbEIsV0FBTSxHQUFOLE1BQU0sQ0FBWTtJQUFHLENBQUM7SUFFbEQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFpQztRQUNqRCxNQUFNLE1BQU0sR0FBRyx1QkFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QyxPQUFPLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELE1BQU0sQ0FBQyxNQUFNO1FBQ1gsT0FBTyxJQUFJLFFBQVEsQ0FBQyxJQUFBLHNCQUFXLEVBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVELFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQzs7QUFoQkgsNEJBaUJDO0FBaEJRLHNCQUFhLEdBQUcsRUFBRSxDQUFDO0FBa0I1QixNQUFhLFFBQVE7SUFHbkIsWUFBNEIsTUFBa0I7UUFBbEIsV0FBTSxHQUFOLE1BQU0sQ0FBWTtJQUFHLENBQUM7SUFFbEQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFpQztRQUNqRCxNQUFNLE1BQU0sR0FBRyx1QkFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QyxPQUFPLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELE1BQU0sQ0FBQyxNQUFNO1FBQ1gsT0FBTyxJQUFJLFFBQVEsQ0FBQyxJQUFBLHNCQUFXLEVBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVELFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQzs7QUFoQkgsNEJBaUJDO0FBaEJRLHNCQUFhLEdBQUcsRUFBRSxDQUFDO0FBa0I1QixNQUFhLFNBQVM7SUFHcEIsWUFBNEIsTUFBa0I7UUFBbEIsV0FBTSxHQUFOLE1BQU0sQ0FBWTtJQUFHLENBQUM7SUFFbEQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFpQztRQUNqRCxNQUFNLE1BQU0sR0FBRyx1QkFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QyxPQUFPLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVELE1BQU0sQ0FBQyxNQUFNO1FBQ1gsT0FBTyxJQUFJLFNBQVMsQ0FBQyxJQUFBLHNCQUFXLEVBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVELFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQzs7QUFoQkgsOEJBaUJDO0FBaEJRLHVCQUFhLEdBQUcsR0FBRyxDQUFDIn0=

/***/ }),

/***/ 678:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(582);
tslib_1.__exportStar(__webpack_require__(331), exports);
tslib_1.__exportStar(__webpack_require__(940), exports);
tslib_1.__exportStar(__webpack_require__(720), exports);
tslib_1.__exportStar(__webpack_require__(986), exports);
tslib_1.__exportStar(__webpack_require__(867), exports);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdHlwZXMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbURBQXlCO0FBQ3pCLHNEQUE0QjtBQUM1Qix3REFBOEI7QUFDOUIsaUVBQXVDO0FBQ3ZDLDBEQUFnQyJ9

/***/ }),

/***/ 720:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(582);
tslib_1.__exportStar(__webpack_require__(717), exports);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdHlwZXMvbm9kZS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxREFBMkIifQ==

/***/ }),

/***/ 717:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var Buffer = __webpack_require__(300)["Buffer"];

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Point = void 0;
const index_js_1 = __webpack_require__(678);
const buffer_reader_js_1 = __webpack_require__(366);
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static random() {
        // TODO: This is not a point on the curve!
        return new Point(index_js_1.Fr.random(), index_js_1.Fr.random());
    }
    static fromBuffer(buffer) {
        const reader = buffer_reader_js_1.BufferReader.asReader(buffer);
        return new this(index_js_1.Fr.fromBuffer(reader), index_js_1.Fr.fromBuffer(reader));
    }
    static fromString(address) {
        return Point.fromBuffer(Buffer.from(address.replace(/^0x/i, ''), 'hex'));
    }
    toBuffer() {
        return Buffer.concat([this.x.toBuffer(), this.y.toBuffer()]);
    }
    toString() {
        return '0x' + this.toBuffer().toString('hex');
    }
    equals(rhs) {
        return this.x.equals(rhs.x) && this.y.equals(rhs.y);
    }
}
exports.Point = Point;
Point.SIZE_IN_BYTES = 64;
Point.EMPTY = new Point(index_js_1.Fr.ZERO, index_js_1.Fr.ZERO);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9pbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdHlwZXMvbm9kZS9wb2ludC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwQ0FBaUM7QUFDakMsdUVBQWdFO0FBRWhFLE1BQWEsS0FBSztJQUloQixZQUE0QixDQUFLLEVBQWtCLENBQUs7UUFBNUIsTUFBQyxHQUFELENBQUMsQ0FBSTtRQUFrQixNQUFDLEdBQUQsQ0FBQyxDQUFJO0lBQUcsQ0FBQztJQUU1RCxNQUFNLENBQUMsTUFBTTtRQUNYLDBDQUEwQztRQUMxQyxPQUFPLElBQUksS0FBSyxDQUFDLGFBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxhQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFpQztRQUNqRCxNQUFNLE1BQU0sR0FBRywrQkFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QyxPQUFPLElBQUksSUFBSSxDQUFDLGFBQUUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsYUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRCxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQWU7UUFDL0IsT0FBTyxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRUQsUUFBUTtRQUNOLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELFFBQVE7UUFDTixPQUFPLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxNQUFNLENBQUMsR0FBVTtRQUNmLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0RCxDQUFDOztBQTlCSCxzQkErQkM7QUE5QlEsbUJBQWEsR0FBRyxFQUFFLENBQUM7QUFDbkIsV0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLGFBQUUsQ0FBQyxJQUFJLEVBQUUsYUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDIn0=

/***/ }),

/***/ 331:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Ptr = void 0;
const index_js_1 = __webpack_require__(456);
/**
 * Holds an opaque pointer into WASM memory.
 * Currently only 4 bytes, but could grow to 8 bytes with wasm64.
 */
class Ptr {
    constructor(value) {
        this.value = value;
    }
    static fromBuffer(buffer) {
        const reader = index_js_1.BufferReader.asReader(buffer);
        return new this(reader.readBytes(this.SIZE_IN_BYTES));
    }
    toBuffer() {
        return this.value;
    }
}
exports.Ptr = Ptr;
Ptr.SIZE_IN_BYTES = 4;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHRyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3R5cGVzL3B0ci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxvREFBcUQ7QUFFckQ7OztHQUdHO0FBQ0gsTUFBYSxHQUFHO0lBR2QsWUFBNEIsS0FBaUI7UUFBakIsVUFBSyxHQUFMLEtBQUssQ0FBWTtJQUFHLENBQUM7SUFFakQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFpQztRQUNqRCxNQUFNLE1BQU0sR0FBRyx1QkFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QyxPQUFPLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVELFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQzs7QUFaSCxrQkFhQztBQVpRLGlCQUFhLEdBQUcsQ0FBQyxDQUFDIn0=

/***/ }),

/***/ 867:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RawBuffer = void 0;
// Used when the data is to be sent exactly as is. i.e. no length prefix will be added.
// This is useful for sending structured data that can be parsed-as-you-go, as opposed to just an array of bytes.
class RawBuffer extends Uint8Array {
}
exports.RawBuffer = RawBuffer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF3X2J1ZmZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90eXBlcy9yYXdfYnVmZmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHVGQUF1RjtBQUN2RixpSEFBaUg7QUFDakgsTUFBYSxTQUFVLFNBQVEsVUFBVTtDQUFHO0FBQTVDLDhCQUE0QyJ9

/***/ }),

/***/ 300:
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ 113:
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ 361:
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ 147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 292:
/***/ ((module) => {

"use strict";
module.exports = require("fs/promises");

/***/ }),

/***/ 37:
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 17:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 224:
/***/ ((module) => {

"use strict";
module.exports = require("tty");

/***/ }),

/***/ 310:
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ 837:
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ 267:
/***/ ((module) => {

"use strict";
module.exports = require("worker_threads");

/***/ }),

/***/ 375:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createEndpoint: () => (/* binding */ createEndpoint),
/* harmony export */   expose: () => (/* binding */ expose),
/* harmony export */   finalizer: () => (/* binding */ finalizer),
/* harmony export */   proxy: () => (/* binding */ proxy),
/* harmony export */   proxyMarker: () => (/* binding */ proxyMarker),
/* harmony export */   releaseProxy: () => (/* binding */ releaseProxy),
/* harmony export */   transfer: () => (/* binding */ transfer),
/* harmony export */   transferHandlers: () => (/* binding */ transferHandlers),
/* harmony export */   windowEndpoint: () => (/* binding */ windowEndpoint),
/* harmony export */   wrap: () => (/* binding */ wrap)
/* harmony export */ });
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const proxyMarker = Symbol("Comlink.proxy");
const createEndpoint = Symbol("Comlink.endpoint");
const releaseProxy = Symbol("Comlink.releaseProxy");
const finalizer = Symbol("Comlink.finalizer");
const throwMarker = Symbol("Comlink.thrown");
const isObject = (val) => (typeof val === "object" && val !== null) || typeof val === "function";
/**
 * Internal transfer handle to handle objects marked to proxy.
 */
const proxyTransferHandler = {
    canHandle: (val) => isObject(val) && val[proxyMarker],
    serialize(obj) {
        const { port1, port2 } = new MessageChannel();
        expose(obj, port1);
        return [port2, [port2]];
    },
    deserialize(port) {
        port.start();
        return wrap(port);
    },
};
/**
 * Internal transfer handler to handle thrown exceptions.
 */
const throwTransferHandler = {
    canHandle: (value) => isObject(value) && throwMarker in value,
    serialize({ value }) {
        let serialized;
        if (value instanceof Error) {
            serialized = {
                isError: true,
                value: {
                    message: value.message,
                    name: value.name,
                    stack: value.stack,
                },
            };
        }
        else {
            serialized = { isError: false, value };
        }
        return [serialized, []];
    },
    deserialize(serialized) {
        if (serialized.isError) {
            throw Object.assign(new Error(serialized.value.message), serialized.value);
        }
        throw serialized.value;
    },
};
/**
 * Allows customizing the serialization of certain values.
 */
const transferHandlers = new Map([
    ["proxy", proxyTransferHandler],
    ["throw", throwTransferHandler],
]);
function isAllowedOrigin(allowedOrigins, origin) {
    for (const allowedOrigin of allowedOrigins) {
        if (origin === allowedOrigin || allowedOrigin === "*") {
            return true;
        }
        if (allowedOrigin instanceof RegExp && allowedOrigin.test(origin)) {
            return true;
        }
    }
    return false;
}
function expose(obj, ep = globalThis, allowedOrigins = ["*"]) {
    ep.addEventListener("message", function callback(ev) {
        if (!ev || !ev.data) {
            return;
        }
        if (!isAllowedOrigin(allowedOrigins, ev.origin)) {
            console.warn(`Invalid origin '${ev.origin}' for comlink proxy`);
            return;
        }
        const { id, type, path } = Object.assign({ path: [] }, ev.data);
        const argumentList = (ev.data.argumentList || []).map(fromWireValue);
        let returnValue;
        try {
            const parent = path.slice(0, -1).reduce((obj, prop) => obj[prop], obj);
            const rawValue = path.reduce((obj, prop) => obj[prop], obj);
            switch (type) {
                case "GET" /* MessageType.GET */:
                    {
                        returnValue = rawValue;
                    }
                    break;
                case "SET" /* MessageType.SET */:
                    {
                        parent[path.slice(-1)[0]] = fromWireValue(ev.data.value);
                        returnValue = true;
                    }
                    break;
                case "APPLY" /* MessageType.APPLY */:
                    {
                        returnValue = rawValue.apply(parent, argumentList);
                    }
                    break;
                case "CONSTRUCT" /* MessageType.CONSTRUCT */:
                    {
                        const value = new rawValue(...argumentList);
                        returnValue = proxy(value);
                    }
                    break;
                case "ENDPOINT" /* MessageType.ENDPOINT */:
                    {
                        const { port1, port2 } = new MessageChannel();
                        expose(obj, port2);
                        returnValue = transfer(port1, [port1]);
                    }
                    break;
                case "RELEASE" /* MessageType.RELEASE */:
                    {
                        returnValue = undefined;
                    }
                    break;
                default:
                    return;
            }
        }
        catch (value) {
            returnValue = { value, [throwMarker]: 0 };
        }
        Promise.resolve(returnValue)
            .catch((value) => {
            return { value, [throwMarker]: 0 };
        })
            .then((returnValue) => {
            const [wireValue, transferables] = toWireValue(returnValue);
            ep.postMessage(Object.assign(Object.assign({}, wireValue), { id }), transferables);
            if (type === "RELEASE" /* MessageType.RELEASE */) {
                // detach and deactive after sending release response above.
                ep.removeEventListener("message", callback);
                closeEndPoint(ep);
                if (finalizer in obj && typeof obj[finalizer] === "function") {
                    obj[finalizer]();
                }
            }
        })
            .catch((error) => {
            // Send Serialization Error To Caller
            const [wireValue, transferables] = toWireValue({
                value: new TypeError("Unserializable return value"),
                [throwMarker]: 0,
            });
            ep.postMessage(Object.assign(Object.assign({}, wireValue), { id }), transferables);
        });
    });
    if (ep.start) {
        ep.start();
    }
}
function isMessagePort(endpoint) {
    return endpoint.constructor.name === "MessagePort";
}
function closeEndPoint(endpoint) {
    if (isMessagePort(endpoint))
        endpoint.close();
}
function wrap(ep, target) {
    return createProxy(ep, [], target);
}
function throwIfProxyReleased(isReleased) {
    if (isReleased) {
        throw new Error("Proxy has been released and is not useable");
    }
}
function releaseEndpoint(ep) {
    return requestResponseMessage(ep, {
        type: "RELEASE" /* MessageType.RELEASE */,
    }).then(() => {
        closeEndPoint(ep);
    });
}
const proxyCounter = new WeakMap();
const proxyFinalizers = "FinalizationRegistry" in globalThis &&
    new FinalizationRegistry((ep) => {
        const newCount = (proxyCounter.get(ep) || 0) - 1;
        proxyCounter.set(ep, newCount);
        if (newCount === 0) {
            releaseEndpoint(ep);
        }
    });
function registerProxy(proxy, ep) {
    const newCount = (proxyCounter.get(ep) || 0) + 1;
    proxyCounter.set(ep, newCount);
    if (proxyFinalizers) {
        proxyFinalizers.register(proxy, ep, proxy);
    }
}
function unregisterProxy(proxy) {
    if (proxyFinalizers) {
        proxyFinalizers.unregister(proxy);
    }
}
function createProxy(ep, path = [], target = function () { }) {
    let isProxyReleased = false;
    const proxy = new Proxy(target, {
        get(_target, prop) {
            throwIfProxyReleased(isProxyReleased);
            if (prop === releaseProxy) {
                return () => {
                    unregisterProxy(proxy);
                    releaseEndpoint(ep);
                    isProxyReleased = true;
                };
            }
            if (prop === "then") {
                if (path.length === 0) {
                    return { then: () => proxy };
                }
                const r = requestResponseMessage(ep, {
                    type: "GET" /* MessageType.GET */,
                    path: path.map((p) => p.toString()),
                }).then(fromWireValue);
                return r.then.bind(r);
            }
            return createProxy(ep, [...path, prop]);
        },
        set(_target, prop, rawValue) {
            throwIfProxyReleased(isProxyReleased);
            // FIXME: ES6 Proxy Handler `set` methods are supposed to return a
            // boolean. To show good will, we return true asynchronously ¯\_(ツ)_/¯
            const [value, transferables] = toWireValue(rawValue);
            return requestResponseMessage(ep, {
                type: "SET" /* MessageType.SET */,
                path: [...path, prop].map((p) => p.toString()),
                value,
            }, transferables).then(fromWireValue);
        },
        apply(_target, _thisArg, rawArgumentList) {
            throwIfProxyReleased(isProxyReleased);
            const last = path[path.length - 1];
            if (last === createEndpoint) {
                return requestResponseMessage(ep, {
                    type: "ENDPOINT" /* MessageType.ENDPOINT */,
                }).then(fromWireValue);
            }
            // We just pretend that `bind()` didn’t happen.
            if (last === "bind") {
                return createProxy(ep, path.slice(0, -1));
            }
            const [argumentList, transferables] = processArguments(rawArgumentList);
            return requestResponseMessage(ep, {
                type: "APPLY" /* MessageType.APPLY */,
                path: path.map((p) => p.toString()),
                argumentList,
            }, transferables).then(fromWireValue);
        },
        construct(_target, rawArgumentList) {
            throwIfProxyReleased(isProxyReleased);
            const [argumentList, transferables] = processArguments(rawArgumentList);
            return requestResponseMessage(ep, {
                type: "CONSTRUCT" /* MessageType.CONSTRUCT */,
                path: path.map((p) => p.toString()),
                argumentList,
            }, transferables).then(fromWireValue);
        },
    });
    registerProxy(proxy, ep);
    return proxy;
}
function myFlat(arr) {
    return Array.prototype.concat.apply([], arr);
}
function processArguments(argumentList) {
    const processed = argumentList.map(toWireValue);
    return [processed.map((v) => v[0]), myFlat(processed.map((v) => v[1]))];
}
const transferCache = new WeakMap();
function transfer(obj, transfers) {
    transferCache.set(obj, transfers);
    return obj;
}
function proxy(obj) {
    return Object.assign(obj, { [proxyMarker]: true });
}
function windowEndpoint(w, context = globalThis, targetOrigin = "*") {
    return {
        postMessage: (msg, transferables) => w.postMessage(msg, targetOrigin, transferables),
        addEventListener: context.addEventListener.bind(context),
        removeEventListener: context.removeEventListener.bind(context),
    };
}
function toWireValue(value) {
    for (const [name, handler] of transferHandlers) {
        if (handler.canHandle(value)) {
            const [serializedValue, transferables] = handler.serialize(value);
            return [
                {
                    type: "HANDLER" /* WireValueType.HANDLER */,
                    name,
                    value: serializedValue,
                },
                transferables,
            ];
        }
    }
    return [
        {
            type: "RAW" /* WireValueType.RAW */,
            value,
        },
        transferCache.get(value) || [],
    ];
}
function fromWireValue(value) {
    switch (value.type) {
        case "HANDLER" /* WireValueType.HANDLER */:
            return transferHandlers.get(value.name).deserialize(value.value);
        case "RAW" /* WireValueType.RAW */:
            return value.value;
    }
}
function requestResponseMessage(ep, msg, transfers) {
    return new Promise((resolve) => {
        const id = generateUUID();
        ep.addEventListener("message", function l(ev) {
            if (!ev.data || !ev.data.id || ev.data.id !== id) {
                return;
            }
            ep.removeEventListener("message", l);
            resolve(ev.data);
        });
        if (ep.start) {
            ep.start();
        }
        ep.postMessage(Object.assign({ id }, msg), transfers);
    });
}
function generateUUID() {
    return new Array(4)
        .fill(0)
        .map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16))
        .join("-");
}


//# sourceMappingURL=comlink.mjs.map


/***/ }),

/***/ 582:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __assign: () => (/* binding */ __assign),
/* harmony export */   __asyncDelegator: () => (/* binding */ __asyncDelegator),
/* harmony export */   __asyncGenerator: () => (/* binding */ __asyncGenerator),
/* harmony export */   __asyncValues: () => (/* binding */ __asyncValues),
/* harmony export */   __await: () => (/* binding */ __await),
/* harmony export */   __awaiter: () => (/* binding */ __awaiter),
/* harmony export */   __classPrivateFieldGet: () => (/* binding */ __classPrivateFieldGet),
/* harmony export */   __classPrivateFieldIn: () => (/* binding */ __classPrivateFieldIn),
/* harmony export */   __classPrivateFieldSet: () => (/* binding */ __classPrivateFieldSet),
/* harmony export */   __createBinding: () => (/* binding */ __createBinding),
/* harmony export */   __decorate: () => (/* binding */ __decorate),
/* harmony export */   __esDecorate: () => (/* binding */ __esDecorate),
/* harmony export */   __exportStar: () => (/* binding */ __exportStar),
/* harmony export */   __extends: () => (/* binding */ __extends),
/* harmony export */   __generator: () => (/* binding */ __generator),
/* harmony export */   __importDefault: () => (/* binding */ __importDefault),
/* harmony export */   __importStar: () => (/* binding */ __importStar),
/* harmony export */   __makeTemplateObject: () => (/* binding */ __makeTemplateObject),
/* harmony export */   __metadata: () => (/* binding */ __metadata),
/* harmony export */   __param: () => (/* binding */ __param),
/* harmony export */   __propKey: () => (/* binding */ __propKey),
/* harmony export */   __read: () => (/* binding */ __read),
/* harmony export */   __rest: () => (/* binding */ __rest),
/* harmony export */   __runInitializers: () => (/* binding */ __runInitializers),
/* harmony export */   __setFunctionName: () => (/* binding */ __setFunctionName),
/* harmony export */   __spread: () => (/* binding */ __spread),
/* harmony export */   __spreadArray: () => (/* binding */ __spreadArray),
/* harmony export */   __spreadArrays: () => (/* binding */ __spreadArrays),
/* harmony export */   __values: () => (/* binding */ __values),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
      function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
  return extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() { this.constructor = d; }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
  __assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
  }
  return __assign.apply(this, arguments);
}

function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t[p[i]] = s[p[i]];
      }
  return t;
}

function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
  return function (target, key) { decorator(target, key, paramIndex); }
}

function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
      var context = {};
      for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
      for (var p in contextIn.access) context.access[p] = contextIn.access[p];
      context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
      var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
      if (kind === "accessor") {
          if (result === void 0) continue;
          if (result === null || typeof result !== "object") throw new TypeError("Object expected");
          if (_ = accept(result.get)) descriptor.get = _;
          if (_ = accept(result.set)) descriptor.set = _;
          if (_ = accept(result.init)) initializers.unshift(_);
      }
      else if (_ = accept(result)) {
          if (kind === "field") initializers.unshift(_);
          else descriptor[key] = _;
      }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};

function __runInitializers(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
      value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};

function __propKey(x) {
  return typeof x === "symbol" ? x : "".concat(x);
};

function __setFunctionName(f, name, prefix) {
  if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
  return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};

function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
      function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
      function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
  function verb(n) { return function (v) { return step([n, v]); }; }
  function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
              case 0: case 1: t = op; break;
              case 4: _.label++; return { value: op[1], done: false };
              case 5: _.label++; y = op[1]; op = [0]; continue;
              case 7: op = _.ops.pop(); _.trys.pop(); continue;
              default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                  if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                  if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                  if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                  if (t[2]) _.ops.pop();
                  _.trys.pop(); continue;
          }
          op = body.call(thisArg, _);
      } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
      if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
  }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
  }
  Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

function __exportStar(m, o) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
      next: function () {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
      }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  }
  catch (error) { e = { error: error }; }
  finally {
      try {
          if (r && !r.done && (m = i["return"])) m.call(i);
      }
      finally { if (e) throw e.error; }
  }
  return ar;
}

/** @deprecated */
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++)
      ar = ar.concat(__read(arguments[i]));
  return ar;
}

/** @deprecated */
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
  return r;
}

function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
      }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
  function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
  function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
  function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
  function fulfill(value) { resume("next", value); }
  function reject(value) { resume("throw", value); }
  function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
  function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
  function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
  function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
  return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
  o["default"] = v;
};

function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
}

function __importDefault(mod) {
  return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
  if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof state === "function" ? receiver === state : state.has(receiver);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __extends,
  __assign,
  __rest,
  __decorate,
  __param,
  __metadata,
  __awaiter,
  __generator,
  __createBinding,
  __exportStar,
  __values,
  __read,
  __spread,
  __spreadArrays,
  __spreadArray,
  __await,
  __asyncGenerator,
  __asyncDelegator,
  __asyncValues,
  __makeTemplateObject,
  __importStar,
  __importDefault,
  __classPrivateFieldGet,
  __classPrivateFieldSet,
  __classPrivateFieldIn,
});


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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
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
/******/ 	var __webpack_exports__ = __webpack_require__(465);
/******/ 	
/******/ })()
;