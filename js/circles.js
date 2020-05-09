! function(a, b) {
    "object" == typeof exports ? module.exports = b() : "function" == typeof define && define.amd ? define([], b) : a.Circles = b()
}(this, function() {
    "use strict";
    var a = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a) {
            setTimeout(a, 1e3 / 60)
        },
        b = function(a) {
            var b = a.id;
            if (this._el = document.getElementById(b), null !== this._el) {
                this._radius = a.radius || 10, this._duration = void 0 === a.duration ? 500 : a.duration, this._value = 1e-7, this._maxValue = a.maxValue || 100, this._text = void 0 === a.text ? function(a) {
                    return this.htmlifyNumber(a)
                } : a.text, this._strokeWidth = a.width || 10, this._colors = a.colors || ["#EEE", "#F00"], this._svg = null, this._movingPath = null, this._wrapContainer = null, this._textContainer = null, this._wrpClass = a.wrpClass || "circles-wrp", this._textClass = a.textClass || "circles-text", this._valClass = a.valueStrokeClass || "circles-valueStroke", this._maxValClass = a.maxValueStrokeClass || "circles-maxValueStroke", this._styleWrapper = !1 !== a.styleWrapper, this._styleText = !1 !== a.styleText;
                var c = Math.PI / 180 * 270;
                this._start = -Math.PI / 180 * 90, this._startPrecise = this._precise(this._start), this._circ = c - this._start, this._generate().update(a.value || 0)
            }
        };
    return b.prototype = {
        VERSION: "0.0.6",
        _generate: function() {
            return this._svgSize = 2 * this._radius, this._radiusAdjusted = this._radius - this._strokeWidth / 2, this._generateSvg()._generateText()._generateWrapper(), this._el.innerHTML = "", this._el.appendChild(this._wrapContainer), this
        },
        _setPercentage: function(a) {
            this._movingPath.setAttribute("d", this._calculatePath(a, !0)), this._textContainer.innerHTML = this._getText(this.getValueFromPercent(a))
        },
        _generateWrapper: function() {
            return this._wrapContainer = document.createElement("div"), this._wrapContainer.className = this._wrpClass, this._styleWrapper && (this._wrapContainer.style.position = "relative", this._wrapContainer.style.display = "inline-block"), this._wrapContainer.appendChild(this._svg), this._wrapContainer.appendChild(this._textContainer), this
        },
        _generateText: function() {
            if (this._textContainer = document.createElement("div"), this._textContainer.className = this._textClass, this._styleText) {
                var a = {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    textAlign: "center",
                    width: "100%",
                    fontSize: .7 * this._radius + "px",
                    height: this._svgSize + "px",
                    lineHeight: this._svgSize + "px"
                };
                for (var b in a) this._textContainer.style[b] = a[b]
            }
            return this._textContainer.innerHTML = this._getText(0), this
        },
        _getText: function(a) {
            return this._text ? (void 0 === a && (a = this._value), a = parseFloat(a.toFixed(2)), "function" == typeof this._text ? this._text.call(this, a) : this._text) : ""
        },
        _generateSvg: function() {
            return this._svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"), this._svg.setAttribute("xmlns", "http://www.w3.org/2000/svg"), this._svg.setAttribute("width", this._svgSize), this._svg.setAttribute("height", this._svgSize), this._generatePath(100, !1, this._colors[0], this._maxValClass)._generatePath(1, !0, this._colors[1], this._valClass), this._movingPath = this._svg.getElementsByTagName("path")[1], this
        },
        _generatePath: function(a, b, c, d) {
            var e = document.createElementNS("http://www.w3.org/2000/svg", "path");
            return e.setAttribute("fill", "transparent"), e.setAttribute("stroke", c), e.setAttribute("stroke-width", this._strokeWidth), e.setAttribute("d", this._calculatePath(a, b)), e.setAttribute("class", d), this._svg.appendChild(e), this
        },
        _calculatePath: function(a, b) {
            var c = this._start + a / 100 * this._circ,
                d = this._precise(c);
            return this._arc(d, b)
        },
        _arc: function(a, b) {
            var c = a - .001,
                d = a - this._startPrecise < Math.PI ? 0 : 1;
            return ["M", this._radius + this._radiusAdjusted * Math.cos(this._startPrecise), this._radius + this._radiusAdjusted * Math.sin(this._startPrecise), "A", this._radiusAdjusted, this._radiusAdjusted, 0, d, 1, this._radius + this._radiusAdjusted * Math.cos(c), this._radius + this._radiusAdjusted * Math.sin(c), b ? "" : "Z"].join(" ")
        },
        _precise: function(a) {
            return Math.round(1e3 * a) / 1e3
        },
        htmlifyNumber: function(a, b, c) {
            b = b || "circles-integer", c = c || "circles-decimals";
            var d = (a + "").split("."),
                e = '<span class="' + b + '">' + d[0] + "</span>";
            return d.length > 1 && (e += '.<span class="' + c + '">' + d[1].substring(0, 2) + "</span>"), e
        },
        updateRadius: function(a) {
            return this._radius = a, this._generate().update(!0)
        },
        updateWidth: function(a) {
            return this._strokeWidth = a, this._generate().update(!0)
        },
        updateColors: function(a) {
            this._colors = a;
            var b = this._svg.getElementsByTagName("path");
            return b[0].setAttribute("stroke", a[0]), b[1].setAttribute("stroke", a[1]), this
        },
        getPercent: function() {
            return 100 * this._value / this._maxValue
        },
        getValueFromPercent: function(a) {
            return this._maxValue * a / 100
        },
        getValue: function() {
            return this._value
        },
        getMaxValue: function() {
            return this._maxValue
        },
        update: function(b, c) {
            if (!0 === b) return this._setPercentage(this.getPercent()), this;
            if (this._value == b || isNaN(b)) return this;
            void 0 === c && (c = this._duration);
            var d, e, f, g, h = this,
                i = h.getPercent(),
                j = 1;
            return this._value = Math.min(this._maxValue, Math.max(0, b)), c ? (d = h.getPercent(), e = d > i, j += d % 1, f = Math.floor(Math.abs(d - i) / j), g = c / f, function b(c) {
                if (e ? i += j : i -= j, e && i >= d || !e && i <= d) return void a(function() {
                    h._setPercentage(d)
                });
                a(function() {
                    h._setPercentage(i)
                });
                var f = Date.now(),
                    k = f - c;
                k >= g ? b(f) : setTimeout(function() {
                    b(Date.now())
                }, g - k)
            }(Date.now()), this) : (this._setPercentage(this.getPercent()), this)
        }
    }, b.create = function(a) {
        return new b(a)
    }, b
});
