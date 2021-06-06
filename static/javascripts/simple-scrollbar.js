(function (n, t) {
  function u(n) {
    n.hasOwnProperty("data-simple-scrollbar") ||
      Object.defineProperty(n, "data-simple-scrollbar", new SimpleScrollbar(n));
  }
  function e(n, i) {
    function f(n) {
      var t = n.pageY - u;
      u = n.pageY;
      r(function () {
        i.el.scrollTop += t / i.scrollRatio;
      });
    }
    function e() {
      n.classList.remove("ss-grabbed");
      t.body.classList.remove("ss-grabbed");
      t.removeEventListener("mousemove", f);
      t.removeEventListener("mouseup", e);
    }
    var u;
    n.addEventListener("mousedown", function (i) {
      return (
        (u = i.pageY),
        n.classList.add("ss-grabbed"),
        t.body.classList.add("ss-grabbed"),
        t.addEventListener("mousemove", f),
        t.addEventListener("mouseup", e),
        !1
      );
    });
  }
  function i(n) {
    for (
      this.target = n,
        this.bar = '<div class="ss-scroll">',
        this.wrapper = t.createElement("div"),
        this.wrapper.setAttribute("class", "ss-wrapper"),
        this.el = t.createElement("div"),
        this.el.setAttribute("class", "ss-content"),
        this.wrapper.appendChild(this.el);
      this.target.firstChild;

    )
      this.el.appendChild(this.target.firstChild);
    this.target.appendChild(this.wrapper);
    this.target.insertAdjacentHTML("beforeend", this.bar);
    this.bar = this.target.lastChild;
    e(this.bar, this);
    this.moveBar();
    this.el.addEventListener("scroll", this.moveBar.bind(this));
    this.el.addEventListener("mouseenter", this.moveBar.bind(this));
    this.target.classList.add("ss-container");
  }
  function f() {
    for (
      var i = t.querySelectorAll("*[ss-container]"), n = 0;
      n < i.length;
      n++
    )
      u(i[n]);
  }
  var r =
    n.requestAnimationFrame ||
    n.setImmediate ||
    function (n) {
      return setTimeout(n, 0);
    };
  i.prototype = {
    moveBar: function () {
      var t = this.el.scrollHeight,
        i = this.el.clientHeight,
        n = this;
      this.scrollRatio = i / t;
      r(function () {
        n.bar.style.cssText =
          "height:" +
          (i / t) * 100 +
          "%; top:" +
          (n.el.scrollTop / t) * 100 +
          "%;right:-" +
          (n.target.clientWidth - n.bar.clientWidth) +
          "px;";
      });
    },
  };
  t.addEventListener("DOMContentLoaded", f);
  i.initEl = u;
  i.initAll = f;
  n.SimpleScrollbar = i;
})(window, document);
