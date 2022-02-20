// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"epB2":[function(require,module,exports) {
var data = JSON.parse(localStorage.getItem("data"));
var hashMap = data || [{ logo: "A", name: "Apple", url: "https://www.apple.com.cn/" }, { logo: "B", name: "bilibili", url: "https://bilibili.com" }, { logo: "C", name: "css-tricks", url: "https://css-tricks.com/" }, { logo: "D", name: "DeepL翻译", url: "https://www.deepl.com/zh/translator" }, {
  logo: "E",
  name: "Element-UI",
  url: "http://element-cn.eleme.io/#/zh-CN/component/installation"
}, {
  logo: "F",
  name: "Figma",
  url: "https://www.figma.com/"
}, {
  logo: "G",
  name: "Github",
  url: "https://github.com/"
}, {
  logo: "H",
  name: "Highcharts",
  url: "https://www.highcharts.com.cn/"
}, {
  logo: "I",
  name: "Iconfont",
  url: "https://www.iconfont.cn/"
}, {
  logo: "J",
  name: "jQuery",
  url: "https://jquery.com/"
}, {
  logo: "K",
  name: "快递100",
  url: "https://kuaidi100.com"
}, {
  logo: "L",
  name: "LeetCode",
  url: "https://leetcode-cn.com/"
}, {
  logo: "M",
  name: "MDN",
  url: "https://developer.mozilla.org/zh-CN/docs/Learn"
}];
var urlToName = function urlToName(url) {
  return url.replace("https://", "").replace("www.", "").replace(/\/.*/, "").replace(/\.org/, "").replace(/\.com/, "").replace(/\.cn/, "");
};
window.onbeforeunload = function () {
  var localList = JSON.stringify(hashMap);
  localStorage.setItem("data", localList);
};
var render = function render() {
  $(".appList").find("li:not(.last)").remove();
  hashMap.forEach(function (node, index) {
    var $li = $("<li class=\"app\">\n          <a href=\"" + node.url + "\">\n              <div class=\"app_icon\">" + node.logo + "</div>\n          </a>\n          <div class=\"app_name\">" + node.name + "</div>\n          <div class=\"delete_app\">\n            <svg class=\"icon\">\n                <use xlink:href=\"#icon-delete\"></use>\n            </svg>\n          </div>\n        </li>").insertBefore($(".last"));
    $(".app").on("click", ".delete_app", function () {
      hashMap.splice(index, 1);
      render();
    });
  });
};
render();

$(".add").on("click", function () {
  var url = window.prompt("请输入网站地址：");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  hashMap.push({
    logo: urlToName(url)[0],
    name: urlToName(url),
    url: url
  });
  render();
});

$(".search_box > input").focus(function () {
  $(document).off("keypress");
});

$(".search_box > input").blur(function () {
  $(document).on("keypress", function (e) {
    for (var i = 0; i < hashMap.length; i++) {
      if (hashMap[i].logo.toLowerCase() === e.key) {
        window.open(hashMap[i].url);
      }
    }
  });
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.b096a047.map