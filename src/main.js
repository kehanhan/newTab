const engines = new Map([
  ["google", "https://google.com/search?q="],
  ["baidu", "https://www.baidu.com/s?tn=44004473_18_oem_dg&ie=utf-8&wd="],
  ["mdn", "https://developer.mozilla.org/zh-CN/search?q="],
]);
let engine = localStorage.getItem("engine") || "google";
const switchEngine = (engine) => {
  const new_src = `./images/${engine}.png`;
  $(".select_button > img").attr("src", new_src);
};
switchEngine(engine);
const sites = JSON.parse(localStorage.getItem("sites"));
let siteList = sites || [
  { logo: "A", name: "Apple", url: "https://www.apple.com.cn/" },
  { logo: "B", name: "bilibili", url: "https://bilibili.com" },
  { logo: "C", name: "css-tricks", url: "https://css-tricks.com/" },
  { logo: "D", name: "DeepL翻译", url: "https://www.deepl.com/zh/translator" },
  {
    logo: "E",
    name: "Element-UI",
    url: "http://element-cn.eleme.io/#/zh-CN/component/installation",
  },
  {
    logo: "F",
    name: "Figma",
    url: "https://www.figma.com/",
  },
  {
    logo: "G",
    name: "Github",
    url: "https://github.com/",
  },
  {
    logo: "H",
    name: "Highcharts",
    url: "https://www.highcharts.com.cn/",
  },
  {
    logo: "I",
    name: "Iconfont",
    url: "https://www.iconfont.cn/",
  },
  {
    logo: "J",
    name: "jQuery",
    url: "https://jquery.com/",
  },
  {
    logo: "K",
    name: "快递100",
    url: "https://kuaidi100.com",
  },
  {
    logo: "L",
    name: "LeetCode",
    url: "https://leetcode-cn.com/",
  },
  {
    logo: "M",
    name: "MDN",
    url: "https://developer.mozilla.org/zh-CN/docs/Learn",
  },
];

const urlToName = (url) => {
  return url
    .replace("https://", "")
    .replace("www.", "")
    .replace(/\/.*/, "")
    .replace(/\.org/, "")
    .replace(/\.com/, "")
    .replace(/\.cn/, "");
};

const render = () => {
  $(".appList").find("li:not(.last)").remove();
  siteList.forEach((node, index) => {
    const $li = $(`<li class="app">
          <a href="${node.url}">
              <div class="app_icon">${node.logo}</div>
          </a>
          <div class="app_name" title=${node.name} >${node.name}</div>
          <div class="delete_app">
            <svg class="icon">
                <use xlink:href="#icon-delete"></use>
            </svg>
          </div>
        </li>`).insertBefore($(".last"));
    // $(".app").on("click", ".delete_app", () => {
    //   siteList.splice(index, 1);
    //   render();
    // });
  });
};
render();

const addUrl = () => {
  let url = window.prompt("请输入网站地址：");
  if (url) {
    if (url.indexOf("http") !== 0) {
      url = "https://" + url;
    }
    siteList.push({
      logo: urlToName(url)[0],
      name: urlToName(url),
      url: url,
    });
    render();
  }
};
const keyToSite = (e) => {
  for (let i = 0; i < siteList.length; i++) {
    if (siteList[i].logo.toLowerCase() === e.key) {
      window.open(siteList[i].url);
    }
  }
};
const search = function (e) {
  e.preventDefault();
  const inputVal = $(".search_box > input").val();
  !inputVal || window.open(engines.get(engine) + inputVal);
};

window.onpagehide = () => {
  let localList = JSON.stringify(siteList);
  localStorage.setItem("sites", localList);
};

$(".add").on("click", addUrl);

$(".search_box > input").focus(() => {
  $(document).off("keypress", keyToSite);
  $(document).on("keypress", (e) => {
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
  const new_src = `./images/${engine}.png`;
  $(".select_button > img").attr("src", new_src);
  $(".card").toggleClass("show");
});
