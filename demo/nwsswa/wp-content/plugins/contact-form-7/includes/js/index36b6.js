(() => {
  "use strict";
  const e = window.wp.i18n, t = (e2) => Math.abs(parseInt(e2, 10)), a = (e2, t2, a2) => {
    const n2 = new CustomEvent(`wpcf7${t2}`, { bubbles: true, detail: a2 });
    "string" == typeof e2 && (e2 = document.querySelector(e2)), e2.dispatchEvent(n2);
  }, n = (e2, t2) => {
    const n2 = new Map([["init", "init"], ["validation_failed", "invalid"], ["acceptance_missing", "unaccepted"], ["spam", "spam"], ["aborted", "aborted"], ["mail_sent", "sent"], ["mail_failed", "failed"], ["submitting", "submitting"], ["resetting", "resetting"], ["validating", "validating"], ["payment_required", "payment-required"]]);
    n2.has(t2) && (t2 = n2.get(t2)), Array.from(n2.values()).includes(t2) || (t2 = `custom-${t2 = (t2 = t2.replace(/[^0-9a-z]+/i, " ").trim()).replace(/\s+/, "-")}`);
    const r2 = e2.getAttribute("data-status");
    if (e2.wpcf7.status = t2, e2.setAttribute("data-status", t2), e2.classList.add(t2), r2 && r2 !== t2) {
      e2.classList.remove(r2);
      const t3 = { contactFormId: e2.wpcf7.id, pluginVersion: e2.wpcf7.pluginVersion, contactFormLocale: e2.wpcf7.locale, unitTag: e2.wpcf7.unitTag, containerPostId: e2.wpcf7.containerPost, status: e2.wpcf7.status, prevStatus: r2 };
      a(e2, "statuschanged", t3);
    }
    return t2;
  }, r = (e2) => {
    const { root: t2, namespace: a2 = "contact-form-7/v1" } = wpcf7.api;
    return c.reduceRight(((e3, t3) => (a3) => t3(a3, e3)), ((e3) => {
      let n2, r2, { url: c2, path: o2, endpoint: s2, headers: i2, body: l2, data: p2, ...d2 } = e3;
      "string" == typeof s2 && (n2 = a2.replace(/^\/|\/$/g, ""), r2 = s2.replace(/^\//, ""), o2 = r2 ? n2 + "/" + r2 : n2), "string" == typeof o2 && (-1 !== t2.indexOf("?") && (o2 = o2.replace("?", "&")), o2 = o2.replace(/^\//, ""), c2 = t2 + o2), i2 = { Accept: "application/json, */*;q=0.1", ...i2 }, delete i2["X-WP-Nonce"], p2 && (l2 = JSON.stringify(p2), i2["Content-Type"] = "application/json");
      const f2 = { code: "fetch_error", message: "You are probably offline." }, u2 = { code: "invalid_json", message: "The response is not a valid JSON response." };
      return window.fetch(c2 || o2 || window.location.href, { ...d2, headers: i2, body: l2 }).then(((e4) => Promise.resolve(e4).then(((e5) => {
        if (e5.status >= 200 && e5.status < 300) return e5;
        throw e5;
      })).then(((e5) => {
        if (204 === e5.status) return null;
        if (e5 && e5.json) return e5.json().catch((() => {
          throw u2;
        }));
        throw u2;
      }))), (() => {
        throw f2;
      }));
    }))(e2);
  }, c = [];
  function o(e2, t2 = {}) {
    const { target: a2, scope: r2 = e2, ...c2 } = t2;
    if (void 0 === e2.wpcf7?.schema) return;
    const o2 = { ...e2.wpcf7.schema };
    if (void 0 !== a2) {
      if (!e2.contains(a2)) return;
      if (!a2.closest(".wpcf7-form-control-wrap[data-name]")) return;
      if (a2.closest(".novalidate")) return;
    }
    const p2 = r2.querySelectorAll(".wpcf7-form-control-wrap"), d2 = Array.from(p2).reduce(((e3, t3) => (t3.closest(".novalidate") || t3.querySelectorAll(":where( input, textarea, select ):enabled").forEach(((t4) => {
      if (t4.name) switch (t4.type) {
        case "button":
        case "image":
        case "reset":
        case "submit":
          break;
        case "checkbox":
        case "radio":
          t4.checked && e3.append(t4.name, t4.value);
          break;
        case "select-multiple":
          for (const a3 of t4.selectedOptions) e3.append(t4.name, a3.value);
          break;
        case "file":
          for (const a3 of t4.files) e3.append(t4.name, a3);
          break;
        default:
          e3.append(t4.name, t4.value);
      }
    })), e3)), new FormData()), f2 = e2.getAttribute("data-status");
    Promise.resolve(n(e2, "validating")).then(((n2) => {
      if (void 0 !== swv) {
        const n3 = swv.validate(o2, d2, t2);
        for (const t3 of p2) {
          if (void 0 === t3.dataset.name) continue;
          const c3 = t3.dataset.name;
          if (n3.has(c3)) {
            const { error: t4, validInputs: a3 } = n3.get(c3);
            i(e2, c3), void 0 !== t4 && s(e2, c3, t4, { scope: r2 }), l(e2, c3, null != a3 ? a3 : []);
          }
          if (t3.contains(a2)) break;
        }
      }
    })).finally((() => {
      n(e2, f2);
    }));
  }
  r.use = (e2) => {
    c.unshift(e2);
  };
  const s = (e2, t2, a2, n2) => {
    const { scope: r2 = e2, ...c2 } = null != n2 ? n2 : {}, o2 = `${e2.wpcf7?.unitTag}-ve-${t2}`.replaceAll(/[^0-9a-z_-]+/gi, ""), s2 = e2.querySelector(`.wpcf7-form-control-wrap[data-name="${t2}"] .wpcf7-form-control`);
    (() => {
      const t3 = document.createElement("li");
      t3.setAttribute("id", o2), s2 && s2.id ? t3.insertAdjacentHTML("beforeend", `<a href="#${s2.id}">${a2}</a>`) : t3.insertAdjacentText("beforeend", a2), e2.wpcf7.parent.querySelector(".screen-reader-response ul").appendChild(t3);
    })(), r2.querySelectorAll(`.wpcf7-form-control-wrap[data-name="${t2}"]`).forEach(((e3) => {
      const t3 = document.createElement("span");
      t3.classList.add("wpcf7-not-valid-tip"), t3.setAttribute("aria-hidden", "true"), t3.insertAdjacentText("beforeend", a2), e3.appendChild(t3), e3.querySelectorAll("[aria-invalid]").forEach(((e4) => {
        e4.setAttribute("aria-invalid", "true");
      })), e3.querySelectorAll(".wpcf7-form-control").forEach(((e4) => {
        e4.classList.add("wpcf7-not-valid"), e4.setAttribute("aria-describedby", o2), "function" == typeof e4.setCustomValidity && e4.setCustomValidity(a2), e4.closest(".use-floating-validation-tip") && (e4.addEventListener("focus", ((e5) => {
          t3.setAttribute("style", "display: none");
        })), t3.addEventListener("click", ((e5) => {
          t3.setAttribute("style", "display: none");
        })));
      }));
    }));
  }, i = (e2, t2) => {
    const a2 = `${e2.wpcf7?.unitTag}-ve-${t2}`.replaceAll(/[^0-9a-z_-]+/gi, "");
    e2.wpcf7.parent.querySelector(`.screen-reader-response ul li#${a2}`)?.remove(), e2.querySelectorAll(`.wpcf7-form-control-wrap[data-name="${t2}"]`).forEach(((e3) => {
      e3.querySelector(".wpcf7-not-valid-tip")?.remove(), e3.querySelectorAll("[aria-invalid]").forEach(((e4) => {
        e4.setAttribute("aria-invalid", "false");
      })), e3.querySelectorAll(".wpcf7-form-control").forEach(((e4) => {
        e4.removeAttribute("aria-describedby"), e4.classList.remove("wpcf7-not-valid"), "function" == typeof e4.setCustomValidity && e4.setCustomValidity("");
      }));
    }));
  }, l = (e2, t2, a2) => {
    e2.querySelectorAll(`[data-reflection-of="${t2}"]`).forEach(((e3) => {
      if ("output" === e3.tagName.toLowerCase()) {
        const t3 = e3;
        0 === a2.length && a2.push(t3.dataset.default), a2.slice(0, 1).forEach(((e4) => {
          e4 instanceof File && (e4 = e4.name), t3.textContent = e4;
        }));
      } else e3.querySelectorAll("output").forEach(((e4) => {
        e4.hasAttribute("data-default") ? 0 === a2.length ? e4.removeAttribute("hidden") : e4.setAttribute("hidden", "hidden") : e4.remove();
      })), a2.forEach(((a3) => {
        a3 instanceof File && (a3 = a3.name);
        const n2 = document.createElement("output");
        n2.setAttribute("name", t2), n2.textContent = a3, e3.appendChild(n2);
      }));
    }));
  };
  function p(e2, t2 = {}) {
    if (wpcf7.blocked) return d(e2), void n(e2, "submitting");
    const c2 = new FormData(e2);
    t2.submitter && t2.submitter.name && c2.append(t2.submitter.name, t2.submitter.value);
    const o2 = { contactFormId: e2.wpcf7.id, pluginVersion: e2.wpcf7.pluginVersion, contactFormLocale: e2.wpcf7.locale, unitTag: e2.wpcf7.unitTag, containerPostId: e2.wpcf7.containerPost, status: e2.wpcf7.status, inputs: Array.from(c2, ((e3) => {
      const t3 = e3[0], a2 = e3[1];
      return !t3.match(/^_/) && { name: t3, value: a2 };
    })).filter(((e3) => false !== e3)), formData: c2 };
    r({ endpoint: `contact-forms/${e2.wpcf7.id}/feedback`, method: "POST", body: c2, wpcf7: { endpoint: "feedback", form: e2, detail: o2 } }).then(((t3) => {
      const r2 = n(e2, t3.status);
      return o2.status = t3.status, o2.apiResponse = t3, ["invalid", "unaccepted", "spam", "aborted"].includes(r2) ? a(e2, r2, o2) : ["sent", "failed"].includes(r2) && a(e2, `mail${r2}`, o2), a(e2, "submit", o2), t3;
    })).then(((t3) => {
      t3.posted_data_hash && (e2.querySelector('input[name="_wpcf7_posted_data_hash"]').value = t3.posted_data_hash), "mail_sent" === t3.status && (e2.reset(), e2.wpcf7.resetOnMailSent = true), t3.invalid_fields && t3.invalid_fields.forEach(((t4) => {
        s(e2, t4.field, t4.message);
      })), e2.wpcf7.parent.querySelector('.screen-reader-response [role="status"]').insertAdjacentText("beforeend", t3.message), e2.querySelectorAll(".wpcf7-response-output").forEach(((e3) => {
        e3.innerText = t3.message;
      }));
    })).catch(((e3) => console.error(e3)));
  }
  r.use(((e2, t2) => {
    if (e2.wpcf7 && "feedback" === e2.wpcf7.endpoint) {
      const { form: t3, detail: r2 } = e2.wpcf7;
      d(t3), a(t3, "beforesubmit", r2), n(t3, "submitting");
    }
    return t2(e2);
  }));
  const d = (e2) => {
    e2.querySelectorAll(".wpcf7-form-control-wrap").forEach(((t2) => {
      t2.dataset.name && i(e2, t2.dataset.name);
    })), e2.wpcf7.parent.querySelector('.screen-reader-response [role="status"]').innerText = "", e2.querySelectorAll(".wpcf7-response-output").forEach(((e3) => {
      e3.innerText = "";
    }));
  };
  function f(e2) {
    const t2 = new FormData(e2), c2 = { contactFormId: e2.wpcf7.id, pluginVersion: e2.wpcf7.pluginVersion, contactFormLocale: e2.wpcf7.locale, unitTag: e2.wpcf7.unitTag, containerPostId: e2.wpcf7.containerPost, status: e2.wpcf7.status, inputs: Array.from(t2, ((e3) => {
      const t3 = e3[0], a2 = e3[1];
      return !t3.match(/^_/) && { name: t3, value: a2 };
    })).filter(((e3) => false !== e3)), formData: t2 };
    r({ endpoint: `contact-forms/${e2.wpcf7.id}/refill`, method: "GET", wpcf7: { endpoint: "refill", form: e2, detail: c2 } }).then(((t3) => {
      e2.wpcf7.resetOnMailSent ? (delete e2.wpcf7.resetOnMailSent, n(e2, "mail_sent")) : n(e2, "init"), c2.apiResponse = t3, a(e2, "reset", c2);
    })).catch(((e3) => console.error(e3)));
  }
  r.use(((e2, t2) => {
    if (e2.wpcf7 && "refill" === e2.wpcf7.endpoint) {
      const { form: t3, detail: a2 } = e2.wpcf7;
      d(t3), n(t3, "resetting");
    }
    return t2(e2);
  }));
  const u = (e2, t2) => {
    for (const a2 in t2) {
      const n2 = t2[a2];
      e2.querySelectorAll(`input[name="${a2}"]`).forEach(((e3) => {
        e3.value = "";
      })), e2.querySelectorAll(`img.wpcf7-captcha-${a2.replaceAll(":", "")}`).forEach(((e3) => {
        e3.setAttribute("src", n2);
      }));
      const r2 = /([0-9]+)\.(png|gif|jpeg)$/.exec(n2);
      r2 && e2.querySelectorAll(`input[name="_wpcf7_captcha_challenge_${a2}"]`).forEach(((e3) => {
        e3.value = r2[1];
      }));
    }
  }, m = (e2, t2) => {
    for (const a2 in t2) {
      const n2 = t2[a2][0], r2 = t2[a2][1];
      e2.querySelectorAll(`.wpcf7-form-control-wrap[data-name="${a2}"]`).forEach(((e3) => {
        e3.querySelector(`input[name="${a2}"]`).value = "", e3.querySelector(".wpcf7-quiz-label").textContent = n2, e3.querySelector(`input[name="_wpcf7_quiz_answer_${a2}"]`).value = r2;
      }));
    }
  };
  function w(e2) {
    const a2 = new FormData(e2);
    e2.wpcf7 = { id: t(a2.get("_wpcf7")), status: e2.getAttribute("data-status"), pluginVersion: a2.get("_wpcf7_version"), locale: a2.get("_wpcf7_locale"), unitTag: a2.get("_wpcf7_unit_tag"), containerPost: t(a2.get("_wpcf7_container_post")), parent: e2.closest(".wpcf7"), get schema() {
      return wpcf7.schemas.get(this.id);
    } }, wpcf7.schemas.set(e2.wpcf7.id, void 0), e2.querySelectorAll(".has-spinner").forEach(((e3) => {
      e3.insertAdjacentHTML("afterend", '<span class="wpcf7-spinner"></span>');
    })), ((e3) => {
      e3.querySelectorAll(".wpcf7-exclusive-checkbox").forEach(((t2) => {
        t2.addEventListener("change", ((t3) => {
          const a3 = t3.target.getAttribute("name");
          e3.querySelectorAll(`input[type="checkbox"][name="${a3}"]`).forEach(((e4) => {
            e4 !== t3.target && (e4.checked = false);
          }));
        }));
      }));
    })(e2), ((e3) => {
      e3.querySelectorAll(".has-free-text").forEach(((t2) => {
        const a3 = t2.querySelector("input.wpcf7-free-text"), n2 = t2.querySelector('input[type="checkbox"], input[type="radio"]');
        a3.disabled = !n2.checked, e3.addEventListener("change", ((e4) => {
          a3.disabled = !n2.checked, e4.target === n2 && n2.checked && a3.focus();
        }));
      }));
    })(e2), ((e3) => {
      e3.querySelectorAll(".wpcf7-validates-as-url").forEach(((e4) => {
        e4.addEventListener("change", ((t2) => {
          let a3 = e4.value.trim();
          a3 && !a3.match(/^[a-z][a-z0-9.+-]*:/i) && -1 !== a3.indexOf(".") && (a3 = a3.replace(/^\/+/, ""), a3 = "http://" + a3), e4.value = a3;
        }));
      }));
    })(e2), ((e3) => {
      if (!e3.querySelector(".wpcf7-acceptance") || e3.classList.contains("wpcf7-acceptance-as-validation")) return;
      const t2 = () => {
        let t3 = true;
        e3.querySelectorAll(".wpcf7-acceptance").forEach(((e4) => {
          if (!t3 || e4.classList.contains("optional")) return;
          const a3 = e4.querySelector('input[type="checkbox"]');
          (e4.classList.contains("invert") && a3.checked || !e4.classList.contains("invert") && !a3.checked) && (t3 = false);
        })), e3.querySelectorAll(".wpcf7-submit").forEach(((e4) => {
          e4.disabled = !t3;
        }));
      };
      t2(), e3.addEventListener("change", ((e4) => {
        t2();
      })), e3.addEventListener("wpcf7reset", ((e4) => {
        t2();
      }));
    })(e2), ((e3) => {
      const a3 = (e4, a4) => {
        const n3 = t(e4.getAttribute("data-starting-value")), r2 = t(e4.getAttribute("data-maximum-value")), c2 = t(e4.getAttribute("data-minimum-value")), o2 = e4.classList.contains("down") ? n3 - a4.value.trim().length : a4.value.trim().length;
        e4.setAttribute("data-current-value", o2), e4.innerText = o2, r2 && r2 < a4.value.length ? e4.classList.add("too-long") : e4.classList.remove("too-long"), c2 && a4.value.length < c2 ? e4.classList.add("too-short") : e4.classList.remove("too-short");
      }, n2 = (t2) => {
        t2 = { init: false, ...t2 }, e3.querySelectorAll(".wpcf7-character-count").forEach(((n3) => {
          const r2 = n3.getAttribute("data-target-name"), c2 = e3.querySelector(`[name="${r2}"]`);
          c2 && (c2.value = c2.defaultValue, a3(n3, c2), t2.init && c2.addEventListener("keyup", ((e4) => {
            a3(n3, c2);
          })));
        }));
      };
      n2({ init: true }), e3.addEventListener("wpcf7reset", ((e4) => {
        n2();
      }));
    })(e2), window.addEventListener("load", ((t2) => {
      wpcf7.cached && e2.reset();
    })), e2.addEventListener("reset", ((t2) => {
      wpcf7.reset(e2);
    })), e2.addEventListener("submit", ((t2) => {
      wpcf7.submit(e2, { submitter: t2.submitter }), t2.preventDefault();
    })), e2.addEventListener("wpcf7submit", ((t2) => {
      t2.detail.apiResponse.captcha && u(e2, t2.detail.apiResponse.captcha), t2.detail.apiResponse.quiz && m(e2, t2.detail.apiResponse.quiz);
    })), e2.addEventListener("wpcf7reset", ((t2) => {
      t2.detail.apiResponse.captcha && u(e2, t2.detail.apiResponse.captcha), t2.detail.apiResponse.quiz && m(e2, t2.detail.apiResponse.quiz);
    })), e2.addEventListener("change", ((t2) => {
      t2.target.closest(".wpcf7-form-control") && wpcf7.validate(e2, { target: t2.target });
    })), e2.addEventListener("wpcf7statuschanged", ((t2) => {
      const a3 = t2.detail.status;
      e2.querySelectorAll(".active-on-any").forEach(((e3) => {
        e3.removeAttribute("inert"), e3.classList.remove("active-on-any");
      })), e2.querySelectorAll(`.inert-on-${a3}`).forEach(((e3) => {
        e3.setAttribute("inert", "inert"), e3.classList.add("active-on-any");
      }));
    }));
  }
  document.addEventListener("DOMContentLoaded", ((t2) => {
    var a2;
    if ("undefined" != typeof wpcf7) if (void 0 !== wpcf7.api) if ("function" == typeof window.fetch) if ("function" == typeof window.FormData) if ("function" == typeof NodeList.prototype.forEach) if ("function" == typeof String.prototype.replaceAll) {
      wpcf7 = { init: w, submit: p, reset: f, validate: o, schemas: new Map(), ...null !== (a2 = wpcf7) && void 0 !== a2 ? a2 : {} }, document.querySelectorAll("form .wpcf7[data-wpcf7-id]").forEach(((t3) => {
        const a3 = document.createElement("p");
        a3.setAttribute("class", "wpcf7-form-in-wrong-place");
        const n2 = document.createElement("strong");
        n2.append((0, e.__)("Error:", "contact-form-7"));
        const r2 = (0, e.__)("This contact form is placed in the wrong place.", "contact-form-7");
        a3.append(n2, " ", r2), t3.replaceWith(a3);
      })), document.querySelectorAll(".wpcf7 > form").forEach(((e2) => {
        wpcf7.init(e2), e2.closest(".wpcf7").classList.replace("no-js", "js");
      }));
      for (const e2 of wpcf7.schemas.keys()) r({ endpoint: `contact-forms/${e2}/feedback/schema`, method: "GET" }).then(((t3) => {
        wpcf7.schemas.set(e2, t3);
      }));
    } else console.error("Your browser does not support String.replaceAll().");
    else console.error("Your browser does not support NodeList.forEach().");
    else console.error("Your browser does not support window.FormData().");
    else console.error("Your browser does not support window.fetch().");
    else console.error("wpcf7.api is not defined.");
    else console.error("wpcf7 is not defined.");
  }));
})();
