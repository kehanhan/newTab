const data = JSON.parse(localStorage.getItem("data"));
let hashMap = data || [
  { logo: "A", name: "Apple", url: "https://www.apple.com.cn/" },
  { logo: "B", name: "bilibili", url: "https://bilibili.com" },
  {
    logo: "M",
    name: "MDN",
    url: "https://developer.mozilla.org/zh-CN/docs/Learn",
  },
];
let urlToName = (url) => {
  return url
    .replace("https://", "")
    .replace("www.", "")
    .replace(/\/.*/, "")
    .replace(/\.org/, "")
    .replace(/\.com/, "")
    .replace(/\.cn/, "");
};
console.log(urlToName("https://developer.mozilla.org/zh-CN/docs/Learn"));
window.onbeforeunload = () => {
  let localList = JSON.stringify(hashMap);
  localStorage.setItem("data", localList);
};
const render = () => {
  $(".appList").find("li:not(.last)").remove();
  hashMap.forEach((node) => {
    const $li = $(`<li class="app">
          <a href="${node.url}">
              <div class="app_icon">${node.logo}</div>
          </a>
          <div class="app_name">${node.name}</div>
        </li>`).insertBefore($(".last"));
  });
};
render();
console.log("https://baidu.com".indexOf("http"));
$(".add").on("click", () => {
  let url = window.prompt("请输入网站地址：");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  hashMap.push({
    logo: urlToName(url)[0],
    name: urlToName(url),
    url: url,
  });
  render();
});
