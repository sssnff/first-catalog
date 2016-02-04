var EMPTY_PAYLOAD = 'sorry, there is nothing for your request :c';
var articles = [];
var formMenu = document.forms.menu;
var formOutput = document.forms.contentInput;

/**
* @link http://www.w3schools.com/html/html5_webstorage.asp boo
*/
function searchArticleLS(key){
  var payload = localStorage.getItem(key);
  if(payload === null){
    payload = EMPTY_PAYLOAD;
  }
  return payload;
}

function addArticleLS(key, payload, database){
  localStorage.setItem(key, payload); 
}  
    


function onButtonSearch(){
  var key = formMenu.keyInput.value;  
  var payload = searchArticleLS(key);
  formOutput.newKey.value = key;
  document.getElementById('js-payload').innerHTML = payload; 
  document.getElementById('js-add-block').style.visibility = payload === EMPTY_PAYLOAD ? 'visible' :'hidden';
}

function onButtonAdd(){
  var key = formOutput.newKey.value;
  var payload = tinyMCE.get('js-add').getContent({format : 'html'});
  document.getElementById('js-payload').innerHTML = payload;  
  addArticleLS(key, payload, database);
}

function onButtonNewAdd(){
  var key = formMenu.keyInput.value;
  formOutput.newKey.value = key;
  document.getElementById('js-payload').innerText = "";
  document.getElementById('js-add-block').style.visibility = 'visible';
}
