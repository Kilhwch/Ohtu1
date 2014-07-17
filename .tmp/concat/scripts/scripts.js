// This code was written by Tyler Akins and has been placed in the
// public domain.  It would be nice if you left this header intact.
// Base64 code from Tyler Akins -- http://rumkin.com
var Base64 = function () {
    var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    var obj = {
        encode: function (input) {
          var output = '';
          var chr1, chr2, chr3;
          var enc1, enc2, enc3, enc4;
          var i = 0;
          do {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = (chr1 & 3) << 4 | chr2 >> 4;
            enc3 = (chr2 & 15) << 2 | chr3 >> 6;
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
              enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
              enc4 = 64;
            }
            output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
          } while (i < input.length);
          return output;
        },
        decode: function (input) {
          var output = '';
          var chr1, chr2, chr3;
          var enc1, enc2, enc3, enc4;
          var i = 0;
          // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
          input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
          do {
            enc1 = keyStr.indexOf(input.charAt(i++));
            enc2 = keyStr.indexOf(input.charAt(i++));
            enc3 = keyStr.indexOf(input.charAt(i++));
            enc4 = keyStr.indexOf(input.charAt(i++));
            chr1 = enc1 << 2 | enc2 >> 4;
            chr2 = (enc2 & 15) << 4 | enc3 >> 2;
            chr3 = (enc3 & 3) << 6 | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
              output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
              output = output + String.fromCharCode(chr3);
            }
          } while (i < input.length);
          return output;
        }
      };
    return obj;
  }();
