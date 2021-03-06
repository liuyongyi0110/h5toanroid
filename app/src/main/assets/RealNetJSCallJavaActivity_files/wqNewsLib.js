window.Echo = function (t, e) {
    "use strict";
    var n, r, i, o = [], a = function (t) {
        var r = t.getBoundingClientRect();
        return (r.top >= 0 && r.left >= 0 && r.top) <= (window.innerHeight || e.documentElement.clientHeight) + n
    }, s = function () {
        var n = o.length;
        if (n > 0)for (var r = 0; n > r; r++) {
            var s = o[r];
            s && a(s) && (s.src = s.getAttribute("data-echo"), o.splice(r, 1), n = o.length, r--)
        } else e.removeEventListener ? t.removeEventListener("scroll", c) : t.detachEvent("onscroll", c), clearTimeout(i)
    }, c = function () {
        clearTimeout(i), i = setTimeout(s, r)
    }, u = function (i) {
        var a = e.querySelectorAll("[data-echo]"), u = i || {};
        n = parseInt(u.offset || 0), r = parseInt(u.throttle || 250);
        for (var l = 0; l < a.length; l++)o.push(a[l]);
        s(), e.addEventListener ? (t.addEventListener("scroll", c, !1), t.addEventListener("load", c, !1)) : (t.attachEvent("onscroll", c), t.attachEvent("onload", c))
    };
    return {init: u, render: s}
}(this, document), !function () {
    "use strict";
    function t(e, r) {
        function i(t, e) {
            return function () {
                return t.apply(e, arguments)
            }
        }

        var o, a, s, c, u;
        if (r = r || {}, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = r.touchBoundary || 10, this.layer = e, this.tapDelay = r.tapDelay || 200, this.tapTimeout = r.tapTimeout || 700, !t.notNeeded(e)) {
            for (a = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], s = this, c = 0, u = a.length; u > c; c++)s[a[c]] = i(s[a[c]], s);
            n && (e.addEventListener("mouseover", this.onMouse, !0), e.addEventListener("mousedown", this.onMouse, !0), e.addEventListener("mouseup", this.onMouse, !0)), e.addEventListener("click", this.onClick, !0), e.addEventListener("touchstart", this.onTouchStart, !1), e.addEventListener("touchmove", this.onTouchMove, !1), e.addEventListener("touchend", this.onTouchEnd, !1), e.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (e.removeEventListener = function (t, n, r) {
                var i = Node.prototype.removeEventListener;
                "click" === t ? i.call(e, t, n.hijacked || n, r) : i.call(e, t, n, r)
            }, e.addEventListener = function (t, n, r) {
                var i = Node.prototype.addEventListener;
                "click" === t ? i.call(e, t, n.hijacked || (n.hijacked = function (t) {
                        t.propagationStopped || n(t)
                    }), r) : i.call(e, t, n, r)
            }), "function" == typeof e.onclick && (o = e.onclick, e.addEventListener("click", function (t) {
                o(t)
            }, !1), e.onclick = null)
        }
    }

    var e = navigator.userAgent.indexOf("Windows Phone") >= 0, n = navigator.userAgent.indexOf("Android") > 0 && !e, r = /iP(ad|hone|od)/.test(navigator.userAgent) && !e, i = r && /OS 4_\d(_\d)?/.test(navigator.userAgent), o = r && /OS ([6-9]|\d{2})_\d/.test(navigator.userAgent), a = navigator.userAgent.indexOf("BB10") > 0;
    t.prototype.needsClick = function (t) {
        switch (t.nodeName.toLowerCase()) {
            case"button":
            case"select":
            case"textarea":
                if (t.disabled)return !0;
                break;
            case"input":
                if (r && "file" === t.type || t.disabled)return !0;
                break;
            case"label":
            case"iframe":
            case"video":
                return !0
        }
        return /\bneedsclick\b/.test(t.className)
    }, t.prototype.needsFocus = function (t) {
        switch (t.nodeName.toLowerCase()) {
            case"textarea":
                return !0;
            case"select":
                return !n;
            case"input":
                switch (t.type) {
                    case"button":
                    case"checkbox":
                    case"file":
                    case"image":
                    case"radio":
                    case"submit":
                        return !1
                }
                return !t.disabled && !t.readOnly;
            default:
                return /\bneedsfocus\b/.test(t.className)
        }
    }, t.prototype.sendClick = function (t, e) {
        var n, r;
        document.activeElement && document.activeElement !== t && document.activeElement.blur(), r = e.changedTouches[0], n = document.createEvent("MouseEvents"), n.initMouseEvent(this.determineEventType(t), !0, !0, window, 1, r.screenX, r.screenY, r.clientX, r.clientY, !1, !1, !1, !1, 0, null), n.forwardedTouchEvent = !0, t.dispatchEvent(n)
    }, t.prototype.determineEventType = function (t) {
        return n && "select" === t.tagName.toLowerCase() ? "mousedown" : "click"
    }, t.prototype.focus = function (t) {
        var e;
        r && t.setSelectionRange && 0 !== t.type.indexOf("date") && "time" !== t.type && "month" !== t.type ? (e = t.value.length, t.setSelectionRange(e, e)) : t.focus()
    }, t.prototype.updateScrollParent = function (t) {
        var e, n;
        if (e = t.fastClickScrollParent, !e || !e.contains(t)) {
            n = t;
            do {
                if (n.scrollHeight > n.offsetHeight) {
                    e = n, t.fastClickScrollParent = n;
                    break
                }
                n = n.parentElement
            } while (n)
        }
        e && (e.fastClickLastScrollTop = e.scrollTop)
    }, t.prototype.getTargetElementFromEventTarget = function (t) {
        return t.nodeType === Node.TEXT_NODE ? t.parentNode : t
    }, t.prototype.onTouchStart = function (t) {
        var e, n, o;
        if (t.targetTouches.length > 1)return !0;
        if (e = this.getTargetElementFromEventTarget(t.target), n = t.targetTouches[0], r) {
            if (o = window.getSelection(), o.rangeCount && !o.isCollapsed)return !0;
            if (!i) {
                if (n.identifier && n.identifier === this.lastTouchIdentifier)return t.preventDefault(), !1;
                this.lastTouchIdentifier = n.identifier, this.updateScrollParent(e)
            }
        }
        return this.trackingClick = !0, this.trackingClickStart = t.timeStamp, this.targetElement = e, this.touchStartX = n.pageX, this.touchStartY = n.pageY, t.timeStamp - this.lastClickTime < this.tapDelay && t.preventDefault(), !0
    }, t.prototype.touchHasMoved = function (t) {
        var e = t.changedTouches[0], n = this.touchBoundary;
        return Math.abs(e.pageX - this.touchStartX) > n || Math.abs(e.pageY - this.touchStartY) > n ? !0 : !1
    }, t.prototype.onTouchMove = function (t) {
        return this.trackingClick ? ((this.targetElement !== this.getTargetElementFromEventTarget(t.target) || this.touchHasMoved(t)) && (this.trackingClick = !1, this.targetElement = null), !0) : !0
    }, t.prototype.findControl = function (t) {
        return void 0 !== t.control ? t.control : t.htmlFor ? document.getElementById(t.htmlFor) : t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
    }, t.prototype.onTouchEnd = function (t) {
        var e, a, s, c, u, l = this.targetElement;
        if (!this.trackingClick)return !0;
        if (t.timeStamp - this.lastClickTime < this.tapDelay)return this.cancelNextClick = !0, !0;
        if (t.timeStamp - this.trackingClickStart > this.tapTimeout)return !0;
        if (this.cancelNextClick = !1, this.lastClickTime = t.timeStamp, a = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, o && (u = t.changedTouches[0], l = document.elementFromPoint(u.pageX - window.pageXOffset, u.pageY - window.pageYOffset) || l, l.fastClickScrollParent = this.targetElement.fastClickScrollParent), s = l.tagName.toLowerCase(), "label" === s) {
            if (e = this.findControl(l)) {
                if (this.focus(l), n)return !1;
                l = e
            }
        } else if (this.needsFocus(l))return t.timeStamp - a > 100 || r && window.top !== window && "input" === s ? (this.targetElement = null, !1) : (this.focus(l), this.sendClick(l, t), r && "select" === s || (this.targetElement = null, t.preventDefault()), !1);
        return r && !i && (c = l.fastClickScrollParent, c && c.fastClickLastScrollTop !== c.scrollTop) ? !0 : (this.needsClick(l) || (t.preventDefault(), this.sendClick(l, t)), !1)
    }, t.prototype.onTouchCancel = function () {
        this.trackingClick = !1, this.targetElement = null
    }, t.prototype.onMouse = function (t) {
        return this.targetElement ? t.forwardedTouchEvent ? !0 : t.cancelable && (!this.needsClick(this.targetElement) || this.cancelNextClick) ? (t.stopImmediatePropagation ? t.stopImmediatePropagation() : t.propagationStopped = !0, t.stopPropagation(), t.preventDefault(), !1) : !0 : !0
    }, t.prototype.onClick = function (t) {
        var e;
        return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === t.target.type && 0 === t.detail ? !0 : (e = this.onMouse(t), e || (this.targetElement = null), e)
    }, t.prototype.destroy = function () {
        var t = this.layer;
        n && (t.removeEventListener("mouseover", this.onMouse, !0), t.removeEventListener("mousedown", this.onMouse, !0), t.removeEventListener("mouseup", this.onMouse, !0)), t.removeEventListener("click", this.onClick, !0), t.removeEventListener("touchstart", this.onTouchStart, !1), t.removeEventListener("touchmove", this.onTouchMove, !1), t.removeEventListener("touchend", this.onTouchEnd, !1), t.removeEventListener("touchcancel", this.onTouchCancel, !1)
    }, t.notNeeded = function (t) {
        var e, r, i;
        if ("undefined" == typeof window.ontouchstart)return !0;
        if (r = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
            if (!n)return !0;
            if (e = document.querySelector("meta[name=viewport]")) {
                if (-1 !== e.content.indexOf("user-scalable=no"))return !0;
                if (r > 31 && document.documentElement.scrollWidth <= window.outerWidth)return !0
            }
        }
        if (a && (i = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/), i[1] >= 10 && i[2] >= 3 && (e = document.querySelector("meta[name=viewport]")))) {
            if (-1 !== e.content.indexOf("user-scalable=no"))return !0;
            if (document.documentElement.scrollWidth <= window.outerWidth)return !0
        }
        return "none" === t.style.msTouchAction ? !0 : "none" === t.style.touchAction ? !0 : !1
    }, t.attach = function (e, n) {
        return new t(e, n)
    }, "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function () {
        return t
    }) : "undefined" != typeof module && module.exports ? (module.exports = t.attach, module.exports.FastClick = t) : window.FastClick = t
}();
var Zepto = function () {
    function t(t) {
        return null == t ? String(t) : Y[V.call(t)] || "object"
    }

    function e(e) {
        return "function" == t(e)
    }

    function n(t) {
        return null != t && t == t.window
    }

    function r(t) {
        return null != t && t.nodeType == t.DOCUMENT_NODE
    }

    function i(e) {
        return "object" == t(e)
    }

    function o(t) {
        return i(t) && !n(t) && Object.getPrototypeOf(t) == Object.prototype
    }

    function a(t) {
        return "number" == typeof t.length
    }

    function s(t) {
        return L.call(t, function (t) {
            return null != t
        })
    }

    function c(t) {
        return t.length > 0 ? C.fn.concat.apply([], t) : t
    }

    function u(t) {
        return t.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
    }

    function l(t) {
        return t in A ? A[t] : A[t] = new RegExp("(^|\\s)" + t + "(\\s|$)")
    }

    function f(t, e) {
        return "number" != typeof e || M[u(t)] ? e : e + "px"
    }

    function h(t) {
        var e, n;
        return O[t] || (e = P.createElement(t), P.body.appendChild(e), n = getComputedStyle(e, "").getPropertyValue("display"), e.parentNode.removeChild(e), "none" == n && (n = "block"), O[t] = n), O[t]
    }

    function p(t) {
        return "children" in t ? N.call(t.children) : C.map(t.childNodes, function (t) {
            return 1 == t.nodeType ? t : void 0
        })
    }

    function d(t, e, n) {
        for (b in e)n && (o(e[b]) || G(e[b])) ? (o(e[b]) && !o(t[b]) && (t[b] = {}), G(e[b]) && !G(t[b]) && (t[b] = []), d(t[b], e[b], n)) : e[b] !== x && (t[b] = e[b])
    }

    function m(t, e) {
        return null == e ? C(t) : C(t).filter(e)
    }

    function v(t, n, r, i) {
        return e(n) ? n.call(t, r, i) : n
    }

    function g(t, e, n) {
        null == n ? t.removeAttribute(e) : t.setAttribute(e, n)
    }

    function y(t, e) {
        var n = t.className, r = n && n.baseVal !== x;
        return e === x ? r ? n.baseVal : n : void(r ? n.baseVal = e : t.className = e)
    }

    function E(t) {
        var e;
        try {
            return t ? "true" == t || ("false" == t ? !1 : "null" == t ? null : /^0/.test(t) || isNaN(e = Number(t)) ? /^[\[\{]/.test(t) ? C.parseJSON(t) : t : e) : t
        } catch (n) {
            return t
        }
    }

    function w(t, e) {
        e(t);
        for (var n = 0, r = t.childNodes.length; r > n; n++)w(t.childNodes[n], e)
    }

    var x, b, C, T, k, S, j = [], N = j.slice, L = j.filter, P = window.document, O = {}, A = {}, M = {
        "column-count": 1,
        columns: 1,
        "font-weight": 1,
        "line-height": 1,
        opacity: 1,
        "z-index": 1,
        zoom: 1
    }, D = /^\s*<(\w+|!)[^>]*>/, _ = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, F = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, Z = /^(?:body|html)$/i, $ = /([A-Z])/g, R = ["val", "css", "html", "text", "data", "width", "height", "offset"], I = ["after", "prepend", "before", "append"], q = P.createElement("table"), H = P.createElement("tr"), X = {
        tr: P.createElement("tbody"),
        tbody: q,
        thead: q,
        tfoot: q,
        td: H,
        th: H,
        "*": P.createElement("div")
    }, z = /complete|loaded|interactive/, B = /^[\w-]*$/, Y = {}, V = Y.toString, W = {}, U = P.createElement("div"), J = {
        tabindex: "tabIndex",
        readonly: "readOnly",
        "for": "htmlFor",
        "class": "className",
        maxlength: "maxLength",
        cellspacing: "cellSpacing",
        cellpadding: "cellPadding",
        rowspan: "rowSpan",
        colspan: "colSpan",
        usemap: "useMap",
        frameborder: "frameBorder",
        contenteditable: "contentEditable"
    }, G = Array.isArray || function (t) {
            return t instanceof Array
        };
    return W.matches = function (t, e) {
        if (!e || !t || 1 !== t.nodeType)return !1;
        var n = t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.matchesSelector;
        if (n)return n.call(t, e);
        var r, i = t.parentNode, o = !i;
        return o && (i = U).appendChild(t), r = ~W.qsa(i, e).indexOf(t), o && U.removeChild(t), r
    }, k = function (t) {
        return t.replace(/-+(.)?/g, function (t, e) {
            return e ? e.toUpperCase() : ""
        })
    }, S = function (t) {
        return L.call(t, function (e, n) {
            return t.indexOf(e) == n
        })
    }, W.fragment = function (t, e, n) {
        var r, i, a;
        return _.test(t) && (r = C(P.createElement(RegExp.$1))), r || (t.replace && (t = t.replace(F, "<$1></$2>")), e === x && (e = D.test(t) && RegExp.$1), e in X || (e = "*"), a = X[e], a.innerHTML = "" + t, r = C.each(N.call(a.childNodes), function () {
            a.removeChild(this)
        })), o(n) && (i = C(r), C.each(n, function (t, e) {
            R.indexOf(t) > -1 ? i[t](e) : i.attr(t, e)
        })), r
    }, W.Z = function (t, e) {
        return t = t || [], t.__proto__ = C.fn, t.selector = e || "", t
    }, W.isZ = function (t) {
        return t instanceof W.Z
    }, W.init = function (t, n) {
        var r;
        if (!t)return W.Z();
        if ("string" == typeof t)if (t = t.trim(), "<" == t[0] && D.test(t))r = W.fragment(t, RegExp.$1, n), t = null; else {
            if (n !== x)return C(n).find(t);
            r = W.qsa(P, t)
        } else {
            if (e(t))return C(P).ready(t);
            if (W.isZ(t))return t;
            if (G(t))r = s(t); else if (i(t))r = [t], t = null; else if (D.test(t))r = W.fragment(t.trim(), RegExp.$1, n), t = null; else {
                if (n !== x)return C(n).find(t);
                r = W.qsa(P, t)
            }
        }
        return W.Z(r, t)
    }, C = function (t, e) {
        return W.init(t, e)
    }, C.extend = function (t) {
        var e, n = N.call(arguments, 1);
        return "boolean" == typeof t && (e = t, t = n.shift()), n.forEach(function (n) {
            d(t, n, e)
        }), t
    }, W.qsa = function (t, e) {
        var n, i = "#" == e[0], o = !i && "." == e[0], a = i || o ? e.slice(1) : e, s = B.test(a);
        return r(t) && s && i ? (n = t.getElementById(a)) ? [n] : [] : 1 !== t.nodeType && 9 !== t.nodeType ? [] : N.call(s && !i ? o ? t.getElementsByClassName(a) : t.getElementsByTagName(e) : t.querySelectorAll(e))
    }, C.contains = P.documentElement.contains ? function (t, e) {
        return t !== e && t.contains(e)
    } : function (t, e) {
        for (; e && (e = e.parentNode);)if (e === t)return !0;
        return !1
    }, C.type = t, C.isFunction = e, C.isWindow = n, C.isArray = G, C.isPlainObject = o, C.isEmptyObject = function (t) {
        var e;
        for (e in t)return !1;
        return !0
    }, C.inArray = function (t, e, n) {
        return j.indexOf.call(e, t, n)
    }, C.camelCase = k, C.trim = function (t) {
        return null == t ? "" : String.prototype.trim.call(t)
    }, C.uuid = 0, C.support = {}, C.expr = {}, C.map = function (t, e) {
        var n, r, i, o = [];
        if (a(t))for (r = 0; r < t.length; r++)n = e(t[r], r), null != n && o.push(n); else for (i in t)n = e(t[i], i), null != n && o.push(n);
        return c(o)
    }, C.each = function (t, e) {
        var n, r;
        if (a(t)) {
            for (n = 0; n < t.length; n++)if (e.call(t[n], n, t[n]) === !1)return t
        } else for (r in t)if (e.call(t[r], r, t[r]) === !1)return t;
        return t
    }, C.grep = function (t, e) {
        return L.call(t, e)
    }, window.JSON && (C.parseJSON = JSON.parse), C.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (t, e) {
        Y["[object " + e + "]"] = e.toLowerCase()
    }), C.fn = {
        forEach: j.forEach,
        reduce: j.reduce,
        push: j.push,
        sort: j.sort,
        indexOf: j.indexOf,
        concat: j.concat,
        map: function (t) {
            return C(C.map(this, function (e, n) {
                return t.call(e, n, e)
            }))
        },
        slice: function () {
            return C(N.apply(this, arguments))
        },
        ready: function (t) {
            return z.test(P.readyState) && P.body ? t(C) : P.addEventListener("DOMContentLoaded", function () {
                t(C)
            }, !1), this
        },
        get: function (t) {
            return t === x ? N.call(this) : this[t >= 0 ? t : t + this.length]
        },
        toArray: function () {
            return this.get()
        },
        size: function () {
            return this.length
        },
        remove: function () {
            return this.each(function () {
                null != this.parentNode && this.parentNode.removeChild(this)
            })
        },
        each: function (t) {
            return j.every.call(this, function (e, n) {
                return t.call(e, n, e) !== !1
            }), this
        },
        filter: function (t) {
            return e(t) ? this.not(this.not(t)) : C(L.call(this, function (e) {
                return W.matches(e, t)
            }))
        },
        add: function (t, e) {
            return C(S(this.concat(C(t, e))))
        },
        is: function (t) {
            return this.length > 0 && W.matches(this[0], t)
        },
        not: function (t) {
            var n = [];
            if (e(t) && t.call !== x)this.each(function (e) {
                t.call(this, e) || n.push(this)
            }); else {
                var r = "string" == typeof t ? this.filter(t) : a(t) && e(t.item) ? N.call(t) : C(t);
                this.forEach(function (t) {
                    r.indexOf(t) < 0 && n.push(t)
                })
            }
            return C(n)
        },
        has: function (t) {
            return this.filter(function () {
                return i(t) ? C.contains(this, t) : C(this).find(t).size()
            })
        },
        eq: function (t) {
            return -1 === t ? this.slice(t) : this.slice(t, +t + 1)
        },
        first: function () {
            var t = this[0];
            return t && !i(t) ? t : C(t)
        },
        last: function () {
            var t = this[this.length - 1];
            return t && !i(t) ? t : C(t)
        },
        find: function (t) {
            var e, n = this;
            return e = t ? "object" == typeof t ? C(t).filter(function () {
                var t = this;
                return j.some.call(n, function (e) {
                    return C.contains(e, t)
                })
            }) : 1 == this.length ? C(W.qsa(this[0], t)) : this.map(function () {
                return W.qsa(this, t)
            }) : []
        },
        closest: function (t, e) {
            var n = this[0], i = !1;
            for ("object" == typeof t && (i = C(t)); n && !(i ? i.indexOf(n) >= 0 : W.matches(n, t));)n = n !== e && !r(n) && n.parentNode;
            return C(n)
        },
        parents: function (t) {
            for (var e = [], n = this; n.length > 0;)n = C.map(n, function (t) {
                return (t = t.parentNode) && !r(t) && e.indexOf(t) < 0 ? (e.push(t), t) : void 0
            });
            return m(e, t)
        },
        parent: function (t) {
            return m(S(this.pluck("parentNode")), t)
        },
        children: function (t) {
            return m(this.map(function () {
                return p(this)
            }), t)
        },
        contents: function () {
            return this.map(function () {
                return N.call(this.childNodes)
            })
        },
        siblings: function (t) {
            return m(this.map(function (t, e) {
                return L.call(p(e.parentNode), function (t) {
                    return t !== e
                })
            }), t)
        },
        empty: function () {
            return this.each(function () {
                this.innerHTML = ""
            })
        },
        pluck: function (t) {
            return C.map(this, function (e) {
                return e[t]
            })
        },
        show: function () {
            return this.each(function () {
                "none" == this.style.display && (this.style.display = ""), "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = h(this.nodeName))
            })
        },
        replaceWith: function (t) {
            return this.before(t).remove()
        },
        wrap: function (t) {
            var n = e(t);
            if (this[0] && !n)var r = C(t).get(0), i = r.parentNode || this.length > 1;
            return this.each(function (e) {
                C(this).wrapAll(n ? t.call(this, e) : i ? r.cloneNode(!0) : r)
            })
        },
        wrapAll: function (t) {
            if (this[0]) {
                C(this[0]).before(t = C(t));
                for (var e; (e = t.children()).length;)t = e.first();
                C(t).append(this)
            }
            return this
        },
        wrapInner: function (t) {
            var n = e(t);
            return this.each(function (e) {
                var r = C(this), i = r.contents(), o = n ? t.call(this, e) : t;
                i.length ? i.wrapAll(o) : r.append(o)
            })
        },
        unwrap: function () {
            return this.parent().each(function () {
                C(this).replaceWith(C(this).children())
            }), this
        },
        clone: function () {
            return this.map(function () {
                return this.cloneNode(!0)
            })
        },
        hide: function () {
            return this.css("display", "none")
        },
        toggle: function (t) {
            return this.each(function () {
                var e = C(this);
                (t === x ? "none" == e.css("display") : t) ? e.show() : e.hide()
            })
        },
        prev: function (t) {
            return C(this.pluck("previousElementSibling")).filter(t || "*")
        },
        next: function (t) {
            return C(this.pluck("nextElementSibling")).filter(t || "*")
        },
        html: function (t) {
            return 0 in arguments ? this.each(function (e) {
                var n = this.innerHTML;
                C(this).empty().append(v(this, t, e, n))
            }) : 0 in this ? this[0].innerHTML : null
        },
        text: function (t) {
            return 0 in arguments ? this.each(function (e) {
                var n = v(this, t, e, this.textContent);
                this.textContent = null == n ? "" : "" + n
            }) : 0 in this ? this[0].textContent : null
        },
        attr: function (t, e) {
            var n;
            return "string" != typeof t || 1 in arguments ? this.each(function (n) {
                if (1 === this.nodeType)if (i(t))for (b in t)g(this, b, t[b]); else g(this, t, v(this, e, n, this.getAttribute(t)))
            }) : this.length && 1 === this[0].nodeType ? !(n = this[0].getAttribute(t)) && t in this[0] ? this[0][t] : n : x
        },
        removeAttr: function (t) {
            return this.each(function () {
                1 === this.nodeType && g(this, t)
            })
        },
        prop: function (t, e) {
            return t = J[t] || t, 1 in arguments ? this.each(function (n) {
                this[t] = v(this, e, n, this[t])
            }) : this[0] && this[0][t]
        },
        data: function (t, e) {
            var n = "data-" + t.replace($, "-$1").toLowerCase(), r = 1 in arguments ? this.attr(n, e) : this.attr(n);
            return null !== r ? E(r) : x
        },
        val: function (t) {
            return 0 in arguments ? this.each(function (e) {
                this.value = v(this, t, e, this.value)
            }) : this[0] && (this[0].multiple ? C(this[0]).find("option").filter(function () {
                return this.selected
            }).pluck("value") : this[0].value)
        },
        offset: function (t) {
            if (t)return this.each(function (e) {
                var n = C(this), r = v(this, t, e, n.offset()), i = n.offsetParent().offset(), o = {
                    top: r.top - i.top,
                    left: r.left - i.left
                };
                "static" == n.css("position") && (o.position = "relative"), n.css(o)
            });
            if (!this.length)return null;
            var e = this[0].getBoundingClientRect();
            return {
                left: e.left + window.pageXOffset,
                top: e.top + window.pageYOffset,
                width: Math.round(e.width),
                height: Math.round(e.height)
            }
        },
        css: function (e, n) {
            if (arguments.length < 2) {
                var r = this[0], i = getComputedStyle(r, "");
                if (!r)return;
                if ("string" == typeof e)return r.style[k(e)] || i.getPropertyValue(e);
                if (G(e)) {
                    var o = {};
                    return C.each(G(e) ? e : [e], function (t, e) {
                        o[e] = r.style[k(e)] || i.getPropertyValue(e)
                    }), o
                }
            }
            var a = "";
            if ("string" == t(e))n || 0 === n ? a = u(e) + ":" + f(e, n) : this.each(function () {
                this.style.removeProperty(u(e))
            }); else for (b in e)e[b] || 0 === e[b] ? a += u(b) + ":" + f(b, e[b]) + ";" : this.each(function () {
                this.style.removeProperty(u(b))
            });
            return this.each(function () {
                this.style.cssText += ";" + a
            })
        },
        index: function (t) {
            return t ? this.indexOf(C(t)[0]) : this.parent().children().indexOf(this[0])
        },
        hasClass: function (t) {
            return t ? j.some.call(this, function (t) {
                return this.test(y(t))
            }, l(t)) : !1
        },
        addClass: function (t) {
            return t ? this.each(function (e) {
                T = [];
                var n = y(this), r = v(this, t, e, n);
                r.split(/\s+/g).forEach(function (t) {
                    C(this).hasClass(t) || T.push(t)
                }, this), T.length && y(this, n + (n ? " " : "") + T.join(" "))
            }) : this
        },
        removeClass: function (t) {
            return this.each(function (e) {
                return t === x ? y(this, "") : (T = y(this), v(this, t, e, T).split(/\s+/g).forEach(function (t) {
                    T = T.replace(l(t), " ")
                }), void y(this, T.trim()))
            })
        },
        toggleClass: function (t, e) {
            return t ? this.each(function (n) {
                var r = C(this), i = v(this, t, n, y(this));
                i.split(/\s+/g).forEach(function (t) {
                    (e === x ? !r.hasClass(t) : e) ? r.addClass(t) : r.removeClass(t)
                })
            }) : this
        },
        scrollTop: function (t) {
            if (this.length) {
                var e = "scrollTop" in this[0];
                return t === x ? e ? this[0].scrollTop : this[0].pageYOffset : this.each(e ? function () {
                    this.scrollTop = t
                } : function () {
                    this.scrollTo(this.scrollX, t)
                })
            }
        },
        scrollLeft: function (t) {
            if (this.length) {
                var e = "scrollLeft" in this[0];
                return t === x ? e ? this[0].scrollLeft : this[0].pageXOffset : this.each(e ? function () {
                    this.scrollLeft = t
                } : function () {
                    this.scrollTo(t, this.scrollY)
                })
            }
        },
        position: function () {
            if (this.length) {
                var t = this[0], e = this.offsetParent(), n = this.offset(), r = Z.test(e[0].nodeName) ? {
                    top: 0,
                    left: 0
                } : e.offset();
                return n.top -= parseFloat(C(t).css("margin-top")) || 0, n.left -= parseFloat(C(t).css("margin-left")) || 0, r.top += parseFloat(C(e[0]).css("border-top-width")) || 0, r.left += parseFloat(C(e[0]).css("border-left-width")) || 0, {
                    top: n.top - r.top,
                    left: n.left - r.left
                }
            }
        },
        offsetParent: function () {
            return this.map(function () {
                for (var t = this.offsetParent || P.body; t && !Z.test(t.nodeName) && "static" == C(t).css("position");)t = t.offsetParent;
                return t
            })
        }
    }, C.fn.detach = C.fn.remove, ["width", "height"].forEach(function (t) {
        var e = t.replace(/./, function (t) {
            return t[0].toUpperCase()
        });
        C.fn[t] = function (i) {
            var o, a = this[0];
            return i === x ? n(a) ? a["inner" + e] : r(a) ? a.documentElement["scroll" + e] : (o = this.offset()) && o[t] : this.each(function (e) {
                a = C(this), a.css(t, v(this, i, e, a[t]()))
            })
        }
    }), I.forEach(function (e, n) {
        var r = n % 2;
        C.fn[e] = function () {
            var e, i, o = C.map(arguments, function (n) {
                return e = t(n), "object" == e || "array" == e || null == n ? n : W.fragment(n)
            }), a = this.length > 1;
            return o.length < 1 ? this : this.each(function (t, e) {
                i = r ? e : e.parentNode, e = 0 == n ? e.nextSibling : 1 == n ? e.firstChild : 2 == n ? e : null;
                var s = C.contains(P.documentElement, i);
                o.forEach(function (t) {
                    if (a)t = t.cloneNode(!0); else if (!i)return C(t).remove();
                    i.insertBefore(t, e), s && w(t, function (t) {
                        null == t.nodeName || "SCRIPT" !== t.nodeName.toUpperCase() || t.type && "text/javascript" !== t.type || t.src || window.eval.call(window, t.innerHTML)
                    })
                })
            })
        }, C.fn[r ? e + "To" : "insert" + (n ? "Before" : "After")] = function (t) {
            return C(t)[e](this), this
        }
    }), W.Z.prototype = C.fn, W.uniq = S, W.deserializeValue = E, C.zepto = W, C
}();
window.Zepto = Zepto, void 0 === window.$ && (window.$ = Zepto), function (t) {
    function e(t) {
        return t._zid || (t._zid = h++)
    }

    function n(t, n, o, a) {
        if (n = r(n), n.ns)var s = i(n.ns);
        return (v[e(t)] || []).filter(function (t) {
            return !(!t || n.e && t.e != n.e || n.ns && !s.test(t.ns) || o && e(t.fn) !== e(o) || a && t.sel != a)
        })
    }

    function r(t) {
        var e = ("" + t).split(".");
        return {e: e[0], ns: e.slice(1).sort().join(" ")}
    }

    function i(t) {
        return new RegExp("(?:^| )" + t.replace(" ", " .* ?") + "(?: |$)")
    }

    function o(t, e) {
        return t.del && !y && t.e in E || !!e
    }

    function a(t) {
        return w[t] || y && E[t] || t
    }

    function s(n, i, s, c, l, h, p) {
        var d = e(n), m = v[d] || (v[d] = []);
        i.split(/\s/).forEach(function (e) {
            if ("ready" == e)return t(document).ready(s);
            var i = r(e);
            i.fn = s, i.sel = l, i.e in w && (s = function (e) {
                var n = e.relatedTarget;
                return !n || n !== this && !t.contains(this, n) ? i.fn.apply(this, arguments) : void 0
            }), i.del = h;
            var d = h || s;
            i.proxy = function (t) {
                if (t = u(t), !t.isImmediatePropagationStopped()) {
                    t.data = c;
                    var e = d.apply(n, t._args == f ? [t] : [t].concat(t._args));
                    return e === !1 && (t.preventDefault(), t.stopPropagation()), e
                }
            }, i.i = m.length, m.push(i), "addEventListener" in n && n.addEventListener(a(i.e), i.proxy, o(i, p))
        })
    }

    function c(t, r, i, s, c) {
        var u = e(t);
        (r || "").split(/\s/).forEach(function (e) {
            n(t, e, i, s).forEach(function (e) {
                delete v[u][e.i], "removeEventListener" in t && t.removeEventListener(a(e.e), e.proxy, o(e, c))
            })
        })
    }

    function u(e, n) {
        return (n || !e.isDefaultPrevented) && (n || (n = e), t.each(T, function (t, r) {
            var i = n[t];
            e[t] = function () {
                return this[r] = x, i && i.apply(n, arguments)
            }, e[r] = b
        }), (n.defaultPrevented !== f ? n.defaultPrevented : "returnValue" in n ? n.returnValue === !1 : n.getPreventDefault && n.getPreventDefault()) && (e.isDefaultPrevented = x)), e
    }

    function l(t) {
        var e, n = {originalEvent: t};
        for (e in t)C.test(e) || t[e] === f || (n[e] = t[e]);
        return u(n, t)
    }

    var f, h = 1, p = Array.prototype.slice, d = t.isFunction, m = function (t) {
        return "string" == typeof t
    }, v = {}, g = {}, y = "onfocusin" in window, E = {
        focus: "focusin",
        blur: "focusout"
    }, w = {mouseenter: "mouseover", mouseleave: "mouseout"};
    g.click = g.mousedown = g.mouseup = g.mousemove = "MouseEvents", t.event = {
        add: s,
        remove: c
    }, t.proxy = function (n, r) {
        var i = 2 in arguments && p.call(arguments, 2);
        if (d(n)) {
            var o = function () {
                return n.apply(r, i ? i.concat(p.call(arguments)) : arguments)
            };
            return o._zid = e(n), o
        }
        if (m(r))return i ? (i.unshift(n[r], n), t.proxy.apply(null, i)) : t.proxy(n[r], n);
        throw new TypeError("expected function")
    }, t.fn.bind = function (t, e, n) {
        return this.on(t, e, n)
    }, t.fn.unbind = function (t, e) {
        return this.off(t, e)
    }, t.fn.one = function (t, e, n, r) {
        return this.on(t, e, n, r, 1)
    };
    var x = function () {
        return !0
    }, b = function () {
        return !1
    }, C = /^([A-Z]|returnValue$|layer[XY]$)/, T = {
        preventDefault: "isDefaultPrevented",
        stopImmediatePropagation: "isImmediatePropagationStopped",
        stopPropagation: "isPropagationStopped"
    };
    t.fn.delegate = function (t, e, n) {
        return this.on(e, t, n)
    }, t.fn.undelegate = function (t, e, n) {
        return this.off(e, t, n)
    }, t.fn.live = function (e, n) {
        return t(document.body).delegate(this.selector, e, n), this
    }, t.fn.die = function (e, n) {
        return t(document.body).undelegate(this.selector, e, n), this
    }, t.fn.on = function (e, n, r, i, o) {
        var a, u, h = this;
        return e && !m(e) ? (t.each(e, function (t, e) {
            h.on(t, n, r, e, o)
        }), h) : (m(n) || d(i) || i === !1 || (i = r, r = n, n = f), (d(r) || r === !1) && (i = r, r = f), i === !1 && (i = b), h.each(function (f, h) {
            o && (a = function (t) {
                return c(h, t.type, i), i.apply(this, arguments)
            }), n && (u = function (e) {
                var r, o = t(e.target).closest(n, h).get(0);
                return o && o !== h ? (r = t.extend(l(e), {
                    currentTarget: o,
                    liveFired: h
                }), (a || i).apply(o, [r].concat(p.call(arguments, 1)))) : void 0
            }), s(h, e, i, r, n, u || a)
        }))
    }, t.fn.off = function (e, n, r) {
        var i = this;
        return e && !m(e) ? (t.each(e, function (t, e) {
            i.off(t, n, e)
        }), i) : (m(n) || d(r) || r === !1 || (r = n, n = f), r === !1 && (r = b), i.each(function () {
            c(this, e, r, n)
        }))
    }, t.fn.trigger = function (e, n) {
        return e = m(e) || t.isPlainObject(e) ? t.Event(e) : u(e), e._args = n, this.each(function () {
            "dispatchEvent" in this ? this.dispatchEvent(e) : t(this).triggerHandler(e, n)
        })
    }, t.fn.triggerHandler = function (e, r) {
        var i, o;
        return this.each(function (a, s) {
            i = l(m(e) ? t.Event(e) : e), i._args = r, i.target = s, t.each(n(s, e.type || e), function (t, e) {
                return o = e.proxy(i), i.isImmediatePropagationStopped() ? !1 : void 0
            })
        }), o
    }, "focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function (e) {
        t.fn[e] = function (t) {
            return t ? this.bind(e, t) : this.trigger(e)
        }
    }), ["focus", "blur"].forEach(function (e) {
        t.fn[e] = function (t) {
            return t ? this.bind(e, t) : this.each(function () {
                try {
                    this[e]()
                } catch (t) {
                }
            }), this
        }
    }), t.Event = function (t, e) {
        m(t) || (e = t, t = e.type);
        var n = document.createEvent(g[t] || "Events"), r = !0;
        if (e)for (var i in e)"bubbles" == i ? r = !!e[i] : n[i] = e[i];
        return n.initEvent(t, r, !0), u(n)
    }
}(Zepto), function (t) {
    function e(e, n, r) {
        var i = t.Event(n);
        return t(e).trigger(i, r), !i.isDefaultPrevented()
    }

    function n(t, n, r, i) {
        return t.global ? e(n || y, r, i) : void 0
    }

    function r(e) {
        e.global && 0 === t.active++ && n(e, null, "ajaxStart")
    }

    function i(e) {
        e.global && !--t.active && n(e, null, "ajaxStop")
    }

    function o(t, e) {
        var r = e.context;
        return e.beforeSend.call(r, t, e) === !1 || n(e, r, "ajaxBeforeSend", [t, e]) === !1 ? !1 : void n(e, r, "ajaxSend", [t, e])
    }

    function a(t, e, r, i) {
        var o = r.context, a = "success";
        r.success.call(o, t, a, e), i && i.resolveWith(o, [t, a, e]), n(r, o, "ajaxSuccess", [e, r, t]), c(a, e, r)
    }

    function s(t, e, r, i, o) {
        var a = i.context;
        i.error.call(a, r, e, t), o && o.rejectWith(a, [r, e, t]), n(i, a, "ajaxError", [r, i, t || e]), c(e, r, i)
    }

    function c(t, e, r) {
        var o = r.context;
        r.complete.call(o, e, t), n(r, o, "ajaxComplete", [e, r]), i(r)
    }

    function u() {
    }

    function l(t) {
        return t && (t = t.split(";", 2)[0]), t && (t == C ? "html" : t == b ? "json" : w.test(t) ? "script" : x.test(t) && "xml") || "text"
    }

    function f(t, e) {
        return "" == e ? t : (t + "&" + e).replace(/[&?]{1,2}/, "?")
    }

    function h(e) {
        e.processData && e.data && "string" != t.type(e.data) && (e.data = t.param(e.data, e.traditional)), !e.data || e.type && "GET" != e.type.toUpperCase() || (e.url = f(e.url, e.data), e.data = void 0)
    }

    function p(e, n, r, i) {
        return t.isFunction(n) && (i = r, r = n, n = void 0), t.isFunction(r) || (i = r, r = void 0), {
            url: e,
            data: n,
            success: r,
            dataType: i
        }
    }

    function d(e, n, r, i) {
        var o, a = t.isArray(n), s = t.isPlainObject(n);
        t.each(n, function (n, c) {
            o = t.type(c), i && (n = r ? i : i + "[" + (s || "object" == o || "array" == o ? n : "") + "]"), !i && a ? e.add(c.name, c.value) : "array" == o || !r && "object" == o ? d(e, c, r, n) : e.add(n, c)
        })
    }

    var m, v, g = 0, y = window.document, E = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, w = /^(?:text|application)\/javascript/i, x = /^(?:text|application)\/xml/i, b = "application/json", C = "text/html", T = /^\s*$/;
    t.active = 0, t.ajaxJSONP = function (e, n) {
        if (!("type" in e))return t.ajax(e);
        var r, i, c = e.jsonpCallback, u = (t.isFunction(c) ? c() : c) || "jsonp" + ++g, l = y.createElement("script"), f = window[u], h = function (e) {
            t(l).triggerHandler("error", e || "abort")
        }, p = {abort: h};
        return n && n.promise(p), t(l).on("load error", function (o, c) {
            clearTimeout(i), t(l).off().remove(), "error" != o.type && r ? a(r[0], p, e, n) : s(null, c || "error", p, e, n), window[u] = f, r && t.isFunction(f) && f(r[0]), f = r = void 0
        }), o(p, e) === !1 ? (h("abort"), p) : (window[u] = function () {
            r = arguments
        }, l.src = e.url.replace(/\?(.+)=\?/, "?$1=" + u), y.head.appendChild(l), e.timeout > 0 && (i = setTimeout(function () {
            h("timeout")
        }, e.timeout)), p)
    }, t.ajaxSettings = {
        type: "GET",
        beforeSend: u,
        success: u,
        error: u,
        complete: u,
        context: null,
        global: !0,
        xhr: function () {
            return new window.XMLHttpRequest
        },
        accepts: {
            script: "text/javascript, application/javascript, application/x-javascript",
            json: b,
            xml: "application/xml, text/xml",
            html: C,
            text: "text/plain"
        },
        crossDomain: !1,
        timeout: 0,
        processData: !0,
        cache: !0
    }, t.ajax = function (e) {
        var n = t.extend({}, e || {}), i = t.Deferred && t.Deferred();
        for (m in t.ajaxSettings)void 0 === n[m] && (n[m] = t.ajaxSettings[m]);
        r(n), n.crossDomain || (n.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(n.url) && RegExp.$2 != window.location.host), n.url || (n.url = window.location.toString()), h(n);
        var c = n.dataType, p = /\?.+=\?/.test(n.url);
        if (p && (c = "jsonp"), n.cache !== !1 && (e && e.cache === !0 || "script" != c && "jsonp" != c) || (n.url = f(n.url, "_=" + Date.now())), "jsonp" == c)return p || (n.url = f(n.url, n.jsonp ? n.jsonp + "=?" : n.jsonp === !1 ? "" : "callback=?")), t.ajaxJSONP(n, i);
        var d, g = n.accepts[c], y = {}, E = function (t, e) {
            y[t.toLowerCase()] = [t, e]
        }, w = /^([\w-]+:)\/\//.test(n.url) ? RegExp.$1 : window.location.protocol, x = n.xhr(), b = x.setRequestHeader;
        if (i && i.promise(x), n.crossDomain || E("X-Requested-With", "XMLHttpRequest"), E("Accept", g || "*/*"), (g = n.mimeType || g) && (g.indexOf(",") > -1 && (g = g.split(",", 2)[0]), x.overrideMimeType && x.overrideMimeType(g)), (n.contentType || n.contentType !== !1 && n.data && "GET" != n.type.toUpperCase()) && E("Content-Type", n.contentType || "application/x-www-form-urlencoded"), n.headers)for (v in n.headers)E(v, n.headers[v]);
        if (x.setRequestHeader = E, x.onreadystatechange = function () {
                if (4 == x.readyState) {
                    x.onreadystatechange = u, clearTimeout(d);
                    var e, r = !1;
                    if (x.status >= 200 && x.status < 300 || 304 == x.status || 0 == x.status && "file:" == w) {
                        c = c || l(n.mimeType || x.getResponseHeader("content-type")), e = x.responseText;
                        try {
                            "script" == c ? (1, eval)(e) : "xml" == c ? e = x.responseXML : "json" == c && (e = T.test(e) ? null : t.parseJSON(e))
                        } catch (o) {
                            r = o
                        }
                        r ? s(r, "parsererror", x, n, i) : a(e, x, n, i)
                    } else s(x.statusText || null, x.status ? "error" : "abort", x, n, i)
                }
            }, o(x, n) === !1)return x.abort(), s(null, "abort", x, n, i), x;
        if (n.xhrFields)for (v in n.xhrFields)x[v] = n.xhrFields[v];
        var C = "async" in n ? n.async : !0;
        x.open(n.type, n.url, C, n.username, n.password);
        for (v in y)b.apply(x, y[v]);
        return n.timeout > 0 && (d = setTimeout(function () {
            x.onreadystatechange = u, x.abort(), s(null, "timeout", x, n, i)
        }, n.timeout)), x.send(n.data ? n.data : null), x
    }, t.get = function () {
        return t.ajax(p.apply(null, arguments))
    }, t.post = function () {
        var e = p.apply(null, arguments);
        return e.type = "POST", t.ajax(e)
    }, t.getJSON = function () {
        var e = p.apply(null, arguments);
        return e.dataType = "json", t.ajax(e)
    }, t.fn.load = function (e, n, r) {
        if (!this.length)return this;
        var i, o = this, a = e.split(/\s/), s = p(e, n, r), c = s.success;
        return a.length > 1 && (s.url = a[0], i = a[1]), s.success = function (e) {
            o.html(i ? t("<div>").html(e.replace(E, "")).find(i) : e),
            c && c.apply(o, arguments)
        }, t.ajax(s), this
    };
    var k = encodeURIComponent;
    t.param = function (t, e) {
        var n = [];
        return n.add = function (t, e) {
            this.push(k(t) + "=" + k(e))
        }, d(n, t, e), n.join("&").replace(/%20/g, "+")
    }
}(Zepto), function (t) {
    t.fn.serializeArray = function () {
        var e, n = [];
        return t([].slice.call(this.get(0).elements)).each(function () {
            e = t(this);
            var r = e.attr("type");
            "fieldset" != this.nodeName.toLowerCase() && !this.disabled && "submit" != r && "reset" != r && "button" != r && ("radio" != r && "checkbox" != r || this.checked) && n.push({
                name: e.attr("name"),
                value: e.val()
            })
        }), n
    }, t.fn.serialize = function () {
        var t = [];
        return this.serializeArray().forEach(function (e) {
            t.push(encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value))
        }), t.join("&")
    }, t.fn.submit = function (e) {
        if (e)this.bind("submit", e); else if (this.length) {
            var n = t.Event("submit");
            this.eq(0).trigger(n), n.isDefaultPrevented() || this.get(0).submit()
        }
        return this
    }
}(Zepto), function (t) {
    "__proto__" in {} || t.extend(t.zepto, {
        Z: function (e, n) {
            return e = e || [], t.extend(e, t.fn), e.selector = n || "", e.__Z = !0, e
        }, isZ: function (e) {
            return "array" === t.type(e) && "__Z" in e
        }
    });
    try {
        getComputedStyle(void 0)
    } catch (e) {
        var n = getComputedStyle;
        window.getComputedStyle = function (t) {
            try {
                return n(t)
            } catch (e) {
                return null
            }
        }
    }
}(Zepto);