(() => {
  "use strict";
  class t {
    static setCommonConstants() {
      this.script = document.currentScript, this.loadedCss = [], this.loadedJs = [];
    }
    static addCSS(t2, e2, i2 = false, s2 = null) {
      if (void 0 === this.loadedCss && (this.loadedCss = []), !t2 || -1 !== this.loadedCss.indexOf(t2)) return e2 ? e2() : null;
      let r2 = document.createElement("link");
      return r2.type = "text/css", r2.rel = "stylesheet", r2.href = t2, i2 && window !== window.parent && this.isCrossDomainIframe() ? window.parent.document.head.appendChild(r2) : document.head.appendChild(r2), document.head.appendChild(r2), "function" == typeof e2 && r2.addEventListener("load", e2), "function" == typeof s2 && r2.addEventListener("error", s2), this.loadedCss.push(t2);
    }
    static addJS(t2, e2, i2 = false) {
      if (void 0 === this.loadedJs && (this.loadedJs = []), !t2 || -1 !== this.loadedJs.indexOf(t2)) return e2 ? e2() : null;
      let s2 = document.createElement("script");
      return s2.type = "text/javascript", s2.src = t2, i2 && window !== window.parent && this.isCrossDomainIframe() ? window.parent.document.head.appendChild(s2) : document.head.appendChild(s2), e2 && s2.addEventListener("load", e2), this.loadedJs.push(t2);
    }
    static openWindow(t2) {
      let e2 = document.createElement("a");
      return e2.href = t2, e2.target = "_blank", e2.rel = "noopener noreferrer nofollow", e2.click();
    }
    static getScriptSelector(t2) {
      return '[src*=".trustindex."][src*="' + t2 + '.js"],[data-src*=".trustindex."][data-src*="' + t2 + '.js"]';
    }
    static getScriptKey(t2) {
      let e2 = t2.getAttribute("data-src") || t2.getAttribute("src"), i2 = e2.replace(/.+\?([^&]+)/, "$1");
      return i2 && i2 !== e2 && -1 === i2.indexOf("=") ? i2 : null;
    }
    static getCDNUrl() {
      if (void 0 !== window.TrustindexCdnUrl && window.TrustindexCdnUrl) return window.TrustindexCdnUrl;
      if (void 0 !== this.cdnUrl && this.cdnUrl) return this.cdnUrl;
      let t2 = "https://cdn.trustindex.io/", e2 = null;
      try {
        "undefined" != typeof sessionStorage && (e2 = sessionStorage.getItem("ti-cdn-url"));
      } catch (t3) {
        e2 = null;
      }
      if (e2) return e2;
      let i2 = t2;
      if (this.script && this.script.src) {
        let t3 = this.script.src.split("/");
        t3.pop(), i2 = t3.join("/") + "/";
      }
      -1 === i2.indexOf("trustindex.") && (i2 = t2), this.cdnUrl = i2;
      try {
        this.isAdminUrl() || i2 === t2 || "undefined" == typeof sessionStorage || sessionStorage.setItem("ti-cdn-url", i2);
      } catch (t3) {
      }
      return i2;
    }
    static getWidgetUrl(t2) {
      return void 0 === t2 ? null : this.getCDNUrl() + "widgets/" + t2.substring(0, 2) + "/" + t2 + "/";
    }
    static getDecodedHtml(t2) {
      let e2 = document.createElement("textarea");
      return e2.innerHTML = t2, e2.value;
    }
    static getRelativeTime(t2, e2) {
      let i2 = e2.split("|"), s2 = i2.shift(), r2 = i2.shift(), o2 = [86400, 604800, 2419200, 31536e3], a2 = (new Date()).getTime() / 1e3 - t2;
      for (let t3 = o2.length - 1; t3 >= 0; t3--) if (a2 >= o2[t3]) {
        let e3 = Math.floor(a2 / o2[t3]), r3 = 2 * t3;
        return e3 > 1 && r3++, s2.replace("%d", e3).replace("%s", i2[r3]);
      }
      return r2;
    }
    static getDevicePixelRatio() {
      let t2 = 1;
      return void 0 !== window.screen.systemXDPI && void 0 !== window.screen.logicalXDPI && window.screen.systemXDPI > window.screen.logicalXDPI ? t2 = window.screen.systemXDPI / window.screen.logicalXDPI : void 0 !== window.devicePixelRatio && (t2 = window.devicePixelRatio), Math.min(t2, 2);
    }
    static getDefaultAvatarUrl() {
      let t2 = Math.floor(10 * Math.random()) + 1;
      return this.getCDNUrl() + "assets/default-avatar/noprofile-" + (t2 < 10 ? "0" : "") + t2 + ".svg";
    }
    static getDefaultCompanyAvatarUrl() {
      return this.getCDNUrl() + "companies/default_avatar.jpg";
    }
    static getPageLanguage() {
      return this.getWidgetLanguage(document.documentElement.lang);
    }
    static getUserLanguage() {
      return this.getWidgetLanguage(navigator.language || navigator.userLanguage || document.documentElement.lang);
    }
    static getWidgetLanguage(t2) {
      let e2 = (t2 || "en").toLowerCase();
      return e2.startsWith("zh") ? /-(hant|tw|hk|mo)\b/.test(e2) ? "zh_TW" : "zh" : e2.substr(0, 2);
    }
    static getLocaleTag(t2) {
      return (t2 || "en").replace("_", "-");
    }
    static isAdminUrl(t2) {
      let e2 = t2 ? new URL(t2) : location;
      return /(admin|stage[0-9kw])\.trustindex/.test(e2.hostname) && -1 === e2.href.indexOf("test/widget.html");
    }
    static isWordpressAdminUrl(t2) {
      return -1 !== (t2 ? new URL(t2) : location).href.indexOf("settings.php&tab=free-widget-configurator");
    }
    static isAdminEditUrl(t2) {
      return void 0 === t2 && (t2 = location.href), -1 !== t2.indexOf("widget/edit");
    }
    static isTestWidgetUrl(t2) {
      return void 0 === t2 && (t2 = location.href), -1 !== t2.indexOf("test/widget.html");
    }
    static isInIframe() {
      return window.top !== window.self;
    }
    static isAttributeEnabled(t2, e2) {
      let i2 = t2.getAttribute(e2);
      return null !== i2 && -1 === ["0", "false"].indexOf(i2.toLowerCase());
    }
    static isCrossDomainIframe() {
      if (window.parent === window) return false;
      try {
        let t2 = new URL(window.parent.location);
        return t2.protocol !== location.protocol || t2.hostname !== location.hostname || t2.port !== location.port;
      } catch (t2) {
        return null;
      }
    }
    static isMobileDevice() {
      return this.isAdminUrl() && !this.isAdminEditUrl() ? !!document.querySelector(".widget-editor.mobile") : /mobi/i.test(navigator.userAgent || navigator.vendor || window.opera);
    }
    static show(t2, e2) {
      t2.style.display = e2 || "";
    }
    static hide(t2) {
      t2.style.display = "none";
    }
    static isEditorPreview() {
      return !!(this.isAdminUrl() || this.isTestWidgetUrl() || this.isWordpressAdminUrl()) || -1 !== location.href.indexOf("elementor-preview=");
    }
    static onFirstActivity(t2) {
      if (this.hadFirstActivity) return t2();
      if (void 0 === this.firstActivityCallbacks) {
        this.firstActivityCallbacks = [];
        let t3 = ["keydown", "mousemove", "wheel", "touchmove", "touchstart"], e2 = () => {
          t3.forEach(((t4) => window.removeEventListener(t4, e2))), this.hadFirstActivity = true, this.firstActivityCallbacks.forEach(((t4) => t4())), this.firstActivityCallbacks = [];
        };
        t3.forEach(((t4) => window.addEventListener(t4, e2, { passive: true })));
      }
      return this.firstActivityCallbacks.push(t2);
    }
    static onApproachingViewport(t2, e2, i2 = 300) {
      if ("undefined" == typeof IntersectionObserver || this.isInLoadTriggerZone(t2, i2)) return e2();
      let s2 = new IntersectionObserver(((t3) => {
        t3[0].isIntersecting && (s2.disconnect(), e2());
      }), { rootMargin: i2 + "px" });
      return s2.observe(t2);
    }
    static convertToDialog(t2) {
      if (!t2 || "DIALOG" === t2.tagName) return t2;
      let e2 = document.createElement("dialog");
      return Array.from(t2.attributes).forEach(((t3) => e2.setAttribute(t3.name, t3.value))), e2.append(...t2.childNodes), Object.assign(e2.style, { border: "0", padding: "0", margin: "0", maxHeight: "none", overflow: "visible" }), t2.parentNode && t2.replaceWith(e2), e2;
    }
    static isCrawler() {
      if (void 0 !== this.cacheIsCrawler) return this.cacheIsCrawler;
      return this.cacheIsCrawler = new RegExp(["googlebot", "googleother", "google-inspectiontool", "storebot-google", "bingbot", "bingpreview", "applebot", "duckduckbot", "yandexbot", "baiduspider", "petalbot", "seznambot", "slurp", "gptbot", "oai-searchbot", "chatgpt-user", "claudebot", "claude-web", "claude-user", "claude-searchbot", "anthropic-ai", "perplexity", "duckassistbot", "meta-externalagent", "meta-externalfetcher", "bytespider", "amazonbot", "ccbot", "cohere-ai", "youbot", "diffbot", "mistralai-user", "imagesiftbot", "timpibot", "omgilibot", "webzio-extended", "ahrefsbot", "semrushbot", "screaming frog", "dataforseo", "chrome-lighthouse", "prerender", "facebookexternalhit", "twitterbot", "linkedinbot", "slackbot", "discordbot", "telegrambot", "embedly"].join("|"), "i").test(navigator.userAgent || ""), this.cacheIsCrawler;
    }
    static isWebpSupported(t2) {
      if (void 0 !== this.cacheWebpSupported) return t2(this.cacheWebpSupported);
      let e2 = (e3) => (this.cacheWebpSupported = e3, t2(e3)), i2 = new Image();
      i2.onload = () => e2(i2.width > 0 && i2.height > 0), i2.onerror = () => e2(false), i2.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA";
    }
    static isDarkMode() {
      var t2, e2;
      return !!(null == (e2 = null == (t2 = null == window ? void 0 : window.matchMedia) ? void 0 : t2.call(window, "(prefers-color-scheme:dark)")) ? void 0 : e2.matches);
    }
    static waitForVisibility(t2, e2, i2 = 0) {
      if (t2.offsetWidth > 0) return i2 ? setTimeout(e2, i2) : e2();
      new ResizeObserver((function(t3) {
        t3[0].target.offsetWidth > 0 && (e2(), this.disconnect());
      })).observe(t2);
    }
    static isInLoadTriggerZone(t2, e2 = 1200) {
      let i2 = t2.closest(".x-slide.slider-section");
      if (i2 && i2.classList.contains("is-current-slide")) return true;
      let s2 = t2.getBoundingClientRect();
      return s2.right <= (window.innerWidth || document.documentElement.clientWidth) + e2 && s2.bottom <= (window.innerHeight || document.documentElement.clientHeight) + e2;
    }
    static getProxyUrl(t2 = "eu") {
      if (!t2) {
        t2 = { Europe: "eu" }[Intl.DateTimeFormat().resolvedOptions().timeZone.split("/")[0]] || "eu";
      }
      return { eu: { url: "https://de-proxy.trustindex.io/", key: "base64:3j5bZXQ07QEkVq0lFnTw5g==" } }[t2] ? { eu: { url: "https://de-proxy.trustindex.io/", key: "base64:3j5bZXQ07QEkVq0lFnTw5g==" } }[t2].url + "trustindex-1stp/cdn-loader.php" : "";
    }
    static disableBodyScroll() {
      void 0 === this.oldBodyScrollAttributes && this.isBodyScrollApplicable() && (this.oldBodyScrollAttributes = { documentElement: { overflow: document.documentElement.style.overflow, position: document.documentElement.style.position, height: document.documentElement.style.height }, body: { overflowX: document.body.style.overflowX, height: document.body.style.height } }, document.documentElement.style.overflow = "hidden", document.documentElement.style.position = "relative", document.documentElement.style.height = "unset", document.body.style.overflowX = "unset", document.body.style.height = "unset");
    }
    static enableBodyScroll() {
      if (void 0 !== this.oldBodyScrollAttributes) {
        for (let t2 in this.oldBodyScrollAttributes) for (let e2 in this.oldBodyScrollAttributes[t2]) document[t2].style[e2] = this.oldBodyScrollAttributes[t2][e2];
        delete this.oldBodyScrollAttributes;
      }
    }
    static isBodyScrollApplicable() {
      if ("hidden" === document.documentElement.style.overflow || "hidden" === document.documentElement.style.overflowX || "hidden" === document.body.style.overflow || "hidden" === document.body.style.overflowX) return false;
      let t2 = window.getComputedStyle(document.documentElement);
      return "hidden" !== (t2.overflow || "").split(" ")[0] && "hidden" !== (t2.overflowX || "") && (t2 = window.getComputedStyle(document.body), "hidden" !== (t2.overflow || "").split(" ")[0] && "hidden" !== (t2.overflowX || ""));
    }
    static getFetchApi() {
      if (void 0 !== this.fetchApi && this.fetchApi) return this.fetchApi;
      let t2 = document.createElement("iframe");
      return document.body.appendChild(t2), this.fetchApi = t2.contentWindow.fetch.bind(window), t2.remove(), this.fetchApi;
    }
    static request(t2, e2 = "GET") {
      return new Promise(((i2, s2) => {
        const r2 = new XMLHttpRequest();
        r2.open(e2, t2, true), r2.onload = function() {
          r2.status >= 200 && r2.status < 300 ? i2(r2.responseText) : i2(false);
        }, r2.onerror = function() {
          i2(false);
        }, r2.send();
      }));
    }
  }
  var e = (t2, e2, i2) => new Promise(((s2, r2) => {
    var o2 = (t3) => {
      try {
        n2(i2.next(t3));
      } catch (t4) {
        r2(t4);
      }
    }, a2 = (t3) => {
      try {
        n2(i2.throw(t3));
      } catch (t4) {
        r2(t4);
      }
    }, n2 = (t3) => t3.done ? s2(t3.value) : Promise.resolve(t3.value).then(o2, a2);
    n2((i2 = i2.apply(t2, e2)).next());
  }));
  class i extends t {
    static resize_widgets() {
    }
    static init() {
    }
    static init_pager() {
      -1 !== decodeURIComponent(location.href).indexOf("page=testimonial-widgets/tabs/create-widget.php") && (this.destroyWidgets(), this.initWidgetsFromDom(true));
    }
    static setConstants() {
      this.setCommonConstants(), this.svgs = { good: '<svg style="display: inline-block; vertical-align: sub;fill: #0ab21b;position:relative;top:-2px" viewBox="0 0 128 128"><path d="M64 8a56 56 0 1 0 56 56A56 56 0 0 0 64 8zm0 104a48 48 0 1 1 48-48 48 48 0 0 1-48 48zM44 64a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm48-8a8 8 0 1 1-8-8 8 8 0 0 1 8 8zm-4.8 21.6a4 4 0 0 1 .6 3.6A24.3 24.3 0 0 1 64 97c-9.7 0-15.7-4.2-19-7.8a22.7 22.7 0 0 1-4.8-8A4 4 0 0 1 44 76h40a4 4 0 0 1 3.2 1.6z"></path></svg>', bad: '<svg style="display: inline-block; vertical-align: sub;fill: #383838;margin-top: -1px;position:relative;top:-2px" viewBox="0 0 128 128"><path d="M64 8a56 56 0 1 0 56 56A56 56 0 0 0 64 8zm0 104a48 48 0 1 1 48-48 48 48 0 0 1-48 48zM44 64a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm48-8a8 8 0 1 1-8-8 8 8 0 0 1 8 8zm-5.2 30.2a4 4 0 1 1-5.6 5.6c-10.5-10.4-24-10.4-34.4 0a4 4 0 0 1-5.6-5.6c13.6-13.7 32-13.7 45.6 0z"></path></svg>' }, this.additionalLogoStyles = { "header-logo": { Google: "height: 25px; top: -2px", Facebook: "height: 17px", Trustindex: "height: 19px", Tripadvisor: "height: 24px; top: -2px", Airbnb: "height: 26px; top: -3px", Yelp: "height: 32px; top: -8px", Amazon: "height: 13px; top: 1px", Arukereso: "height: 17px; top: 5px", Vrbo: "height: 20px; top: -2px", BBB: "height: 25px; top: -2px", Expedia: "height: 25px; top: -3px", Ebay: "height: 25px; top: -2px", Sitejabber: "height: 20px; top: 1px", Thumbtack: "height: 25px; top: -3px", Provenexpert: "height: 25px; top: 1px", Hotels: "height: 22px; top: -1px", Zillow: "height: 17px", Yell: "height: 18px", Checkatrade: "height: 15px; top: 2px", Capterra: "height: 15px; top: 2px", Etsy: "height: 20px; top: 1px", WordpressPlugin: "height: 13px; top: 1px", AngiesList: "height: 24px; top: -1px", OnlinePenztarca: "height: 30px; top: -3px", ConsumerAffairs: "height: 30px; top: -3px", Reviewsio: "height: 20px; top: 0px", Foursquare: "height: 15px; top: 3px", Justdial: "height: 15px; top: 3px", Houzz: "height: 20px; top: -3px", Indeed: "height: 17px; top: 0px" }, "large-logo": { Facebook: "width: 145px; height: 28px", Google: "width: 110px; height: 35px", Yelp: "width: 95px; height: 46px; top: -5px", Airbnb: "width: 120px; height: 38px", Tripadvisor: "width: 155px; height: 33px", Trustpilot: "width: 140px; height: 34px", Hotels: "width: 152px; height: 30px", Amazon: "width: 120px; height: 25px", Bookatable: "height: 27px; left: 7px", Foursquare: "height: 20px; top: 3px", Trustindex: "width: 152px; height: 26px; top: 3px", Booking: "height: 25px", Opentable: "height: 35px", Capterra: "height: 34px", Thumbtack: "height: 34px", Fresha: "height: 21px", Expedia: "height: 44px", Mobilede: "height: 35px", Checkatrade: "height: 22px", Pricerunner: "height: 21px", Easyweddings: "height: 50px; top: 3px", Whichtrustedtraders: "width: 80px; height: 55px; top: -15px; left: 10px", Abia: "width: 100px; height: 41px", WordpressPlugin: "height: 35px", Zoover: "height: 22px", Arukereso: "height: 25px", "Arukereso-ro": "height: 29px", Pricespy: "height: 39px", "Pricespy-dk": "height: 42px", "Pricespy-fi": "height: 35px", "Pricespy-fr": "height: 31px", "Pricespy-no": "height: 43px", Szallashu: "height: 26px", "Szallashu-com": "height: 29px", "Szallashu-cz": "height: 47px", "Szallashu-pl": "height: 34px", "Szallashu-ro": "height: 29px" }, "small-logo": { Facebook: "width: 78px; height: 15px; top: 1px", Google: "width: 62px; height: 20px; top: 1px", Yelp: "width: 45px; height: 22px; top: -3px", Airbnb: "width: 64px; height: 20px", Tripadvisor: "width: 97px; height: 21px; top: 1px", Trustpilot: "width: 65px; top: 2px", Hotels: "width: 100px; height: 20px", Amazon: "width: 68px; height: 20px; top: 1px", Bookatable: "width: 83px; height: 15px; top: 1px", Foursquare: "width: 98px; height: 13px; top: 3px", Trustindex: "width: 95px; height: 16px; top: 2px", Booking: "width: 90px; height: 15px; top: 3px", Opentable: "width: 100px; height: 23px; top: -1px", Capterra: "width: 79px; height: 18px; top: 1px", Thumbtack: "width: 79px; height: 18px; top: 2px", Fresha: "width: 93px; height: 13px; top: 2px; left: 1px", Expedia: "width: 65px; height: 19px; top: 2px", Zillow: "width: 67px; height: 14px; top: 2px", Reco: "width: 76px; height: 16px", Mobilede: "width: 68px; height: 16px; top: 2px", Checkatrade: "width: 90px; height: 13px; top: 1.5px", Pricerunner: "width: 102px; height: 14px; top: 1px", Easyweddings: "width: 60px; height: 20px", Whichtrustedtraders: "width: 34px; height: 23px; top: -1px", Abia: "width: 40px; height: 16px", Ebay: "width: 45px; height: 18px; top: 1px", BBB: "width: 42px; height: 16px; top: 2px", WordpressPlugin: "width: 85px; height: 11px; top: 2px", Arukereso: "width: 92px; height: 15px; top: 1px", "Arukereso-bg": "width: 89px; height: 15px; top: 3px", "Arukereso-ro": "width: 77px; height: 15px; top: 3px", Pricespy: "width: 69px; height: 18px", "Pricespy-dk": "width: 64px; height: 18px", "Pricespy-fi": "width: 77px; height: 18px", "Pricespy-fr": "width: 88px; height: 18px", "Pricespy-no": "width: 63px; height: 18px", "Pricespy-nu": "width: 63px; height: 18px", Szallashu: "width: 76px; height: 13px; top: 2px", "Szallashu-com": "width: 95px; height: 18px", "Szallashu-cz": "width: 61px; height: 19px; top: 3px", "Szallashu-pl": "width: 74px; height: 17px; top: 3px", "Szallashu-ro": "width: 100px; height: 19px", Provenexpert: "width: 98px; height: 21px; top: 3px", Vrbo: "width: 45px; height: 15px; top: 1px", Yell: "width: 38px; height: 14px; top: 2.5px", AngiesList: "width: 27px; height: 16px; top: 3px", Sitejabber: "width: 85px; height: 16px; top: 4px", Aliexpress: "width: 67px; height: 16px; top: 3.5px" } }, this.richSnippetLoaded = document.querySelectorAll('script[src*=".trustindex.io/assets/js/richsnippet.js"], script[type="application/ld+json"][data-trustindex="1"]').length > 0;
    }
    static loadRichSnippet(t2) {
      !this.richSnippetLoaded && t2 && (this.richSnippetLoaded = true, this.addJS(this.getCDNUrl() + "assets/js/richsnippet.js?" + t2));
    }
    static loadWidgetsFromDom() {
      return e(this, null, (function* () {
        document.querySelectorAll(this.getScriptSelector("loader")).forEach(((t2) => {
          if (t2.getAttribute("data-ti-widget-inited")) return;
          t2.setAttribute("data-ti-widget-inited", true);
          let i2 = this.getScriptKey(t2);
          if (!i2) return;
          let s2 = !this.isInIframe() && this.isAttributeEnabled(t2, "data-enable-delay-load");
          if ("SCRIPT" === t2.tagName) {
            let e2 = document.createElement("div");
            e2.key = t2.key, this.addScriptEmbedNoticeForWordpress(t2, i2), t2.replaceWith(e2), t2 = e2;
          }
          t2.key = i2, t2.isTriggerLoad = (e2) => this.isInLoadTriggerZone(t2, e2), ((t3) => {
            e(this, null, (function* () {
              let e2 = yield this.getWidgetHtml(t3);
              if (false === e2) return t3.innerHTML = `
						Widget not found! Probably it is already deleted or there is typo in its ID.
						We suggest that you log in to the <a href="https://admin.trustindex.io/" target="_blank">Trustindex system</a> and follow the widget configuration instructions.
						Or, if you don't have an account, create one for free at <a href="https://www.trustindex.io?a=sys&c=widget-not-found" target="_blank">www.trustindex.io</a>
					`;
              if (!e2) return t3.replaceWith(document.createComment("Trustindex widget (" + t3.key + ") is empty here."));
              if (/style="[^"]*border: 4px dashed red[^"]*"/.test(e2)) return t3.innerHTML = e2;
              let i3 = -1 !== e2.indexOf('data-lazy-load-disabled="1"');
              s2 || this.isInIframe() || (s2 = -1 !== e2.indexOf('data-delay-load="1" class="ti-widget'));
              let r2 = /(?:data-layout-category="[^"]*floating[^"]*"|data-layout-id="(?:17|21|52|53)")/.test(e2);
              if (t3.closest("head") && !r2) return;
              t3.contentHtml = e2;
              let o2 = /data-rich-snippet="([^"]+)"/.exec(e2);
              this.loadRichSnippet(o2 ? o2[1] : null), i3 || r2 || this.isCrawler() ? new TrustindexWidget(null, t3) : t3.isTriggerLoad(100) ? s2 ? window.tiElementToWaitForActivity.push(t3) : new TrustindexWidget(null, t3) : this.isInIframe() ? this.onApproachingViewport(t3, (() => new TrustindexWidget(null, t3))) : (t3.isWaitForVisibility = true, window.tiElementToWaitForActivity.push(t3));
            }));
          })(t2);
        }));
      }));
    }
    static addScriptEmbedNoticeForWordpress(t2, e2) {
      let i2 = document.querySelector('meta[name="ti-notice-script-tag"]');
      if (!i2) return;
      let s2 = "[" + (i2.getAttribute("content") || "trustindex") + ' data-widget-id="' + e2 + '"]', r2 = document.createElement("div");
      r2.setAttribute("style", "margin: 20px 0px; padding: 15px; color: #31708f; background-color: #d9edf7; border-color: #bcdff1; border-radius: 5px"), r2.innerHTML = `<strong>Do you want AI tools to understand your reviews?</strong>
			<br />Replace the JavaScript embed code with the shortcode below. Copy and paste it where you want the widget to appear. This makes your review content easier for search engines and AI tools to discover and understand.
			<div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin: 10px 0px">
				<code style="padding: 6px 10px; background: rgba(0, 0, 0, 0.06); border-radius: 4px">${s2}</code>
				<button type="button" style="cursor: pointer; padding: 6px 12px; border: 0; outline: 0; border-radius: 4px; background: rgba(0, 0, 0, 0.12); color: inherit; font: inherit">Copy shortcode</button>
			</div>
			<i style="opacity: 0.65">(This message is not visible to visitors in public mode.)</i>`;
      let o2 = r2.querySelector("button");
      o2.addEventListener("click", (() => {
        navigator.clipboard.writeText(s2).then((() => {
          let t3 = o2.textContent;
          o2.textContent = "✓", setTimeout((() => o2.textContent = t3), 1500);
        }));
      }));
      let a2 = document.querySelector('meta[name="ti-notice-dismiss-url"]');
      a2 && this.addNoticeDismissLink(r2, a2.getAttribute("content")), t2.before(r2);
    }
    static initNoticesForWordpress() {
      document.querySelectorAll(".ti-wp-notice:not([data-ti-notice-inited])").forEach(((t2) => {
        t2.setAttribute("data-ti-notice-inited", "1");
        let e2 = t2.getAttribute("data-ti-notice-dismiss-url");
        e2 && this.addNoticeDismissLink(t2, e2, t2.getAttribute("data-ti-notice-dismiss-text"));
      }));
    }
    static addNoticeDismissLink(t2, e2, i2 = null) {
      let s2 = document.createElement("div");
      s2.setAttribute("style", "margin-top: 10px; text-align: right");
      let r2 = document.createElement("a");
      r2.setAttribute("href", "#"), r2.setAttribute("style", "color: inherit; text-decoration: underline; cursor: pointer"), r2.textContent = i2 || "Dismiss", r2.addEventListener("click", ((i3) => {
        i3.preventDefault(), t2.remove(), this.request(e2, "POST").then(((t3) => {
        }));
      })), s2.appendChild(r2), t2.appendChild(s2);
    }
    static initWidgetsFromDom(t2 = false, e2, i2) {
      let s2 = this.widgetsForInit || document.querySelectorAll(".ti-widget:not(.ti-certificate):not(.ti-feed-widget)" + (t2 ? "" : ":not([data-trustindex-widget])"));
      s2.forEach(((t3) => this.loadRichSnippet(t3.getAttribute("data-rich-snippet")))), void 0 !== e2 && s2.length ? (void 0 === this.widgetsForInit && (this.widgetsForInit = s2), new TrustindexWidget(s2[e2]), ++e2 < s2.length ? setTimeout((() => this.initWidgetsFromDom(t2, e2, i2)), 20) : (delete this.widgetsForInit, i2 && i2())) : (s2.forEach(((t3) => new TrustindexWidget(t3))), i2 && i2());
    }
    static getWidgetHtml(t2) {
      return e(this, null, (function* () {
        let e2 = this.getWidgetUrl(t2.key) + "content.html";
        if ("wp-widget" === t2.key) {
          let i3 = t2.getAttribute("data-template-id");
          if (i3) {
            let e3 = document.getElementById(i3);
            if (e3) return t2.removeAttribute("data-template-id"), e3.innerHTML.replace(/decoding="async"/g, "").replace(/ (?:src|srcset|data-src|data-srcset|data-ti-src|data-ti-srcset|consent-original-src-_|consent-original-srcset-_|consent-original-data-src-_|consent-original-data-srcset-_)="(?!http)[^"]*"/g, "").replace(/data-ti-src="[^"]+lazy\.(png|jpg|jpeg|gif|svg)"/g, "").replace(/consent-original-class-_="/g, 'class="').replace(/consent-original-src-_="/g, 'src="').replace(/consent-original-srcset-_="/g, 'srcset="').replace(/consent-original-data-src-_="/g, 'data-src="').replace(/consent-original-data-srcset="/g, 'data-srcset="').replace(/<noscript>[^<]+<\/noscript>/g, "").replace(/data-(?:lazy-|ti-)?src="/g, 'src="').replace(/data-(?:lazy-|ti-)?srcset="/g, 'srcset="').replace(/<trustindex-image/g, "<img").replace(/><\/trustindex-image>/g, "/>").replace(/data-imgurl(set)?="/g, 'src$1="');
          }
          e2 = t2.getAttribute("data-html-url");
        }
        let i2 = yield this.request(e2);
        return i2 && -1 !== location.href.indexOf(this.getCDNUrl() + "amp-widget") && (i2 = i2.replace(/<img/g, '<img crossorigin="anonymus"')), i2;
      }));
    }
    static destroyWidgets() {
      window.tiWidgetInstances.forEach(((t2) => t2.destroy())), window.tiWidgetInstances = [];
    }
    static profileImageFallback(t2, e2 = null) {
      null === e2 && (e2 = this.getDefaultAvatarUrl()), t2.querySelectorAll(".ti-profile-img img").forEach(((t3) => {
        if (!t3.complete || void 0 !== t3.naturalWidth && 0 !== t3.naturalWidth) {
          let i2 = (t4) => {
            (t4 = t4.target || t4).setAttribute("src", e2), t4.removeAttribute("srcset"), t4.removeEventListener("error", i2);
          };
          t3.removeEventListener("error", i2), t3.addEventListener("error", i2);
        } else t3.setAttribute("src", e2), t3.removeAttribute("srcset");
      }));
    }
    static getJsonDataElement(t2, e2 = null) {
      let i2 = e2 ? "." + e2 : "";
      return t2.querySelector("script" + i2 + '[type="application/ld+json"], ' + i2 + "[data-ti-json]");
    }
    static parseJsonData(t2) {
      return JSON.parse(void 0 !== t2.dataset.tiJson ? decodeURIComponent(t2.dataset.tiJson) : t2.innerHTML);
    }
    static restoreRewrittenImages(t2) {
      let e2 = { src: ["data-src", "data-lazy-src", "data-ti-src", "data-imgurl", "data-orig-src", "consent-original-src-_"], srcset: ["data-srcset", "data-lazy-srcset", "data-ti-srcset", "data-imgurlset", "consent-original-srcset-_"] };
      t2.querySelectorAll("img").forEach(((t3) => {
        Object.keys(e2).forEach(((i2) => {
          let s2 = e2[i2].map(((e3) => t3.getAttribute(e3))).find(((t4) => t4 && /^(https?:)?\/\//.test(t4)));
          s2 && s2 !== t3.getAttribute(i2) && t3.setAttribute(i2, s2);
        }));
      }));
    }
  }
  var s = (t2, e2, i2) => new Promise(((s2, r2) => {
    var o2 = (t3) => {
      try {
        n2(i2.next(t3));
      } catch (t4) {
        r2(t4);
      }
    }, a2 = (t3) => {
      try {
        n2(i2.throw(t3));
      } catch (t4) {
        r2(t4);
      }
    }, n2 = (t3) => t3.done ? s2(t3.value) : Promise.resolve(t3.value).then(o2, a2);
    n2((i2 = i2.apply(t2, e2)).next());
  }));
  class r {
    constructor(t2, e2 = null) {
      if (this.classes = [], t2) {
        let e3 = r.getComparableContent(t2);
        if (this.getWidget(t2), !t2.container) return;
        this.contentCheck = Promise.race([this.sendViewStat(e3).catch(((t3) => {
        })), new Promise(((t3) => setTimeout(t3, 3e3)))]), this.scheduleInit();
        let i2 = t2.getAttribute("data-css-url");
        i2 || "wp-widget" === t2.pid || (i2 = this.getWidgetStylesheetUrl()), this.loadWidgetStylesheet(i2, (() => {
        }));
      }
      e2 && this.load(e2), window.tiWidgetInstances.push(this);
    }
    getWidget(t2) {
      t2.setAttribute("data-trustindex-widget", true), t2.layoutId = t2.getAttribute("data-layout-id"), t2.layoutCategory = (t2.getAttribute("data-layout-category") || "").split(", "), t2.setId = t2.getAttribute("data-set-id"), t2.pid = t2.getAttribute("data-pid") || "wp-widget", t2.cssVersion = t2.getAttribute("data-css-version") || null, t2.language = t2.getAttribute("data-language") || "en", t2.locales = { close: t2.getAttribute("data-close-locale") || "Close" }, t2.footerLinkDomain = t2.getAttribute("data-footer-link-domain") || null, t2.size = parseFloat(t2.getAttribute("data-size") || 1), t2.isLazyLoadDisabled = t2.hasAttribute("data-lazy-load-disabled"), t2.isDelayLoadEnabled = Trustindex.isAttributeEnabled(t2, "data-delay-load"), t2.layoutId && (t2.layoutId = parseInt(t2.layoutId)), t2.container = t2.querySelector(".ti-widget-container"), t2.setAttribute("data-no-translation", true), this.widget = t2, t2.container && this.getSubclasses();
    }
    getSubclasses() {
      this.widget.TrustindexWidget = this, this.classes = [], this.widget.querySelector(".ti-reviews-container") && (this.widget.TrustindexReviewWidget = new TrustindexReviewWidget(this.widget), this.classes.push(this.widget.TrustindexReviewWidget), this.widget.getAttribute("data-column-vertical-separate") && (this.widget.TrustindexMasonryWidget = new TrustindexMasonryWidget(this.widget), this.classes.push(this.widget.TrustindexMasonryWidget)), Trustindex.getJsonDataElement(this.widget, "ti-ai-summary") && (this.widget.TrustindexAiSummaryModule = new TrustindexAiSummaryModule(this.widget), this.classes.push(this.widget.TrustindexAiSummaryModule)), (Trustindex.getJsonDataElement(this.widget, "ti-lightbox-data") || "popup" === this.widget.reviewTextMode) && (this.widget.TrustindexReviewImageModule = new TrustindexReviewImageModule(this.widget), this.widget.TrustindexLightboxModule = new TrustindexLightboxModule(this.widget), this.classes.push(this.widget.TrustindexReviewImageModule), this.classes.push(this.widget.TrustindexLightboxModule)), "readmore" !== this.widget.reviewTextMode && "popup" !== this.widget.reviewTextMode || !this.widget.querySelector(".ti-review-item .ti-read-more") || (this.widget.TrustindexReadMoreModule = new TrustindexReadMoreModule(this.widget), this.classes.push(this.widget.TrustindexReadMoreModule)), this.widget.getAttribute("data-pager-autoplay-timeout") && (this.widget.TrustindexSliderWidget = new TrustindexSliderWidget(this.widget), this.classes.push(this.widget.TrustindexSliderWidget)), this.widget.querySelector(".ti-load-more-reviews-button") && (this.widget.TrustindexLoadMoreModule = new TrustindexLoadMoreModule(this.widget), this.classes.push(this.widget.TrustindexLoadMoreModule)), this.widget.querySelector(".ti-widget-header") && (this.widget.TrustindexHeaderModule = new TrustindexHeaderModule(this.widget), this.classes.push(this.widget.TrustindexHeaderModule))), this.widget.querySelector('a[href="#popup"], a[href="#dropdown"]') && (this.widget.TrustindexPopupWidget = new TrustindexPopupWidget(this.widget), this.classes.push(this.widget.TrustindexPopupWidget)), this.widget.querySelector(".ti-top-rated-title") && (this.widget.TrustindexTopRatedWidget = new TrustindexTopRatedWidget(this.widget), this.classes.push(this.widget.TrustindexTopRatedWidget)), -1 !== this.widget.layoutCategory.indexOf("fomo") && (this.widget.TrustindexFomoWidget = new TrustindexFomoWidget(this.widget), this.classes.push(this.widget.TrustindexFomoWidget)), this.widget.TrustindexDarkModeModule = new TrustindexDarkModeModule(this.widget), this.classes.push(this.widget.TrustindexDarkModeModule), (-1 !== this.widget.layoutCategory.indexOf("floating") || -1 !== this.widget.layoutCategory.indexOf("fomo") || this.widget.querySelector(".disable-widget")) && (this.widget.TrustindexCloseModule = new TrustindexCloseModule(this.widget), this.widget && this.classes.push(this.widget.TrustindexCloseModule));
    }
    callSubclassesMethods() {
      let t2 = arguments[0];
      this.classes.forEach(((e2) => {
        "function" == typeof e2[t2] && e2[t2](...Array.from(arguments).slice(1));
      }));
    }
    getWidgetStylesheetUrl() {
      if (!this.widget.setId) return null;
      let t2 = Trustindex.getCDNUrl() + "assets/widget-presetted-css/" + this.widget.layoutId + "-" + this.widget.setId + ".css";
      return this.widget.cssVersion && (t2 = t2.replace("widget-presetted-css/", "widget-presetted-css/v" + this.widget.cssVersion + "/")), t2;
    }
    loadWidgetStylesheet(t2, e2) {
      if (!t2) return e2(true);
      let i2 = this.getWidgetStylesheet(t2);
      if (this.isWidgetStylesheetLoaded(t2)) return e2(true);
      let s2 = this.getComparableStylesheetUrl(t2);
      void 0 === r.pendingStylesheetCallbacks && (r.pendingStylesheetCallbacks = new Map());
      let o2 = r.pendingStylesheetCallbacks.get(s2);
      if (o2) return void o2.push(e2);
      r.pendingStylesheetCallbacks.set(s2, [e2]);
      let a2 = false, n2 = (t3) => {
        if (a2) return;
        a2 = true;
        let e3 = r.pendingStylesheetCallbacks.get(s2) || [];
        r.pendingStylesheetCallbacks.delete(s2), e3.forEach(((e4) => e4(t3)));
      };
      if (i2) return i2.addEventListener("load", (() => n2(true)), { once: true }), i2.addEventListener("error", (() => n2(false)), { once: true }), void (this.isWidgetStylesheetLoaded(t2) && n2(true));
      Trustindex.addCSS(t2, (() => n2(true)), false, (() => n2(false)));
    }
    isWidgetStylesheetLoaded(t2) {
      let e2 = this.getComparableStylesheetUrl(t2);
      return Array.from(document.styleSheets).some(((t3) => t3.href && this.getComparableStylesheetUrl(t3.href) === e2));
    }
    getWidgetStylesheet(t2) {
      let e2 = this.getComparableStylesheetUrl(t2);
      return Array.from(document.querySelectorAll('link[rel~="stylesheet"][href]')).find(((t3) => t3.href && this.getComparableStylesheetUrl(t3.href) === e2)) || null;
    }
    getComparableStylesheetUrl(t2) {
      try {
        let e2 = new URL(t2, document.baseURI);
        return e2.origin + e2.pathname;
      } catch (e2) {
        return t2.replace(/[?#].*$/, "");
      }
    }
    load(t2) {
      let e2 = new DOMParser().parseFromString(t2.contentHtml, "text/html"), i2 = e2.querySelector(".ti-widget");
      if (t2.replaceWith(i2), this.getWidget(i2), Trustindex.isCrawler() || Trustindex.hide(i2), !i2.layoutId || !i2.container) return i2.innerHTML = "Layout id or container not found!";
      i2.insertedElements = [], e2.body.querySelectorAll("*").forEach(((t3) => {
        i2.after(t3), i2.insertedElements.push(t3);
      }));
      let s2 = t2.getAttribute("data-css-url");
      s2 || "wp-widget" === t2.key || (s2 = this.getWidgetStylesheetUrl());
      let r2 = false;
      this.loadWidgetStylesheet(s2, (() => {
        r2 || (r2 = true, Trustindex.show(i2), this.scheduleInit());
      }));
    }
    static getComparableContent(t2) {
      let e2 = t2.cloneNode(true);
      return e2.querySelectorAll("script, noscript, [data-ti-json]").forEach(((t3) => t3.remove())), e2.querySelectorAll("*").forEach(((t3) => {
        Array.from(t3.attributes).forEach(((e3) => {
          "IMG" !== t3.tagName && 0 === e3.name.indexOf("data-") || t3.removeAttribute(e3.name);
        }));
      })), e2.innerHTML.replace(/<!--[\s\S]*?-->/g, "").replace(/\s+/g, "");
    }
    sendViewStat(t2) {
      return s(this, null, (function* () {
        if (!this.widget.pid || "wp-widget" === this.widget.pid || this.widget.isContentChecked) return;
        this.widget.isContentChecked = true;
        let e2 = yield Trustindex.request(Trustindex.getWidgetUrl(this.widget.pid) + "content.html");
        if (!e2) return;
        let i2 = new DOMParser().parseFromString(e2, "text/html").querySelector(".ti-widget");
        if (i2 && t2 === r.getComparableContent(i2)) return;
        let s2 = document.createElement("div");
        s2.key = this.widget.pid, s2.contentHtml = e2;
        let o2 = this.widget;
        window.tiWidgetInstances = window.tiWidgetInstances.filter(((t3) => t3 !== this)), this.destroy();
        let a2 = o2.nextElementSibling;
        if (a2 && a2.matches("pre.ti-hidden-markup") && a2.querySelector("style") && a2.remove(), o2.replaceWith(s2), !i2) return s2.innerHTML = e2;
        new r(null, s2).widget.isContentChecked = true;
      }));
    }
    scheduleInit() {
      if (this.widget.isLazyLoadDisabled || this.isFloatingWidget() || Trustindex.isEditorPreview()) return this.initWidget();
      let t2 = () => Trustindex.onApproachingViewport(this.widget, (() => this.initWidget()));
      return this.widget.isDelayLoadEnabled && !Trustindex.isInIframe() ? Trustindex.onFirstActivity(t2) : t2();
    }
    revealWidget() {
      ["display", "opacity", "height", "overflow"].forEach(((t2) => this.widget.style.removeProperty(t2))), "" === this.widget.getAttribute("style") && this.widget.removeAttribute("style");
    }
    initWidget() {
      Trustindex.restoreRewrittenImages(this.widget), this.moveFloatingWidgetToBody(), this.updateFooterLink(), Trustindex.waitForVisibility(this.widget.container, (() => s(this, null, (function* () {
        if (yield this.contentCheck, !this.widget) return;
        this.revealWidget(), this.format(), this.resize(true), this.registerEvents();
        let t2 = new CustomEvent("widget-ready", { detail: { widget: this } });
        window.dispatchEvent(t2);
      }))));
    }
    isFloatingWidget() {
      return -1 !== this.widget.layoutCategory.indexOf("floating") || -1 !== this.widget.layoutCategory.indexOf("fomo") || -1 !== [17, 21, 52, 53].indexOf(this.widget.layoutId);
    }
    moveFloatingWidgetToBody() {
      if (!this.isFloatingWidget() || Trustindex.isAdminUrl() || Trustindex.isWordpressAdminUrl()) return;
      if (!document.body) return setTimeout((() => this.moveFloatingWidgetToBody()), 40);
      let t2 = this.widget;
      document.body.appendChild(t2);
      let e2 = 0;
      t2.floatBodyCheckInterval = setInterval((() => {
        t2.parentNode !== document.body && (document.body.appendChild(t2), clearInterval(t2.floatBodyCheckInterval)), e2++, e2 > 20 && clearInterval(t2.floatBodyCheckInterval);
      }), 100);
    }
    updateFooterLink() {
      if (!this.widget.footerLinkDomain || -1 === window.location.href.indexOf(this.widget.footerLinkDomain) || Trustindex.isTestWidgetUrl() || Trustindex.isInIframe()) return;
      let t2 = this.widget.querySelector('a[href][target="_blank"]');
      t2 && t2.removeAttribute("target");
    }
    format() {
      this.updateLogoImages(), this.widget.querySelectorAll(".ti-profile-img-sprite").forEach(((t3) => this.widget.TrustindexWidget.loadSpriteImage(t3))), this.widget.querySelectorAll(".ti-company-sprite-profile-image").forEach(((t3) => this.loadSpriteImage(t3)));
      let t2 = this.widget.querySelectorAll(".ti-fade-container");
      if (t2.length > 1) {
        t2.forEach(((t3) => t3.removeAttribute("style"))), this.widget.fadeContainerInterval && clearInterval(this.widget.fadeContainerInterval);
        let e3 = 0;
        this.widget.fadeContainerInterval = setInterval((() => {
          let i2 = e3;
          e3++, e3 > t2.length - 1 && (e3 = 0), t2[e3].style.display = "flex", t2[i2].style.opacity = 0, setTimeout((() => {
            t2[e3].style.opacity = 1, t2[i2].style.display = "none";
          }), 10);
        }), 3e3);
      }
      let e2 = this.widget.querySelector(".ti-verified-by-row .ti-disclaimer");
      e2 && (e2.innerHTML = e2.innerHTML.replace(/^(.+?)[.!?]\s/, "<strong>$1.</strong> ")), this.callSubclassesMethods("format"), this.formatInternationalNumbers(), this.widget.querySelectorAll(".ti-footer, .ti-header").forEach(((t3) => {
        let e3 = Trustindex.getDefaultCompanyAvatarUrl();
        return -1 === this.widget.layoutCategory.indexOf("button") && -1 === this.widget.layoutCategory.indexOf("fomo") || (e3 = null), Trustindex.profileImageFallback(t3, e3);
      }));
    }
    resize(t2 = false) {
      if (void 0 === this.widget.TrustindexReviewWidget) return;
      this.widget.style.width = "";
      let e2 = this.widget.offsetWidth;
      Trustindex.hide(this.widget);
      let i2 = window.getComputedStyle(this.widget, null).getPropertyValue("width"), s2 = this.widget, r2 = 0, o2 = 0;
      do {
        if (s2 = s2.parentNode, !s2 || "HTML" === s2.nodeName) break;
        if (s2.clientWidth) {
          let t3 = window.getComputedStyle(s2, null);
          o2 = parseFloat(t3.paddingLeft) + parseFloat(t3.paddingRight), r2 = s2.clientWidth - o2;
        }
      } while (r2 < 100);
      "100%" === i2 && r2 && e2 > r2 ? (this.widget.style.width = r2 + "px", Trustindex.show(this.widget), r2 < s2.offsetWidth - o2 && (this.widget.style.width = s2.offsetWidth - o2 + "px")) : Trustindex.show(this.widget), this.widget.originalColCount <= 1 ? this.classes.forEach(((t3) => {
        "function" == typeof t3.resize && t3.callOneOriginalColumnResize && t3.resize();
      })) : (this.callSubclassesMethods("resize", t2), this.resizeAfter());
    }
    resizeAfter() {
      this.callSubclassesMethods("resizeAfter");
    }
    getPublicId() {
      return this.widget.pid;
    }
    getReviews() {
      return void 0 !== this.widget.TrustindexReviewWidget ? this.widget.TrustindexReviewWidget.getReviews() : null;
    }
    destroy() {
      this.callSubclassesMethods("destroy"), this.widget.floatBodyCheckInterval && clearInterval(this.widget.floatBodyCheckInterval), delete this.widget.layoutId, delete this.widget.container, delete this.widget;
    }
    registerEvents() {
      this.widget.addEventListener("click", ((t2) => {
        t2.target.matches('a[href="#popup"], a[href="#dropdown"]') && (t2.stopPropagation(), this.callSubclassesMethods("click", t2));
      }), true), this.widget.addEventListener("click", ((t2) => {
        if (t2.target.matches(".ti-header-write-btn-container > .ti-header-write-btn:not([href])")) {
          t2.preventDefault();
          let e2 = t2.target.closest(".ti-header-write-btn-container").querySelector(".ti-write-btn-dropdown");
          e2.classList.contains("ti-active") || (e2.classList.add("ti-active"), setTimeout((() => {
            document.addEventListener("click", (() => e2.classList.remove("ti-active")), { once: true });
          }), 1));
        }
        this.callSubclassesMethods("click", t2);
      })), this.widget.addEventListener("keydown", ((t2) => {
        "Enter" === t2.key && this.callSubclassesMethods("enter", t2);
      }));
    }
    documentClick() {
      this.callSubclassesMethods("documentClick", event);
    }
    documentKeyup() {
      this.callSubclassesMethods("documentKeyup", event);
    }
    isOnViewport() {
      let t2 = this.widget.container.getBoundingClientRect(), e2 = this.widget.container.offsetWidth - 40, i2 = this.widget.container.offsetHeight - 40;
      return t2.top >= -1 * i2 && t2.left >= -1 * e2 && t2.right <= (window.innerWidth || document.documentElement.clientWidth) + i2 && t2.bottom <= (window.innerHeight || document.documentElement.clientHeight) + i2;
    }
    loadSpriteImage(t2) {
      let e2 = Trustindex.getWidgetUrl(this.widget.pid) + "sprite.jpg", i2 = 0, s2 = 0, r2 = 0;
      if (!t2.classList.contains("ti-company-sprite-profile-image")) {
        let e3 = t2.closest(".ti-review-item"), o3 = getComputedStyle(t2);
        if (e3 || (e3 = t2.closest(".ti-profile-img")), "auto" === o3.height || "0px" === o3.height) return setTimeout((() => this.loadSpriteImage(t2)), 100);
        i2 = e3.getAttribute("data-index") ? parseInt(e3.getAttribute("data-index")) : [].indexOf.call(e3.parentNode.children, e3) - e3.parentNode.querySelectorAll(".ti-ai-summary-item").length, s2 = parseInt(o3.height || "0"), s2 && !isNaN(s2) || (s2 = 40);
        let a2 = this.widget.querySelector(".ti-company-sprite-profile-image");
        a2 && (o3 = getComputedStyle(a2), r2 = parseInt(o3.height || "0"), r2 && !isNaN(r2) || (r2 = 65));
      }
      let o2 = function() {
        t2.style.background = 'url("' + e2 + '") 0 ' + (i2 * s2 * -1 - r2) + "px";
      };
      t2.getAttribute("data-webp") ? Trustindex.isWebpSupported(((t3) => {
        t3 && (e2 = e2.replace(".jpg", ".webp")), o2();
      })) : o2();
    }
    updateLogoImages() {
      void 0 !== this.widget.TrustindexTopRatedWidget && void 0 === this.widget.TrustindexSliderWidget || this.widget.querySelectorAll("\n				.ti-header-logo .ti-header-logo-img:not([data-logo-styles-added]):not([data-no-logo-styles]),\n				.ti-large-logo img:not([data-logo-styles-added]):not([data-no-logo-styles]),\n				.ti-small-logo img:not([data-logo-styles-added]):not([data-no-logo-styles])\n			").forEach(((t2) => {
        let e2 = "small-logo";
        t2.matches(".ti-header-logo .ti-header-logo-img") ? e2 = "header-logo" : t2.matches(".ti-large-logo img") && (e2 = "large-logo");
        let i2 = t2.getAttribute("alt"), s2 = Trustindex.additionalLogoStyles[e2][i2] || null, r2 = /\/logo-([^-\.]+)/.exec(t2.src);
        if (r2 && (s2 = Trustindex.additionalLogoStyles[e2][i2 + "-" + r2[1]] || s2), s2) {
          let i3 = s2.replace(/((?:height|width): \d+px)/g, "$1 !important");
          "small-logo" !== e2 && "large-logo" !== e2 || (i3 = i3.replace(/([\d.]+)px/g, ((t3, e3) => {
            let i4 = parseFloat(e3) * this.widget.size;
            return Math.round(10 * i4) / 10 + "px";
          }))), t2.setAttribute("style", i3), t2.setAttribute("data-size", this.widget.size);
        }
        t2.setAttribute("data-logo-styles-added", 1);
      }));
    }
    formatInternationalNumbers() {
      let t2 = [".ti-header-rating-reviews", ".ti-footer .ti-rating-text", ".ti-footer strong", ".ti-header .ti-rating-text", ".ti-header .ti-text span", ".ti-ai-summary-item .ti-date", ".ti-header .nowrap strong", ".ti-header .ti-profile-details .ti-text", ".ti-popup-header .ti-rating-text"];
      -1 !== [118, 119, 120].indexOf(this.widget.layoutId) && (t2.push(".ti-header .ti-title-text"), t2.push(".ti-header .ti-subtitle-text")), this.widget.querySelectorAll(t2.join(", ")).forEach(((t3) => {
        if (t3.hasAttribute("data-number-formatted")) return;
        let e2 = (t4) => {
          if (t4.nodeType !== Node.TEXT_NODE) {
            if (t4.nodeType === Node.ELEMENT_NODE) {
              if (t4.hasAttribute("data-number-formatted")) return;
              t4.childNodes.forEach(((t5) => e2(t5)));
            }
          } else {
            let e3 = t4.textContent, i2 = e3.match(/\b\d{4,}\b/);
            if (!i2) return;
            let s2 = parseInt(i2[0], 10);
            if (!s2) return;
            let r2 = Intl.NumberFormat(Trustindex.getLocaleTag(this.widget.language)).format(s2);
            t4.textContent = e3.replace(i2[0], r2);
          }
        };
        e2(t3), t3.setAttribute("data-number-formatted", 1);
      }));
    }
  }
  class o {
    constructor(t2) {
      t2.reviewTextMode = t2.getAttribute("data-review-text-mode") || "readmore", t2.reviewsContainer = t2.querySelector(".ti-reviews-container"), t2.reviewsContainerWrapper = t2.querySelector(".ti-reviews-container-wrapper"), t2.locales.time = t2.getAttribute("data-time-locale"), t2.locales.replyBy = t2.getAttribute("data-reply-by-locale"), t2.locales.onlyRating = t2.getAttribute("data-only-rating-locale"), t2.locales.onlyRating || "en" !== t2.language || (t2.locales.onlyRating = "This user only left a rating."), t2.isCompanyBadge = t2.container.offsetWidth > t2.reviewsContainer.offsetWidth, t2.reviewTargetWidth = parseInt(t2.getAttribute("data-review-target-width") || (t2.isCompanyBadge ? 275 : 300)), this.widget = t2, this.widget.originalColCount = this.getColCount(), this.initHeaderClick();
    }
    getReviews() {
      let t2 = [];
      return this.widget.reviewsContainer.querySelectorAll(".ti-review-item:not(.ti-cloned)").forEach(((e2) => {
        let i2 = "", s2 = "-", r2 = e2.querySelectorAll(".ti-stars .ti-star.f").length + e2.querySelectorAll(".ti-stars .ti-star.h").length / 2, o2 = new Date(1e3 * parseInt(e2.getAttribute("data-time"))).toISOString().replace("Z", "+00:00"), a2 = e2.querySelector(".ti-review-text-container");
        a2 && !a2.classList.contains("ti-empty-text") && (i2 = this.getReviewText(a2), s2 = e2.getAttribute("data-language") || null), t2.push({ id: e2.getAttribute("data-id") || null, url: e2.getAttribute("data-platform-page-url") || null, language: s2, createdAt: o2, reviewerName: e2.querySelector(".ti-name").textContent.trim(), reviewBody: i2, rating: e2.getAttribute("data-rating") || r2, maxRating: parseInt(e2.getAttribute("data-max-rating") || 0) });
      })), t2;
    }
    getReviewText(t2) {
      let e2 = t2.querySelector(".ti-reply-by-owner-title"), i2 = "";
      if (t2.querySelector(".ti-show-original-text")) {
        let e3 = Trustindex.parseJsonData(Trustindex.getJsonDataElement(t2));
        return e3.text || e3;
      }
      if (e2) {
        let s2 = t2.firstChild;
        for (; s2 && s2 !== e2; ) s2.nodeType === Node.TEXT_NODE && (i2 += s2.textContent), s2.nodeType === Node.ELEMENT_NODE && "SCRIPT" !== s2.tagName && (i2 += s2.textContent), s2 = s2.nextSibling;
      } else i2 = t2.textContent;
      return i2.trim();
    }
    format() {
      this.widget.isCompanyBadge = this.widget.container.offsetWidth > this.widget.reviewsContainer.offsetWidth, this.widget.reviewsContainer.querySelectorAll(".ti-review-item").forEach(((t2) => this.formatReview(t2)));
    }
    formatReview(t2) {
      let e2 = t2.querySelector(".ti-review-text-container");
      e2 && (this.formatReviewText(e2), e2.classList.contains("ti-empty-text") || e2.querySelectorAll(".ti-review-image").forEach(((t3) => {
        let e3 = document.createElement("span");
        e3.textContent = "​", t3.after(e3), e3.offsetTop - t3.offsetTop > 20 && this.widget.classList.add("ti-ios-fallback"), e3.remove();
      })));
      let i2 = t2.getAttribute("data-platform-page-url");
      if (i2 && -1 !== i2.indexOf("trustpilot.com")) {
        let e3 = t2.querySelector(".ti-name");
        e3 && (e3.style.cursor = "pointer", e3.addEventListener("click", ((t3) => Trustindex.openWindow(i2))));
      }
      let s2 = t2.getAttribute("data-time");
      if (s2 && this.widget.locales.time) {
        let e3 = t2.querySelector(".ti-date:not(.ti-date-comment)");
        if (e3) {
          let t3 = new Date(1e3 * s2).toLocaleString(Trustindex.getLocaleTag(this.widget.language), { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", timeZoneName: "short" });
          e3.innerHTML = `
					<span class="ti-with-tooltip">
						<span class="ti-tooltip" style="display:none">${t3}</span>
						${Trustindex.getRelativeTime(parseInt(s2), this.widget.locales.time)}
					</span>
				`;
          let i3 = e3.querySelector(".ti-tooltip");
          i3.style.width = i3.firstChild.offsetWidth + "px";
        }
      }
      Trustindex.profileImageFallback(t2);
    }
    formatReviewText(t2) {
      let e2 = t2.querySelectorAll("svg");
      if (0 === e2.length) {
        t2.querySelectorAll(".ti-review-image").forEach(((t3) => {
          [t3.previousSibling, ...t3.childNodes].filter(((t4) => t4 && Node.TEXT_NODE === t4.nodeType && "" === t4.textContent.trim())).forEach(((t4) => t4.remove()));
        }));
        let i2 = t2.innerHTML;
        i2 = i2.replace(/<img[^>]+class="emoji" alt="\u263a" src="[^'"]+">/gm, Trustindex.svgs.good + "&nbsp;&middot;&nbsp;").replace(/<img[^>]+class="emoji" alt="\u2639" src="[^'"]+">/gm, Trustindex.svgs.bad + "&nbsp;&middot;&nbsp;");
        let s2 = t2.closest(".ti-review-item").classList;
        if (s2.contains("source-Booking") || s2.contains("source-Arukereso")) {
          let t3 = -1 !== i2.indexOf("☺");
          i2 = i2.replace(/\s+\u263a/g, "<br /><br />" + Trustindex.svgs.good + "&nbsp;&middot;&nbsp;").replace(/\s+\u2639/g, (t3 ? "<br />" : "<br /><br />") + Trustindex.svgs.bad + "&nbsp;&middot;&nbsp;");
        }
        i2 = i2.replace(/\n/g, "<br />"), t2.innerHTML = Trustindex.getDecodedHtml(i2), e2 = t2.querySelectorAll("svg");
      }
      if (e2.length) {
        let i2 = 0.95 * parseInt(t2.style.fontSize || 14);
        e2.forEach(((t3) => {
          t3.style.width = i2 + "px", t3.style.height = i2 + "px";
        }));
      }
      if (!t2.innerHTML.trim().replace(/<!-- R-CONTENT -->/g, "").replace(/<br\s?\/?>/g, "").replace(new RegExp('<span class="ti-reply-by-owner-title">.*', "s"), "").replace(/<div class="ti-more-image-count">[\d+]+<\/div>/g, "").replace(/<div class="ti-review-image[^"]*"[^>]*><img[^>]*><\/div>/g, "")) {
        let e3 = t2.innerHTML.includes('<div class="ti-review-image');
        t2.innerHTML = e3 ? t2.innerHTML + this.widget.locales.onlyRating : this.widget.locales.onlyRating + t2.innerHTML;
      }
    }
    resize() {
      let t2 = this.widget.reviewsContainer.offsetWidth;
      if (this.widget.isCompanyBadge && void 0 !== this.widget.TrustindexSliderWidget && this.widget.TrustindexSliderWidget.footer) {
        if (void 0 === this.companyBadgeWidth) {
          this.companyBadgeWidth = this.widget.TrustindexSliderWidget.footer.offsetWidth;
          let t3 = window.getComputedStyle(this.widget.TrustindexSliderWidget.footer, null);
          this.companyBadgeWidth += parseInt(t3.getPropertyValue("margin-left")), this.companyBadgeWidth += parseInt(t3.getPropertyValue("margin-right"));
        }
        t2 = this.widget.container.offsetWidth - this.companyBadgeWidth;
      }
      let e2 = Math.floor(t2 / this.widget.reviewTargetWidth);
      e2 > 1 && 44 === this.widget.layoutId && e2--, e2 = Math.min(e2, this.getReviewCount()), this.widget.isCompanyBadge ? (t2 < 350 && (e2 = 0), this.widget.container.setAttribute("class", "ti-widget-container ti-col-" + (e2 + 1))) : (e2 < 1 && (e2 = 1), this.widget.container.setAttribute("class", "ti-widget-container ti-col-" + e2));
    }
    resizeAfter() {
      let t2 = 0;
      this.widget.reviewsContainer.querySelectorAll(".ti-verified-review.ti-verified-platform").forEach(((e2) => {
        let i2 = e2.querySelector(".ti-verified-tooltip");
        if (!t2) {
          let s2 = getComputedStyle(i2);
          t2 = e2.parentNode.offsetWidth - e2.offsetLeft - 5, parseInt(s2.left) < 0 && (t2 = e2.offsetLeft - e2.parentNode.offsetLeft - 5);
        }
        i2.style.width = t2 + "px";
      }));
    }
    click(t2) {
      if (t2.target.matches(".ti-show-original-text") && (this.showOriginalText(t2), void 0 !== this.widget.TrustindexReadMoreModule)) {
        let e2 = t2.target.closest(".ti-review-text-container");
        this.widget.TrustindexReadMoreModule.resetReview(e2);
      }
    }
    showOriginalText(t2) {
      t2.preventDefault(), t2.stopPropagation();
      let e2 = t2.target.closest(".ti-review-text-container"), i2 = Trustindex.parseJsonData(Trustindex.getJsonDataElement(e2)), s2 = void 0 !== i2.text ? i2.text : i2, r2 = e2.querySelector(".ti-review-image");
      r2 && (s2 = r2.outerHTML + s2), void 0 !== i2.reply && i2.reply && (s2 += '<br /><br /><span class="ti-reply-by-owner-title">' + this.widget.locales.replyBy + "</span><br />" + i2.reply), e2.innerHTML = s2, this.formatReviewText(e2);
    }
    initHeaderClick() {
      let t2 = this.widget.querySelector("a[href]:not(.ti-write-btn-dropdown-item):not(.ti-header-write-btn)");
      if (!t2) return;
      let e2 = t2.getAttribute("href");
      if (!e2 || "#" === t2.getAttribute("href")) return;
      let i2 = t2.closest(".ti-header:not(a), .ti-footer:not(a), .ti-popup-header:not(a)");
      i2 && i2.querySelector(".ti-large-logo, .ti-profile-img, .ti-profile-details, .ti-logo-stars-flex") && !i2.querySelector(".ti-disclaimer") && (i2.classList.add("ti-clickable-link"), i2.addEventListener("click", ((t3) => {
        if ("A" === t3.target.nodeName) return false;
        t3.preventDefault(), Trustindex.openWindow(e2);
      })));
    }
    getColCount() {
      let t2 = this.widget.container.classList.toString();
      return -1 === t2.indexOf("ti-col-") ? 1 : parseInt(t2.replace(/^.*ti-col-(\d+).*$/, "$1"));
    }
    getReviewCount() {
      return this.widget.reviewsContainer.querySelectorAll(".ti-review-item:not(.ti-cloned)").length;
    }
  }
  class a {
    constructor(t2) {
      this.widget = t2, this.callOneOriginalColumnResize = true, this.controls = this.widget.querySelector(".ti-controls"), this.footer = this.widget.container.querySelector(".ti-footer"), this.rotateTo = this.widget.getAttribute("data-rotate-to") || "right", this.autoPlayDirection = "right" === this.rotateTo ? "next" : "prev", this.autoPlayTimeout = parseInt(this.widget.getAttribute("data-pager-autoplay-timeout")), this.state = 0, this.position = "0px", this.prevButton = this.widget.querySelector(".ti-prev"), this.nextButton = this.widget.querySelector(".ti-next"), this.isMoving = false, this.isLoop = this.widget.getAttribute("data-slider-loop"), this.isMouseOver = false, this.stateLine = 0, this.lineContainer = this.widget.querySelector(".ti-controls-line"), this.lineDot = this.widget.querySelector(".ti-controls-line .dot"), this.addEvents();
    }
    format() {
      if (this.reviewNum = this.getReviewNum(), this.visibleReviewNum = null, this.widget.reviewsContainerWrapper.querySelectorAll(".ti-review-item").forEach(((t2) => t2.style.position = "relative")), "left" === this.rotateTo) {
        Array.from(this.widget.reviewsContainerWrapper.querySelectorAll(".ti-review-item")).reverse().forEach(((t2) => this.widget.reviewsContainerWrapper.appendChild(t2)));
      }
      this.setAutoplay();
    }
    resize(t2 = false) {
      let e2 = this.getVisibleReviewNum();
      (t2 || e2 !== this.visibleReviewNum) && (null === this.visibleReviewNum && this.reset(false), this.reviewNum = this.getReviewNum(), this.visibleReviewNum = e2, this.renderLine(), this.toggleNavigation(), setTimeout((() => this.verticalPositionElements()), 4)), this.move(this.state, "resize", 0);
    }
    click(t2) {
      (t2.target.matches(".ti-controls .ti-next") || t2.target.matches(".ti-controls .ti-prev")) && (t2.preventDefault(), this.move(t2.target.classList.contains("ti-next") ? "next" : "prev", "manual", 500));
    }
    enter(t2) {
      (t2.target.matches(".ti-controls .ti-next") || t2.target.matches(".ti-controls .ti-prev")) && (t2.preventDefault(), this.move(t2.target.classList.contains("ti-next") ? "next" : "prev", "manual", 500));
    }
    documentKeyup(t2) {
      "ArrowLeft" === t2.key && this.widget.TrustindexWidget.isOnViewport() ? this.move("prev", "keypress", 500) : "ArrowRight" === t2.key && this.widget.TrustindexWidget.isOnViewport() && this.move("next", "keypress", 500);
    }
    destroy() {
      void 0 !== this.autoPlayInterval && clearInterval(this.autoPlayInterval);
    }
    renderLine() {
      if (this.lineContainer) {
        let t2 = 1 + this.reviewNum - this.visibleReviewNum;
        if (this.isLoop && this.reviewNum !== this.visibleReviewNum && (t2 = this.reviewNum), this.lineDot) {
          let e2 = parseInt(this.lineContainer.offsetWidth / t2);
          e2 < 1 && (e2 = 1), this.lineDot.style.width = e2 + "px", this.lineDot.style.left = Math.ceil(this.stateLine / t2 * 100) + "%";
        }
      }
    }
    setAutoplay() {
      this.autoPlayTimeout && (this.autoPlayInterval = setInterval((() => {
        this.move(this.autoPlayDirection, "auto", 1e3);
      }), 1e3 * this.autoPlayTimeout));
    }
    addEvents() {
      let t2, e2, i2, s2, r2;
      this.widget.container.addEventListener("mouseenter", ((t3) => this.isMouseOver = true)), this.widget.container.addEventListener("mouseleave", ((t3) => this.isMouseOver = false)), this.widget.reviewsContainer.addEventListener("keydown", ((t3) => {
        "Tab" === t3.key && this.isMoving && t3.preventDefault();
      }));
      let o2, a2 = null, n2 = false, l2 = false;
      this.widget.reviewsContainer.addEventListener("touchstart", ((d2) => {
        t2 = d2.touches[0].pageX, i2 = d2.touches[0].pageY, e2 = null, s2 = null, r2 = null, a2 = this.getReviewWidth(), l2 = false, n2 = false, o2 && clearTimeout(o2), Trustindex.disableBodyScroll(), this.isMouseOver = true;
      }), { passive: true }), this.widget.reviewsContainer.addEventListener("touchmove", ((o3) => {
        e2 = o3.touches[0].pageX, s2 = o3.touches[0].pageY;
        let d2 = e2 - t2, h2 = s2 - i2, g2 = Math.abs(Math.atan2(h2, d2) * (180 / Math.PI));
        if (n2 = (n2 || Math.abs(h2) > 15 && g2 > 60 && g2 < 120) && !l2, l2 = (l2 || Math.abs(d2) > 10 && (g2 <= 60 || g2 >= 120)) && !n2, n2) Trustindex.enableBodyScroll();
        else if (l2) {
          if (this.isMoving) return false;
          if (r2 = parseFloat(this.position) + d2, this.animate(this.position, r2 + "px", 0), this.isLoop) {
            let i3 = t2 > e2 ? "next" : "prev", s3 = ("prev" === i3 ? -1 : 1) * Math.ceil(Math.abs(e2 - t2) / a2);
            this.addClonedReviews(this.state + s3, i3);
          }
          l2 = true;
        }
      }), { passive: true }), this.widget.reviewsContainer.addEventListener("touchend", ((i3) => {
        if (l2 && !n2) if (t2 && e2 && Math.abs(t2 - e2) > 25 && r2) {
          let i4 = t2 > e2 ? "next" : "prev";
          if (this.widget.reviewsContainer.querySelectorAll(".ti-review-text-container").forEach(((t3) => t3.scrollTop = 0)), "next" === i4 && this.isNext || "prev" === i4 && this.isPrev) {
            this.position = r2 + "px";
            let s3 = Math.ceil(Math.abs(e2 - t2) / a2), o3 = -1 * (this.state + s3 * ("next" === i4 ? 1 : -1)) * a2, n3 = parseInt(Math.abs(o3 - r2)), l3 = parseInt(n3 / a2 * 300);
            this.move(i4, "manual", l3, s3);
          } else this.animate(r2 + "px", parseFloat(this.position) + "px", 120), setTimeout((() => this.move(i4, "manual", 400, Math.ceil(Math.abs(e2 - t2) / a2))), 120);
        } else r2 && r2 !== parseFloat(this.position) && this.animate(r2 + "px", parseFloat(this.position) + "px", 120);
        t2 = null, e2 = null, r2 = null, l2 = false, n2 = false, o2 = setTimeout((() => Trustindex.enableBodyScroll()), 400), this.isMouseOver = false;
      }), { passive: true }), this.widget.reviewsContainer.addEventListener("touchcancel", ((t3) => {
        Trustindex.enableBodyScroll(), this.isMouseOver = false;
      }));
    }
    move(t2, e2, i2 = 1e3, s2 = 1) {
      if (-1 !== ["manual", "keypress"].indexOf(e2) && ("next" === t2 && !this.isNext || "prev" === t2 && !this.isPrev)) return this.animateThereIsNoReviews(t2);
      if (!this.widget.clientWidth || this.reviewNum <= this.visibleReviewNum || this.isMoving || this.isMouseOver && "auto" === e2 || true === this.widget.isLightboxShowing) return;
      "manual" === e2 && void 0 !== this.autoPlayInterval && (clearInterval(this.autoPlayInterval), delete this.autoPlayInterval), "resize" !== e2 && (e2 = t2), "next" !== t2 && "prev" !== t2 || (t2 = this.state + s2 * ("next" === t2 ? 1 : -1));
      let r2 = this.getMaximumState();
      if (this.isLoop) {
        if (this.addClonedReviews(t2, e2), t2 < this.state && setTimeout((() => {
          let e3 = ".ti-review-item.ti-cloned.ti-cloned--end";
          t2 > r2 && (e3 += ":last-child"), this.widget.reviewsContainer.querySelectorAll(e3).forEach(((t3) => t3.remove()));
        }), i2), t2 < 0 && "prev" === e2 && setTimeout((() => {
          this.widget.reviewsContainer.querySelectorAll(".ti-review-item.ti-cloned--dragging").forEach(((t3) => t3.classList.remove("ti-cloned--dragging"))), this.widget.reviewsContainerWrapper.scrollLeft = 0, this.reset();
        }), i2), "next" === e2) {
          let e3 = t2 - this.state;
          setTimeout((() => {
            for (let t3 = 0; t3 < e3; t3++) {
              let t4 = this.widget.reviewsContainer.querySelector(".ti-review-item.ti-cloned.ti-cloned--start:first-child");
              t4 && (t4.remove(), this.reset());
            }
          }), i2);
        }
        "next" === e2 ? (this.stateLine++, this.stateLine > this.reviewNum - 1 && (this.stateLine = 0)) : "prev" === e2 ? (this.stateLine--, this.stateLine < 0 && (this.stateLine = this.reviewNum - 1)) : this.stateLine = t2;
      } else t2 = Math.min(r2, Math.max(0, t2)), this.stateLine = t2;
      let o2 = -1 * t2 * this.getReviewWidth() + "px";
      this.animate(this.position, o2, i2, this.state !== t2), this.position = o2, this.state !== t2 && (this.state = t2, this.isMoving = true, this.renderLine(), this.toggleNavigation(), setTimeout((() => this.isMoving = false), i2), void 0 !== this.widget.TrustindexReviewImageModule && this.widget.TrustindexReviewImageModule.toggleGalleryVisiblity());
    }
    animate(t2, e2, i2, s2 = false) {
      this.widget.reviewsContainer.querySelectorAll(".ti-review-item").forEach(((r2) => {
        r2.animate({ left: [t2, e2] }, { duration: i2, fill: "both", easing: "ease-in-out" }), setTimeout((() => {
          if (this.toggleReadmoreTab(r2, true), s2 && !this.isReviewVisible(r2)) {
            let t3 = r2.querySelector(".ti-read-more .ti-read-more-collapse");
            t3 && t3.click();
          }
        }), i2);
      }));
    }
    animateThereIsNoReviews(t2) {
      this.isMoving = true;
      let e2 = parseFloat(this.position), i2 = "next" === t2 ? -1 : 1, s2 = 0, r2 = 0, o2 = (t3, e3, i3, s3) => setTimeout((() => this.animate(t3 + "px", e3 + "px", i3)), s3);
      return [{ position: 30, speed: 100 }, { position: -30, speed: 80 }, { position: 15, speed: 60 }, { position: -15, speed: 50 }].forEach(((t3, a2) => {
        0 === a2 ? s2 = e2 + t3.position * i2 : (e2 = s2, s2 += t3.position * i2), o2(e2, s2, t3.speed, r2), r2 += t3.speed;
      })), setTimeout((() => this.isMoving = false), r2), true;
    }
    addClonedReviews(t2, e2) {
      let i2 = this.getMaximumState();
      if (t2 > i2 && (this.state < t2 || "resize" === e2)) {
        let e3 = this.widget.reviewsContainer.querySelectorAll(".ti-review-item.ti-cloned.ti-cloned--end").length, s2 = t2 - i2 - e3, r2 = e3;
        r2 >= this.reviewNum && (r2 -= parseInt(r2 / this.reviewNum) * this.reviewNum);
        for (let t3 = 0; t3 < s2; t3++) {
          let e4 = this.widget.reviewsContainer.querySelectorAll('.ti-review-item:not(.ti-cloned):not([style*="display: none"])')[r2 + t3].cloneNode(true);
          e4.classList.add("ti-cloned", "ti-cloned--end"), this.widget.reviewsContainerWrapper.appendChild(e4);
        }
      }
      if (t2 < 0 && "prev" === e2) {
        let e3 = this.widget.reviewsContainer.querySelectorAll(".ti-review-item.ti-cloned.ti-cloned--start.ti-cloned--dragging").length, i3 = this.widget.reviewsContainer.querySelectorAll(".ti-review-item.ti-cloned.ti-cloned--start").length, s2 = Math.abs(t2 - this.state) - e3, r2 = this.reviewNum - 1 - i3 % this.reviewNum, o2 = this.getReviewWidth(), a2 = parseInt(this.widget.reviewsContainerWrapper.scrollLeft / o2);
        for (let t3 = 0; t3 < s2; t3++) {
          let e4 = this.widget.reviewsContainer.querySelectorAll('.ti-review-item:not(.ti-cloned):not([style*="display: none"])')[r2 - t3].cloneNode(true);
          e4.classList.add("ti-cloned", "ti-cloned--start", "ti-cloned--dragging"), this.widget.reviewsContainerWrapper.insertBefore(e4, this.widget.reviewsContainerWrapper.firstChild), this.widget.reviewsContainerWrapper.scrollLeft = parseInt((t3 + 1 + a2) * o2);
        }
      }
    }
    toggleNavigation() {
      this.prevButton && this.nextButton && (this.isPrev = true, Trustindex.show(this.prevButton), this.isNext = true, Trustindex.show(this.nextButton), this.isLoop ? this.reviewNum === this.visibleReviewNum && (this.isPrev = false, Trustindex.hide(this.prevButton), this.isNext = false, Trustindex.hide(this.nextButton)) : (0 === this.state && (this.isPrev = false, Trustindex.hide(this.prevButton), this.autoPlayDirection = "next"), this.state >= this.getMaximumState() && (this.isNext = false, Trustindex.hide(this.nextButton), this.autoPlayDirection = "prev")));
    }
    verticalPositionElements() {
      let t2 = this.widget.querySelector('.ti-review-item:not(.ti-hidden-review):not([style*="display: none"]) .ti-review-image-container');
      if (void 0 === this.widget.reviewsContainerWrapper.paddingTop && (this.widget.reviewsContainerWrapper.paddingTop = parseInt(window.getComputedStyle(this.widget.reviewsContainerWrapper, null).getPropertyValue("padding-top"))), this.controls && -1 !== [4, 5, 13, 14, 34, 36, 44, 95, 105, 108].indexOf(this.widget.layoutId)) {
        let e2 = this.widget.reviewsContainerWrapper.offsetHeight / 2 + this.widget.reviewsContainerWrapper.paddingTop / 2 - 3;
        t2 && (e2 -= t2.offsetHeight / 2), this.controls.style.top = e2 + "px";
      }
      if (this.footer && this.widget.container.offsetWidth > this.widget.reviewsContainer.offsetWidth) {
        let e2 = (this.widget.reviewsContainerWrapper.offsetHeight - this.footer.offsetHeight) / 2 + this.widget.reviewsContainerWrapper.paddingTop / 2;
        t2 && (e2 -= t2.offsetHeight / 2), this.widget.container.style.alignItems = "flex-start", this.footer.style.marginTop = e2 + "px";
      }
    }
    getReviewNum() {
      return this.widget.reviewsContainer.querySelectorAll('.ti-review-item:not(.ti-cloned):not([style*="display: none"])').length;
    }
    getVisibleReviewNum() {
      if (void 0 !== this.widget.TrustindexCloseModule) return 1;
      let t2 = this.widget.TrustindexReviewWidget.getColCount();
      this.widget.container.offsetWidth > this.widget.reviewsContainer.offsetWidth && (t2 -= 1);
      let e2 = t2;
      if (this.widget.reviewsContainer.querySelector(".ti-review-item")) {
        let t3 = this.widget.reviewsContainer.querySelector('.ti-review-item:not([style*="display: none"])');
        t3 && (e2 = Math.floor(this.widget.reviewsContainer.offsetWidth / t3.offsetWidth));
      }
      return Math.max(t2, e2, 1);
    }
    getMaximumState() {
      return Math.max(this.reviewNum - this.visibleReviewNum, 0);
    }
    getReviewWidth() {
      let t2 = this.widget.reviewsContainer.querySelectorAll('.ti-review-item:not([style*="display: none"])'), e2 = this.getTransformScale();
      for (let i2 of t2) {
        let t3 = i2.getBoundingClientRect().width;
        if (t3) return t3 / e2;
      }
      return this.widget.reviewsContainerWrapper.getBoundingClientRect().width / (this.visibleReviewNum || 1) / e2;
    }
    getTransformScale() {
      let t2 = this.widget.reviewsContainer.querySelectorAll(".ti-review-item");
      if (t2.length < 2) return 1;
      let e2 = t2[0], i2 = t2[t2.length - 1], s2 = i2.offsetLeft - e2.offsetLeft;
      if (!s2) return 1;
      let r2 = (i2.getBoundingClientRect().left - e2.getBoundingClientRect().left) / s2;
      return r2 > 0 ? r2 : 1;
    }
    isReviewVisible(t2) {
      let e2 = t2.offsetLeft - this.widget.reviewsContainerWrapper.offsetLeft, i2 = e2 + t2.offsetWidth;
      return e2 >= this.widget.reviewsContainerWrapper.scrollLeft && i2 <= this.widget.reviewsContainerWrapper.scrollLeft + this.widget.reviewsContainerWrapper.offsetWidth;
    }
    toggleReadmoreTab(t2) {
      let e2 = t2.querySelector(".ti-read-more");
      null == e2 || e2.setAttribute("tabindex", this.isReviewVisible(t2) ? 0 : "");
    }
    reset(t2 = true) {
      this.position = "0px", this.state = "left" === this.rotateTo ? this.getMaximumState() : 0, t2 && this.widget.reviewsContainer.querySelectorAll(".ti-review-item").forEach(((t3) => t3.animate({ left: 0 }, { fill: "both" })));
    }
  }
  class n {
    constructor(t2) {
      t2.originalColCount = 3, this.widget = t2;
    }
    resize() {
      let t2 = this.widget.TrustindexReviewWidget.getColCount(), e2 = this.widget.container.querySelectorAll('.ti-review-item:not([style*="display: none"])'), i2 = this.widget.container.querySelectorAll('.ti-review-item[style*="display: none"]');
      this.widget.reviewsContainerWrapper.innerHTML = "";
      for (var s2 = 0, r2 = []; s2 < t2; s2++) r2[s2] = document.createElement("div"), r2[s2].setAttribute("class", "ti-column"), this.widget.reviewsContainerWrapper.appendChild(r2[s2]);
      Array.from(e2).sort((function(t3, e3) {
        return (parseInt(t3.getAttribute("data-index")) || 0) - (parseInt(e3.getAttribute("data-index")) || 0);
      })).forEach(((e3, i3) => r2[i3 % t2].appendChild(e3))), i2.forEach(((t3) => r2[0].appendChild(t3)));
    }
  }
  class l {
    constructor(t2) {
      this.widget = t2, Trustindex.convertToDialog(this.widget.querySelector(".ti-popup-widget"));
    }
    click(t2) {
      if (t2.target.matches("a[data-subcontent]")) {
        t2.preventDefault();
        let e2 = t2.target;
        if (e2.subcontentTarget = this.widget.querySelector(e2.getAttribute("data-subcontent-target")), !e2.subcontentTarget || e2.classList.contains("ti-loading")) return;
        if ("" !== e2.subcontentTarget.innerHTML.trim()) e2.removeAttribute("data-subcontent"), e2.removeAttribute("data-subcontent-target");
        else if (this.widget.pid) return this.load(e2);
      }
      (t2.target.matches('a[href="#popup"]') || t2.target.matches('a[href="#dropdown"]')) && (t2.preventDefault(), this.togglePopup(t2.target)), t2.target.matches(".ti-popup-header .ti-close-lg") && (t2.preventDefault(), this.closePopup());
    }
    documentClick(t2) {
      void 0 === this.widget.popup || t2.target.closest(".ti-widget-container, .ti-widget-lightbox") || (t2.preventDefault(), this.closePopup());
    }
    load(t2) {
      return e2 = this, i2 = null, s2 = function* () {
        t2.classList.add("ti-loading");
        let e3 = Trustindex.getWidgetUrl(this.widget.pid) + "_subcontent-" + t2.getAttribute("data-subcontent") + ".html", i3 = yield Trustindex.request(e3);
        if (!i3) return false;
        t2.removeAttribute("data-subcontent"), t2.removeAttribute("data-subcontent-target"), t2.subcontentTarget.innerHTML = i3, t2.classList.remove("ti-loading"), this.widget.TrustindexWidget.getSubclasses(), this.widget.TrustindexWidget.formatInternationalNumbers(), this.togglePopup(t2);
      }, new Promise(((t3, r2) => {
        var o2 = (t4) => {
          try {
            n2(s2.next(t4));
          } catch (t5) {
            r2(t5);
          }
        }, a2 = (t4) => {
          try {
            n2(s2.throw(t4));
          } catch (t5) {
            r2(t5);
          }
        }, n2 = (e3) => e3.done ? t3(e3.value) : Promise.resolve(e3.value).then(o2, a2);
        n2((s2 = s2.apply(e2, i2)).next());
      }));
      var e2, i2, s2;
    }
    getPopup() {
      return this.widget.querySelector(".ti-dropdown-widget, .ti-popup-widget");
    }
    isOpen() {
      let t2 = this.getPopup();
      return !!t2 && t2.classList.contains("active");
    }
    registerDialogEvents(t2) {
      t2.tiDialogEventsRegistered || (t2.tiDialogEventsRegistered = true, t2.addEventListener("close", (() => {
        t2.open || this.closePopup();
      })));
    }
    togglePopup(t2) {
      return this.isOpen() ? this.closePopup() : this.openPopup(t2);
    }
    openPopup(t2) {
      if (this.widget.button = t2, this.widget.popup = this.getPopup(), !this.widget.popup) return delete this.widget.button;
      this.widget.button.classList.add("active"), this.widget.popup.classList.add("active"), "DIALOG" === this.widget.popup.tagName && !this.widget.popup.open && this.widget.popup.isConnected && (this.registerDialogEvents(this.widget.popup), this.widget.popup.showModal()), this.widget.popupFormatted || (this.widget.popupFormatted = true, this.widget.TrustindexWidget.format(), this.widget.TrustindexWidget.callSubclassesMethods("resize"));
    }
    closePopup() {
      let t2 = this.widget.button, e2 = this.widget.popup;
      delete this.widget.button, delete this.widget.popup, t2 && t2.classList.remove("active"), e2 && (e2.classList.remove("active"), "DIALOG" === e2.tagName && e2.open && e2.close(), t2 && t2.focus({ preventScroll: true }));
    }
    destroy() {
      let t2 = this.getPopup();
      t2 && "DIALOG" === t2.tagName && t2.open && t2.close();
    }
  }
  class d {
    constructor(t2) {
      this.widget = t2, this.addEvents();
    }
    addEvents() {
      this.widget.querySelectorAll(".ti-verified-by").forEach(((t2) => {
        let e2 = this.getDisclaimer(t2);
        e2 && t2.addEventListener("mouseenter", (() => {
          this.alignDisclaimerVertically(e2), this.alignDisclaimerHorizontally(e2);
        }));
      }));
    }
    getDisclaimer(t2) {
      let e2 = t2.querySelector(".ti-disclaimer");
      if (e2) return e2;
      let i2 = t2.nextElementSibling;
      return i2 && i2.matches(".ti-disclaimer") ? i2 : null;
    }
    alignDisclaimerVertically(t2) {
      t2.classList.remove("ti-bottom"), t2.getBoundingClientRect().y < 0 && t2.classList.add("ti-bottom");
    }
    alignDisclaimerHorizontally(t2) {
      let e2 = t2.getBoundingClientRect(), i2 = parseFloat(getComputedStyle(t2).translate) || 0, s2 = e2.left - i2, r2 = e2.right - i2, o2 = document.documentElement.clientWidth - 10, a2 = 0;
      s2 < 10 ? a2 = 10 - s2 : r2 > o2 && (a2 = Math.max(o2 - r2, 10 - s2)), t2.style.setProperty("--ti-disclaimer-offset", Math.round(a2) + "px");
    }
  }
  class h {
    constructor(t2) {
      var e2;
      this.widget = t2, this.fomoDay = parseInt(this.widget.getAttribute("data-fomo-day") || "0"), this.hideCount = parseInt(this.widget.getAttribute("data-hide-count") || "0"), this.siteData = {}, this.isOnlineVisitors = false;
      let i2 = document.querySelector('meta[name="ti-site-data"]');
      i2 && (this.siteData = JSON.parse(atob(i2.getAttribute("content").trim())), this.siteData.r = Object.fromEntries((null != (e2 = this.siteData.r) ? e2 : "").split("!").map(((t3) => t3.split(":").map(Number)))));
    }
    format() {
      var t2, e2, i2;
      let s2 = this.widget.querySelector(".ti-title-text");
      if (s2 && -1 !== s2.innerText.indexOf("%registrations%")) {
        let r2 = null != (i2 = null == (e2 = null == (t2 = this.siteData) ? void 0 : t2.r) ? void 0 : e2[this.fomoDay]) ? i2 : 0;
        s2.innerHTML = s2.innerText.replace("%registrations%", '<span class="ti-fomo-count">' + r2 + "</span>");
      }
      if (s2 && -1 !== s2.innerText.indexOf("%online-visitors%") && (this.isOnlineVisitors = true, s2.innerHTML = s2.innerText.replace("%online-visitors%", '<span class="ti-fomo-count">0</span>'), this.refreshOnlineUsers()), this.hideCount && !Trustindex.isAdminUrl() && !Trustindex.isWordpressAdminUrl() && !Trustindex.isTestWidgetUrl()) {
        let t3 = this.widget.querySelector(".ti-fomo-count");
        (!t3 || parseInt(t3.innerText) < this.hideCount) && (this.isOnlineVisitors ? Trustindex.hide(this.widget) : this.widget.remove());
      }
    }
    refreshOnlineUsers() {
      var t2;
      let e2 = Trustindex.getDecodedHtml(null != (t2 = this.siteData.o) ? t2 : "");
      if (!e2) return;
      let i2 = this.widget.querySelector(".ti-fomo-count");
      i2 && (this.refreshOnlineUsersInterval && clearInterval(this.refreshOnlineUsersInterval), this.getOnlineUsers(i2, e2), this.refreshOnlineUsersInterval = setInterval((() => this.getOnlineUsers(i2, e2)), 6e4));
    }
    getOnlineUsers(t2, e2) {
      (() => {
        return i2 = this, s2 = null, r2 = function* () {
          let i3 = 0, s3 = yield Trustindex.request(e2);
          s3 && (i3 = parseInt(s3)), t2.innerText = i3, !this.hideCount || Trustindex.isAdminUrl() || Trustindex.isWordpressAdminUrl() || Trustindex.isTestWidgetUrl() || (i3 < this.hideCount ? Trustindex.hide(this.widget) : Trustindex.show(this.widget));
        }, new Promise(((t3, e3) => {
          var o2 = (t4) => {
            try {
              n2(r2.next(t4));
            } catch (t5) {
              e3(t5);
            }
          }, a2 = (t4) => {
            try {
              n2(r2.throw(t4));
            } catch (t5) {
              e3(t5);
            }
          }, n2 = (e4) => e4.done ? t3(e4.value) : Promise.resolve(e4.value).then(o2, a2);
          n2((r2 = r2.apply(i2, s2)).next());
        }));
        var i2, s2, r2;
      })();
    }
    click(t2) {
      t2.target.matches(".ti-header-closed .ti-header") && Trustindex.isMobileDevice() && (t2.preventDefault(), t2.target.closest(".ti-header-closed").classList.remove("ti-header-closed"));
    }
  }
  class g {
    constructor(t2) {
      this.widget = t2, sessionStorage.getItem("ti-widget-closed-" + this.widget.pid) && (this.widget.remove(), this.widget.TrustindexWidget.destroy());
    }
    click(t2) {
      t2.target.matches(".disable-widget, .ti-close-button") && (t2.preventDefault(), Trustindex.isAdminUrl() || Trustindex.isWordpressAdminUrl() || (sessionStorage.setItem("ti-widget-closed-" + this.widget.pid, true), this.widget.remove(), this.widget.TrustindexWidget.destroy()));
    }
  }
  class c {
    constructor(t2) {
      this.widget = t2, this.callOneOriginalColumnResize = true;
    }
    resize(t2, e2 = true) {
      if (void 0 === this.isReadmore && (this.isReadmore = ["readmore", "popup"].includes(this.widget.reviewTextMode) || "undefined" !== window.getComputedStyle(this.widget.reviewsContainer.querySelector(".ti-read-more"), null).getPropertyValue("display")), !this.isReadmore) return;
      let i2 = this.widget.reviewsContainer.querySelectorAll(".ti-review-item:not(.ti-hide) .ti-read-more");
      e2 && i2.forEach(((t3) => this.setReview(t3.closest(".ti-review-item").querySelector(".ti-review-text-container")))), setTimeout((() => {
        let t3 = this.widget.reviewsContainer.querySelectorAll(".ti-review-item:not(.ti-hide) .ti-read-more");
        Trustindex.isAdminEditUrl() || t3.length !== this.widget.reviewsContainer.querySelectorAll('.ti-read-more[style*="opacity: 0"]').length || t3.forEach(((t4) => t4.remove()));
      }), 70);
    }
    setReview(t2, e2 = false) {
      let i2 = t2.closest(".ti-review-item");
      if (!i2) return;
      let s2 = i2.querySelector(".ti-read-more");
      null == s2 || s2.setAttribute("style", ""), t2.setAttribute("style", "transition: none"), void 0 === this.widget.TrustindexSliderWidget && (null == s2 || s2.setAttribute("tabindex", 0)), t2.scrollHeight > t2.offsetHeight ? (t2.setAttribute("style", ""), t2.style.setProperty("height", t2.offsetHeight + "px", "important"), t2.setAttribute("data-initial-height", t2.offsetHeight), t2.setAttribute("data-expanded-height", this.getExpandedHeight(t2)), t2.parentNode.classList.contains("ti-review-content") && (t2.parentNode.style.display = "block", t2.parentNode.style.setProperty("-webkit-line-clamp", "unset", "important")), !t2.getAttribute("data-max-height") && parseInt(window.getComputedStyle(t2, null).getPropertyValue("max-height")) > 0 && t2.style.setProperty("max-height", "unset", "important"), s2 && (s2.getAttribute("data-open-text") && (s2.innerHTML = '<span class="ti-read-more-active" aria-label="' + s2.getAttribute("data-open-text") + '" role="button">' + s2.getAttribute("data-open-text") + "</span>"), s2.setAttribute("style", ""))) : s2 && (s2.innerHTML = "<span>&nbsp;</span>", s2.style.opacity = 0, s2.style.pointerEvents = "none", s2.removeAttribute("tabindex", 0)), e2 || setTimeout((() => this.setReview(t2, true)), 100);
    }
    resetReview(t2) {
      t2.getAttribute("data-is-opened") ? (t2.style.setProperty("height", ""), t2.style.setProperty("transition", "none"), t2.style.setProperty("height", t2.scrollHeight + "px", "important"), t2.setAttribute("data-expanded-height", this.getExpandedHeight(t2)), t2.style.setProperty("transition", "")) : (this.setReview(t2), this.resize(true, false));
    }
    click(t2) {
      if ("popup" !== this.widget.reviewTextMode && t2.target.matches(".ti-read-more-active")) {
        t2.preventDefault();
        let e2 = t2.target, i2 = e2.closest(".ti-review-item").querySelector(".ti-review-text-container");
        if (i2.classList.contains("ti-is-transitioning")) return false;
        e2.classList.contains("ti-read-more-collapse") ? (i2.style.setProperty("display", ""), i2.style.setProperty("-webkit-line-clamp", ""), i2.style.setProperty("height", i2.getAttribute("data-initial-height") + "px", "important"), i2.removeAttribute("data-is-opened"), i2.classList.add("ti-is-transitioning"), setTimeout((() => i2.classList.remove("ti-is-transitioning")), 500), e2.innerHTML = e2.parentNode.getAttribute("data-open-text"), e2.setAttribute("aria-label", e2.parentNode.getAttribute("data-open-text")), e2.classList.remove("ti-read-more-collapse")) : (i2.style.setProperty("display", "block", "important"), i2.style.setProperty("-webkit-line-clamp", "unset", "important"), i2.style.setProperty("height", i2.getAttribute("data-expanded-height") + "px", "important"), i2.setAttribute("data-is-opened", 1), i2.classList.add("ti-is-transitioning"), setTimeout((() => i2.classList.remove("ti-is-transitioning")), 500), e2.innerHTML = e2.parentNode.getAttribute("data-collapse-text"), e2.setAttribute("aria-label", e2.parentNode.getAttribute("data-collapse-text")), e2.classList.add("ti-read-more-collapse"));
      }
    }
    enter(t2) {
      var e2;
      t2.target.matches(".ti-read-more") && (t2.preventDefault(), null == (e2 = t2.target.querySelector("span")) || e2.click(), "popup" === this.widget.reviewTextMode && t2.target.blur());
    }
    getExpandedHeight(t2) {
      let e2 = t2.scrollHeight;
      return t2.getAttribute("data-max-height") && (e2 = parseInt(window.getComputedStyle(t2, null).getPropertyValue("max-height"))), Math.min(t2.scrollHeight, e2);
    }
  }
  class u {
    constructor(t2) {
      this.widget = t2, this.callOneOriginalColumnResize = true, this.rows = parseInt(this.widget.getAttribute("data-load-more-rows") || (this.isGrid() ? 3 : 5));
    }
    resize() {
      let t2 = this.widget.querySelector(".ti-load-more-reviews-button");
      if (!t2) return;
      let e2 = this.getLimit();
      Trustindex.show(t2), t2.setAttribute("tabindex", "0"), this.widget.reviewsContainer.querySelectorAll(".ti-review-item").forEach(((t3) => t3.classList.remove("ti-hide")));
      let i2 = this.widget.reviewsContainer.querySelectorAll('.ti-review-item:not([style*="display: none"])');
      if (i2.length > e2) if (void 0 !== this.widget.TrustindexMasonryWidget) {
        let t3 = this.widget.reviewsContainerWrapper.querySelectorAll(".ti-column");
        e2 /= this.widget.TrustindexReviewWidget.getColCount();
        for (let s2 = 0; s2 < t3.length; s2++) i2 = t3[s2].querySelectorAll('.ti-review-item:not([style*="display: none"])'), this.hideReviews(i2, e2);
      } else this.hideReviews(i2, e2);
      else Trustindex.hide(t2), t2.removeAttribute("tabindex");
    }
    click(t2) {
      if (t2.target.matches(".ti-load-more-reviews-button")) {
        t2.preventDefault();
        let e2 = t2.target, i2 = this.getLimit();
        if (void 0 !== this.widget.TrustindexMasonryWidget) {
          let t3 = this.widget.reviewsContainerWrapper.querySelectorAll(".ti-column");
          i2 /= this.widget.TrustindexReviewWidget.getColCount();
          for (let e3 = 0; e3 < t3.length; e3++) this.showReviews(t3[e3].querySelectorAll(".ti-review-item.ti-hide"), i2);
        } else this.showReviews(this.widget.querySelectorAll(".ti-review-item.ti-hide"), i2);
        0 === this.widget.querySelectorAll(".ti-review-item.ti-hide").length && e2.remove();
      }
    }
    enter(t2) {
      t2.target.matches(".ti-load-more-reviews-button") && (t2.preventDefault(), t2.target.click());
    }
    isGrid() {
      return -1 !== this.widget.container.classList.toString().indexOf("ti-col-") && 81 !== this.widget.layoutId;
    }
    getLimit() {
      return this.isGrid() ? this.widget.TrustindexReviewWidget.getColCount() * this.rows : this.rows;
    }
    hideReviews(t2, e2) {
      t2.forEach(((t3, i2) => {
        i2 > e2 - 1 && t3.classList.add("ti-hide");
      }));
    }
    showReviews(t2, e2) {
      for (let i2 = 0; i2 < t2.length && !(i2 >= e2); i2++) t2[i2].classList.remove("ti-hide"), void 0 !== this.widget.TrustindexReadMoreModule && this.widget.TrustindexReadMoreModule.setReview(t2[i2].querySelector(".ti-review-text-container"));
    }
  }
  class p {
    constructor(t2) {
      this.widget = t2, this.callOneOriginalColumnResize = true;
    }
    resize() {
      let t2 = this.widget.querySelector(".ti-widget-header .ti-platform-tabs");
      if (t2) if (t2.querySelector(".ti-platform-tab-items").scrollWidth > t2.offsetWidth) {
        let e2 = t2.querySelector(".ti-tab-active");
        e2.previousElementSibling ? t2.querySelector(".ti-arrow-prev").style.display = "inline-block" : t2.querySelector(".ti-arrow-prev").style.display = "", e2.nextElementSibling ? t2.querySelector(".ti-arrow-next").style.display = "inline-block" : t2.querySelector(".ti-arrow-next").style.display = "";
      } else t2.querySelector(".ti-arrow-prev").style.display = "", t2.querySelector(".ti-arrow-next").style.display = "";
      -1 !== this.widget.layoutCategory.indexOf("list") && setTimeout((() => {
        let t3 = this.widget.querySelector(".ti-widget-header .ti-header-content.ti-active");
        if (t3) {
          let e2 = t3.querySelector(".ti-header-write-btn-container");
          if (e2) {
            e2.style.marginLeft = "", e2.style.marginTop = "", t3.offsetHeight - parseInt(window.getComputedStyle(t3, null).getPropertyValue("padding-bottom")) > t3.firstElementChild.offsetHeight ? (e2.style.marginLeft = 0, e2.style.marginTop = "15px") : (e2.style.marginLeft = "", e2.style.marginTop = "");
          }
        }
      }), 12);
    }
    click(t2) {
      if (t2.target.matches(".ti-widget-header .ti-platform-tab-items .ti-tab-item")) {
        t2.preventDefault();
        let e2 = t2.target, i2 = e2.closest(".ti-platform-tab-items"), s2 = e2.getAttribute("data-source");
        i2.querySelectorAll(".ti-tab-item").forEach(((t3) => t3.classList.remove("ti-tab-active"))), e2.classList.add("ti-tab-active");
        let r2 = this.widget.querySelector(".ti-widget-header .ti-header-content.ti-active");
        r2 && r2.classList.remove("ti-active");
        let o2 = this.widget.querySelector(".ti-widget-header .ti-header-content.source-" + s2);
        o2 && o2.classList.add("ti-active"), this.widget.querySelectorAll(".ti-review-item.ti-cloned").forEach(((t3) => t3.remove())), "all" === s2 ? this.widget.querySelectorAll(".ti-review-item").forEach(((t3) => Trustindex.show(t3))) : (this.widget.querySelectorAll(".ti-review-item").forEach(((t3) => Trustindex.hide(t3))), this.widget.querySelectorAll(".ti-review-item.source-" + s2).forEach(((t3) => Trustindex.show(t3)))), i2.scroll({ left: e2.offsetLeft - 28, behavior: "smooth" }), void 0 !== this.widget.TrustindexSliderWidget && this.widget.TrustindexSliderWidget.reset(false), this.widget.TrustindexWidget.callSubclassesMethods("resize", true);
      }
      if (t2.target.matches(".ti-widget-header .ti-platform-tab-nav .ti-arrow-prev")) {
        let e2 = t2.target.closest(".ti-platform-tabs").querySelector(".ti-tab-active");
        e2 && e2.previousElementSibling && e2.previousElementSibling.click();
      }
      if (t2.target.matches(".ti-widget-header .ti-platform-tab-nav .ti-arrow-next")) {
        let e2 = t2.target.closest(".ti-platform-tabs").querySelector(".ti-tab-active");
        e2 && e2.nextElementSibling && e2.nextElementSibling.click();
      }
    }
  }
  class w {
    constructor(t2) {
      this.data = [];
      let e2 = Trustindex.getJsonDataElement(t2, "ti-lightbox-data");
      e2 && (this.data = Trustindex.parseJsonData(e2).data, e2.remove()), this.widget = t2, this.callOneOriginalColumnResize = true;
    }
    format() {
      this.data && this.registerImageErrorEvent();
    }
    resize() {
      let t2;
      this.widget.reviewsContainer.querySelectorAll(".ti-review-item .ti-review-image-container").forEach(((e2) => {
        let i2 = e2.closest(".ti-review-item").getAttribute("data-id"), s2 = this.data.filter(((t3) => t3.r === i2));
        if (t2 || (t2 = Math.floor(e2.offsetWidth / 70)), t2 && s2.length && parseInt(e2.getAttribute("data-image-listed")) !== t2) {
          e2.setAttribute("data-image-listed", t2);
          let i3 = "";
          for (let e3 = 0, r2 = Math.min(s2.length, t2) - 1; e3 <= r2; e3++) {
            let o2 = e3 === r2 && e3 < s2.length - 1;
            i3 += '<div class="ti-review-image' + (o2 ? " ti-has-more-image" : "") + '" data-image-index="' + e3 + '" style="width: ' + (100 / t2).toFixed(2) + '%"><div class="ti-review-image-inner"><img src="' + s2[e3].thumbnail + '" loading="lazy" alt="" />' + (o2 ? '<div class="ti-more-image-count">+' + (s2.length - e3 - 1) + "</div>" : "") + "</div></div>";
          }
          e2.innerHTML = i3, this.registerImageErrorEvent();
        }
      }));
    }
    toggleGalleryVisiblity() {
      let t2 = Boolean(this.widget.reviewsContainer.querySelector(".ti-review-item:not(.ti-hidden-review) .ti-review-image-container"));
      this.widget.reviewsContainer.querySelectorAll(".ti-review-item").forEach(((e2, i2) => {
        let s2 = e2.querySelector(".ti-review-image-container");
        s2 && (s2.style.transition = ""), e2.classList.add("ti-hidden-review"), i2 >= this.widget.TrustindexSliderWidget.state && i2 < this.widget.TrustindexSliderWidget.state + this.widget.TrustindexSliderWidget.visibleReviewNum + (this.widget.TrustindexSliderWidget.state < 0 ? 1 : 0) && (e2.classList.remove("ti-hidden-review"), s2 && t2 && (s2.style.transition = "none"));
      }));
    }
    registerImageErrorEvent() {
      this.widget.reviewsContainer.querySelectorAll(".ti-review-image img").forEach(((t2) => {
        t2.addEventListener("error", ((t3) => {
          let e2 = t3.target, i2 = e2.closest(".ti-review-item");
          if (!i2) return;
          let s2 = i2.getAttribute("data-id");
          for (let t4 = 0, i3 = this.data.length; t4 < i3; t4++) if (this.data[t4].r === s2 && this.data[t4].thumbnail === e2.src) {
            this.data.splice(t4, 1);
            break;
          }
          let r2 = e2.closest(".ti-review-image-container");
          if (r2) return r2.removeAttribute("data-image-listed"), this.resize();
          let o2 = e2.closest(".ti-review-image"), a2 = this.data.filter(((t4) => t4.r === s2));
          a2.length > 0 ? (e2.src = a2[0].thumbnail, o2.querySelector(".ti-more-image-count").innerHTML = "+" + a2.length - 1, 1 === a2.length && o2.classList.remove("ti-has-more-image")) : o2.remove();
        }));
      }));
    }
  }
  class m {
    constructor(t2) {
      this.data = t2.TrustindexReviewImageModule.data, this.widget = t2, this.isLongScroll = "popup" === this.widget.reviewTextMode, this.reviewMediaContainer = null;
    }
    init() {
      if (this.isLongScroll) return this.initLongScroll();
      let t2 = `<div class="ti-widget-lightbox" data-layout-id="${this.widget.layoutId}" data-set-id="${this.widget.setId}" data-pid="${this.widget.pid}">
			<div class="ti-widget-lightbox-close"></div>
			<div class="ti-widget-lightbox-inner">
				<div class="ti-widget-card">
					<div class="ti-card-body">
						<div class="ti-card-media">
							<img alt="" />
							<div class="ti-nav-arrow">
								<div class="ti-arrow-prev"></div>
								<div class="ti-arrow-next"></div>
							</div>
						</div>
						<div class="ti-review-content"></div>
					</div>
				</div>
			</div>
		</div>`;
      this.lightbox = this.createLightbox(t2), this.image = this.lightbox.querySelector(".ti-card-media img"), this.reviewContent = this.lightbox.querySelector(".ti-review-content"), this.prevArrow = this.lightbox.querySelector(".ti-arrow-prev"), this.nextArrow = this.lightbox.querySelector(".ti-arrow-next"), this.currentIndex = 0, this.currentReview = null, this.addWidgetStyles(), this.addEvents();
    }
    initLongScroll() {
      let t2 = `<div class="ti-widget-lightbox ti-long-scroll" data-layout-id="${this.widget.layoutId}" data-set-id="${this.widget.setId}" data-pid="${this.widget.pid}">
			<div class="ti-widget-lightbox-inner">
				<div class="ti-widget-lightbox-review-container">
					<div class="ti-widget-lightbox-review-container-inner"></div>
				</div>
			</div>
			<div class="ti-widget-lightbox-close" tabindex="0"></div>
			<div class="ti-widget-lightbox-mobile-close-bottom">${this.widget.locales.close}<span></span></div>
			<div class="ti-widget-lightbox-mobile-close-bottom-swipe"><span></span></div>
		</div>`;
      this.isMoving = false, this.lightbox = this.createLightbox(t2), this.lightbox.reviewsContainer = this.lightbox.querySelector(".ti-widget-lightbox-review-container"), this.lightbox.reviewsContainerInner = this.lightbox.querySelector(".ti-widget-lightbox-review-container-inner"), this.lightbox.mobileCloseBottom = this.lightbox.querySelector(".ti-widget-lightbox-mobile-close-bottom"), this.lightbox.mobileCloseBottomSwipe = this.lightbox.querySelector(".ti-widget-lightbox-mobile-close-bottom-swipe"), this.widget.classList.contains("ti-custom-stars") && this.lightbox.classList.add("ti-custom-stars"), this.widget.querySelectorAll(".ti-review-item").forEach(((t3) => {
        let e2 = document.createElement("div");
        e2.classList.add("ti-review-item");
        let i2 = t3.querySelector(".ti-review-header").cloneNode(true);
        i2.classList.add("ti-lightbox-review-header");
        let s2 = t3.querySelector(".ti-review-text-container").cloneNode(true);
        s2.setAttribute("class", "ti-review-text ti-review-text-container"), s2.setAttribute("style", ""), s2.querySelectorAll(".ti-review-image").forEach(((t4) => t4.remove())), e2.appendChild(i2);
        let r2 = t3.querySelector(".ti-stars");
        r2 && e2.appendChild(r2.cloneNode(true));
        let o2 = [];
        if (this.data.forEach(((e3) => {
          e3.r === t3.getAttribute("data-id") && o2.push(e3);
        })), o2.length > 0) {
          let t4 = "", i3 = "";
          o2.forEach(((e3, s4) => {
            t4 += `<div class="ti-card-media-thumbnail" data-state="${s4}"><img src="${e3.thumbnail}" alt="" /></div>`, i3 += `<div class="ti-card-media-image"><img src="${this.getImgSrc(e3)}" alt="" /></div>`;
          }));
          let s3 = new DOMParser().parseFromString(`
					<div class="ti-card-media">
						<div class="ti-card-media-images">${i3}</div>
						<div class="ti-nav-arrow">
							<div class="ti-arrow-prev ti-hidden" data-state="prev"></div>
							<div class="ti-arrow-next" data-state="next"></div>
						</div>
						<div class="ti-card-media-thumbnails">
							<div class="ti-card-media-thumbnails-inner">${t4}</div>
						</div>
					</div>
				`, "text/html").querySelector(".ti-card-media");
          s3.querySelector(".ti-card-media-thumbnail:first-child").classList.add("ti-active"), 1 === o2.length && (s3.querySelector(".ti-arrow-prev").remove(), s3.querySelector(".ti-arrow-next").remove(), s3.querySelector(".ti-card-media-thumbnails").remove()), e2.appendChild(s3);
        }
        e2.appendChild(s2), t3.classList.contains("ti-ai-summary-item") ? (e2.classList.add("ti-ai-summary-item"), e2.classList.add("ti-lightbox-review-item"), s2.classList.add("ti-review-content")) : e2.setAttribute("data-id", t3.getAttribute("data-id")), this.lightbox.reviewsContainerInner.appendChild(e2);
      })), this.addWidgetStyles(), this.addLongScrollEvents();
    }
    createLightbox(t2) {
      let e2 = new DOMParser().parseFromString(t2, "text/html").querySelector(".ti-widget-lightbox");
      return Trustindex.convertToDialog(e2);
    }
    showLightbox() {
      this.closeTimeout && (clearTimeout(this.closeTimeout), delete this.closeTimeout), document.body.appendChild(this.lightbox), "DIALOG" === this.lightbox.tagName && (this.lightbox.open && this.lightbox.close(), this.registerDialogEvents(), this.lightbox.showModal());
    }
    registerDialogEvents() {
      this.lightbox.tiDialogEventsRegistered || (this.lightbox.tiDialogEventsRegistered = true, this.lightbox.addEventListener("cancel", ((t2) => {
        t2.preventDefault(), this.close();
      })));
    }
    addWidgetStyles() {
      this.widget.classList.contains("ti-custom-stars") && this.lightbox.classList.add("ti-custom-stars"), this.lightbox.style.fontFamily = window.getComputedStyle(this.widget.container, null).getPropertyValue("font-family");
    }
    addEvents() {
      let t2, e2, i2, s2;
      this.image.onload = () => this.image.parentNode.classList.remove("ti-image-loading");
      let r2 = false, o2 = false;
      this.image.addEventListener("touchstart", ((a2) => {
        t2 = a2.touches[0].pageX, i2 = a2.touches[0].pageY, e2 = null, s2 = null, r2 = false, o2 = false;
      }), { passive: true }), this.image.addEventListener("touchmove", ((a2) => {
        e2 = a2.touches[0].pageX, s2 = a2.touches[0].pageY;
        let n2 = e2 - t2, l2 = s2 - i2;
        Math.abs(l2) > 10 && !r2 && (o2 = true), !o2 && (Math.abs(n2) > 10 || r2) && (r2 = true);
      }), { passive: true }), this.image.addEventListener("touchend", ((i3) => {
        if (r2 && !o2 && t2 && e2 && Math.abs(t2 - e2) > 25) {
          let i4 = this.currentIndex - 1;
          t2 > e2 && (i4 = this.currentIndex + 1), this.change(i4);
        }
        return t2 = null, e2 = null, r2 = false, o2 = false, false;
      }), { passive: true }), this.lightbox.addEventListener("click", ((t3) => {
        t3.preventDefault(), t3.stopPropagation(), t3.target.matches(".ti-arrow-prev") ? this.change(this.currentIndex - 1) : t3.target.matches(".ti-arrow-next") ? this.change(this.currentIndex + 1) : !t3.target.matches(".ti-widget-lightbox") && !t3.target.matches(".ti-widget-lightbox-close") || t3.target.closest(".ti-widget-lightbox-inner") || this.close();
      }));
    }
    addLongScrollEvents() {
      this.lightbox.addEventListener("click", ((t3) => {
        t3.preventDefault(), t3.stopPropagation(), t3.target.matches(".ti-arrow-prev") || t3.target.matches(".ti-arrow-next") || t3.target.matches(".ti-card-media-thumbnail") ? this.navigateReviewImage(t3.target) : !t3.target.matches(".ti-widget-lightbox-review-container") && !t3.target.matches(".ti-widget-lightbox-close") || t3.target.closest(".ti-review-item") ? t3.target.matches(".ti-widget-lightbox-mobile-close-bottom") ? this.close() : t3.target.matches(".ti-show-original-text") && this.widget.TrustindexReviewWidget.showOriginalText(t3) : this.close();
      })), this.lightbox.addEventListener("keydown", ((t3) => {
        ("Escape" === t3.key || "Enter" === t3.key && t3.target.matches(".ti-widget-lightbox-close")) && this.close();
      }));
      let t2, e2, i2, s2, r2, o2, a2 = 0, n2 = null, l2 = false, d2 = false, h2 = false, g2 = false, c2 = false;
      this.reviewMediaContainer = null, this.lightbox.reviewsContainer.addEventListener("touchstart", ((u2) => {
        a2 = 0, n2 = null, t2 = u2.touches[0].pageX, i2 = u2.touches[0].pageY, e2 = null, s2 = null, r2 = null, o2 = null, d2 = false, l2 = false, c2 = false, this.reviewMediaContainer = u2.target.closest(".ti-card-media"), Trustindex.hide(this.lightbox.mobileCloseBottomSwipe), g2 = this.getNavigationArrowState("next"), h2 = this.getNavigationArrowState("prev");
      }), { passive: true }), this.lightbox.reviewsContainer.addEventListener("touchmove", ((u2) => {
        e2 = u2.touches[0].pageX, s2 = u2.touches[0].pageY;
        let p2 = e2 - t2, w2 = s2 - i2, m2 = Math.abs(Math.atan2(w2, p2) * (180 / Math.PI));
        if (l2 = (l2 || Math.abs(w2) > 4 && m2 > 60 && m2 < 120) && !d2, d2 = (d2 || Math.abs(p2) > 4 && (m2 <= 60 || m2 >= 120)) && !l2, d2) {
          if (this.isMoving) return false;
          if (u2.preventDefault(), this.reviewMediaContainer) {
            let i3 = t2 > e2 ? "next" : "prev";
            if ("next" === i3 && g2 || "prev" === i3 && h2) {
              let t3 = this.reviewMediaContainer.getAttribute("data-position") || "0px";
              o2 = parseInt(t3) + p2, this.animateReviewImages(t3, o2 + "px", 0);
            }
          }
        }
        if (r2 = s2, c2) (w2 > 0 || d2) && (this.lightbox.reviewsContainer.style.overflow = "", c2 = false);
        else {
          let t3 = Math.abs(this.lightbox.reviewsContainer.scrollHeight - this.lightbox.reviewsContainer.scrollTop - this.lightbox.reviewsContainer.clientHeight);
          c2 = t3 < 50 && w2 < 0;
        }
        if (l2 && c2) {
          n2 = w2 + "px", this.lightbox.reviewsContainer.style.overflow = "hidden", this.lightbox.reviewsContainer.animate({ top: [a2, n2] }, { duration: Math.abs((parseInt(a2) - parseInt(n2)) / 2), fill: "both", easing: "ease-in-out" }), a2 = n2;
          let t3 = -Math.abs(w2) / 2.3;
          w2 > 0 && (t3 = 0), Trustindex.hide(this.lightbox.mobileCloseBottom), Trustindex.show(this.lightbox.mobileCloseBottomSwipe, "inline-block"), this.lightbox.mobileCloseBottomSwipe.style.setProperty("--scale", t3 + "px");
        }
      }), { passive: false }), this.lightbox.reviewsContainer.addEventListener("touchend", ((i3) => {
        if (d2 && !l2) {
          let i4 = o2;
          if (this.reviewMediaContainer && (i4 = this.reviewMediaContainer.getAttribute("data-position") || "0px", g2 = this.getNavigationArrowState("next"), h2 = this.getNavigationArrowState("prev")), t2 && e2 && Math.abs(t2 - e2) > 25 && o2) {
            let s3 = t2 > e2 ? "next" : "prev";
            if ("next" === s3 && g2 || "prev" === s3 && h2) {
              let t3 = parseInt(this.reviewMediaContainer.getAttribute("data-state") || "0") + ("next" === s3 ? 1 : -1);
              this.reviewMediaContainer.setAttribute("data-old-position", i4), this.reviewMediaContainer.setAttribute("data-position", o2 + "px"), this.navigateReviewImage(null, t3), this.reviewMediaContainer.removeAttribute("data-old-position");
            } else this.animateReviewImages(o2 + "px", i4, 120);
          } else o2 && o2 !== parseInt(i4) && this.animateReviewImages(o2 + "px", i4, 120);
        }
        if (Trustindex.show(this.lightbox.mobileCloseBottom), l2 && n2) {
          this.lightbox.reviewsContainer.style.overflow = "";
          let t3 = Math.abs(parseInt(n2)), e3 = 0;
          t3 > 150 && parseInt(n2) < 0 && (t3 = 500, e3 = "-1000px", this.close(), Trustindex.hide(this.lightbox.mobileCloseBottom)), this.lightbox.reviewsContainer.scrollTop = this.lightbox.reviewsContainer.scrollHeight, this.lightbox.reviewsContainer.animate({ top: [n2, e3] }, { duration: t3 / 2, fill: "both", easing: "ease-in-out" });
        }
        this.reviewMediaContainer = null, Trustindex.hide(this.lightbox.mobileCloseBottomSwipe), a2 = 0, n2 = null, t2 = null, e2 = null, r2 = null, o2 = null, d2 = false, l2 = false, c2 = false;
      }), { passive: true });
    }
    show(t2) {
      void 0 === this.lightbox && this.init(), this.widget.isLightboxShowing = true, document.querySelectorAll(".ti-widget-lightbox").forEach(((t3) => {
        "DIALOG" === t3.tagName && t3.open && t3.close(), t3.remove();
      }));
      let e2 = t2.closest(".ti-review-item").getAttribute("data-id"), i2 = 0, s2 = parseInt(t2.getAttribute("data-image-index"));
      for (let t3 = 0, r2 = this.data.length; t3 < r2; t3++) if (this.data[t3].r === e2 && this.data[t3].index === s2) {
        i2 = t3;
        break;
      }
      if (this.showLightbox(), this.isLongScroll) {
        this.lightbox.reviewsContainer.animate({ top: [0, 0] }, { duration: 0, fill: "both", easing: "ease-in-out" });
        let t3 = this.lightbox.querySelector('.ti-review-item[data-id="' + e2 + '"]');
        if (t3) {
          let e3 = t3.querySelector(".ti-card-media .ti-card-media-image img");
          e3 && !e3.complete ? e3.onload = () => t3.scrollIntoView() : t3.scrollIntoView();
        }
        Trustindex.show(this.lightbox.mobileCloseBottom), this.lightbox.reviewsContainer.focus(), Trustindex.profileImageFallback(this.lightbox.reviewsContainer);
      } else this.change(i2);
      setTimeout((() => this.lightbox.classList.add("ti-widget-lightbox-appeared")), 10);
    }
    close() {
      this.closeTimeout || (this.lightbox.classList.remove("ti-widget-lightbox-appeared"), this.closeTimeout = setTimeout((() => {
        delete this.closeTimeout, "DIALOG" === this.lightbox.tagName && this.lightbox.open && this.lightbox.close(), this.lightbox.remove();
      }), 300), this.isLongScroll && Trustindex.hide(this.lightbox.mobileCloseBottomSwipe), delete this.widget.isLightboxShowing);
    }
    change(t2) {
      if (this.currentIndex = t2, this.image.parentNode.classList.add("ti-image-loading"), this.image.src = this.getImgSrc(this.data[this.currentIndex], this.image.parentNode.offsetHeight), this.currentReview !== this.data[this.currentIndex].r) {
        this.currentReview = this.data[this.currentIndex].r, this.reviewContent.innerHTML = "";
        let t3 = this.widget.querySelector('.ti-review-item[data-id="' + this.data[this.currentIndex].r + '"]');
        if (!t3) return;
        let e2 = t3.querySelector(".ti-review-header").cloneNode(true);
        e2.classList.add("ti-lightbox-review-header");
        let i2 = t3.querySelector(".ti-review-text-container").cloneNode(true);
        i2.setAttribute("class", "ti-review-text"), i2.setAttribute("style", ""), i2.querySelectorAll(".ti-review-image").forEach(((t4) => t4.remove())), this.reviewContent.appendChild(e2), this.reviewContent.appendChild(t3.querySelector(".ti-stars").cloneNode(true)), this.reviewContent.appendChild(i2), this.lightbox.querySelector(".ti-widget-card").setAttribute("class", t3.getAttribute("class").replace("ti-review-item", "ti-widget-card"));
      }
      Trustindex.hide(this.prevArrow), Trustindex.hide(this.nextArrow), t2 > 0 && Trustindex.show(this.prevArrow), t2 < this.data.length - 1 && Trustindex.show(this.nextArrow);
    }
    getImgSrc(t2, e2 = 600) {
      let i2 = t2.src;
      if (-1 === i2.indexOf("google")) return i2;
      let s2 = Math.round(e2 * Trustindex.getDevicePixelRatio());
      return i2 = i2.replace(/=.+$/, ""), i2 + "=s" + s2;
    }
    navigateReviewImage(t2, e2) {
      if (t2 && (this.reviewMediaContainer = t2.closest(".ti-card-media"), e2 = t2.getAttribute("data-state")), this.isMoving || !this.reviewMediaContainer) return false;
      let i2 = this.reviewMediaContainer.getAttribute("data-position") || "0px", s2 = parseInt(this.reviewMediaContainer.getAttribute("data-state") || "0"), r2 = this.reviewMediaContainer.querySelectorAll(".ti-card-media-images .ti-card-media-image"), o2 = -1 * (e2 = "next" === e2 || "prev" === e2 ? s2 + ("next" === e2 ? 1 : -1) : parseInt(e2)) * this.reviewMediaContainer.offsetWidth + "px", a2 = 500;
      this.reviewMediaContainer.getAttribute("data-old-position") && (a2 = (parseInt(o2) - parseInt(this.reviewMediaContainer.getAttribute("data-old-position"))) / a2 * (parseInt(o2) - parseInt(i2))), this.isMoving = true, this.animateReviewImages(i2, o2, a2);
      let n2 = this.reviewMediaContainer.querySelector(".ti-arrow-prev"), l2 = this.reviewMediaContainer.querySelector(".ti-arrow-next");
      n2.classList.add("ti-hidden"), l2.classList.add("ti-hidden"), e2 > 0 && n2.classList.remove("ti-hidden"), e2 < r2.length - 1 && l2.classList.remove("ti-hidden"), this.reviewMediaContainer.setAttribute("data-state", e2), this.reviewMediaContainer.setAttribute("data-position", o2), this.reviewMediaContainer.querySelectorAll(".ti-card-media-thumbnail").forEach(((t3) => {
        t3.classList.remove("ti-active"), parseInt(t3.getAttribute("data-state")) === e2 && t3.classList.add("ti-active");
      })), setTimeout((() => {
        this.isMoving = false;
      }), a2);
    }
    animateReviewImages(t2, e2, i2) {
      if (!this.reviewMediaContainer) return false;
      this.reviewMediaContainer.querySelectorAll(".ti-card-media-images .ti-card-media-image").forEach(((s2) => {
        s2.animate({ left: [t2, e2] }, { duration: i2, fill: "both", easing: "ease-in-out" });
      }));
    }
    click(t2) {
      (t2.target.matches(".ti-review-image") || "popup" === this.widget.reviewTextMode && t2.target.matches(".ti-read-more-active:not(.ti-read-more-collapse")) && (t2.preventDefault(), this.show(t2.target));
    }
    getNavigationArrowState(t2) {
      if (!this.reviewMediaContainer) return false;
      let e2 = this.reviewMediaContainer.querySelector(".ti-arrow-" + t2);
      return !!e2 && !e2.classList.contains("ti-hidden");
    }
  }
  class v {
    constructor(t2) {
      let e2 = Trustindex.getJsonDataElement(t2, "ti-ai-summary");
      this.summary = Trustindex.parseJsonData(e2).summary, e2.remove(), this.widget = t2;
    }
    format() {
      let t2 = this.widget.reviewsContainer.querySelector(".ti-review-item");
      if (!t2 || void 0 !== this.element) return;
      let e2 = t2.cloneNode(true);
      e2.setAttribute("class", this.getClassName(e2)), e2.removeAttribute("data-id"), e2.querySelectorAll(".ti-stars, .ti-platform-icon, .ti-review-image-container").forEach(((t3) => t3.remove()));
      let i2 = e2.querySelector(".ti-profile-details .ti-name");
      i2 && (i2.innerHTML = this.summary.title);
      let s2 = e2.querySelector(".ti-profile-img");
      if (s2) {
        let e3 = s2.querySelector("img");
        t2.querySelector(".ti-profile-img").offsetWidth;
        if (e3 || (e3 = document.createElement("img"), s2.innerHTML = "", s2.appendChild(e3)), this.summary.images.length > 0) {
          for (let t4 = 0; t4 < this.summary.images.length; t4++) {
            let i3 = e3.cloneNode(true);
            i3.src = this.summary.images[t4], i3.removeAttribute("srcset"), s2.appendChild(i3);
          }
          let t3 = e3.cloneNode(true);
          t3.src = Trustindex.getCDNUrl() + "assets/img/ai-profile-image.svg", t3.removeAttribute("srcset"), s2.appendChild(t3), e3.remove();
        } else e3.src = Trustindex.getCDNUrl() + "assets/img/ai-profile-image.svg", e3.removeAttribute("srcset"), e3.setAttribute("alt", ""), e3.classList.add("ti-ai-profile-img");
      }
      let r2 = e2.querySelector(".ti-profile-details .ti-date");
      r2 && (r2.innerHTML = this.summary.comment);
      let o2 = e2.querySelector(".ti-review-text-container");
      o2 && (o2.innerHTML = this.summary.text), void 0 !== this.widget.TrustindexSliderWidget && "left" === this.widget.TrustindexSliderWidget.rotateTo ? this.widget.reviewsContainerWrapper.append(e2) : this.widget.reviewsContainerWrapper.insertBefore(e2, this.widget.reviewsContainerWrapper.firstChild), Trustindex.profileImageFallback(e2), this.element = e2;
    }
    getClassName(t2) {
      return "ti-ai-summary-item " + t2.getAttribute("class").replace(/source-[^\s]+/, "").trim() + (-1 !== this.summary.text.indexOf("<li>") ? " ti-with-checklist" : "");
    }
  }
  var x = (t2, e2, i2) => new Promise(((s2, r2) => {
    var o2 = (t3) => {
      try {
        n2(i2.next(t3));
      } catch (t4) {
        r2(t4);
      }
    }, a2 = (t3) => {
      try {
        n2(i2.throw(t3));
      } catch (t4) {
        r2(t4);
      }
    }, n2 = (t3) => t3.done ? s2(t3.value) : Promise.resolve(t3.value).then(o2, a2);
    n2((i2 = i2.apply(t2, e2)).next());
  }));
  class f {
    constructor(t2) {
      this.widget = t2, this.isAutoDarkMode = !!this.widget.getAttribute("data-auto-dark-mode");
    }
    format() {
      if (this.isAutoDarkMode && Trustindex.isDarkMode() && !Trustindex.isAdminUrl()) {
        let t2 = Trustindex.getCDNUrl() + `assets/widget-presetted-css/${this.widget.layoutId}-dark-background.css`;
        this.widget.cssVersion && (t2 = t2.replace("widget-presetted-css/", `widget-presetted-css/v${this.widget.cssVersion}/`)), (() => {
          x(this, null, (function* () {
            let e2 = document.createElement("style");
            e2.innerHTML = yield this.getCssContent(t2), document.body.appendChild(e2), this.changeLogosToDark(true);
          }));
        })();
      }
      this.changeLogosToDark();
    }
    getCssContent(t2) {
      return x(this, null, (function* () {
        let e2 = yield Trustindex.request(t2);
        return e2 ? this.extractColorsFromCss(e2) : null;
      }));
    }
    extractColorsFromCss(t2) {
      t2 = t2.replace('@charset "UTF-8";', "").replace(/@font-face{[^}]+}/g, "").replace(new RegExp("@(?:media|key-frames) [^{]*{(.*?})}", "gs"), "").trim();
      let e2 = `[data-set-id="${this.widget.setId}"]`;
      "wp-widget" !== this.widget.pid && (e2 += `[data-pid="${this.widget.pid}"]`);
      let i2 = this.parseCss(t2), s2 = "";
      for (let t3 in i2) {
        s2 += t3.replace(/\[data-set-id='dark-background'\]/g, e2) + "{";
        for (let e3 in i2[t3]) {
          let r2 = i2[t3][e3];
          -1 === r2.indexOf("!important") && (r2 += "!important"), s2 += `${e3}:${r2};`;
        }
        s2 += "}";
      }
      return s2;
    }
    parseCss(t2) {
      let e2 = {}, i2 = /^(#(?:[0-9a-fA-F]{3}){1,2}|rgba?\(\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}(\s*,\s*(0|1|0?\.\d+))?\))$/;
      return t2.matchAll(new RegExp("([^{]+){(.*?)}", "gs")).forEach(((t3) => {
        let s2 = e2[t3[1]] || {};
        t3[2].split(";").forEach(((t4) => {
          let e3 = t4.split(":"), r2 = e3.shift(), o2 = e3.join(":");
          (-1 !== r2.indexOf("color") || -1 !== ["box-shadow", "text-shadow"].indexOf(r2) || i2.test(o2)) && (void 0 !== s2[r2] && -1 === o2.indexOf("!important") && -1 !== s2[r2].indexOf("!important") || (s2[r2] = o2));
        })), Object.keys(s2).length && (e2[t3[1]] = s2);
      })), e2;
    }
    changeLogosToDark(t2 = false) {
      this.widget.querySelectorAll('img[src*="/logo"][src$=".svg"]').forEach(((e2) => {
        let i2 = e2.getAttribute("src").replace("-dark.svg", ".svg");
        t2 || this.isLogoDark(e2) ? e2.setAttribute("src", i2.replace(".svg", "-dark.svg")) : e2.setAttribute("src", i2);
      }));
    }
    isLogoDark(t2) {
      if ("dark-" === this.widget.setId.substr(0, 5)) return true;
      let e2 = t2.parentNode, i2 = true;
      for (; e2 !== this.widget; ) {
        let t3 = window.getComputedStyle(e2, null);
        if (!/rgba\(\d+, \d+, \d+, 0\)/.test(t3.backgroundColor)) {
          i2 = false;
          break;
        }
        e2 = e2.parentNode;
      }
      if (i2) return false;
      return -1 !== ["light-contrast", "light-contrast-large", "light-contrast-large-blue"].indexOf(this.widget.setId);
    }
  }
  if (void 0 === window.TrustindexWidget) {
    window.tiWidgetInstances = [], window.Trustindex = i, window.TrustindexWidget = r, window.TrustindexReviewWidget = o, window.TrustindexSliderWidget = a, window.TrustindexMasonryWidget = n, window.TrustindexPopupWidget = l, window.TrustindexTopRatedWidget = d, window.TrustindexFomoWidget = h, window.TrustindexCloseModule = g, window.TrustindexReadMoreModule = c, window.TrustindexLoadMoreModule = u, window.TrustindexHeaderModule = p, window.TrustindexReviewImageModule = w, window.TrustindexLightboxModule = m, window.TrustindexAiSummaryModule = v, window.TrustindexDarkModeModule = f, i.setConstants();
    let t2 = document.body ? document.body.offsetWidth : 0, e2 = null;
    window.addEventListener("resize", (() => {
      document.body.offsetWidth !== t2 && (t2 = document.body.offsetWidth, e2 && clearTimeout(e2), e2 = setTimeout((() => {
        e2 = null, window.tiWidgetInstances.forEach(((t3) => t3.resize()));
      }), 100));
    })), document.addEventListener("click", ((t3) => {
      window.tiWidgetInstances.forEach(((e4) => e4.documentClick(t3)));
      let e3 = t3.target.closest("a");
      if (e3 && e3.getAttribute("href")) {
        let i2 = document.getElementById(e3.getAttribute("href").split("#")[1]);
        if (i2 && !e3.getAttribute("data-ti-enable-scroll")) {
          t3.preventDefault(), t3.stopPropagation(), t3.stopImmediatePropagation();
          let s3 = i2.getBoundingClientRect();
          window.tiElementToWaitForVisibility.forEach(((t4, e4) => {
            t4.getBoundingClientRect().top < s3.top && (new r(null, t4), window.tiElementToWaitForVisibility.splice(e4, 1));
          })), e3.setAttribute("data-ti-enable-scroll", "1"), setTimeout((() => e3.click()), 150);
        }
      }
    }), { capture: true }), document.addEventListener("keyup", ((t3) => {
      window.tiWidgetInstances.forEach(((e3) => e3.documentKeyup(t3)));
    })), window.tiElementToWaitForVisibility = [], window.tiElementToWaitForActivity = [];
    let s2 = function(t3) {
      window.tiElementToWaitForVisibility.forEach(((t4, e3) => {
        t4.isTriggerLoad() && (new r(null, t4), window.tiElementToWaitForVisibility.splice(e3, 1));
      }));
    }, x2 = function(t3) {
      window.tiElementToWaitForActivity.forEach(((t4, e3) => {
        if (window.tiElementToWaitForActivity.splice(e3, 1), true === t4.isWaitForVisibility && !t4.isTriggerLoad()) return window.tiElementToWaitForVisibility.push(t4);
        new r(null, t4);
      }));
    };
    window.addEventListener("keydown", x2, false), window.addEventListener("mousemove", x2, false), window.addEventListener("wheel", x2, false), window.addEventListener("touchmove", x2, false), window.addEventListener("touchstart", x2, false), window.addEventListener("scroll", s2, false), window.addEventListener("wheel", s2, false), window.addEventListener("touchmove", s2, false), i.isMobileDevice() && "hidden" === window.getComputedStyle(document.documentElement, null).getPropertyValue("overflow") && (document.documentElement.style.overflow = "unset");
  }
  if (void 0 === window.renderTrustindexWidgets && (window.renderTrustindexWidgets = function() {
    document.querySelectorAll("pre.ti-widget").forEach(((t3) => {
      t3.children.length > 0 ? t3.replaceWith(t3.children[0]) : t3.remove();
    }));
    let t2 = () => {
      i.initNoticesForWordpress(), i.initWidgetsFromDom(), i.loadWidgetsFromDom();
    };
    i.isWordpressAdminUrl() ? t2() : setTimeout(t2, 4);
  }, !i.isAdminUrl())) {
    let t2 = function() {
      new MutationObserver(window.renderTrustindexWidgets).observe(document.body, { childList: true, subtree: true });
    };
    if (document.body) t2();
    else {
      let e2 = setInterval((() => {
        document.body && (t2(), clearInterval(e2));
      }), 100);
    }
  }
  document.currentScript && document.currentScript.getAttribute("data-skip-init") || window.renderTrustindexWidgets();
})();