if (typeof exports !== 'undefined') {
  // Github = exports;
  module.exports = Base64;
} else {
  window.Base64 = Base64;
}
//     Underscore.js 1.6.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function () {
  var n = this, t = n._, r = {}, e = Array.prototype, u = Object.prototype, i = Function.prototype, a = e.push, o = e.slice, c = e.concat, l = u.toString, f = u.hasOwnProperty, s = e.forEach, p = e.map, h = e.reduce, v = e.reduceRight, g = e.filter, d = e.every, m = e.some, y = e.indexOf, b = e.lastIndexOf, x = Array.isArray, w = Object.keys, _ = i.bind, j = function (n) {
      return n instanceof j ? n : this instanceof j ? void (this._wrapped = n) : new j(n);
    };
  'undefined' != typeof exports ? ('undefined' != typeof module && module.exports && (exports = module.exports = j), exports._ = j) : n._ = j, j.VERSION = '1.6.0';
  var A = j.each = j.forEach = function (n, t, e) {
      if (null == n)
        return n;
      if (s && n.forEach === s)
        n.forEach(t, e);
      else if (n.length === +n.length) {
        for (var u = 0, i = n.length; i > u; u++)
          if (t.call(e, n[u], u, n) === r)
            return;
      } else
        for (var a = j.keys(n), u = 0, i = a.length; i > u; u++)
          if (t.call(e, n[a[u]], a[u], n) === r)
            return;
      return n;
    };
  j.map = j.collect = function (n, t, r) {
    var e = [];
    return null == n ? e : p && n.map === p ? n.map(t, r) : (A(n, function (n, u, i) {
      e.push(t.call(r, n, u, i));
    }), e);
  };
  var O = 'Reduce of empty array with no initial value';
  j.reduce = j.foldl = j.inject = function (n, t, r, e) {
    var u = arguments.length > 2;
    if (null == n && (n = []), h && n.reduce === h)
      return e && (t = j.bind(t, e)), u ? n.reduce(t, r) : n.reduce(t);
    if (A(n, function (n, i, a) {
        u ? r = t.call(e, r, n, i, a) : (r = n, u = !0);
      }), !u)
      throw new TypeError(O);
    return r;
  }, j.reduceRight = j.foldr = function (n, t, r, e) {
    var u = arguments.length > 2;
    if (null == n && (n = []), v && n.reduceRight === v)
      return e && (t = j.bind(t, e)), u ? n.reduceRight(t, r) : n.reduceRight(t);
    var i = n.length;
    if (i !== +i) {
      var a = j.keys(n);
      i = a.length;
    }
    if (A(n, function (o, c, l) {
        c = a ? a[--i] : --i, u ? r = t.call(e, r, n[c], c, l) : (r = n[c], u = !0);
      }), !u)
      throw new TypeError(O);
    return r;
  }, j.find = j.detect = function (n, t, r) {
    var e;
    return k(n, function (n, u, i) {
      return t.call(r, n, u, i) ? (e = n, !0) : void 0;
    }), e;
  }, j.filter = j.select = function (n, t, r) {
    var e = [];
    return null == n ? e : g && n.filter === g ? n.filter(t, r) : (A(n, function (n, u, i) {
      t.call(r, n, u, i) && e.push(n);
    }), e);
  }, j.reject = function (n, t, r) {
    return j.filter(n, function (n, e, u) {
      return !t.call(r, n, e, u);
    }, r);
  }, j.every = j.all = function (n, t, e) {
    t || (t = j.identity);
    var u = !0;
    return null == n ? u : d && n.every === d ? n.every(t, e) : (A(n, function (n, i, a) {
      return (u = u && t.call(e, n, i, a)) ? void 0 : r;
    }), !!u);
  };
  var k = j.some = j.any = function (n, t, e) {
      t || (t = j.identity);
      var u = !1;
      return null == n ? u : m && n.some === m ? n.some(t, e) : (A(n, function (n, i, a) {
        return u || (u = t.call(e, n, i, a)) ? r : void 0;
      }), !!u);
    };
  j.contains = j.include = function (n, t) {
    return null == n ? !1 : y && n.indexOf === y ? n.indexOf(t) != -1 : k(n, function (n) {
      return n === t;
    });
  }, j.invoke = function (n, t) {
    var r = o.call(arguments, 2), e = j.isFunction(t);
    return j.map(n, function (n) {
      return (e ? t : n[t]).apply(n, r);
    });
  }, j.pluck = function (n, t) {
    return j.map(n, j.property(t));
  }, j.where = function (n, t) {
    return j.filter(n, j.matches(t));
  }, j.findWhere = function (n, t) {
    return j.find(n, j.matches(t));
  }, j.max = function (n, t, r) {
    if (!t && j.isArray(n) && n[0] === +n[0] && n.length < 65535)
      return Math.max.apply(Math, n);
    var e = -1 / 0, u = -1 / 0;
    return A(n, function (n, i, a) {
      var o = t ? t.call(r, n, i, a) : n;
      o > u && (e = n, u = o);
    }), e;
  }, j.min = function (n, t, r) {
    if (!t && j.isArray(n) && n[0] === +n[0] && n.length < 65535)
      return Math.min.apply(Math, n);
    var e = 1 / 0, u = 1 / 0;
    return A(n, function (n, i, a) {
      var o = t ? t.call(r, n, i, a) : n;
      u > o && (e = n, u = o);
    }), e;
  }, j.shuffle = function (n) {
    var t, r = 0, e = [];
    return A(n, function (n) {
      t = j.random(r++), e[r - 1] = e[t], e[t] = n;
    }), e;
  }, j.sample = function (n, t, r) {
    return null == t || r ? (n.length !== +n.length && (n = j.values(n)), n[j.random(n.length - 1)]) : j.shuffle(n).slice(0, Math.max(0, t));
  };
  var E = function (n) {
    return null == n ? j.identity : j.isFunction(n) ? n : j.property(n);
  };
  j.sortBy = function (n, t, r) {
    return t = E(t), j.pluck(j.map(n, function (n, e, u) {
      return {
        value: n,
        index: e,
        criteria: t.call(r, n, e, u)
      };
    }).sort(function (n, t) {
      var r = n.criteria, e = t.criteria;
      if (r !== e) {
        if (r > e || r === void 0)
          return 1;
        if (e > r || e === void 0)
          return -1;
      }
      return n.index - t.index;
    }), 'value');
  };
  var F = function (n) {
    return function (t, r, e) {
      var u = {};
      return r = E(r), A(t, function (i, a) {
        var o = r.call(e, i, a, t);
        n(u, o, i);
      }), u;
    };
  };
  j.groupBy = F(function (n, t, r) {
    j.has(n, t) ? n[t].push(r) : n[t] = [r];
  }), j.indexBy = F(function (n, t, r) {
    n[t] = r;
  }), j.countBy = F(function (n, t) {
    j.has(n, t) ? n[t]++ : n[t] = 1;
  }), j.sortedIndex = function (n, t, r, e) {
    r = E(r);
    for (var u = r.call(e, t), i = 0, a = n.length; a > i;) {
      var o = i + a >>> 1;
      r.call(e, n[o]) < u ? i = o + 1 : a = o;
    }
    return i;
  }, j.toArray = function (n) {
    return n ? j.isArray(n) ? o.call(n) : n.length === +n.length ? j.map(n, j.identity) : j.values(n) : [];
  }, j.size = function (n) {
    return null == n ? 0 : n.length === +n.length ? n.length : j.keys(n).length;
  }, j.first = j.head = j.take = function (n, t, r) {
    return null == n ? void 0 : null == t || r ? n[0] : 0 > t ? [] : o.call(n, 0, t);
  }, j.initial = function (n, t, r) {
    return o.call(n, 0, n.length - (null == t || r ? 1 : t));
  }, j.last = function (n, t, r) {
    return null == n ? void 0 : null == t || r ? n[n.length - 1] : o.call(n, Math.max(n.length - t, 0));
  }, j.rest = j.tail = j.drop = function (n, t, r) {
    return o.call(n, null == t || r ? 1 : t);
  }, j.compact = function (n) {
    return j.filter(n, j.identity);
  };
  var M = function (n, t, r) {
    return t && j.every(n, j.isArray) ? c.apply(r, n) : (A(n, function (n) {
      j.isArray(n) || j.isArguments(n) ? t ? a.apply(r, n) : M(n, t, r) : r.push(n);
    }), r);
  };
  j.flatten = function (n, t) {
    return M(n, t, []);
  }, j.without = function (n) {
    return j.difference(n, o.call(arguments, 1));
  }, j.partition = function (n, t) {
    var r = [], e = [];
    return A(n, function (n) {
      (t(n) ? r : e).push(n);
    }), [
      r,
      e
    ];
  }, j.uniq = j.unique = function (n, t, r, e) {
    j.isFunction(t) && (e = r, r = t, t = !1);
    var u = r ? j.map(n, r, e) : n, i = [], a = [];
    return A(u, function (r, e) {
      (t ? e && a[a.length - 1] === r : j.contains(a, r)) || (a.push(r), i.push(n[e]));
    }), i;
  }, j.union = function () {
    return j.uniq(j.flatten(arguments, !0));
  }, j.intersection = function (n) {
    var t = o.call(arguments, 1);
    return j.filter(j.uniq(n), function (n) {
      return j.every(t, function (t) {
        return j.contains(t, n);
      });
    });
  }, j.difference = function (n) {
    var t = c.apply(e, o.call(arguments, 1));
    return j.filter(n, function (n) {
      return !j.contains(t, n);
    });
  }, j.zip = function () {
    for (var n = j.max(j.pluck(arguments, 'length').concat(0)), t = new Array(n), r = 0; n > r; r++)
      t[r] = j.pluck(arguments, '' + r);
    return t;
  }, j.object = function (n, t) {
    if (null == n)
      return {};
    for (var r = {}, e = 0, u = n.length; u > e; e++)
      t ? r[n[e]] = t[e] : r[n[e][0]] = n[e][1];
    return r;
  }, j.indexOf = function (n, t, r) {
    if (null == n)
      return -1;
    var e = 0, u = n.length;
    if (r) {
      if ('number' != typeof r)
        return e = j.sortedIndex(n, t), n[e] === t ? e : -1;
      e = 0 > r ? Math.max(0, u + r) : r;
    }
    if (y && n.indexOf === y)
      return n.indexOf(t, r);
    for (; u > e; e++)
      if (n[e] === t)
        return e;
    return -1;
  }, j.lastIndexOf = function (n, t, r) {
    if (null == n)
      return -1;
    var e = null != r;
    if (b && n.lastIndexOf === b)
      return e ? n.lastIndexOf(t, r) : n.lastIndexOf(t);
    for (var u = e ? r : n.length; u--;)
      if (n[u] === t)
        return u;
    return -1;
  }, j.range = function (n, t, r) {
    arguments.length <= 1 && (t = n || 0, n = 0), r = arguments[2] || 1;
    for (var e = Math.max(Math.ceil((t - n) / r), 0), u = 0, i = new Array(e); e > u;)
      i[u++] = n, n += r;
    return i;
  };
  var R = function () {
  };
  j.bind = function (n, t) {
    var r, e;
    if (_ && n.bind === _)
      return _.apply(n, o.call(arguments, 1));
    if (!j.isFunction(n))
      throw new TypeError();
    return r = o.call(arguments, 2), e = function () {
      if (!(this instanceof e))
        return n.apply(t, r.concat(o.call(arguments)));
      R.prototype = n.prototype;
      var u = new R();
      R.prototype = null;
      var i = n.apply(u, r.concat(o.call(arguments)));
      return Object(i) === i ? i : u;
    };
  }, j.partial = function (n) {
    var t = o.call(arguments, 1);
    return function () {
      for (var r = 0, e = t.slice(), u = 0, i = e.length; i > u; u++)
        e[u] === j && (e[u] = arguments[r++]);
      for (; r < arguments.length;)
        e.push(arguments[r++]);
      return n.apply(this, e);
    };
  }, j.bindAll = function (n) {
    var t = o.call(arguments, 1);
    if (0 === t.length)
      throw new Error('bindAll must be passed function names');
    return A(t, function (t) {
      n[t] = j.bind(n[t], n);
    }), n;
  }, j.memoize = function (n, t) {
    var r = {};
    return t || (t = j.identity), function () {
      var e = t.apply(this, arguments);
      return j.has(r, e) ? r[e] : r[e] = n.apply(this, arguments);
    };
  }, j.delay = function (n, t) {
    var r = o.call(arguments, 2);
    return setTimeout(function () {
      return n.apply(null, r);
    }, t);
  }, j.defer = function (n) {
    return j.delay.apply(j, [
      n,
      1
    ].concat(o.call(arguments, 1)));
  }, j.throttle = function (n, t, r) {
    var e, u, i, a = null, o = 0;
    r || (r = {});
    var c = function () {
      o = r.leading === !1 ? 0 : j.now(), a = null, i = n.apply(e, u), e = u = null;
    };
    return function () {
      var l = j.now();
      o || r.leading !== !1 || (o = l);
      var f = t - (l - o);
      return e = this, u = arguments, 0 >= f ? (clearTimeout(a), a = null, o = l, i = n.apply(e, u), e = u = null) : a || r.trailing === !1 || (a = setTimeout(c, f)), i;
    };
  }, j.debounce = function (n, t, r) {
    var e, u, i, a, o, c = function () {
        var l = j.now() - a;
        t > l ? e = setTimeout(c, t - l) : (e = null, r || (o = n.apply(i, u), i = u = null));
      };
    return function () {
      i = this, u = arguments, a = j.now();
      var l = r && !e;
      return e || (e = setTimeout(c, t)), l && (o = n.apply(i, u), i = u = null), o;
    };
  }, j.once = function (n) {
    var t, r = !1;
    return function () {
      return r ? t : (r = !0, t = n.apply(this, arguments), n = null, t);
    };
  }, j.wrap = function (n, t) {
    return j.partial(t, n);
  }, j.compose = function () {
    var n = arguments;
    return function () {
      for (var t = arguments, r = n.length - 1; r >= 0; r--)
        t = [n[r].apply(this, t)];
      return t[0];
    };
  }, j.after = function (n, t) {
    return function () {
      return --n < 1 ? t.apply(this, arguments) : void 0;
    };
  }, j.keys = function (n) {
    if (!j.isObject(n))
      return [];
    if (w)
      return w(n);
    var t = [];
    for (var r in n)
      j.has(n, r) && t.push(r);
    return t;
  }, j.values = function (n) {
    for (var t = j.keys(n), r = t.length, e = new Array(r), u = 0; r > u; u++)
      e[u] = n[t[u]];
    return e;
  }, j.pairs = function (n) {
    for (var t = j.keys(n), r = t.length, e = new Array(r), u = 0; r > u; u++)
      e[u] = [
        t[u],
        n[t[u]]
      ];
    return e;
  }, j.invert = function (n) {
    for (var t = {}, r = j.keys(n), e = 0, u = r.length; u > e; e++)
      t[n[r[e]]] = r[e];
    return t;
  }, j.functions = j.methods = function (n) {
    var t = [];
    for (var r in n)
      j.isFunction(n[r]) && t.push(r);
    return t.sort();
  }, j.extend = function (n) {
    return A(o.call(arguments, 1), function (t) {
      if (t)
        for (var r in t)
          n[r] = t[r];
    }), n;
  }, j.pick = function (n) {
    var t = {}, r = c.apply(e, o.call(arguments, 1));
    return A(r, function (r) {
      r in n && (t[r] = n[r]);
    }), t;
  }, j.omit = function (n) {
    var t = {}, r = c.apply(e, o.call(arguments, 1));
    for (var u in n)
      j.contains(r, u) || (t[u] = n[u]);
    return t;
  }, j.defaults = function (n) {
    return A(o.call(arguments, 1), function (t) {
      if (t)
        for (var r in t)
          n[r] === void 0 && (n[r] = t[r]);
    }), n;
  }, j.clone = function (n) {
    return j.isObject(n) ? j.isArray(n) ? n.slice() : j.extend({}, n) : n;
  }, j.tap = function (n, t) {
    return t(n), n;
  };
  var S = function (n, t, r, e) {
    if (n === t)
      return 0 !== n || 1 / n == 1 / t;
    if (null == n || null == t)
      return n === t;
    n instanceof j && (n = n._wrapped), t instanceof j && (t = t._wrapped);
    var u = l.call(n);
    if (u != l.call(t))
      return !1;
    switch (u) {
    case '[object String]':
      return n == String(t);
    case '[object Number]':
      return n != +n ? t != +t : 0 == n ? 1 / n == 1 / t : n == +t;
    case '[object Date]':
    case '[object Boolean]':
      return +n == +t;
    case '[object RegExp]':
      return n.source == t.source && n.global == t.global && n.multiline == t.multiline && n.ignoreCase == t.ignoreCase;
    }
    if ('object' != typeof n || 'object' != typeof t)
      return !1;
    for (var i = r.length; i--;)
      if (r[i] == n)
        return e[i] == t;
    var a = n.constructor, o = t.constructor;
    if (a !== o && !(j.isFunction(a) && a instanceof a && j.isFunction(o) && o instanceof o) && 'constructor' in n && 'constructor' in t)
      return !1;
    r.push(n), e.push(t);
    var c = 0, f = !0;
    if ('[object Array]' == u) {
      if (c = n.length, f = c == t.length)
        for (; c-- && (f = S(n[c], t[c], r, e)););
    } else {
      for (var s in n)
        if (j.has(n, s) && (c++, !(f = j.has(t, s) && S(n[s], t[s], r, e))))
          break;
      if (f) {
        for (s in t)
          if (j.has(t, s) && !c--)
            break;
        f = !c;
      }
    }
    return r.pop(), e.pop(), f;
  };
  j.isEqual = function (n, t) {
    return S(n, t, [], []);
  }, j.isEmpty = function (n) {
    if (null == n)
      return !0;
    if (j.isArray(n) || j.isString(n))
      return 0 === n.length;
    for (var t in n)
      if (j.has(n, t))
        return !1;
    return !0;
  }, j.isElement = function (n) {
    return !(!n || 1 !== n.nodeType);
  }, j.isArray = x || function (n) {
    return '[object Array]' == l.call(n);
  }, j.isObject = function (n) {
    return n === Object(n);
  }, A([
    'Arguments',
    'Function',
    'String',
    'Number',
    'Date',
    'RegExp'
  ], function (n) {
    j['is' + n] = function (t) {
      return l.call(t) == '[object ' + n + ']';
    };
  }), j.isArguments(arguments) || (j.isArguments = function (n) {
    return !(!n || !j.has(n, 'callee'));
  }), 'function' != typeof /./ && (j.isFunction = function (n) {
    return 'function' == typeof n;
  }), j.isFinite = function (n) {
    return isFinite(n) && !isNaN(parseFloat(n));
  }, j.isNaN = function (n) {
    return j.isNumber(n) && n != +n;
  }, j.isBoolean = function (n) {
    return n === !0 || n === !1 || '[object Boolean]' == l.call(n);
  }, j.isNull = function (n) {
    return null === n;
  }, j.isUndefined = function (n) {
    return n === void 0;
  }, j.has = function (n, t) {
    return f.call(n, t);
  }, j.noConflict = function () {
    return n._ = t, this;
  }, j.identity = function (n) {
    return n;
  }, j.constant = function (n) {
    return function () {
      return n;
    };
  }, j.property = function (n) {
    return function (t) {
      return t[n];
    };
  }, j.matches = function (n) {
    return function (t) {
      if (t === n)
        return !0;
      for (var r in n)
        if (n[r] !== t[r])
          return !1;
      return !0;
    };
  }, j.times = function (n, t, r) {
    for (var e = Array(Math.max(0, n)), u = 0; n > u; u++)
      e[u] = t.call(r, u);
    return e;
  }, j.random = function (n, t) {
    return null == t && (t = n, n = 0), n + Math.floor(Math.random() * (t - n + 1));
  }, j.now = Date.now || function () {
    return new Date().getTime();
  };
  var T = {
      escape: {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        '\'': '&#x27;'
      }
    };
  T.unescape = j.invert(T.escape);
  var I = {
      escape: new RegExp('[' + j.keys(T.escape).join('') + ']', 'g'),
      unescape: new RegExp('(' + j.keys(T.unescape).join('|') + ')', 'g')
    };
  j.each([
    'escape',
    'unescape'
  ], function (n) {
    j[n] = function (t) {
      return null == t ? '' : ('' + t).replace(I[n], function (t) {
        return T[n][t];
      });
    };
  }), j.result = function (n, t) {
    if (null == n)
      return void 0;
    var r = n[t];
    return j.isFunction(r) ? r.call(n) : r;
  }, j.mixin = function (n) {
    A(j.functions(n), function (t) {
      var r = j[t] = n[t];
      j.prototype[t] = function () {
        var n = [this._wrapped];
        return a.apply(n, arguments), z.call(this, r.apply(j, n));
      };
    });
  };
  var N = 0;
  j.uniqueId = function (n) {
    var t = ++N + '';
    return n ? n + t : t;
  }, j.templateSettings = {
    evaluate: /<%([\s\S]+?)%>/g,
    interpolate: /<%=([\s\S]+?)%>/g,
    escape: /<%-([\s\S]+?)%>/g
  };
  var q = /(.)^/, B = {
      '\'': '\'',
      '\\': '\\',
      '\r': 'r',
      '\n': 'n',
      '\t': 't',
      '\u2028': 'u2028',
      '\u2029': 'u2029'
    }, D = /\\|'|\r|\n|\t|\u2028|\u2029/g;
  j.template = function (n, t, r) {
    var e;
    r = j.defaults({}, r, j.templateSettings);
    var u = new RegExp([
        (r.escape || q).source,
        (r.interpolate || q).source,
        (r.evaluate || q).source
      ].join('|') + '|$', 'g'), i = 0, a = '__p+=\'';
    n.replace(u, function (t, r, e, u, o) {
      return a += n.slice(i, o).replace(D, function (n) {
        return '\\' + B[n];
      }), r && (a += '\'+\n((__t=(' + r + '))==null?\'\':_.escape(__t))+\n\''), e && (a += '\'+\n((__t=(' + e + '))==null?\'\':__t)+\n\''), u && (a += '\';\n' + u + '\n__p+=\''), i = o + t.length, t;
    }), a += '\';\n', r.variable || (a = 'with(obj||{}){\n' + a + '}\n'), a = 'var __t,__p=\'\',__j=Array.prototype.join,' + 'print=function(){__p+=__j.call(arguments,\'\');};\n' + a + 'return __p;\n';
    try {
      e = new Function(r.variable || 'obj', '_', a);
    } catch (o) {
      throw o.source = a, o;
    }
    if (t)
      return e(t, j);
    var c = function (n) {
      return e.call(this, n, j);
    };
    return c.source = 'function(' + (r.variable || 'obj') + '){\n' + a + '}', c;
  }, j.chain = function (n) {
    return j(n).chain();
  };
  var z = function (n) {
    return this._chain ? j(n).chain() : n;
  };
  j.mixin(j), A([
    'pop',
    'push',
    'reverse',
    'shift',
    'sort',
    'splice',
    'unshift'
  ], function (n) {
    var t = e[n];
    j.prototype[n] = function () {
      var r = this._wrapped;
      return t.apply(r, arguments), 'shift' != n && 'splice' != n || 0 !== r.length || delete r[0], z.call(this, r);
    };
  }), A([
    'concat',
    'join',
    'slice'
  ], function (n) {
    var t = e[n];
    j.prototype[n] = function () {
      return z.call(this, t.apply(this._wrapped, arguments));
    };
  }), j.extend(j.prototype, {
    chain: function () {
      return this._chain = !0, this;
    },
    value: function () {
      return this._wrapped;
    }
  }), 'function' == typeof define && define.amd && define('underscore', [], function () {
    return j;
  });
}.call(this));
//# sourceMappingURL=underscore-min.map
// Github.js 0.9.0
// (c) 2013 Michael Aufreiter, Development Seed
// Github.js is freely distributable under the MIT license.
// For all details and documentation:
// http://substance.io/michael/github
(function () {
  // Initial Setup
  // -------------
  var XMLHttpRequest, Base64, _;
  if (typeof exports !== 'undefined') {
    XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
    _ = require('underscore');
    Base64 = require('./lib/base64.js');
  } else {
    _ = window._;
    Base64 = window.Base64;
  }
  //prefer native XMLHttpRequest always
  if (typeof window !== 'undefined' && typeof window.XMLHttpRequest !== 'undefined') {
    XMLHttpRequest = window.XMLHttpRequest;
  }
  var API_URL = 'https://api.github.com';
  var Github = function (options) {
    // HTTP Request Abstraction
    // =======
    //
    // I'm not proud of this and neither should you be if you were responsible for the XMLHttpRequest spec.
    function _request(method, path, data, cb, raw, sync) {
      function getURL() {
        var url = path.indexOf('//') >= 0 ? path : API_URL + path;
        return url + (/\?/.test(url) ? '&' : '?') + new Date().getTime();
      }
      var xhr = new XMLHttpRequest();
      if (!raw) {
        xhr.dataType = 'json';
      }
      xhr.open(method, getURL(), !sync);
      if (!sync) {
        xhr.onreadystatechange = function () {
          if (this.readyState == 4) {
            if (this.status >= 200 && this.status < 300 || this.status === 304) {
              cb(null, raw ? this.responseText : this.responseText ? JSON.parse(this.responseText) : true, this);
            } else {
              cb({
                path: path,
                request: this,
                error: this.status
              });
            }
          }
        };
      }
      ;
      xhr.setRequestHeader('Accept', 'application/vnd.github.raw+json');
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      if (options.token || options.username && options.password) {
        xhr.setRequestHeader('Authorization', options.token ? 'token ' + options.token : 'Basic ' + Base64.encode(options.username + ':' + options.password));
      }
      data ? xhr.send(JSON.stringify(data)) : xhr.send();
      if (sync)
        return xhr.response;
    }
    function _requestAllPages(path, cb) {
      var results = [];
      (function iterate() {
        _request('GET', path, null, function (err, res, xhr) {
          if (err) {
            return cb(err);
          }
          results.push.apply(results, res);
          var links = (xhr.getResponseHeader('link') || '').split(/\s*,\s*/g), next = _.find(links, function (link) {
              return /rel="next"/.test(link);
            });
          if (next) {
            next = (/<(.*)>/.exec(next) || [])[1];
          }
          if (!next) {
            cb(err, results);
          } else {
            path = next;
            iterate();
          }
        });
      }());
    }
    // User API
    // =======
    Github.User = function () {
      this.repos = function (cb) {
        // Github does not always honor the 1000 limit so we want to iterate over the data set.
        _requestAllPages('/user/repos?type=all&per_page=1000&sort=updated', function (err, res) {
          cb(err, res);
        });
      };
      // List user organizations
      // -------
      this.orgs = function (cb) {
        _request('GET', '/user/orgs', null, function (err, res) {
          cb(err, res);
        });
      };
      // List authenticated user's gists
      // -------
      this.gists = function (cb) {
        _request('GET', '/gists', null, function (err, res) {
          cb(err, res);
        });
      };
      // List authenticated user's unread notifications
      // -------
      this.notifications = function (cb) {
        _request('GET', '/notifications', null, function (err, res) {
          cb(err, res);
        });
      };
      // Show user information
      // -------
      this.show = function (username, cb) {
        var command = username ? '/users/' + username : '/user';
        _request('GET', command, null, function (err, res) {
          cb(err, res);
        });
      };
      // List user repositories
      // -------
      this.userRepos = function (username, cb) {
        // Github does not always honor the 1000 limit so we want to iterate over the data set.
        _requestAllPages('/users/' + username + '/repos?type=all&per_page=1000&sort=updated', function (err, res) {
          cb(err, res);
        });
      };
      // List a user's gists
      // -------
      this.userGists = function (username, cb) {
        _request('GET', '/users/' + username + '/gists', null, function (err, res) {
          cb(err, res);
        });
      };
      // List organization repositories
      // -------
      this.orgRepos = function (orgname, cb) {
        // Github does not always honor the 1000 limit so we want to iterate over the data set.
        _requestAllPages('/orgs/' + orgname + '/repos?type=all&&page_num=1000&sort=updated&direction=desc', function (err, res) {
          cb(err, res);
        });
      };
      // Follow user
      // -------
      this.follow = function (username, cb) {
        _request('PUT', '/user/following/' + username, null, function (err, res) {
          cb(err, res);
        });
      };
      // Unfollow user
      // -------
      this.unfollow = function (username, cb) {
        _request('DELETE', '/user/following/' + username, null, function (err, res) {
          cb(err, res);
        });
      };
    };
    // Repository API
    // =======
    Github.Repository = function (options) {
      var repo = options.name;
      var user = options.user;
      var that = this;
      var repoPath = '/repos/' + user + '/' + repo;
      var currentTree = {
          'branch': null,
          'sha': null
        };
      // Uses the cache if branch has not been changed
      // -------
      function updateTree(branch, cb) {
        if (branch === currentTree.branch && currentTree.sha)
          return cb(null, currentTree.sha);
        that.getRef('heads/' + branch, function (err, sha) {
          currentTree.branch = branch;
          currentTree.sha = sha;
          cb(err, sha);
        });
      }
      // Get a particular reference
      // -------
      this.getRef = function (ref, cb) {
        _request('GET', repoPath + '/git/refs/' + ref, null, function (err, res) {
          if (err)
            return cb(err);
          cb(null, res.object.sha);
        });
      };
      // Create a new reference
      // --------
      //
      // {
      //   "ref": "refs/heads/my-new-branch-name",
      //   "sha": "827efc6d56897b048c772eb4087f854f46256132"
      // }
      this.createRef = function (options, cb) {
        _request('POST', repoPath + '/git/refs', options, cb);
      };
      // Delete a reference
      // --------
      //
      // repo.deleteRef('heads/gh-pages')
      // repo.deleteRef('tags/v1.0')
      this.deleteRef = function (ref, cb) {
        _request('DELETE', repoPath + '/git/refs/' + ref, options, cb);
      };
      // Create a repo  
      // -------
      this.createRepo = function (options, cb) {
        _request('POST', '/user/repos', options, cb);
      };
      // Delete a repo  
      // --------  
      this.deleteRepo = function (cb) {
        _request('DELETE', repoPath, options, cb);
      };
      // List all tags of a repository
      // -------
      this.listTags = function (cb) {
        _request('GET', repoPath + '/tags', null, function (err, tags) {
          if (err)
            return cb(err);
          cb(null, tags);
        });
      };
      // List all pull requests of a respository
      // -------
      this.listPulls = function (state, cb) {
        _request('GET', repoPath + '/pulls' + (state ? '?state=' + state : ''), null, function (err, pulls) {
          if (err)
            return cb(err);
          cb(null, pulls);
        });
      };
      // Gets details for a specific pull request
      // -------
      this.getPull = function (number, cb) {
        _request('GET', repoPath + '/pulls/' + number, null, function (err, pull) {
          if (err)
            return cb(err);
          cb(null, pull);
        });
      };
      // Retrieve the changes made between base and head
      // -------
      this.compare = function (base, head, cb) {
        _request('GET', repoPath + '/compare/' + base + '...' + head, null, function (err, diff) {
          if (err)
            return cb(err);
          cb(null, diff);
        });
      };
      // List all branches of a repository
      // -------
      this.listBranches = function (cb) {
        _request('GET', repoPath + '/git/refs/heads', null, function (err, heads) {
          if (err)
            return cb(err);
          cb(null, _.map(heads, function (head) {
            return _.last(head.ref.split('/'));
          }));
        });
      };
      // Retrieve the contents of a blob
      // -------
      this.getBlob = function (sha, cb) {
        _request('GET', repoPath + '/git/blobs/' + sha, null, cb, 'raw');
      };
      // For a given file path, get the corresponding sha (blob for files, tree for dirs)
      // -------
      this.getSha = function (branch, path, cb) {
        // Just use head if path is empty
        if (path === '')
          return that.getRef('heads/' + branch, cb);
        that.getTree(branch + '?recursive=true', function (err, tree) {
          if (err)
            return cb(err);
          var file = _.select(tree, function (file) {
              return file.path === path;
            })[0];
          cb(null, file ? file.sha : null);
        });
      };
      // Retrieve the tree a commit points to
      // -------
      this.getTree = function (tree, cb) {
        _request('GET', repoPath + '/git/trees/' + tree, null, function (err, res) {
          if (err)
            return cb(err);
          cb(null, res.tree);
        });
      };
      // Post a new blob object, getting a blob SHA back
      // -------
      this.postBlob = function (content, cb) {
        if (typeof content === 'string') {
          content = {
            'content': content,
            'encoding': 'utf-8'
          };
        } else {
          content = {
            'content': btoa(String.fromCharCode.apply(null, new Uint8Array(content))),
            'encoding': 'base64'
          };
        }
        _request('POST', repoPath + '/git/blobs', content, function (err, res) {
          if (err)
            return cb(err);
          cb(null, res.sha);
        });
      };
      // Update an existing tree adding a new blob object getting a tree SHA back
      // -------
      this.updateTree = function (baseTree, path, blob, cb) {
        var data = {
            'base_tree': baseTree,
            'tree': [{
                'path': path,
                'mode': '100644',
                'type': 'blob',
                'sha': blob
              }]
          };
        _request('POST', repoPath + '/git/trees', data, function (err, res) {
          if (err)
            return cb(err);
          cb(null, res.sha);
        });
      };
      // Post a new tree object having a file path pointer replaced
      // with a new blob SHA getting a tree SHA back
      // -------
      this.postTree = function (tree, cb) {
        _request('POST', repoPath + '/git/trees', { 'tree': tree }, function (err, res) {
          if (err)
            return cb(err);
          cb(null, res.sha);
        });
      };
      // Create a new commit object with the current commit SHA as the parent
      // and the new tree SHA, getting a commit SHA back
      // -------
      this.commit = function (parent, tree, message, cb) {
        var data = {
            'message': message,
            'author': { 'name': options.username },
            'parents': [parent],
            'tree': tree
          };
        _request('POST', repoPath + '/git/commits', data, function (err, res) {
          currentTree.sha = res.sha;
          // update latest commit
          if (err)
            return cb(err);
          cb(null, res.sha);
        });
      };
      // Update the reference of your head to point to the new commit SHA
      // -------
      this.updateHead = function (head, commit, cb) {
        _request('PATCH', repoPath + '/git/refs/heads/' + head, { 'sha': commit }, function (err, res) {
          cb(err);
        });
      };
      // Show repository information
      // -------
      this.show = function (cb) {
        _request('GET', repoPath, null, cb);
      };
      // Get contents
      // --------
      this.contents = function (branch, path, cb, sync) {
        return _request('GET', repoPath + '/contents?ref=' + branch + (path ? '&path=' + path : ''), null, cb, 'raw', sync);
      };
      // Fork repository
      // -------
      this.fork = function (cb) {
        _request('POST', repoPath + '/forks', null, cb);
      };
      // Branch repository  
      // --------  
      this.branch = function (oldBranch, newBranch, cb) {
        if (arguments.length === 2 && typeof arguments[1] === 'function') {
          cb = newBranch;
          newBranch = oldBranch;
          oldBranch = 'master';
        }
        this.getRef('heads/' + oldBranch, function (err, ref) {
          if (err && cb)
            return cb(err);
          that.createRef({
            ref: 'refs/heads/' + newBranch,
            sha: ref
          }, cb);
        });
      };
      // Create pull request
      // --------
      this.createPullRequest = function (options, cb) {
        _request('POST', repoPath + '/pulls', options, cb);
      };
      // List hooks
      // --------
      this.listHooks = function (cb) {
        _request('GET', repoPath + '/hooks', null, cb);
      };
      // Get a hook
      // --------
      this.getHook = function (id, cb) {
        _request('GET', repoPath + '/hooks/' + id, null, cb);
      };
      // Create a hook
      // --------
      this.createHook = function (options, cb) {
        _request('POST', repoPath + '/hooks', options, cb);
      };
      // Edit a hook
      // --------
      this.editHook = function (id, options, cb) {
        _request('PATCH', repoPath + '/hooks/' + id, options, cb);
      };
      // Delete a hook
      // --------
      this.deleteHook = function (id, cb) {
        _request('DELETE', repoPath + '/hooks/' + id, null, cb);
      };
      // Read file at given path
      // -------
      this.read = function (branch, path, cb) {
        that.getSha(branch, path, function (err, sha) {
          if (!sha)
            return cb('not found', null);
          that.getBlob(sha, function (err, content) {
            cb(err, content, sha);
          });
        });
      };
      // Remove a file from the tree
      // -------
      this.remove = function (branch, path, cb) {
        updateTree(branch, function (err, latestCommit) {
          that.getTree(latestCommit + '?recursive=true', function (err, tree) {
            // Update Tree
            var newTree = _.reject(tree, function (ref) {
                return ref.path === path;
              });
            _.each(newTree, function (ref) {
              if (ref.type === 'tree')
                delete ref.sha;
            });
            that.postTree(newTree, function (err, rootTree) {
              that.commit(latestCommit, rootTree, 'Deleted ' + path, function (err, commit) {
                that.updateHead(branch, commit, function (err) {
                  cb(err);
                });
              });
            });
          });
        });
      };
      // Delete a file from the tree
      // -------
      this.delete = function (branch, path, cb) {
        that.getSha(branch, path, function (err, sha) {
          if (!sha)
            return cb('not found', null);
          var delPath = repoPath + '/contents/' + path;
          var params = {
              'message': 'Deleted ' + path,
              'sha': sha
            };
          delPath += '?message=' + encodeURIComponent(params.message);
          delPath += '&sha=' + encodeURIComponent(params.sha);
          _request('DELETE', delPath, null, cb);
        });
      };
      // Move a file to a new location
      // -------
      this.move = function (branch, path, newPath, cb) {
        updateTree(branch, function (err, latestCommit) {
          that.getTree(latestCommit + '?recursive=true', function (err, tree) {
            // Update Tree
            _.each(tree, function (ref) {
              if (ref.path === path)
                ref.path = newPath;
              if (ref.type === 'tree')
                delete ref.sha;
            });
            that.postTree(tree, function (err, rootTree) {
              that.commit(latestCommit, rootTree, 'Deleted ' + path, function (err, commit) {
                that.updateHead(branch, commit, function (err) {
                  cb(err);
                });
              });
            });
          });
        });
      };
      // Write file contents to a given branch and path
      // -------
      this.write = function (branch, path, content, message, cb) {
        updateTree(branch, function (err, latestCommit) {
          if (err)
            return cb(err);
          that.postBlob(content, function (err, blob) {
            if (err)
              return cb(err);
            that.updateTree(latestCommit, path, blob, function (err, tree) {
              if (err)
                return cb(err);
              that.commit(latestCommit, tree, message, function (err, commit) {
                if (err)
                  return cb(err);
                that.updateHead(branch, commit, cb);
              });
            });
          });
        });
      };
      // List commits on a repository. Takes an object of optional paramaters:
      // sha: SHA or branch to start listing commits from
      // path: Only commits containing this file path will be returned
      // since: ISO 8601 date - only commits after this date will be returned
      // until: ISO 8601 date - only commits before this date will be returned
      // -------
      this.getCommits = function (options, cb) {
        options = options || {};
        var url = repoPath + '/commits';
        var params = [];
        if (options.sha) {
          params.push('sha=' + encodeURIComponent(options.sha));
        }
        if (options.path) {
          params.push('path=' + encodeURIComponent(options.path));
        }
        if (options.since) {
          var since = options.since;
          if (since.constructor === Date) {
            since = since.toISOString();
          }
          params.push('since=' + encodeURIComponent(since));
        }
        if (options.until) {
          var until = options.until;
          if (until.constructor === Date) {
            until = until.toISOString();
          }
          params.push('until=' + encodeURIComponent(until));
        }
        if (params.length > 0) {
          url += '?' + params.join('&');
        }
        _request('GET', url, null, cb);
      };
    };
    // Gists API
    // =======
    Github.Gist = function (options) {
      var id = options.id;
      var gistPath = '/gists/' + id;
      // Read the gist
      // --------
      this.read = function (cb) {
        _request('GET', gistPath, null, function (err, gist) {
          cb(err, gist);
        });
      };
      // Create the gist
      // --------
      // {
      //  "description": "the description for this gist",
      //    "public": true,
      //    "files": {
      //      "file1.txt": {
      //        "content": "String file contents"
      //      }
      //    }
      // }
      this.create = function (options, cb) {
        _request('POST', '/gists', options, cb);
      };
      // Delete the gist
      // --------
      this.delete = function (cb) {
        _request('DELETE', gistPath, null, function (err, res) {
          cb(err, res);
        });
      };
      // Fork a gist
      // --------
      this.fork = function (cb) {
        _request('POST', gistPath + '/fork', null, function (err, res) {
          cb(err, res);
        });
      };
      // Update a gist with the new stuff
      // --------
      this.update = function (options, cb) {
        _request('PATCH', gistPath, options, function (err, res) {
          cb(err, res);
        });
      };
      // Star a gist
      // --------
      this.star = function (cb) {
        _request('PUT', gistPath + '/star', null, function (err, res) {
          cb(err, res);
        });
      };
      // Untar a gist
      // --------
      this.unstar = function (cb) {
        _request('DELETE', gistPath + '/star', null, function (err, res) {
          cb(err, res);
        });
      };
      // Check if a gist is starred
      // --------
      this.isStarred = function (cb) {
        _request('GET', gistPath + '/star', null, function (err, res) {
          cb(err, res);
        });
      };
    };
    // Issues API
    // ==========
    Github.Issue = function (options) {
      var path = '/repos/' + options.user + '/' + options.repo + '/issues';
      // List all issues of a repository
      // -------
      this.list = function (options, cb) {
        _request('GET', path, options, function (err, res) {
          cb(err, res);
        });
      };
      // Gets details for a specific issue
      // -------
      this.getIssue = function (number, cb) {
        _request('GET', path + '/' + number, null, function (err, pull) {
          if (err)
            return cb(err);
          cb(null, pull);
        });
      };
      // Create a new issue
      // -------
      this.createIssue = function (options, cb) {
        _request('POST', path, options, function (err, pull) {
          if (err)
            return cb(err);
          cb(null, pull);
        });
      };
      // Update an issue
      // -------
      this.updateIssue = function (number, options, cb) {
        _request('PATCH', path + '/' + number, options, function (err, pull) {
          if (err)
            return cb(err);
          cb(null, pull);
        });
      };
      // Open an issue
      // -------
      this.openIssue = function (number, cb) {
        _request('PATCH', path + '/' + number, { 'state': 'open' }, function (err, pull) {
          if (err)
            return cb(err);
          cb(null, pull);
        });
      };
      // Close an issue
      // -------
      this.closeIssue = function (number, cb) {
        _request('PATCH', path + '/' + number, { 'state': 'closed' }, function (err, pull) {
          if (err)
            return cb(err);
          cb(null, pull);
        });
      };
    };
    // Label API
    // ==========
    Github.Label = function (options) {
      var path = '/repos/' + options.user + '/' + options.repo + '/labels';
      // List all labels of a repository
      // -------
      this.list = function (options, cb) {
        _request('GET', path, options, function (err, res) {
          cb(err, res);
        });
      };
      // Gets details for a specific label
      // -------
      this.getLabel = function (name, cb) {
        _request('GET', path + '/' + name, null, function (err, pull) {
          if (err)
            return cb(err);
          cb(null, pull);
        });
      };
      // Create a new label
      // -------
      this.createLabel = function (options, cb) {
        _request('POST', path, options, function (err, pull) {
          if (err)
            return cb(err);
          cb(null, pull);
        });
      };
      // Update a label
      // -------
      this.updateLabel = function (name, options, cb) {
        _request('PATCH', path + '/' + name, options, function (err, pull) {
          if (err)
            return cb(err);
          cb(null, pull);
        });
      };
      // Delete a label
      // -------
      this.deleteLabel = function (name, options, cb) {
        _request('DELETE', path + '/' + name, options, function (err, pull) {
          if (err)
            return cb(err);
          cb(null, pull);
        });
      };
    };
    // Milestone API
    // ==========
    Github.Milestone = function (options) {
      var path = '/repos/' + options.user + '/' + options.repo + '/milestones';
      // List all milestones of a repository
      // -------
      this.list = function (options, cb) {
        _request('GET', path, options, function (err, res) {
          cb(err, res);
        });
      };
      // Gets details for a specific milestone
      // -------
      this.getMilestone = function (number, cb) {
        _request('GET', path + '/' + number, null, function (err, pull) {
          if (err)
            return cb(err);
          cb(null, pull);
        });
      };
      // Create a new milestone
      // -------
      this.createMilestone = function (options, cb) {
        _request('POST', path, options, function (err, pull) {
          if (err)
            return cb(err);
          cb(null, pull);
        });
      };
      // Update a milestone
      // -------
      this.updateMilestone = function (number, options, cb) {
        _request('PATCH', path + '/' + number, options, function (err, pull) {
          if (err)
            return cb(err);
          cb(null, pull);
        });
      };
      // Delete a milestone
      // -------
      this.deleteMilestone = function (number, options, cb) {
        _request('DELETE', path + '/' + number, options, function (err, pull) {
          if (err)
            return cb(err);
          cb(null, pull);
        });
      };
    };
    // Assignees API
    // ==========
    Github.Assignees = function (options) {
      var path = '/repos/' + options.user + '/' + options.repo + '/assignees';
      // List all assignees of a repository
      // -------
      this.list = function (options, cb) {
        _request('GET', path, options, function (err, res) {
          cb(err, res);
        });
      };
    };
    // Top Level API
    // -------
    this.getIssues = function (user, repo) {
      return new Github.Issue({
        user: user,
        repo: repo
      });
    };
    this.getRepo = function (user, repo) {
      return new Github.Repository({
        user: user,
        name: repo
      });
    };
    this.getUser = function () {
      return new Github.User();
    };
    this.getGist = function (id) {
      return new Github.Gist({ id: id });
    };
  };
  if (typeof exports !== 'undefined') {
    // Github = exports;
    module.exports = Github;
  } else {
    window.Github = Github;
  }
}.call(this));
'use strict';
/**
 * @ngdoc overview
 * @name ohtuProjektiAppApp
 * @description
 * # ohtuProjektiAppApp
 *
 * Main module of the application.
 */
