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
var engines = new Map([["google", "https://google.com/search?q="], ["baidu", "https://www.baidu.com/s?tn=44004473_18_oem_dg&ie=utf-8&wd="], ["mdn", "https://developer.mozilla.org/zh-CN/search?q="]]);
var engine = localStorage.getItem("engine") || "google";

var switchEngine = function switchEngine(engine) {
  var new_src = "./images/".concat(engine, ".png");
  $(".select_button > img").attr("src", new_src);
};

switchEngine(engine);
var sites = JSON.parse(localStorage.getItem("sites"));
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

var urlToName = function urlToName(url) {
  return url.replace("https://", "").replace("www.", "").replace(/\/.*/, "").replace(/\.org/, "").replace(/\.com/, "").replace(/\.cn/, "");
};

var render = function render() {
  $(".appList").find("li:not(.last)").remove();
  siteList.forEach(function (node, index) {
    var $li = $("<li class=\"app\">\n          <a href=\"".concat(node.url, "\">\n              <div class=\"app_icon\">").concat(node.logo, "</div>\n          </a>\n          <div class=\"app_name\" title=").concat(node.name, " >").concat(node.name, "</div>\n          <div class=\"delete_app\">\n            <svg class=\"icon\">\n                <use xlink:href=\"#icon-delete\"></use>\n            </svg>\n          </div>\n        </li>")).insertBefore($(".last")); // $(".app").on("click", ".delete_app", () => {
    //   siteList.splice(index, 1);
    //   render();
    // });
  });
};

render();

var addUrl = function addUrl() {
  var url = window.prompt("请输入网站地址：");

  if (url) {
    if (url.indexOf("http") !== 0) {
      url = "https://" + url;
    }

    siteList.push({
      logo: urlToName(url)[0],
      name: urlToName(url),
      url: url
    });
    render();
  }
};

var keyToSite = function keyToSite(e) {
  for (var i = 0; i < siteList.length; i++) {
    if (siteList[i].logo.toLowerCase() === e.key) {
      window.open(siteList[i].url);
    }
  }
};

var search = function search(e) {
  e.preventDefault();
  var inputVal = $(".search_box > input").val();
  !inputVal || window.open(engines.get(engine) + inputVal);
};

window.onpagehide = function () {
  var localList = JSON.stringify(siteList);
  localStorage.setItem("sites", localList);
};

$(".add").on("click", addUrl);
$(".search_box > input").focus(function () {
  $(document).off("keypress", keyToSite);
  $(document).on("keypress", function (e) {
    if (e.key === "Enter") {
      $(".search_button").trigger("click");
    }
  });
});
$(document).on("keypress", keyToSite);
$(".select_button").click(function (e) {
  e.preventDefault();
  $(".card").toggleClass("show");
});
$(".search_button").click(search);
$(".switch_btn").click(function (e) {
  e.preventDefault();
  engine = this.name;
  localStorage.setItem("engine", engine);
  var new_src = "./images/".concat(engine, ".png");
  $(".select_button > img").attr("src", new_src);
  $(".card").toggleClass("show");
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.2509cd1b.js.map