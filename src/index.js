import { app_Id, app_Key } from "./constants";

const URL = `https://api.edamam.com/search?q=chicken&app_id=${app_Id}&app_key=${app_Key}`;

const main = document.querySelector("main");
const template = document.querySelector("template");
var div = template.content.querySelector("div");
var total = 0;
var clickArr = [];
main.addEventListener("click", event => {
  event.preventDefault();
  var a = event.target;

  var child = main.children;

  var childArr = Array.prototype.slice.call(child);
  var index = childArr.indexOf(event.target.closest("div.item")) - 1;
  var clickCount = a.innerText === "Add to Cart" ? 0 : a.innerText;
  clickArr[index] = parseInt(clickCount) + 1;
  a.innerText = clickArr[index];
  total = total + 1;
  console.log(total);
});

const myApp = (function() {
  function fetchAPI() {
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        getList(data.hits);
      });
  }

  return {
    fetchAPI: fetchAPI
  };
})();

myApp.fetchAPI();

function getList(items) {
  items.forEach(item => {
    displayItem(item);
  });
}

function displayItem(item) {
  var t1 = document.importNode(div, true);

  var t2 = t1.children[0];
  var t3 = t1.children[1];

  t2.textContent = item.recipe.label;
  t3.textContent = item.recipe.source;

  main.appendChild(t1);
}
