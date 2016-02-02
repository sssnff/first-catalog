var EMPTY_PAYLOAD = 'sorry, there is nothing for your request :c';
var articles = [];

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
  document.getElementById('js-new-key').value = key;
  document.getElementById('js-payload').innerText = payload;
  document.getElementById('js-add-block').style.visibility = payload === EMPTY_PAYLOAD ? 'visible' :'hidden';
}

function onButtonAdd(){
  var key = document.getElementById('js-new-key').value;
  var payload = tinyMCE.get('js-add').getContent({format : 'html'});
  document.getElementById('js-payload').innerText = payload;
  addArticleLS(key, payload);
}

function onButtonNewAdd(){
  var key = document.getElementById('js-key').value;
  document.getElementById('js-new-key').value = key;
  document.getElementById('js-payload').innerText = "";
  document.getElementById('js-add-block').style.visibility = 'visible';
}
