const data = JSON.parse(localStorage.getItem("data"));
let hashMap = data || [
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
window.onpagehide = () => {
  let localList = JSON.stringify(hashMap);
  localStorage.setItem("data", localList);
};
const render = () => {
  $(".appList").find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
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
    $(".app").on("click", ".delete_app", () => {
      hashMap.splice(index, 1);
      render();
    });
  });
};
render();

$(".add").on("click", () => {
  let url = window.prompt("请输入网站地址：");
  if (url) {
    if (url.indexOf("http") !== 0) {
      url = "https://" + url;
    }
    hashMap.push({
      logo: urlToName(url)[0],
      name: urlToName(url),
      url: url,
    });
    render();
  }
});

$(".search_box > input").focus(() => {
  $(document).off("keypress");
});

$(".search_box > input").blur(() => {
  $(document).on("keypress", (e) => {
    for (let i = 0; i < hashMap.length; i++) {
      if (hashMap[i].logo.toLowerCase() === e.key) {
        window.open(hashMap[i].url);
      }
    }
  });
});
