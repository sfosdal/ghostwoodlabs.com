/*! jQuery UI - v1.14.2 - 2026-07-15
* https://jqueryui.com
* Includes: widget.js, position.js, data.js, disable-selection.js, focusable.js, form-reset-mixin.js, jquery-patch.js, keycode.js, labels.js, scroll-parent.js, tabbable.js, unique-id.js
* Copyright OpenJS Foundation and other contributors; Licensed MIT */
!(function(t) {
  "use strict";
  "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery);
})(function(x) {
  "use strict";
  x.ui = x.ui || {};
  x.ui.version = "1.14.2";
  /*!
   * jQuery UI Widget 1.14.2
   * https://jqueryui.com
   *
   * Copyright OpenJS Foundation and other contributors
   * Released under the MIT license.
   * https://jquery.org/license
   */
  var o, n, W, C, s, r, l, a, h, i, f = 0, c = Array.prototype.hasOwnProperty, u = Array.prototype.slice;
  x.cleanData = (o = x.cleanData, function(t2) {
    for (var e2, i2, n2 = 0; null != (i2 = t2[n2]); n2++) (e2 = x._data(i2, "events")) && e2.remove && x(i2).triggerHandler("remove");
    o(t2);
  }), x.widget = function(t2, i2, e2) {
    var n2, o2, s2, r2, l2 = {}, a2 = t2.split(".")[0];
    return "__proto__" === (t2 = t2.split(".")[1]) || "constructor" === t2 ? x.error("Invalid widget name: " + t2) : (r2 = a2 + "-" + t2, e2 || (e2 = i2, i2 = x.Widget), Array.isArray(e2) && (e2 = x.extend.apply(null, [{}].concat(e2))), x.expr.pseudos[r2.toLowerCase()] = function(t3) {
      return !!x.data(t3, r2);
    }, x[a2] = x[a2] || {}, n2 = x[a2][t2], o2 = x[a2][t2] = function(t3, e3) {
      if (!this || !this._createWidget) return new o2(t3, e3);
      arguments.length && this._createWidget(t3, e3);
    }, x.extend(o2, n2, { version: e2.version, _proto: x.extend({}, e2), _childConstructors: [] }), (s2 = new i2()).options = x.widget.extend({}, s2.options), x.each(e2, function(e3, n3) {
      function o3() {
        return i2.prototype[e3].apply(this, arguments);
      }
      function s3(t3) {
        return i2.prototype[e3].apply(this, t3);
      }
      l2[e3] = "function" != typeof n3 ? n3 : function() {
        var t3, e4 = this._super, i3 = this._superApply;
        return this._super = o3, this._superApply = s3, t3 = n3.apply(this, arguments), this._super = e4, this._superApply = i3, t3;
      };
    }), o2.prototype = x.widget.extend(s2, { widgetEventPrefix: n2 && s2.widgetEventPrefix || t2 }, l2, { constructor: o2, namespace: a2, widgetName: t2, widgetFullName: r2 }), n2 ? (x.each(n2._childConstructors, function(t3, e3) {
      var i3 = e3.prototype;
      x.widget(i3.namespace + "." + i3.widgetName, o2, e3._proto);
    }), delete n2._childConstructors) : i2._childConstructors.push(o2), x.widget.bridge(t2, o2), o2);
  }, x.widget.extend = function(t2) {
    for (var e2, i2, n2 = u.call(arguments, 1), o2 = 0, s2 = n2.length; o2 < s2; o2++) for (e2 in n2[o2]) i2 = n2[o2][e2], c.call(n2[o2], e2) && void 0 !== i2 && (x.isPlainObject(i2) ? t2[e2] = x.isPlainObject(t2[e2]) ? x.widget.extend({}, t2[e2], i2) : x.widget.extend({}, i2) : t2[e2] = i2);
    return t2;
  }, x.widget.bridge = function(s2, e2) {
    var r2 = e2.prototype.widgetFullName || s2;
    x.fn[s2] = function(i2) {
      var t2 = "string" == typeof i2, n2 = u.call(arguments, 1), o2 = this;
      return t2 ? this.length || "instance" !== i2 ? this.each(function() {
        var t3, e3 = x.data(this, r2);
        return "instance" === i2 ? (o2 = e3, false) : e3 ? "function" != typeof e3[i2] || "_" === i2.charAt(0) ? x.error("no such method '" + i2 + "' for " + s2 + " widget instance") : (t3 = e3[i2].apply(e3, n2)) !== e3 && void 0 !== t3 ? (o2 = t3 && t3.jquery ? o2.pushStack(t3.get()) : t3, false) : void 0 : x.error("cannot call methods on " + s2 + " prior to initialization; attempted to call method '" + i2 + "'");
      }) : o2 = void 0 : (n2.length && (i2 = x.widget.extend.apply(null, [i2].concat(n2))), this.each(function() {
        var t3 = x.data(this, r2);
        t3 ? (t3.option(i2 || {}), t3._init && t3._init()) : x.data(this, r2, new e2(i2, this));
      })), o2;
    };
  }, x.Widget = function() {
  }, x.Widget._childConstructors = [], x.Widget.prototype = { widgetName: "widget", widgetEventPrefix: "", defaultElement: "<div>", options: { classes: {}, disabled: false, create: null }, _createWidget: function(t2, e2) {
    e2 = x(e2 || this.defaultElement || this)[0], this.element = x(e2), this.uuid = f++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = x(), this.hoverable = x(), this.focusable = x(), this.classesElementLookup = {}, e2 !== this && (x.data(e2, this.widgetFullName, this), this._on(true, this.element, { remove: function(t3) {
      t3.target === e2 && this.destroy();
    } }), this.document = x(e2.style ? e2.ownerDocument : e2.document || e2), this.window = x(this.document[0].defaultView || this.document[0].parentWindow)), this.options = x.widget.extend({}, this.options, this._getCreateOptions(), t2), this._create(), this.options.disabled && this._setOptionDisabled(this.options.disabled), this._trigger("create", null, this._getCreateEventData()), this._init();
  }, _getCreateOptions: function() {
    return {};
  }, _getCreateEventData: x.noop, _create: x.noop, _init: x.noop, destroy: function() {
    var i2 = this;
    this._destroy(), x.each(this.classesElementLookup, function(t2, e2) {
      i2._removeClass(e2, t2);
    }), this.element.off(this.eventNamespace).removeData(this.widgetFullName), this.widget().off(this.eventNamespace).removeAttr("aria-disabled"), this.bindings.off(this.eventNamespace);
  }, _destroy: x.noop, widget: function() {
    return this.element;
  }, option: function(t2, e2) {
    var i2, n2, o2, s2 = t2;
    if (0 === arguments.length) return x.widget.extend({}, this.options);
    if ("string" == typeof t2) if (s2 = {}, t2 = (i2 = t2.split(".")).shift(), i2.length) {
      for (n2 = s2[t2] = x.widget.extend({}, this.options[t2]), o2 = 0; o2 < i2.length - 1; o2++) n2[i2[o2]] = n2[i2[o2]] || {}, n2 = n2[i2[o2]];
      if (t2 = i2.pop(), 1 === arguments.length) return void 0 === n2[t2] ? null : n2[t2];
      n2[t2] = e2;
    } else {
      if (1 === arguments.length) return void 0 === this.options[t2] ? null : this.options[t2];
      s2[t2] = e2;
    }
    return this._setOptions(s2), this;
  }, _setOptions: function(t2) {
    for (var e2 in t2) this._setOption(e2, t2[e2]);
    return this;
  }, _setOption: function(t2, e2) {
    return "classes" === t2 && this._setOptionClasses(e2), this.options[t2] = e2, "disabled" === t2 && this._setOptionDisabled(e2), this;
  }, _setOptionClasses: function(t2) {
    var e2, i2, n2;
    for (e2 in t2) n2 = this.classesElementLookup[e2], t2[e2] !== this.options.classes[e2] && n2 && n2.length && (i2 = x(n2.get()), this._removeClass(n2, e2), i2.addClass(this._classes({ element: i2, keys: e2, classes: t2, add: true })));
  }, _setOptionDisabled: function(t2) {
    this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !!t2), t2 && (this._removeClass(this.hoverable, null, "ui-state-hover"), this._removeClass(this.focusable, null, "ui-state-focus"));
  }, enable: function() {
    return this._setOptions({ disabled: false });
  }, disable: function() {
    return this._setOptions({ disabled: true });
  }, _classes: function(o2) {
    var s2 = [], r2 = this;
    function t2(t3, e2) {
      for (var i2, n2 = 0; n2 < t3.length; n2++) i2 = r2.classesElementLookup[t3[n2]] || x(), i2 = o2.add ? ((function() {
        var i3 = [];
        o2.element.each(function(t4, e3) {
          x.map(r2.classesElementLookup, function(t5) {
            return t5;
          }).some(function(t5) {
            return t5.is(e3);
          }) || i3.push(e3);
        }), r2._on(x(i3), { remove: "_untrackClassesElement" });
      })(), x(x.uniqueSort(i2.get().concat(o2.element.get())))) : x(i2.not(o2.element).get()), r2.classesElementLookup[t3[n2]] = i2, s2.push(t3[n2]), e2 && o2.classes[t3[n2]] && s2.push(o2.classes[t3[n2]]);
    }
    return (o2 = x.extend({ element: this.element, classes: this.options.classes || {} }, o2)).keys && t2(o2.keys.match(/\S+/g) || [], true), o2.extra && t2(o2.extra.match(/\S+/g) || []), s2.join(" ");
  }, _untrackClassesElement: function(i2) {
    var n2 = this;
    x.each(n2.classesElementLookup, function(t2, e2) {
      -1 !== x.inArray(i2.target, e2) && (n2.classesElementLookup[t2] = x(e2.not(i2.target).get()));
    }), this._off(x(i2.target));
  }, _removeClass: function(t2, e2, i2) {
    return this._toggleClass(t2, e2, i2, false);
  }, _addClass: function(t2, e2, i2) {
    return this._toggleClass(t2, e2, i2, true);
  }, _toggleClass: function(t2, e2, i2, n2) {
    var o2 = "string" == typeof t2 || null === t2, e2 = { extra: o2 ? e2 : i2, keys: o2 ? t2 : e2, element: o2 ? this.element : t2, add: n2 = "boolean" == typeof n2 ? n2 : i2 };
    return e2.element.toggleClass(this._classes(e2), n2), this;
  }, _on: function(o2, s2, t2) {
    var r2, l2 = this;
    "boolean" != typeof o2 && (t2 = s2, s2 = o2, o2 = false), t2 ? (s2 = r2 = x(s2), this.bindings = this.bindings.add(s2)) : (t2 = s2, s2 = this.element, r2 = this.widget()), x.each(t2, function(t3, e2) {
      function i2() {
        if (o2 || true !== l2.options.disabled && !x(this).hasClass("ui-state-disabled")) return ("string" == typeof e2 ? l2[e2] : e2).apply(l2, arguments);
      }
      "string" != typeof e2 && (i2.guid = e2.guid = e2.guid || i2.guid || x.guid++);
      var t3 = t3.match(/^([\w:-]*)\s*(.*)$/), n2 = t3[1] + l2.eventNamespace, t3 = t3[2];
      t3 ? r2.on(n2, t3, i2) : s2.on(n2, i2);
    });
  }, _off: function(t2, e2) {
    e2 = (e2 || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, t2.off(e2), this.bindings = x(this.bindings.not(t2).get()), this.focusable = x(this.focusable.not(t2).get()), this.hoverable = x(this.hoverable.not(t2).get());
  }, _delay: function(t2, e2) {
    var i2 = this;
    return setTimeout(function() {
      return ("string" == typeof t2 ? i2[t2] : t2).apply(i2, arguments);
    }, e2 || 0);
  }, _hoverable: function(t2) {
    this.hoverable = this.hoverable.add(t2), this._on(t2, { mouseenter: function(t3) {
      this._addClass(x(t3.currentTarget), null, "ui-state-hover");
    }, mouseleave: function(t3) {
      this._removeClass(x(t3.currentTarget), null, "ui-state-hover");
    } });
  }, _focusable: function(t2) {
    this.focusable = this.focusable.add(t2), this._on(t2, { focusin: function(t3) {
      this._addClass(x(t3.currentTarget), null, "ui-state-focus");
    }, focusout: function(t3) {
      this._removeClass(x(t3.currentTarget), null, "ui-state-focus");
    } });
  }, _trigger: function(t2, e2, i2) {
    var n2, o2, s2 = this.options[t2];
    if (i2 = i2 || {}, (e2 = x.Event(e2)).type = (t2 === this.widgetEventPrefix ? t2 : this.widgetEventPrefix + t2).toLowerCase(), e2.target = this.element[0], o2 = e2.originalEvent) for (n2 in o2) n2 in e2 || (e2[n2] = o2[n2]);
    return this.element.trigger(e2, i2), !("function" == typeof s2 && false === s2.apply(this.element[0], [e2].concat(i2)) || e2.isDefaultPrevented());
  } }, x.each({ show: "fadeIn", hide: "fadeOut" }, function(s2, r2) {
    x.Widget.prototype["_" + s2] = function(e2, t2, i2) {
      var n2, o2 = (t2 = "string" == typeof t2 ? { effect: t2 } : t2) ? true !== t2 && "number" != typeof t2 && t2.effect || r2 : s2;
      "number" == typeof (t2 = t2 || {}) ? t2 = { duration: t2 } : true === t2 && (t2 = {}), n2 = !x.isEmptyObject(t2), t2.complete = i2, t2.delay && e2.delay(t2.delay), n2 && x.effects && x.effects.effect[o2] ? e2[s2](t2) : o2 !== s2 && e2[o2] ? e2[o2](t2.duration, t2.easing, i2) : e2.queue(function(t3) {
        x(this)[s2](), i2 && i2.call(e2[0]), t3();
      });
    };
  }), x.widget;
  function E(t2, e2, i2) {
    return [parseFloat(t2[0]) * (h.test(t2[0]) ? e2 / 100 : 1), parseFloat(t2[1]) * (h.test(t2[1]) ? i2 / 100 : 1)];
  }
  function P(t2, e2) {
    return parseInt(x.css(t2, e2), 10) || 0;
  }
  function H(t2) {
    return null != t2 && t2 === t2.window;
  }
  /*!
   * jQuery UI Position 1.14.2
   * https://jqueryui.com
   *
   * Copyright OpenJS Foundation and other contributors
   * Released under the MIT license.
   * https://jquery.org/license
   *
   * https://api.jqueryui.com/position/
   */
  W = Math.max, C = Math.abs, s = /left|center|right/, r = /top|center|bottom/, l = /[\+\-]\d+(\.[\d]+)?%?/, a = /^\w+/, h = /%$/, i = x.fn.position, x.position = { scrollbarWidth: function() {
    var t2, e2, i2;
    return void 0 !== n ? n : (i2 = (e2 = x("<div style='display:block;position:absolute;width:200px;height:200px;overflow:hidden;'><div style='height:300px;width:auto;'></div></div>")).children()[0], x("body").append(e2), t2 = i2.offsetWidth, e2.css("overflow", "scroll"), t2 === (i2 = i2.offsetWidth) && (i2 = e2[0].clientWidth), e2.remove(), n = t2 - i2);
  }, getScrollInfo: function(t2) {
    var e2 = t2.isWindow || t2.isDocument ? "" : t2.element.css("overflow-x"), i2 = t2.isWindow || t2.isDocument ? "" : t2.element.css("overflow-y"), e2 = "scroll" === e2 || "auto" === e2 && t2.width < t2.element[0].scrollWidth;
    return { width: "scroll" === i2 || "auto" === i2 && t2.height < t2.element[0].scrollHeight ? x.position.scrollbarWidth() : 0, height: e2 ? x.position.scrollbarWidth() : 0 };
  }, getWithinInfo: function(t2) {
    var e2 = x(t2 || window), i2 = H(e2[0]), n2 = !!e2[0] && 9 === e2[0].nodeType;
    return { element: e2, isWindow: i2, isDocument: n2, offset: !i2 && !n2 ? x(t2).offset() : { left: 0, top: 0 }, scrollLeft: e2.scrollLeft(), scrollTop: e2.scrollTop(), width: e2.outerWidth(), height: e2.outerHeight() };
  } }, x.fn.position = function(c2) {
    var u2, d, p, g, m, v, w, y, b, _, t2, e2;
    return c2 && c2.of ? (v = "string" == typeof (c2 = x.extend({}, c2)).of ? x(document).find(c2.of) : x(c2.of), w = x.position.getWithinInfo(c2.within), y = x.position.getScrollInfo(w), b = (c2.collision || "flip").split(" "), _ = {}, e2 = 9 === (e2 = (t2 = v)[0]).nodeType ? { width: t2.width(), height: t2.height(), offset: { top: 0, left: 0 } } : H(e2) ? { width: t2.width(), height: t2.height(), offset: { top: t2.scrollTop(), left: t2.scrollLeft() } } : e2.preventDefault ? { width: 0, height: 0, offset: { top: e2.pageY, left: e2.pageX } } : { width: t2.outerWidth(), height: t2.outerHeight(), offset: t2.offset() }, v[0].preventDefault && (c2.at = "left top"), d = e2.width, p = e2.height, m = x.extend({}, g = e2.offset), x.each(["my", "at"], function() {
      var t3, e3, i2 = (c2[this] || "").split(" ");
      (i2 = 1 === i2.length ? s.test(i2[0]) ? i2.concat(["center"]) : r.test(i2[0]) ? ["center"].concat(i2) : ["center", "center"] : i2)[0] = s.test(i2[0]) ? i2[0] : "center", i2[1] = r.test(i2[1]) ? i2[1] : "center", t3 = l.exec(i2[0]), e3 = l.exec(i2[1]), _[this] = [t3 ? t3[0] : 0, e3 ? e3[0] : 0], c2[this] = [a.exec(i2[0])[0], a.exec(i2[1])[0]];
    }), 1 === b.length && (b[1] = b[0]), "right" === c2.at[0] ? m.left += d : "center" === c2.at[0] && (m.left += d / 2), "bottom" === c2.at[1] ? m.top += p : "center" === c2.at[1] && (m.top += p / 2), u2 = E(_.at, d, p), m.left += u2[0], m.top += u2[1], this.each(function() {
      var i2, t3, r2 = x(this), l2 = r2.outerWidth(), a2 = r2.outerHeight(), e3 = P(this, "marginLeft"), n2 = P(this, "marginTop"), o2 = l2 + e3 + P(this, "marginRight") + y.width, s2 = a2 + n2 + P(this, "marginBottom") + y.height, h2 = x.extend({}, m), f2 = E(_.my, r2.outerWidth(), r2.outerHeight());
      "right" === c2.my[0] ? h2.left -= l2 : "center" === c2.my[0] && (h2.left -= l2 / 2), "bottom" === c2.my[1] ? h2.top -= a2 : "center" === c2.my[1] && (h2.top -= a2 / 2), h2.left += f2[0], h2.top += f2[1], i2 = { marginLeft: e3, marginTop: n2 }, x.each(["left", "top"], function(t4, e4) {
        x.ui.position[b[t4]] && x.ui.position[b[t4]][e4](h2, { targetWidth: d, targetHeight: p, elemWidth: l2, elemHeight: a2, collisionPosition: i2, collisionWidth: o2, collisionHeight: s2, offset: [u2[0] + f2[0], u2[1] + f2[1]], my: c2.my, at: c2.at, within: w, elem: r2 });
      }), c2.using && (t3 = function(t4) {
        var e4 = g.left - h2.left, i3 = e4 + d - l2, n3 = g.top - h2.top, o3 = n3 + p - a2, s3 = { target: { element: v, left: g.left, top: g.top, width: d, height: p }, element: { element: r2, left: h2.left, top: h2.top, width: l2, height: a2 }, horizontal: i3 < 0 ? "left" : 0 < e4 ? "right" : "center", vertical: o3 < 0 ? "top" : 0 < n3 ? "bottom" : "middle" };
        d < l2 && C(e4 + i3) < d && (s3.horizontal = "center"), p < a2 && C(n3 + o3) < p && (s3.vertical = "middle"), W(C(e4), C(i3)) > W(C(n3), C(o3)) ? s3.important = "horizontal" : s3.important = "vertical", c2.using.call(this, t4, s3);
      }), r2.offset(x.extend(h2, { using: t3 }));
    })) : i.apply(this, arguments);
  }, x.ui.position = { fit: { left: function(t2, e2) {
    var i2, n2 = e2.within, o2 = n2.isWindow ? n2.scrollLeft : n2.offset.left, n2 = n2.width, s2 = t2.left - e2.collisionPosition.marginLeft, r2 = o2 - s2, l2 = s2 + e2.collisionWidth - n2 - o2;
    n2 < e2.collisionWidth ? 0 < r2 && l2 <= 0 ? (i2 = t2.left + r2 + e2.collisionWidth - n2 - o2, t2.left += r2 - i2) : t2.left = !(0 < l2 && r2 <= 0) && l2 < r2 ? o2 + n2 - e2.collisionWidth : o2 : 0 < r2 ? t2.left += r2 : 0 < l2 ? t2.left -= l2 : t2.left = W(t2.left - s2, t2.left);
  }, top: function(t2, e2) {
    var i2, n2 = e2.within, n2 = n2.isWindow ? n2.scrollTop : n2.offset.top, o2 = e2.within.height, s2 = t2.top - e2.collisionPosition.marginTop, r2 = n2 - s2, l2 = s2 + e2.collisionHeight - o2 - n2;
    o2 < e2.collisionHeight ? 0 < r2 && l2 <= 0 ? (i2 = t2.top + r2 + e2.collisionHeight - o2 - n2, t2.top += r2 - i2) : t2.top = !(0 < l2 && r2 <= 0) && l2 < r2 ? n2 + o2 - e2.collisionHeight : n2 : 0 < r2 ? t2.top += r2 : 0 < l2 ? t2.top -= l2 : t2.top = W(t2.top - s2, t2.top);
  } }, flip: { left: function(t2, e2) {
    var i2 = e2.within, n2 = i2.offset.left + i2.scrollLeft, o2 = i2.width, i2 = i2.isWindow ? i2.scrollLeft : i2.offset.left, s2 = t2.left - e2.collisionPosition.marginLeft, r2 = s2 - i2, s2 = s2 + e2.collisionWidth - o2 - i2, l2 = "left" === e2.my[0] ? -e2.elemWidth : "right" === e2.my[0] ? e2.elemWidth : 0, a2 = "left" === e2.at[0] ? e2.targetWidth : "right" === e2.at[0] ? -e2.targetWidth : 0, h2 = -2 * e2.offset[0];
    r2 < 0 ? ((o2 = t2.left + l2 + a2 + h2 + e2.collisionWidth - o2 - n2) < 0 || o2 < C(r2)) && (t2.left += l2 + a2 + h2) : 0 < s2 && (0 < (n2 = t2.left - e2.collisionPosition.marginLeft + l2 + a2 + h2 - i2) || C(n2) < s2) && (t2.left += l2 + a2 + h2);
  }, top: function(t2, e2) {
    var i2 = e2.within, n2 = i2.offset.top + i2.scrollTop, o2 = i2.height, i2 = i2.isWindow ? i2.scrollTop : i2.offset.top, s2 = t2.top - e2.collisionPosition.marginTop, r2 = s2 - i2, s2 = s2 + e2.collisionHeight - o2 - i2, l2 = "top" === e2.my[1] ? -e2.elemHeight : "bottom" === e2.my[1] ? e2.elemHeight : 0, a2 = "top" === e2.at[1] ? e2.targetHeight : "bottom" === e2.at[1] ? -e2.targetHeight : 0, h2 = -2 * e2.offset[1];
    r2 < 0 ? ((o2 = t2.top + l2 + a2 + h2 + e2.collisionHeight - o2 - n2) < 0 || o2 < C(r2)) && (t2.top += l2 + a2 + h2) : 0 < s2 && (0 < (n2 = t2.top - e2.collisionPosition.marginTop + l2 + a2 + h2 - i2) || C(n2) < s2) && (t2.top += l2 + a2 + h2);
  } }, flipfit: { left: function() {
    x.ui.position.flip.left.apply(this, arguments), x.ui.position.fit.left.apply(this, arguments);
  }, top: function() {
    x.ui.position.flip.top.apply(this, arguments), x.ui.position.fit.top.apply(this, arguments);
  } } };
  var t, e;
  /*!
   * jQuery UI :data 1.14.2
   * https://jqueryui.com
   *
   * Copyright OpenJS Foundation and other contributors
   * Released under the MIT license.
   * https://jquery.org/license
   */
  x.ui.position, x.extend(x.expr.pseudos, { data: x.expr.createPseudo(function(e2) {
    return function(t2) {
      return !!x.data(t2, e2);
    };
  }) }), x.fn.extend({ disableSelection: (t = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown", function() {
    return this.on(t + ".ui-disableSelection", function(t2) {
      t2.preventDefault();
    });
  }), enableSelection: function() {
    return this.off(".ui-disableSelection");
  } }), /*!
   * jQuery UI Focusable 1.14.2
   * https://jqueryui.com
   *
   * Copyright OpenJS Foundation and other contributors
   * Released under the MIT license.
   * https://jquery.org/license
   */
  x.ui.focusable = function(t2, e2) {
    var i2, n2, o2, s2 = t2.nodeName.toLowerCase();
    return "area" === s2 ? (o2 = (i2 = t2.parentNode).name, !(!t2.href || !o2 || "map" !== i2.nodeName.toLowerCase()) && 0 < (i2 = x("img[usemap='#" + o2 + "']")).length && i2.is(":visible")) : (/^(input|select|textarea|button|object)$/.test(s2) ? (n2 = !t2.disabled) && (o2 = x(t2).closest("fieldset")[0]) && (n2 = !o2.disabled) : n2 = "a" === s2 && t2.href || e2, n2 && x(t2).is(":visible") && "visible" === x(t2).css("visibility"));
  }, x.extend(x.expr.pseudos, { focusable: function(t2) {
    return x.ui.focusable(t2, null != x.attr(t2, "tabindex"));
  } }), x.ui.focusable, x.ui.formResetMixin = { _formResetHandler: function() {
    var e2 = x(this);
    setTimeout(function() {
      var t2 = e2.data("ui-form-reset-instances");
      x.each(t2, function() {
        this.refresh();
      });
    });
  }, _bindFormResetHandler: function() {
    var t2;
    this.form = x(this.element.prop("form")), this.form.length && ((t2 = this.form.data("ui-form-reset-instances") || []).length || this.form.on("reset.ui-form-reset", this._formResetHandler), t2.push(this), this.form.data("ui-form-reset-instances", t2));
  }, _unbindFormResetHandler: function() {
    var t2;
    this.form.length && ((t2 = this.form.data("ui-form-reset-instances")).splice(x.inArray(this, t2), 1), t2.length ? this.form.data("ui-form-reset-instances", t2) : this.form.removeData("ui-form-reset-instances").off("reset.ui-form-reset"));
  } }, /*!
   * jQuery UI Legacy jQuery Core patches 1.14.2
   * https://jqueryui.com
   *
   * Copyright OpenJS Foundation and other contributors
   * Released under the MIT license.
   * https://jquery.org/license
   *
   */
  x.escapeSelector || (x.escapeSelector = function(t2) {
    return CSS.escape(t2 + "");
  }), x.fn.even && x.fn.odd || x.fn.extend({ even: function() {
    return this.filter(function(t2) {
      return t2 % 2 == 0;
    });
  }, odd: function() {
    return this.filter(function(t2) {
      return t2 % 2 == 1;
    });
  } }), x.ui.keyCode = { BACKSPACE: 8, COMMA: 188, DELETE: 46, DOWN: 40, END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, LEFT: 37, PAGE_DOWN: 34, PAGE_UP: 33, PERIOD: 190, RIGHT: 39, SPACE: 32, TAB: 9, UP: 38 }, x.fn.labels = function() {
    var t2, e2, i2;
    return this.length ? this[0].labels && this[0].labels.length ? this.pushStack(this[0].labels) : (e2 = this.eq(0).parents("label"), (t2 = this.attr("id")) && (i2 = (i2 = this.eq(0).parents().last()).add((i2.length ? i2 : this).siblings()), t2 = "label[for='" + CSS.escape(t2) + "']", e2 = e2.add(i2.find(t2).addBack(t2))), this.pushStack(e2)) : this.pushStack([]);
  }, x.fn.scrollParent = function(t2) {
    var e2 = this.css("position"), i2 = "absolute" === e2, n2 = t2 ? /(auto|scroll|hidden)/ : /(auto|scroll)/, t2 = this.parents().filter(function() {
      var t3 = x(this);
      return (!i2 || "static" !== t3.css("position")) && n2.test(t3.css("overflow") + t3.css("overflow-y") + t3.css("overflow-x"));
    }).eq(0);
    return "fixed" !== e2 && t2.length ? t2 : x(this[0].ownerDocument || document);
  }, x.extend(x.expr.pseudos, { tabbable: function(t2) {
    var e2 = x.attr(t2, "tabindex"), i2 = null != e2;
    return (!i2 || 0 <= e2) && x.ui.focusable(t2, i2);
  } }), x.fn.extend({ uniqueId: (e = 0, function() {
    return this.each(function() {
      this.id || (this.id = "ui-id-" + ++e);
    });
  }), removeUniqueId: function() {
    return this.each(function() {
      /^ui-id-\d+$/.test(this.id) && x(this).removeAttr("id");
    });
  } });
  x.ui.plugin = { add: function(t2, e2, i2) {
    var n2, o2 = x.ui[t2].prototype;
    for (n2 in i2) o2.plugins[n2] = o2.plugins[n2] || [], o2.plugins[n2].push([e2, i2[n2]]);
  }, call: function(t2, e2, i2, n2) {
    var o2, s2 = t2.plugins[e2];
    if (s2 && (n2 || t2.element[0].parentNode && 11 !== t2.element[0].parentNode.nodeType)) for (o2 = 0; o2 < s2.length; o2++) t2.options[s2[o2][0]] && s2[o2][1].apply(t2.element, i2);
  } };
});