angular.module('ohtuProjektiAppApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch'
]).factory('gitapi', function () {
  var github;
  return {
    loginWithToken: function (authtoken) {
      github = new Github({
        token: authtoken,
        auth: 'oauth'
      });
    },
    isAuthenticated: function () {
      return github != undefined;
    },
    getGithub: function () {
      return github;
    }
  };
}).factory('auth', function () {
  OAuth.initialize('CHkmXQc9pfI3vqPZectNDagrwSc');
  return {
    askAuth: function () {
      return OAuth.popup('github');
    }
  };
}).config([
  '$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    }).when('/about', {
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl'
    }).when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    }).otherwise({ redirectTo: '/' });
  }
]);
'use strict';
/**
 * @ngdoc function
 * @name ohtuProjektiAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ohtuProjektiAppApp
 */
var myApp = angular.module('ohtuProjektiAppApp');
myApp.controller('MainCtrl', [
  '$scope',
  '$http',
  '$location',
  'gitapi',
  function ($scope, $http, $location, gitapi) {
    if (!gitapi.isAuthenticated()) {
      $location.path('login');
    } else {
      var git = gitapi.getGithub();
      var user = git.getUser();
      user.repos(function (err, repos) {
        $scope.$apply(function () {
          $scope.repos = repos;
        });
      });
    }
  }
]);
'use strict';
/**
 * @ngdoc function
 * @name ohtuProjektiAppApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the ohtuProjektiAppApp
 */
angular.module('ohtuProjektiAppApp').controller('AboutCtrl', [
  '$scope',
  function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }
]);
'use strict';
/**
 * @ngdoc function
 * @name ohtuProjektiAppApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the ohtuProjektiAppApp
 */
angular.module('ohtuProjektiAppApp').controller('LoginCtrl', [
  '$scope',
  '$location',
  'gitapi',
  'auth',
  function ($scope, $location, gitapi, auth) {
    $scope.signin = function () {
      var gitauth = auth.askAuth();
      gitauth.done(function (result) {
        gitapi.loginWithToken(result.access_token);
        $location.path('/');
        $scope.$apply();
      }).fail(function (err) {
        console.log(err);
      });
    };
  }
]);