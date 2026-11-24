var DateFormatter;
!(function() {
  "use strict";
  var e, t, a, r, n, o, i;
  o = 864e5, i = 3600, e = function(e2, t2) {
    return "string" == typeof e2 && "string" == typeof t2 && e2.toLowerCase() === t2.toLowerCase();
  }, t = function(e2, a2, r2) {
    var n2 = r2 || "0", o2 = e2.toString();
    return o2.length < a2 ? t(n2 + o2, a2) : o2;
  }, a = function(e2) {
    var t2, r2;
    for (e2 = e2 || {}, t2 = 1; t2 < arguments.length; t2++) if (r2 = arguments[t2]) for (var n2 in r2) r2.hasOwnProperty(n2) && ("object" == typeof r2[n2] ? a(e2[n2], r2[n2]) : e2[n2] = r2[n2]);
    return e2;
  }, r = function(e2, t2) {
    for (var a2 = 0; a2 < t2.length; a2++) if (t2[a2].toLowerCase() === e2.toLowerCase()) return a2;
    return -1;
  }, n = { dateSettings: { days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], meridiem: ["AM", "PM"], ordinal: function(e2) {
    var t2 = e2 % 10, a2 = { 1: "st", 2: "nd", 3: "rd" };
    return 1 !== Math.floor(e2 % 100 / 10) && a2[t2] ? a2[t2] : "th";
  } }, separators: /[ \-+\/\.T:@]/g, validParts: /[dDjlNSwzWFmMntLoYyaABgGhHisueTIOPZcrU]/g, intParts: /[djwNzmnyYhHgGis]/g, tzParts: /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g, tzClip: /[^-+\dA-Z]/g }, (DateFormatter = function(e2) {
    var t2 = this, r2 = a(n, e2);
    t2.dateSettings = r2.dateSettings, t2.separators = r2.separators, t2.validParts = r2.validParts, t2.intParts = r2.intParts, t2.tzParts = r2.tzParts, t2.tzClip = r2.tzClip;
  }).prototype = { constructor: DateFormatter, getMonth: function(e2) {
    var t2, a2 = this;
    return 0 === (t2 = r(e2, a2.dateSettings.monthsShort) + 1) && (t2 = r(e2, a2.dateSettings.months) + 1), t2;
  }, parseDate: function(t2, a2) {
    var r2, n2, o2, i2, s, u, d, l, f, c, m = this, h = false, g = false, p = m.dateSettings, D = { date: null, year: null, month: null, day: null, hour: 0, min: 0, sec: 0 };
    if (!t2) return null;
    if (t2 instanceof Date) return t2;
    if ("U" === a2) return (o2 = parseInt(t2)) ? new Date(1e3 * o2) : t2;
    switch (typeof t2) {
      case "number":
        return new Date(t2);
      case "string":
        break;
      default:
        return null;
    }
    if (!(r2 = a2.match(m.validParts)) || 0 === r2.length) throw new Error("Invalid date format definition.");
    for (n2 = t2.replace(m.separators, "\0").split("\0"), o2 = 0; o2 < n2.length; o2++) switch (i2 = n2[o2], s = parseInt(i2), r2[o2]) {
      case "y":
      case "Y":
        if (!s) return null;
        f = i2.length, D.year = 2 === f ? parseInt((70 > s ? "20" : "19") + i2) : s, h = true;
        break;
      case "m":
      case "n":
      case "M":
      case "F":
        if (isNaN(s)) {
          if (!((u = m.getMonth(i2)) > 0)) return null;
          D.month = u;
        } else {
          if (!(s >= 1 && 12 >= s)) return null;
          D.month = s;
        }
        h = true;
        break;
      case "d":
      case "j":
        if (!(s >= 1 && 31 >= s)) return null;
        D.day = s, h = true;
        break;
      case "g":
      case "h":
        if (d = r2.indexOf("a") > -1 ? r2.indexOf("a") : r2.indexOf("A") > -1 ? r2.indexOf("A") : -1, c = n2[d], d > -1) l = e(c, p.meridiem[0]) ? 0 : e(c, p.meridiem[1]) ? 12 : -1, s >= 1 && 12 >= s && l > -1 ? D.hour = s + l - 1 : s >= 0 && 23 >= s && (D.hour = s);
        else {
          if (!(s >= 0 && 23 >= s)) return null;
          D.hour = s;
        }
        g = true;
        break;
      case "G":
      case "H":
        if (!(s >= 0 && 23 >= s)) return null;
        D.hour = s, g = true;
        break;
      case "i":
        if (!(s >= 0 && 59 >= s)) return null;
        D.min = s, g = true;
        break;
      case "s":
        if (!(s >= 0 && 59 >= s)) return null;
        D.sec = s, g = true;
    }
    if (true === h && D.year && D.month && D.day) D.date = new Date(D.year, D.month - 1, D.day, D.hour, D.min, D.sec, 0);
    else {
      if (true !== g) return null;
      D.date = new Date(0, 0, 0, D.hour, D.min, D.sec, 0);
    }
    return D.date;
  }, guessDate: function(e2, t2) {
    if ("string" != typeof e2) return e2;
    var a2, r2, n2, o2, i2, s, u = this, d = e2.replace(u.separators, "\0").split("\0"), l = /^[djmn]/g, f = t2.match(u.validParts), c = new Date(), m = 0;
    if (!l.test(f[0])) return e2;
    for (n2 = 0; n2 < d.length; n2++) {
      if (m = 2, i2 = d[n2], s = parseInt(i2.substr(0, 2)), isNaN(s)) return null;
      switch (n2) {
        case 0:
          "m" === f[0] || "n" === f[0] ? c.setMonth(s - 1) : c.setDate(s);
          break;
        case 1:
          "m" === f[0] || "n" === f[0] ? c.setDate(s) : c.setMonth(s - 1);
          break;
        case 2:
          if (r2 = c.getFullYear(), a2 = i2.length, m = 4 > a2 ? a2 : 4, !(r2 = parseInt(4 > a2 ? r2.toString().substr(0, 4 - a2) + i2 : i2.substr(0, 4)))) return null;
          c.setFullYear(r2);
          break;
        case 3:
          c.setHours(s);
          break;
        case 4:
          c.setMinutes(s);
          break;
        case 5:
          c.setSeconds(s);
      }
      (o2 = i2.substr(m)).length > 0 && d.splice(n2 + 1, 0, o2);
    }
    return c;
  }, parseFormat: function(e2, a2) {
    var r2, n2 = this, s = n2.dateSettings, u = /\\?(.?)/gi, d = function(e3, t2) {
      return r2[e3] ? r2[e3]() : t2;
    };
    return r2 = { d: function() {
      return t(r2.j(), 2);
    }, D: function() {
      return s.daysShort[r2.w()];
    }, j: function() {
      return a2.getDate();
    }, l: function() {
      return s.days[r2.w()];
    }, N: function() {
      return r2.w() || 7;
    }, w: function() {
      return a2.getDay();
    }, z: function() {
      var e3 = new Date(r2.Y(), r2.n() - 1, r2.j()), t2 = new Date(r2.Y(), 0, 1);
      return Math.round((e3 - t2) / o);
    }, W: function() {
      var e3 = new Date(r2.Y(), r2.n() - 1, r2.j() - r2.N() + 3), a3 = new Date(e3.getFullYear(), 0, 4);
      return t(1 + Math.round((e3 - a3) / o / 7), 2);
    }, F: function() {
      return s.months[a2.getMonth()];
    }, m: function() {
      return t(r2.n(), 2);
    }, M: function() {
      return s.monthsShort[a2.getMonth()];
    }, n: function() {
      return a2.getMonth() + 1;
    }, t: function() {
      return new Date(r2.Y(), r2.n(), 0).getDate();
    }, L: function() {
      var e3 = r2.Y();
      return e3 % 4 == 0 && e3 % 100 != 0 || e3 % 400 == 0 ? 1 : 0;
    }, o: function() {
      var e3 = r2.n(), t2 = r2.W();
      return r2.Y() + (12 === e3 && 9 > t2 ? 1 : 1 === e3 && t2 > 9 ? -1 : 0);
    }, Y: function() {
      return a2.getFullYear();
    }, y: function() {
      return r2.Y().toString().slice(-2);
    }, a: function() {
      return r2.A().toLowerCase();
    }, A: function() {
      var e3 = r2.G() < 12 ? 0 : 1;
      return s.meridiem[e3];
    }, B: function() {
      var e3 = a2.getUTCHours() * i, r3 = 60 * a2.getUTCMinutes(), n3 = a2.getUTCSeconds();
      return t(Math.floor((e3 + r3 + n3 + i) / 86.4) % 1e3, 3);
    }, g: function() {
      return r2.G() % 12 || 12;
    }, G: function() {
      return a2.getHours();
    }, h: function() {
      return t(r2.g(), 2);
    }, H: function() {
      return t(r2.G(), 2);
    }, i: function() {
      return t(a2.getMinutes(), 2);
    }, s: function() {
      return t(a2.getSeconds(), 2);
    }, u: function() {
      return t(1e3 * a2.getMilliseconds(), 6);
    }, e: function() {
      return /\((.*)\)/.exec(String(a2))[1] || "Coordinated Universal Time";
    }, I: function() {
      return new Date(r2.Y(), 0) - Date.UTC(r2.Y(), 0) != new Date(r2.Y(), 6) - Date.UTC(r2.Y(), 6) ? 1 : 0;
    }, O: function() {
      var e3 = a2.getTimezoneOffset(), r3 = Math.abs(e3);
      return (e3 > 0 ? "-" : "+") + t(100 * Math.floor(r3 / 60) + r3 % 60, 4);
    }, P: function() {
      var e3 = r2.O();
      return e3.substr(0, 3) + ":" + e3.substr(3, 2);
    }, T: function() {
      return (String(a2).match(n2.tzParts) || [""]).pop().replace(n2.tzClip, "") || "UTC";
    }, Z: function() {
      return 60 * -a2.getTimezoneOffset();
    }, c: function() {
      return "Y-m-d\\TH:i:sP".replace(u, d);
    }, r: function() {
      return "D, d M Y H:i:s O".replace(u, d);
    }, U: function() {
      return a2.getTime() / 1e3 || 0;
    } }, d(e2, e2);
  }, formatDate: function(e2, t2) {
    var a2, r2, n2, o2, i2, s = this, u = "";
    if ("string" == typeof e2 && !(e2 = s.parseDate(e2, t2))) return null;
    if (e2 instanceof Date) {
      for (n2 = t2.length, a2 = 0; n2 > a2; a2++) "S" !== (i2 = t2.charAt(a2)) && "\\" !== i2 && (a2 > 0 && "\\" === t2.charAt(a2 - 1) ? u += i2 : (o2 = s.parseFormat(i2, e2), a2 !== n2 - 1 && s.intParts.test(i2) && "S" === t2.charAt(a2 + 1) && (r2 = parseInt(o2) || 0, o2 += s.dateSettings.ordinal(r2)), u += o2));
      return u;
    }
    return "";
  } };
})();
var datetimepickerFactory = function(e) {
  "use strict";
  function t(e2, t2, a2) {
    this.date = e2, this.desc = t2, this.style = a2;
  }
  var a = { i18n: { ar: { months: ["ÙƒØ§Ù†ÙˆÙ† Ø§Ù„Ø«Ø§Ù†ÙŠ", "Ø´Ø¨Ø§Ø·", "Ø¢Ø°Ø§Ø±", "Ù†ÙŠØ³Ø§Ù†", "Ù…Ø§ÙŠÙˆ", "Ø­Ø²ÙŠØ±Ø§Ù†", "ØªÙ…ÙˆØ²", "Ø¢Ø¨", "Ø£ÙŠÙ„ÙˆÙ„", "ØªØ´Ø±ÙŠÙ† Ø§Ù„Ø£ÙˆÙ„", "ØªØ´Ø±ÙŠÙ† Ø§Ù„Ø«Ø§Ù†ÙŠ", "ÙƒØ§Ù†ÙˆÙ† Ø§Ù„Ø£ÙˆÙ„"], dayOfWeekShort: ["Ù†", "Ø«", "Ø¹", "Ø®", "Ø¬", "Ø³", "Ø­"], dayOfWeek: ["Ø§Ù„Ø£Ø­Ø¯", "Ø§Ù„Ø§Ø«Ù†ÙŠÙ†", "Ø§Ù„Ø«Ù„Ø§Ø«Ø§Ø¡", "Ø§Ù„Ø£Ø±Ø¨Ø¹Ø§Ø¡", "Ø§Ù„Ø®Ù…ÙŠØ³", "Ø§Ù„Ø¬Ù…Ø¹Ø©", "Ø§Ù„Ø³Ø¨Øª", "Ø§Ù„Ø£Ø­Ø¯"] }, ro: { months: ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"], dayOfWeekShort: ["Du", "Lu", "Ma", "Mi", "Jo", "Vi", "SÃ¢"], dayOfWeek: ["DuminicÄƒ", "Luni", "MarÅ£i", "Miercuri", "Joi", "Vineri", "SÃ¢mbÄƒtÄƒ"] }, id: { months: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"], dayOfWeekShort: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"], dayOfWeek: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"] }, is: { months: ["JanÃºar", "FebrÃºar", "Mars", "AprÃ­l", "MaÃ­", "JÃºnÃ­", "JÃºlÃ­", "ÃgÃºst", "September", "OktÃ³ber", "NÃ³vember", "Desember"], dayOfWeekShort: ["Sun", "MÃ¡n", "ÃžriÃ°", "MiÃ°", "Fim", "FÃ¶s", "Lau"], dayOfWeek: ["Sunnudagur", "MÃ¡nudagur", "ÃžriÃ°judagur", "MiÃ°vikudagur", "Fimmtudagur", "FÃ¶studagur", "Laugardagur"] }, bg: { months: ["Ð¯Ð½ÑƒÐ°Ñ€Ð¸", "Ð¤ÐµÐ²Ñ€ÑƒÐ°Ñ€Ð¸", "ÐœÐ°Ñ€Ñ‚", "ÐÐ¿Ñ€Ð¸Ð»", "ÐœÐ°Ð¹", "Ð®Ð½Ð¸", "Ð®Ð»Ð¸", "ÐÐ²Ð³ÑƒÑÑ‚", "Ð¡ÐµÐ¿Ñ‚ÐµÐ¼Ð²Ñ€Ð¸", "ÐžÐºÑ‚Ð¾Ð¼Ð²Ñ€Ð¸", "ÐÐ¾ÐµÐ¼Ð²Ñ€Ð¸", "Ð”ÐµÐºÐµÐ¼Ð²Ñ€Ð¸"], dayOfWeekShort: ["ÐÐ´", "ÐŸÐ½", "Ð’Ñ‚", "Ð¡Ñ€", "Ð§Ñ‚", "ÐŸÑ‚", "Ð¡Ð±"], dayOfWeek: ["ÐÐµÐ´ÐµÐ»Ñ", "ÐŸÐ¾Ð½ÐµÐ´ÐµÐ»Ð½Ð¸Ðº", "Ð’Ñ‚Ð¾Ñ€Ð½Ð¸Ðº", "Ð¡Ñ€ÑÐ´Ð°", "Ð§ÐµÑ‚Ð²ÑŠÑ€Ñ‚ÑŠÐº", "ÐŸÐµÑ‚ÑŠÐº", "Ð¡ÑŠÐ±Ð¾Ñ‚Ð°"] }, fa: { months: ["ÙØ±ÙˆØ±Ø¯ÛŒÙ†", "Ø§Ø±Ø¯ÛŒØ¨Ù‡Ø´Øª", "Ø®Ø±Ø¯Ø§Ø¯", "ØªÛŒØ±", "Ù…Ø±Ø¯Ø§Ø¯", "Ø´Ù‡Ø±ÛŒÙˆØ±", "Ù…Ù‡Ø±", "Ø¢Ø¨Ø§Ù†", "Ø¢Ø°Ø±", "Ø¯ÛŒ", "Ø¨Ù‡Ù…Ù†", "Ø§Ø³ÙÙ†Ø¯"], dayOfWeekShort: ["ÛŒÚ©Ø´Ù†Ø¨Ù‡", "Ø¯ÙˆØ´Ù†Ø¨Ù‡", "Ø³Ù‡ Ø´Ù†Ø¨Ù‡", "Ú†Ù‡Ø§Ø±Ø´Ù†Ø¨Ù‡", "Ù¾Ù†Ø¬Ø´Ù†Ø¨Ù‡", "Ø¬Ù…Ø¹Ù‡", "Ø´Ù†Ø¨Ù‡"], dayOfWeek: ["ÛŒÚ©â€ŒØ´Ù†Ø¨Ù‡", "Ø¯ÙˆØ´Ù†Ø¨Ù‡", "Ø³Ù‡â€ŒØ´Ù†Ø¨Ù‡", "Ú†Ù‡Ø§Ø±Ø´Ù†Ø¨Ù‡", "Ù¾Ù†Ø¬â€ŒØ´Ù†Ø¨Ù‡", "Ø¬Ù…Ø¹Ù‡", "Ø´Ù†Ø¨Ù‡", "ÛŒÚ©â€ŒØ´Ù†Ø¨Ù‡"] }, ru: { months: ["Ð¯Ð½Ð²Ð°Ñ€ÑŒ", "Ð¤ÐµÐ²Ñ€Ð°Ð»ÑŒ", "ÐœÐ°Ñ€Ñ‚", "ÐÐ¿Ñ€ÐµÐ»ÑŒ", "ÐœÐ°Ð¹", "Ð˜ÑŽÐ½ÑŒ", "Ð˜ÑŽÐ»ÑŒ", "ÐÐ²Ð³ÑƒÑÑ‚", "Ð¡ÐµÐ½Ñ‚ÑÐ±Ñ€ÑŒ", "ÐžÐºÑ‚ÑÐ±Ñ€ÑŒ", "ÐÐ¾ÑÐ±Ñ€ÑŒ", "Ð”ÐµÐºÐ°Ð±Ñ€ÑŒ"], dayOfWeekShort: ["Ð’Ñ", "ÐŸÐ½", "Ð’Ñ‚", "Ð¡Ñ€", "Ð§Ñ‚", "ÐŸÑ‚", "Ð¡Ð±"], dayOfWeek: ["Ð’Ð¾ÑÐºÑ€ÐµÑÐµÐ½ÑŒÐµ", "ÐŸÐ¾Ð½ÐµÐ´ÐµÐ»ÑŒÐ½Ð¸Ðº", "Ð’Ñ‚Ð¾Ñ€Ð½Ð¸Ðº", "Ð¡Ñ€ÐµÐ´Ð°", "Ð§ÐµÑ‚Ð²ÐµÑ€Ð³", "ÐŸÑÑ‚Ð½Ð¸Ñ†Ð°", "Ð¡ÑƒÐ±Ð±Ð¾Ñ‚Ð°"] }, uk: { months: ["Ð¡Ñ–Ñ‡ÐµÐ½ÑŒ", "Ð›ÑŽÑ‚Ð¸Ð¹", "Ð‘ÐµÑ€ÐµÐ·ÐµÐ½ÑŒ", "ÐšÐ²Ñ–Ñ‚ÐµÐ½ÑŒ", "Ð¢Ñ€Ð°Ð²ÐµÐ½ÑŒ", "Ð§ÐµÑ€Ð²ÐµÐ½ÑŒ", "Ð›Ð¸Ð¿ÐµÐ½ÑŒ", "Ð¡ÐµÑ€Ð¿ÐµÐ½ÑŒ", "Ð’ÐµÑ€ÐµÑÐµÐ½ÑŒ", "Ð–Ð¾Ð²Ñ‚ÐµÐ½ÑŒ", "Ð›Ð¸ÑÑ‚Ð¾Ð¿Ð°Ð´", "Ð“Ñ€ÑƒÐ´ÐµÐ½ÑŒ"], dayOfWeekShort: ["ÐÐ´Ð»", "ÐŸÐ½Ð´", "Ð’Ñ‚Ñ€", "Ð¡Ñ€Ð´", "Ð§Ñ‚Ð²", "ÐŸÑ‚Ð½", "Ð¡Ð±Ñ‚"], dayOfWeek: ["ÐÐµÐ´Ñ–Ð»Ñ", "ÐŸÐ¾Ð½ÐµÐ´Ñ–Ð»Ð¾Ðº", "Ð’Ñ–Ð²Ñ‚Ð¾Ñ€Ð¾Ðº", "Ð¡ÐµÑ€ÐµÐ´Ð°", "Ð§ÐµÑ‚Ð²ÐµÑ€", "ÐŸ'ÑÑ‚Ð½Ð¸Ñ†Ñ", "Ð¡ÑƒÐ±Ð¾Ñ‚Ð°"] }, en: { months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], dayOfWeekShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] }, el: { months: ["Î™Î±Î½Î¿Ï…Î¬ÏÎ¹Î¿Ï‚", "Î¦ÎµÎ²ÏÎ¿Ï…Î¬ÏÎ¹Î¿Ï‚", "ÎœÎ¬ÏÏ„Î¹Î¿Ï‚", "Î‘Ï€ÏÎ¯Î»Î¹Î¿Ï‚", "ÎœÎ¬Î¹Î¿Ï‚", "Î™Î¿ÏÎ½Î¹Î¿Ï‚", "Î™Î¿ÏÎ»Î¹Î¿Ï‚", "Î‘ÏÎ³Î¿Ï…ÏƒÏ„Î¿Ï‚", "Î£ÎµÏ€Ï„Î­Î¼Î²ÏÎ¹Î¿Ï‚", "ÎŸÎºÏ„ÏŽÎ²ÏÎ¹Î¿Ï‚", "ÎÎ¿Î­Î¼Î²ÏÎ¹Î¿Ï‚", "Î”ÎµÎºÎ­Î¼Î²ÏÎ¹Î¿Ï‚"], dayOfWeekShort: ["ÎšÏ…Ï", "Î”ÎµÏ…", "Î¤ÏÎ¹", "Î¤ÎµÏ„", "Î ÎµÎ¼", "Î Î±Ï", "Î£Î±Î²"], dayOfWeek: ["ÎšÏ…ÏÎ¹Î±ÎºÎ®", "Î”ÎµÏ…Ï„Î­ÏÎ±", "Î¤ÏÎ¯Ï„Î·", "Î¤ÎµÏ„Î¬ÏÏ„Î·", "Î Î­Î¼Ï€Ï„Î·", "Î Î±ÏÎ±ÏƒÎºÎµÏ…Î®", "Î£Î¬Î²Î²Î±Ï„Î¿"] }, de: { months: ["Januar", "Februar", "MÃ¤rz", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"], dayOfWeekShort: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"], dayOfWeek: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"] }, nl: { months: ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"], dayOfWeekShort: ["zo", "ma", "di", "wo", "do", "vr", "za"], dayOfWeek: ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"] }, tr: { months: ["Ocak", "Åžubat", "Mart", "Nisan", "MayÄ±s", "Haziran", "Temmuz", "AÄŸustos", "EylÃ¼l", "Ekim", "KasÄ±m", "AralÄ±k"], dayOfWeekShort: ["Paz", "Pts", "Sal", "Ã‡ar", "Per", "Cum", "Cts"], dayOfWeek: ["Pazar", "Pazartesi", "SalÄ±", "Ã‡arÅŸamba", "PerÅŸembe", "Cuma", "Cumartesi"] }, fr: { months: ["Janvier", "FÃ©vrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "AoÃ»t", "Septembre", "Octobre", "Novembre", "DÃ©cembre"], dayOfWeekShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"], dayOfWeek: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"] }, es: { months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"], dayOfWeekShort: ["Dom", "Lun", "Mar", "MiÃ©", "Jue", "Vie", "SÃ¡b"], dayOfWeek: ["Domingo", "Lunes", "Martes", "MiÃ©rcoles", "Jueves", "Viernes", "SÃ¡bado"] }, th: { months: ["à¸¡à¸à¸£à¸²à¸„à¸¡", "à¸à¸¸à¸¡à¸ à¸²à¸žà¸±à¸™à¸˜à¹Œ", "à¸¡à¸µà¸™à¸²à¸„à¸¡", "à¹€à¸¡à¸©à¸²à¸¢à¸™", "à¸žà¸¤à¸©à¸ à¸²à¸„à¸¡", "à¸¡à¸´à¸–à¸¸à¸™à¸²à¸¢à¸™", "à¸à¸£à¸à¸Žà¸²à¸„à¸¡", "à¸ªà¸´à¸‡à¸«à¸²à¸„à¸¡", "à¸à¸±à¸™à¸¢à¸²à¸¢à¸™", "à¸•à¸¸à¸¥à¸²à¸„à¸¡", "à¸žà¸¤à¸¨à¸ˆà¸´à¸à¸²à¸¢à¸™", "à¸˜à¸±à¸™à¸§à¸²à¸„à¸¡"], dayOfWeekShort: ["à¸­à¸².", "à¸ˆ.", "à¸­.", "à¸ž.", "à¸žà¸¤.", "à¸¨.", "à¸ª."], dayOfWeek: ["à¸­à¸²à¸—à¸´à¸•à¸¢à¹Œ", "à¸ˆà¸±à¸™à¸—à¸£à¹Œ", "à¸­à¸±à¸‡à¸„à¸²à¸£", "à¸žà¸¸à¸˜", "à¸žà¸¤à¸«à¸±à¸ª", "à¸¨à¸¸à¸à¸£à¹Œ", "à¹€à¸ªà¸²à¸£à¹Œ", "à¸­à¸²à¸—à¸´à¸•à¸¢à¹Œ"] }, pl: { months: ["styczeÅ„", "luty", "marzec", "kwiecieÅ„", "maj", "czerwiec", "lipiec", "sierpieÅ„", "wrzesieÅ„", "paÅºdziernik", "listopad", "grudzieÅ„"], dayOfWeekShort: ["nd", "pn", "wt", "Å›r", "cz", "pt", "sb"], dayOfWeek: ["niedziela", "poniedziaÅ‚ek", "wtorek", "Å›roda", "czwartek", "piÄ…tek", "sobota"] }, pt: { months: ["Janeiro", "Fevereiro", "MarÃ§o", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"], dayOfWeekShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"], dayOfWeek: ["Domingo", "Segunda", "TerÃ§a", "Quarta", "Quinta", "Sexta", "SÃ¡bado"] }, ch: { months: ["ä¸€æœˆ", "äºŒæœˆ", "ä¸‰æœˆ", "å››æœˆ", "äº”æœˆ", "å…­æœˆ", "ä¸ƒæœˆ", "å…«æœˆ", "ä¹æœˆ", "åæœˆ", "åä¸€æœˆ", "åäºŒæœˆ"], dayOfWeekShort: ["æ—¥", "ä¸€", "äºŒ", "ä¸‰", "å››", "äº”", "å…­"] }, se: { months: ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"], dayOfWeekShort: ["SÃ¶n", "MÃ¥n", "Tis", "Ons", "Tor", "Fre", "LÃ¶r"] }, km: { months: ["áž˜áž€ážšáž¶â€‹", "áž€áž»áž˜áŸ’áž—áŸˆ", "áž˜áž·áž“áž¶â€‹", "áž˜áŸážŸáž¶â€‹", "áž§ážŸáž—áž¶â€‹", "áž˜áž·ážáž»áž“áž¶â€‹", "áž€áž€áŸ’áž€ážŠáž¶â€‹", "ážŸáž¸áž áž¶â€‹", "áž€áž‰áŸ’áž‰áž¶â€‹", "ážáž»áž›áž¶â€‹", "ážœáž·áž…áŸ’áž†áž·áž€áž¶", "áž’áŸ’áž“áž¼â€‹"], dayOfWeekShort: ["áž¢áž¶áž‘áž·â€‹", "áž…áŸáž“áŸ’áž‘â€‹", "áž¢áž„áŸ’áž‚áž¶ážšâ€‹", "áž–áž»áž’â€‹", "áž–áŸ’ážšáž â€‹â€‹", "ážŸáž»áž€áŸ’ážšâ€‹", "ážŸáŸ…ážšáŸ"], dayOfWeek: ["áž¢áž¶áž‘áž·ážáŸ’áž™â€‹", "áž…áŸáž“áŸ’áž‘â€‹", "áž¢áž„áŸ’áž‚áž¶ážšâ€‹", "áž–áž»áž’â€‹", "áž–áŸ’ážšáž ážŸáŸ’áž”ážáž·áŸâ€‹", "ážŸáž»áž€áŸ’ážšâ€‹", "ážŸáŸ…ážšáŸ"] }, kr: { months: ["1ì›”", "2ì›”", "3ì›”", "4ì›”", "5ì›”", "6ì›”", "7ì›”", "8ì›”", "9ì›”", "10ì›”", "11ì›”", "12ì›”"], dayOfWeekShort: ["ì¼", "ì›”", "í™”", "ìˆ˜", "ëª©", "ê¸ˆ", "í† "], dayOfWeek: ["ì¼ìš”ì¼", "ì›”ìš”ì¼", "í™”ìš”ì¼", "ìˆ˜ìš”ì¼", "ëª©ìš”ì¼", "ê¸ˆìš”ì¼", "í† ìš”ì¼"] }, it: { months: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"], dayOfWeekShort: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"], dayOfWeek: ["Domenica", "LunedÃ¬", "MartedÃ¬", "MercoledÃ¬", "GiovedÃ¬", "VenerdÃ¬", "Sabato"] }, da: { months: ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"], dayOfWeekShort: ["SÃ¸n", "Man", "Tir", "Ons", "Tor", "Fre", "LÃ¸r"], dayOfWeek: ["sÃ¸ndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lÃ¸rdag"] }, no: { months: ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"], dayOfWeekShort: ["SÃ¸n", "Man", "Tir", "Ons", "Tor", "Fre", "LÃ¸r"], dayOfWeek: ["SÃ¸ndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "LÃ¸rdag"] }, ja: { months: ["1æœˆ", "2æœˆ", "3æœˆ", "4æœˆ", "5æœˆ", "6æœˆ", "7æœˆ", "8æœˆ", "9æœˆ", "10æœˆ", "11æœˆ", "12æœˆ"], dayOfWeekShort: ["æ—¥", "æœˆ", "ç«", "æ°´", "æœ¨", "é‡‘", "åœŸ"], dayOfWeek: ["æ—¥æ›œ", "æœˆæ›œ", "ç«æ›œ", "æ°´æ›œ", "æœ¨æ›œ", "é‡‘æ›œ", "åœŸæ›œ"] }, vi: { months: ["ThÃ¡ng 1", "ThÃ¡ng 2", "ThÃ¡ng 3", "ThÃ¡ng 4", "ThÃ¡ng 5", "ThÃ¡ng 6", "ThÃ¡ng 7", "ThÃ¡ng 8", "ThÃ¡ng 9", "ThÃ¡ng 10", "ThÃ¡ng 11", "ThÃ¡ng 12"], dayOfWeekShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"], dayOfWeek: ["Chá»§ nháº­t", "Thá»© hai", "Thá»© ba", "Thá»© tÆ°", "Thá»© nÄƒm", "Thá»© sÃ¡u", "Thá»© báº£y"] }, sl: { months: ["Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December"], dayOfWeekShort: ["Ned", "Pon", "Tor", "Sre", "ÄŒet", "Pet", "Sob"], dayOfWeek: ["Nedelja", "Ponedeljek", "Torek", "Sreda", "ÄŒetrtek", "Petek", "Sobota"] }, cs: { months: ["Leden", "Ãšnor", "BÅ™ezen", "Duben", "KvÄ›ten", "ÄŒerven", "ÄŒervenec", "Srpen", "ZÃ¡Å™Ã­", "Å˜Ã­jen", "Listopad", "Prosinec"], dayOfWeekShort: ["Ne", "Po", "Ãšt", "St", "ÄŒt", "PÃ¡", "So"] }, hu: { months: ["JanuÃ¡r", "FebruÃ¡r", "MÃ¡rcius", "Ãprilis", "MÃ¡jus", "JÃºnius", "JÃºlius", "Augusztus", "Szeptember", "OktÃ³ber", "November", "December"], dayOfWeekShort: ["Va", "HÃ©", "Ke", "Sze", "Cs", "PÃ©", "Szo"], dayOfWeek: ["vasÃ¡rnap", "hÃ©tfÅ‘", "kedd", "szerda", "csÃ¼tÃ¶rtÃ¶k", "pÃ©ntek", "szombat"] }, az: { months: ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"], dayOfWeekShort: ["B", "Be", "Ã‡a", "Ã‡", "Ca", "C", "Åž"], dayOfWeek: ["Bazar", "Bazar ertÉ™si", "Ã‡É™rÅŸÉ™nbÉ™ axÅŸamÄ±", "Ã‡É™rÅŸÉ™nbÉ™", "CÃ¼mÉ™ axÅŸamÄ±", "CÃ¼mÉ™", "ÅžÉ™nbÉ™"] }, bs: { months: ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"], dayOfWeekShort: ["Ned", "Pon", "Uto", "Sri", "ÄŒet", "Pet", "Sub"], dayOfWeek: ["Nedjelja", "Ponedjeljak", "Utorak", "Srijeda", "ÄŒetvrtak", "Petak", "Subota"] }, ca: { months: ["Gener", "Febrer", "MarÃ§", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"], dayOfWeekShort: ["Dg", "Dl", "Dt", "Dc", "Dj", "Dv", "Ds"], dayOfWeek: ["Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte"] }, "en-GB": { months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], dayOfWeekShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] }, et: { months: ["Jaanuar", "Veebruar", "MÃ¤rts", "Aprill", "Mai", "Juuni", "Juuli", "August", "September", "Oktoober", "November", "Detsember"], dayOfWeekShort: ["P", "E", "T", "K", "N", "R", "L"], dayOfWeek: ["PÃ¼hapÃ¤ev", "EsmaspÃ¤ev", "TeisipÃ¤ev", "KolmapÃ¤ev", "NeljapÃ¤ev", "Reede", "LaupÃ¤ev"] }, eu: { months: ["Urtarrila", "Otsaila", "Martxoa", "Apirila", "Maiatza", "Ekaina", "Uztaila", "Abuztua", "Iraila", "Urria", "Azaroa", "Abendua"], dayOfWeekShort: ["Ig.", "Al.", "Ar.", "Az.", "Og.", "Or.", "La."], dayOfWeek: ["Igandea", "Astelehena", "Asteartea", "Asteazkena", "Osteguna", "Ostirala", "Larunbata"] }, fi: { months: ["Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "KesÃ¤kuu", "HeinÃ¤kuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"], dayOfWeekShort: ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"], dayOfWeek: ["sunnuntai", "maanantai", "tiistai", "keskiviikko", "torstai", "perjantai", "lauantai"] }, gl: { months: ["Xan", "Feb", "Maz", "Abr", "Mai", "Xun", "Xul", "Ago", "Set", "Out", "Nov", "Dec"], dayOfWeekShort: ["Dom", "Lun", "Mar", "Mer", "Xov", "Ven", "Sab"], dayOfWeek: ["Domingo", "Luns", "Martes", "MÃ©rcores", "Xoves", "Venres", "SÃ¡bado"] }, hr: { months: ["SijeÄanj", "VeljaÄa", "OÅ¾ujak", "Travanj", "Svibanj", "Lipanj", "Srpanj", "Kolovoz", "Rujan", "Listopad", "Studeni", "Prosinac"], dayOfWeekShort: ["Ned", "Pon", "Uto", "Sri", "ÄŒet", "Pet", "Sub"], dayOfWeek: ["Nedjelja", "Ponedjeljak", "Utorak", "Srijeda", "ÄŒetvrtak", "Petak", "Subota"] }, ko: { months: ["1ì›”", "2ì›”", "3ì›”", "4ì›”", "5ì›”", "6ì›”", "7ì›”", "8ì›”", "9ì›”", "10ì›”", "11ì›”", "12ì›”"], dayOfWeekShort: ["ì¼", "ì›”", "í™”", "ìˆ˜", "ëª©", "ê¸ˆ", "í† "], dayOfWeek: ["ì¼ìš”ì¼", "ì›”ìš”ì¼", "í™”ìš”ì¼", "ìˆ˜ìš”ì¼", "ëª©ìš”ì¼", "ê¸ˆìš”ì¼", "í† ìš”ì¼"] }, lt: { months: ["Sausio", "Vasario", "Kovo", "BalandÅ¾io", "GeguÅ¾Ä—s", "BirÅ¾elio", "Liepos", "RugpjÅ«Äio", "RugsÄ—jo", "Spalio", "LapkriÄio", "GruodÅ¾io"], dayOfWeekShort: ["Sek", "Pir", "Ant", "Tre", "Ket", "Pen", "Å eÅ¡"], dayOfWeek: ["Sekmadienis", "Pirmadienis", "Antradienis", "TreÄiadienis", "Ketvirtadienis", "Penktadienis", "Å eÅ¡tadienis"] }, lv: { months: ["JanvÄris", "FebruÄris", "Marts", "AprÄ«lis ", "Maijs", "JÅ«nijs", "JÅ«lijs", "Augusts", "Septembris", "Oktobris", "Novembris", "Decembris"], dayOfWeekShort: ["Sv", "Pr", "Ot", "Tr", "Ct", "Pk", "St"], dayOfWeek: ["SvÄ“tdiena", "Pirmdiena", "Otrdiena", "TreÅ¡diena", "Ceturtdiena", "Piektdiena", "Sestdiena"] }, mk: { months: ["Ñ˜Ð°Ð½ÑƒÐ°Ñ€Ð¸", "Ñ„ÐµÐ²Ñ€ÑƒÐ°Ñ€Ð¸", "Ð¼Ð°Ñ€Ñ‚", "Ð°Ð¿Ñ€Ð¸Ð»", "Ð¼Ð°Ñ˜", "Ñ˜ÑƒÐ½Ð¸", "Ñ˜ÑƒÐ»Ð¸", "Ð°Ð²Ð³ÑƒÑÑ‚", "ÑÐµÐ¿Ñ‚ÐµÐ¼Ð²Ñ€Ð¸", "Ð¾ÐºÑ‚Ð¾Ð¼Ð²Ñ€Ð¸", "Ð½Ð¾ÐµÐ¼Ð²Ñ€Ð¸", "Ð´ÐµÐºÐµÐ¼Ð²Ñ€Ð¸"], dayOfWeekShort: ["Ð½ÐµÐ´", "Ð¿Ð¾Ð½", "Ð²Ñ‚Ð¾", "ÑÑ€Ðµ", "Ñ‡ÐµÑ‚", "Ð¿ÐµÑ‚", "ÑÐ°Ð±"], dayOfWeek: ["ÐÐµÐ´ÐµÐ»Ð°", "ÐŸÐ¾Ð½ÐµÐ´ÐµÐ»Ð½Ð¸Ðº", "Ð’Ñ‚Ð¾Ñ€Ð½Ð¸Ðº", "Ð¡Ñ€ÐµÐ´Ð°", "Ð§ÐµÑ‚Ð²Ñ€Ñ‚Ð¾Ðº", "ÐŸÐµÑ‚Ð¾Ðº", "Ð¡Ð°Ð±Ð¾Ñ‚Ð°"] }, mn: { months: ["1-Ñ€ ÑÐ°Ñ€", "2-Ñ€ ÑÐ°Ñ€", "3-Ñ€ ÑÐ°Ñ€", "4-Ñ€ ÑÐ°Ñ€", "5-Ñ€ ÑÐ°Ñ€", "6-Ñ€ ÑÐ°Ñ€", "7-Ñ€ ÑÐ°Ñ€", "8-Ñ€ ÑÐ°Ñ€", "9-Ñ€ ÑÐ°Ñ€", "10-Ñ€ ÑÐ°Ñ€", "11-Ñ€ ÑÐ°Ñ€", "12-Ñ€ ÑÐ°Ñ€"], dayOfWeekShort: ["Ð”Ð°Ð²", "ÐœÑÐ³", "Ð›Ñ…Ð°", "ÐŸÒ¯Ñ€", "Ð‘ÑÐ½", "Ð‘ÑÐ¼", "ÐÑÐ¼"], dayOfWeek: ["Ð”Ð°Ð²Ð°Ð°", "ÐœÑÐ³Ð¼Ð°Ñ€", "Ð›Ñ…Ð°Ð³Ð²Ð°", "ÐŸÒ¯Ñ€ÑÐ²", "Ð‘Ð°Ð°ÑÐ°Ð½", "Ð‘ÑÐ¼Ð±Ð°", "ÐÑÐ¼"] }, "pt-BR": { months: ["Janeiro", "Fevereiro", "MarÃ§o", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"], dayOfWeekShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "SÃ¡b"], dayOfWeek: ["Domingo", "Segunda", "TerÃ§a", "Quarta", "Quinta", "Sexta", "SÃ¡bado"] }, sk: { months: ["JanuÃ¡r", "FebruÃ¡r", "Marec", "AprÃ­l", "MÃ¡j", "JÃºn", "JÃºl", "August", "September", "OktÃ³ber", "November", "December"], dayOfWeekShort: ["Ne", "Po", "Ut", "St", "Å t", "Pi", "So"], dayOfWeek: ["NedeÄ¾a", "Pondelok", "Utorok", "Streda", "Å tvrtok", "Piatok", "Sobota"] }, sq: { months: ["Janar", "Shkurt", "Mars", "Prill", "Maj", "Qershor", "Korrik", "Gusht", "Shtator", "Tetor", "NÃ«ntor", "Dhjetor"], dayOfWeekShort: ["Die", "HÃ«n", "Mar", "MÃ«r", "Enj", "Pre", "Shtu"], dayOfWeek: ["E Diel", "E HÃ«nÃ«", "E MartÄ“", "E MÃ«rkurÃ«", "E Enjte", "E Premte", "E ShtunÃ«"] }, "sr-YU": { months: ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"], dayOfWeekShort: ["Ned", "Pon", "Uto", "Sre", "Äet", "Pet", "Sub"], dayOfWeek: ["Nedelja", "Ponedeljak", "Utorak", "Sreda", "ÄŒetvrtak", "Petak", "Subota"] }, sr: { months: ["Ñ˜Ð°Ð½ÑƒÐ°Ñ€", "Ñ„ÐµÐ±Ñ€ÑƒÐ°Ñ€", "Ð¼Ð°Ñ€Ñ‚", "Ð°Ð¿Ñ€Ð¸Ð»", "Ð¼Ð°Ñ˜", "Ñ˜ÑƒÐ½", "Ñ˜ÑƒÐ»", "Ð°Ð²Ð³ÑƒÑÑ‚", "ÑÐµÐ¿Ñ‚ÐµÐ¼Ð±Ð°Ñ€", "Ð¾ÐºÑ‚Ð¾Ð±Ð°Ñ€", "Ð½Ð¾Ð²ÐµÐ¼Ð±Ð°Ñ€", "Ð´ÐµÑ†ÐµÐ¼Ð±Ð°Ñ€"], dayOfWeekShort: ["Ð½ÐµÐ´", "Ð¿Ð¾Ð½", "ÑƒÑ‚Ð¾", "ÑÑ€Ðµ", "Ñ‡ÐµÑ‚", "Ð¿ÐµÑ‚", "ÑÑƒÐ±"], dayOfWeek: ["ÐÐµÐ´ÐµÑ™Ð°", "ÐŸÐ¾Ð½ÐµÐ´ÐµÑ™Ð°Ðº", "Ð£Ñ‚Ð¾Ñ€Ð°Ðº", "Ð¡Ñ€ÐµÐ´Ð°", "Ð§ÐµÑ‚Ð²Ñ€Ñ‚Ð°Ðº", "ÐŸÐµÑ‚Ð°Ðº", "Ð¡ÑƒÐ±Ð¾Ñ‚Ð°"] }, sv: { months: ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"], dayOfWeekShort: ["SÃ¶n", "MÃ¥n", "Tis", "Ons", "Tor", "Fre", "LÃ¶r"], dayOfWeek: ["SÃ¶ndag", "MÃ¥ndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "LÃ¶rdag"] }, "zh-TW": { months: ["ä¸€æœˆ", "äºŒæœˆ", "ä¸‰æœˆ", "å››æœˆ", "äº”æœˆ", "å…­æœˆ", "ä¸ƒæœˆ", "å…«æœˆ", "ä¹æœˆ", "åæœˆ", "åä¸€æœˆ", "åäºŒæœˆ"], dayOfWeekShort: ["æ—¥", "ä¸€", "äºŒ", "ä¸‰", "å››", "äº”", "å…­"], dayOfWeek: ["æ˜ŸæœŸæ—¥", "æ˜ŸæœŸä¸€", "æ˜ŸæœŸäºŒ", "æ˜ŸæœŸä¸‰", "æ˜ŸæœŸå››", "æ˜ŸæœŸäº”", "æ˜ŸæœŸå…­"] }, zh: { months: ["ä¸€æœˆ", "äºŒæœˆ", "ä¸‰æœˆ", "å››æœˆ", "äº”æœˆ", "å…­æœˆ", "ä¸ƒæœˆ", "å…«æœˆ", "ä¹æœˆ", "åæœˆ", "åä¸€æœˆ", "åäºŒæœˆ"], dayOfWeekShort: ["æ—¥", "ä¸€", "äºŒ", "ä¸‰", "å››", "äº”", "å…­"], dayOfWeek: ["æ˜ŸæœŸæ—¥", "æ˜ŸæœŸä¸€", "æ˜ŸæœŸäºŒ", "æ˜ŸæœŸä¸‰", "æ˜ŸæœŸå››", "æ˜ŸæœŸäº”", "æ˜ŸæœŸå…­"] }, ug: { months: ["1-Ø¦Ø§ÙŠ", "2-Ø¦Ø§ÙŠ", "3-Ø¦Ø§ÙŠ", "4-Ø¦Ø§ÙŠ", "5-Ø¦Ø§ÙŠ", "6-Ø¦Ø§ÙŠ", "7-Ø¦Ø§ÙŠ", "8-Ø¦Ø§ÙŠ", "9-Ø¦Ø§ÙŠ", "10-Ø¦Ø§ÙŠ", "11-Ø¦Ø§ÙŠ", "12-Ø¦Ø§ÙŠ"], dayOfWeek: ["ÙŠÛ•ÙƒØ´Û•Ù†Ø¨Û•", "Ø¯ÛˆØ´Û•Ù†Ø¨Û•", "Ø³Û•ÙŠØ´Û•Ù†Ø¨Û•", "Ú†Ø§Ø±Ø´Û•Ù†Ø¨Û•", "Ù¾Û•ÙŠØ´Û•Ù†Ø¨Û•", "Ø¬ÛˆÙ…Û•", "Ø´Û•Ù†Ø¨Û•"] }, he: { months: ["×™× ×•××¨", "×¤×‘×¨×•××¨", "×ž×¨×¥", "××¤×¨×™×œ", "×ž××™", "×™×•× ×™", "×™×•×œ×™", "××•×’×•×¡×˜", "×¡×¤×˜×ž×‘×¨", "××•×§×˜×•×‘×¨", "× ×•×‘×ž×‘×¨", "×“×¦×ž×‘×¨"], dayOfWeekShort: ["×'", "×‘'", "×’'", "×“'", "×”'", "×•'", "×©×‘×ª"], dayOfWeek: ["×¨××©×•×Ÿ", "×©× ×™", "×©×œ×™×©×™", "×¨×‘×™×¢×™", "×—×ž×™×©×™", "×©×™×©×™", "×©×‘×ª", "×¨××©×•×Ÿ"] }, hy: { months: ["Õ€Õ¸Ö‚Õ¶Õ¾Õ¡Ö€", "Õ“Õ¥Õ¿Ö€Õ¾Õ¡Ö€", "Õ„Õ¡Ö€Õ¿", "Ô±ÕºÖ€Õ«Õ¬", "Õ„Õ¡ÕµÕ«Õ½", "Õ€Õ¸Ö‚Õ¶Õ«Õ½", "Õ€Õ¸Ö‚Õ¬Õ«Õ½", "Õ•Õ£Õ¸Õ½Õ¿Õ¸Õ½", "ÕÕ¥ÕºÕ¿Õ¥Õ´Õ¢Õ¥Ö€", "Õ€Õ¸Õ¯Õ¿Õ¥Õ´Õ¢Õ¥Ö€", "Õ†Õ¸ÕµÕ¥Õ´Õ¢Õ¥Ö€", "Ô´Õ¥Õ¯Õ¿Õ¥Õ´Õ¢Õ¥Ö€"], dayOfWeekShort: ["Ô¿Õ«", "ÔµÖ€Õ¯", "ÔµÖ€Ö„", "Õ‰Õ¸Ö€", "Õ€Õ¶Õ£", "ÕˆÖ‚Ö€Õ¢", "Õ‡Õ¢Õ©"], dayOfWeek: ["Ô¿Õ«Ö€Õ¡Õ¯Õ«", "ÔµÖ€Õ¯Õ¸Ö‚Õ·Õ¡Õ¢Õ©Õ«", "ÔµÖ€Õ¥Ö„Õ·Õ¡Õ¢Õ©Õ«", "Õ‰Õ¸Ö€Õ¥Ö„Õ·Õ¡Õ¢Õ©Õ«", "Õ€Õ«Õ¶Õ£Õ·Õ¡Õ¢Õ©Õ«", "ÕˆÖ‚Ö€Õ¢Õ¡Õ©", "Õ‡Õ¡Õ¢Õ¡Õ©"] }, kg: { months: ["Ò®Ñ‡Ñ‚Ò¯Ð½ Ð°Ð¹Ñ‹", "Ð‘Ð¸Ñ€Ð´Ð¸Ð½ Ð°Ð¹Ñ‹", "Ð–Ð°Ð»Ð³Ð°Ð½ ÐšÑƒÑ€Ð°Ð½", "Ð§Ñ‹Ð½ ÐšÑƒÑ€Ð°Ð½", "Ð‘ÑƒÐ³Ñƒ", "ÐšÑƒÐ»Ð¶Ð°", "Ð¢ÐµÐºÐµ", "Ð‘Ð°Ñˆ ÐžÐ¾Ð½Ð°", "ÐÑÐº ÐžÐ¾Ð½Ð°", "Ð¢Ð¾Ð³ÑƒÐ·Ð´ÑƒÐ½ Ð°Ð¹Ñ‹", "Ð–ÐµÑ‚Ð¸Ð½Ð¸Ð½ Ð°Ð¹Ñ‹", "Ð‘ÐµÑˆÑ‚Ð¸Ð½ Ð°Ð¹Ñ‹"], dayOfWeekShort: ["Ð–ÐµÐº", "Ð”Ò¯Ð¹", "Ð¨ÐµÐ¹", "Ð¨Ð°Ñ€", "Ð‘ÐµÐ¹", "Ð–ÑƒÐ¼", "Ð˜ÑˆÐµ"], dayOfWeek: ["Ð–ÐµÐºÑˆÐµÐ¼Ð±", "Ð”Ò¯Ð¹ÑˆÓ©Ð¼Ð±", "Ð¨ÐµÐ¹ÑˆÐµÐ¼Ð±", "Ð¨Ð°Ñ€ÑˆÐµÐ¼Ð±", "Ð‘ÐµÐ¹ÑˆÐµÐ¼Ð±Ð¸", "Ð–ÑƒÐ¼Ð°", "Ð˜ÑˆÐµÐ½Ð±"] }, rm: { months: ["Schaner", "Favrer", "Mars", "Avrigl", "Matg", "Zercladur", "Fanadur", "Avust", "Settember", "October", "November", "December"], dayOfWeekShort: ["Du", "Gli", "Ma", "Me", "Gie", "Ve", "So"], dayOfWeek: ["Dumengia", "Glindesdi", "Mardi", "Mesemna", "Gievgia", "Venderdi", "Sonda"] }, ka: { months: ["áƒ˜áƒáƒœáƒ•áƒáƒ áƒ˜", "áƒ—áƒ”áƒ‘áƒ”áƒ áƒ•áƒáƒšáƒ˜", "áƒ›áƒáƒ áƒ¢áƒ˜", "áƒáƒžáƒ áƒ˜áƒšáƒ˜", "áƒ›áƒáƒ˜áƒ¡áƒ˜", "áƒ˜áƒ•áƒœáƒ˜áƒ¡áƒ˜", "áƒ˜áƒ•áƒšáƒ˜áƒ¡áƒ˜", "áƒáƒ’áƒ•áƒ˜áƒ¡áƒ¢áƒ", "áƒ¡áƒ”áƒ¥áƒ¢áƒ”áƒ›áƒ‘áƒ”áƒ áƒ˜", "áƒáƒ¥áƒ¢áƒáƒ›áƒ‘áƒ”áƒ áƒ˜", "áƒœáƒáƒ”áƒ›áƒ‘áƒ”áƒ áƒ˜", "áƒ“áƒ”áƒ™áƒ”áƒ›áƒ‘áƒ”áƒ áƒ˜"], dayOfWeekShort: ["áƒ™áƒ•", "áƒáƒ áƒ¨", "áƒ¡áƒáƒ›áƒ¨", "áƒáƒ—áƒ®", "áƒ®áƒ£áƒ—", "áƒžáƒáƒ ", "áƒ¨áƒáƒ‘"], dayOfWeek: ["áƒ™áƒ•áƒ˜áƒ áƒ", "áƒáƒ áƒ¨áƒáƒ‘áƒáƒ—áƒ˜", "áƒ¡áƒáƒ›áƒ¨áƒáƒ‘áƒáƒ—áƒ˜", "áƒáƒ—áƒ®áƒ¨áƒáƒ‘áƒáƒ—áƒ˜", "áƒ®áƒ£áƒ—áƒ¨áƒáƒ‘áƒáƒ—áƒ˜", "áƒžáƒáƒ áƒáƒ¡áƒ™áƒ”áƒ•áƒ˜", "áƒ¨áƒáƒ‘áƒáƒ—áƒ˜"] } }, ownerDocument: document, contentWindow: window, value: "", rtl: false, format: "Y/m/d H:i", formatTime: "H:i", formatDate: "Y/m/d", startDate: false, step: 60, monthChangeSpinner: true, closeOnDateSelect: false, closeOnTimeSelect: true, closeOnWithoutClick: true, closeOnInputClick: true, openOnFocus: true, timepicker: true, datepicker: true, weeks: false, defaultTime: false, defaultDate: false, minDate: false, maxDate: false, minTime: false, maxTime: false, minDateTime: false, maxDateTime: false, allowTimes: [], opened: false, initTime: true, inline: false, theme: "", touchMovedThreshold: 5, onSelectDate: function() {
  }, onSelectTime: function() {
  }, onChangeMonth: function() {
  }, onGetWeekOfYear: function() {
  }, onChangeYear: function() {
  }, onChangeDateTime: function() {
  }, onShow: function() {
  }, onClose: function() {
  }, onGenerate: function() {
  }, withoutCopyright: true, inverseButton: false, hours12: false, next: "xdsoft_next", prev: "xdsoft_prev", dayOfWeekStart: 0, parentID: "body", timeHeightInTimePicker: 25, timepickerScrollbar: true, todayButton: true, prevButton: true, nextButton: true, defaultSelect: true, scrollMonth: true, scrollTime: true, scrollInput: true, lazyInit: false, mask: false, validateOnBlur: true, allowBlank: true, yearStart: 1950, yearEnd: 2050, monthStart: 0, monthEnd: 11, style: "", id: "", fixed: false, roundTime: "round", className: "", weekends: [], highlightedDates: [], highlightedPeriods: [], allowDates: [], allowDateRe: null, disabledDates: [], disabledWeekDays: [], yearOffset: 0, beforeShowDay: null, enterLikeTab: true, showApplyButton: false }, r = null, n = null, o = "en", i = { meridiem: ["AM", "PM"] }, s = function() {
    var t2 = a.i18n[o], s2 = { days: t2.dayOfWeek, daysShort: t2.dayOfWeekShort, months: t2.months, monthsShort: e.map(t2.months, function(e2) {
      return e2.substring(0, 3);
    }) };
    "function" == typeof DateFormatter && (r = n = new DateFormatter({ dateSettings: e.extend({}, i, s2) }));
  }, u = { moment: { default_options: { format: "YYYY/MM/DD HH:mm", formatDate: "YYYY/MM/DD", formatTime: "HH:mm" }, formatter: { parseDate: function(e2, t2) {
    if (l(t2)) return n.parseDate(e2, t2);
    var a2 = moment(e2, t2);
    return !!a2.isValid() && a2.toDate();
  }, formatDate: function(e2, t2) {
    return l(t2) ? n.formatDate(e2, t2) : moment(e2).format(t2);
  }, formatMask: function(e2) {
    return e2.replace(/Y{4}/g, "9999").replace(/Y{2}/g, "99").replace(/M{2}/g, "19").replace(/D{2}/g, "39").replace(/H{2}/g, "29").replace(/m{2}/g, "59").replace(/s{2}/g, "59");
  } } } };
  e.datetimepicker = { setLocale: function(e2) {
    var t2 = a.i18n[e2] ? e2 : "en";
    o !== t2 && (o = t2, s());
  }, setDateFormatter: function(t2) {
    if ("string" == typeof t2 && u.hasOwnProperty(t2)) {
      var n2 = u[t2];
      e.extend(a, n2.default_options), r = n2.formatter;
    } else r = t2;
  } };
  var d = { RFC_2822: "D, d M Y H:i:s O", ATOM: "Y-m-dTH:i:sP", ISO_8601: "Y-m-dTH:i:sO", RFC_822: "D, d M y H:i:s O", RFC_850: "l, d-M-y H:i:s T", RFC_1036: "D, d M y H:i:s O", RFC_1123: "D, d M Y H:i:s O", RSS: "D, d M Y H:i:s O", W3C: "Y-m-dTH:i:sP" }, l = function(e2) {
    return -1 !== Object.values(d).indexOf(e2);
  };
  e.extend(e.datetimepicker, d), s(), window.getComputedStyle || (window.getComputedStyle = function(e2) {
    return this.el = e2, this.getPropertyValue = function(t2) {
      var a2 = /(-([a-z]))/g;
      return "float" === t2 && (t2 = "styleFloat"), a2.test(t2) && (t2 = t2.replace(a2, function(e3, t3, a3) {
        return a3.toUpperCase();
      })), e2.currentStyle[t2] || null;
    }, this;
  }), Array.prototype.indexOf || (Array.prototype.indexOf = function(e2, t2) {
    var a2, r2;
    for (a2 = t2 || 0, r2 = this.length; a2 < r2; a2 += 1) if (this[a2] === e2) return a2;
    return -1;
  }), Date.prototype.countDaysInMonth = function() {
    return new Date(this.getFullYear(), this.getMonth() + 1, 0).getDate();
  }, e.fn.xdsoftScroller = function(t2, a2) {
    return this.each(function() {
      var r2, n2, o2, i2, s2, u2 = e(this), d2 = function(e2) {
        var t3, a3 = { x: 0, y: 0 };
        return "touchstart" === e2.type || "touchmove" === e2.type || "touchend" === e2.type || "touchcancel" === e2.type ? (t3 = e2.originalEvent.touches[0] || e2.originalEvent.changedTouches[0], a3.x = t3.clientX, a3.y = t3.clientY) : "mousedown" !== e2.type && "mouseup" !== e2.type && "mousemove" !== e2.type && "mouseover" !== e2.type && "mouseout" !== e2.type && "mouseenter" !== e2.type && "mouseleave" !== e2.type || (a3.x = e2.clientX, a3.y = e2.clientY), a3;
      }, l2 = 100, f = false, c = 0, m = 0, h = 0, g = false, p = 0, D = function() {
      };
      "hide" !== a2 ? (e(this).hasClass("xdsoft_scroller_box") || (r2 = u2.children().eq(0), n2 = u2[0].clientHeight, o2 = r2[0].offsetHeight, i2 = e('<div class="xdsoft_scrollbar"></div>'), s2 = e('<div class="xdsoft_scroller"></div>'), i2.append(s2), u2.addClass("xdsoft_scroller_box").append(i2), D = function(e2) {
        var t3 = d2(e2).y - c + p;
        t3 < 0 && (t3 = 0), t3 + s2[0].offsetHeight > h && (t3 = h - s2[0].offsetHeight), u2.trigger("scroll_element.xdsoft_scroller", [l2 ? t3 / l2 : 0]);
      }, s2.on("touchstart.xdsoft_scroller mousedown.xdsoft_scroller", function(r3) {
        n2 || u2.trigger("resize_scroll.xdsoft_scroller", [a2]), c = d2(r3).y, p = parseInt(s2.css("margin-top"), 10), h = i2[0].offsetHeight, "mousedown" === r3.type || "touchstart" === r3.type ? (t2.ownerDocument && e(t2.ownerDocument.body).addClass("xdsoft_noselect"), e([t2.ownerDocument.body, t2.contentWindow]).on("touchend mouseup.xdsoft_scroller", function a3() {
          e([t2.ownerDocument.body, t2.contentWindow]).off("touchend mouseup.xdsoft_scroller", a3).off("mousemove.xdsoft_scroller", D).removeClass("xdsoft_noselect");
        }), e(t2.ownerDocument.body).on("mousemove.xdsoft_scroller", D)) : (g = true, r3.stopPropagation(), r3.preventDefault());
      }).on("touchmove", function(e2) {
        g && (e2.preventDefault(), D(e2));
      }).on("touchend touchcancel", function() {
        g = false, p = 0;
      }), u2.on("scroll_element.xdsoft_scroller", function(e2, t3) {
        n2 || u2.trigger("resize_scroll.xdsoft_scroller", [t3, true]), t3 = t3 > 1 ? 1 : t3 < 0 || isNaN(t3) ? 0 : t3, s2.css("margin-top", l2 * t3), setTimeout(function() {
          r2.css("marginTop", -parseInt((r2[0].offsetHeight - n2) * t3, 10));
        }, 10);
      }).on("resize_scroll.xdsoft_scroller", function(e2, t3, a3) {
        var d3, f2;
        n2 = u2[0].clientHeight, o2 = r2[0].offsetHeight, f2 = (d3 = n2 / o2) * i2[0].offsetHeight, d3 > 1 ? s2.hide() : (s2.show(), s2.css("height", parseInt(f2 > 10 ? f2 : 10, 10)), l2 = i2[0].offsetHeight - s2[0].offsetHeight, true !== a3 && u2.trigger("scroll_element.xdsoft_scroller", [t3 || Math.abs(parseInt(r2.css("marginTop"), 10)) / (o2 - n2)]));
      }), u2.on("mousewheel", function(e2) {
        var t3 = Math.abs(parseInt(r2.css("marginTop"), 10));
        return (t3 -= 20 * e2.deltaY) < 0 && (t3 = 0), u2.trigger("scroll_element.xdsoft_scroller", [t3 / (o2 - n2)]), e2.stopPropagation(), false;
      }), u2.on("touchstart", function(e2) {
        f = d2(e2), m = Math.abs(parseInt(r2.css("marginTop"), 10));
      }), u2.on("touchmove", function(e2) {
        if (f) {
          e2.preventDefault();
          var t3 = d2(e2);
          u2.trigger("scroll_element.xdsoft_scroller", [(m - (t3.y - f.y)) / (o2 - n2)]);
        }
      }), u2.on("touchend touchcancel", function() {
        f = false, m = 0;
      })), u2.trigger("resize_scroll.xdsoft_scroller", [a2])) : u2.find(".xdsoft_scrollbar").hide();
    });
  }, e.fn.datetimepicker = function(n2, i2) {
    var s2, u2, d2 = this, l2 = 48, f = 57, c = 96, m = 105, h = 17, g = 46, p = 13, D = 27, v = 8, y = 37, b = 38, k = 39, x = 40, T = 9, S = 116, M = 65, w = 67, O = 86, W = 90, _ = 89, F = false, C = e.isPlainObject(n2) || !n2 ? e.extend(true, {}, a, n2) : e.extend(true, {}, a), P = 0, Y = function(e2) {
      e2.on("open.xdsoft focusin.xdsoft mousedown.xdsoft touchstart", function t2() {
        e2.is(":disabled") || e2.data("xdsoft_datetimepicker") || (clearTimeout(P), P = setTimeout(function() {
          e2.data("xdsoft_datetimepicker") || s2(e2), e2.off("open.xdsoft focusin.xdsoft mousedown.xdsoft touchstart", t2).trigger("open.xdsoft");
        }, 100));
      });
    };
    return s2 = function(a2) {
      function i3() {
        var e2, t2 = false;
        return C.startDate ? t2 = A.strToDate(C.startDate) : (t2 = C.value || (a2 && a2.val && a2.val() ? a2.val() : "")) ? (t2 = A.strToDateTime(t2), C.yearOffset && (t2 = new Date(t2.getFullYear() - C.yearOffset, t2.getMonth(), t2.getDate(), t2.getHours(), t2.getMinutes(), t2.getSeconds(), t2.getMilliseconds()))) : C.defaultDate && (t2 = A.strToDateTime(C.defaultDate), C.defaultTime && (e2 = A.strtotime(C.defaultTime), t2.setHours(e2.getHours()), t2.setMinutes(e2.getMinutes()))), t2 && A.isValidDate(t2) ? j.data("changed", true) : t2 = "", t2 || 0;
      }
      function s3(t2) {
        var n3 = function(e2, t3) {
          var a3 = e2.replace(/([\[\]\/\{\}\(\)\-\.\+]{1})/g, "\\$1").replace(/_/g, "{digit+}").replace(/([0-9]{1})/g, "{digit$1}").replace(/\{digit([0-9]{1})\}/g, "[0-$1_]{1}").replace(/\{digit[\+]\}/g, "[0-9_]{1}");
          return new RegExp(a3).test(t3);
        }, o2 = function(e2, a3) {
          if (!(e2 = "string" == typeof e2 || e2 instanceof String ? t2.ownerDocument.getElementById(e2) : e2)) return false;
          if (e2.createTextRange) {
            var r2 = e2.createTextRange();
            return r2.collapse(true), r2.moveEnd("character", a3), r2.moveStart("character", a3), r2.select(), true;
          }
          return !!e2.setSelectionRange && (e2.setSelectionRange(a3, a3), true);
        };
        t2.mask && a2.off("keydown.xdsoft"), true === t2.mask && (r.formatMask ? t2.mask = r.formatMask(t2.format) : t2.mask = t2.format.replace(/Y/g, "9999").replace(/F/g, "9999").replace(/m/g, "19").replace(/d/g, "39").replace(/H/g, "29").replace(/i/g, "59").replace(/s/g, "59")), "string" === e.type(t2.mask) && (n3(t2.mask, a2.val()) || (a2.val(t2.mask.replace(/[0-9]/g, "_")), o2(a2[0], 0)), a2.on("paste.xdsoft", function(r2) {
          var i4 = (r2.clipboardData || r2.originalEvent.clipboardData || window.clipboardData).getData("text"), s4 = this.value, u4 = this.selectionStart;
          return s4 = s4.substr(0, u4) + i4 + s4.substr(u4 + i4.length), u4 += i4.length, n3(t2.mask, s4) ? (this.value = s4, o2(this, u4)) : "" === e.trim(s4) ? this.value = t2.mask.replace(/[0-9]/g, "_") : a2.trigger("error_input.xdsoft"), r2.preventDefault(), false;
        }), a2.on("keydown.xdsoft", function(r2) {
          var i4, s4 = this.value, u4 = r2.which, d4 = this.selectionStart, C2 = this.selectionEnd, P3 = d4 !== C2;
          if (u4 >= l2 && u4 <= f || u4 >= c && u4 <= m || u4 === v || u4 === g) {
            for (i4 = u4 === v || u4 === g ? "_" : String.fromCharCode(c <= u4 && u4 <= m ? u4 - l2 : u4), u4 === v && d4 && !P3 && (d4 -= 1); ; ) {
              var Y3 = t2.mask.substr(d4, 1), A2 = d4 < t2.mask.length, H2 = d4 > 0;
              if (!(/[^0-9_]/.test(Y3) && A2 && H2)) break;
              d4 += u4 !== v || P3 ? 1 : -1;
            }
            if (P3) {
              var j2 = C2 - d4, J2 = t2.mask.replace(/[0-9]/g, "_"), z2 = J2.substr(d4, j2).substr(1);
              s4 = s4.substr(0, d4) + (i4 + z2) + s4.substr(d4 + j2);
            } else s4 = s4.substr(0, d4) + i4 + s4.substr(d4 + 1);
            if ("" === e.trim(s4)) s4 = J2;
            else if (d4 === t2.mask.length) return r2.preventDefault(), false;
            for (d4 += u4 === v ? 0 : 1; /[^0-9_]/.test(t2.mask.substr(d4, 1)) && d4 < t2.mask.length && d4 > 0; ) d4 += u4 === v ? 0 : 1;
            n3(t2.mask, s4) ? (this.value = s4, o2(this, d4)) : "" === e.trim(s4) ? this.value = t2.mask.replace(/[0-9]/g, "_") : a2.trigger("error_input.xdsoft");
          } else if (-1 !== [M, w, O, W, _].indexOf(u4) && F || -1 !== [D, b, x, y, k, S, h, T, p].indexOf(u4)) return true;
          return r2.preventDefault(), false;
        }));
      }
      var u3, d3, P2, Y2, A, H, j = e('<div class="xdsoft_datetimepicker xdsoft_noselect"></div>'), J = e('<div class="xdsoft_copyright"><a target="_blank" href="http://xdsoft.net/jqplugins/datetimepicker/">xdsoft.net</a></div>'), z = e('<div class="xdsoft_datepicker active"></div>'), I = e('<div class="xdsoft_monthpicker"><button type="button" class="xdsoft_prev"></button><button type="button" class="xdsoft_today_button"></button><div class="xdsoft_label xdsoft_month"><span></span><i></i></div><div class="xdsoft_label xdsoft_year"><span></span><i></i></div><button type="button" class="xdsoft_next"></button></div>'), N = e('<div class="xdsoft_calendar"></div>'), L = e('<div class="xdsoft_timepicker active"><button type="button" class="xdsoft_prev"></button><div class="xdsoft_time_box"></div><button type="button" class="xdsoft_next"></button></div>'), E = L.find(".xdsoft_time_box").eq(0), R = e('<div class="xdsoft_time_variant"></div>'), V = e('<button type="button" class="xdsoft_save_selected blue-gradient-button">Save Selected</button>'), B = e('<div class="xdsoft_select xdsoft_monthselect"><div></div></div>'), G = e('<div class="xdsoft_select xdsoft_yearselect"><div></div></div>'), U = false, q = 0;
      C.id && j.attr("id", C.id), C.style && j.attr("style", C.style), C.weeks && j.addClass("xdsoft_showweeks"), C.rtl && j.addClass("xdsoft_rtl"), j.addClass("xdsoft_" + C.theme), j.addClass(C.className), I.find(".xdsoft_month span").after(B), I.find(".xdsoft_year span").after(G), I.find(".xdsoft_month,.xdsoft_year").on("touchstart mousedown.xdsoft", function(t2) {
        var a3, r2, n3 = e(this).find(".xdsoft_select").eq(0), o2 = 0, i4 = 0, s4 = n3.is(":visible");
        for (I.find(".xdsoft_select").hide(), A.currentTime && (o2 = A.currentTime[e(this).hasClass("xdsoft_month") ? "getMonth" : "getFullYear"]()), n3[s4 ? "hide" : "show"](), a3 = n3.find("div.xdsoft_option"), r2 = 0; r2 < a3.length && a3.eq(r2).data("value") !== o2; r2 += 1) i4 += a3[0].offsetHeight;
        return n3.xdsoftScroller(C, i4 / (n3.children()[0].offsetHeight - n3[0].clientHeight)), t2.stopPropagation(), false;
      });
      var X = function(e2) {
        var t2 = e2.originalEvent, a3 = t2.touches ? t2.touches[0] : t2;
        this.touchStartPosition = this.touchStartPosition || a3;
        var r2 = Math.abs(this.touchStartPosition.clientX - a3.clientX), n3 = Math.abs(this.touchStartPosition.clientY - a3.clientY);
        Math.sqrt(r2 * r2 + n3 * n3) > C.touchMovedThreshold && (this.touchMoved = true);
      };
      I.find(".xdsoft_select").xdsoftScroller(C).on("touchstart mousedown.xdsoft", function(e2) {
        var t2 = e2.originalEvent;
        this.touchMoved = false, this.touchStartPosition = t2.touches ? t2.touches[0] : t2, e2.stopPropagation(), e2.preventDefault();
      }).on("touchmove", ".xdsoft_option", X).on("touchend mousedown.xdsoft", ".xdsoft_option", function() {
        if (!this.touchMoved) {
          void 0 !== A.currentTime && null !== A.currentTime || (A.currentTime = A.now());
          var t2 = A.currentTime.getFullYear();
          A && A.currentTime && A.currentTime[e(this).parent().parent().hasClass("xdsoft_monthselect") ? "setMonth" : "setFullYear"](e(this).data("value")), e(this).parent().parent().hide(), j.trigger("xchange.xdsoft"), C.onChangeMonth && e.isFunction(C.onChangeMonth) && C.onChangeMonth.call(j, A.currentTime, j.data("input")), t2 !== A.currentTime.getFullYear() && e.isFunction(C.onChangeYear) && C.onChangeYear.call(j, A.currentTime, j.data("input"));
        }
      }), j.getValue = function() {
        return A.getCurrentTime();
      }, j.setOptions = function(n3) {
        var o2 = {};
        C = e.extend(true, {}, C, n3), n3.allowTimes && e.isArray(n3.allowTimes) && n3.allowTimes.length && (C.allowTimes = e.extend(true, [], n3.allowTimes)), n3.weekends && e.isArray(n3.weekends) && n3.weekends.length && (C.weekends = e.extend(true, [], n3.weekends)), n3.allowDates && e.isArray(n3.allowDates) && n3.allowDates.length && (C.allowDates = e.extend(true, [], n3.allowDates)), n3.allowDateRe && "[object String]" === Object.prototype.toString.call(n3.allowDateRe) && (C.allowDateRe = new RegExp(n3.allowDateRe)), n3.highlightedDates && e.isArray(n3.highlightedDates) && n3.highlightedDates.length && (e.each(n3.highlightedDates, function(a3, n4) {
          var i4, s4 = e.map(n4.split(","), e.trim), u4 = new t(r.parseDate(s4[0], C.formatDate), s4[1], s4[2]), d4 = r.formatDate(u4.date, C.formatDate);
          void 0 !== o2[d4] ? (i4 = o2[d4].desc) && i4.length && u4.desc && u4.desc.length && (o2[d4].desc = i4 + "\n" + u4.desc) : o2[d4] = u4;
        }), C.highlightedDates = e.extend(true, [], o2)), n3.highlightedPeriods && e.isArray(n3.highlightedPeriods) && n3.highlightedPeriods.length && (o2 = e.extend(true, [], C.highlightedDates), e.each(n3.highlightedPeriods, function(a3, n4) {
          var i4, s4, u4, d4, l3, f2, c2;
          if (e.isArray(n4)) i4 = n4[0], s4 = n4[1], u4 = n4[2], c2 = n4[3];
          else {
            var m2 = e.map(n4.split(","), e.trim);
            i4 = r.parseDate(m2[0], C.formatDate), s4 = r.parseDate(m2[1], C.formatDate), u4 = m2[2], c2 = m2[3];
          }
          for (; i4 <= s4; ) d4 = new t(i4, u4, c2), l3 = r.formatDate(i4, C.formatDate), i4.setDate(i4.getDate() + 1), void 0 !== o2[l3] ? (f2 = o2[l3].desc) && f2.length && d4.desc && d4.desc.length && (o2[l3].desc = f2 + "\n" + d4.desc) : o2[l3] = d4;
        }), C.highlightedDates = e.extend(true, [], o2)), n3.disabledDates && e.isArray(n3.disabledDates) && n3.disabledDates.length && (C.disabledDates = e.extend(true, [], n3.disabledDates)), n3.disabledWeekDays && e.isArray(n3.disabledWeekDays) && n3.disabledWeekDays.length && (C.disabledWeekDays = e.extend(true, [], n3.disabledWeekDays)), !C.open && !C.opened || C.inline || a2.trigger("open.xdsoft"), C.inline && (U = true, j.addClass("xdsoft_inline"), a2.after(j).hide()), C.inverseButton && (C.next = "xdsoft_prev", C.prev = "xdsoft_next"), C.datepicker ? z.addClass("active") : z.removeClass("active"), C.timepicker ? L.addClass("active") : L.removeClass("active"), C.value && (A.setCurrentTime(C.value), a2 && a2.val && a2.val(A.str)), isNaN(C.dayOfWeekStart) ? C.dayOfWeekStart = 0 : C.dayOfWeekStart = parseInt(C.dayOfWeekStart, 10) % 7, C.timepickerScrollbar || E.xdsoftScroller(C, "hide"), C.minDate && /^[\+\-](.*)$/.test(C.minDate) && (C.minDate = r.formatDate(A.strToDateTime(C.minDate), C.formatDate)), C.maxDate && /^[\+\-](.*)$/.test(C.maxDate) && (C.maxDate = r.formatDate(A.strToDateTime(C.maxDate), C.formatDate)), C.minDateTime && /^\+(.*)$/.test(C.minDateTime) && (C.minDateTime = A.strToDateTime(C.minDateTime).dateFormat(C.formatDate)), C.maxDateTime && /^\+(.*)$/.test(C.maxDateTime) && (C.maxDateTime = A.strToDateTime(C.maxDateTime).dateFormat(C.formatDate)), V.toggle(C.showApplyButton), I.find(".xdsoft_today_button").css("visibility", C.todayButton ? "visible" : "hidden"), I.find("." + C.prev).css("visibility", C.prevButton ? "visible" : "hidden"), I.find("." + C.next).css("visibility", C.nextButton ? "visible" : "hidden"), s3(C), C.validateOnBlur && a2.off("blur.xdsoft").on("blur.xdsoft", function() {
          if (C.allowBlank && (!e.trim(e(this).val()).length || "string" == typeof C.mask && e.trim(e(this).val()) === C.mask.replace(/[0-9]/g, "_"))) e(this).val(null), j.data("xdsoft_datetime").empty();
          else {
            var t2 = r.parseDate(e(this).val(), C.format);
            if (t2) e(this).val(r.formatDate(t2, C.format));
            else {
              var a3 = +[e(this).val()[0], e(this).val()[1]].join(""), n4 = +[e(this).val()[2], e(this).val()[3]].join("");
              !C.datepicker && C.timepicker && a3 >= 0 && a3 < 24 && n4 >= 0 && n4 < 60 ? e(this).val([a3, n4].map(function(e2) {
                return e2 > 9 ? e2 : "0" + e2;
              }).join(":")) : e(this).val(r.formatDate(A.now(), C.format));
            }
            j.data("xdsoft_datetime").setCurrentTime(e(this).val());
          }
          j.trigger("changedatetime.xdsoft"), j.trigger("close.xdsoft");
        }), C.dayOfWeekStartPrev = 0 === C.dayOfWeekStart ? 6 : C.dayOfWeekStart - 1, j.trigger("xchange.xdsoft").trigger("afterOpen.xdsoft");
      }, j.data("options", C).on("touchstart mousedown.xdsoft", function(e2) {
        return e2.stopPropagation(), e2.preventDefault(), G.hide(), B.hide(), false;
      }), E.append(R), E.xdsoftScroller(C), j.on("afterOpen.xdsoft", function() {
        E.xdsoftScroller(C);
      }), j.append(z).append(L), true !== C.withoutCopyright && j.append(J), z.append(I).append(N).append(V), e(C.parentID).append(j), A = new function() {
        var t2 = this;
        t2.now = function(e2) {
          var a3, r2, n3 = new Date();
          return !e2 && C.defaultDate && (a3 = t2.strToDateTime(C.defaultDate), n3.setFullYear(a3.getFullYear()), n3.setMonth(a3.getMonth()), n3.setDate(a3.getDate())), n3.setFullYear(n3.getFullYear()), !e2 && C.defaultTime && (r2 = t2.strtotime(C.defaultTime), n3.setHours(r2.getHours()), n3.setMinutes(r2.getMinutes()), n3.setSeconds(r2.getSeconds()), n3.setMilliseconds(r2.getMilliseconds())), n3;
        }, t2.isValidDate = function(e2) {
          return "[object Date]" === Object.prototype.toString.call(e2) && !isNaN(e2.getTime());
        }, t2.setCurrentTime = function(e2, a3) {
          "string" == typeof e2 ? t2.currentTime = t2.strToDateTime(e2) : t2.isValidDate(e2) ? t2.currentTime = e2 : e2 || a3 || !C.allowBlank || C.inline ? t2.currentTime = t2.now() : t2.currentTime = null, j.trigger("xchange.xdsoft");
        }, t2.empty = function() {
          t2.currentTime = null;
        }, t2.getCurrentTime = function() {
          return t2.currentTime;
        }, t2.nextMonth = function() {
          void 0 !== t2.currentTime && null !== t2.currentTime || (t2.currentTime = t2.now());
          var a3, r2 = t2.currentTime.getMonth() + 1;
          return 12 === r2 && (t2.currentTime.setFullYear(t2.currentTime.getFullYear() + 1), r2 = 0), a3 = t2.currentTime.getFullYear(), t2.currentTime.setDate(Math.min(new Date(t2.currentTime.getFullYear(), r2 + 1, 0).getDate(), t2.currentTime.getDate())), t2.currentTime.setMonth(r2), C.onChangeMonth && e.isFunction(C.onChangeMonth) && C.onChangeMonth.call(j, A.currentTime, j.data("input")), a3 !== t2.currentTime.getFullYear() && e.isFunction(C.onChangeYear) && C.onChangeYear.call(j, A.currentTime, j.data("input")), j.trigger("xchange.xdsoft"), r2;
        }, t2.prevMonth = function() {
          void 0 !== t2.currentTime && null !== t2.currentTime || (t2.currentTime = t2.now());
          var a3 = t2.currentTime.getMonth() - 1;
          return -1 === a3 && (t2.currentTime.setFullYear(t2.currentTime.getFullYear() - 1), a3 = 11), t2.currentTime.setDate(Math.min(new Date(t2.currentTime.getFullYear(), a3 + 1, 0).getDate(), t2.currentTime.getDate())), t2.currentTime.setMonth(a3), C.onChangeMonth && e.isFunction(C.onChangeMonth) && C.onChangeMonth.call(j, A.currentTime, j.data("input")), j.trigger("xchange.xdsoft"), a3;
        }, t2.getWeekOfYear = function(t3) {
          if (C.onGetWeekOfYear && e.isFunction(C.onGetWeekOfYear)) {
            var a3 = C.onGetWeekOfYear.call(j, t3);
            if (void 0 !== a3) return a3;
          }
          var r2 = new Date(t3.getFullYear(), 0, 1);
          return 4 !== r2.getDay() && r2.setMonth(0, 1 + (4 - r2.getDay() + 7) % 7), Math.ceil(((t3 - r2) / 864e5 + r2.getDay() + 1) / 7);
        }, t2.strToDateTime = function(e2) {
          var a3, n3, o2 = [];
          return e2 && e2 instanceof Date && t2.isValidDate(e2) ? e2 : ((o2 = /^([+-]{1})(.*)$/.exec(e2)) && (o2[2] = r.parseDate(o2[2], C.formatDate)), o2 && o2[2] ? (a3 = o2[2].getTime() - 6e4 * o2[2].getTimezoneOffset(), n3 = new Date(t2.now(true).getTime() + parseInt(o2[1] + "1", 10) * a3)) : n3 = e2 ? r.parseDate(e2, C.format) : t2.now(), t2.isValidDate(n3) || (n3 = t2.now()), n3);
        }, t2.strToDate = function(e2) {
          if (e2 && e2 instanceof Date && t2.isValidDate(e2)) return e2;
          var a3 = e2 ? r.parseDate(e2, C.formatDate) : t2.now(true);
          return t2.isValidDate(a3) || (a3 = t2.now(true)), a3;
        }, t2.strtotime = function(e2) {
          if (e2 && e2 instanceof Date && t2.isValidDate(e2)) return e2;
          var a3 = e2 ? r.parseDate(e2, C.formatTime) : t2.now(true);
          return t2.isValidDate(a3) || (a3 = t2.now(true)), a3;
        }, t2.str = function() {
          var e2 = C.format;
          return C.yearOffset && (e2 = (e2 = e2.replace("Y", t2.currentTime.getFullYear() + C.yearOffset)).replace("y", String(t2.currentTime.getFullYear() + C.yearOffset).substring(2, 4))), r.formatDate(t2.currentTime, e2);
        }, t2.currentTime = this.now();
      }(), V.on("touchend click", function(e2) {
        e2.preventDefault(), j.data("changed", true), A.setCurrentTime(i3()), a2.val(A.str()), j.trigger("close.xdsoft");
      }), I.find(".xdsoft_today_button").on("touchend mousedown.xdsoft", function() {
        j.data("changed", true), A.setCurrentTime(0, true), j.trigger("afterOpen.xdsoft");
      }).on("dblclick.xdsoft", function() {
        var e2, t2, r2 = A.getCurrentTime();
        r2 = new Date(r2.getFullYear(), r2.getMonth(), r2.getDate()), e2 = A.strToDate(C.minDate), r2 < (e2 = new Date(e2.getFullYear(), e2.getMonth(), e2.getDate())) || (t2 = A.strToDate(C.maxDate), r2 > (t2 = new Date(t2.getFullYear(), t2.getMonth(), t2.getDate())) || (a2.val(A.str()), a2.trigger("change"), j.trigger("close.xdsoft")));
      }), I.find(".xdsoft_prev,.xdsoft_next").on("touchend mousedown.xdsoft", function() {
        var t2 = e(this), a3 = 0, r2 = false;
        !(function e2(n3) {
          t2.hasClass(C.next) ? A.nextMonth() : t2.hasClass(C.prev) && A.prevMonth(), C.monthChangeSpinner && (r2 || (a3 = setTimeout(e2, n3 || 100)));
        })(500), e([C.ownerDocument.body, C.contentWindow]).on("touchend mouseup.xdsoft", function t3() {
          clearTimeout(a3), r2 = true, e([C.ownerDocument.body, C.contentWindow]).off("touchend mouseup.xdsoft", t3);
        });
      }), L.find(".xdsoft_prev,.xdsoft_next").on("touchend mousedown.xdsoft", function() {
        var t2 = e(this), a3 = 0, r2 = false, n3 = 110;
        !(function e2(o2) {
          var i4 = E[0].clientHeight, s4 = R[0].offsetHeight, u4 = Math.abs(parseInt(R.css("marginTop"), 10));
          t2.hasClass(C.next) && s4 - i4 - C.timeHeightInTimePicker >= u4 ? R.css("marginTop", "-" + (u4 + C.timeHeightInTimePicker) + "px") : t2.hasClass(C.prev) && u4 - C.timeHeightInTimePicker >= 0 && R.css("marginTop", "-" + (u4 - C.timeHeightInTimePicker) + "px"), E.trigger("scroll_element.xdsoft_scroller", [Math.abs(parseInt(R[0].style.marginTop, 10) / (s4 - i4))]), n3 = n3 > 10 ? 10 : n3 - 10, r2 || (a3 = setTimeout(e2, o2 || n3));
        })(500), e([C.ownerDocument.body, C.contentWindow]).on("touchend mouseup.xdsoft", function t3() {
          clearTimeout(a3), r2 = true, e([C.ownerDocument.body, C.contentWindow]).off("touchend mouseup.xdsoft", t3);
        });
      }), u3 = 0, j.on("xchange.xdsoft", function(t2) {
        clearTimeout(u3), u3 = setTimeout(function() {
          void 0 !== A.currentTime && null !== A.currentTime || (A.currentTime = A.now());
          for (var t3, i4, s4, u4, d4, l3, f2, c2, m2, h2, g2 = "", p2 = new Date(A.currentTime.getFullYear(), A.currentTime.getMonth(), 1, 12, 0, 0), D2 = 0, v2 = A.now(), y2 = false, b2 = false, k2 = false, x2 = false, T2 = [], S2 = true, M2 = ""; p2.getDay() !== C.dayOfWeekStart; ) p2.setDate(p2.getDate() - 1);
          for (g2 += "<table><thead><tr>", C.weeks && (g2 += "<th></th>"), t3 = 0; t3 < 7; t3 += 1) g2 += "<th>" + C.i18n[o].dayOfWeekShort[(t3 + C.dayOfWeekStart) % 7] + "</th>";
          g2 += "</tr></thead>", g2 += "<tbody>", false !== C.maxDate && (y2 = A.strToDate(C.maxDate), y2 = new Date(y2.getFullYear(), y2.getMonth(), y2.getDate(), 23, 59, 59, 999)), false !== C.minDate && (b2 = A.strToDate(C.minDate), b2 = new Date(b2.getFullYear(), b2.getMonth(), b2.getDate())), false !== C.minDateTime && (k2 = A.strToDate(C.minDateTime), k2 = new Date(k2.getFullYear(), k2.getMonth(), k2.getDate(), k2.getHours(), k2.getMinutes(), k2.getSeconds())), false !== C.maxDateTime && (x2 = A.strToDate(C.maxDateTime), x2 = new Date(x2.getFullYear(), x2.getMonth(), x2.getDate(), x2.getHours(), x2.getMinutes(), x2.getSeconds()));
          var w2;
          for (false !== x2 && (w2 = 31 * (12 * x2.getFullYear() + x2.getMonth()) + x2.getDate()); D2 < A.currentTime.countDaysInMonth() || p2.getDay() !== C.dayOfWeekStart || A.currentTime.getMonth() === p2.getMonth(); ) {
            T2 = [], D2 += 1, s4 = p2.getDay(), u4 = p2.getDate(), d4 = p2.getFullYear(), l3 = p2.getMonth(), f2 = A.getWeekOfYear(p2), h2 = "", T2.push("xdsoft_date"), c2 = C.beforeShowDay && e.isFunction(C.beforeShowDay.call) ? C.beforeShowDay.call(j, p2) : null, C.allowDateRe && "[object RegExp]" === Object.prototype.toString.call(C.allowDateRe) && (C.allowDateRe.test(r.formatDate(p2, C.formatDate)) || T2.push("xdsoft_disabled")), C.allowDates && C.allowDates.length > 0 && -1 === C.allowDates.indexOf(r.formatDate(p2, C.formatDate)) && T2.push("xdsoft_disabled");
            var O2 = 31 * (12 * p2.getFullYear() + p2.getMonth()) + p2.getDate();
            (false !== y2 && p2 > y2 || false !== k2 && p2 < k2 || false !== b2 && p2 < b2 || false !== x2 && O2 > w2 || c2 && false === c2[0]) && T2.push("xdsoft_disabled"), -1 !== C.disabledDates.indexOf(r.formatDate(p2, C.formatDate)) && T2.push("xdsoft_disabled"), -1 !== C.disabledWeekDays.indexOf(s4) && T2.push("xdsoft_disabled"), a2.is("[disabled]") && T2.push("xdsoft_disabled"), c2 && "" !== c2[1] && T2.push(c2[1]), A.currentTime.getMonth() !== l3 && T2.push("xdsoft_other_month"), (C.defaultSelect || j.data("changed")) && r.formatDate(A.currentTime, C.formatDate) === r.formatDate(p2, C.formatDate) && T2.push("xdsoft_current"), r.formatDate(v2, C.formatDate) === r.formatDate(p2, C.formatDate) && T2.push("xdsoft_today"), 0 !== p2.getDay() && 6 !== p2.getDay() && -1 === C.weekends.indexOf(r.formatDate(p2, C.formatDate)) || T2.push("xdsoft_weekend"), void 0 !== C.highlightedDates[r.formatDate(p2, C.formatDate)] && (i4 = C.highlightedDates[r.formatDate(p2, C.formatDate)], T2.push(void 0 === i4.style ? "xdsoft_highlighted_default" : i4.style), h2 = void 0 === i4.desc ? "" : i4.desc), C.beforeShowDay && e.isFunction(C.beforeShowDay) && T2.push(C.beforeShowDay(p2)), S2 && (g2 += "<tr>", S2 = false, C.weeks && (g2 += "<th>" + f2 + "</th>")), g2 += '<td data-date="' + u4 + '" data-month="' + l3 + '" data-year="' + d4 + '" class="xdsoft_date xdsoft_day_of_week' + p2.getDay() + " " + T2.join(" ") + '" title="' + h2 + '"><div>' + u4 + "</div></td>", p2.getDay() === C.dayOfWeekStartPrev && (g2 += "</tr>", S2 = true), p2.setDate(u4 + 1);
          }
          g2 += "</tbody></table>", N.html(g2), I.find(".xdsoft_label span").eq(0).text(C.i18n[o].months[A.currentTime.getMonth()]), I.find(".xdsoft_label span").eq(1).text(A.currentTime.getFullYear() + C.yearOffset), M2 = "", l3 = "";
          var W2 = 0;
          if (false !== C.minTime) {
            F2 = A.strtotime(C.minTime);
            W2 = 60 * F2.getHours() + F2.getMinutes();
          }
          var _2 = 1440;
          if (false !== C.maxTime) {
            F2 = A.strtotime(C.maxTime);
            _2 = 60 * F2.getHours() + F2.getMinutes();
          }
          if (false !== C.minDateTime) {
            F2 = A.strToDateTime(C.minDateTime);
            r.formatDate(A.currentTime, C.formatDate) === r.formatDate(F2, C.formatDate) && (l3 = 60 * F2.getHours() + F2.getMinutes()) > W2 && (W2 = l3);
          }
          if (false !== C.maxDateTime) {
            var F2 = A.strToDateTime(C.maxDateTime);
            r.formatDate(A.currentTime, C.formatDate) === r.formatDate(F2, C.formatDate) && (l3 = 60 * F2.getHours() + F2.getMinutes()) < _2 && (_2 = l3);
          }
          if (m2 = function(t4, n3) {
            var o2, i5 = A.now(), s5 = C.allowTimes && e.isArray(C.allowTimes) && C.allowTimes.length;
            i5.setHours(t4), t4 = parseInt(i5.getHours(), 10), i5.setMinutes(n3), n3 = parseInt(i5.getMinutes(), 10), T2 = [];
            var u5 = 60 * t4 + n3;
            (a2.is("[disabled]") || u5 >= _2 || u5 < W2) && T2.push("xdsoft_disabled"), (o2 = new Date(A.currentTime)).setHours(parseInt(A.currentTime.getHours(), 10)), s5 || o2.setMinutes(Math[C.roundTime](A.currentTime.getMinutes() / C.step) * C.step), (C.initTime || C.defaultSelect || j.data("changed")) && o2.getHours() === parseInt(t4, 10) && (!s5 && C.step > 59 || o2.getMinutes() === parseInt(n3, 10)) && (C.defaultSelect || j.data("changed") ? T2.push("xdsoft_current") : C.initTime && T2.push("xdsoft_init_time")), parseInt(v2.getHours(), 10) === parseInt(t4, 10) && parseInt(v2.getMinutes(), 10) === parseInt(n3, 10) && T2.push("xdsoft_today"), M2 += '<div class="xdsoft_time ' + T2.join(" ") + '" data-hour="' + t4 + '" data-minute="' + n3 + '">' + r.formatDate(i5, C.formatTime) + "</div>";
          }, C.allowTimes && e.isArray(C.allowTimes) && C.allowTimes.length) for (D2 = 0; D2 < C.allowTimes.length; D2 += 1) m2(A.strtotime(C.allowTimes[D2]).getHours(), l3 = A.strtotime(C.allowTimes[D2]).getMinutes());
          else for (D2 = 0, t3 = 0; D2 < (C.hours12 ? 12 : 24); D2 += 1) for (t3 = 0; t3 < 60; t3 += C.step) {
            var P3 = 60 * D2 + t3;
            P3 < W2 || (P3 >= _2 || m2((D2 < 10 ? "0" : "") + D2, l3 = (t3 < 10 ? "0" : "") + t3));
          }
          for (R.html(M2), n2 = "", D2 = parseInt(C.yearStart, 10); D2 <= parseInt(C.yearEnd, 10); D2 += 1) n2 += '<div class="xdsoft_option ' + (A.currentTime.getFullYear() === D2 ? "xdsoft_current" : "") + '" data-value="' + D2 + '">' + (D2 + C.yearOffset) + "</div>";
          for (G.children().eq(0).html(n2), D2 = parseInt(C.monthStart, 10), n2 = ""; D2 <= parseInt(C.monthEnd, 10); D2 += 1) n2 += '<div class="xdsoft_option ' + (A.currentTime.getMonth() === D2 ? "xdsoft_current" : "") + '" data-value="' + D2 + '">' + C.i18n[o].months[D2] + "</div>";
          B.children().eq(0).html(n2), e(j).trigger("generate.xdsoft");
        }, 10), t2.stopPropagation();
      }).on("afterOpen.xdsoft", function() {
        if (C.timepicker) {
          var e2, t2, a3, r2;
          R.find(".xdsoft_current").length ? e2 = ".xdsoft_current" : R.find(".xdsoft_init_time").length && (e2 = ".xdsoft_init_time"), e2 ? (t2 = E[0].clientHeight, (a3 = R[0].offsetHeight) - t2 < (r2 = R.find(e2).index() * C.timeHeightInTimePicker + 1) && (r2 = a3 - t2), E.trigger("scroll_element.xdsoft_scroller", [parseInt(r2, 10) / (a3 - t2)])) : E.trigger("scroll_element.xdsoft_scroller", [0]);
        }
      }), d3 = 0, N.on("touchend click.xdsoft", "td", function(t2) {
        t2.stopPropagation(), d3 += 1;
        var r2 = e(this), n3 = A.currentTime;
        if (void 0 !== n3 && null !== n3 || (A.currentTime = A.now(), n3 = A.currentTime), r2.hasClass("xdsoft_disabled")) return false;
        n3.setDate(1), n3.setFullYear(r2.data("year")), n3.setMonth(r2.data("month")), n3.setDate(r2.data("date")), j.trigger("select.xdsoft", [n3]), a2.val(A.str()), C.onSelectDate && e.isFunction(C.onSelectDate) && C.onSelectDate.call(j, A.currentTime, j.data("input"), t2), j.data("changed", true), j.trigger("xchange.xdsoft"), j.trigger("changedatetime.xdsoft"), (d3 > 1 || true === C.closeOnDateSelect || false === C.closeOnDateSelect && !C.timepicker) && !C.inline && j.trigger("close.xdsoft"), setTimeout(function() {
          d3 = 0;
        }, 200);
      }), R.on("touchstart", "div", function(e2) {
        this.touchMoved = false;
      }).on("touchmove", "div", X).on("touchend click.xdsoft", "div", function(t2) {
        if (!this.touchMoved) {
          t2.stopPropagation();
          var a3 = e(this), r2 = A.currentTime;
          if (void 0 !== r2 && null !== r2 || (A.currentTime = A.now(), r2 = A.currentTime), a3.hasClass("xdsoft_disabled")) return false;
          r2.setHours(a3.data("hour")), r2.setMinutes(a3.data("minute")), j.trigger("select.xdsoft", [r2]), j.data("input").val(A.str()), C.onSelectTime && e.isFunction(C.onSelectTime) && C.onSelectTime.call(j, A.currentTime, j.data("input"), t2), j.data("changed", true), j.trigger("xchange.xdsoft"), j.trigger("changedatetime.xdsoft"), true !== C.inline && true === C.closeOnTimeSelect && j.trigger("close.xdsoft");
        }
      }), z.on("mousewheel.xdsoft", function(e2) {
        return !C.scrollMonth || (e2.deltaY < 0 ? A.nextMonth() : A.prevMonth(), false);
      }), a2.on("mousewheel.xdsoft", function(e2) {
        return !C.scrollInput || (!C.datepicker && C.timepicker ? ((P2 = R.find(".xdsoft_current").length ? R.find(".xdsoft_current").eq(0).index() : 0) + e2.deltaY >= 0 && P2 + e2.deltaY < R.children().length && (P2 += e2.deltaY), R.children().eq(P2).length && R.children().eq(P2).trigger("mousedown"), false) : C.datepicker && !C.timepicker ? (z.trigger(e2, [e2.deltaY, e2.deltaX, e2.deltaY]), a2.val && a2.val(A.str()), j.trigger("changedatetime.xdsoft"), false) : void 0);
      }), j.on("changedatetime.xdsoft", function(t2) {
        if (C.onChangeDateTime && e.isFunction(C.onChangeDateTime)) {
          var a3 = j.data("input");
          C.onChangeDateTime.call(j, A.currentTime, a3, t2), delete C.value, a3.trigger("change");
        }
      }).on("generate.xdsoft", function() {
        C.onGenerate && e.isFunction(C.onGenerate) && C.onGenerate.call(j, A.currentTime, j.data("input")), U && (j.trigger("afterOpen.xdsoft"), U = false);
      }).on("click.xdsoft", function(e2) {
        e2.stopPropagation();
      }), P2 = 0, H = function(e2, t2) {
        do {
          if (!(e2 = e2.parentNode) || false === t2(e2)) break;
        } while ("HTML" !== e2.nodeName);
      }, Y2 = function() {
        var t2, a3, r2, n3, o2, i4, s4, u4, d4, l3, f2, c2, m2;
        if (u4 = j.data("input"), t2 = u4.offset(), a3 = u4[0], l3 = "top", r2 = t2.top + a3.offsetHeight - 1, n3 = t2.left, o2 = "absolute", d4 = e(C.contentWindow).width(), c2 = e(C.contentWindow).height(), m2 = e(C.contentWindow).scrollTop(), C.ownerDocument.documentElement.clientWidth - t2.left < z.parent().outerWidth(true)) {
          var h2 = z.parent().outerWidth(true) - a3.offsetWidth;
          n3 -= h2;
        }
        "rtl" === u4.parent().css("direction") && (n3 -= j.outerWidth() - u4.outerWidth()), C.fixed ? (r2 -= m2, n3 -= e(C.contentWindow).scrollLeft(), o2 = "fixed") : (s4 = false, H(a3, function(e2) {
          return null !== e2 && ("fixed" === C.contentWindow.getComputedStyle(e2).getPropertyValue("position") ? (s4 = true, false) : void 0);
        }), s4 ? (o2 = "fixed", r2 + j.outerHeight() > c2 + m2 ? (l3 = "bottom", r2 = c2 + m2 - t2.top) : r2 -= m2) : r2 + j[0].offsetHeight > c2 + m2 && (r2 = t2.top - j[0].offsetHeight + 1), r2 < 0 && (r2 = 0), n3 + a3.offsetWidth > d4 && (n3 = d4 - a3.offsetWidth)), i4 = j[0], H(i4, function(e2) {
          if ("relative" === C.contentWindow.getComputedStyle(e2).getPropertyValue("position") && d4 >= e2.offsetWidth) return n3 -= (d4 - e2.offsetWidth) / 2, false;
        }), (f2 = { position: o2, left: n3, top: "", bottom: "" })[l3] = r2, j.css(f2);
      }, j.on("open.xdsoft", function(t2) {
        var a3 = true;
        C.onShow && e.isFunction(C.onShow) && (a3 = C.onShow.call(j, A.currentTime, j.data("input"), t2)), false !== a3 && (j.show(), Y2(), e(C.contentWindow).off("resize.xdsoft", Y2).on("resize.xdsoft", Y2), C.closeOnWithoutClick && e([C.ownerDocument.body, C.contentWindow]).on("touchstart mousedown.xdsoft", function t3() {
          j.trigger("close.xdsoft"), e([C.ownerDocument.body, C.contentWindow]).off("touchstart mousedown.xdsoft", t3);
        }));
      }).on("close.xdsoft", function(t2) {
        var a3 = true;
        I.find(".xdsoft_month,.xdsoft_year").find(".xdsoft_select").hide(), C.onClose && e.isFunction(C.onClose) && (a3 = C.onClose.call(j, A.currentTime, j.data("input"), t2)), false === a3 || C.opened || C.inline || j.hide(), t2.stopPropagation();
      }).on("toggle.xdsoft", function() {
        j.is(":visible") ? j.trigger("close.xdsoft") : j.trigger("open.xdsoft");
      }).data("input", a2), q = 0, j.data("xdsoft_datetime", A), j.setOptions(C), A.setCurrentTime(i3()), a2.data("xdsoft_datetimepicker", j).on("open.xdsoft focusin.xdsoft mousedown.xdsoft touchstart", function() {
        a2.is(":disabled") || a2.data("xdsoft_datetimepicker").is(":visible") && C.closeOnInputClick || C.openOnFocus && (clearTimeout(q), q = setTimeout(function() {
          a2.is(":disabled") || (U = true, A.setCurrentTime(i3(), true), C.mask && s3(C), j.trigger("open.xdsoft"));
        }, 100));
      }).on("keydown.xdsoft", function(t2) {
        var a3, r2 = t2.which;
        return -1 !== [p].indexOf(r2) && C.enterLikeTab ? (a3 = e("input:visible,textarea:visible,button:visible,a:visible"), j.trigger("close.xdsoft"), a3.eq(a3.index(this) + 1).focus(), false) : -1 !== [T].indexOf(r2) ? (j.trigger("close.xdsoft"), true) : void 0;
      }).on("blur.xdsoft", function() {
        j.trigger("close.xdsoft");
      });
    }, u2 = function(t2) {
      var a2 = t2.data("xdsoft_datetimepicker");
      a2 && (a2.data("xdsoft_datetime", null), a2.remove(), t2.data("xdsoft_datetimepicker", null).off(".xdsoft"), e(C.contentWindow).off("resize.xdsoft"), e([C.contentWindow, C.ownerDocument.body]).off("mousedown.xdsoft touchstart"), t2.unmousewheel && t2.unmousewheel());
    }, e(C.ownerDocument).off("keydown.xdsoftctrl keyup.xdsoftctrl").on("keydown.xdsoftctrl", function(e2) {
      e2.keyCode === h && (F = true);
    }).on("keyup.xdsoftctrl", function(e2) {
      e2.keyCode === h && (F = false);
    }), this.each(function() {
      var t2 = e(this).data("xdsoft_datetimepicker");
      if (t2) {
        if ("string" === e.type(n2)) switch (n2) {
          case "show":
            e(this).select().focus(), t2.trigger("open.xdsoft");
            break;
          case "hide":
            t2.trigger("close.xdsoft");
            break;
          case "toggle":
            t2.trigger("toggle.xdsoft");
            break;
          case "destroy":
            u2(e(this));
            break;
          case "reset":
            this.value = this.defaultValue, this.value && t2.data("xdsoft_datetime").isValidDate(r.parseDate(this.value, C.format)) || t2.data("changed", false), t2.data("xdsoft_datetime").setCurrentTime(this.value);
            break;
          case "validate":
            t2.data("input").trigger("blur.xdsoft");
            break;
          default:
            t2[n2] && e.isFunction(t2[n2]) && (d2 = t2[n2](i2));
        }
        else t2.setOptions(n2);
        return 0;
      }
      "string" !== e.type(n2) && (!C.lazyInit || C.open || C.inline ? s2(e(this)) : Y(e(this)));
    }), d2;
  }, e.fn.datetimepicker.defaults = a;
};
!(function(e) {
  "function" == typeof define && define.amd ? define(["jquery", "jquery-mousewheel"], e) : "object" == typeof exports ? module.exports = e(require("jquery")) : e(jQuery);
})(datetimepickerFactory), (function(e) {
  "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? module.exports = e : e(jQuery);
})(function(e) {
  function t(t2) {
    var i2 = t2 || window.event, s2 = u.call(arguments, 1), d2 = 0, f = 0, c = 0, m = 0, h = 0, g = 0;
    if (t2 = e.event.fix(i2), t2.type = "mousewheel", "detail" in i2 && (c = -1 * i2.detail), "wheelDelta" in i2 && (c = i2.wheelDelta), "wheelDeltaY" in i2 && (c = i2.wheelDeltaY), "wheelDeltaX" in i2 && (f = -1 * i2.wheelDeltaX), "axis" in i2 && i2.axis === i2.HORIZONTAL_AXIS && (f = -1 * c, c = 0), d2 = 0 === c ? f : c, "deltaY" in i2 && (d2 = c = -1 * i2.deltaY), "deltaX" in i2 && (f = i2.deltaX, 0 === c && (d2 = -1 * f)), 0 !== c || 0 !== f) {
      if (1 === i2.deltaMode) {
        var p = e.data(this, "mousewheel-line-height");
        d2 *= p, c *= p, f *= p;
      } else if (2 === i2.deltaMode) {
        var D = e.data(this, "mousewheel-page-height");
        d2 *= D, c *= D, f *= D;
      }
      if (m = Math.max(Math.abs(c), Math.abs(f)), (!o || m < o) && (o = m, r(i2, m) && (o /= 40)), r(i2, m) && (d2 /= 40, f /= 40, c /= 40), d2 = Math[d2 >= 1 ? "floor" : "ceil"](d2 / o), f = Math[f >= 1 ? "floor" : "ceil"](f / o), c = Math[c >= 1 ? "floor" : "ceil"](c / o), l.settings.normalizeOffset && this.getBoundingClientRect) {
        var v = this.getBoundingClientRect();
        h = t2.clientX - v.left, g = t2.clientY - v.top;
      }
      return t2.deltaX = f, t2.deltaY = c, t2.deltaFactor = o, t2.offsetX = h, t2.offsetY = g, t2.deltaMode = 0, s2.unshift(t2, d2, f, c), n && clearTimeout(n), n = setTimeout(a, 200), (e.event.dispatch || e.event.handle).apply(this, s2);
    }
  }
  function a() {
    o = null;
  }
  function r(e2, t2) {
    return l.settings.adjustOldDeltas && "mousewheel" === e2.type && t2 % 120 == 0;
  }
  var n, o, i = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"], s = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"], u = Array.prototype.slice;
  if (e.event.fixHooks) for (var d = i.length; d; ) e.event.fixHooks[i[--d]] = e.event.mouseHooks;
  var l = e.event.special.mousewheel = { version: "3.1.12", setup: function() {
    if (this.addEventListener) for (var a2 = s.length; a2; ) this.addEventListener(s[--a2], t, false);
    else this.onmousewheel = t;
    e.data(this, "mousewheel-line-height", l.getLineHeight(this)), e.data(this, "mousewheel-page-height", l.getPageHeight(this));
  }, teardown: function() {
    if (this.removeEventListener) for (var a2 = s.length; a2; ) this.removeEventListener(s[--a2], t, false);
    else this.onmousewheel = null;
    e.removeData(this, "mousewheel-line-height"), e.removeData(this, "mousewheel-page-height");
  }, getLineHeight: function(t2) {
    var a2 = e(t2), r2 = a2["offsetParent" in e.fn ? "offsetParent" : "parent"]();
    return r2.length || (r2 = e("body")), parseInt(r2.css("fontSize"), 10) || parseInt(a2.css("fontSize"), 10) || 16;
  }, getPageHeight: function(t2) {
    return e(t2).height();
  }, settings: { adjustOldDeltas: true, normalizeOffset: true } };
  e.fn.extend({ mousewheel: function(e2) {
    return e2 ? this.bind("mousewheel", e2) : this.trigger("mousewheel");
  }, unmousewheel: function(e2) {
    return this.unbind("mousewheel", e2);
  } });
});
