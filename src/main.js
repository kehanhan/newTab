const engineList = new Map([
  ["google", "https://google.com/search?q="],
  ["baidu", "https://www.baidu.com/s?tn=44004473_18_oem_dg&ie=utf-8&wd="],
  ["mdn", "https://developer.mozilla.org/zh-CN/search?q="],
]);
const sites = JSON.parse(localStorage.getItem("sites"));
let engine = localStorage.getItem("engine") || "google";
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

const setEngine = (engine) => {
  const new_src = `https://kehanhan.github.io/newTab/src/images/${engine}.png`;
  $(".select_btn > img").attr("src", new_src);
};
const urlToName = (url) => {
  return url
    .replace("https://", "")
    .replace("www.", "")
    .replace(/\/.*/, "")
    .replace(/\.org/, "")
    .replace(/\.com/, "")
    .replace(/\.cn/, "");
};
const newSite = (name, logo, url) => {
  $(`<li class="site">
  <a href="${url}">
      <div class="site_icon">${logo}</div>
  </a>
  <div class="site_name" title=${name} >${name}</div>
  <div class="remove_site">
    <svg class="icon">
        <use xlink:href="#icon-delete"></use>
    </svg>
  </div>
</li>`).insertBefore($(".last"));
};
const initSites = () => {
  for (let i = 0; i < siteList.length; i++) {
    newSite(siteList[i].name, siteList[i].logo, siteList[i].url);
  }
};
setEngine(engine);
initSites();

const addSite = () => {
  let url = window.prompt("请输入网站地址：");
  if (url) {
    if (url.indexOf("http") !== 0) {
      url = "https://" + url;
    }
    siteName = urlToName(url);
    siteLogo = siteName[0];
    siteList.push({
      logo: siteLogo,
      name: siteName,
      url: url,
    });
    newSite(siteName, siteLogo, url);
  }
};
const removeSite = (e) => {
  console.log();
  e.stopPropagation();
  const index = $(e.currentTarget).parent().index();
  $(e.currentTarget).parent().remove();
  siteList.splice(index, 1);
};
const sitePointer = (e) => {
  for (let i = 0; i < siteList.length; i++) {
    if (siteList[i].logo.toLowerCase() === e.key) {
      window.open(siteList[i].url);
    }
  }
};
const search = (e) => {
  e.preventDefault();
  const inputVal = $(".search_box > input").val();
  !inputVal || window.open(engineList.get(engine) + inputVal);
};
const toggleEngines = function () {
  $(".card").toggleClass("show");
};
const switchEngine = function (e) {
  e.preventDefault();
  engine = this.name;
  localStorage.setItem("engine", engine);
  const new_src = `https://kehanhan.github.io/newTab/src/images/${engine}.png`;
  $(".select_btn > img").attr("src", new_src);
  toggleEngines();
};
const enterSearch = (e) => {
  e.key === "Enter" && $(".search_btn").trigger("click");
};

window.onpagehide = () => {
  let localList = JSON.stringify(siteList);
  localStorage.setItem("sites", localList);
};
$(document).on("keypress", sitePointer);
$(".search_box > input").focus(() => {
  $(document).off("keypress", sitePointer);
  $(document).on("keypress", enterSearch);
});
$(".search_box > input").blur(() => $(document).on("keypress", sitePointer));
$(".select_btn").click(toggleEngines);
$(".search_btn").click(search);
$(".switch_btn").click(switchEngine);
$(".add_site").on("click", addSite);
$(".site").on("click", ".remove_site", removeSite);
