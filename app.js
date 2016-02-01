var EMPTY_PAYLOAD = 'sorry, there is nothing for your request :c';
var articles = [];

function searchArticle(key){
  var payload = articles[key];
  if(payload === undefined){
    payload = EMPTY_PAYLOAD;
  }
  return payload;
}

function addArticle(key, payload){
  articles[key] = payload;
}

//http://www.w3schools.com/html/html5_webstorage.asp boo
function searchArticleLS(key){
  var payload = localStorage.getItem(key);
  if(payload === null){
    payload = EMPTY_PAYLOAD;
  }
  return payload;
}

function addArticleLS(key, payload){
  localStorage.setItem(key, payload);
}

function onButtonSearch(){
  var key = document.getElementById('js-key').value;
  var payload = searchArticleLS(key);
  document.getElementById('js-payload').innerText = payload;
  document.getElementById('js-add-block').style.visibility = payload === EMPTY_PAYLOAD ? 'visible' :'hidden';
}

function onButtonAdd(){
  var key = document.getElementById('js-key').value;
  var payload = document.getElementById('js-add').value;
  document.getElementById('js-payload').innerText = payload;
  document.getElementById('js-add-block').style.visibility = payload ='visible';
  addArticleLS(key, payload);
}

