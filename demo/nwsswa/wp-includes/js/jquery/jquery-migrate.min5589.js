/*! jQuery Migrate v3.4.1 | (c) OpenJS Foundation and other contributors | jquery.org/license */
"undefined" == typeof jQuery.migrateMute && (jQuery.migrateMute = true), (function(t) {
  "use strict";
  "function" == typeof define && define.amd ? define(["jquery"], function(e) {
    return t(e, window);
  }) : "object" == typeof module && module.exports ? module.exports = t(require("jquery"), window) : t(jQuery, window);
})(function(s, n) {
  "use strict";
  function e(e2) {
    return 0 <= (function(e3, t2) {
      for (var r2 = /^(\d+)\.(\d+)\.(\d+)/, n2 = r2.exec(e3) || [], o2 = r2.exec(t2) || [], a2 = 1; a2 <= 3; a2++) {
        if (+o2[a2] < +n2[a2]) return 1;
        if (+n2[a2] < +o2[a2]) return -1;
      }
      return 0;
    })(s.fn.jquery, e2);
  }
  s.migrateVersion = "3.4.1";
  var t = Object.create(null);
  s.migrateDisablePatches = function() {
    for (var e2 = 0; e2 < arguments.length; e2++) t[arguments[e2]] = true;
  }, s.migrateEnablePatches = function() {
    for (var e2 = 0; e2 < arguments.length; e2++) delete t[arguments[e2]];
  }, s.migrateIsPatchEnabled = function(e2) {
    return !t[e2];
  }, n.console && n.console.log && (s && e("3.0.0") && !e("5.0.0") || n.console.log("JQMIGRATE: jQuery 3.x-4.x REQUIRED"), s.migrateWarnings && n.console.log("JQMIGRATE: Migrate plugin loaded multiple times"), n.console.log("JQMIGRATE: Migrate is installed" + (s.migrateMute ? "" : " with logging active") + ", version " + s.migrateVersion));
  var o = {};
  function u(e2, t2) {
    var r2 = n.console;
    !s.migrateIsPatchEnabled(e2) || s.migrateDeduplicateWarnings && o[t2] || (o[t2] = true, s.migrateWarnings.push(t2 + " [" + e2 + "]"), r2 && r2.warn && !s.migrateMute && (r2.warn("JQMIGRATE: " + t2), s.migrateTrace && r2.trace && r2.trace()));
  }
  function r(e2, t2, r2, n2, o2) {
    Object.defineProperty(e2, t2, { configurable: true, enumerable: true, get: function() {
      return u(n2, o2), r2;
    }, set: function(e3) {
      u(n2, o2), r2 = e3;
    } });
  }
  function a(e2, t2, r2, n2, o2) {
    var a2 = e2[t2];
    e2[t2] = function() {
      return o2 && u(n2, o2), (s.migrateIsPatchEnabled(n2) ? r2 : a2 || s.noop).apply(this, arguments);
    };
  }
  function c(e2, t2, r2, n2, o2) {
    if (!o2) throw new Error("No warning message provided");
    return a(e2, t2, r2, n2, o2), 0;
  }
  function i(e2, t2, r2, n2) {
    return a(e2, t2, r2, n2), 0;
  }
  s.migrateDeduplicateWarnings = true, s.migrateWarnings = [], void 0 === s.migrateTrace && (s.migrateTrace = true), s.migrateReset = function() {
    o = {}, s.migrateWarnings.length = 0;
  }, "BackCompat" === n.document.compatMode && u("quirks", "jQuery is not compatible with Quirks Mode");
  var d, l, p, f = {}, m = s.fn.init, y = s.find, h = /\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/, g = /\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/g, v = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
  for (d in i(s.fn, "init", function(e2) {
    var t2 = Array.prototype.slice.call(arguments);
    return s.migrateIsPatchEnabled("selector-empty-id") && "string" == typeof e2 && "#" === e2 && (u("selector-empty-id", "jQuery( '#' ) is not a valid selector"), t2[0] = []), m.apply(this, t2);
  }, "selector-empty-id"), s.fn.init.prototype = s.fn, i(s, "find", function(t2) {
    var r2 = Array.prototype.slice.call(arguments);
    if ("string" == typeof t2 && h.test(t2)) try {
      n.document.querySelector(t2);
    } catch (e2) {
      t2 = t2.replace(g, function(e3, t3, r3, n2) {
        return "[" + t3 + r3 + '"' + n2 + '"]';
      });
      try {
        n.document.querySelector(t2), u("selector-hash", "Attribute selector with '#' must be quoted: " + r2[0]), r2[0] = t2;
      } catch (e3) {
        u("selector-hash", "Attribute selector with '#' was not fixed: " + r2[0]);
      }
    }
    return y.apply(this, r2);
  }, "selector-hash"), y) Object.prototype.hasOwnProperty.call(y, d) && (s.find[d] = y[d]);
  c(s.fn, "size", function() {
    return this.length;
  }, "size", "jQuery.fn.size() is deprecated and removed; use the .length property"), c(s, "parseJSON", function() {
    return JSON.parse.apply(null, arguments);
  }, "parseJSON", "jQuery.parseJSON is deprecated; use JSON.parse"), c(s, "holdReady", s.holdReady, "holdReady", "jQuery.holdReady is deprecated"), c(s, "unique", s.uniqueSort, "unique", "jQuery.unique is deprecated; use jQuery.uniqueSort"), r(s.expr, "filters", s.expr.pseudos, "expr-pre-pseudos", "jQuery.expr.filters is deprecated; use jQuery.expr.pseudos"), r(s.expr, ":", s.expr.pseudos, "expr-pre-pseudos", "jQuery.expr[':'] is deprecated; use jQuery.expr.pseudos"), e("3.1.1") && c(s, "trim", function(e2) {
    return null == e2 ? "" : (e2 + "").replace(v, "$1");
  }, "trim", "jQuery.trim is deprecated; use String.prototype.trim"), e("3.2.0") && (c(s, "nodeName", function(e2, t2) {
    return e2.nodeName && e2.nodeName.toLowerCase() === t2.toLowerCase();
  }, "nodeName", "jQuery.nodeName is deprecated"), c(s, "isArray", Array.isArray, "isArray", "jQuery.isArray is deprecated; use Array.isArray")), e("3.3.0") && (c(s, "isNumeric", function(e2) {
    var t2 = typeof e2;
    return ("number" == t2 || "string" == t2) && !isNaN(e2 - parseFloat(e2));
  }, "isNumeric", "jQuery.isNumeric() is deprecated"), s.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e2, t2) {
    f["[object " + t2 + "]"] = t2.toLowerCase();
  }), c(s, "type", function(e2) {
    return null == e2 ? e2 + "" : "object" == typeof e2 || "function" == typeof e2 ? f[Object.prototype.toString.call(e2)] || "object" : typeof e2;
  }, "type", "jQuery.type is deprecated"), c(s, "isFunction", function(e2) {
    return "function" == typeof e2;
  }, "isFunction", "jQuery.isFunction() is deprecated"), c(s, "isWindow", function(e2) {
    return null != e2 && e2 === e2.window;
  }, "isWindow", "jQuery.isWindow() is deprecated")), s.ajax && (l = s.ajax, p = /(=)\?(?=&|$)|\?\?/, i(s, "ajax", function() {
    var e2 = l.apply(this, arguments);
    return e2.promise && (c(e2, "success", e2.done, "jqXHR-methods", "jQXHR.success is deprecated and removed"), c(e2, "error", e2.fail, "jqXHR-methods", "jQXHR.error is deprecated and removed"), c(e2, "complete", e2.always, "jqXHR-methods", "jQXHR.complete is deprecated and removed")), e2;
  }, "jqXHR-methods"), e("4.0.0") || s.ajaxPrefilter("+json", function(e2) {
    false !== e2.jsonp && (p.test(e2.url) || "string" == typeof e2.data && 0 === (e2.contentType || "").indexOf("application/x-www-form-urlencoded") && p.test(e2.data)) && u("jsonp-promotion", "JSON-to-JSONP auto-promotion is deprecated");
  }));
  var j = s.fn.removeAttr, b = s.fn.toggleClass, w = /\S+/g;
  function x(e2) {
    return e2.replace(/-([a-z])/g, function(e3, t2) {
      return t2.toUpperCase();
    });
  }
  i(s.fn, "removeAttr", function(e2) {
    var r2 = this, n2 = false;
    return s.each(e2.match(w), function(e3, t2) {
      s.expr.match.bool.test(t2) && r2.each(function() {
        if (false !== s(this).prop(t2)) return !(n2 = true);
      }), n2 && (u("removeAttr-bool", "jQuery.fn.removeAttr no longer sets boolean properties: " + t2), r2.prop(t2, false));
    }), j.apply(this, arguments);
  }, "removeAttr-bool"), i(s.fn, "toggleClass", function(t2) {
    return void 0 !== t2 && "boolean" != typeof t2 ? b.apply(this, arguments) : (u("toggleClass-bool", "jQuery.fn.toggleClass( boolean ) is deprecated"), this.each(function() {
      var e2 = this.getAttribute && this.getAttribute("class") || "";
      e2 && s.data(this, "__className__", e2), this.setAttribute && this.setAttribute("class", !e2 && false !== t2 && s.data(this, "__className__") || "");
    }));
  }, "toggleClass-bool");
  var Q, A, R = false, C = /^[a-z]/, N = /^(?:Border(?:Top|Right|Bottom|Left)?(?:Width|)|(?:Margin|Padding)?(?:Top|Right|Bottom|Left)?|(?:Min|Max)?(?:Width|Height))$/;
  s.swap && s.each(["height", "width", "reliableMarginRight"], function(e2, t2) {
    var r2 = s.cssHooks[t2] && s.cssHooks[t2].get;
    r2 && (s.cssHooks[t2].get = function() {
      var e3;
      return R = true, e3 = r2.apply(this, arguments), R = false, e3;
    });
  }), i(s, "swap", function(e2, t2, r2, n2) {
    var o2, a2, i2 = {};
    for (a2 in R || u("swap", "jQuery.swap() is undocumented and deprecated"), t2) i2[a2] = e2.style[a2], e2.style[a2] = t2[a2];
    for (a2 in o2 = r2.apply(e2, n2 || []), t2) e2.style[a2] = i2[a2];
    return o2;
  }, "swap"), e("3.4.0") && "undefined" != typeof Proxy && (s.cssProps = new Proxy(s.cssProps || {}, { set: function() {
    return u("cssProps", "jQuery.cssProps is deprecated"), Reflect.set.apply(this, arguments);
  } })), e("4.0.0") ? (A = { animationIterationCount: true, columnCount: true, fillOpacity: true, flexGrow: true, flexShrink: true, fontWeight: true, gridArea: true, gridColumn: true, gridColumnEnd: true, gridColumnStart: true, gridRow: true, gridRowEnd: true, gridRowStart: true, lineHeight: true, opacity: true, order: true, orphans: true, widows: true, zIndex: true, zoom: true }, "undefined" != typeof Proxy ? s.cssNumber = new Proxy(A, { get: function() {
    return u("css-number", "jQuery.cssNumber is deprecated"), Reflect.get.apply(this, arguments);
  }, set: function() {
    return u("css-number", "jQuery.cssNumber is deprecated"), Reflect.set.apply(this, arguments);
  } }) : s.cssNumber = A) : A = s.cssNumber, Q = s.fn.css, i(s.fn, "css", function(e2, t2) {
    var r2, n2, o2 = this;
    return e2 && "object" == typeof e2 && !Array.isArray(e2) ? (s.each(e2, function(e3, t3) {
      s.fn.css.call(o2, e3, t3);
    }), this) : ("number" == typeof t2 && (r2 = x(e2), n2 = r2, C.test(n2) && N.test(n2[0].toUpperCase() + n2.slice(1)) || A[r2] || u("css-number", 'Number-typed values are deprecated for jQuery.fn.css( "' + e2 + '", value )')), Q.apply(this, arguments));
  }, "css-number");
  var S, P, k, H, E = s.data;
  i(s, "data", function(e2, t2, r2) {
    var n2, o2, a2;
    if (t2 && "object" == typeof t2 && 2 === arguments.length) {
      for (a2 in n2 = s.hasData(e2) && E.call(this, e2), o2 = {}, t2) a2 !== x(a2) ? (u("data-camelCase", "jQuery.data() always sets/gets camelCased names: " + a2), n2[a2] = t2[a2]) : o2[a2] = t2[a2];
      return E.call(this, e2, o2), t2;
    }
    return t2 && "string" == typeof t2 && t2 !== x(t2) && (n2 = s.hasData(e2) && E.call(this, e2)) && t2 in n2 ? (u("data-camelCase", "jQuery.data() always sets/gets camelCased names: " + t2), 2 < arguments.length && (n2[t2] = r2), n2[t2]) : E.apply(this, arguments);
  }, "data-camelCase"), s.fx && (k = s.Tween.prototype.run, H = function(e2) {
    return e2;
  }, i(s.Tween.prototype, "run", function() {
    1 < s.easing[this.easing].length && (u("easing-one-arg", "'jQuery.easing." + this.easing.toString() + "' should use only one argument"), s.easing[this.easing] = H), k.apply(this, arguments);
  }, "easing-one-arg"), S = s.fx.interval, P = "jQuery.fx.interval is deprecated", n.requestAnimationFrame && Object.defineProperty(s.fx, "interval", { configurable: true, enumerable: true, get: function() {
    return n.document.hidden || u("fx-interval", P), s.migrateIsPatchEnabled("fx-interval") && void 0 === S ? 13 : S;
  }, set: function(e2) {
    u("fx-interval", P), S = e2;
  } }));
  var M = s.fn.load, q = s.event.add, O = s.event.fix;
  s.event.props = [], s.event.fixHooks = {}, r(s.event.props, "concat", s.event.props.concat, "event-old-patch", "jQuery.event.props.concat() is deprecated and removed"), i(s.event, "fix", function(e2) {
    var t2, r2 = e2.type, n2 = this.fixHooks[r2], o2 = s.event.props;
    if (o2.length) {
      u("event-old-patch", "jQuery.event.props are deprecated and removed: " + o2.join());
      while (o2.length) s.event.addProp(o2.pop());
    }
    if (n2 && !n2._migrated_ && (n2._migrated_ = true, u("event-old-patch", "jQuery.event.fixHooks are deprecated and removed: " + r2), (o2 = n2.props) && o2.length)) while (o2.length) s.event.addProp(o2.pop());
    return t2 = O.call(this, e2), n2 && n2.filter ? n2.filter(t2, e2) : t2;
  }, "event-old-patch"), i(s.event, "add", function(e2, t2) {
    return e2 === n && "load" === t2 && "complete" === n.document.readyState && u("load-after-event", "jQuery(window).on('load'...) called after load event occurred"), q.apply(this, arguments);
  }, "load-after-event"), s.each(["load", "unload", "error"], function(e2, t2) {
    i(s.fn, t2, function() {
      var e3 = Array.prototype.slice.call(arguments, 0);
      return "load" === t2 && "string" == typeof e3[0] ? M.apply(this, e3) : (u("shorthand-removed-v3", "jQuery.fn." + t2 + "() is deprecated"), e3.splice(0, 0, t2), arguments.length ? this.on.apply(this, e3) : (this.triggerHandler.apply(this, e3), this));
    }, "shorthand-removed-v3");
  }), s.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(e2, r2) {
    c(s.fn, r2, function(e3, t2) {
      return 0 < arguments.length ? this.on(r2, null, e3, t2) : this.trigger(r2);
    }, "shorthand-deprecated-v3", "jQuery.fn." + r2 + "() event shorthand is deprecated");
  }), s(function() {
    s(n.document).triggerHandler("ready");
  }), s.event.special.ready = { setup: function() {
    this === n.document && u("ready-event", "'ready' event is deprecated");
  } }, c(s.fn, "bind", function(e2, t2, r2) {
    return this.on(e2, null, t2, r2);
  }, "pre-on-methods", "jQuery.fn.bind() is deprecated"), c(s.fn, "unbind", function(e2, t2) {
    return this.off(e2, null, t2);
  }, "pre-on-methods", "jQuery.fn.unbind() is deprecated"), c(s.fn, "delegate", function(e2, t2, r2, n2) {
    return this.on(t2, e2, r2, n2);
  }, "pre-on-methods", "jQuery.fn.delegate() is deprecated"), c(s.fn, "undelegate", function(e2, t2, r2) {
    return 1 === arguments.length ? this.off(e2, "**") : this.off(t2, e2 || "**", r2);
  }, "pre-on-methods", "jQuery.fn.undelegate() is deprecated"), c(s.fn, "hover", function(e2, t2) {
    return this.on("mouseenter", e2).on("mouseleave", t2 || e2);
  }, "pre-on-methods", "jQuery.fn.hover() is deprecated");
  function T(e2) {
    var t2 = n.document.implementation.createHTMLDocument("");
    return t2.body.innerHTML = e2, t2.body && t2.body.innerHTML;
  }
  var F = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi;
  s.UNSAFE_restoreLegacyHtmlPrefilter = function() {
    s.migrateEnablePatches("self-closed-tags");
  }, i(s, "htmlPrefilter", function(e2) {
    var t2, r2;
    return (r2 = (t2 = e2).replace(F, "<$1></$2>")) !== t2 && T(t2) !== T(r2) && u("self-closed-tags", "HTML tags must be properly nested and closed: " + t2), e2.replace(F, "<$1></$2>");
  }, "self-closed-tags"), s.migrateDisablePatches("self-closed-tags");
  var D, W, _, I = s.fn.offset;
  return i(s.fn, "offset", function() {
    var e2 = this[0];
    return !e2 || e2.nodeType && e2.getBoundingClientRect ? I.apply(this, arguments) : (u("offset-valid-elem", "jQuery.fn.offset() requires a valid DOM element"), arguments.length ? this : void 0);
  }, "offset-valid-elem"), s.ajax && (D = s.param, i(s, "param", function(e2, t2) {
    var r2 = s.ajaxSettings && s.ajaxSettings.traditional;
    return void 0 === t2 && r2 && (u("param-ajax-traditional", "jQuery.param() no longer uses jQuery.ajaxSettings.traditional"), t2 = r2), D.call(this, e2, t2);
  }, "param-ajax-traditional")), c(s.fn, "andSelf", s.fn.addBack, "andSelf", "jQuery.fn.andSelf() is deprecated and removed, use jQuery.fn.addBack()"), s.Deferred && (W = s.Deferred, _ = [["resolve", "done", s.Callbacks("once memory"), s.Callbacks("once memory"), "resolved"], ["reject", "fail", s.Callbacks("once memory"), s.Callbacks("once memory"), "rejected"], ["notify", "progress", s.Callbacks("memory"), s.Callbacks("memory")]], i(s, "Deferred", function(e2) {
    var a2 = W(), i2 = a2.promise();
    function t2() {
      var o2 = arguments;
      return s.Deferred(function(n2) {
        s.each(_, function(e3, t3) {
          var r2 = "function" == typeof o2[e3] && o2[e3];
          a2[t3[1]](function() {
            var e4 = r2 && r2.apply(this, arguments);
            e4 && "function" == typeof e4.promise ? e4.promise().done(n2.resolve).fail(n2.reject).progress(n2.notify) : n2[t3[0] + "With"](this === i2 ? n2.promise() : this, r2 ? [e4] : arguments);
          });
        }), o2 = null;
      }).promise();
    }
    return c(a2, "pipe", t2, "deferred-pipe", "deferred.pipe() is deprecated"), c(i2, "pipe", t2, "deferred-pipe", "deferred.pipe() is deprecated"), e2 && e2.call(a2, a2), a2;
  }, "deferred-pipe"), s.Deferred.exceptionHook = W.exceptionHook), s;
});
