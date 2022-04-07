// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
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
      localRequire.cache = {};

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

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
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
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var engineList = new Map([["google", "https://google.com/search?q="], ["baidu", "https://www.baidu.com/s?wd="], ["mdn", "https://developer.mozilla.org/zh-CN/search?q="], ["github", "https://github.com/search?q="], ["iconfont", "https://www.iconfont.cn/search/index?searchType=icon&q="]]);
var sites = JSON.parse(localStorage.getItem("sites"));
var engine = localStorage.getItem("engine") || "google";
var siteList = sites || [{
  logo: "A",
  name: "Apple",
  url: "https://www.apple.com.cn/"
}, {
  logo: "B",
  name: "bilibili",
  url: "https://bilibili.com"
}, {
  logo: "C",
  name: "css-tricks",
  url: "https://css-tricks.com/"
}, {
  logo: "D",
  name: "DeepL翻译",
  url: "https://www.deepl.com/zh/translator"
}, {
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

var setEngine = function setEngine(engine) {
  var new_src = "https://kehanhan.github.io/newTab/src/images/".concat(engine, ".png");
  $(".select_btn > img").attr("src", new_src);
};

var urlToName = function urlToName(url) {
  return url.replace("https://", "").replace("www.", "").replace(/\/.*/, "").replace(/\.org/, "").replace(/\.com/, "").replace(/\.cn/, "");
};

var removeSite = function removeSite(e) {
  e.stopImmediatePropagation();
  var index = $(e.currentTarget).parent().index();
  $(e.currentTarget).parent().remove();
  siteList.splice(index, 1);
};

var newSite = function newSite(name, logo, url) {
  $("<li class=\"site\">\n  <a href=\"".concat(url, "\">\n      <div class=\"site_icon\">").concat(logo, "</div>\n  </a>\n  <div class=\"site_name\" title=").concat(name, " >").concat(name, "</div>\n  <div class=\"remove_site\">\n    <svg class=\"icon\">\n        <use xlink:href=\"#icon-delete\"></use>\n    </svg>\n  </div>\n</li>")).insertBefore($(".last"));
  $(".site").on("click", ".remove_site", removeSite);
};

var initSites = function initSites() {
  for (var i = 0; i < siteList.length; i++) {
    newSite(siteList[i].name, siteList[i].logo, siteList[i].url);
  }
};

setEngine(engine);
initSites();

var addSite = function addSite() {
  var url = window.prompt("请输入网站地址：");

  if (url) {
    if (url.indexOf("http") !== 0) {
      url = "https://" + url;
    }

    siteName = urlToName(url);
    siteLogo = siteName[0];
    siteList.push({
      logo: siteLogo,
      name: siteName,
      url: url
    });
    newSite(siteName, siteLogo, url);
  }
};

var sitePointer = function sitePointer(e) {
  for (var i = 0; i < siteList.length; i++) {
    if (siteList[i].logo.toLowerCase() === e.key) {
      window.open(siteList[i].url);
    }
  }
};

var search = function search(e) {
  e.preventDefault();
  var inputVal = $(".search_box > input").val();
  !inputVal || window.open(engineList.get(engine) + inputVal);
};

var toggleEngines = function toggleEngines() {
  $(".card").toggleClass("show");
};

var switchEngine = function switchEngine(e) {
  e.preventDefault();
  engine = this.name;
  localStorage.setItem("engine", engine);
  var new_src = "https://kehanhan.github.io/newTab/src/images/".concat(engine, ".png");
  $(".select_btn > img").attr("src", new_src);
  toggleEngines();
};

var enterSearch = function enterSearch(e) {
  e.key === "Enter" && $(".search_btn").trigger("click");
};

window.onpagehide = function () {
  var localList = JSON.stringify(siteList);
  localStorage.setItem("sites", localList);
};

$(document).on("keypress", sitePointer);
$(".search_box > input").focus(function () {
  $(document).off("keypress", sitePointer);
  $(document).on("keypress", enterSearch);
});
$(".search_box > input").blur(function () {
  return $(document).on("keypress", sitePointer);
});
$(".select_btn").click(toggleEngines);
$(".search_btn").click(search);
$(".switch_btn").click(switchEngine);
$(".add_site").on("click", addSite);
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.067cef6a.js.map