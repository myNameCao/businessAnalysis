'use strict';
!function(options2) {
  /**
   * @param {!Function} fn
   * @param {!Object} module
   * @return {?}
   */
  function require(fn, module) {
    return module = {
      exports : {}
    }, fn(module, module.exports), module.exports;
  }
  /**
   * @param {number} x
   * @return {?}
   */
  function asinh(x) {
    return isFinite(x = +x) && 0 != x ? x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1)) : x;
  }
  /**
   * @param {!Object} value
   * @param {boolean} key
   * @return {?}
   */
  function get(value, key) {
    var desc;
    var proto;
    var undefined = arguments.length < 3 ? value : arguments[2];
    return anObject(value) === undefined ? value[key] : (desc = assert.f(value, key)) ? has(desc, "value") ? desc.value : void 0 !== desc.get ? desc.get.call(undefined) : void 0 : isObject(proto = getPrototypeOf(value)) ? get(proto, key, undefined) : void 0;
  }
  /**
   * @param {!Object} target
   * @param {boolean} value
   * @param {string} name
   * @return {?}
   */
  function set(target, value, name) {
    var attributes;
    var proto;
    var obj = arguments.length < 4 ? target : arguments[3];
    var ownDesc = assert.f(anObject(target), value);
    if (!ownDesc) {
      if (isObject(proto = getPrototypeOf(target))) {
        return set(proto, value, name, obj);
      }
      ownDesc = createDesc(0);
    }
    return has(ownDesc, "value") ? !(false === ownDesc.writable || !isObject(obj)) && (attributes = assert.f(obj, value) || createDesc(0), attributes.value = name, util.f(obj, value, attributes), true) : void 0 !== ownDesc.set && (ownDesc.set.call(obj, name), true);
  }
  /** @type {function(?): number} */
  var ceil = Math.ceil;
  /** @type {function(?): number} */
  var $floor = Math.floor;
  /**
   * @param {number} it
   * @return {?}
   */
  var toInteger = function(it) {
    return isNaN(it = +it) ? 0 : (it > 0 ? $floor : ceil)(it);
  };
  /**
   * @param {number} value
   * @return {?}
   */
  var filter = function(value) {
    if (void 0 == value) {
      throw TypeError("Can't call method on  " + value);
    }
    return value;
  };
  /**
   * @param {string} TO_STRING
   * @return {?}
   */
  var exports = function(TO_STRING) {
    return function(change, value) {
      var a;
      var o;
      /** @type {string} */
      var path = String(filter(change));
      var i = toInteger(value);
      /** @type {number} */
      var len = path.length;
      return i < 0 || i >= len ? TO_STRING ? "" : void 0 : (a = path.charCodeAt(i), a < 55296 || a > 56319 || i + 1 === len || (o = path.charCodeAt(i + 1)) < 56320 || o > 57343 ? TO_STRING ? path.charAt(i) : a : TO_STRING ? path.slice(i, i + 2) : o - 56320 + (a - 55296 << 10) + 65536);
    };
  };
  var env = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
  var root = require(function(module) {
    var global = module.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
    if ("number" == typeof __g) {
      __g = global;
    }
  });
  var core = require(function(module) {
    var core = module.exports = {
      version : "2.5.1"
    };
    if ("number" == typeof __e) {
      __e = core;
    }
  });
  /**
   * @param {!Object} value
   * @return {?}
   */
  var isObject = function(value) {
    return "object" == typeof value ? null !== value : "function" == typeof value;
  };
  /**
   * @param {!Object} key
   * @return {?}
   */
  var anObject = function(key) {
    if (!isObject(key)) {
      throw TypeError(key + " is not an object!");
    }
    return key;
  };
  /**
   * @param {!Function} callback
   * @return {?}
   */
  var fails = function(callback) {
    try {
      return !!callback();
    } catch (t) {
      return true;
    }
  };
  /** @type {boolean} */
  var SUPPORT_DESC = !fails(function() {
    return 7 != Object.defineProperty({}, "a", {
      get : function() {
        return 7;
      }
    }).a;
  });
  var document = root.document;
  var APP_LOGGING = isObject(document) && isObject(document.createElement);
  /**
   * @param {string} type
   * @return {?}
   */
  var createElement = function(type) {
    return APP_LOGGING ? document.createElement(type) : {};
  };
  /** @type {boolean} */
  var _dom_content_get = !SUPPORT_DESC && !fails(function() {
    return 7 != Object.defineProperty(createElement("div"), "a", {
      get : function() {
        return 7;
      }
    }).a;
  });
  /**
   * @param {string} obj
   * @param {boolean} n
   * @return {?}
   */
  var transform = function(obj, n) {
    if (!isObject(obj)) {
      return obj;
    }
    var fn;
    var val;
    if (n && "function" == typeof(fn = obj.toString) && !isObject(val = fn.call(obj))) {
      return val;
    }
    if ("function" == typeof(fn = obj.valueOf) && !isObject(val = fn.call(obj))) {
      return val;
    }
    if (!n && "function" == typeof(fn = obj.toString) && !isObject(val = fn.call(obj))) {
      return val;
    }
    throw TypeError("Can't convert object to primitive value");
  };
  /** @type {function(!Object, string, !Object): !Object} */
  var defineProp = Object.defineProperty;
  /** @type {!Function} */
  var sharedNullFunction = SUPPORT_DESC ? Object.defineProperty : function(description, name, desc) {
    if (anObject(description), name = transform(name, true), anObject(desc), _dom_content_get) {
      try {
        return defineProp(description, name, desc);
      } catch (t) {
      }
    }
    if ("get" in desc || "set" in desc) {
      throw TypeError("Accessors not supported!");
    }
    return "value" in desc && (description[name] = desc.value), description;
  };
  var util = {
    f : sharedNullFunction
  };
  /**
   * @param {number} paramIndex
   * @param {string} e
   * @return {?}
   */
  var createDesc = function(paramIndex, e) {
    return {
      enumerable : !(1 & paramIndex),
      configurable : !(2 & paramIndex),
      writable : !(4 & paramIndex),
      value : e
    };
  };
  /** @type {function(!Object, string, string): ?} */
  var callback = SUPPORT_DESC ? function(obj, key, value) {
    return util.f(obj, key, createDesc(1, value));
  } : function(x, key, value) {
    return x[key] = value, x;
  };
  /** @type {function(this:Object, *): boolean} */
  var hasOwnProperty = {}.hasOwnProperty;
  /**
   * @param {!Function} key
   * @param {string} value
   * @return {?}
   */
  var has = function(key, value) {
    return hasOwnProperty.call(key, value);
  };
  /** @type {number} */
  var counter = 0;
  /** @type {number} */
  var data = Math.random();
  /**
   * @param {?} name
   * @return {?}
   */
  var add = function(name) {
    return "Symbol(".concat(void 0 === name ? "" : name, ")_", (++counter + data).toString(36));
  };
  var redefine = require(function(mixin) {
    var key = add("src");
    var $toString = Function.toString;
    /** @type {!Array<string>} */
    var path = ("" + $toString).split("toString");
    /**
     * @param {?} it
     * @return {?}
     */
    core.inspectSource = function(it) {
      return $toString.call(it);
    };
    (mixin.exports = function(obj, name, value, task) {
      /** @type {boolean} */
      var cb = "function" == typeof value;
      if (cb) {
        if (!has(value, "name")) {
          callback(value, "name", name);
        }
      }
      if (obj[name] !== value) {
        if (cb) {
          if (!has(value, key)) {
            callback(value, key, obj[name] ? "" + obj[name] : path.join(String(name)));
          }
        }
        if (obj === root) {
          /** @type {!Function} */
          obj[name] = value;
        } else {
          if (task) {
            if (obj[name]) {
              /** @type {!Function} */
              obj[name] = value;
            } else {
              callback(obj, name, value);
            }
          } else {
            delete obj[name];
            callback(obj, name, value);
          }
        }
      }
    })(Function.prototype, "toString", function() {
      return "function" == typeof this && this[key] || $toString.call(this);
    });
  });
  /**
   * @param {!Object} value
   * @return {?}
   */
  var aFunction = function(value) {
    if ("function" != typeof value) {
      throw TypeError(value + " is not a function!");
    }
    return value;
  };
  /**
   * @param {!Function} fn
   * @param {!Array} elem
   * @param {number} o
   * @return {?}
   */
  var ctx = function(fn, elem, o) {
    if (aFunction(fn), void 0 === elem) {
      return fn;
    }
    switch(o) {
      case 1:
        return function(event) {
          return fn.call(elem, event);
        };
      case 2:
        return function(event, xTmp) {
          return fn.call(elem, event, xTmp);
        };
      case 3:
        return function(event, xTmp, yTmp) {
          return fn.call(elem, event, xTmp, yTmp);
        };
    }
    return function() {
      return fn.apply(elem, arguments);
    };
  };
  /**
   * @param {number} type
   * @param {string} name
   * @param {string} source
   * @return {undefined}
   */
  var $export = function(type, name, source) {
    var key;
    var own;
    var out;
    var productInfo;
    /** @type {number} */
    var IS_FORCED = type & $export.F;
    /** @type {number} */
    var IS_GLOBAL = type & $export.G;
    /** @type {number} */
    var IS_STATIC = type & $export.S;
    /** @type {number} */
    var IS_PROTO = type & $export.P;
    /** @type {number} */
    var IS_BIND = type & $export.B;
    var target = IS_GLOBAL ? root : IS_STATIC ? root[name] || (root[name] = {}) : (root[name] || {}).prototype;
    var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
    var expProto = exports.prototype || (exports.prototype = {});
    if (IS_GLOBAL) {
      /** @type {string} */
      source = name;
    }
    for (key in source) {
      own = !IS_FORCED && target && void 0 !== target[key];
      out = (own ? target : source)[key];
      productInfo = IS_BIND && own ? ctx(out, root) : IS_PROTO && "function" == typeof out ? ctx(Function.call, out) : out;
      if (target) {
        redefine(target, key, out, type & $export.U);
      }
      if (exports[key] != out) {
        callback(exports, key, productInfo);
      }
      if (IS_PROTO && expProto[key] != out) {
        expProto[key] = out;
      }
    }
  };
  root.core = core;
  /** @type {number} */
  $export.F = 1;
  /** @type {number} */
  $export.G = 2;
  /** @type {number} */
  $export.S = 4;
  /** @type {number} */
  $export.P = 8;
  /** @type {number} */
  $export.B = 16;
  /** @type {number} */
  $export.W = 32;
  /** @type {number} */
  $export.U = 64;
  /** @type {number} */
  $export.R = 128;
  /** @type {function(number, string, string): undefined} */
  var $def = $export;
  var Iterators = {};
  /** @type {function(this:*): string} */
  var objectToString$2 = {}.toString;
  /**
   * @param {!Object} value
   * @return {?}
   */
  var fn = function(value) {
    return objectToString$2.call(value).slice(8, -1);
  };
  /** @type {!Function} */
  var IObject = Object("z").propertyIsEnumerable(0) ? Object : function(target) {
    return "String" == fn(target) ? target.split("") : Object(target);
  };
  /**
   * @param {!Object} name
   * @return {?}
   */
  var $ = function(name) {
    return IObject(filter(name));
  };
  /** @type {function(...?): number} */
  var $min = Math.min;
  /**
   * @param {number} value
   * @return {?}
   */
  var toLength = function(value) {
    return value > 0 ? $min(toInteger(value), 9007199254740991) : 0;
  };
  /** @type {function(...?): number} */
  var max = Math.max;
  /** @type {function(...?): number} */
  var min = Math.min;
  /**
   * @param {number} index
   * @param {number} length
   * @return {?}
   */
  var toIndex = function(index, length) {
    return index = toInteger(index), index < 0 ? max(index + length, 0) : min(index, length);
  };
  /**
   * @param {string} start
   * @return {?}
   */
  var run = function(start) {
    return function(prefs, number, code) {
      var o;
      var object = $(prefs);
      var len = toLength(object.length);
      var i = toIndex(code, len);
      if (start && number != number) {
        for (; len > i;) {
          if ((o = object[i++]) != o) {
            return true;
          }
        }
      } else {
        for (; len > i; i++) {
          if ((start || i in object) && object[i] === number) {
            return start || i || 0;
          }
        }
      }
      return !start && -1;
    };
  };
  var processedOptions = root["__core-js_shared__"] || (root["__core-js_shared__"] = {});
  /**
   * @param {string} name
   * @return {?}
   */
  var shared = function(name) {
    return processedOptions[name] || (processedOptions[name] = {});
  };
  var message = shared("keys");
  /**
   * @param {string} key
   * @return {?}
   */
  var setPushToTalk = function(key) {
    return message[key] || (message[key] = add(key));
  };
  var proc = run(false);
  var IE_PROTO = setPushToTalk("IE_PROTO");
  /**
   * @param {!Object} source
   * @param {!Object} names
   * @return {?}
   */
  var update = function(source, names) {
    var key;
    var k = $(source);
    /** @type {number} */
    var i = 0;
    /** @type {!Array} */
    var result = [];
    for (key in k) {
      if (key != IE_PROTO && has(k, key)) {
        result.push(key);
      }
    }
    for (; names.length > i;) {
      if (has(k, key = names[i++])) {
        if (!~proc(result, key)) {
          result.push(key);
        }
      }
    }
    return result;
  };
  /** @type {!Array<string>} */
  var keys1 = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
  /** @type {function(!Object): !Array<string>} */
  var $keys = Object.keys || function(key) {
    return update(key, keys1);
  };
  /** @type {!Function} */
  var validate = SUPPORT_DESC ? Object.defineProperties : function(value, v) {
    anObject(value);
    var i;
    /** @type {!Array<string>} */
    var keys = $keys(v);
    /** @type {number} */
    var length = keys.length;
    /** @type {number} */
    var j = 0;
    for (; length > j;) {
      util.f(value, i = keys[j++], v[i]);
    }
    return value;
  };
  var doc = root.document;
  var body = doc && doc.documentElement;
  var nameWithoutPrefix = setPushToTalk("IE_PROTO");
  /**
   * @return {undefined}
   */
  var Empty = function() {
  };
  /**
   * @return {?}
   */
  var createDict = function() {
    var iframeDocument;
    var iframe = createElement("iframe");
    /** @type {number} */
    var i = keys1.length;
    /** @type {string} */
    iframe.style.display = "none";
    body.appendChild(iframe);
    /** @type {string} */
    iframe.src = "javascript:";
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write("<script>document.F=Object\x3c/script>");
    iframeDocument.close();
    createDict = iframeDocument.F;
    for (; i--;) {
      delete createDict.prototype[keys1[i]];
    }
    return createDict();
  };
  /** @type {function((Object|null), (Object|null)=): !Object} */
  var _create = Object.create || function(value, undefined) {
    var result;
    return null !== value ? (Empty.prototype = anObject(value), result = new Empty, Empty.prototype = null, result[nameWithoutPrefix] = value) : result = createDict(), void 0 === undefined ? result : validate(result, undefined);
  };
  var Symbol = require(function(mixin) {
    var store = shared("wks");
    var Symbol = root.Symbol;
    /** @type {boolean} */
    var USE_SYMBOL = "function" == typeof Symbol;
    (mixin.exports = function(name) {
      return store[name] || (store[name] = USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : add)("Symbol." + name));
    }).store = store;
  });
  /** @type {!Function} */
  var def = util.f;
  var method = Symbol("toStringTag");
  /**
   * @param {!Object} obj
   * @param {string} v
   * @param {string} cells
   * @return {undefined}
   */
  var setToStringTag = function(obj, v, cells) {
    if (obj && !has(obj = cells ? obj : obj.prototype, method)) {
      def(obj, method, {
        configurable : true,
        value : v
      });
    }
  };
  var parent = {};
  callback(parent, Symbol("iterator"), function() {
    return this;
  });
  /**
   * @param {!Function} Constructor
   * @param {string} value
   * @param {!Function} name
   * @return {undefined}
   */
  var register = function(Constructor, value, name) {
    /** @type {!Object} */
    Constructor.prototype = _create(parent, {
      next : createDesc(1, name)
    });
    setToStringTag(Constructor, value + " Iterator");
  };
  /**
   * @param {boolean} obj
   * @return {?}
   */
  var toObject = function(obj) {
    return Object(filter(obj));
  };
  var name = setPushToTalk("IE_PROTO");
  var ObjectProto = Object.prototype;
  /** @type {function(!Object): (Object|null)} */
  var getPrototypeOf = Object.getPrototypeOf || function(options) {
    return options = toObject(options), has(options, name) ? options[name] : "function" == typeof options.constructor && options instanceof options.constructor ? options.constructor.prototype : options instanceof Object ? ObjectProto : null;
  };
  var id = Symbol("iterator");
  /** @type {boolean} */
  var schema = !([].keys && "next" in [].keys());
  /**
   * @return {?}
   */
  var returnThis = function() {
    return this;
  };
  /**
   * @param {!Function} b
   * @param {string} type
   * @param {!Function} app
   * @param {!Function} params
   * @param {string} name
   * @param {boolean} id
   * @param {boolean} a
   * @return {?}
   */
  var init = function(b, type, app, params, name, id, a) {
    register(app, type, params);
    var methods;
    var key;
    var obj;
    /**
     * @param {string} name
     * @return {?}
     */
    var $ = function(name) {
      if (!schema && name in a) {
        return a[name];
      }
      switch(name) {
        case "keys":
        case "values":
          return function() {
            return new app(this, name);
          };
      }
      return function() {
        return new app(this, name);
      };
    };
    /** @type {string} */
    var TAG = type + " Iterator";
    /** @type {boolean} */
    var sort = "values" == name;
    /** @type {boolean} */
    var buggyJSON = false;
    var a = b.prototype;
    var d = a[id] || a["@@iterator"] || name && a[name];
    var data = d || $(name);
    var cache = name ? sort ? $("entries") : data : void 0;
    var visible = "Array" == type ? a.entries || d : d;
    if (visible && (obj = getPrototypeOf(visible.call(new b))) !== Object.prototype && obj.next && (setToStringTag(obj, TAG, true), has(obj, id) || callback(obj, id, returnThis)), sort && d && "values" !== d.name && (buggyJSON = true, data = function() {
      return d.call(this);
    }), (schema || buggyJSON || !a[id]) && callback(a, id, data), Iterators[type] = data, Iterators[TAG] = returnThis, name) {
      if (methods = {
        values : sort ? data : $("values"),
        keys : id ? data : $("keys"),
        entries : cache
      }, a) {
        for (key in methods) {
          if (!(key in a)) {
            redefine(a, key, methods[key]);
          }
        }
      } else {
        $def($def.P + $def.F * (schema || buggyJSON), type, methods);
      }
    }
    return methods;
  };
  var $at = exports(true);
  init(String, "String", function(iterated) {
    /** @type {string} */
    this._t = String(iterated);
    /** @type {number} */
    this._i = 0;
  }, function() {
    var point;
    var O = this._t;
    var index = this._i;
    return index >= O.length ? {
      value : void 0,
      done : true
    } : (point = $at(O, index), this._i += point.length, {
      value : point,
      done : false
    });
  });
  /** @type {function(*): boolean} */
  var isArray = Array.isArray || function(name) {
    return "Array" == fn(name);
  };
  $def($def.S, "Array", {
    isArray : isArray
  });
  /**
   * @param {!Object} iterator
   * @param {?} func
   * @param {!Object} args
   * @param {string} index
   * @return {?}
   */
  var call = function(iterator, func, args, index) {
    try {
      return index ? func(anObject(args)[0], args[1]) : func(args);
    } catch (e) {
      var child = iterator.return;
      throw void 0 !== child && anObject(child.call(iterator)), e;
    }
  };
  var nameSymbl = Symbol("iterator");
  var ArrayProto = Array.prototype;
  /**
   * @param {number} it
   * @return {?}
   */
  var isArrayIter = function(it) {
    return void 0 !== it && (Iterators.Array === it || ArrayProto[nameSymbl] === it);
  };
  /**
   * @param {!Object} obj
   * @param {string} key
   * @param {string} value
   * @return {undefined}
   */
  var createProperty = function(obj, key, value) {
    if (key in obj) {
      util.f(obj, key, createDesc(0, value));
    } else {
      /** @type {string} */
      obj[key] = value;
    }
  };
  var foo = Symbol("toStringTag");
  /** @type {boolean} */
  var ARG = "Arguments" == fn(function() {
    return arguments;
  }());
  /**
   * @param {!Object} count
   * @param {string} key
   * @return {?}
   */
  var merge = function(count, key) {
    try {
      return count[key];
    } catch (t) {
    }
  };
  /**
   * @param {!Array} arg
   * @return {?}
   */
  var parse = function(arg) {
    var O;
    var merged;
    var B;
    return void 0 === arg ? "Undefined" : null === arg ? "Null" : "string" == typeof(merged = merge(O = Object(arg), foo)) ? merged : ARG ? fn(O) : "Object" == (B = fn(O)) && "function" == typeof O.callee ? "Arguments" : B;
  };
  var ITERATOR = Symbol("iterator");
  /** @type {function(!Object): ?} */
  var getIterFn = core.getIteratorMethod = function(it) {
    if (void 0 != it) {
      return it[ITERATOR] || it["@@iterator"] || Iterators[parse(it)];
    }
  };
  var symbol = Symbol("iterator");
  /** @type {boolean} */
  var stream = false;
  try {
    var body = [7][symbol]();
    /**
     * @return {undefined}
     */
    body.return = function() {
      /** @type {boolean} */
      stream = true;
    };
    Array.from(body, function() {
      throw 2;
    });
  } catch (t) {
  }
  /**
   * @param {!Function} test
   * @param {boolean} err
   * @return {?}
   */
  var find = function(test, err) {
    if (!err && !stream) {
      return false;
    }
    /** @type {boolean} */
    var ret = false;
    try {
      /** @type {!Array} */
      var proto = [7];
      var deletedChar = proto[symbol]();
      /**
       * @return {?}
       */
      deletedChar.next = function() {
        return {
          done : ret = true
        };
      };
      /**
       * @return {?}
       */
      proto[symbol] = function() {
        return deletedChar;
      };
      test(proto);
    } catch (t) {
    }
    return ret;
  };
  $def($def.S + $def.F * !find(function(t) {
    Array.from(t);
  }), "Array", {
    from : function(source) {
      var length;
      var result;
      var step;
      var iterator;
      var O = toObject(source);
      var C = "function" == typeof this ? this : Array;
      /** @type {number} */
      var aLen = arguments.length;
      var mapfn = aLen > 1 ? arguments[1] : void 0;
      /** @type {boolean} */
      var mapping = void 0 !== mapfn;
      /** @type {number} */
      var index = 0;
      var iterFn = getIterFn(O);
      if (mapping && (mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : void 0, 2)), void 0 == iterFn || C == Array && isArrayIter(iterFn)) {
        length = toLength(O.length);
        result = new C(length);
        for (; length > index; index++) {
          createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
        }
      } else {
        iterator = iterFn.call(O);
        result = new C;
        for (; !(step = iterator.next()).done; index++) {
          createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
        }
      }
      return result.length = index, result;
    }
  });
  $def($def.S + $def.F * fails(function() {
    /**
     * @return {undefined}
     */
    function placeMidpointLine() {
    }
    return !(Array.of.call(placeMidpointLine) instanceof placeMidpointLine);
  }), "Array", {
    of : function() {
      /** @type {number} */
      var index = 0;
      /** @type {number} */
      var aLen = arguments.length;
      var result = new ("function" == typeof this ? this : Array)(aLen);
      for (; aLen > index;) {
        createProperty(result, index, arguments[index++]);
      }
      return result.length = aLen, result;
    }
  });
  /**
   * @param {!Function} method
   * @param {boolean} reversed
   * @return {?}
   */
  var toLengthsCorrectly = function(method, reversed) {
    return !!method && fails(function() {
      if (reversed) {
        method.call(null, function() {
        }, 1);
      } else {
        method.call(null);
      }
    });
  };
  /** @type {function(this:(IArrayLike<?>|string), *=): string} */
  var f = [].join;
  $def($def.P + $def.F * (IObject != Object || !toLengthsCorrectly(f)), "Array", {
    join : function(a) {
      return f.call($(this), void 0 === a ? "," : a);
    }
  });
  /** @type {function(this:(IArrayLike<T>|string), *=, *=): !Array<T>} */
  var slice = [].slice;
  $def($def.P + $def.F * fails(function() {
    if (body) {
      slice.call(body);
    }
  }), "Array", {
    slice : function(begin, end) {
      var len = toLength(this.length);
      var name = fn(this);
      if (end = void 0 === end ? len : end, "Array" == name) {
        return slice.call(this, begin, end);
      }
      var start = toIndex(begin, len);
      var upTo = toIndex(end, len);
      var size = toLength(upTo - start);
      /** @type {!Array} */
      var cloned = Array(size);
      /** @type {number} */
      var i = 0;
      for (; i < size; i++) {
        cloned[i] = "String" == name ? this.charAt(start + i) : this[start + i];
      }
      return cloned;
    }
  });
  /** @type {function(this:IArrayLike<T>, function(T, T): number=): !Array<T>} */
  var $sort = [].sort;
  /** @type {!Array} */
  var paramsWithDefault = [1, 2, 3];
  $def($def.P + $def.F * (fails(function() {
    paramsWithDefault.sort(void 0);
  }) || !fails(function() {
    paramsWithDefault.sort(null);
  }) || !toLengthsCorrectly($sort)), "Array", {
    sort : function(fn) {
      return void 0 === fn ? $sort.call(toObject(this)) : $sort.call(toObject(this), aFunction(fn));
    }
  });
  var j = Symbol("species");
  /**
   * @param {!Object} value
   * @return {?}
   */
  var getData = function(value) {
    var type;
    return isArray(value) && (type = value.constructor, "function" != typeof type || type !== Array && !isArray(type.prototype) || (type = void 0), isObject(type) && null === (type = type[j]) && (type = void 0)), void 0 === type ? Array : type;
  };
  /**
   * @param {!Object} path
   * @param {number} name
   * @return {?}
   */
  var atConstructor = function(path, name) {
    return new (getData(path))(name);
  };
  /**
   * @param {number} columnIndex
   * @param {!Function} ascending
   * @return {?}
   */
  var createDictMethod = function(columnIndex, ascending) {
    /** @type {boolean} */
    var IS_MAP = 1 == columnIndex;
    /** @type {boolean} */
    var IS_FILTER = 2 == columnIndex;
    /** @type {boolean} */
    var IS_SOME = 3 == columnIndex;
    /** @type {boolean} */
    var IS_EVERY = 4 == columnIndex;
    /** @type {boolean} */
    var IS_FIND_INDEX = 6 == columnIndex;
    /** @type {boolean} */
    var NO_HOLES = 5 == columnIndex || IS_FIND_INDEX;
    var asc = ascending || atConstructor;
    return function($this, fn, id) {
      var val;
      var res;
      var O = toObject($this);
      var self = IObject(O);
      var f = ctx(fn, id, 3);
      var length = toLength(self.length);
      /** @type {number} */
      var index = 0;
      var result = IS_MAP ? asc($this, length) : IS_FILTER ? asc($this, 0) : void 0;
      for (; length > index; index++) {
        if ((NO_HOLES || index in self) && (val = self[index], res = f(val, index, O), columnIndex)) {
          if (IS_MAP) {
            result[index] = res;
          } else {
            if (res) {
              switch(columnIndex) {
                case 3:
                  return true;
                case 5:
                  return val;
                case 6:
                  return index;
                case 2:
                  result.push(val);
              }
            } else {
              if (IS_EVERY) {
                return false;
              }
            }
          }
        }
      }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
    };
  };
  var $forEach = createDictMethod(0);
  var USE_NATIVE = toLengthsCorrectly([].forEach, true);
  $def($def.P + $def.F * !USE_NATIVE, "Array", {
    forEach : function(callbackfn) {
      return $forEach(this, callbackfn, arguments[1]);
    }
  });
  var applyParserGroup = createDictMethod(1);
  $def($def.P + $def.F * !toLengthsCorrectly([].map, true), "Array", {
    map : function(element) {
      return applyParserGroup(this, element, arguments[1]);
    }
  });
  var error = createDictMethod(2);
  $def($def.P + $def.F * !toLengthsCorrectly([].filter, true), "Array", {
    filter : function(search) {
      return error(this, search, arguments[1]);
    }
  });
  var $some = createDictMethod(3);
  $def($def.P + $def.F * !toLengthsCorrectly([].some, true), "Array", {
    some : function(callbackfn) {
      return $some(this, callbackfn, arguments[1]);
    }
  });
  var $every = createDictMethod(4);
  $def($def.P + $def.F * !toLengthsCorrectly([].every, true), "Array", {
    every : function(callbackfn) {
      return $every(this, callbackfn, arguments[1]);
    }
  });
  /**
   * @param {boolean} array
   * @param {!Object} fn
   * @param {number} val
   * @param {?} memo
   * @param {boolean} isRight
   * @return {?}
   */
  var reduce = function(array, fn, val, memo, isRight) {
    aFunction(fn);
    var O = toObject(array);
    var self = IObject(O);
    var length = toLength(O.length);
    /** @type {number} */
    var index = isRight ? length - 1 : 0;
    /** @type {number} */
    var i = isRight ? -1 : 1;
    if (val < 2) {
      for (;;) {
        if (index in self) {
          memo = self[index];
          /** @type {number} */
          index = index + i;
          break;
        }
        if (index = index + i, isRight ? index < 0 : length <= index) {
          throw TypeError("Reduce of empty array with no initial value");
        }
      }
    }
    for (; isRight ? index >= 0 : length > index; index = index + i) {
      if (index in self) {
        memo = fn(memo, self[index], index, O);
      }
    }
    return memo;
  };
  $def($def.P + $def.F * !toLengthsCorrectly([].reduce, true), "Array", {
    reduce : function(callback) {
      return reduce(this, callback, arguments.length, arguments[1], false);
    }
  });
  $def($def.P + $def.F * !toLengthsCorrectly([].reduceRight, true), "Array", {
    reduceRight : function(callback) {
      return reduce(this, callback, arguments.length, arguments[1], true);
    }
  });
  var $indexOf = run(false);
  /** @type {function(this:(IArrayLike<T>|string), T, number=): number} */
  var $native = [].indexOf;
  /** @type {boolean} */
  var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;
  $def($def.P + $def.F * (NEGATIVE_ZERO || !toLengthsCorrectly($native)), "Array", {
    indexOf : function(needle) {
      return NEGATIVE_ZERO ? $native.apply(this, arguments) || 0 : $indexOf(this, needle, arguments[1]);
    }
  });
  /** @type {function(this:(IArrayLike<T>|string), T, number=): number} */
  var temp = [].lastIndexOf;
  /** @type {boolean} */
  var BUGGY = !!temp && 1 / [1].lastIndexOf(1, -0) < 0;
  $def($def.P + $def.F * (BUGGY || !toLengthsCorrectly(temp)), "Array", {
    lastIndexOf : function(sought) {
      if (BUGGY) {
        return temp.apply(this, arguments) || 0;
      }
      var self = $(this);
      var length = toLength(self.length);
      /** @type {number} */
      var i = length - 1;
      if (arguments.length > 1) {
        /** @type {number} */
        i = Math.min(i, toInteger(arguments[1]));
      }
      if (i < 0) {
        i = length + i;
      }
      for (; i >= 0; i--) {
        if (i in self && self[i] === sought) {
          return i || 0;
        }
      }
      return -1;
    }
  });
  /** @type {function(this:Array, number, number, number=): !IArrayLike<T>} */
  var Array_copyWithin = [].copyWithin || function(start, code) {
    var self = toObject(this);
    var len = toLength(self.length);
    var x = toIndex(start, len);
    var i = toIndex(code, len);
    var undefined = arguments.length > 2 ? arguments[2] : void 0;
    /** @type {number} */
    var step = Math.min((void 0 === undefined ? len : toIndex(undefined, len)) - i, len - x);
    /** @type {number} */
    var qLen = 1;
    if (i < x && x < i + step) {
      /** @type {number} */
      qLen = -1;
      i = i + (step - 1);
      x = x + (step - 1);
    }
    for (; step-- > 0;) {
      if (i in self) {
        self[x] = self[i];
      } else {
        delete self[x];
      }
      x = x + qLen;
      i = i + qLen;
    }
    return self;
  };
  var x = Symbol("unscopables");
  var array = Array.prototype;
  if (void 0 == array[x]) {
    callback(array, x, {});
  }
  /**
   * @param {string} property
   * @return {undefined}
   */
  var forEach = function(property) {
    /** @type {boolean} */
    array[x][property] = true;
  };
  $def($def.P, "Array", {
    copyWithin : Array_copyWithin
  });
  forEach("copyWithin");
  /**
   * @param {?} value
   * @return {?}
   */
  var fill = function(value) {
    var O = toObject(this);
    var length = toLength(O.length);
    /** @type {number} */
    var aLen = arguments.length;
    var index = toIndex(aLen > 1 ? arguments[1] : void 0, length);
    var undefined = aLen > 2 ? arguments[2] : void 0;
    var endPos = void 0 === undefined ? length : toIndex(undefined, length);
    for (; endPos > index;) {
      O[index++] = value;
    }
    return O;
  };
  $def($def.P, "Array", {
    fill : fill
  });
  forEach("fill");
  var findKeywords = createDictMethod(5);
  /** @type {boolean} */
  var buggySlice = true;
  if ("find" in []) {
    Array(1).find(function() {
      /** @type {boolean} */
      buggySlice = false;
    });
  }
  $def($def.P + $def.F * buggySlice, "Array", {
    find : function(types) {
      return findKeywords(this, types, arguments.length > 1 ? arguments[1] : void 0);
    }
  });
  forEach("find");
  var findHelper = createDictMethod(6);
  /** @type {boolean} */
  var brokenDate = true;
  if ("findIndex" in []) {
    Array(1).findIndex(function() {
      /** @type {boolean} */
      brokenDate = false;
    });
  }
  $def($def.P + $def.F * brokenDate, "Array", {
    findIndex : function(predicate) {
      return findHelper(this, predicate, arguments.length > 1 ? arguments[1] : void 0);
    }
  });
  forEach("findIndex");
  var key = Symbol("species");
  /**
   * @param {string} name
   * @return {undefined}
   */
  var define = function(name) {
    var obj = root[name];
    if (SUPPORT_DESC && obj && !obj[key]) {
      util.f(obj, key, {
        configurable : true,
        get : function() {
          return this;
        }
      });
    }
  };
  define("Array");
  /**
   * @param {number} perc
   * @param {string} min
   * @return {?}
   */
  var step = function(perc, min) {
    return {
      value : min,
      done : !!perc
    };
  };
  var methods = init(Array, "Array", function(template, kind) {
    this._t = $(template);
    /** @type {number} */
    this._i = 0;
    /** @type {string} */
    this._k = kind;
  }, function() {
    var O = this._t;
    var undefined = this._k;
    /** @type {number} */
    var index = this._i++;
    return !O || index >= O.length ? (this._t = void 0, step(1)) : "keys" == undefined ? step(0, index) : "values" == undefined ? step(0, O[index]) : step(0, [index, O[index]]);
  }, "values");
  Iterators.Arguments = Iterators.Array;
  forEach("keys");
  forEach("values");
  forEach("entries");
  var image = core.Array;
  $def($def.S, "Date", {
    now : function() {
      return (new Date).getTime();
    }
  });
  $def($def.P + $def.F * fails(function() {
    return null !== (new Date(NaN)).toJSON() || 1 !== Date.prototype.toJSON.call({
      toISOString : function() {
        return 1;
      }
    });
  }), "Date", {
    toJSON : function(useChunks) {
      var object = toObject(this);
      var id = transform(object);
      return "number" != typeof id || isFinite(id) ? object.toISOString() : null;
    }
  });
  /** @type {function(this:Date): number} */
  var getTime = Date.prototype.getTime;
  /** @type {function(this:Date): string} */
  var check = Date.prototype.toISOString;
  /**
   * @param {number} num
   * @return {?}
   */
  var padNumber = function(num) {
    return num > 9 ? num : "0" + num;
  };
  /** @type {!Function} */
  var text = fails(function() {
    return "0385-07-25T07:06:39.999Z" != check.call(new Date(-5E13 - 1));
  }) || !fails(function() {
    check.call(new Date(NaN));
  }) ? function() {
    if (!isFinite(getTime.call(this))) {
      throw RangeError("Invalid time value");
    }
    var d = this;
    var year = d.getUTCFullYear();
    var n = d.getUTCMilliseconds();
    /** @type {string} */
    var s = year < 0 ? "-" : year > 9999 ? "+" : "";
    return s + ("00000" + Math.abs(year)).slice(s ? -6 : -4) + "-" + padNumber(d.getUTCMonth() + 1) + "-" + padNumber(d.getUTCDate()) + "T" + padNumber(d.getUTCHours()) + ":" + padNumber(d.getUTCMinutes()) + ":" + padNumber(d.getUTCSeconds()) + "." + (n > 99 ? n : "0" + padNumber(n)) + "Z";
  } : check;
  $def($def.P + $def.F * (Date.prototype.toISOString !== text), "Date", {
    toISOString : text
  });
  var proto = Date.prototype;
  /** @type {function(this:Date): string} */
  var toClassString = proto.toString;
  /** @type {function(this:Date): number} */
  var original = proto.getTime;
  if (new Date(NaN) + "" != "Invalid Date") {
    redefine(proto, "toString", function() {
      /** @type {number} */
      var upper = original.call(this);
      return upper === upper ? toClassString.call(this) : "Invalid Date";
    });
  }
  /**
   * @param {undefined} type
   * @return {?}
   */
  var from = function(type) {
    if ("string" !== type && "number" !== type && "default" !== type) {
      throw TypeError("Incorrect hint");
    }
    return transform(anObject(this), "number" != type);
  };
  var bar = Symbol("toPrimitive");
  var p = Date.prototype;
  if (!(bar in p)) {
    callback(p, bar, from);
  }
  /**
   * @param {!Function} fn
   * @param {!Array} args
   * @param {!Array} module
   * @return {?}
   */
  var invoke = function(fn, args, module) {
    /** @type {boolean} */
    var introFiles = void 0 === module;
    switch(args.length) {
      case 0:
        return introFiles ? fn() : fn.call(module);
      case 1:
        return introFiles ? fn(args[0]) : fn.call(module, args[0]);
      case 2:
        return introFiles ? fn(args[0], args[1]) : fn.call(module, args[0], args[1]);
      case 3:
        return introFiles ? fn(args[0], args[1], args[2]) : fn.call(module, args[0], args[1], args[2]);
      case 4:
        return introFiles ? fn(args[0], args[1], args[2], args[3]) : fn.call(module, args[0], args[1], args[2], args[3]);
    }
    return fn.apply(module, args);
  };
  /** @type {function(this:(IArrayLike<T>|string), *=, *=): !Array<T>} */
  var pSlice = [].slice;
  var cache = {};
  /**
   * @param {?} context
   * @param {number} name
   * @param {?} callback
   * @return {?}
   */
  var construct = function(context, name, callback) {
    if (!(name in cache)) {
      /** @type {!Array} */
      var littlesig = [];
      /** @type {number} */
      var l = 0;
      for (; l < name; l++) {
        /** @type {string} */
        littlesig[l] = "a[" + l + "]";
      }
      cache[name] = Function("F,a", "return new F(" + littlesig.join(",") + ")");
    }
    return cache[name](context, callback);
  };
  var bind = Function.bind || function(status) {
    var fn = aFunction(this);
    /** @type {!Array<?>} */
    var headArgs = pSlice.call(arguments, 1);
    /**
     * @return {?}
     */
    var bound = function() {
      /** @type {!Array<?>} */
      var args = headArgs.concat(pSlice.call(arguments));
      return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, status);
    };
    return isObject(fn.prototype) && (bound.prototype = fn.prototype), bound;
  };
  $def($def.P, "Function", {
    bind : bind
  });
  /** @type {!Function} */
  var deprecated = util.f;
  var option = Function.prototype;
  /** @type {!RegExp} */
  var regJsonFormat = /^\s*function ([^ (]*)/;
  if (!("name" in option)) {
    if (SUPPORT_DESC) {
      deprecated(option, "name", {
        configurable : true,
        get : function() {
          try {
            return ("" + this).match(regJsonFormat)[1];
          } catch (t) {
            return "";
          }
        }
      });
    }
  }
  var length = Symbol("hasInstance");
  var obj = Function.prototype;
  if (!(length in obj)) {
    util.f(obj, length, {
      value : function(O) {
        if ("function" != typeof this || !isObject(O)) {
          return false;
        }
        if (!isObject(this.prototype)) {
          return O instanceof this;
        }
        for (; O = getPrototypeOf(O);) {
          if (this.prototype === O) {
            return true;
          }
        }
        return false;
      }
    });
  }
  var test = {};
  /** @type {string} */
  test[Symbol("toStringTag")] = "z";
  if (test + "" != "[object z]") {
    redefine(Object.prototype, "toString", function() {
      return "[object " + parse(this) + "]";
    }, true);
  }
  var type = Symbol("iterator");
  var secret = Symbol("toStringTag");
  var ArrayValues = Iterators.Array;
  var O = {
    CSSRuleList : true,
    CSSStyleDeclaration : false,
    CSSValueList : false,
    ClientRectList : false,
    DOMRectList : false,
    DOMStringList : false,
    DOMTokenList : true,
    DataTransferItemList : false,
    FileList : false,
    HTMLAllCollection : false,
    HTMLCollection : false,
    HTMLFormElement : false,
    HTMLSelectElement : false,
    MediaList : true,
    MimeTypeArray : false,
    NamedNodeMap : false,
    NodeList : true,
    PaintRequestList : false,
    Plugin : false,
    PluginArray : false,
    SVGLengthList : false,
    SVGNumberList : false,
    SVGPathSegList : false,
    SVGPointList : false,
    SVGStringList : false,
    SVGTransformList : false,
    SourceBufferList : false,
    StyleSheetList : true,
    TextTrackCueList : false,
    TextTrackList : false,
    TouchList : false
  };
  /** @type {!Array<string>} */
  var keys = $keys(O);
  /** @type {number} */
  var n = 0;
  for (; n < keys.length; n++) {
    var key;
    /** @type {string} */
    var i = keys[n];
    var tokenItem = O[i];
    var object = root[i];
    var gl = object && object.prototype;
    if (gl && (gl[type] || callback(gl, type, ArrayValues), gl[secret] || callback(gl, secret, i), Iterators[i] = ArrayValues, tokenItem)) {
      for (key in methods) {
        if (!gl[key]) {
          redefine(gl, key, methods[key], true);
        }
      }
    }
  }
  /**
   * @param {?} target
   * @param {!Object} src
   * @param {boolean} deep
   * @return {?}
   */
  var mix = function(target, src, deep) {
    var key;
    for (key in src) {
      redefine(target, key, src[key], deep);
    }
    return target;
  };
  /**
   * @param {!Object} element
   * @param {!Function} key
   * @param {!Object} name
   * @param {?} options
   * @return {?}
   */
  var hide = function(element, key, name, options) {
    if (!(element instanceof key) || void 0 !== options && options in element) {
      throw TypeError(name + ": incorrect invocation!");
    }
    return element;
  };
  var forOf = require(function(mixin) {
    var BREAK = {};
    var RETURN = {};
    /** @type {function(!Object, string, !Object, ?, boolean): ?} */
    var exports = mixin.exports = function(obj, name, key, id, isArray) {
      var length;
      var step;
      var html;
      var result;
      var ret = isArray ? function() {
        return obj;
      } : getIterFn(obj);
      var f = ctx(key, id, name ? 2 : 1);
      /** @type {number} */
      var index = 0;
      if ("function" != typeof ret) {
        throw TypeError(obj + " is not iterable!");
      }
      if (isArrayIter(ret)) {
        length = toLength(obj.length);
        for (; length > index; index++) {
          if ((result = name ? f(anObject(step = obj[index])[0], step[1]) : f(obj[index])) === BREAK || result === RETURN) {
            return result;
          }
        }
      } else {
        html = ret.call(obj);
        for (; !(step = html.next()).done;) {
          if ((result = call(html, f, step.value, name)) === BREAK || result === RETURN) {
            return result;
          }
        }
      }
    };
    exports.BREAK = BREAK;
    exports.RETURN = RETURN;
  });
  var attr = require(function(module) {
    var i = add("meta");
    /** @type {!Function} */
    var defineProperty = util.f;
    /** @type {number} */
    var id = 0;
    /** @type {function(!Object): boolean} */
    var isExtensible = Object.isExtensible || function() {
      return true;
    };
    /** @type {boolean} */
    var FREEZE = !fails(function() {
      return isExtensible(Object.preventExtensions({}));
    });
    /**
     * @param {!Object} key
     * @return {undefined}
     */
    var setMeta = function(key) {
      defineProperty(key, i, {
        value : {
          i : "O" + ++id,
          w : {}
        }
      });
    };
    /**
     * @param {!Object} it
     * @param {boolean} create
     * @return {?}
     */
    var fastKey = function(it, create) {
      if (!isObject(it)) {
        return "symbol" == typeof it ? it : ("string" == typeof it ? "S" : "P") + it;
      }
      if (!has(it, i)) {
        if (!isExtensible(it)) {
          return "F";
        }
        if (!create) {
          return "E";
        }
        setMeta(it);
      }
      return it[i].i;
    };
    /**
     * @param {?} it
     * @param {boolean} create
     * @return {?}
     */
    var getWeak = function(it, create) {
      if (!has(it, i)) {
        if (!isExtensible(it)) {
          return true;
        }
        if (!create) {
          return false;
        }
        setMeta(it);
      }
      return it[i].w;
    };
    /**
     * @param {!Object} it
     * @return {?}
     */
    var onFreeze = function(it) {
      return FREEZE && meta.NEED && isExtensible(it) && !has(it, i) && setMeta(it), it;
    };
    var meta = module.exports = {
      KEY : i,
      NEED : false,
      fastKey : fastKey,
      getWeak : getWeak,
      onFreeze : onFreeze
    };
  });
  /**
   * @param {!Object} context
   * @param {!Object} v
   * @return {?}
   */
  var format = function(context, v) {
    if (!isObject(context) || context._t !== v) {
      throw TypeError("Incompatible receiver, " + v + " required!");
    }
    return context;
  };
  /** @type {!Function} */
  var extend = util.f;
  var fastKey = attr.fastKey;
  /** @type {string} */
  var SIZE = SUPPORT_DESC ? "_s" : "size";
  /**
   * @param {!Function} that
   * @param {?} key
   * @return {?}
   */
  var getEntry = function(that, key) {
    var entry;
    var index = fastKey(key);
    if ("F" !== index) {
      return that._i[index];
    }
    entry = that._f;
    for (; entry; entry = entry.n) {
      if (entry.k == key) {
        return entry;
      }
    }
  };
  var strong = {
    getConstructor : function(wrapper, NAME, IS_MAP, ADDER) {
      var data = wrapper(function(that, items) {
        hide(that, data, NAME, "_i");
        /** @type {number} */
        that._t = NAME;
        /** @type {!Object} */
        that._i = _create(null);
        that._f = void 0;
        that._l = void 0;
        /** @type {number} */
        that[SIZE] = 0;
        if (void 0 != items) {
          forOf(items, IS_MAP, that[ADDER], that);
        }
      });
      return mix(data.prototype, {
        clear : function() {
          var config = format(this, NAME);
          var data = config._i;
          var entry = config._f;
          for (; entry; entry = entry.n) {
            /** @type {boolean} */
            entry.r = true;
            if (entry.p) {
              entry.p = entry.p.n = void 0;
            }
            delete data[entry.i];
          }
          config._f = config._l = void 0;
          /** @type {number} */
          config[SIZE] = 0;
        },
        delete : function(id) {
          var that = format(this, NAME);
          var entry = getEntry(that, id);
          if (entry) {
            var next = entry.n;
            var prev = entry.p;
            delete that._i[entry.i];
            /** @type {boolean} */
            entry.r = true;
            if (prev) {
              prev.n = next;
            }
            if (next) {
              next.p = prev;
            }
            if (that._f == entry) {
              that._f = next;
            }
            if (that._l == entry) {
              that._l = prev;
            }
            that[SIZE]--;
          }
          return !!entry;
        },
        forEach : function(fn) {
          format(this, NAME);
          var entry;
          var f = ctx(fn, arguments.length > 1 ? arguments[1] : void 0, 3);
          for (; entry = entry ? entry.n : this._f;) {
            f(entry.v, entry.k, this);
            for (; entry && entry.r;) {
              entry = entry.p;
            }
          }
        },
        has : function(path) {
          return !!getEntry(format(this, NAME), path);
        }
      }), SUPPORT_DESC && extend(data.prototype, "size", {
        get : function() {
          return format(this, NAME)[SIZE];
        }
      }), data;
    },
    def : function(that, key, value) {
      var prev;
      var index;
      var entry = getEntry(that, key);
      return entry ? entry.v = value : (that._l = entry = {
        i : index = fastKey(key, true),
        k : key,
        v : value,
        p : prev = that._l,
        n : void 0,
        r : false
      }, that._f || (that._f = entry), prev && (prev.n = entry), that[SIZE]++, "F" !== index && (that._i[index] = entry)), that;
    },
    getEntry : getEntry,
    setStrong : function(C, NAME, IS_MAP) {
      init(C, NAME, function(template, kind) {
        this._t = format(template, NAME);
        /** @type {string} */
        this._k = kind;
        this._l = void 0;
      }, function() {
        var that = this;
        var kind = that._k;
        var entry = that._l;
        for (; entry && entry.r;) {
          entry = entry.p;
        }
        return that._t && (that._l = entry = entry ? entry.n : that._t._f) ? "keys" == kind ? step(0, entry.k) : "values" == kind ? step(0, entry.v) : step(0, [entry.k, entry.v]) : (that._t = void 0, step(1));
      }, IS_MAP ? "entries" : "values", !IS_MAP, true);
      define(NAME);
    }
  };
  /** @type {function(this:Object, string): boolean} */
  var buildDeleteShipmentRequest = {}.propertyIsEnumerable;
  var pIE = {
    f : buildDeleteShipmentRequest
  };
  /** @type {function(T, string): (ObjectPropertyDescriptor<T>|undefined)} */
  var describe = Object.getOwnPropertyDescriptor;
  /** @type {!Function} */
  var fctname = SUPPORT_DESC ? describe : function(description, name) {
    if (description = $(description), name = transform(name, true), _dom_content_get) {
      try {
        return describe(description, name);
      } catch (t) {
      }
    }
    if (has(description, name)) {
      return createDesc(!pIE.f.call(description, name), description[name]);
    }
  };
  var assert = {
    f : fctname
  };
  /**
   * @param {!Object} target
   * @param {!Object} key
   * @return {undefined}
   */
  var create = function(target, key) {
    if (anObject(target), !isObject(key) && null !== key) {
      throw TypeError(key + ": can't set as prototype!");
    }
  };
  var opts = {
    set : Object.setPrototypeOf || ("__proto__" in {} ? function(s, i, removeState) {
      try {
        removeState = ctx(Function.call, assert.f(Object.prototype, "__proto__").set, 2);
        removeState(s, []);
        /** @type {boolean} */
        i = !(s instanceof Array);
      } catch (t) {
        /** @type {boolean} */
        i = true;
      }
      return function(s, r) {
        return create(s, r), i ? s.__proto__ = r : removeState(s, r), s;
      };
    }({}, false) : void 0),
    check : create
  };
  /** @type {function(!Object, ?): !Object} */
  var matches_criteria = opts.set;
  /**
   * @param {undefined} file
   * @param {!Object} a
   * @param {!Function} fn
   * @return {?}
   */
  var cb = function(file, a, fn) {
    var P;
    var S = a.constructor;
    return S !== fn && "function" == typeof S && (P = S.prototype) !== fn.prototype && isObject(P) && matches_criteria && matches_criteria(file, P), file;
  };
  /**
   * @param {?} NAME
   * @param {!Function} wrapper
   * @param {!Object} obj
   * @param {!Object} common
   * @param {boolean} IS_MAP
   * @param {!Object} IS_WEAK
   * @return {?}
   */
  var getCollection = function(NAME, wrapper, obj, common, IS_MAP, IS_WEAK) {
    var Base = root[NAME];
    var C = Base;
    /** @type {string} */
    var ADDER = IS_MAP ? "set" : "add";
    var proto = C && C.prototype;
    var O = {};
    /**
     * @param {string} method
     * @return {undefined}
     */
    var fixMethod = function(method) {
      var params = proto[method];
      redefine(proto, method, "delete" == method ? function(value) {
        return !(IS_WEAK && !isObject(value)) && params.call(this, 0 === value ? 0 : value);
      } : "has" == method ? function(value) {
        return !(IS_WEAK && !isObject(value)) && params.call(this, 0 === value ? 0 : value);
      } : "get" == method ? function(value) {
        return IS_WEAK && !isObject(value) ? void 0 : params.call(this, 0 === value ? 0 : value);
      } : "add" == method ? function(value) {
        return params.call(this, 0 === value ? 0 : value), this;
      } : function(value, current) {
        return params.call(this, 0 === value ? 0 : value, current), this;
      });
    };
    if ("function" == typeof C && (IS_WEAK || proto.forEach && !fails(function() {
      (new C).entries().next();
    }))) {
      var instance = new C;
      /** @type {boolean} */
      var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
      var inputWin = fails(function() {
        instance.has(1);
      });
      var isShorten = find(function(a) {
        new C(a);
      });
      var winRef = !IS_WEAK && fails(function() {
        var $instance = new C;
        /** @type {number} */
        var index = 5;
        for (; index--;) {
          $instance[ADDER](index, index);
        }
        return !$instance.has(-0);
      });
      if (!isShorten) {
        C = wrapper(function(container, value) {
          hide(container, C, NAME);
          var that = cb(new Base, container, C);
          return void 0 != value && forOf(value, IS_MAP, that[ADDER], that), that;
        });
        C.prototype = proto;
        proto.constructor = C;
      }
      if (inputWin || winRef) {
        fixMethod("delete");
        fixMethod("has");
        if (IS_MAP) {
          fixMethod("get");
        }
      }
      if (winRef || HASNT_CHAINING) {
        fixMethod(ADDER);
      }
      if (IS_WEAK && proto.clear) {
        delete proto.clear;
      }
    } else {
      C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
      mix(C.prototype, obj);
      /** @type {boolean} */
      attr.NEED = true;
    }
    return setToStringTag(C, NAME), O[NAME] = C, $def($def.G + $def.W + $def.F * (C != Base), O), IS_WEAK || common.setStrong(C, NAME, IS_MAP), C;
  };
  var Map = getCollection("Map", function(saveNotifs) {
    return function() {
      return saveNotifs(this, arguments.length > 0 ? arguments[0] : void 0);
    };
  }, {
    get : function(key) {
      var entry = strong.getEntry(format(this, "Map"), key);
      return entry && entry.v;
    },
    set : function(key, value) {
      return strong.def(format(this, "Map"), 0 === key ? 0 : key, value);
    }
  }, strong, true);
  /** @type {function(number): number} */
  var log1p = Math.log1p || function(value) {
    return (value = +value) > -1E-8 && value < 1E-8 ? value - value * value / 2 : Math.log(1 + value);
  };
  /** @type {function(?): number} */
  var sqrt = Math.sqrt;
  /** @type {function(number): number} */
  var $acosh = Math.acosh;
  $def($def.S + $def.F * !($acosh && 710 == Math.floor($acosh(Number.MAX_VALUE)) && $acosh(1 / 0) == 1 / 0), "Math", {
    acosh : function(x) {
      return (x = +x) < 1 ? NaN : x > 9.490626562425156E7 ? Math.log(x) + Math.LN2 : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
    }
  });
  /** @type {function(number): number} */
  var nativeRandom = Math.asinh;
  $def($def.S + $def.F * !(nativeRandom && 1 / nativeRandom(0) > 0), "Math", {
    asinh : asinh
  });
  /** @type {function(number): number} */
  var atanh = Math.atanh;
  $def($def.S + $def.F * !(atanh && 1 / atanh(-0) < 0), "Math", {
    atanh : function(x) {
      return 0 == (x = +x) ? x : Math.log((1 + x) / (1 - x)) / 2;
    }
  });
  /** @type {function(number): number} */
  var sign = Math.sign || function(right) {
    return 0 == (right = +right) || right != right ? right : right < 0 ? -1 : 1;
  };
  $def($def.S, "Math", {
    cbrt : function(x) {
      return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
    }
  });
  $def($def.S, "Math", {
    clz32 : function(value) {
      return (value = value >>> 0) ? 31 - Math.floor(Math.log(value + .5) * Math.LOG2E) : 32;
    }
  });
  /** @type {function(?): number} */
  var rand = Math.exp;
  $def($def.S, "Math", {
    cosh : function(a) {
      return (rand(a = +a) + rand(-a)) / 2;
    }
  });
  /** @type {function(number): number} */
  var Mabs = Math.expm1;
  /** @type {!Function} */
  var expm1 = !Mabs || Mabs(10) > 22025.465794806718 || Mabs(10) < 22025.465794806718 || -2E-17 != Mabs(-2E-17) ? function(n) {
    return 0 == (n = +n) ? n : n > -1E-6 && n < 1E-6 ? n + n * n / 2 : Math.exp(n) - 1;
  } : Mabs;
  $def($def.S + $def.F * (expm1 != Math.expm1), "Math", {
    expm1 : expm1
  });
  /** @type {function(?, ?): number} */
  var $pow = Math.pow;
  /** @type {number} */
  var EPSILON = $pow(2, -52);
  /** @type {number} */
  var retinaScale = $pow(2, -23);
  /** @type {number} */
  var MAX32 = $pow(2, 127) * (2 - retinaScale);
  /** @type {number} */
  var scale_highlight = $pow(2, -126);
  /**
   * @param {number} n
   * @return {?}
   */
  var outNumber = function(n) {
    return n + 1 / EPSILON - 1 / EPSILON;
  };
  var Math_fround = Math.fround || function(val) {
    var a;
    var result;
    /** @type {number} */
    var x = Math.abs(val);
    /** @type {number} */
    var signed = sign(val);
    return x < scale_highlight ? signed * outNumber(x / scale_highlight / retinaScale) * scale_highlight * retinaScale : (a = (1 + retinaScale / EPSILON) * x, result = a - (a - x), result > MAX32 || result != result ? signed * (1 / 0) : signed * result);
  };
  $def($def.S, "Math", {
    fround : Math_fround
  });
  /** @type {function(?): number} */
  var abs = Math.abs;
  $def($def.S, "Math", {
    hypot : function(value2, result) {
      var w;
      var x;
      /** @type {number} */
      var a = 0;
      /** @type {number} */
      var _key8 = 0;
      /** @type {number} */
      var _len8 = arguments.length;
      /** @type {number} */
      var r = 0;
      for (; _key8 < _len8;) {
        /** @type {number} */
        w = abs(arguments[_key8++]);
        if (r < w) {
          /** @type {number} */
          x = r / w;
          /** @type {number} */
          a = a * x * x + 1;
          /** @type {number} */
          r = w;
        } else {
          if (w > 0) {
            /** @type {number} */
            x = w / r;
            /** @type {number} */
            a = a + x * x;
          } else {
            /** @type {number} */
            a = a + w;
          }
        }
      }
      return r === 1 / 0 ? 1 / 0 : r * Math.sqrt(a);
    }
  });
  /** @type {function(number, number): number} */
  var asin = Math.imul;
  $def($def.S + $def.F * fails(function() {
    return -5 != asin(4294967295, 5) || 2 != asin.length;
  }), "Math", {
    imul : function(num, x) {
      /** @type {number} */
      var n = +num;
      /** @type {number} */
      var xn = +x;
      /** @type {number} */
      var row = 65535 & n;
      /** @type {number} */
      var gutterStep = 65535 & xn;
      return 0 | row * gutterStep + ((65535 & n >>> 16) * gutterStep + row * (65535 & xn >>> 16) << 16 >>> 0);
    }
  });
  $def($def.S, "Math", {
    log10 : function(num) {
      return Math.log(num) * Math.LOG10E;
    }
  });
  $def($def.S, "Math", {
    log1p : log1p
  });
  $def($def.S, "Math", {
    log2 : function(n) {
      return Math.log(n) / Math.LN2;
    }
  });
  $def($def.S, "Math", {
    sign : sign
  });
  /** @type {function(?): number} */
  var exp = Math.exp;
  $def($def.S + $def.F * fails(function() {
    return -2E-17 != !Math.sinh(-2E-17);
  }), "Math", {
    sinh : function(x) {
      return Math.abs(x = +x) < 1 ? (expm1(x) - expm1(-x)) / 2 : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
    }
  });
  /** @type {function(?): number} */
  var numToChar = Math.exp;
  $def($def.S, "Math", {
    tanh : function(x) {
      var b = expm1(x = +x);
      var a = expm1(-x);
      return b == 1 / 0 ? 1 : a == 1 / 0 ? -1 : (b - a) / (numToChar(x) + numToChar(-x));
    }
  });
  $def($def.S, "Math", {
    trunc : function(it) {
      return (it > 0 ? Math.floor : Math.ceil)(it);
    }
  });
  /** @type {!Array<?>} */
  var keys2 = keys1.concat("length", "prototype");
  /** @type {function(!Object): !Array<string>} */
  var Uints = Object.getOwnPropertyNames || function(description) {
    return update(description, keys2);
  };
  var params = {
    f : Uints
  };
  /** @type {string} */
  var release = "\t\n\v\f\r \u807d\u91df\u20ac\u91e5\u5e98\u20ac\u20ac\u9225\u4f72\u20ac\u5097\u20ac\u51a3\u20ac\u52e8\u20ac\u546a\u20ac\u55cf\u20ac\u56e3\u20ac\u581a\u20ac\u5906\u20ac\u5a3e\u20ac\ue217\u4ee7\u9286\u20ac\u2028\u2029\ufeff";
  /** @type {string} */
  var Vn = "[" + release + "]";
  /** @type {string} */
  var __mojoServiceRegistry = "\u9225\u5b04\ufffd";
  /** @type {!RegExp} */
  var regex = RegExp("^" + Vn + Vn + "*");
  /** @type {!RegExp} */
  var replaceRegex = RegExp(Vn + Vn + "*$");
  /**
   * @param {string} name
   * @param {!Function} callback
   * @param {?} args
   * @return {undefined}
   */
  var exporter = function(name, callback, args) {
    var json = {};
    var buggySlice = fails(function() {
      return !!release[name]() || __mojoServiceRegistry[name]() != __mojoServiceRegistry;
    });
    var inch_args = json[name] = buggySlice ? callback(parserErr) : release[name];
    if (args) {
      json[args] = inch_args;
    }
    $def($def.P + $def.F * buggySlice, "String", json);
  };
  /** @type {function(string, number): ?} */
  var parserErr = exporter.trim = function(text, ch) {
    return text = String(filter(text)), 1 & ch && (text = text.replace(regex, "")), 2 & ch && (text = text.replace(replaceRegex, "")), text;
  };
  /** @type {function(string, !Function, ?): undefined} */
  var d = exporter;
  /** @type {function(!Object): !Array<string>} */
  var field = params.f;
  /** @type {!Function} */
  var iteratee = assert.f;
  /** @type {!Function} */
  var setter = util.f;
  /** @type {function(string, number): ?} */
  var trim = d.trim;
  var val = root.Number;
  var value = val;
  var str = val.prototype;
  /** @type {boolean} */
  var BROKEN_COF = "Number" == fn(_create(str));
  /** @type {boolean} */
  var bNoParse = "trim" in String.prototype;
  /**
   * @param {string} value
   * @return {?}
   */
  var getValue = function(value) {
    var html = transform(value, false);
    if ("string" == typeof html && html.length > 2) {
      html = bNoParse ? html.trim() : trim(html, 3);
      var n;
      var radix;
      var M;
      var value = html.charCodeAt(0);
      if (43 === value || 45 === value) {
        if (88 === (n = html.charCodeAt(2)) || 120 === n) {
          return NaN;
        }
      } else {
        if (48 === value) {
          switch(html.charCodeAt(1)) {
            case 66:
            case 98:
              /** @type {number} */
              radix = 2;
              /** @type {number} */
              M = 49;
              break;
            case 79:
            case 111:
              /** @type {number} */
              radix = 8;
              /** @type {number} */
              M = 55;
              break;
            default:
              return +html;
          }
          var g;
          var cc = html.slice(2);
          /** @type {number} */
          var p = 0;
          var s = cc.length;
          for (; p < s; p++) {
            if ((g = cc.charCodeAt(p)) < 48 || g > M) {
              return NaN;
            }
          }
          return parseInt(cc, radix);
        }
      }
    }
    return +html;
  };
  if (!val(" 0o1") || !val("0b1") || val("+0x1")) {
    /**
     * @param {!Object} description
     * @return {?}
     */
    val = function(description) {
      var childCompute = arguments.length < 1 ? 0 : description;
      var that = this;
      return that instanceof val && (BROKEN_COF ? fails(function() {
        str.valueOf.call(that);
      }) : "Number" != fn(that)) ? cb(new value(getValue(childCompute)), that, val) : getValue(childCompute);
    };
    var key;
    /** @type {!Array<string>} */
    var keys = SUPPORT_DESC ? field(value) : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(",");
    /** @type {number} */
    var i = 0;
    for (; keys.length > i; i++) {
      if (has(value, key = keys[i]) && !has(val, key)) {
        setter(val, key, iteratee(value, key));
      }
    }
    val.prototype = str;
    /** @type {function(!Object): ?} */
    str.constructor = val;
    redefine(root, "Number", val);
  }
  /**
   * @param {!Object} callback
   * @param {string} message
   * @return {?}
   */
  var round = function(callback, message) {
    if ("number" != typeof callback && "Number" != fn(callback)) {
      throw TypeError(message);
    }
    return +callback;
  };
  /**
   * @param {undefined} count
   * @return {?}
   */
  var repeat = function(count) {
    /** @type {string} */
    var str = String(filter(this));
    /** @type {string} */
    var newStr = "";
    var n = toInteger(count);
    if (n < 0 || n == 1 / 0) {
      throw RangeError("Count can't be negative");
    }
    for (; n > 0; (n = n >>> 1) && (str = str + str)) {
      if (1 & n) {
        /** @type {string} */
        newStr = newStr + str;
      }
    }
    return newStr;
  };
  /** @type {function(this:number, *=): string} */
  var $toFixed = (1).toFixed;
  /** @type {function(?): number} */
  var floor = Math.floor;
  /** @type {!Array} */
  var values = [0, 0, 0, 0, 0, 0];
  /** @type {string} */
  var ERROR = "Number.toFixed: incorrect invocation!";
  /**
   * @param {number} i
   * @param {number} a
   * @return {undefined}
   */
  var multiply = function(i, a) {
    /** @type {number} */
    var j = -1;
    /** @type {number} */
    var k = a;
    for (; ++j < 6;) {
      k = k + i * values[j];
      /** @type {number} */
      values[j] = k % 1E7;
      /** @type {number} */
      k = floor(k / 1E7);
    }
  };
  /**
   * @param {number} b
   * @return {undefined}
   */
  var divide = function(b) {
    /** @type {number} */
    var i = 6;
    /** @type {number} */
    var value = 0;
    for (; --i >= 0;) {
      value = value + values[i];
      /** @type {number} */
      values[i] = floor(value / b);
      /** @type {number} */
      value = value % b * 1E7;
    }
  };
  /**
   * @return {?}
   */
  var numToString = function() {
    /** @type {number} */
    var i = 6;
    /** @type {string} */
    var key = "";
    for (; --i >= 0;) {
      if ("" !== key || 0 === i || 0 !== values[i]) {
        /** @type {string} */
        var value = String(values[i]);
        /** @type {string} */
        key = "" === key ? value : key + repeat.call("0", 7 - value.length) + value;
      }
    }
    return key;
  };
  /**
   * @param {number} x
   * @param {number} n
   * @param {number} acc
   * @return {?}
   */
  var pow = function(x, n, acc) {
    return 0 === n ? acc : n % 2 == 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
  };
  /**
   * @param {number} callback
   * @return {?}
   */
  var log = function(callback) {
    /** @type {number} */
    var notifications = 0;
    /** @type {number} */
    var c = callback;
    for (; c >= 4096;) {
      /** @type {number} */
      notifications = notifications + 12;
      /** @type {number} */
      c = c / 4096;
    }
    for (; c >= 2;) {
      /** @type {number} */
      notifications = notifications + 1;
      /** @type {number} */
      c = c / 2;
    }
    return notifications;
  };
  $def($def.P + $def.F * (!!$toFixed && ("0.000" !== (8E-5).toFixed(3) || "1" !== (.9).toFixed(0) || "1.25" !== (1.255).toFixed(2) || "1000000000000000128" !== (0xde0b6b3a7640080).toFixed(0)) || !fails(function() {
    $toFixed.call({});
  })), "Number", {
    toFixed : function(n) {
      var e;
      var b;
      var j;
      var k;
      var x = round(this, ERROR);
      var f = toInteger(n);
      /** @type {string} */
      var i = "";
      /** @type {string} */
      var m = "0";
      if (f < 0 || f > 20) {
        throw RangeError(ERROR);
      }
      if (x != x) {
        return "NaN";
      }
      if (x <= -1E21 || x >= 1E21) {
        return String(x);
      }
      if (x < 0 && (i = "-", x = -x), x > 1E-21) {
        if (e = log(x * pow(2, 69, 1)) - 69, b = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1), b = b * 4503599627370496, (e = 52 - e) > 0) {
          multiply(0, b);
          j = f;
          for (; j >= 7;) {
            multiply(1E7, 0);
            /** @type {number} */
            j = j - 7;
          }
          multiply(pow(10, j, 1), 0);
          /** @type {number} */
          j = e - 1;
          for (; j >= 23;) {
            divide(1 << 23);
            /** @type {number} */
            j = j - 23;
          }
          divide(1 << j);
          multiply(1, 1);
          divide(2);
          m = numToString();
        } else {
          multiply(0, b);
          multiply(1 << -e, 0);
          m = numToString() + repeat.call("0", f);
        }
      }
      return f > 0 ? (k = m.length, m = i + (k <= f ? "0." + repeat.call("0", f - k) + m : m.slice(0, k - f) + "." + m.slice(k - f))) : m = i + m, m;
    }
  });
  /** @type {function(this:number, number=): string} */
  var $toPrecision = (1).toPrecision;
  $def($def.P + $def.F * (fails(function() {
    return "1" !== $toPrecision.call(1, void 0);
  }) || !fails(function() {
    $toPrecision.call({});
  })), "Number", {
    toPrecision : function(undefined) {
      var b = round(this, "Number#toPrecision: incorrect invocation!");
      return void 0 === undefined ? $toPrecision.call(b) : $toPrecision.call(b, undefined);
    }
  });
  $def($def.S, "Number", {
    EPSILON : Math.pow(2, -52)
  });
  var nativeIsFinite = root.isFinite;
  $def($def.S, "Number", {
    isFinite : function(value) {
      return "number" == typeof value && nativeIsFinite(value);
    }
  });
  /** @type {function(?): number} */
  var nativeFloor = Math.floor;
  /**
   * @param {string} n
   * @return {?}
   */
  var isInteger = function(n) {
    return !isObject(n) && isFinite(n) && nativeFloor(n) === n;
  };
  $def($def.S, "Number", {
    isInteger : isInteger
  });
  $def($def.S, "Number", {
    isNaN : function(value) {
      return value != value;
    }
  });
  /** @type {function(?): number} */
  var _abs = Math.abs;
  $def($def.S, "Number", {
    isSafeInteger : function(number) {
      return isInteger(number) && _abs(number) <= 9007199254740991;
    }
  });
  $def($def.S, "Number", {
    MAX_SAFE_INTEGER : 9007199254740991
  });
  $def($def.S, "Number", {
    MIN_SAFE_INTEGER : -9007199254740991
  });
  var template = root.parseFloat;
  /** @type {function(string, number): ?} */
  var $trim = d.trim;
  var $parseFloat = 1 / template(release + "-0") != -1 / 0 ? function(str) {
    var string = $trim(String(str), 3);
    var output = template(string);
    return 0 === output && "-" == string.charAt(0) ? -0 : output;
  } : template;
  $def($def.S + $def.F * (Number.parseFloat != $parseFloat), "Number", {
    parseFloat : $parseFloat
  });
  var nativeParseInt = root.parseInt;
  /** @type {function(string, number): ?} */
  var fixLastWordProblem = d.trim;
  /** @type {!RegExp} */
  var regBigBrackets = /^[-+]?0[xX]/;
  var $parseInt = 8 !== nativeParseInt(release + "08") || 22 !== nativeParseInt(release + "0x16") ? function(chunk, canCreateDiscussions) {
    var string = fixLastWordProblem(String(chunk), 3);
    return nativeParseInt(string, canCreateDiscussions >>> 0 || (regBigBrackets.test(string) ? 16 : 10));
  } : nativeParseInt;
  $def($def.S + $def.F * (Number.parseInt != $parseInt), "Number", {
    parseInt : $parseInt
  });
  var _symbol = Symbol;
  var sink = {
    f : _symbol
  };
  /** @type {!Function} */
  var equal = util.f;
  /** @type {function(!Object): !Array<?>} */
  var ownSymbols = Object.getOwnPropertySymbols;
  var gOPNExt = {
    f : ownSymbols
  };
  /**
   * @param {undefined} o
   * @return {?}
   */
  var getKeys = function(o) {
    /** @type {!Array<string>} */
    var keys = $keys(o);
    /** @type {!Function} */
    var callback = gOPNExt.f;
    if (callback) {
      var key;
      var r = callback(o);
      /** @type {!Function} */
      var isEnum = pIE.f;
      /** @type {number} */
      var offset = 0;
      for (; r.length > offset;) {
        if (isEnum.call(o, key = r[offset++])) {
          keys.push(key);
        }
      }
    }
    return keys;
  };
  /** @type {function(!Object): !Array<string>} */
  var tableRowItems = params.f;
  /** @type {function(this:*): string} */
  var ts = {}.toString;
  /** @type {!Array} */
  var charListNotLatin = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
  /**
   * @param {!Object} description
   * @return {?}
   */
  var tableRow = function(description) {
    try {
      return tableRowItems(description);
    } catch (t) {
      return charListNotLatin.slice();
    }
  };
  /**
   * @param {!Object} description
   * @return {?}
   */
  var base = function(description) {
    return charListNotLatin && "[object Window]" == ts.call(description) ? tableRow(description) : tableRowItems($(description));
  };
  var dataEdge = {
    f : base
  };
  var width = attr.KEY;
  /** @type {!Function} */
  var gOPD = assert.f;
  /** @type {!Function} */
  var setDesc = util.f;
  /** @type {function(!Object): ?} */
  var gOPN = dataEdge.f;
  var $Symbol = root.Symbol;
  var $JSON = root.JSON;
  var _stringify = $JSON && $JSON.stringify;
  var HIDDEN = Symbol("_hidden");
  var s = Symbol("toPrimitive");
  /** @type {function(this:Object, string): boolean} */
  var isEnum = {}.propertyIsEnumerable;
  var SymbolRegistry = shared("symbol-registry");
  var AllSymbols = shared("symbols");
  var desc = shared("op-symbols");
  var undefined = Object.prototype;
  /** @type {boolean} */
  var useNative = "function" == typeof $Symbol;
  var node = root.QObject;
  /** @type {boolean} */
  var so = !node || !node.prototype || !node.prototype.findChild;
  /** @type {!Function} */
  var setSymbolDesc = SUPPORT_DESC && fails(function() {
    return 7 != _create(setDesc({}, "a", {
      get : function() {
        return setDesc(this, "a", {
          value : 7
        }).a;
      }
    })).a;
  }) ? function(description, name, D) {
    var desc = gOPD(undefined, name);
    if (desc) {
      delete undefined[name];
    }
    setDesc(description, name, D);
    if (desc && description !== undefined) {
      setDesc(undefined, name, desc);
    }
  } : setDesc;
  /**
   * @param {string} tag
   * @return {?}
   */
  var wrap = function(tag) {
    /** @type {!Object} */
    var sym = AllSymbols[tag] = _create($Symbol.prototype);
    return sym._k = tag, sym;
  };
  /** @type {function(!Object): ?} */
  var isSymbol = useNative && "symbol" == typeof $Symbol.iterator ? function(x) {
    return "symbol" == typeof x;
  } : function(it) {
    return it instanceof $Symbol;
  };
  /**
   * @param {!Object} value
   * @param {string} key
   * @param {!Object} D
   * @return {?}
   */
  var defineProperty = function(value, key, D) {
    return value === undefined && defineProperty(desc, key, D), anObject(value), key = transform(key, true), anObject(D), has(AllSymbols, key) ? (D.enumerable ? (has(value, HIDDEN) && value[HIDDEN][key] && (value[HIDDEN][key] = false), D = _create(D, {
      enumerable : createDesc(0, false)
    })) : (has(value, HIDDEN) || setDesc(value, HIDDEN, createDesc(1, {})), value[HIDDEN][key] = true), setSymbolDesc(value, key, D)) : setDesc(value, key, D);
  };
  /**
   * @param {!Object} o
   * @param {!Array} obj
   * @return {?}
   */
  var defineProperties = function(o, obj) {
    anObject(o);
    var key;
    var keys = getKeys(obj = $(obj));
    /** @type {number} */
    var j = 0;
    var length = keys.length;
    for (; length > j;) {
      defineProperty(o, key = keys[j++], obj[key]);
    }
    return o;
  };
  /**
   * @param {!Object} name
   * @param {!Array} undefined
   * @return {?}
   */
  var bootstrap = function(name, undefined) {
    return void 0 === undefined ? _create(name) : defineProperties(_create(name), undefined);
  };
  /**
   * @param {!Object} key
   * @return {?}
   */
  var listener = function(key) {
    /** @type {boolean} */
    var e = isEnum.call(this, key = transform(key, true));
    return !(this === undefined && has(AllSymbols, key) && !has(desc, key)) && (!(e || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]) || e);
  };
  /**
   * @param {!Object} value
   * @param {string} key
   * @return {?}
   */
  var getOwnPropertyDescriptor = function(value, key) {
    if (value = $(value), key = transform(key, true), value !== undefined || !has(AllSymbols, key) || has(desc, key)) {
      var descriptor = gOPD(value, key);
      return !descriptor || !has(AllSymbols, key) || has(value, HIDDEN) && value[HIDDEN][key] || (descriptor.enumerable = true), descriptor;
    }
  };
  /**
   * @param {!Object} description
   * @return {?}
   */
  var getOwnPropertyNames = function(description) {
    var key;
    var names = gOPN($(description));
    /** @type {!Array} */
    var result = [];
    /** @type {number} */
    var i = 0;
    for (; names.length > i;) {
      if (!(has(AllSymbols, key = names[i++]) || key == HIDDEN || key == width)) {
        result.push(key);
      }
    }
    return result;
  };
  /**
   * @param {!Object} description
   * @return {?}
   */
  var getOwnPropertySymbols = function(description) {
    var key;
    /** @type {boolean} */
    var isIE = description === undefined;
    var names = gOPN(isIE ? desc : $(description));
    /** @type {!Array} */
    var result = [];
    /** @type {number} */
    var i = 0;
    for (; names.length > i;) {
      if (!(!has(AllSymbols, key = names[i++]) || isIE && !has(undefined, key))) {
        result.push(AllSymbols[key]);
      }
    }
    return result;
  };
  if (!useNative) {
    /**
     * @return {?}
     */
    $Symbol = function() {
      if (this instanceof $Symbol) {
        throw TypeError("Symbol is not a constructor!");
      }
      var tag = add(arguments.length > 0 ? arguments[0] : void 0);
      /**
       * @param {!Object} value
       * @return {undefined}
       */
      var $set = function(value) {
        if (this === undefined) {
          $set.call(desc, value);
        }
        if (has(this, HIDDEN) && has(this[HIDDEN], tag)) {
          /** @type {boolean} */
          this[HIDDEN][tag] = false;
        }
        setSymbolDesc(this, tag, createDesc(1, value));
      };
      return SUPPORT_DESC && so && setSymbolDesc(undefined, tag, {
        configurable : true,
        set : $set
      }), wrap(tag);
    };
    redefine($Symbol.prototype, "toString", function() {
      return this._k;
    });
    /** @type {function(!Object, string): ?} */
    assert.f = getOwnPropertyDescriptor;
    /** @type {function(!Object, string, !Object): ?} */
    util.f = defineProperty;
    /** @type {function(!Object): ?} */
    params.f = dataEdge.f = getOwnPropertyNames;
    /** @type {function(!Object): ?} */
    pIE.f = listener;
    /** @type {function(!Object): ?} */
    gOPNExt.f = getOwnPropertySymbols;
    if (SUPPORT_DESC) {
      redefine(undefined, "propertyIsEnumerable", listener, true);
    }
    /**
     * @param {!Object} description
     * @return {?}
     */
    sink.f = function(description) {
      return wrap(Symbol(description));
    };
  }
  $def($def.G + $def.W + $def.F * !useNative, {
    Symbol : $Symbol
  });
  /** @type {!Array<string>} */
  var args = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(",");
  /** @type {number} */
  var argIndex = 0;
  for (; args.length > argIndex;) {
    Symbol(args[argIndex++]);
  }
  /** @type {!Array<string>} */
  var superUnique = $keys(Symbol.store);
  /** @type {number} */
  var uniqueLength = 0;
  for (; superUnique.length > uniqueLength;) {
    !function(name) {
      var val = core.Symbol || (core.Symbol = root.Symbol || {});
      if (!("_" == name.charAt(0) || name in val)) {
        equal(val, name, {
          value : sink.f(name)
        });
      }
    }(superUnique[uniqueLength++]);
  }
  $def($def.S + $def.F * !useNative, "Symbol", {
    for : function(key) {
      return has(SymbolRegistry, key = key + "") ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
    },
    keyFor : function(key) {
      if (!isSymbol(key)) {
        throw TypeError(key + " is not a symbol!");
      }
      var attrText;
      for (attrText in SymbolRegistry) {
        if (SymbolRegistry[attrText] === key) {
          return attrText;
        }
      }
    },
    useSetter : function() {
      /** @type {boolean} */
      so = true;
    },
    useSimple : function() {
      /** @type {boolean} */
      so = false;
    }
  });
  $def($def.S + $def.F * !useNative, "Object", {
    create : bootstrap,
    defineProperty : defineProperty,
    defineProperties : defineProperties,
    getOwnPropertyDescriptor : getOwnPropertyDescriptor,
    getOwnPropertyNames : getOwnPropertyNames,
    getOwnPropertySymbols : getOwnPropertySymbols
  });
  if ($JSON) {
    $def($def.S + $def.F * (!useNative || fails(function() {
      var S = $Symbol();
      return "[null]" != _stringify([S]) || "{}" != _stringify({
        a : S
      }) || "{}" != _stringify(Object(S));
    })), "JSON", {
      stringify : function(it) {
        if (void 0 !== it && !isSymbol(it)) {
          var type;
          var callback;
          /** @type {!Array} */
          var args = [it];
          /** @type {number} */
          var i = 1;
          for (; arguments.length > i;) {
            args.push(arguments[i++]);
          }
          return type = args[1], "function" == typeof type && (callback = type), !callback && isArray(type) || (type = function(key, value) {
            if (callback && (value = callback.call(this, key, value)), !isSymbol(value)) {
              return value;
            }
          }), args[1] = type, _stringify.apply($JSON, args);
        }
      }
    });
  }
  if (!$Symbol.prototype[s]) {
    callback($Symbol.prototype, s, $Symbol.prototype.valueOf);
  }
  setToStringTag($Symbol, "Symbol");
  setToStringTag(Math, "Math", true);
  setToStringTag(root.JSON, "JSON", true);
  $def($def.S, "Object", {
    create : _create
  });
  $def($def.S + $def.F * !SUPPORT_DESC, "Object", {
    defineProperty : util.f
  });
  $def($def.S + $def.F * !SUPPORT_DESC, "Object", {
    defineProperties : validate
  });
  /**
   * @param {string} key
   * @param {!Function} fn
   * @return {undefined}
   */
  var wrapObjectMethod = function(key, fn) {
    var d = (core.Object || {})[key] || Object[key];
    var out = {};
    out[key] = fn(d);
    $def($def.S + $def.F * fails(function() {
      d(1);
    }), "Object", out);
  };
  /** @type {!Function} */
  var ut = assert.f;
  wrapObjectMethod("getOwnPropertyDescriptor", function() {
    return function(title, two) {
      return ut($(title), two);
    };
  });
  wrapObjectMethod("getPrototypeOf", function() {
    return function(array) {
      return getPrototypeOf(toObject(array));
    };
  });
  wrapObjectMethod("keys", function() {
    return function(it) {
      return $keys(toObject(it));
    };
  });
  wrapObjectMethod("getOwnPropertyNames", function() {
    return dataEdge.f;
  });
  var escaped = attr.onFreeze;
  wrapObjectMethod("freeze", function(value) {
    return function(name) {
      return value && isObject(name) ? value(escaped(name)) : name;
    };
  });
  var r = attr.onFreeze;
  wrapObjectMethod("seal", function(o) {
    return function(e) {
      return o && isObject(e) ? o(r(e)) : e;
    };
  });
  var meta = attr.onFreeze;
  wrapObjectMethod("preventExtensions", function($preventExtensions) {
    return function(it) {
      return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
    };
  });
  wrapObjectMethod("isFrozen", function(errf) {
    return function(result) {
      return !isObject(result) || !!errf && errf(result);
    };
  });
  wrapObjectMethod("isSealed", function(errf) {
    return function(result) {
      return !isObject(result) || !!errf && errf(result);
    };
  });
  wrapObjectMethod("isExtensible", function(bumpFilter) {
    return function(msg) {
      return !!isObject(msg) && (!bumpFilter || bumpFilter(msg));
    };
  });
  /** @type {function(!Object, ...(Object|null)): !Object} */
  var $assign = Object.assign;
  /** @type {!Function} */
  var assign = !$assign || fails(function() {
    var A = {};
    var B = {};
    var S = Symbol();
    /** @type {string} */
    var K = "abcdefghijklmnopqrst";
    return A[S] = 7, K.split("").forEach(function(k) {
      /** @type {string} */
      B[k] = k;
    }), 7 != $assign({}, A)[S] || Object.keys($assign({}, B)).join("") != K;
  }) ? function(array, klass) {
    var object = toObject(array);
    /** @type {number} */
    var length = arguments.length;
    /** @type {number} */
    var i = 1;
    /** @type {!Function} */
    var gOPN = gOPNExt.f;
    /** @type {!Function} */
    var isEnum = pIE.f;
    for (; length > i;) {
      var key;
      var o = IObject(arguments[i++]);
      /** @type {!Array} */
      var lists = gOPN ? $keys(o).concat(gOPN(o)) : $keys(o);
      /** @type {number} */
      var len = lists.length;
      /** @type {number} */
      var l = 0;
      for (; len > l;) {
        if (isEnum.call(o, key = lists[l++])) {
          object[key] = o[key];
        }
      }
    }
    return object;
  } : $assign;
  $def($def.S + $def.F, "Object", {
    assign : assign
  });
  /** @type {function(*, *): boolean} */
  var minify = Object.is || function(x, y) {
    return x === y ? 0 !== x || 1 / x == 1 / y : x != x && y != y;
  };
  $def($def.S, "Object", {
    is : minify
  });
  $def($def.S, "Object", {
    setPrototypeOf : opts.set
  });
  $def($def.G + $def.F * (parseFloat != $parseFloat), {
    parseFloat : $parseFloat
  });
  $def($def.G + $def.F * (parseInt != $parseInt), {
    parseInt : $parseInt
  });
  var func = (root.Reflect || {}).apply;
  var _apply = Function.apply;
  $def($def.S + $def.F * !fails(function() {
    func(function() {
    });
  }), "Reflect", {
    apply : function(target, c, key) {
      var obj = aFunction(target);
      var args = anObject(key);
      return func ? func(obj, c, args) : _apply.call(obj, c, args);
    }
  });
  var rConstruct = (root.Reflect || {}).construct;
  var THROWS_ON_PRIMITIVES = fails(function() {
    /**
     * @return {undefined}
     */
    function F() {
    }
    return !(rConstruct(function() {
    }, [], F) instanceof F);
  });
  /** @type {boolean} */
  var buggyJSON = !fails(function() {
    rConstruct(function() {
    });
  });
  $def($def.S + $def.F * (THROWS_ON_PRIMITIVES || buggyJSON), "Reflect", {
    construct : function(Target, args) {
      aFunction(Target);
      anObject(args);
      var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
      if (buggyJSON && !THROWS_ON_PRIMITIVES) {
        return rConstruct(Target, args, newTarget);
      }
      if (Target == newTarget) {
        switch(args.length) {
          case 0:
            return new Target;
          case 1:
            return new Target(args[0]);
          case 2:
            return new Target(args[0], args[1]);
          case 3:
            return new Target(args[0], args[1], args[2]);
          case 4:
            return new Target(args[0], args[1], args[2], args[3]);
        }
        /** @type {!Array} */
        var a = [null];
        return a.push.apply(a, args), new (bind.apply(Target, a));
      }
      var proto = newTarget.prototype;
      /** @type {!Object} */
      var obj = _create(isObject(proto) ? proto : Object.prototype);
      var result = Function.apply.call(Target, obj, args);
      return isObject(result) ? result : obj;
    }
  });
  $def($def.S + $def.F * fails(function() {
    Reflect.defineProperty(util.f({}, 1, {
      value : 1
    }), 1, {
      value : 2
    });
  }), "Reflect", {
    defineProperty : function(description, value, attributes) {
      anObject(description);
      value = transform(value, true);
      anObject(attributes);
      try {
        return util.f(description, value, attributes), true;
      } catch (t) {
        return false;
      }
    }
  });
  /** @type {!Function} */
  var getDesc = assert.f;
  $def($def.S, "Reflect", {
    deleteProperty : function(target, key) {
      var desc = getDesc(anObject(target), key);
      return !(desc && !desc.configurable) && delete target[key];
    }
  });
  /**
   * @param {!Object} iterated
   * @return {undefined}
   */
  var Enumerate = function(iterated) {
    this._t = anObject(iterated);
    /** @type {number} */
    this._i = 0;
    var i;
    /** @type {!Array} */
    var keys = this._k = [];
    for (i in iterated) {
      keys.push(i);
    }
  };
  register(Enumerate, "Object", function() {
    var key;
    var that = this;
    var keys = that._k;
    do {
      if (that._i >= keys.length) {
        return {
          value : void 0,
          done : true
        };
      }
    } while (!((key = keys[that._i++]) in that._t));
    return {
      value : key,
      done : false
    };
  });
  $def($def.S, "Reflect", {
    enumerate : function(target) {
      return new Enumerate(target);
    }
  });
  $def($def.S, "Reflect", {
    get : get
  });
  $def($def.S, "Reflect", {
    getOwnPropertyDescriptor : function(description, value) {
      return assert.f(anObject(description), value);
    }
  });
  $def($def.S, "Reflect", {
    getPrototypeOf : function(target) {
      return getPrototypeOf(anObject(target));
    }
  });
  $def($def.S, "Reflect", {
    has : function(value, elem) {
      return elem in value;
    }
  });
  /** @type {function(!Object): boolean} */
  var $isExtensible = Object.isExtensible;
  $def($def.S, "Reflect", {
    isExtensible : function(target) {
      return anObject(target), !$isExtensible || $isExtensible(target);
    }
  });
  var Reflect = root.Reflect;
  var ownKeys = Reflect && Reflect.ownKeys || function(key) {
    var compositeWord = params.f(anObject(key));
    /** @type {!Function} */
    var gOPN = gOPNExt.f;
    return gOPN ? compositeWord.concat(gOPN(key)) : compositeWord;
  };
  $def($def.S, "Reflect", {
    ownKeys : ownKeys
  });
  /** @type {function(T): T} */
  var _preventExtensions = Object.preventExtensions;
  $def($def.S, "Reflect", {
    preventExtensions : function(target) {
      anObject(target);
      try {
        return _preventExtensions && _preventExtensions(target), true;
      } catch (t) {
        return false;
      }
    }
  });
  $def($def.S, "Reflect", {
    set : set
  });
  if (opts) {
    $def($def.S, "Reflect", {
      setPrototypeOf : function(obj, target) {
        opts.check(obj, target);
        try {
          return opts.set(obj, target), true;
        } catch (t) {
          return false;
        }
      }
    });
  }
  var i = Symbol("match");
  /**
   * @param {!Object} data
   * @return {?}
   */
  var emit = function(data) {
    var dataSlice;
    return isObject(data) && (void 0 !== (dataSlice = data[i]) ? !!dataSlice : "RegExp" == fn(data));
  };
  /**
   * @return {?}
   */
  var flags = function() {
    var that = anObject(this);
    /** @type {string} */
    var flags = "";
    return that.global && (flags = flags + "g"), that.ignoreCase && (flags = flags + "i"), that.multiline && (flags = flags + "m"), that.unicode && (flags = flags + "u"), that.sticky && (flags = flags + "y"), flags;
  };
  /** @type {!Function} */
  var dP = util.f;
  /** @type {!Function} */
  var load = params.f;
  var b = root.RegExp;
  var Error = b;
  var c = b.prototype;
  /** @type {!RegExp} */
  var a = /a/g;
  /** @type {!RegExp} */
  var o = /a/g;
  /** @type {boolean} */
  var wasExpected = new b(a) !== a;
  if (SUPPORT_DESC && (!wasExpected || fails(function() {
    return o[Symbol("match")] = false, b(a) != a || b(o) == o || "/a/i" != b(a, "i");
  }))) {
    /**
     * @param {!Object} key
     * @param {?} name
     * @return {?}
     */
    b = function(key, name) {
      /** @type {boolean} */
      var m = this instanceof b;
      var piRE = emit(key);
      /** @type {boolean} */
      var fiU = void 0 === name;
      return !m && piRE && key.constructor === b && fiU ? key : cb(wasExpected ? new Error(piRE && !fiU ? key.source : key, name) : Error((piRE = key instanceof b) ? key.source : key, piRE && fiU ? flags.call(key) : name), m ? this : c, b);
    };
    var args = load(Error);
    /** @type {number} */
    var argIndex = 0;
    for (; args.length > argIndex;) {
      !function(key) {
        if (!(key in b)) {
          dP(b, key, {
            configurable : true,
            get : function() {
              return Error[key];
            },
            set : function(object) {
              /** @type {!Object} */
              Error[key] = object;
            }
          });
        }
      }(args[argIndex++]);
    }
    /** @type {function(!Object, ?): ?} */
    c.constructor = b;
    b.prototype = c;
    redefine(root, "RegExp", b);
  }
  define("RegExp");
  if (SUPPORT_DESC && "g" != /./g.flags) {
    util.f(RegExp.prototype, "flags", {
      configurable : true,
      get : flags
    });
  }
  /** @type {function(this:RegExp): string} */
  var $toString = /./.toString;
  /**
   * @param {!Function} constructor
   * @return {undefined}
   */
  var Class = function(constructor) {
    redefine(RegExp.prototype, "toString", constructor, true);
  };
  if (fails(function() {
    return "/a/b" != $toString.call({
      source : "a",
      flags : "b"
    });
  })) {
    Class(function() {
      var R = anObject(this);
      return "/".concat(R.source, "/", "flags" in R ? R.flags : !SUPPORT_DESC && R instanceof RegExp ? flags.call(R) : void 0);
    });
  } else {
    if ("toString" != $toString.name) {
      Class(function() {
        return $toString.call(this);
      });
    }
  }
  /**
   * @param {string} key
   * @param {number} data
   * @param {!Function} exec
   * @return {undefined}
   */
  var on = function(key, data, exec) {
    var b = Symbol(key);
    var stream = exec(filter, b, ""[key]);
    var $propertyIsEnumerable = stream[0];
    var graph = stream[1];
    if (fails(function() {
      var def = {};
      return def[b] = function() {
        return 7;
      }, 7 != ""[key](def);
    })) {
      redefine(String.prototype, key, $propertyIsEnumerable);
      callback(RegExp.prototype, b, 2 == data ? function(vertexSet, right) {
        return graph.call(vertexSet, this, right);
      } : function(vertexSet) {
        return graph.call(vertexSet, this);
      });
    }
  };
  on("match", 1, function(defined, SEARCH, n) {
    return [function(regexp) {
      var name = defined(this);
      var string = void 0 == regexp ? void 0 : regexp[SEARCH];
      return void 0 !== string ? string.call(regexp, name) : (new RegExp(regexp))[SEARCH](String(name));
    }, n];
  });
  on("replace", 2, function(addVertex, property, result) {
    return [function(right, origin) {
      var i = addVertex(this);
      var target = void 0 == right ? void 0 : right[property];
      return void 0 !== target ? target.call(right, i, origin) : result.call(String(i), right, origin);
    }, result];
  });
  on("search", 1, function(defined, SEARCH, n) {
    return [function(regexp) {
      var name = defined(this);
      var string = void 0 == regexp ? void 0 : regexp[SEARCH];
      return void 0 !== string ? string.call(regexp, name) : (new RegExp(regexp))[SEARCH](String(name));
    }, n];
  });
  on("split", 2, function(addVertex, property, $split) {
    /** @type {function(!Object): ?} */
    var isRegExp = emit;
    /** @type {!Function} */
    var _split = $split;
    /** @type {function(this:IArrayLike<T>, ...T): number} */
    var push = [].push;
    /** @type {string} */
    var LENGTH = "length";
    if ("c" == "abbc".split(/(b)*/)[1] || 4 != "test".split(/(?:)/, -1)[LENGTH] || 2 != "ab".split(/(?:ab)*/)[LENGTH] || 4 != ".".split(/(.?)(.?)/)[LENGTH] || ".".split(/()()/)[LENGTH] > 1 || "".split(/.?/)[LENGTH]) {
      /** @type {boolean} */
      var u = void 0 === /()??/.exec("")[1];
      /**
       * @param {!Object} separator
       * @param {number} limit
       * @return {?}
       */
      $split = function(separator, limit) {
        /** @type {string} */
        var string = String(this);
        if (void 0 === separator && 0 === limit) {
          return [];
        }
        if (!isRegExp(separator)) {
          return _split.call(string, separator, limit);
        }
        var ext;
        var match;
        var stop;
        var isPropagationStopped;
        var index;
        /** @type {!Array} */
        var output = [];
        /** @type {string} */
        var i = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.unicode ? "u" : "") + (separator.sticky ? "y" : "");
        /** @type {number} */
        var start = 0;
        /** @type {number} */
        var splitLimit = void 0 === limit ? 4294967295 : limit >>> 0;
        /** @type {!RegExp} */
        var separatorCopy = new RegExp(separator.source, i + "g");
        if (!u) {
          /** @type {!RegExp} */
          ext = new RegExp("^" + separatorCopy.source + "$(?!\\s)", i);
        }
        for (; (match = separatorCopy.exec(string)) && !((stop = match.index + match[0][LENGTH]) > start && (output.push(string.slice(start, match.index)), !u && match[LENGTH] > 1 && match[0].replace(ext, function() {
          /** @type {number} */
          index = 1;
          for (; index < arguments[LENGTH] - 2; index++) {
            if (void 0 === arguments[index]) {
              match[index] = void 0;
            }
          }
        }), match[LENGTH] > 1 && match.index < string[LENGTH] && push.apply(output, match.slice(1)), isPropagationStopped = match[0][LENGTH], start = stop, output[LENGTH] >= splitLimit));) {
          if (separatorCopy.lastIndex === match.index) {
            separatorCopy.lastIndex++;
          }
        }
        return start === string[LENGTH] ? !isPropagationStopped && separatorCopy.test("") || output.push("") : output.push(string.slice(start)), output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
      };
    } else {
      if ("0".split(void 0, 0)[LENGTH]) {
        /**
         * @param {!Array} separator
         * @param {number} limit
         * @return {?}
         */
        $split = function(separator, limit) {
          return void 0 === separator && 0 === limit ? [] : _split.call(this, separator, limit);
        };
      }
    }
    return [function(right, origin) {
      var i = addVertex(this);
      var target = void 0 == right ? void 0 : right[property];
      return void 0 !== target ? target.call(right, i, origin) : $split.call(String(i), right, origin);
    }, $split];
  });
  var modulesToExplore = getCollection("Set", function(saveNotifs) {
    return function() {
      return saveNotifs(this, arguments.length > 0 ? arguments[0] : void 0);
    };
  }, {
    add : function(value) {
      return strong.def(format(this, "Set"), value = 0 === value ? 0 : value, value);
    }
  }, strong);
  /** @type {function(...number): string} */
  var fromCharCode = String.fromCharCode;
  /** @type {function(number, ...number): string} */
  var $fromCodePoint = String.fromCodePoint;
  $def($def.S + $def.F * (!!$fromCodePoint && 1 != $fromCodePoint.length), "String", {
    fromCodePoint : function(codepoint) {
      var code;
      /** @type {!Array} */
      var outChance = [];
      /** @type {number} */
      var length = arguments.length;
      /** @type {number} */
      var i = 0;
      for (; length > i;) {
        if (code = +arguments[i++], toIndex(code, 1114111) !== code) {
          throw RangeError(code + " is not a valid code point");
        }
        outChance.push(code < 65536 ? fromCharCode(code) : fromCharCode(55296 + ((code = code - 65536) >> 10), code % 1024 + 56320));
      }
      return outChance.join("");
    }
  });
  $def($def.S, "String", {
    raw : function(api) {
      var tpl = $(api.raw);
      var length = toLength(tpl.length);
      /** @type {number} */
      var argl = arguments.length;
      /** @type {!Array} */
      var ck_buffer = [];
      /** @type {number} */
      var i = 0;
      for (; length > i;) {
        ck_buffer.push(String(tpl[i++]));
        if (i < argl) {
          ck_buffer.push(String(arguments[i]));
        }
      }
      return ck_buffer.join("");
    }
  });
  d("trim", function(saveNotifs) {
    return function() {
      return saveNotifs(this, 3);
    };
  });
  var setFlatternIndex = exports(false);
  $def($def.P, "String", {
    codePointAt : function(i) {
      return setFlatternIndex(this, i);
    }
  });
  /**
   * @param {undefined} file
   * @param {!Object} text
   * @param {string} name
   * @return {?}
   */
  var context = function(file, text, name) {
    if (emit(text)) {
      throw TypeError("String#" + name + " doesn't accept regex!");
    }
    return String(filter(file));
  };
  var indent = Symbol("match");
  /**
   * @param {string} methodName
   * @return {?}
   */
  var testObjectCoercible = function(methodName) {
    /** @type {!RegExp} */
    var options = /./;
    try {
      "/./"[methodName](options);
    } catch (n) {
      try {
        return options[indent] = false, !"/./"[methodName](options);
      } catch (t) {
      }
    }
    return true;
  };
  /** @type {function(this:String, string, number=): boolean} */
  var $endsWith = "".endsWith;
  $def($def.P + $def.F * testObjectCoercible("endsWith"), "String", {
    endsWith : function(searchString) {
      var that = context(this, searchString, "endsWith");
      var a = arguments.length > 1 ? arguments[1] : void 0;
      var len = toLength(that.length);
      var end = void 0 === a ? len : Math.min(toLength(a), len);
      /** @type {string} */
      var search = String(searchString);
      return $endsWith ? $endsWith.call(that, search, end) : that.slice(end - search.length, end) === search;
    }
  });
  $def($def.P + $def.F * testObjectCoercible("includes"), "String", {
    includes : function(searchString) {
      return !!~context(this, searchString, "includes").indexOf(searchString, arguments.length > 1 ? arguments[1] : void 0);
    }
  });
  $def($def.P, "String", {
    repeat : repeat
  });
  /** @type {function(this:String, string, number=): boolean} */
  var $startsWith = "".startsWith;
  $def($def.P + $def.F * testObjectCoercible("startsWith"), "String", {
    startsWith : function(searchString) {
      var that = context(this, searchString, "startsWith");
      var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : void 0, that.length));
      /** @type {string} */
      var search = String(searchString);
      return $startsWith ? $startsWith.call(that, search, index) : that.slice(index, index + search.length) === search;
    }
  });
  /** @type {!RegExp} */
  var regNewline = /"/g;
  /**
   * @param {undefined} id
   * @param {string} side
   * @param {string} value
   * @param {?} type
   * @return {?}
   */
  var show = function(id, side, value, type) {
    /** @type {string} */
    var attr = String(filter(id));
    /** @type {string} */
    var key = "<" + side;
    return "" !== value && (key = key + (" " + value + '="' + String(type).replace(regNewline, "&quot;") + '"')), key + ">" + attr + "</" + side + ">";
  };
  /**
   * @param {string} name
   * @param {!Function} callback
   * @return {undefined}
   */
  var expect = function(name, callback) {
    var options = {};
    options[name] = callback(show);
    $def($def.P + $def.F * fails(function() {
      var excludeLink = ""[name]('"');
      return excludeLink !== excludeLink.toLowerCase() || excludeLink.split('"').length > 3;
    }), "String", options);
  };
  expect("anchor", function(t) {
    return function(debugState) {
      return t(this, "a", "name", debugState);
    };
  });
  expect("big", function(createHTML) {
    return function() {
      return createHTML(this, "big", "", "");
    };
  });
  expect("blink", function(createHTML) {
    return function() {
      return createHTML(this, "blink", "", "");
    };
  });
  expect("bold", function(toSource) {
    return function() {
      return toSource(this, "b", "", "");
    };
  });
  expect("fixed", function(createHTML) {
    return function() {
      return createHTML(this, "tt", "", "");
    };
  });
  expect("fontcolor", function(debug) {
    return function(p2radius) {
      return debug(this, "font", "color", p2radius);
    };
  });
  expect("fontsize", function(debug) {
    return function(p2radius) {
      return debug(this, "font", "size", p2radius);
    };
  });
  expect("italics", function(toSource) {
    return function() {
      return toSource(this, "i", "", "");
    };
  });
  expect("link", function(callback) {
    return function(missingCoins) {
      return callback(this, "a", "href", missingCoins);
    };
  });
  expect("small", function(createHTML) {
    return function() {
      return createHTML(this, "small", "", "");
    };
  });
  expect("strike", function(createHTML) {
    return function() {
      return createHTML(this, "strike", "", "");
    };
  });
  expect("sub", function(createHTML) {
    return function() {
      return createHTML(this, "sub", "", "");
    };
  });
  expect("sup", function(createHTML) {
    return function() {
      return createHTML(this, "sup", "", "");
    };
  });
  var result;
  var four = add("typed_array");
  var t = add("view");
  /** @type {boolean} */
  var wpi = !(!root.ArrayBuffer || !root.DataView);
  /** @type {boolean} */
  var wi = wpi;
  /** @type {number} */
  var index = 0;
  /** @type {!Array<string>} */
  var names = "Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array".split(",");
  for (; index < 9;) {
    if (result = root[names[index++]]) {
      callback(result.prototype, four, true);
      callback(result.prototype, t, true);
    } else {
      /** @type {boolean} */
      wi = false;
    }
  }
  var target = {
    ABV : wpi,
    CONSTR : wi,
    TYPED : four,
    VIEW : t
  };
  /**
   * @param {?} value
   * @return {?}
   */
  var toString = function(value) {
    if (void 0 === value) {
      return 0;
    }
    var i = toInteger(value);
    var color = toLength(i);
    if (i !== color) {
      throw RangeError("Wrong length!");
    }
    return color;
  };
  var compatibility = require(function(canCreateDiscussions, global) {
    /**
     * @param {number} value
     * @param {number} s
     * @param {number} d
     * @return {?}
     */
    function pad(value, s, d) {
      var n;
      var r;
      var c;
      /** @type {!Array} */
      var data = Array(d);
      /** @type {number} */
      var seconds = 8 * d - s - 1;
      /** @type {number} */
      var len = (1 << seconds) - 1;
      /** @type {number} */
      var i = len >> 1;
      /** @type {number} */
      var rt = 23 === s ? pow(2, -24) - pow(2, -77) : 0;
      /** @type {number} */
      var index = 0;
      /** @type {number} */
      var h = value < 0 || 0 === value && 1 / value < 0 ? 1 : 0;
      value = abs(value);
      if (value != value || value === Infinity) {
        /** @type {number} */
        r = value != value ? 1 : 0;
        /** @type {number} */
        n = len;
      } else {
        n = floor(log(value) / LN2);
        if (value * (c = pow(2, -n)) < 1) {
          n--;
          /** @type {number} */
          c = c * 2;
        }
        value = value + (n + i >= 1 ? rt / c : rt * pow(2, 1 - i));
        if (value * c >= 2) {
          n++;
          /** @type {number} */
          c = c / 2;
        }
        if (n + i >= len) {
          /** @type {number} */
          r = 0;
          /** @type {number} */
          n = len;
        } else {
          if (n + i >= 1) {
            /** @type {number} */
            r = (value * c - 1) * pow(2, s);
            n = n + i;
          } else {
            /** @type {number} */
            r = value * pow(2, i - 1) * pow(2, s);
            /** @type {number} */
            n = 0;
          }
        }
      }
      for (; s >= 8; data[index++] = 255 & r, r = r / 256, s = s - 8) {
      }
      /** @type {number} */
      n = n << s | r;
      seconds = seconds + s;
      for (; seconds > 0; data[index++] = 255 & n, n = n / 256, seconds = seconds - 8) {
      }
      return data[--index] |= 128 * h, data;
    }
    /**
     * @param {!Array} buffer
     * @param {number} mLen
     * @param {number} nBytes
     * @return {?}
     */
    function unpackIEEE754(buffer, mLen, nBytes) {
      var m;
      /** @type {number} */
      var eLen = 8 * nBytes - mLen - 1;
      /** @type {number} */
      var eMax = (1 << eLen) - 1;
      /** @type {number} */
      var eBias = eMax >> 1;
      /** @type {number} */
      var nBits = eLen - 7;
      /** @type {number} */
      var i = nBytes - 1;
      var s = buffer[i--];
      /** @type {number} */
      var e = 127 & s;
      /** @type {number} */
      s = s >> 7;
      for (; nBits > 0; e = 256 * e + buffer[i], i--, nBits = nBits - 8) {
      }
      /** @type {number} */
      m = e & (1 << -nBits) - 1;
      /** @type {number} */
      e = e >> -nBits;
      nBits = nBits + mLen;
      for (; nBits > 0; m = 256 * m + buffer[i], i--, nBits = nBits - 8) {
      }
      if (0 === e) {
        /** @type {number} */
        e = 1 - eBias;
      } else {
        if (e === eMax) {
          return m ? NaN : s ? -Infinity : Infinity;
        }
        m = m + pow(2, mLen);
        /** @type {number} */
        e = e - eBias;
      }
      return (s ? -1 : 1) * m * pow(2, e - mLen);
    }
    /**
     * @param {!Array} bytes
     * @return {?}
     */
    function unpackI32(bytes) {
      return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
    }
    /**
     * @param {number} i
     * @return {?}
     */
    function z(i) {
      return [255 & i];
    }
    /**
     * @param {number} gistId
     * @return {?}
     */
    function cb(gistId) {
      return [255 & gistId, gistId >> 8 & 255];
    }
    /**
     * @param {number} results
     * @return {?}
     */
    function end(results) {
      return [255 & results, results >> 8 & 255, results >> 16 & 255, results >> 24 & 255];
    }
    /**
     * @param {undefined} s
     * @return {?}
     */
    function v(s) {
      return pad(s, 52, 8);
    }
    /**
     * @param {undefined} i
     * @return {?}
     */
    function C(i) {
      return pad(i, 23, 4);
    }
    /**
     * @param {!Object} properties
     * @param {string} value
     * @param {string} str
     * @return {undefined}
     */
    function test(properties, value, str) {
      defineProperty(properties[i], value, {
        get : function() {
          return this[str];
        }
      });
    }
    /**
     * @param {!Object} view
     * @param {number} bytes
     * @param {number} value
     * @param {?} mod
     * @return {?}
     */
    function get(view, bytes, value, mod) {
      /** @type {number} */
      var v = +value;
      var intIndex = toString(v);
      if (intIndex + bytes > view[$LENGTH]) {
        throw fail(allowedOperator);
      }
      var store = view[prop]._b;
      var start = intIndex + view[$OFFSET];
      var c = store.slice(start, start + bytes);
      return mod ? c : c.reverse();
    }
    /**
     * @param {!Object} view
     * @param {number} bytes
     * @param {number} time
     * @param {!Function} fn
     * @param {number} value
     * @param {boolean} isLittleEndian
     * @return {undefined}
     */
    function set(view, bytes, time, fn, value, isLittleEndian) {
      /** @type {number} */
      var end = +time;
      var intIndex = toString(end);
      if (intIndex + bytes > view[$LENGTH]) {
        throw fail(allowedOperator);
      }
      var store = view[prop]._b;
      var start = intIndex + view[$OFFSET];
      var pack = fn(+value);
      /** @type {number} */
      var i = 0;
      for (; i < bytes; i++) {
        store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
      }
    }
    /** @type {!Function} */
    var f = params.f;
    /** @type {!Function} */
    var defineProperty = util.f;
    /** @type {string} */
    var i = "prototype";
    /** @type {string} */
    var allowedOperator = "Wrong index!";
    var value = root.ArrayBuffer;
    var DataView = root.DataView;
    var Math = root.Math;
    var fail = root.RangeError;
    var Infinity = root.Infinity;
    var arr = value;
    var abs = Math.abs;
    var pow = Math.pow;
    var floor = Math.floor;
    var log = Math.log;
    var LN2 = Math.LN2;
    /** @type {string} */
    var prop = SUPPORT_DESC ? "_b" : "buffer";
    /** @type {string} */
    var $LENGTH = SUPPORT_DESC ? "_l" : "byteLength";
    /** @type {string} */
    var $OFFSET = SUPPORT_DESC ? "_o" : "byteOffset";
    if (target.ABV) {
      if (!fails(function() {
        value(1);
      }) || !fails(function() {
        new value(-1);
      }) || fails(function() {
        return new value, new value(1.5), new value(NaN), "ArrayBuffer" != value.name;
      })) {
        /**
         * @param {!Object} description
         * @return {?}
         */
        value = function(description) {
          return hide(this, value), new arr(toString(description));
        };
        var j;
        var OneShotConstructor = value[i] = arr[i];
        var values = f(arr);
        /** @type {number} */
        var index = 0;
        for (; values.length > index;) {
          if (!((j = values[index++]) in value)) {
            callback(value, j, arr[j]);
          }
        }
        /** @type {function(!Object): ?} */
        OneShotConstructor.constructor = value;
      }
      var view = new DataView(new value(2));
      var MP4Demuxer = DataView[i].setInt8;
      view.setInt8(0, 2147483648);
      view.setInt8(1, 2147483649);
      if (!(!view.getInt8(0) && view.getInt8(1))) {
        mix(DataView[i], {
          setInt8 : function(i, v) {
            MP4Demuxer.call(this, i, v << 24 >> 24);
          },
          setUint8 : function(data, byteOffset) {
            MP4Demuxer.call(this, data, byteOffset << 24 >> 24);
          }
        }, true);
      }
    } else {
      /**
       * @param {!Object} description
       * @return {undefined}
       */
      value = function(description) {
        hide(this, value, "ArrayBuffer");
        var a = toString(description);
        this._b = fill.call(Array(a), 0);
        this[$LENGTH] = a;
      };
      /**
       * @param {!Object} buffer
       * @param {undefined} byteOffset
       * @param {number} byteLength
       * @return {undefined}
       */
      DataView = function(buffer, byteOffset, byteLength) {
        hide(this, DataView, "DataView");
        hide(buffer, value, "DataView");
        var bufferLength = buffer[$LENGTH];
        var offset = toInteger(byteOffset);
        if (offset < 0 || offset > bufferLength) {
          throw fail("Wrong offset!");
        }
        if (byteLength = void 0 === byteLength ? bufferLength - offset : toLength(byteLength), offset + byteLength > bufferLength) {
          throw fail("Wrong length!");
        }
        /** @type {!Object} */
        this[prop] = buffer;
        this[$OFFSET] = offset;
        /** @type {number} */
        this[$LENGTH] = byteLength;
      };
      if (SUPPORT_DESC) {
        test(value, "byteLength", "_l");
        test(DataView, "buffer", "_b");
        test(DataView, "byteLength", "_l");
        test(DataView, "byteOffset", "_o");
      }
      mix(DataView[i], {
        getInt8 : function(offset) {
          return get(this, 1, offset)[0] << 24 >> 24;
        },
        getUint8 : function(byteOffset) {
          return get(this, 1, byteOffset)[0];
        },
        getInt16 : function(byteOffset) {
          var bytes = get(this, 2, byteOffset, arguments[1]);
          return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
        },
        getUint16 : function(byteOffset) {
          var bytes = get(this, 2, byteOffset, arguments[1]);
          return bytes[1] << 8 | bytes[0];
        },
        getInt32 : function(byteOffset) {
          return unpackI32(get(this, 4, byteOffset, arguments[1]));
        },
        getUint32 : function(byteOffset) {
          return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
        },
        getFloat32 : function(byteOffset) {
          return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
        },
        getFloat64 : function(byteOffset) {
          return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
        },
        setInt8 : function(value, i) {
          set(this, 1, value, z, i);
        },
        setUint8 : function(data, value) {
          set(this, 1, data, z, value);
        },
        setInt16 : function(data, value) {
          set(this, 2, data, cb, value, arguments[2]);
        },
        setUint16 : function(value, pos) {
          set(this, 2, value, cb, pos, arguments[2]);
        },
        setInt32 : function(value, littleEndian) {
          set(this, 4, value, end, littleEndian, arguments[2]);
        },
        setUint32 : function(value, pos) {
          set(this, 4, value, end, pos, arguments[2]);
        },
        setFloat32 : function(value, littleEndian) {
          set(this, 4, value, C, littleEndian, arguments[2]);
        },
        setFloat64 : function(value, littleEndian) {
          set(this, 8, value, v, littleEndian, arguments[2]);
        }
      });
    }
    setToStringTag(value, "ArrayBuffer");
    setToStringTag(DataView, "DataView");
    callback(DataView[i], target.VIEW, true);
    global.ArrayBuffer = value;
    global.DataView = DataView;
  });
  var SPECIES = Symbol("species");
  /**
   * @param {!Object} value
   * @param {(Element|!Function)} type
   * @return {?}
   */
  var is = function(value, type) {
    var S;
    var C = anObject(value).constructor;
    return void 0 === C || void 0 == (S = anObject(C)[SPECIES]) ? type : aFunction(S);
  };
  var source = root.ArrayBuffer;
  var ArrayBuffer = compatibility.ArrayBuffer;
  var $DataView = compatibility.DataView;
  var accessors = target.ABV && source.isView;
  var _Array_slice_ = ArrayBuffer.prototype.slice;
  var property = target.VIEW;
  $def($def.G + $def.W + $def.F * (source !== ArrayBuffer), {
    ArrayBuffer : ArrayBuffer
  });
  $def($def.S + $def.F * !target.CONSTR, "ArrayBuffer", {
    isView : function(object) {
      return accessors && accessors(object) || isObject(object) && property in object;
    }
  });
  $def($def.P + $def.U + $def.F * fails(function() {
    return !(new ArrayBuffer(2)).slice(1, void 0).byteLength;
  }), "ArrayBuffer", {
    slice : function(start, end) {
      if (void 0 !== _Array_slice_ && void 0 === end) {
        return _Array_slice_.call(anObject(this), start);
      }
      var len = anObject(this).byteLength;
      var first = toIndex(start, len);
      var final = toIndex(void 0 === end ? len : end, len);
      var result = new (is(this, ArrayBuffer))(toLength(final - first));
      var viewS = new $DataView(this);
      var viewT = new $DataView(result);
      /** @type {number} */
      var index = 0;
      for (; first < final;) {
        viewT.setUint8(index++, viewS.getUint8(first++));
      }
      return result;
    }
  });
  define("ArrayBuffer");
  $def($def.G + $def.W + $def.F * !target.ABV, {
    DataView : compatibility.DataView
  });
  var CheckGetSetLength = require(function(mixin) {
    if (SUPPORT_DESC) {
      var global = root;
      /** @type {function(!Function): ?} */
      var $ = fails;
      /** @type {function(number, string, string): undefined} */
      var $export = $def;
      var node = target;
      var window = compatibility;
      /** @type {function(!Function, !Array, number): ?} */
      var getClassFromString = ctx;
      /** @type {function(!Object, !Function, !Object, ?): ?} */
      var check = hide;
      /** @type {function(number, string): ?} */
      var compare = createDesc;
      /** @type {function(!Object, string, string): ?} */
      var set = callback;
      /** @type {function(?, !Object, boolean): ?} */
      var extend = mix;
      /** @type {function(number): ?} */
      var defined = toInteger;
      /** @type {function(number): ?} */
      var slice = toLength;
      /** @type {function(?): ?} */
      var translate = toString;
      /** @type {function(number, number): ?} */
      var describe = toIndex;
      /** @type {function(string, boolean): ?} */
      var namespace = transform;
      /** @type {function(!Function, string): ?} */
      var hasOwn = has;
      /** @type {function(!Array): ?} */
      var edgeDetect = parse;
      /** @type {function(!Object): ?} */
      var isArray = isObject;
      /** @type {function(boolean): ?} */
      var byId = toObject;
      /** @type {function(number): ?} */
      var styleObjectHandler = isArrayIter;
      /** @type {function((Object|null), (Object|null)=): !Object} */
      var spawn = _create;
      /** @type {function(!Object): (Object|null)} */
      var isNumber = getPrototypeOf;
      /** @type {!Function} */
      var f = params.f;
      /** @type {function(!Object): ?} */
      var createElement = getIterFn;
      /** @type {function(?): ?} */
      var type = add;
      var consume = Symbol;
      /** @type {function(number, !Function): ?} */
      var require = createDictMethod;
      /** @type {function(string): ?} */
      var _run = run;
      /** @type {function(!Object, (Element|!Function)): ?} */
      var fn = is;
      var self = methods;
      var result = Iterators;
      /** @type {function(!Function, boolean): ?} */
      var method = find;
      /** @type {function(string): undefined} */
      var d = define;
      /** @type {function(?): ?} */
      var _ = fill;
      /** @type {function(this:Array, number, number, number=): !IArrayLike<T>} */
      var client = Array_copyWithin;
      var exports = util;
      var prop = assert;
      /** @type {!Function} */
      var test = exports.f;
      /** @type {!Function} */
      var format = prop.f;
      var trim = global.RangeError;
      var TypeError = global.TypeError;
      var Uint8Array = global.Uint8Array;
      var a = Array.prototype;
      var Buffer = window.ArrayBuffer;
      var DataView = window.DataView;
      var each = require(0);
      var text = require(2);
      var svg = require(3);
      var $every = require(4);
      var pipe = require(5);
      var findIndex = require(6);
      var baseIncludes = _run(true);
      var indexOf = _run(false);
      var b = self.values;
      var conn = self.keys;
      var reader = self.entries;
      /** @type {function(this:(IArrayLike<T>|string), T, number=): number} */
      var c = a.lastIndexOf;
      /** @type {function(this:(IArrayLike<T>|string), (function(?, T, number, !Array<T>): R|null), *=): R} */
      var r = a.reduce;
      /** @type {function(this:(IArrayLike<T>|string), (function(?, T, number, !Array<T>): R|null), *=): R} */
      var s = a.reduceRight;
      /** @type {function(this:(IArrayLike<?>|string), *=): string} */
      var _join = a.join;
      /** @type {function(this:IArrayLike<T>, function(T, T): number=): !Array<T>} */
      var sortOrig = a.sort;
      /** @type {function(this:(IArrayLike<T>|string), *=, *=): !Array<T>} */
      var t = a.slice;
      /** @type {function(this:Array<?>): string} */
      var func = a.toString;
      /** @type {function(this:Object): string} */
      var val = a.toLocaleString;
      var id = consume("iterator");
      var name = consume("toStringTag");
      var x = type("typed_constructor");
      var k = type("def_constructor");
      /** @type {boolean} */
      var USE_NATIVE = node.CONSTR;
      var length = node.TYPED;
      var memberCK = node.VIEW;
      var mapRoute = require(1, function(name, template) {
        return resolve(fn(name, name[k]), template);
      });
      var operator = $(function() {
        return 1 === (new Uint8Array((new Uint16Array([1])).buffer))[0];
      });
      var forced = !!Uint8Array && !!Uint8Array.prototype.set && $(function() {
        (new Uint8Array(1)).set({});
      });
      /**
       * @param {number} value
       * @param {number} limit
       * @return {?}
       */
      var match = function(value, limit) {
        var offset = defined(value);
        if (offset < 0 || offset % limit) {
          throw trim("Wrong offset!");
        }
        return offset;
      };
      /**
       * @param {string} value
       * @return {?}
       */
      var split = function(value) {
        if (isArray(value) && length in value) {
          return value;
        }
        throw TypeError(value + " is not a typed array!");
      };
      /**
       * @param {!Object} value
       * @param {?} type
       * @return {?}
       */
      var resolve = function(value, type) {
        if (!(isArray(value) && x in value)) {
          throw TypeError("It is not a typed array constructor!");
        }
        return new value(type);
      };
      /**
       * @param {!Object} value
       * @param {!Object} track
       * @return {?}
       */
      var list = function(value, track) {
        return cb(fn(value, value[k]), track);
      };
      /**
       * @param {!Object} index
       * @param {!Object} obj
       * @return {?}
       */
      var cb = function(index, obj) {
        /** @type {number} */
        var i = 0;
        var len = obj.length;
        var value = resolve(index, len);
        for (; len > i;) {
          value[i] = obj[i++];
        }
        return value;
      };
      /**
       * @param {undefined} value
       * @param {string} key
       * @param {string} id
       * @return {undefined}
       */
      var g = function(value, key, id) {
        test(value, key, {
          get : function() {
            return this._d[id];
          }
        });
      };
      /**
       * @param {boolean} a
       * @return {?}
       */
      var style = function(a) {
        var key;
        var val;
        var json;
        var result;
        var item;
        var s;
        var root = byId(a);
        /** @type {number} */
        var aLen = arguments.length;
        var extend = aLen > 1 ? arguments[1] : void 0;
        /** @type {boolean} */
        var k = void 0 !== extend;
        var element = createElement(root);
        if (void 0 != element && !styleObjectHandler(element)) {
          s = element.call(root);
          /** @type {!Array} */
          json = [];
          /** @type {number} */
          key = 0;
          for (; !(item = s.next()).done; key++) {
            json.push(item.value);
          }
          /** @type {!Array} */
          root = json;
        }
        if (k && aLen > 2) {
          extend = getClassFromString(extend, arguments[2], 2);
        }
        /** @type {number} */
        key = 0;
        val = slice(root.length);
        result = resolve(this, val);
        for (; val > key; key++) {
          result[key] = k ? extend(root[key], key) : root[key];
        }
        return result;
      };
      /**
       * @return {?}
       */
      var wrapper = function() {
        /** @type {number} */
        var i = 0;
        /** @type {number} */
        var length = arguments.length;
        var value = resolve(this, length);
        for (; length > i;) {
          value[i] = arguments[i++];
        }
        return value;
      };
      var args = !!Uint8Array && $(function() {
        val.call(new Uint8Array(1));
      });
      /**
       * @return {?}
       */
      var getFakeFixturePath = function() {
        return val.apply(args ? t.call(split(this)) : split(this), arguments);
      };
      var data = {
        copyWithin : function(start, target) {
          return client.call(split(this), start, target, arguments.length > 2 ? arguments[2] : void 0);
        },
        every : function(callbackfn) {
          return $every(split(this), callbackfn, arguments.length > 1 ? arguments[1] : void 0);
        },
        fill : function(value) {
          return _.apply(split(this), arguments);
        },
        filter : function(t) {
          return list(this, text(split(this), t, arguments.length > 1 ? arguments[1] : void 0));
        },
        find : function(context) {
          return pipe(split(this), context, arguments.length > 1 ? arguments[1] : void 0);
        },
        findIndex : function(className) {
          return findIndex(split(this), className, arguments.length > 1 ? arguments[1] : void 0);
        },
        forEach : function(context) {
          each(split(this), context, arguments.length > 1 ? arguments[1] : void 0);
        },
        indexOf : function(needle) {
          return indexOf(split(this), needle, arguments.length > 1 ? arguments[1] : void 0);
        },
        includes : function(value) {
          return baseIncludes(split(this), value, arguments.length > 1 ? arguments[1] : void 0);
        },
        join : function(aRoot) {
          return _join.apply(split(this), arguments);
        },
        lastIndexOf : function(sought) {
          return c.apply(split(this), arguments);
        },
        map : function(params) {
          return mapRoute(split(this), params, arguments.length > 1 ? arguments[1] : void 0);
        },
        reduce : function(browsersRequest) {
          return r.apply(split(this), arguments);
        },
        reduceRight : function(context) {
          return s.apply(split(this), arguments);
        },
        reverse : function() {
          var tmp;
          var array = this;
          var j = split(array).length;
          /** @type {number} */
          var ncells = Math.floor(j / 2);
          /** @type {number} */
          var i = 0;
          for (; i < ncells;) {
            tmp = array[i];
            array[i++] = array[--j];
            array[j] = tmp;
          }
          return array;
        },
        some : function(g) {
          return svg(split(this), g, arguments.length > 1 ? arguments[1] : void 0);
        },
        sort : function(sort) {
          return sortOrig.call(split(this), sort);
        },
        subarray : function(begin, end) {
          var O = split(this);
          var length = O.length;
          var $begin = describe(begin, length);
          return new (fn(O, O[k]))(O.buffer, O.byteOffset + $begin * O.BYTES_PER_ELEMENT, slice((void 0 === end ? length : describe(end, length)) - $begin));
        }
      };
      /**
       * @param {number} v
       * @param {number} a
       * @return {?}
       */
      var map = function(v, a) {
        return list(this, t.call(split(this), v, a));
      };
      /**
       * @param {!Object} key
       * @return {undefined}
       */
      var triggerWidget = function(key) {
        split(this);
        var id = match(arguments[1], 1);
        var l = this.length;
        var result = byId(key);
        var sources = slice(result.length);
        /** @type {number} */
        var index = 0;
        if (sources + id > l) {
          throw trim("Wrong length!");
        }
        for (; index < sources;) {
          this[id + index] = result[index++];
        }
      };
      var options = {
        entries : function() {
          return reader.call(split(this));
        },
        keys : function() {
          return conn.call(split(this));
        },
        values : function() {
          return b.call(split(this));
        }
      };
      /**
       * @param {!Object} target
       * @param {string} key
       * @return {?}
       */
      var get = function(target, key) {
        return isArray(target) && target[length] && "symbol" != typeof key && key in target && String(+key) == String(key);
      };
      /**
       * @param {!Object} description
       * @param {string} name
       * @return {?}
       */
      var init = function(description, name) {
        return get(description, name = namespace(name, true)) ? compare(2, description[name]) : format(description, name);
      };
      /**
       * @param {!Object} description
       * @param {string} name
       * @param {!Object} attributes
       * @return {?}
       */
      var update = function(description, name, attributes) {
        return !(get(description, name = namespace(name, true)) && isArray(attributes) && hasOwn(attributes, "value")) || hasOwn(attributes, "get") || hasOwn(attributes, "set") || attributes.configurable || hasOwn(attributes, "writable") && !attributes.writable || hasOwn(attributes, "enumerable") && !attributes.enumerable ? test(description, name, attributes) : (description[name] = attributes.value, description);
      };
      if (!USE_NATIVE) {
        /** @type {function(!Object, string): ?} */
        prop.f = init;
        /** @type {function(!Object, string, !Object): ?} */
        exports.f = update;
      }
      $export($export.S + $export.F * !USE_NATIVE, "Object", {
        getOwnPropertyDescriptor : init,
        defineProperty : update
      });
      if ($(function() {
        func.call({});
      })) {
        /** @type {function(): ?} */
        func = val = function() {
          return _join.call(this);
        };
      }
      var file = extend({}, data);
      extend(file, options);
      set(file, id, options.values);
      extend(file, {
        slice : map,
        set : triggerWidget,
        constructor : function() {
        },
        toString : func,
        toLocaleString : getFakeFixturePath
      });
      g(file, "buffer", "b");
      g(file, "byteOffset", "o");
      g(file, "byteLength", "l");
      g(file, "length", "e");
      test(file, name, {
        get : function() {
          return this[length];
        }
      });
      /**
       * @param {string} type
       * @param {number} prop
       * @param {!Object} parent
       * @param {!Object} error
       * @return {undefined}
       */
      mixin.exports = function(type, prop, parent, error) {
        /** @type {boolean} */
        error = !!error;
        /** @type {string} */
        var i = type + (error ? "Clamped" : "") + "Array";
        /** @type {string} */
        var GETTER = "get" + type;
        /** @type {string} */
        var method = "set" + type;
        var object = global[i];
        var obj = object || {};
        var o = object && isNumber(object);
        /** @type {boolean} */
        var ITERATOR = !object || !node.ABV;
        var routes = {};
        var value = object && object.prototype;
        /**
         * @param {!Function} child
         * @param {number} index
         * @return {?}
         */
        var index = function(child, index) {
          var data = child._d;
          return data.v[GETTER](index * prop + data.o, operator);
        };
        /**
         * @param {!Function} value
         * @param {number} index
         * @param {number} val
         * @return {undefined}
         */
        var setData = function(value, index, val) {
          var data = value._d;
          if (error) {
            /** @type {number} */
            val = (val = Math.round(val)) < 0 ? 0 : val > 255 ? 255 : 255 & val;
          }
          data.v[method](index * prop + data.o, val, operator);
        };
        /**
         * @param {!Object} o
         * @param {boolean} name
         * @return {undefined}
         */
        var T = function(o, name) {
          test(o, name, {
            get : function() {
              return index(this, name);
            },
            set : function(value) {
              return setData(this, name, value);
            },
            enumerable : true
          });
        };
        if (ITERATOR) {
          object = parent(function(t, options, name, partialArgs) {
            check(t, object, i, "_d");
            var buffer;
            var width;
            var height;
            var edgeDetectLines;
            /** @type {number} */
            var latHeight = 0;
            /** @type {number} */
            var m = 0;
            if (isArray(options)) {
              if (!(options instanceof Buffer || "ArrayBuffer" == (edgeDetectLines = edgeDetect(options)) || "SharedArrayBuffer" == edgeDetectLines)) {
                return length in options ? cb(object, options) : style.call(object, options);
              }
              /** @type {!Object} */
              buffer = options;
              m = match(name, prop);
              var end = options.byteLength;
              if (void 0 === partialArgs) {
                if (end % prop) {
                  throw trim("Wrong length!");
                }
                if ((width = end - m) < 0) {
                  throw trim("Wrong length!");
                }
              } else {
                if ((width = slice(partialArgs) * prop) + m > end) {
                  throw trim("Wrong length!");
                }
              }
              /** @type {number} */
              height = width / prop;
            } else {
              height = translate(options);
              /** @type {number} */
              width = height * prop;
              buffer = new Buffer(width);
            }
            set(t, "_d", {
              b : buffer,
              o : m,
              l : width,
              e : height,
              v : new DataView(buffer)
            });
            for (; latHeight < height;) {
              T(t, latHeight++);
            }
          });
          /** @type {!Object} */
          value = object.prototype = spawn(file);
          set(value, "constructor", object);
        } else {
          if (!($(function() {
            object(1);
          }) && $(function() {
            new object(-1);
          }) && method(function(options) {
            new object;
            new object(null);
            new object(1.5);
            new object(options);
          }, true))) {
            object = parent(function(trigger, options, matchA, canCreateDiscussions) {
              check(trigger, object, i);
              var edgeDetectLines;
              return isArray(options) ? options instanceof Buffer || "ArrayBuffer" == (edgeDetectLines = edgeDetect(options)) || "SharedArrayBuffer" == edgeDetectLines ? void 0 !== canCreateDiscussions ? new obj(options, match(matchA, prop), canCreateDiscussions) : void 0 !== matchA ? new obj(options, match(matchA, prop)) : new obj(options) : length in options ? cb(object, options) : style.call(object, options) : new obj(translate(options));
            });
            each(o !== Function.prototype ? f(obj).concat(f(o)) : f(obj), function(y) {
              if (!(y in object)) {
                set(object, y, obj[y]);
              }
            });
            object.prototype = value;
            value.constructor = object;
          }
        }
        var val = value[id];
        /** @type {boolean} */
        var key = !!val && ("values" == val.name || void 0 == val.name);
        /** @type {function(): ?} */
        var target = options.values;
        set(object, x, true);
        set(value, length, i);
        set(value, memberCK, true);
        set(value, k, object);
        if (!(error ? (new object(1))[name] == i : name in value)) {
          test(value, name, {
            get : function() {
              return i;
            }
          });
        }
        routes[i] = object;
        $export($export.G + $export.W + $export.F * (object != obj), routes);
        $export($export.S, i, {
          BYTES_PER_ELEMENT : prop
        });
        $export($export.S + $export.F * $(function() {
          obj.of.call(object, 1);
        }), i, {
          from : style,
          of : wrapper
        });
        if (!("BYTES_PER_ELEMENT" in value)) {
          set(value, "BYTES_PER_ELEMENT", prop);
        }
        $export($export.P, i, data);
        d(i);
        $export($export.P + $export.F * forced, i, {
          set : triggerWidget
        });
        $export($export.P + $export.F * !key, i, options);
        if (value.toString != func) {
          value.toString = func;
        }
        $export($export.P + $export.F * $(function() {
          (new object(1)).slice();
        }), i, {
          slice : map
        });
        $export($export.P + $export.F * ($(function() {
          return [1, 2].toLocaleString() != (new object([1, 2])).toLocaleString();
        }) || !$(function() {
          value.toLocaleString.call([1, 2]);
        })), i, {
          toLocaleString : getFakeFixturePath
        });
        result[i] = key ? val : target;
        if (!key) {
          set(value, id, target);
        }
      };
    } else {
      /**
       * @return {undefined}
       */
      mixin.exports = function() {
      };
    }
  });
  CheckGetSetLength("Int8", 1, function(cb) {
    return function(appRet, loginResponse, funcIns) {
      return cb(this, appRet, loginResponse, funcIns);
    };
  });
  CheckGetSetLength("Uint8", 1, function(cb) {
    return function(appRet, loginResponse, funcIns) {
      return cb(this, appRet, loginResponse, funcIns);
    };
  });
  CheckGetSetLength("Uint8", 1, function(cb) {
    return function(appRet, loginResponse, funcIns) {
      return cb(this, appRet, loginResponse, funcIns);
    };
  }, true);
  CheckGetSetLength("Int16", 2, function(cb) {
    return function(appRet, loginResponse, funcIns) {
      return cb(this, appRet, loginResponse, funcIns);
    };
  });
  CheckGetSetLength("Uint16", 2, function(cb) {
    return function(appRet, loginResponse, funcIns) {
      return cb(this, appRet, loginResponse, funcIns);
    };
  });
  CheckGetSetLength("Int32", 4, function(cb) {
    return function(appRet, loginResponse, funcIns) {
      return cb(this, appRet, loginResponse, funcIns);
    };
  });
  CheckGetSetLength("Uint32", 4, function(cb) {
    return function(appRet, loginResponse, funcIns) {
      return cb(this, appRet, loginResponse, funcIns);
    };
  });
  CheckGetSetLength("Float32", 4, function(cb) {
    return function(appRet, loginResponse, funcIns) {
      return cb(this, appRet, loginResponse, funcIns);
    };
  });
  CheckGetSetLength("Float64", 8, function(cb) {
    return function(appRet, loginResponse, funcIns) {
      return cb(this, appRet, loginResponse, funcIns);
    };
  });
  var encodeURIComponent = attr.getWeak;
  var each = createDictMethod(5);
  var findIndex = createDictMethod(6);
  /** @type {number} */
  var _colorpicker_index = 0;
  /**
   * @param {!Function} that
   * @return {?}
   */
  var frozenStore = function(that) {
    return that._l || (that._l = new FrozenStore);
  };
  /**
   * @return {undefined}
   */
  var FrozenStore = function() {
    /** @type {!Array} */
    this.a = [];
  };
  /**
   * @param {(number|string)} root
   * @param {!Function} target
   * @return {?}
   */
  var join = function(root, target) {
    return each(root.a, function(toggles) {
      return toggles[0] === target;
    });
  };
  FrozenStore.prototype = {
    get : function(name) {
      var html = join(this, name);
      if (html) {
        return html[1];
      }
    },
    has : function(val) {
      return !!join(this, val);
    },
    set : function(key, value) {
      var entry = join(this, key);
      if (entry) {
        entry[1] = value;
      } else {
        this.a.push([key, value]);
      }
    },
    delete : function(v) {
      var index = findIndex(this.a, function(b) {
        return b[0] === v;
      });
      return ~index && this.a.splice(index, 1), !!~index;
    }
  };
  var res = {
    getConstructor : function(wrapper, NAME, IS_MAP, ADDER) {
      var C = wrapper(function(that, items) {
        hide(that, C, NAME, "_i");
        /** @type {number} */
        that._t = NAME;
        /** @type {number} */
        that._i = _colorpicker_index++;
        that._l = void 0;
        if (void 0 != items) {
          forOf(items, IS_MAP, that[ADDER], that);
        }
      });
      return mix(C.prototype, {
        delete : function(data) {
          if (!isObject(data)) {
            return false;
          }
          var object = encodeURIComponent(data);
          return true === object ? frozenStore(format(this, NAME)).delete(data) : object && has(object, this._i) && delete object[this._i];
        },
        has : function(value) {
          if (!isObject(value)) {
            return false;
          }
          var object = encodeURIComponent(value);
          return true === object ? frozenStore(format(this, NAME)).has(value) : object && has(object, this._i);
        }
      }), C;
    },
    def : function(that, key, value) {
      var data = encodeURIComponent(anObject(key), true);
      return true === data ? frozenStore(that).set(key, value) : data[that._i] = value, that;
    },
    ufstore : frozenStore
  };
  var storeCtor = require(function(context) {
    var obj;
    var findKey = createDictMethod(0);
    var status = attr.getWeak;
    /** @type {function(!Object): boolean} */
    var Object_isExtensible = Object.isExtensible;
    /** @type {function(!Function): ?} */
    var $ = res.ufstore;
    var tmp = {};
    /**
     * @param {?} verifier
     * @return {?}
     */
    var value = function(verifier) {
      return function() {
        return verifier(this, arguments.length > 0 ? arguments[0] : void 0);
      };
    };
    var options = {
      get : function(name) {
        if (isObject(name)) {
          var data = status(name);
          return true === data ? $(format(this, "WeakMap")).get(name) : data ? data[this._i] : void 0;
        }
      },
      set : function(source, value) {
        return res.def(format(this, "WeakMap"), source, value);
      }
    };
    var FirebaseMultiWrite = context.exports = getCollection("WeakMap", value, options, res, true, true);
    if (fails(function() {
      return 7 != (new FirebaseMultiWrite).set((Object.freeze || Object)(tmp), 7).get(tmp);
    })) {
      obj = res.getConstructor(value, "WeakMap");
      assign(obj.prototype, options);
      /** @type {boolean} */
      attr.NEED = true;
      findKey(["delete", "has", "get", "set"], function(key) {
        var a = FirebaseMultiWrite.prototype;
        var prev = a[key];
        redefine(a, key, function(a, b) {
          if (isObject(a) && !Object_isExtensible(a)) {
            if (!this._f) {
              this._f = new obj;
            }
            var previous = this._f[key](a, b);
            return "set" == key ? this : previous;
          }
          return prev.call(this, a, b);
        });
      });
    }
  });
  getCollection("WeakSet", function(saveNotifs) {
    return function() {
      return saveNotifs(this, arguments.length > 0 ? arguments[0] : void 0);
    };
  }, {
    add : function(prop) {
      return res.def(format(this, "WeakSet"), prop, true);
    }
  }, res, false, true);
  var request = shared("metadata");
  var memoryStore = request.store || (request.store = new storeCtor);
  /**
   * @param {!Array} key
   * @param {!Array} name
   * @param {boolean} nesting
   * @return {?}
   */
  var push = function(key, name, nesting) {
    var order = memoryStore.get(key);
    if (!order) {
      if (!nesting) {
        return;
      }
      memoryStore.set(key, order = new Map);
    }
    var entry = order.get(name);
    if (!entry) {
      if (!nesting) {
        return;
      }
      order.set(name, entry = new Map);
    }
    return entry;
  };
  /**
   * @param {number} val
   * @param {!Object} item
   * @param {!Array} key
   * @return {?}
   */
  var contains = function(val, item, key) {
    var value = push(item, key, false);
    return void 0 !== value && value.has(val);
  };
  /**
   * @param {number} value
   * @param {!Function} key
   * @param {!Array} start
   * @return {?}
   */
  var QueryStringParser$placeNestedValue = function(value, key, start) {
    var symbol = push(key, start, false);
    return void 0 === symbol ? void 0 : symbol.get(value);
  };
  /**
   * @param {!Object} target
   * @param {?} name
   * @param {!Object} block
   * @param {!Array} value
   * @return {undefined}
   */
  var createAndSet = function(target, name, block, value) {
    push(block, value, true).set(target, name);
  };
  /**
   * @param {!Object} type
   * @param {!Array} name
   * @return {?}
   */
  var items = function(type, name) {
    var steps = push(type, name, false);
    /** @type {!Array} */
    var returnNodes = [];
    return steps && steps.forEach(function(canCreateDiscussions, result) {
      returnNodes.push(result);
    }), returnNodes;
  };
  /**
   * @param {number} x
   * @return {?}
   */
  var $$$Immutable$$isImmutable = function(x) {
    return void 0 === x || "symbol" == typeof x ? x : String(x);
  };
  /**
   * @param {number} options
   * @return {undefined}
   */
  var x2 = function(options) {
    $def($def.S, "Reflect", options);
  };
  var options = {
    store : memoryStore,
    map : push,
    has : contains,
    get : QueryStringParser$placeNestedValue,
    set : createAndSet,
    keys : items,
    key : $$$Immutable$$isImmutable,
    exp : x2
  };
  /** @type {function(number): ?} */
  var keyLength = options.key;
  /** @type {function(!Object, ?, !Object, !Array): undefined} */
  var handler = options.set;
  options.exp({
    defineMetadata : function(type, target, key, newState) {
      handler(type, target, anObject(key), keyLength(newState));
    }
  });
  /** @type {function(number): ?} */
  var keyCallback = options.key;
  /** @type {function(!Array, !Array, boolean): ?} */
  var map = options.map;
  var ds = options.store;
  options.exp({
    deleteMetadata : function(name, value) {
      var cb = arguments.length < 3 ? void 0 : keyCallback(arguments[2]);
      var r = map(anObject(value), cb, false);
      if (void 0 === r || !r.delete(name)) {
        return false;
      }
      if (r.size) {
        return true;
      }
      var o = ds.get(value);
      return o.delete(cb), !!o.size || ds.delete(value);
    }
  });
  /** @type {function(number, !Object, !Array): ?} */
  var debug = options.has;
  /** @type {function(number, !Function, !Array): ?} */
  var out = options.get;
  /** @type {function(number): ?} */
  var isFunction = options.key;
  /**
   * @param {number} key
   * @param {!Object} data
   * @param {!Array} value
   * @return {?}
   */
  var next = function(key, data, value) {
    if (debug(key, data, value)) {
      return out(key, data, value);
    }
    /** @type {(Object|null)} */
    var token = getPrototypeOf(data);
    return null !== token ? next(key, token, value) : void 0;
  };
  options.exp({
    getMetadata : function(u, key) {
      return next(u, anObject(key), arguments.length < 3 ? void 0 : isFunction(arguments[2]));
    }
  });
  /**
   * @param {?} value
   * @param {?} isNew
   * @return {?}
   */
  var toJSON = function(value, isNew) {
    /** @type {!Array} */
    var result = [];
    return forOf(value, false, result.push, result, isNew), result;
  };
  /** @type {function(!Object, !Array): ?} */
  var OrdinaryOwnMetadataKeys = options.keys;
  /** @type {function(number): ?} */
  var isPointLike = options.key;
  /**
   * @param {!Object} O
   * @param {!Array} P
   * @return {?}
   */
  var OrdinaryMetadataKeys = function(O, P) {
    var oKeys = OrdinaryOwnMetadataKeys(O, P);
    /** @type {(Object|null)} */
    var parent = getPrototypeOf(O);
    if (null === parent) {
      return oKeys;
    }
    var pKeys = OrdinaryMetadataKeys(parent, P);
    return pKeys.length ? oKeys.length ? toJSON(new modulesToExplore(oKeys.concat(pKeys))) : pKeys : oKeys;
  };
  options.exp({
    getMetadataKeys : function(target) {
      return OrdinaryMetadataKeys(anObject(target), arguments.length < 2 ? void 0 : isPointLike(arguments[1]));
    }
  });
  /** @type {function(number, !Function, !Array): ?} */
  var ok = options.get;
  /** @type {function(number): ?} */
  var implementStorageInterface = options.key;
  options.exp({
    getOwnMetadata : function(input, target) {
      return ok(input, anObject(target), arguments.length < 3 ? void 0 : implementStorageInterface(arguments[2]));
    }
  });
  /** @type {function(!Object, !Array): ?} */
  var hideMenu = options.keys;
  /** @type {function(number): ?} */
  var readOnlyFn = options.key;
  options.exp({
    getOwnMetadataKeys : function(target) {
      return hideMenu(anObject(target), arguments.length < 2 ? void 0 : readOnlyFn(arguments[1]));
    }
  });
  /** @type {function(number, !Object, !Array): ?} */
  var job = options.has;
  /** @type {function(number): ?} */
  var addJsError = options.key;
  /**
   * @param {number} val
   * @param {(Object|string)} data
   * @param {!Array} notify
   * @return {?}
   */
  var copy = function(val, data, notify) {
    if (job(val, data, notify)) {
      return true;
    }
    /** @type {(Object|null)} */
    var value = getPrototypeOf(data);
    return null !== value && copy(val, value, notify);
  };
  options.exp({
    hasMetadata : function(key, target) {
      return copy(key, anObject(target), arguments.length < 3 ? void 0 : addJsError(arguments[2]));
    }
  });
  /** @type {function(number, !Object, !Array): ?} */
  var search = options.has;
  /** @type {function(number): ?} */
  var setArgsFromObj = options.key;
  options.exp({
    hasOwnMetadata : function(target, key) {
      return search(target, anObject(key), arguments.length < 3 ? void 0 : setArgsFromObj(arguments[2]));
    }
  });
  /** @type {function(number): ?} */
  var json = options.key;
  /** @type {function(!Object, ?, !Object, !Array): undefined} */
  var print = options.set;
  options.exp({
    metadata : function(index, value) {
      return function(target, val) {
        print(index, value, (void 0 !== val ? anObject : aFunction)(target), json(val));
      };
    }
  });
  require(function(canCreateDiscussions, isSlidingUp) {
    !function(addedRenderer, saveNotifs) {
      saveNotifs();
    }(0, function() {
      /**
       * @param {!Array} source
       * @param {string} name
       * @return {?}
       */
      function get(source, name) {
        /** @type {number} */
        var prop = source.length - 1;
        for (; prop >= 0; prop--) {
          if (typeof source[prop] === string) {
            source[prop] = Zone.current.wrap(source[prop], name + "_" + prop);
          }
        }
        return source;
      }
      /**
       * @param {!Object} obj
       * @param {!Array} fnNames
       * @return {undefined}
       */
      function patchPrototype(obj, fnNames) {
        var mName = obj.constructor.name;
        /** @type {number} */
        var i = 0;
        for (; i < fnNames.length; i++) {
          !function(i) {
            var key = fnNames[i];
            var value = obj[key];
            if (value) {
              if (!callback(Object.getOwnPropertyDescriptor(obj, key))) {
                return "continue";
              }
              obj[key] = function(t) {
                /**
                 * @return {?}
                 */
                var n = function() {
                  return t.apply(this, get(arguments, mName + "." + key));
                };
                return add(n, t), n;
              }(value);
            }
          }(i);
        }
      }
      /**
       * @param {!Object} data
       * @return {?}
       */
      function callback(data) {
        return !data || false !== data.writable && (typeof data.get !== string || typeof data.set !== message);
      }
      /**
       * @param {!Object} obj
       * @param {string} name
       * @param {!Object} o
       * @return {undefined}
       */
      function test(obj, name, o) {
        /** @type {(ObjectPropertyDescriptor<?>|undefined)} */
        var desc = Object.getOwnPropertyDescriptor(obj, name);
        if (!desc && o) {
          if (Object.getOwnPropertyDescriptor(o, name)) {
            desc = {
              enumerable : true,
              configurable : true
            };
          }
        }
        if (desc && desc.configurable) {
          delete desc.writable;
          delete desc.value;
          /** @type {(function(this:THIS): ?|undefined)} */
          var getter = desc.get;
          var type = name.substr(2);
          var key = res[type];
          if (!key) {
            key = res[type] = $("ON_PROPERTY" + type);
          }
          /**
           * @param {!Object} value
           * @return {undefined}
           */
          desc.set = function(value) {
            var root = this;
            if (root || obj !== d || (root = d), root) {
              if (root[key]) {
                root.removeEventListener(type, _clickHandler);
              }
              if ("function" == typeof value) {
                /** @type {!Object} */
                root[key] = value;
                root.addEventListener(type, _clickHandler, false);
              } else {
                /** @type {null} */
                root[key] = null;
              }
            }
          };
          /**
           * @return {?}
           */
          desc.get = function() {
            var root = this;
            if (root || obj !== d || (root = d), !root) {
              return null;
            }
            var id = root[key];
            if (id) {
              return id;
            }
            if (getter) {
              var result = getter && getter.apply(this);
              if (result) {
                return desc.set.apply(this, [result]), typeof root[L] === string && root.removeAttribute(name), result;
              }
            }
            return null;
          };
          Object.defineProperty(obj, name, desc);
        }
      }
      /**
       * @param {!Object} func
       * @param {!Array} s
       * @param {!Object} a
       * @return {undefined}
       */
      function exec(func, s, a) {
        if (s) {
          /** @type {number} */
          var i = 0;
          for (; i < s.length; i++) {
            test(func, "on" + s[i], a);
          }
        } else {
          /** @type {!Array} */
          var people = [];
          var f;
          for (f in func) {
            if ("on" == f.substr(0, 2)) {
              people.push(f);
            }
          }
          /** @type {number} */
          var i = 0;
          for (; i < people.length; i++) {
            test(func, people[i], a);
          }
        }
      }
      /**
       * @param {string} className
       * @return {undefined}
       */
      function patchClass(className) {
        var item = d[className];
        if (item) {
          d[$(className)] = item;
          /**
           * @return {undefined}
           */
          d[className] = function() {
            var ret = get(arguments, className);
            switch(ret.length) {
              case 0:
                this[parent] = new item;
                break;
              case 1:
                this[parent] = new item(ret[0]);
                break;
              case 2:
                this[parent] = new item(ret[0], ret[1]);
                break;
              case 3:
                this[parent] = new item(ret[0], ret[1], ret[2]);
                break;
              case 4:
                this[parent] = new item(ret[0], ret[1], ret[2], ret[3]);
                break;
              default:
                throw new Error("Arg list too long.");
            }
          };
          add(d[className], item);
          var key;
          var instance = new item(function() {
          });
          for (key in instance) {
            if (!("XMLHttpRequest" === className && "responseBlob" === key)) {
              (function(name) {
                if ("function" == typeof instance[name]) {
                  /**
                   * @return {?}
                   */
                  d[className].prototype[name] = function() {
                    return this[parent][name].apply(this[parent], arguments);
                  };
                } else {
                  Object.defineProperty(d[className].prototype, name, {
                    set : function(obj) {
                      if ("function" == typeof obj) {
                        this[parent][name] = Zone.current.wrap(obj, className + "." + name);
                        add(this[parent][name], obj);
                      } else {
                        /** @type {!Object} */
                        this[parent][name] = obj;
                      }
                    },
                    get : function() {
                      return this[parent][name];
                    }
                  });
                }
              })(key);
            }
          }
          for (key in item) {
            if ("prototype" !== key && item.hasOwnProperty(key)) {
              d[className][key] = item[key];
            }
          }
        }
      }
      /**
       * @param {string} target
       * @param {string} name
       * @param {!Function} foo
       * @return {?}
       */
      function patchMethod(target, name, foo) {
        /** @type {string} */
        var obj = target;
        for (; obj && !obj.hasOwnProperty(name);) {
          /** @type {(Object|null)} */
          obj = Object.getPrototypeOf(obj);
        }
        if (!obj && target[name]) {
          /** @type {string} */
          obj = target;
        }
        var x;
        var i = $(name);
        if (obj && !(x = obj[i])) {
          x = obj[i] = obj[name];
          if (callback(obj && Object.getOwnPropertyDescriptor(obj, name))) {
            var bar = foo(x, i, name);
            /**
             * @return {?}
             */
            obj[name] = function() {
              return bar(this, arguments);
            };
            add(obj[name], x);
          }
        }
        return x;
      }
      /**
       * @param {string} window
       * @param {string} cancelName
       * @param {!Function} placeholder
       * @return {undefined}
       */
      function patchXHR(window, cancelName, placeholder) {
        /**
         * @param {!Object} task
         * @return {?}
         */
        function scheduleTask(task) {
          var data = task.data;
          return data.args[data.callbackIndex] = function() {
            task.invoke.apply(this, arguments);
          }, clearNative.apply(data.target, data.args), task;
        }
        /** @type {null} */
        var clearNative = null;
        clearNative = patchMethod(window, cancelName, function(definition) {
          return function(attrs, args) {
            var options = placeholder(attrs, args);
            if (options.callbackIndex >= 0 && "function" == typeof args[options.callbackIndex]) {
              return Zone.current.scheduleMacroTask(options.name, args[options.callbackIndex], options, scheduleTask, null);
            }
            return definition.apply(attrs, args);
          };
        });
      }
      /**
       * @param {!Function} res
       * @param {!Function} name
       * @return {undefined}
       */
      function add(res, name) {
        /** @type {!Function} */
        res[$("OriginalDelegate")] = name;
      }
      /**
       * @return {?}
       */
      function detectIE() {
        if (B) {
          return 0;
        }
        /** @type {boolean} */
        B = true;
        try {
          /** @type {string} */
          var ua = window.navigator.userAgent;
          ua.indexOf("MSIE ");
          return -1 === ua.indexOf("MSIE ") && -1 === ua.indexOf("Trident/") && -1 === ua.indexOf("Edge/") || (0 = true), 0;
        } catch (t) {
        }
      }
      /**
       * @param {!Object} event
       * @param {!Array} params
       * @param {string} type
       * @return {?}
       */
      function init(event, params, type) {
        var i = type && type.addEventListenerFnName || "addEventListener";
        var key = type && type.removeEventListenerFnName || "removeEventListener";
        var n = type && type.listenersFnName || "eventListeners";
        var k = type && type.removeAllFnName || "removeAllListeners";
        var j = $(i);
        /** @type {string} */
        var from = "." + i + ":";
        /** @type {string} */
        var name = "prependListener";
        /** @type {string} */
        var el = "." + name + ":";
        /**
         * @param {!Object} request
         * @param {!Object} data
         * @param {!Object} source
         * @return {undefined}
         */
        var bind = function(request, data, source) {
          if (!request.isRemoved) {
            var callback = request.callback;
            if (typeof callback === object && callback.handleEvent) {
              /**
               * @param {?} canvas
               * @return {?}
               */
              request.callback = function(canvas) {
                return callback.handleEvent(canvas);
              };
              request.originalDelegate = callback;
            }
            request.invoke(request, data, [source]);
            var options = request.options;
            if (options && "object" == typeof options && options.once) {
              var oCachedResponse = request.originalDelegate ? request.originalDelegate : request.callback;
              data[key].apply(data, [source.type, oCachedResponse, options]);
            }
          }
        };
        /**
         * @param {!Object} a
         * @return {undefined}
         */
        var remove = function(a) {
          if (a = a || event.event) {
            var data = this || a.target || event;
            var obj = data[memo[a.type][val]];
            if (obj) {
              if (1 === obj.length) {
                bind(obj[0], data, a);
              } else {
                var events = obj.slice();
                /** @type {number} */
                var i = 0;
                for (; i < events.length && (!a || true !== a[$orderCol]); i++) {
                  bind(events[i], data, a);
                }
              }
            }
          }
        };
        /**
         * @param {!Object} a
         * @return {undefined}
         */
        var add = function(a) {
          if (a = a || event.event) {
            var data = this || a.target || event;
            var obj = data[memo[a.type][idx]];
            if (obj) {
              if (1 === obj.length) {
                bind(obj[0], data, a);
              } else {
                var events = obj.slice();
                /** @type {number} */
                var i = 0;
                for (; i < events.length && (!a || true !== a[$orderCol]); i++) {
                  bind(events[i], data, a);
                }
              }
            }
          }
        };
        /** @type {!Array} */
        var self = [];
        /** @type {number} */
        var p = 0;
        for (; p < params.length; p++) {
          self[p] = function(nil, config) {
            if (!nil) {
              return false;
            }
            /** @type {boolean} */
            var p = true;
            if (config && void 0 !== config.useGlobalCallback) {
              p = config.useGlobalCallback;
            }
            var validate = config && config.validateHandler;
            /** @type {boolean} */
            var force = true;
            if (config && void 0 !== config.checkDuplicate) {
              force = config.checkDuplicate;
            }
            /** @type {boolean} */
            var container = false;
            if (config && void 0 !== config.returnTarget) {
              container = config.returnTarget;
            }
            /** @type {!Object} */
            var obj = nil;
            for (; obj && !obj.hasOwnProperty(i);) {
              /** @type {(Object|null)} */
              obj = Object.getPrototypeOf(obj);
            }
            if (!obj && nil[i] && (obj = nil), !obj) {
              return false;
            }
            if (obj[j]) {
              return false;
            }
            var item;
            var event = {};
            var model = obj[j] = obj[i];
            var req = obj[$(key)] = obj[key];
            var right = obj[$(n)] = obj[n];
            var extractData = obj[$(k)] = obj[k];
            if (config && config.prependEventListenerFnName) {
              item = obj[$(config.prependEventListenerFnName)] = obj[config.prependEventListenerFnName];
            }
            /**
             * @param {?} clearNamespace
             * @return {?}
             */
            var clear = function(clearNamespace) {
              if (!event.isExisting) {
                return model.apply(event.target, [event.eventName, event.capture ? add : remove, event.options]);
              }
            };
            /**
             * @param {!Object} options
             * @return {?}
             */
            var init = function(options) {
              if (!options.isRemoved) {
                var r = memo[options.eventName];
                var arg = void 0;
                if (r) {
                  arg = r[options.capture ? idx : val];
                }
                var command = arg && options.target[arg];
                if (command) {
                  /** @type {number} */
                  var pos = 0;
                  for (; pos < command.length; pos++) {
                    var type = command[pos];
                    if (type === options) {
                      command.splice(pos, 1);
                      /** @type {boolean} */
                      options.isRemoved = true;
                      if (0 === command.length) {
                        /** @type {boolean} */
                        options.allRemoved = true;
                        /** @type {null} */
                        options.target[arg] = null;
                      }
                      break;
                    }
                  }
                }
              }
              if (options.allRemoved) {
                return req.apply(options.target, [options.eventName, options.capture ? add : remove, options.options]);
              }
            };
            /**
             * @param {!Object} todos
             * @return {?}
             */
            var handler = function(todos) {
              return model.apply(event.target, [event.eventName, todos.invoke, event.options]);
            };
            /**
             * @param {!Object} fn
             * @return {?}
             */
            var value = function(fn) {
              return item.apply(event.target, [event.eventName, fn.invoke, event.options]);
            };
            /**
             * @param {!Object} context
             * @return {?}
             */
            var f = function(context) {
              return req.apply(context.target, [context.eventName, context.invoke, context.options]);
            };
            /** @type {function(?): ?} */
            var v = p ? clear : handler;
            /** @type {function(!Object): ?} */
            var source = p ? init : f;
            /**
             * @param {string} value
             * @param {?} key
             * @return {?}
             */
            var callback = function(value, key) {
              /** @type {string} */
              var type = typeof key;
              return type === number && value.callback === key || type === object && value.originalDelegate === key;
            };
            var cb = config && config.compareTaskCallbackVsDelegate ? config.compareTaskCallbackVsDelegate : callback;
            /**
             * @param {!Function} src
             * @param {string} key
             * @param {!Function} count
             * @param {!Function} x
             * @param {number} id
             * @param {number} f
             * @return {?}
             */
            var update = function(src, key, count, x, id, f) {
              return void 0 === id && (id = false), void 0 === f && (f = false), function() {
                var data = this || event;
                var s = (Zone.current, arguments[1]);
                if (!s) {
                  return src.apply(this, arguments);
                }
                /** @type {boolean} */
                var t = false;
                if (typeof s !== number) {
                  if (!s.handleEvent) {
                    return src.apply(this, arguments);
                  }
                  /** @type {boolean} */
                  t = true;
                }
                if (!validate || validate(src, s, data, arguments)) {
                  var user;
                  var type = arguments[0];
                  var params = arguments[2];
                  /** @type {boolean} */
                  var parenDepth = false;
                  if (void 0 === params) {
                    /** @type {boolean} */
                    user = false;
                  } else {
                    if (true === params) {
                      /** @type {boolean} */
                      user = true;
                    } else {
                      if (false === params) {
                        /** @type {boolean} */
                        user = false;
                      } else {
                        /** @type {boolean} */
                        user = !!params && !!params.capture;
                        /** @type {boolean} */
                        parenDepth = !!params && !!params.once;
                      }
                    }
                  }
                  var name;
                  var zone = Zone.current;
                  var points = memo[type];
                  if (points) {
                    name = points[user ? idx : val];
                  } else {
                    /** @type {string} */
                    var filter = type + val;
                    /** @type {string} */
                    var message = type + idx;
                    /** @type {string} */
                    var key = prefix + filter;
                    /** @type {string} */
                    var text = prefix + message;
                    memo[type] = {};
                    /** @type {string} */
                    memo[type][val] = key;
                    /** @type {string} */
                    memo[type][idx] = text;
                    /** @type {string} */
                    name = user ? text : key;
                  }
                  var values = data[name];
                  /** @type {boolean} */
                  var bbox = false;
                  if (values) {
                    if (bbox = true, force) {
                      /** @type {number} */
                      var i = 0;
                      for (; i < values.length; i++) {
                        if (cb(values[i], s)) {
                          return;
                        }
                      }
                    }
                  } else {
                    /** @type {!Array} */
                    values = data[name] = [];
                  }
                  var source;
                  var property = data.constructor[prop];
                  var result = db[property];
                  if (result) {
                    source = result[type];
                  }
                  if (!source) {
                    source = property + key + type;
                  }
                  event.options = params;
                  if (parenDepth) {
                    /** @type {boolean} */
                    event.options.once = false;
                  }
                  event.target = data;
                  event.capture = user;
                  event.eventName = type;
                  /** @type {boolean} */
                  event.isExisting = bbox;
                  /** @type {(null|{isUsingGlobalCallback: boolean})} */
                  var options = p ? v : null;
                  var o = zone.scheduleEventTask(source, s, options, count, x);
                  return parenDepth && (params.once = true), o.options = params, o.target = data, o.capture = user, o.eventName = type, t && (o.originalDelegate = s), f ? values.unshift(o) : values.push(o), id ? data : void 0;
                }
              };
            };
            return obj[i] = update(model, from, v, source, container), item && (obj[name] = update(item, el, value, source, container, true)), obj[key] = function() {
              var mTo;
              var val = this || event;
              var type = arguments[0];
              var results = arguments[2];
              /** @type {boolean} */
              mTo = void 0 !== results && (true === results || false !== results && (!!results && !!results.capture));
              var res = arguments[1];
              if (!res) {
                return req.apply(this, arguments);
              }
              if (!validate || validate(req, res, val, arguments)) {
                var templateWidgetName;
                var points = memo[type];
                if (points) {
                  templateWidgetName = points[mTo ? idx : val];
                }
                var array = templateWidgetName && val[templateWidgetName];
                if (array) {
                  /** @type {number} */
                  var i = 0;
                  for (; i < array.length; i++) {
                    var task = array[i];
                    if (cb(task, res)) {
                      return array.splice(i, 1), task.isRemoved = true, 0 === array.length && (task.allRemoved = true, val[templateWidgetName] = null), void task.zone.cancelTask(task);
                    }
                  }
                }
              }
            }, obj[n] = function() {
              var type = this || event;
              var tag = arguments[0];
              /** @type {!Array} */
              var deletingLaunches = [];
              var value = f(type, tag);
              /** @type {number} */
              var j = 0;
              for (; j < value.length; j++) {
                var config = value[j];
                var id = config.originalDelegate ? config.originalDelegate : config.callback;
                deletingLaunches.push(id);
              }
              return deletingLaunches;
            }, obj[k] = function() {
              var data = this || event;
              var name = arguments[0];
              if (name) {
                var result = memo[name];
                if (result) {
                  var type = result[val];
                  var id = result[idx];
                  var values = data[type];
                  var item = data[id];
                  if (values) {
                    var data = flatten(values);
                    /** @type {number} */
                    var i = 0;
                    for (; i < data.length; i++) {
                      var target = data[i];
                      var oCachedResponse = target.originalDelegate ? target.originalDelegate : target.callback;
                      this[key].apply(this, [name, oCachedResponse, target.options]);
                    }
                  }
                  if (item) {
                    data = flatten(item);
                    /** @type {number} */
                    i = 0;
                    for (; i < data.length; i++) {
                      target = data[i];
                      oCachedResponse = target.originalDelegate ? target.originalDelegate : target.callback;
                      this[key].apply(this, [name, oCachedResponse, target.options]);
                    }
                  }
                }
              } else {
                /** @type {!Array<string>} */
                var h = Object.keys(data);
                /** @type {number} */
                i = 0;
                for (; i < h.length; i++) {
                  /** @type {string} */
                  var val = h[i];
                  /** @type {(Array<string>|null)} */
                  var match = regEvalVal.exec(val);
                  /** @type {(null|string)} */
                  var key = match && match[1];
                  if (key && "removeListener" !== key) {
                    this[k].apply(this, [key]);
                  }
                }
                this[k].apply(this, ["removeListener"]);
              }
            }, add(obj[i], model), add(obj[key], req), extractData && add(obj[k], extractData), right && add(obj[n], right), true;
          }(params[p], type);
        }
        return self;
      }
      /**
       * @param {!Object} a
       * @param {string} name
       * @return {?}
       */
      function f(a, name) {
        /** @type {!Array} */
        var b = [];
        var k;
        for (k in a) {
          /** @type {(Array<string>|null)} */
          var row = regEvalVal.exec(k);
          /** @type {(null|string)} */
          var evtName = row && row[1];
          if (evtName && (!name || evtName === name)) {
            var t = a[k];
            if (t) {
              /** @type {number} */
              var i = 0;
              for (; i < t.length; i++) {
                b.push(t[i]);
              }
            }
          }
        }
        return b;
      }
      /**
       * @param {!Window} options
       * @param {?} _
       * @return {undefined}
       */
      function set(options, _) {
        var ctor = options.Event;
        if (ctor && ctor.prototype) {
          _.patchMethod(ctor.prototype, "stopImmediatePropagation", function(canCreateDiscussions) {
            return function(a, canCreateDiscussions) {
              /** @type {boolean} */
              a[$orderCol] = true;
            };
          });
        }
      }
      /**
       * @param {string} window
       * @param {string} setName
       * @param {string} cancelName
       * @param {string} nameSuffix
       * @return {undefined}
       */
      function patchTimer(window, setName, cancelName, nameSuffix) {
        /**
         * @param {!Object} task
         * @return {?}
         */
        function scheduleTask(task) {
          /**
           * @return {undefined}
           */
          function scheduleTask() {
            try {
              task.invoke.apply(this, arguments);
            } finally {
              if (typeof data.handleId === number) {
                delete queue[data.handleId];
              } else {
                if (data.handleId) {
                  /** @type {null} */
                  data.handleId[key] = null;
                }
              }
            }
          }
          var data = task.data;
          return data.args[0] = scheduleTask, data.handleId = setNative.apply(window, data.args), task;
        }
        /**
         * @param {!Object} task
         * @return {?}
         */
        function clearTask(task) {
          return clearNative(task.data.handleId);
        }
        /** @type {null} */
        var setNative = null;
        /** @type {null} */
        var clearNative = null;
        setName = setName + nameSuffix;
        cancelName = cancelName + nameSuffix;
        var queue = {};
        /** @type {string} */
        var number = "number";
        setNative = patchMethod(window, setName, function(propertiesOrFunction) {
          return function(a, args) {
            if ("function" == typeof args[0]) {
              var zone = Zone.current;
              var options = {
                handleId : null,
                isPeriodic : "Interval" === nameSuffix,
                delay : "Timeout" === nameSuffix || "Interval" === nameSuffix ? args[1] || 0 : null,
                args : args
              };
              var task = zone.scheduleMacroTask(setName, args[0], options, scheduleTask, clearTask);
              if (!task) {
                return task;
              }
              var handle = task.data.handleId;
              return typeof handle === number ? queue[handle] = task : handle && (handle[key] = task), handle && handle.ref && handle.unref && "function" == typeof handle.ref && "function" == typeof handle.unref && (task.ref = handle.ref.bind(handle), task.unref = handle.unref.bind(handle)), typeof handle === number || handle ? handle : task;
            }
            return propertiesOrFunction.apply(window, args);
          };
        });
        clearNative = patchMethod(window, cancelName, function(propertiesOrFunction) {
          return function(n, args) {
            var task;
            var name = args[0];
            if (typeof name === number) {
              task = queue[name];
            } else {
              if (!(task = name && name[key])) {
                task = name;
              }
            }
            if (task && "string" == typeof task.type) {
              if ("notScheduled" !== task.state && (task.cancelFn && task.data.isPeriodic || 0 === task.runCount)) {
                if (typeof name === number) {
                  delete queue[name];
                } else {
                  if (name) {
                    /** @type {null} */
                    name[key] = null;
                  }
                }
                task.zone.cancelTask(task);
              }
            } else {
              propertiesOrFunction.apply(window, args);
            }
          };
        });
      }
      /**
       * @return {undefined}
       */
      function propertyPatch() {
        /**
         * @param {!Object} obj
         * @param {string} type
         * @param {!Object} desc
         * @return {!Object}
         */
        Object.defineProperty = function(obj, type, desc) {
          if (wrap(obj, type)) {
            throw new TypeError("Cannot assign to read only property '" + type + "' of " + obj);
          }
          var originalConfigurableFlag = desc.configurable;
          return type !== r && (desc = rewriteDescriptor(obj, type, desc)), _tryDefineProperty(obj, type, desc, originalConfigurableFlag);
        };
        /**
         * @param {!Object} o
         * @param {!Object} properties
         * @return {!Object}
         */
        Object.defineProperties = function(o, properties) {
          return Object.keys(properties).forEach(function(name) {
            Object.defineProperty(o, name, properties[name]);
          }), o;
        };
        /**
         * @param {(Object|null)} obj
         * @param {(Object|null)=} proto
         * @return {!Object}
         */
        Object.create = function(obj, proto) {
          return typeof proto !== map || Object.isFrozen(proto) || Object.keys(proto).forEach(function(prop) {
            proto[prop] = rewriteDescriptor(obj, prop, proto[prop]);
          }), _create(obj, proto);
        };
        /**
         * @param {!Object} description
         * @param {string} name
         * @return {(ObjectPropertyDescriptor<T>|undefined)}
         * @template T
         */
        Object.getOwnPropertyDescriptor = function(description, name) {
          /** @type {(ObjectPropertyDescriptor<?>|undefined)} */
          var descriptor = gOPD(description, name);
          return wrap(description, name) && (descriptor.configurable = false), descriptor;
        };
      }
      /**
       * @param {!Object} obj
       * @param {string} prop
       * @param {!Object} desc
       * @return {?}
       */
      function _redefineProperty(obj, prop, desc) {
        var originalConfigurableFlag = desc.configurable;
        return desc = rewriteDescriptor(obj, prop, desc), _tryDefineProperty(obj, prop, desc, originalConfigurableFlag);
      }
      /**
       * @param {!Object} obj
       * @param {string} name
       * @return {?}
       */
      function wrap(obj, name) {
        return obj && obj[property] && obj[property][name];
      }
      /**
       * @param {!Object} obj
       * @param {string} prop
       * @param {!Object} desc
       * @return {?}
       */
      function rewriteDescriptor(obj, prop, desc) {
        return desc.configurable = true, desc.configurable || (obj[property] || _defineProperty(obj, property, {
          writable : true,
          value : {}
        }), obj[property][prop] = true), desc;
      }
      /**
       * @param {!Object} obj
       * @param {string} prop
       * @param {!Object} desc
       * @param {boolean} originalConfigurableFlag
       * @return {?}
       */
      function _tryDefineProperty(obj, prop, desc, originalConfigurableFlag) {
        try {
          return _defineProperty(obj, prop, desc);
        } catch (i) {
          if (!desc.configurable) {
            throw i;
          }
          if (typeof originalConfigurableFlag == undefined) {
            delete desc.configurable;
          } else {
            /** @type {boolean} */
            desc.configurable = originalConfigurableFlag;
          }
          try {
            return _defineProperty(obj, prop, desc);
          } catch (r) {
            /** @type {null} */
            var type = null;
            try {
              /** @type {string} */
              type = JSON.stringify(desc);
            } catch (t) {
              /** @type {string} */
              type = type.toString();
            }
            console.log("Attempting to configure '" + prop + "' with descriptor '" + type + "' on object '" + obj + "' and got error, giving up: " + r);
          }
        }
      }
      /**
       * @param {?} name
       * @param {!Object} window
       * @return {undefined}
       */
      function attach(name, window) {
        /** @type {function(?, boolean): ?} */
        var WebSocket = window.WebSocket;
        if (!window.EventTarget) {
          init(window, [WebSocket.prototype]);
        }
        /**
         * @param {?} options
         * @param {boolean} requestOptions
         * @return {?}
         */
        window.WebSocket = function(options, requestOptions) {
          var c;
          var n;
          var o = arguments.length > 1 ? new WebSocket(options, requestOptions) : new WebSocket(options);
          /** @type {(ObjectPropertyDescriptor<?>|undefined)} */
          var prop = Object.getOwnPropertyDescriptor(o, "onmessage");
          return prop && false === prop.configurable ? (c = Object.create(o), n = o, ["addEventListener", "removeEventListener", "send", "close"].forEach(function(t) {
            /**
             * @return {?}
             */
            c[t] = function() {
              /** @type {!Array<?>} */
              var e = Array.prototype.slice.call(arguments);
              if ("addEventListener" === t || "removeEventListener" === t) {
                var n = e.length > 0 ? e[0] : void 0;
                if (n) {
                  var p = Zone.__symbol__("ON_PROPERTY" + n);
                  o[p] = c[p];
                }
              }
              return o[t].apply(o, e);
            };
          })) : c = o, exec(c, ["close", "error", "message", "open"], n), c;
        };
        /** @type {function(?, boolean): ?} */
        var a_states_ld = window.WebSocket;
        var state;
        for (state in WebSocket) {
          a_states_ld[state] = WebSocket[state];
        }
      }
      /**
       * @param {!Object} t
       * @param {!Array} data
       * @param {!Array} _
       * @return {?}
       */
      function done(t, data, _) {
        if (!_) {
          return data;
        }
        var expRecords = _.filter(function(link) {
          return link.target === t;
        });
        if (!expRecords || 0 === expRecords.length) {
          return data;
        }
        var ignoreProperties = expRecords[0].ignoreProperties;
        return data.filter(function(key) {
          return -1 === ignoreProperties.indexOf(key);
        });
      }
      /**
       * @param {!Object} obj
       * @param {!Array} callback
       * @param {!Array} error
       * @param {!Object} properties
       * @return {undefined}
       */
      function patchOnProperties(obj, callback, error, properties) {
        exec(obj, done(obj, callback, error), properties);
      }
      /**
       * @param {?} parent
       * @param {!Object} window
       * @return {undefined}
       */
      function patch(parent, window) {
        if (!hasSongChanged || winRef) {
          /** @type {boolean} */
          var refresh = "undefined" != typeof WebSocket;
          if (canPatchViaPropertyDescriptor()) {
            var r = window.__Zone_ignore_on_properties;
            if (inputWin) {
              patchOnProperties(window, result.concat(["messageerror"]), r, Object.getPrototypeOf(window));
              patchOnProperties(Document.prototype, result, r);
              if (void 0 !== window.SVGElement) {
                patchOnProperties(window.SVGElement.prototype, result, r);
              }
              patchOnProperties(Element.prototype, result, r);
              patchOnProperties(HTMLElement.prototype, result, r);
              patchOnProperties(HTMLMediaElement.prototype, eventNames, r);
              patchOnProperties(HTMLFrameSetElement.prototype, password.concat(type), r);
              patchOnProperties(HTMLBodyElement.prototype, password.concat(type), r);
              patchOnProperties(HTMLFrameElement.prototype, loadEvents, r);
              patchOnProperties(HTMLIFrameElement.prototype, loadEvents, r);
              var WebSocket = window.HTMLMarqueeElement;
              if (WebSocket) {
                patchOnProperties(WebSocket.prototype, actions, r);
              }
              var Worker = window.Worker;
              if (Worker) {
                patchOnProperties(Worker.prototype, methods, r);
              }
            }
            patchOnProperties(XMLHttpRequest.prototype, dispatches, r);
            var HTMLCanvasElement = window.XMLHttpRequestEventTarget;
            if (HTMLCanvasElement) {
              patchOnProperties(HTMLCanvasElement && HTMLCanvasElement.prototype, dispatches, r);
            }
            if ("undefined" != typeof IDBIndex) {
              patchOnProperties(IDBIndex.prototype, args, r);
              patchOnProperties(IDBRequest.prototype, args, r);
              patchOnProperties(IDBOpenDBRequest.prototype, args, r);
              patchOnProperties(IDBDatabase.prototype, args, r);
              patchOnProperties(IDBTransaction.prototype, args, r);
              patchOnProperties(IDBCursor.prototype, args, r);
            }
            if (refresh) {
              patchOnProperties(WebSocket.prototype, keys, r);
            }
          } else {
            patchViaCapturingAllTheEvents();
            patchClass("XMLHttpRequest");
            if (refresh) {
              attach(parent, window);
            }
          }
        }
      }
      /**
       * @return {?}
       */
      function canPatchViaPropertyDescriptor() {
        if ((inputWin || winRef) && !Object.getOwnPropertyDescriptor(HTMLElement.prototype, "onclick") && "undefined" != typeof Element) {
          /** @type {(ObjectPropertyDescriptor<Element.prototype>|undefined)} */
          var desc = Object.getOwnPropertyDescriptor(Element.prototype, "onclick");
          if (desc && !desc.configurable) {
            return false;
          }
        }
        /** @type {(ObjectPropertyDescriptor<XMLHttpRequest.prototype>|undefined)} */
        var descriptor = Object.getOwnPropertyDescriptor(XMLHttpRequest.prototype, "onreadystatechange");
        if (descriptor) {
          Object.defineProperty(XMLHttpRequest.prototype, "onreadystatechange", {
            enumerable : true,
            configurable : true,
            get : function() {
              return true;
            }
          });
          /** @type {!XMLHttpRequest} */
          var ref = new XMLHttpRequest;
          /** @type {boolean} */
          var md = !!ref.onreadystatechange;
          return Object.defineProperty(XMLHttpRequest.prototype, "onreadystatechange", descriptor || {}), md;
        }
        var j = $("fakeonreadystatechange");
        Object.defineProperty(XMLHttpRequest.prototype, "onreadystatechange", {
          enumerable : true,
          configurable : true,
          get : function() {
            return this[j];
          },
          set : function(fn) {
            /** @type {!Object} */
            this[j] = fn;
          }
        });
        /** @type {!XMLHttpRequest} */
        ref = new XMLHttpRequest;
        /**
         * @return {undefined}
         */
        var i = function() {
        };
        /** @type {function(): undefined} */
        ref.onreadystatechange = i;
        /** @type {boolean} */
        md = ref[j] === i;
        return ref.onreadystatechange = null, md;
      }
      /**
       * @return {undefined}
       */
      function patchViaCapturingAllTheEvents() {
        /** @type {number} */
        var i = 0;
        for (; i < result.length; i++) {
          !function(i) {
            var type = result[i];
            /** @type {string} */
            var name = "on" + type;
            self.addEventListener(type, function(registrationData) {
              var obj;
              var parent;
              /** @type {(EventTarget|null)} */
              var target = registrationData.target;
              /** @type {string} */
              parent = target ? target.constructor.name + "." + name : "unknown." + name;
              for (; target;) {
                if (target[name] && !target[name][i]) {
                  obj = Zone.current.wrap(target[name], parent);
                  obj[i] = target[name];
                  target[name] = obj;
                }
                target = target.parentElement;
              }
            }, true);
          }(i);
        }
      }
      /**
       * @param {!Object} options
       * @param {?} context
       * @return {?}
       */
      function apply(options, context) {
        /** @type {string} */
        var fields_disabled = "Anchor,Area,Audio,BR,Base,BaseFont,Body,Button,Canvas,Content,DList,Directory,Div,Embed,FieldSet,Font,Form,Frame,FrameSet,HR,Head,Heading,Html,IFrame,Image,Input,Keygen,LI,Label,Legend,Link,Map,Marquee,Media,Menu,Meta,Meter,Mod,OList,Object,OptGroup,Option,Output,Paragraph,Pre,Progress,Quote,Script,Select,Source,Span,Style,TableCaption,TableCell,TableCol,Table,TableRow,TableSection,TextArea,Title,Track,UList,Unknown,Video";
        /** @type {!Array<string>} */
        var type = "ApplicationCache,EventSource,FileReader,InputMethodContext,MediaController,MessagePort,Node,Performance,SVGElementInstance,SharedWorker,TextTrack,TextTrackCue,TextTrackList,WebKitNamedFlow,Window,Worker,WorkerGlobalScope,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload,IDBRequest,IDBOpenDBRequest,IDBDatabase,IDBTransaction,IDBCursor,DBIndex,WebSocket".split(",");
        /** @type {!Array} */
        var result = [];
        var readOnlyFn = options.wtf;
        /** @type {!Array<string>} */
        var oldSelections = fields_disabled.split(",");
        if (readOnlyFn) {
          /** @type {!Array<?>} */
          result = oldSelections.map(function(tag) {
            return "HTML" + tag + "Element";
          }).concat(type);
        } else {
          if (options.EventTarget) {
            result.push("EventTarget");
          } else {
            /** @type {!Array<string>} */
            result = type;
          }
        }
        var support = options.__Zone_disable_IE_check || false;
        var c = options.__Zone_enable_cross_context_check || false;
        var ie = detectIE();
        /** @type {string} */
        var __all__ = "function __BROWSERTOOLS_CONSOLE_SAFEFUNC() { [native code] }";
        /** @type {number} */
        var i = 0;
        for (; i < result.length; i++) {
          var name = result[i];
          /** @type {string} */
          var key = name + val;
          /** @type {string} */
          var url = name + idx;
          /** @type {string} */
          var className = prefix + key;
          /** @type {string} */
          var route = prefix + url;
          memo[name] = {};
          /** @type {string} */
          memo[name][val] = className;
          /** @type {string} */
          memo[name][idx] = route;
        }
        /** @type {number} */
        i = 0;
        for (; i < fields_disabled.length; i++) {
          /** @type {string} */
          var s = oldSelections[i];
          var i18nPaths = db[s] = {};
          /** @type {number} */
          var index = 0;
          for (; index < result.length; index++) {
            name = result[index];
            /** @type {string} */
            i18nPaths[name] = s + ".addEventListener:" + name;
          }
        }
        /**
         * @param {!Function} name
         * @param {string} s
         * @param {!Object} n
         * @param {!Array} args
         * @return {?}
         */
        var select = function(name, s, n, args) {
          if (!support && ie) {
            if (c) {
              try {
                var value = s.toString();
                if ("[object FunctionWrapper]" === value || value == __all__) {
                  return name.apply(n, args), false;
                }
              } catch (e) {
                return name.apply(n, args), false;
              }
            } else {
              value = s.toString();
              if ("[object FunctionWrapper]" === value || value == __all__) {
                return name.apply(n, args), false;
              }
            }
          } else {
            if (c) {
              try {
                s.toString();
              } catch (e) {
                return name.apply(n, args), false;
              }
            }
          }
          return true;
        };
        /** @type {!Array} */
        var last = [];
        /** @type {number} */
        i = 0;
        for (; i < result.length; i++) {
          var func = options[result[i]];
          last.push(func && func.prototype);
        }
        return init(options, last, {
          validateHandler : select
        }), context.patchEventTarget = init, true;
      }
      /**
       * @param {!Element} id
       * @param {?} o
       * @return {undefined}
       */
      function update(id, o) {
        set(id, o);
      }
      /**
       * @param {!Window} _global
       * @return {undefined}
       */
      function registerElementPatch(_global) {
        if ((inputWin || winRef) && "registerElement" in _global.document) {
          /** @type {function(this:Document, string, {extends: (string|undefined), prototype: (Object|null|undefined)}=): function(new:Element, ...*): ?} */
          var _registerElement = document.registerElement;
          /** @type {!Array} */
          var callbacks = ["createdCallback", "attachedCallback", "detachedCallback", "attributeChangedCallback"];
          /**
           * @param {string} name
           * @param {{extends: (string|undefined), prototype: (Object|null|undefined)}=} opts
           * @return {function(new:Element, ...*): ?}
           */
          document.registerElement = function(name, opts) {
            return opts && opts.prototype && callbacks.forEach(function(name) {
              /** @type {string} */
              var key = "Document.registerElement::" + name;
              if (opts.prototype.hasOwnProperty(name)) {
                /** @type {(ObjectPropertyDescriptor<Object>|undefined)} */
                var descriptor = Object.getOwnPropertyDescriptor(opts.prototype, name);
                if (descriptor && descriptor.value) {
                  descriptor.value = Zone.current.wrap(descriptor.value, key);
                  _redefineProperty(opts.prototype, name, descriptor);
                } else {
                  opts.prototype[name] = Zone.current.wrap(opts.prototype[name], key);
                }
              } else {
                if (opts.prototype[name]) {
                  opts.prototype[name] = Zone.current.wrap(opts.prototype[name], key);
                }
              }
            }), _registerElement.apply(document, [name, opts]);
          };
          add(document.registerElement, _registerElement);
        }
      }
      /** @type {function(!Array, number): ?} */
      var isArray = (function(global) {
        /**
         * @param {string} a
         * @return {undefined}
         */
        function mark(a) {
          if (data && data.mark) {
            data.mark(a);
          }
        }
        /**
         * @param {string} obj
         * @param {string} a
         * @return {undefined}
         */
        function update(obj, a) {
          if (data && data.measure) {
            data.measure(obj, a);
          }
        }
        /**
         * @param {!Object} type
         * @return {undefined}
         */
        function push(type) {
          if (0 === e && 0 === g.length) {
            if (!s) {
              if (global[symbolPromise]) {
                s = global[symbolPromise].resolve(0);
              }
            }
            if (s) {
              s[symbolThen](drainMicroTaskQueue);
            } else {
              global[symbolSetTimeout](drainMicroTaskQueue, 0);
            }
          }
          if (type) {
            g.push(type);
          }
        }
        /**
         * @return {undefined}
         */
        function drainMicroTaskQueue() {
          if (!y) {
            /** @type {boolean} */
            y = true;
            for (; g.length;) {
              /** @type {!Array} */
              var mainThreadTasks = g;
              /** @type {!Array} */
              g = [];
              /** @type {number} */
              var taskIndex = 0;
              for (; taskIndex < mainThreadTasks.length; taskIndex++) {
                var task = mainThreadTasks[taskIndex];
                try {
                  task.zone.runTask(task, null, null);
                } catch (x) {
                  idx.onUnhandledError(x);
                }
              }
            }
            Zone[__symbol__("ignoreConsoleErrorUncaughtError")];
            idx.microtaskDrainDone();
            /** @type {boolean} */
            y = false;
          }
        }
        /**
         * @return {undefined}
         */
        function delegate() {
        }
        /**
         * @param {string} name
         * @return {?}
         */
        function __symbol__(name) {
          return "__zone_symbol__" + name;
        }
        var data = global.performance;
        if (mark("Zone"), global.Zone) {
          throw new Error("Zone already loaded.");
        }
        var Zone = function() {
          /**
           * @param {!Object} parent
           * @param {!Object} zoneSpec
           * @return {undefined}
           */
          function self(parent, zoneSpec) {
            /** @type {null} */
            this._properties = null;
            /** @type {!Object} */
            this._parent = parent;
            this._name = zoneSpec ? zoneSpec.name || "unnamed" : "<root>";
            this._properties = zoneSpec && zoneSpec.properties || {};
            this._zoneDelegate = new ZoneDelegate(this, this._parent && this._parent._zoneDelegate, zoneSpec);
          }
          return self.assertZonePatched = function() {
            if (global.Promise !== cache.ZoneAwarePromise) {
              throw new Error("Zone.js has detected that ZoneAwarePromise `(window|global).Promise` has been overwritten.\nMost likely cause is that a Promise polyfill has been loaded after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. If you must load one, do so before loading zone.js.)");
            }
          }, Object.defineProperty(self, "root", {
            get : function() {
              var current = self.current;
              for (; current.parent;) {
                current = current.parent;
              }
              return current;
            },
            enumerable : true,
            configurable : true
          }), Object.defineProperty(self, "current", {
            get : function() {
              return obj.zone;
            },
            enumerable : true,
            configurable : true
          }), Object.defineProperty(self, "currentTask", {
            get : function() {
              return _currentTask;
            },
            enumerable : true,
            configurable : true
          }), self.__load_patch = function(name, f) {
            if (cache.hasOwnProperty(name)) {
              throw Error("Already loaded patch: " + name);
            }
            if (!global["__Zone_disable_" + name]) {
              /** @type {string} */
              var item = "Zone:" + name;
              mark(item);
              cache[name] = f(global, self, idx);
              update(item, item);
            }
          }, Object.defineProperty(self.prototype, "parent", {
            get : function() {
              return this._parent;
            },
            enumerable : true,
            configurable : true
          }), Object.defineProperty(self.prototype, "name", {
            get : function() {
              return this._name;
            },
            enumerable : true,
            configurable : true
          }), self.prototype.get = function(key) {
            var zone = this.getZoneWith(key);
            if (zone) {
              return zone._properties[key];
            }
          }, self.prototype.getZoneWith = function(key) {
            var current = this;
            for (; current;) {
              if (current._properties.hasOwnProperty(key)) {
                return current;
              }
              current = current._parent;
            }
            return null;
          }, self.prototype.fork = function(zoneSpec) {
            if (!zoneSpec) {
              throw new Error("ZoneSpec required!");
            }
            return this._zoneDelegate.fork(this, zoneSpec);
          }, self.prototype.wrap = function(callback, source) {
            if ("function" != typeof callback) {
              throw new Error("Expecting function got: " + callback);
            }
            var _callback = this._zoneDelegate.intercept(this, callback, source);
            var zone = this;
            return function() {
              return zone.runGuarded(_callback, this, arguments, source);
            };
          }, self.prototype.run = function(callback, applyThis, applyArgs, source) {
            if (void 0 === applyThis) {
              applyThis = void 0;
            }
            if (void 0 === applyArgs) {
              /** @type {null} */
              applyArgs = null;
            }
            if (void 0 === source) {
              /** @type {null} */
              source = null;
            }
            obj = {
              parent : obj,
              zone : this
            };
            try {
              return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
            } finally {
              obj = obj.parent;
            }
          }, self.prototype.runGuarded = function(callback, applyThis, applyArgs, source) {
            if (void 0 === applyThis) {
              /** @type {null} */
              applyThis = null;
            }
            if (void 0 === applyArgs) {
              /** @type {null} */
              applyArgs = null;
            }
            if (void 0 === source) {
              /** @type {null} */
              source = null;
            }
            obj = {
              parent : obj,
              zone : this
            };
            try {
              try {
                return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
              } catch (error) {
                if (this._zoneDelegate.handleError(this, error)) {
                  throw error;
                }
              }
            } finally {
              obj = obj.parent;
            }
          }, self.prototype.runTask = function(task, applyThis, applyArgs) {
            if (task.zone != this) {
              throw new Error("A task can only be run in the zone of creation! (Creation: " + (task.zone || received).name + "; Execution: " + this.name + ")");
            }
            if (task.state !== args || task.type !== undefined) {
              /** @type {boolean} */
              var r = task.state != completed;
              if (r) {
                task._transitionTo(completed, f);
              }
              task.runCount++;
              var previousTask = _currentTask;
              /** @type {!Object} */
              _currentTask = task;
              obj = {
                parent : obj,
                zone : this
              };
              try {
                if (task.type == macroTask && task.data && !task.data.isPeriodic) {
                  /** @type {null} */
                  task.cancelFn = null;
                }
                try {
                  return this._zoneDelegate.invokeTask(this, task, applyThis, applyArgs);
                } catch (error) {
                  if (this._zoneDelegate.handleError(this, error)) {
                    throw error;
                  }
                }
              } finally {
                if (task.state !== args && task.state !== type) {
                  if (task.type == undefined || task.data && task.data.isPeriodic) {
                    if (r) {
                      task._transitionTo(f, completed);
                    }
                  } else {
                    /** @type {number} */
                    task.runCount = 0;
                    this._updateTaskCount(task, -1);
                    if (r) {
                      task._transitionTo(args, completed, args);
                    }
                  }
                }
                obj = obj.parent;
                _currentTask = previousTask;
              }
            }
          }, self.prototype.scheduleTask = function(task) {
            if (task.zone && task.zone !== this) {
              var step = this;
              for (; step;) {
                if (step === task.zone) {
                  throw Error("can not reschedule task to " + this.name + " which is descendants of the original zone " + task.zone.name);
                }
                step = step.parent;
              }
            }
            task._transitionTo(done, args);
            /** @type {!Array} */
            var R_RESOLVED = [];
            /** @type {!Array} */
            task._zoneDelegates = R_RESOLVED;
            task._zone = this;
            try {
              task = this._zoneDelegate.scheduleTask(this, task);
            } catch (error) {
              throw task._transitionTo(type, done, args), this._zoneDelegate.handleError(this, error), error;
            }
            return task._zoneDelegates === R_RESOLVED && this._updateTaskCount(task, 1), task.state == done && task._transitionTo(f, done), task;
          }, self.prototype.scheduleMicroTask = function(source, fn, callback, data) {
            return this.scheduleTask(new ZoneTask(eventTask, source, fn, callback, data, null));
          }, self.prototype.scheduleMacroTask = function(data, callback, source, customSchedule, customCancel) {
            return this.scheduleTask(new ZoneTask(macroTask, data, callback, source, customSchedule, customCancel));
          }, self.prototype.scheduleEventTask = function(visitors, source, callback, data, customSchedule) {
            return this.scheduleTask(new ZoneTask(undefined, visitors, source, callback, data, customSchedule));
          }, self.prototype.cancelTask = function(task) {
            if (task.zone != this) {
              throw new Error("A task can only be cancelled in the zone of creation! (Creation: " + (task.zone || received).name + "; Execution: " + this.name + ")");
            }
            task._transitionTo(z, f, completed);
            try {
              this._zoneDelegate.cancelTask(this, task);
            } catch (error) {
              throw task._transitionTo(type, z), this._zoneDelegate.handleError(this, error), error;
            }
            return this._updateTaskCount(task, -1), task._transitionTo(args, z), task.runCount = 0, task;
          }, self.prototype._updateTaskCount = function(type, count) {
            var crossfilterable_layers = type._zoneDelegates;
            if (-1 == count) {
              /** @type {null} */
              type._zoneDelegates = null;
            }
            /** @type {number} */
            var layer_i = 0;
            for (; layer_i < crossfilterable_layers.length; layer_i++) {
              crossfilterable_layers[layer_i]._updateTaskCount(type.type, count);
            }
          }, self;
        }();
        /** @type {function(string): ?} */
        Zone.__symbol__ = __symbol__;
        var s;
        var enc = {
          name : "",
          onHasTask : function(description, type, name, hasTaskState) {
            return description.hasTask(name, hasTaskState);
          },
          onScheduleTask : function(parentZoneDelegate, currentZone, targetZone, task) {
            return parentZoneDelegate.scheduleTask(targetZone, task);
          },
          onInvokeTask : function(parentZoneDelegate, currentZone, targetZone, task, applyThis, applyArgs) {
            return parentZoneDelegate.invokeTask(targetZone, task, applyThis, applyArgs);
          },
          onCancelTask : function(parentZoneDelegate, currentZone, targetZone, task) {
            return parentZoneDelegate.cancelTask(targetZone, task);
          }
        };
        var ZoneDelegate = function() {
          /**
           * @param {?} zone
           * @param {!Object} parentDelegate
           * @param {!Object} zoneSpec
           * @return {undefined}
           */
          function ZoneDelegate(zone, parentDelegate, zoneSpec) {
            this._taskCounts = {
              microTask : 0,
              macroTask : 0,
              eventTask : 0
            };
            this.zone = zone;
            /** @type {!Object} */
            this._parentDelegate = parentDelegate;
            this._forkZS = zoneSpec && (zoneSpec && zoneSpec.onFork ? zoneSpec : parentDelegate._forkZS);
            this._forkDlgt = zoneSpec && (zoneSpec.onFork ? parentDelegate : parentDelegate._forkDlgt);
            this._forkCurrZone = zoneSpec && (zoneSpec.onFork ? this.zone : parentDelegate.zone);
            this._interceptZS = zoneSpec && (zoneSpec.onIntercept ? zoneSpec : parentDelegate._interceptZS);
            this._interceptDlgt = zoneSpec && (zoneSpec.onIntercept ? parentDelegate : parentDelegate._interceptDlgt);
            this._interceptCurrZone = zoneSpec && (zoneSpec.onIntercept ? this.zone : parentDelegate.zone);
            this._invokeZS = zoneSpec && (zoneSpec.onInvoke ? zoneSpec : parentDelegate._invokeZS);
            this._invokeDlgt = zoneSpec && (zoneSpec.onInvoke ? parentDelegate : parentDelegate._invokeDlgt);
            this._invokeCurrZone = zoneSpec && (zoneSpec.onInvoke ? this.zone : parentDelegate.zone);
            this._handleErrorZS = zoneSpec && (zoneSpec.onHandleError ? zoneSpec : parentDelegate._handleErrorZS);
            this._handleErrorDlgt = zoneSpec && (zoneSpec.onHandleError ? parentDelegate : parentDelegate._handleErrorDlgt);
            this._handleErrorCurrZone = zoneSpec && (zoneSpec.onHandleError ? this.zone : parentDelegate.zone);
            this._scheduleTaskZS = zoneSpec && (zoneSpec.onScheduleTask ? zoneSpec : parentDelegate._scheduleTaskZS);
            this._scheduleTaskDlgt = zoneSpec && (zoneSpec.onScheduleTask ? parentDelegate : parentDelegate._scheduleTaskDlgt);
            this._scheduleTaskCurrZone = zoneSpec && (zoneSpec.onScheduleTask ? this.zone : parentDelegate.zone);
            this._invokeTaskZS = zoneSpec && (zoneSpec.onInvokeTask ? zoneSpec : parentDelegate._invokeTaskZS);
            this._invokeTaskDlgt = zoneSpec && (zoneSpec.onInvokeTask ? parentDelegate : parentDelegate._invokeTaskDlgt);
            this._invokeTaskCurrZone = zoneSpec && (zoneSpec.onInvokeTask ? this.zone : parentDelegate.zone);
            this._cancelTaskZS = zoneSpec && (zoneSpec.onCancelTask ? zoneSpec : parentDelegate._cancelTaskZS);
            this._cancelTaskDlgt = zoneSpec && (zoneSpec.onCancelTask ? parentDelegate : parentDelegate._cancelTaskDlgt);
            this._cancelTaskCurrZone = zoneSpec && (zoneSpec.onCancelTask ? this.zone : parentDelegate.zone);
            /** @type {null} */
            this._hasTaskZS = null;
            /** @type {null} */
            this._hasTaskDlgt = null;
            /** @type {null} */
            this._hasTaskDlgtOwner = null;
            /** @type {null} */
            this._hasTaskCurrZone = null;
            var r = zoneSpec && zoneSpec.onHasTask;
            var g = parentDelegate && parentDelegate._hasTaskZS;
            if (r || g) {
              this._hasTaskZS = r ? zoneSpec : enc;
              /** @type {!Object} */
              this._hasTaskDlgt = parentDelegate;
              this._hasTaskDlgtOwner = this;
              this._hasTaskCurrZone = zone;
              if (!zoneSpec.onScheduleTask) {
                this._scheduleTaskZS = enc;
                /** @type {!Object} */
                this._scheduleTaskDlgt = parentDelegate;
                this._scheduleTaskCurrZone = this.zone;
              }
              if (!zoneSpec.onInvokeTask) {
                this._invokeTaskZS = enc;
                /** @type {!Object} */
                this._invokeTaskDlgt = parentDelegate;
                this._invokeTaskCurrZone = this.zone;
              }
              if (!zoneSpec.onCancelTask) {
                this._cancelTaskZS = enc;
                /** @type {!Object} */
                this._cancelTaskDlgt = parentDelegate;
                this._cancelTaskCurrZone = this.zone;
              }
            }
          }
          return ZoneDelegate.prototype.fork = function(name, zoneSpec) {
            return this._forkZS ? this._forkZS.onFork(this._forkDlgt, this.zone, name, zoneSpec) : new Zone(name, zoneSpec);
          }, ZoneDelegate.prototype.intercept = function(targetZone, callback, source) {
            return this._interceptZS ? this._interceptZS.onIntercept(this._interceptDlgt, this._interceptCurrZone, targetZone, callback, source) : callback;
          }, ZoneDelegate.prototype.invoke = function(targetZone, callback, applyThis, applyArgs, source) {
            return this._invokeZS ? this._invokeZS.onInvoke(this._invokeDlgt, this._invokeCurrZone, targetZone, callback, applyThis, applyArgs, source) : callback.apply(applyThis, applyArgs);
          }, ZoneDelegate.prototype.handleError = function(targetZone, error) {
            return !this._handleErrorZS || this._handleErrorZS.onHandleError(this._handleErrorDlgt, this._handleErrorCurrZone, targetZone, error);
          }, ZoneDelegate.prototype.scheduleTask = function(targetZone, task) {
            /** @type {!Object} */
            var value = task;
            if (this._scheduleTaskZS) {
              if (this._hasTaskZS) {
                value._zoneDelegates.push(this._hasTaskDlgtOwner);
              }
              if (!(value = this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt, this._scheduleTaskCurrZone, targetZone, task))) {
                /** @type {!Object} */
                value = task;
              }
            } else {
              if (task.scheduleFn) {
                task.scheduleFn(task);
              } else {
                if (task.type != eventTask) {
                  throw new Error("Task is missing scheduleFn.");
                }
                push(task);
              }
            }
            return value;
          }, ZoneDelegate.prototype.invokeTask = function(targetZone, task, applyThis, applyArgs) {
            return this._invokeTaskZS ? this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt, this._invokeTaskCurrZone, targetZone, task, applyThis, applyArgs) : task.callback.apply(applyThis, applyArgs);
          }, ZoneDelegate.prototype.cancelTask = function(targetZone, task) {
            var value;
            if (this._cancelTaskZS) {
              value = this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt, this._cancelTaskCurrZone, targetZone, task);
            } else {
              if (!task.cancelFn) {
                throw Error("Task is not cancelable");
              }
              value = task.cancelFn(task);
            }
            return value;
          }, ZoneDelegate.prototype.hasTask = function(name, task) {
            try {
              return this._hasTaskZS && this._hasTaskZS.onHasTask(this._hasTaskDlgt, this._hasTaskCurrZone, name, task);
            } catch (error) {
              this.handleError(name, error);
            }
          }, ZoneDelegate.prototype._updateTaskCount = function(type, count) {
            var counts = this._taskCounts;
            var prev = counts[type];
            var o = counts[type] = prev + count;
            if (o < 0) {
              throw new Error("More tasks executed then were scheduled.");
            }
            if (0 == prev || 0 == o) {
              var isEmpty = {
                microTask : counts.microTask > 0,
                macroTask : counts.macroTask > 0,
                eventTask : counts.eventTask > 0,
                change : type
              };
              this.hasTask(this.zone, isEmpty);
            }
          }, ZoneDelegate;
        }();
        var ZoneTask = function() {
          /**
           * @param {string} type
           * @param {string} source
           * @param {!Function} callback
           * @param {string} options
           * @param {?} scheduleFn
           * @param {string} cancelFn
           * @return {undefined}
           */
          function ZoneTask(type, source, callback, options, scheduleFn, cancelFn) {
            /** @type {null} */
            this._zone = null;
            /** @type {number} */
            this.runCount = 0;
            /** @type {null} */
            this._zoneDelegates = null;
            /** @type {string} */
            this._state = "notScheduled";
            /** @type {string} */
            this.type = type;
            /** @type {string} */
            this.source = source;
            /** @type {string} */
            this.data = options;
            this.scheduleFn = scheduleFn;
            /** @type {string} */
            this.cancelFn = cancelFn;
            /** @type {!Function} */
            this.callback = callback;
            var errorEventName = this;
            if (type === undefined && options && options.isUsingGlobalCallback) {
              /** @type {function(!Object, !Object, !Array): ?} */
              this.invoke = ZoneTask.invokeTask;
            } else {
              /**
               * @return {?}
               */
              this.invoke = function() {
                return ZoneTask.invokeTask.apply(global, [errorEventName, this, arguments]);
              };
            }
          }
          return ZoneTask.invokeTask = function(task, callback, applyThis) {
            if (!task) {
              task = this;
            }
            e++;
            try {
              return task.runCount++, task.zone.runTask(task, callback, applyThis);
            } finally {
              if (1 == e) {
                drainMicroTaskQueue();
              }
              e--;
            }
          }, Object.defineProperty(ZoneTask.prototype, "zone", {
            get : function() {
              return this._zone;
            },
            enumerable : true,
            configurable : true
          }), Object.defineProperty(ZoneTask.prototype, "state", {
            get : function() {
              return this._state;
            },
            enumerable : true,
            configurable : true
          }), ZoneTask.prototype.cancelScheduleRequest = function() {
            this._transitionTo(args, done);
          }, ZoneTask.prototype._transitionTo = function(key, name, event) {
            if (this._state !== name && this._state !== event) {
              throw new Error(this.type + " '" + this.source + "': can not transition to '" + key + "', expecting state '" + name + "'" + (event ? " or '" + event + "'" : "") + ", was '" + this._state + "'.");
            }
            /** @type {string} */
            this._state = key;
            if (key == args) {
              /** @type {null} */
              this._zoneDelegates = null;
            }
          }, ZoneTask.prototype.toString = function() {
            return this.data && void 0 !== this.data.handleId ? this.data.handleId : Object.prototype.toString.call(this);
          }, ZoneTask.prototype.toJSON = function() {
            return {
              type : this.type,
              state : this.state,
              source : this.source,
              zone : this.zone.name,
              invoke : this.invoke,
              scheduleFn : this.scheduleFn,
              cancelFn : this.cancelFn,
              runCount : this.runCount,
              callback : this.callback
            };
          }, ZoneTask;
        }();
        var symbolSetTimeout = __symbol__("setTimeout");
        var symbolPromise = __symbol__("Promise");
        var symbolThen = __symbol__("then");
        /** @type {!Array} */
        var g = [];
        /** @type {boolean} */
        var y = false;
        var received = {
          name : "NO ZONE"
        };
        /** @type {string} */
        var args = "notScheduled";
        /** @type {string} */
        var done = "scheduling";
        /** @type {string} */
        var f = "scheduled";
        /** @type {string} */
        var completed = "running";
        /** @type {string} */
        var z = "canceling";
        /** @type {string} */
        var type = "unknown";
        /** @type {string} */
        var eventTask = "microTask";
        /** @type {string} */
        var macroTask = "macroTask";
        /** @type {string} */
        var undefined = "eventTask";
        var cache = {};
        var idx = {
          symbol : __symbol__,
          currentZoneFrame : function() {
            return obj;
          },
          onUnhandledError : delegate,
          microtaskDrainDone : delegate,
          scheduleMicroTask : push,
          showUncaughtError : function() {
            return !Zone[__symbol__("ignoreConsoleErrorUncaughtError")];
          },
          patchEventTarget : function() {
            return [];
          },
          patchOnProperties : delegate,
          patchMethod : function() {
            return delegate;
          },
          setNativePromise : function(expression) {
            s = expression.resolve(0);
          }
        };
        var obj = {
          parent : null,
          zone : new Zone(null, null)
        };
        /** @type {null} */
        var _currentTask = null;
        /** @type {number} */
        var e = 0;
        update("Zone", "Zone");
        global.Zone = Zone;
      }("undefined" != typeof window && window || "undefined" != typeof self && self || env), function(list, partKeys) {
        var value = "function" == typeof Symbol && list[Symbol.iterator];
        if (!value) {
          return list;
        }
        var result;
        var mockConsole;
        var entry = value.call(list);
        /** @type {!Array} */
        var linksArr = [];
        try {
          for (; (void 0 === partKeys || partKeys-- > 0) && !(result = entry.next()).done;) {
            linksArr.push(result.value);
          }
        } catch (Console_error) {
          mockConsole = {
            error : Console_error
          };
        } finally {
          try {
            if (result && !result.done && (value = entry.return)) {
              value.call(entry);
            }
          } finally {
            if (mockConsole) {
              throw mockConsole.error;
            }
          }
        }
        return linksArr;
      });
      /**
       * @param {!Object} value
       * @return {?}
       */
      var next = function(value) {
        var func = "function" == typeof Symbol && value[Symbol.iterator];
        /** @type {number} */
        var pos = 0;
        return func ? func.call(value) : {
          next : function() {
            return value && pos >= value.length && (value = void 0), {
              value : value && value[pos++],
              done : !value
            };
          }
        };
      };
      Zone.__load_patch("ZoneAwarePromise", function(obj, data, options) {
        /**
         * @param {undefined} index
         * @return {undefined}
         */
        function r(index) {
          options.onUnhandledError(index);
          try {
            var value = data[lang];
            if (value && "function" == typeof value) {
              value.apply(this, [index]);
            }
          } catch (t) {
          }
        }
        /**
         * @param {!Object} value
         * @return {?}
         */
        function isThenable(value) {
          return value && value.then;
        }
        /**
         * @param {?} value
         * @return {?}
         */
        function val(value) {
          return value;
        }
        /**
         * @param {!Object} value
         * @return {?}
         */
        function out(value) {
          return promise.reject(value);
        }
        /**
         * @param {!Function} promise
         * @param {boolean} x
         * @return {?}
         */
        function resolve(promise, x) {
          return function(value) {
            try {
              resolvePromise(promise, x, value);
            } catch (value) {
              resolvePromise(promise, false, value);
            }
          };
        }
        /**
         * @param {!Function} promise
         * @param {boolean} key
         * @param {!Object} value
         * @return {?}
         */
        function resolvePromise(promise, key, value) {
          var func = proxy();
          if (promise === value) {
            throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
          }
          if (promise[symbolState] === UNRESOLVED) {
            /** @type {null} */
            var match = null;
            try {
              if (!(typeof value !== T_OBJECT && typeof value !== object)) {
                match = value && value.then;
              }
            } catch (value) {
              return func(function() {
                resolvePromise(promise, false, value);
              })(), promise;
            }
            if (key !== undefined && value instanceof promise && value.hasOwnProperty(symbolState) && value.hasOwnProperty(type) && value[symbolState] !== UNRESOLVED) {
              clearRejectedNoCatch(value);
              resolvePromise(promise, value[symbolState], value[type]);
            } else {
              if (key !== undefined && typeof match === object) {
                try {
                  match.apply(value, [func(resolve(promise, key)), func(resolve(promise, false))]);
                } catch (value) {
                  func(function() {
                    resolvePromise(promise, false, value);
                  })();
                }
              } else {
                /** @type {boolean} */
                promise[symbolState] = key;
                var queue = promise[type];
                /** @type {!Object} */
                promise[type] = value;
                if (key === undefined && value instanceof Error) {
                  value[TYPE] = data.currentTask;
                }
                /** @type {number} */
                var i = 0;
                for (; i < queue.length;) {
                  scheduleResolveOrReject(promise, queue[i++], queue[i++], queue[i++], queue[i++]);
                }
                if (0 == queue.length && key == undefined) {
                  /** @type {number} */
                  promise[symbolState] = REJECTED_NO_CATCH;
                  try {
                    throw new Error("Uncaught (in promise): " + value + (value && value.stack ? "\n" + value.stack : ""));
                  } catch (d) {
                    var error = d;
                    /** @type {!Object} */
                    error.rejection = value;
                    /** @type {!Function} */
                    error.promise = promise;
                    error.zone = data.current;
                    error.task = data.currentTask;
                    _uncaughtPromiseErrors.push(error);
                    options.scheduleMicroTask();
                  }
                }
              }
            }
          }
          return promise;
        }
        /**
         * @param {!Function} promise
         * @return {undefined}
         */
        function clearRejectedNoCatch(promise) {
          if (promise[symbolState] === REJECTED_NO_CATCH) {
            try {
              var n = data[p];
              if (n && typeof n === object) {
                n.apply(this, [{
                  rejection : promise[type],
                  promise : promise
                }]);
              }
            } catch (t) {
            }
            /** @type {boolean} */
            promise[symbolState] = undefined;
            /** @type {number} */
            var i = 0;
            for (; i < _uncaughtPromiseErrors.length; i++) {
              if (promise === _uncaughtPromiseErrors[i].promise) {
                _uncaughtPromiseErrors.splice(i, 1);
              }
            }
          }
        }
        /**
         * @param {!Function} promise
         * @param {string} zone
         * @param {!Function} chainPromise
         * @param {!Function} onFulfilled
         * @param {!Function} onRejected
         * @return {undefined}
         */
        function scheduleResolveOrReject(promise, zone, chainPromise, onFulfilled, onRejected) {
          clearRejectedNoCatch(promise);
          var delegate = promise[symbolState] ? typeof onFulfilled === object ? onFulfilled : val : typeof onRejected === object ? onRejected : out;
          zone.scheduleMicroTask(source, function() {
            try {
              resolvePromise(chainPromise, true, zone.run(delegate, void 0, [promise[type]]));
            } catch (value) {
              resolvePromise(chainPromise, false, value);
            }
          });
        }
        /**
         * @param {!Function} f
         * @return {undefined}
         */
        function update(f) {
          var p = f.prototype;
          var then = p.then;
          p[prop] = then;
          /** @type {(ObjectPropertyDescriptor<?>|undefined)} */
          var obj = Object.getOwnPropertyDescriptor(f.prototype, "then");
          if (obj && false === obj.writable && obj.configurable) {
            Object.defineProperty(f.prototype, "then", {
              writable : true
            });
          }
          /**
           * @param {!Function} onFulfilled
           * @param {!Function} onRejected
           * @return {?}
           */
          f.prototype.then = function(onFulfilled, onRejected) {
            var value = this;
            return (new promise(function(fulfillmentHandler, rejectionHandler) {
              then.call(value, fulfillmentHandler, rejectionHandler);
            })).then(onFulfilled, onRejected);
          };
          /** @type {boolean} */
          f[version] = true;
        }
        var require = options.symbol;
        /** @type {!Array} */
        var _uncaughtPromiseErrors = [];
        var key = require("Promise");
        var prop = require("then");
        /**
         * @param {!Object} e
         * @return {undefined}
         */
        options.onUnhandledError = function(e) {
          if (options.showUncaughtError()) {
            var rejection = e && e.rejection;
            if (rejection) {
              console.error("Unhandled Promise rejection:", rejection instanceof Error ? rejection.message : rejection, "; Zone:", e.zone.name, "; Task:", e.task && e.task.source, "; Value:", rejection, rejection instanceof Error ? rejection.stack : void 0);
            } else {
              console.error(e);
            }
          }
        };
        /**
         * @return {undefined}
         */
        options.microtaskDrainDone = function() {
          for (; _uncaughtPromiseErrors.length;) {
            for (; _uncaughtPromiseErrors.length;) {
              !function() {
                var uncaughtPromiseError = _uncaughtPromiseErrors.shift();
                try {
                  uncaughtPromiseError.zone.runGuarded(function() {
                    throw uncaughtPromiseError;
                  });
                } catch (last) {
                  r(last);
                }
              }();
            }
          }
        };
        var lang = require("unhandledPromiseRejectionHandler");
        var symbolState = require("state");
        var type = require("value");
        /** @type {string} */
        var source = "Promise.then";
        /** @type {null} */
        var UNRESOLVED = null;
        /** @type {boolean} */
        var response = true;
        /** @type {boolean} */
        var undefined = false;
        /** @type {number} */
        var REJECTED_NO_CATCH = 0;
        /**
         * @return {?}
         */
        var proxy = function() {
          /** @type {boolean} */
          var t = false;
          return function(CropAreaRectangle) {
            return function() {
              if (!t) {
                /** @type {boolean} */
                t = true;
                CropAreaRectangle.apply(null, arguments);
              }
            };
          };
        };
        /** @type {string} */
        var ERR_ACCESSORS_NOT_SUPPORTED = "Promise resolved with itself";
        /** @type {string} */
        var T_OBJECT = "object";
        /** @type {string} */
        var object = "function";
        var TYPE = require("currentTask");
        var p = require("rejectionHandledHandler");
        var promise = function() {
          /**
           * @param {?} callback
           * @return {undefined}
           */
          function Promise(callback) {
            var promise = this;
            if (!(promise instanceof Promise)) {
              throw new Error("Must be an instanceof Promise.");
            }
            /** @type {null} */
            promise[symbolState] = UNRESOLVED;
            /** @type {!Array} */
            promise[type] = [];
            try {
              if (callback) {
                callback(resolve(promise, response), resolve(promise, undefined));
              }
            } catch (value) {
              resolvePromise(promise, false, value);
            }
          }
          return Promise.toString = function() {
            return "function ZoneAwarePromise() { [native code] }";
          }, Promise.resolve = function(data) {
            return resolvePromise(new this(null), response, data);
          }, Promise.reject = function(value) {
            return resolvePromise(new this(null), undefined, value);
          }, Promise.race = function(a) {
            /**
             * @param {?} text
             * @return {undefined}
             */
            function onResolve(text) {
              if (promise) {
                promise = resolve(text);
              }
            }
            /**
             * @param {?} e
             * @return {undefined}
             */
            function onReject(e) {
              if (promise) {
                promise = reject(e);
              }
            }
            var resolve;
            var reject;
            var promise = new this(function(i, foo) {
              tmp = isArray([i, foo], 2);
              resolve = tmp[0];
              reject = tmp[1];
              var tmp;
            });
            try {
              var result = next(a);
              var _next = result.next();
              for (; !_next.done; _next = result.next()) {
                var value = _next.value;
                if (!isThenable(value)) {
                  value = this.resolve(value);
                }
                value.then(onResolve, onReject);
              }
            } catch (Console_error) {
              mockConsole = {
                error : Console_error
              };
            } finally {
              try {
                if (_next && !_next.done && (value = result.return)) {
                  value.call(result);
                }
              } finally {
                if (mockConsole) {
                  throw mockConsole.error;
                }
              }
            }
            return promise;
            var mockConsole;
            var value;
          }, Promise.all = function(a) {
            var receiveMapping;
            var statusRejected;
            var r = new this(function(canCreateDiscussions, isSlidingUp) {
              receiveMapping = canCreateDiscussions;
              statusRejected = isSlidingUp;
            });
            /** @type {number} */
            var data = 0;
            /** @type {!Array} */
            var get = [];
            try {
              var result = next(a);
              var _next = result.next();
              for (; !_next.done; _next = result.next()) {
                var value = _next.value;
                if (!isThenable(value)) {
                  value = this.resolve(value);
                }
                value.then(function(key) {
                  return function(i) {
                    get[key] = i;
                    if (!--data) {
                      receiveMapping(get);
                    }
                  };
                }(data), statusRejected);
                data++;
              }
            } catch (Console_error) {
              mockConsole = {
                error : Console_error
              };
            } finally {
              try {
                if (_next && !_next.done && (value = result.return)) {
                  value.call(result);
                }
              } finally {
                if (mockConsole) {
                  throw mockConsole.error;
                }
              }
            }
            return data || receiveMapping(get), r;
            var mockConsole;
            var value;
          }, Promise.prototype.then = function(onFulfilled, onRejected) {
            var chainPromise = new this.constructor(null);
            var zone = data.current;
            return this[symbolState] == UNRESOLVED ? this[type].push(zone, chainPromise, onFulfilled, onRejected) : scheduleResolveOrReject(this, zone, chainPromise, onFulfilled, onRejected), chainPromise;
          }, Promise.prototype.catch = function(onRejected) {
            return this.then(null, onRejected);
          }, Promise;
        }();
        promise.resolve = promise.resolve;
        promise.reject = promise.reject;
        promise.race = promise.race;
        promise.all = promise.all;
        var local = obj[key] = obj.Promise;
        var property = data.__symbol__("ZoneAwarePromise");
        /** @type {(ObjectPropertyDescriptor<?>|undefined)} */
        var desc = Object.getOwnPropertyDescriptor(obj, "Promise");
        if (!(desc && !desc.configurable)) {
          if (desc) {
            delete desc.writable;
          }
          if (desc) {
            delete desc.value;
          }
          if (!desc) {
            desc = {
              configurable : true,
              enumerable : true
            };
          }
          /**
           * @return {?}
           */
          desc.get = function() {
            return obj[property] ? obj[property] : obj[key];
          };
          /**
           * @param {!Object} value
           * @return {undefined}
           */
          desc.set = function(value) {
            if (value === promise) {
              /** @type {!Object} */
              obj[property] = value;
            } else {
              /** @type {!Object} */
              obj[key] = value;
              if (!value.prototype[prop]) {
                update(value);
              }
              options.setNativePromise(value);
            }
          };
          Object.defineProperty(obj, "Promise", desc);
        }
        obj.Promise = promise;
        var version = require("thenPatched");
        if (local) {
          update(local);
          var val = obj.fetch;
          if (typeof val == object) {
            obj.fetch = function(callback) {
              return function() {
                var port = callback.apply(this, arguments);
                if (port instanceof promise) {
                  return port;
                }
                var obj = port.constructor;
                return obj[version] || update(obj), port;
              };
            }(val);
          }
        }
        return Promise[data.__symbol__("uncaughtPromiseErrors")] = _uncaughtPromiseErrors, promise;
      });
      var $ = Zone.__symbol__;
      var d = "object" == typeof window && window || "object" == typeof self && self || env;
      /** @type {string} */
      var string = "function";
      /** @type {string} */
      var message = "undefined";
      /** @type {string} */
      var L = "removeAttribute";
      /** @type {boolean} */
      var isReplayingSong = "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope;
      /** @type {boolean} */
      var hasSongChanged = !("nw" in d) && void 0 !== d.process && "[object process]" === {}.toString.call(d.process);
      /** @type {boolean} */
      var inputWin = !hasSongChanged && !isReplayingSong && !("undefined" == typeof window || !window.HTMLElement);
      /** @type {boolean} */
      var winRef = void 0 !== d.process && "[object process]" === {}.toString.call(d.process) && !isReplayingSong && !("undefined" == typeof window || !window.HTMLElement);
      var res = {};
      /**
       * @param {!Object} e
       * @return {?}
       */
      var _clickHandler = function(e) {
        if (e = e || d.event) {
          var id = res[e.type];
          if (!id) {
            id = res[e.type] = $("ON_PROPERTY" + e.type);
          }
          var tp = this || e.target || d;
          var fn = tp[id];
          var returned = fn && fn.apply(this, arguments);
          return void 0 == returned || returned || e.preventDefault(), returned;
        }
      };
      var parent = $("originalInstance");
      /** @type {boolean} */
      var B = false;
      /** @type {boolean} */
      var 0 = false;
      Zone.__load_patch("toString", function(result, selector, n) {
        /** @type {function(this:!Function): string} */
        var theConverter = selector.__zone_symbol__originalToString = Function.prototype.toString;
        var i = $("OriginalDelegate");
        var j = $("Promise");
        var e = $("Error");
        /**
         * @return {string}
         */
        Function.prototype.toString = function() {
          if ("function" == typeof this) {
            var fn = this[i];
            if (fn) {
              return "function" == typeof fn ? theConverter.apply(this[i], arguments) : Object.prototype.toString.call(fn);
            }
            if (this === Promise) {
              var n = result[j];
              if (n) {
                return theConverter.apply(n, arguments);
              }
            }
            if (this === Error) {
              var n = result[e];
              if (n) {
                return theConverter.apply(n, arguments);
              }
            }
          }
          return theConverter.apply(this, arguments);
        };
        /** @type {function(this:Object): string} */
        var objToString = Object.prototype.toString;
        /**
         * @return {string}
         */
        Object.prototype.toString = function() {
          return this instanceof Promise ? "[object Promise]" : objToString.apply(this, arguments);
        };
      });
      /**
       * @param {?} x
       * @param {!Array} lst
       * @return {?}
       */
      var fn = function(x, lst) {
        var value = "function" == typeof Symbol && x[Symbol.iterator];
        if (!value) {
          return x;
        }
        var result;
        var mockConsole;
        var element = value.call(x);
        /** @type {!Array} */
        var ret = [];
        try {
          for (; (void 0 === lst || lst-- > 0) && !(result = element.next()).done;) {
            ret.push(result.value);
          }
        } catch (Console_error) {
          mockConsole = {
            error : Console_error
          };
        } finally {
          try {
            if (result && !result.done && (value = element.return)) {
              value.call(element);
            }
          } finally {
            if (mockConsole) {
              throw mockConsole.error;
            }
          }
        }
        return ret;
      };
      /**
       * @return {?}
       */
      var flatten = function() {
        /** @type {!Array} */
        var r = [];
        /** @type {number} */
        var i = 0;
        for (; i < arguments.length; i++) {
          /** @type {!Array<?>} */
          r = r.concat(fn(arguments[i]));
        }
        return r;
      };
      /** @type {string} */
      var idx = "true";
      /** @type {string} */
      var val = "false";
      var v = {
        isUsingGlobalCallback : true
      };
      var memo = {};
      var db = {};
      /** @type {string} */
      var prop = "name";
      /** @type {string} */
      var number = "function";
      /** @type {string} */
      var object = "object";
      /** @type {string} */
      var prefix = "__zone_symbol__";
      /** @type {!RegExp} */
      var regEvalVal = /^__zone_symbol__(\w+)(true|false)$/;
      /** @type {string} */
      var $orderCol = "__zone_symbol__propagationStopped";
      var key = $("zoneTask");
      /** @type {function(!Object, string, !Object): !Object} */
      var _defineProperty = Object[$("defineProperty")] = Object.defineProperty;
      /** @type {function(T, string): (ObjectPropertyDescriptor<T>|undefined)} */
      var gOPD = Object[$("getOwnPropertyDescriptor")] = Object.getOwnPropertyDescriptor;
      /** @type {function((Object|null), (Object|null)=): !Object} */
      var _create = Object.create;
      var property = $("unconfigurables");
      /** @type {string} */
      var r = "prototype";
      /** @type {string} */
      var map = "object";
      /** @type {string} */
      var undefined = "undefined";
      /** @type {!Array} */
      var globals = ["abort", "animationcancel", "animationend", "animationiteration", "auxclick", "beforeinput", "blur", "cancel", "canplay", "canplaythrough", "change", "compositionstart", "compositionupdate", "compositionend", "cuechange", "click", "close", "contextmenu", "curechange", "dblclick", "drag", "dragend", "dragenter", "dragexit", "dragleave", "dragover", "drop", "durationchange", "emptied", "ended", "error", "focus", "focusin", "focusout", "gotpointercapture", "input", "invalid", "keydown", 
      "keypress", "keyup", "load", "loadstart", "loadeddata", "loadedmetadata", "lostpointercapture", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseout", "mouseover", "mouseup", "mousewheel", "orientationchange", "pause", "play", "playing", "pointercancel", "pointerdown", "pointerenter", "pointerleave", "pointerlockchange", "mozpointerlockchange", "webkitpointerlockerchange", "pointerlockerror", "mozpointerlockerror", "webkitpointerlockerror", "pointermove", "pointout", "pointerover", 
      "pointerup", "progress", "ratechange", "reset", "resize", "scroll", "seeked", "seeking", "select", "selectionchange", "selectstart", "show", "sort", "stalled", "submit", "suspend", "timeupdate", "volumechange", "touchcancel", "touchmove", "touchstart", "touchend", "transitioncancel", "transitionend", "waiting", "wheel"];
      /** @type {!Array} */
      var global = ["afterscriptexecute", "beforescriptexecute", "DOMContentLoaded", "fullscreenchange", "mozfullscreenchange", "webkitfullscreenchange", "msfullscreenchange", "fullscreenerror", "mozfullscreenerror", "webkitfullscreenerror", "msfullscreenerror", "readystatechange", "visibilitychange"];
      /** @type {!Array} */
      var password = ["absolutedeviceorientation", "afterinput", "afterprint", "appinstalled", "beforeinstallprompt", "beforeprint", "beforeunload", "devicelight", "devicemotion", "deviceorientation", "deviceorientationabsolute", "deviceproximity", "hashchange", "languagechange", "message", "mozbeforepaint", "offline", "online", "paint", "pageshow", "pagehide", "popstate", "rejectionhandled", "storage", "unhandledrejection", "unload", "userproximity", "vrdisplyconnected", "vrdisplaydisconnected", 
      "vrdisplaypresentchange"];
      /** @type {!Array} */
      var events = ["beforecopy", "beforecut", "beforepaste", "copy", "cut", "paste", "dragstart", "loadend", "animationstart", "search", "transitionrun", "transitionstart", "webkitanimationend", "webkitanimationiteration", "webkitanimationstart", "webkittransitionend"];
      /** @type {!Array} */
      var eventNames = ["encrypted", "waitingforkey", "msneedkey", "mozinterruptbegin", "mozinterruptend"];
      /** @type {!Array} */
      var _eventNames = ["activate", "afterupdate", "ariarequest", "beforeactivate", "beforedeactivate", "beforeeditfocus", "beforeupdate", "cellchange", "controlselect", "dataavailable", "datasetchanged", "datasetcomplete", "errorupdate", "filterchange", "layoutcomplete", "losecapture", "move", "moveend", "movestart", "propertychange", "resizeend", "resizestart", "rowenter", "rowexit", "rowsdelete", "rowsinserted", "command", "compassneedscalibration", "deactivate", "help", "mscontentzoom", "msmanipulationstatechanged", 
      "msgesturechange", "msgesturedoubletap", "msgestureend", "msgesturehold", "msgesturestart", "msgesturetap", "msgotpointercapture", "msinertiastart", "mslostpointercapture", "mspointercancel", "mspointerdown", "mspointerenter", "mspointerhover", "mspointerleave", "mspointermove", "mspointerout", "mspointerover", "mspointerup", "pointerout", "mssitemodejumplistitemremoved", "msthumbnailclick", "stop", "storagecommit"];
      /** @type {!Array} */
      var n = ["webglcontextrestored", "webglcontextlost", "webglcontextcreationerror"];
      /** @type {!Array} */
      var path = ["autocomplete", "autocompleteerror"];
      /** @type {!Array} */
      var actual = ["toggle"];
      /** @type {!Array} */
      var loadEvents = ["load"];
      /** @type {!Array} */
      var type = ["blur", "error", "focus", "load", "resize", "scroll", "messageerror"];
      /** @type {!Array} */
      var actions = ["bounce", "finish", "start"];
      /** @type {!Array} */
      var dispatches = ["loadstart", "progress", "abort", "error", "load", "progress", "timeout", "loadend", "readystatechange"];
      /** @type {!Array} */
      var args = ["upgradeneeded", "complete", "abort", "success", "error", "blocked", "versionchange", "close"];
      /** @type {!Array} */
      var keys = ["close", "error", "open", "message"];
      /** @type {!Array} */
      var methods = ["error", "message"];
      /** @type {!Array<?>} */
      var result = globals.concat(n, path, actual, global, password, events, _eventNames);
      var i = $("unbound");
      Zone.__load_patch("util", function(canCreateDiscussions, isSlidingUp, exports) {
        /** @type {function(!Object, !Array, !Object): undefined} */
        exports.patchOnProperties = exec;
        /** @type {function(string, string, !Function): ?} */
        exports.patchMethod = patchMethod;
      });
      Zone.__load_patch("timers", function(timers, canCreateDiscussions, n) {
        patchTimer(timers, "set", "clear", "Timeout");
        patchTimer(timers, "set", "clear", "Interval");
        patchTimer(timers, "set", "clear", "Immediate");
      });
      Zone.__load_patch("requestAnimationFrame", function(timers, canCreateDiscussions, n) {
        patchTimer(timers, "request", "cancel", "AnimationFrame");
        patchTimer(timers, "mozRequest", "mozCancel", "AnimationFrame");
        patchTimer(timers, "webkitRequest", "webkitCancel", "AnimationFrame");
      });
      Zone.__load_patch("blocking", function(_global, Popup, n) {
        /** @type {!Array} */
        var blockingMethods = ["alert", "prompt", "confirm"];
        /** @type {number} */
        var i = 0;
        for (; i < blockingMethods.length; i++) {
          patchMethod(_global, blockingMethods[i], function(n, canCreateDiscussions, name) {
            return function(canCreateDiscussions, args) {
              return Popup.current.run(n, _global, args, name);
            };
          });
        }
      });
      Zone.__load_patch("EventTarget", function(input, canCreateDiscussions, instance) {
        update(input, instance);
        apply(input, instance);
        var c = input.XMLHttpRequestEventTarget;
        if (c && c.prototype) {
          instance.patchEventTarget(input, [c.prototype]);
        }
        patchClass("MutationObserver");
        patchClass("WebKitMutationObserver");
        patchClass("IntersectionObserver");
        patchClass("FileReader");
      });
      Zone.__load_patch("on_property", function(_global, canCreateDiscussions, vnew) {
        patch(vnew, _global);
        propertyPatch();
        registerElementPatch(_global);
      });
      Zone.__load_patch("canvas", function(view, canCreateDiscussions, n) {
        var HTMLCanvasElement = view.HTMLCanvasElement;
        if (void 0 !== HTMLCanvasElement && HTMLCanvasElement.prototype && HTMLCanvasElement.prototype.toBlob) {
          patchXHR(HTMLCanvasElement.prototype, "toBlob", function(slicedTarget, argstring) {
            return {
              name : "HTMLCanvasElement.toBlob",
              target : slicedTarget,
              callbackIndex : 0,
              args : argstring
            };
          });
        }
      });
      Zone.__load_patch("XHR", function(currentProximityZone, context, n) {
        !function(window) {
          /**
           * @param {?} id
           * @return {?}
           */
          function newTask(id) {
            return id[key];
          }
          /**
           * @param {!Object} value
           * @return {?}
           */
          function scheduleTask(value) {
            /** @type {boolean} */
            XMLHttpRequest[name] = false;
            var d = value.data;
            var data = d.target;
            var y = data[i];
            if (!t) {
              t = data[name];
              d = data[i];
            }
            if (y) {
              d.apply(data, [expr, y]);
            }
            /** @type {function(): undefined} */
            var a = data[i] = function() {
              if (data.readyState === data.DONE && !d.aborted && XMLHttpRequest[name] && value.state === STATE_REJECTED) {
                value.invoke();
              }
            };
            return t.apply(data, [expr, a]), data[key] || (data[key] = value), callback.apply(data, d.args), XMLHttpRequest[name] = true, value;
          }
          /**
           * @return {undefined}
           */
          function placeholderCallback() {
          }
          /**
           * @param {!Object} task
           * @return {?}
           */
          function clearTask(task) {
            var data = task.data;
            return data.aborted = true, abortNative.apply(data.target, data.args);
          }
          var name = $("addEventListener");
          var i = $("removeEventListener");
          var t = XMLHttpRequest.prototype[name];
          var d = XMLHttpRequest.prototype[i];
          if (!t) {
            var g = window.XMLHttpRequestEventTarget;
            if (g) {
              t = g.prototype[name];
              d = g.prototype[i];
            }
          }
          /** @type {string} */
          var expr = "readystatechange";
          /** @type {string} */
          var STATE_REJECTED = "scheduled";
          var openNative = patchMethod(window.XMLHttpRequest.prototype, "open", function() {
            return function(self, args) {
              return self[alias] = 0 == args[2], self[type] = args[1], openNative.apply(self, args);
            };
          });
          var callback = patchMethod(window.XMLHttpRequest.prototype, "send", function() {
            return function(elem, args) {
              var zone = context.current;
              if (elem[alias]) {
                return callback.apply(elem, args);
              }
              var options = {
                target : elem,
                url : elem[type],
                isPeriodic : false,
                delay : null,
                args : args,
                aborted : false
              };
              return zone.scheduleMacroTask("XMLHttpRequest.send", placeholderCallback, options, scheduleTask, clearTask);
            };
          });
          var abortNative = patchMethod(window.XMLHttpRequest.prototype, "abort", function(canCreateDiscussions) {
            return function(parentEffectId, canCreateDiscussions) {
              var task = newTask(parentEffectId);
              if (task && "string" == typeof task.type) {
                if (null == task.cancelFn || task.data && task.data.aborted) {
                  return;
                }
                task.zone.cancelTask(task);
              }
            };
          });
        }(currentProximityZone);
        var key = $("xhrTask");
        var alias = $("xhrSync");
        var i = $("xhrListener");
        var name = $("xhrScheduled");
        var type = $("xhrURL");
      });
      Zone.__load_patch("geolocation", function(global, n, canCreateDiscussions) {
        if (global.navigator && global.navigator.geolocation) {
          patchPrototype(global.navigator.geolocation, ["getCurrentPosition", "watchPosition"]);
        }
      });
      Zone.__load_patch("PromiseRejectionEvent", function(global, result, n) {
        /**
         * @param {string} type
         * @return {?}
         */
        function render(type) {
          return function(result) {
            f(global, type).forEach(function(Q) {
              var Promise = global.PromiseRejectionEvent;
              if (Promise) {
                var task = new Promise(type, {
                  promise : result.promise,
                  reason : result.rejection
                });
                Q.invoke(task);
              }
            });
          };
        }
        if (global.PromiseRejectionEvent) {
          result[$("unhandledPromiseRejectionHandler")] = render("unhandledrejection");
          result[$("rejectionHandledHandler")] = render("rejectionhandled");
        }
      });
    });
  });
  !function() {
    if ("function" != typeof Element.prototype.matches) {
      /** @type {function(this:Element, string): boolean} */
      Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector || function(selector) {
        /** @type {!Element} */
        var elem = this;
        /** @type {!NodeList<Element>} */
        var m = (elem.document || elem.ownerDocument).querySelectorAll(selector);
        /** @type {number} */
        var i = 0;
        for (; m[i] && m[i] !== elem;) {
          ++i;
        }
        return Boolean(m[i]);
      };
    }
    if ("function" != typeof Element.prototype.closest) {
      /**
       * @param {string} selector
       * @return {(Element|null)}
       */
      Element.prototype.closest = function(selector) {
        /** @type {!Element} */
        var parent = this;
        for (; parent && 1 === parent.nodeType;) {
          if (parent.matches(selector)) {
            return parent;
          }
          /** @type {(Node|null)} */
          parent = parent.parentNode;
        }
        return null;
      };
    }
    /** @type {!Window} */
    var win = window;
    if (!win.requestAnimationFrame) {
      win.requestAnimationFrame = win.webkitRequestAnimationFrame;
      win.cancelAnimationFrame = win.webkitCancelAnimationFrame || win.webkitCancelRequestAnimationFrame;
      if (!win.requestAnimationFrame) {
        /**
         * @param {?} callback
         * @param {?} scope
         * @return {?}
         */
        win.requestAnimationFrame = function(callback, scope) {
          /** @type {number} */
          var currTime = (new Date).getTime();
          /** @type {number} */
          var timeToCall = Math.max(0, 16 - (currTime - lastTime));
          var id = win.setTimeout(function() {
            callback(currTime + timeToCall);
          }, timeToCall);
          return lastTime = currTime + timeToCall, id;
        };
      }
      if (!win.cancelAnimationFrame) {
        /**
         * @param {?} id
         * @return {undefined}
         */
        win.cancelAnimationFrame = function(id) {
          clearTimeout(id);
        };
      }
    }
  }();
  options2.__moduleExports = image;
}(this.MyBundle = this.MyBundle || {});
