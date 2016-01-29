var EMPTY_PAYLOAD = 'sorry, there are no articles for you :c';
var articles = [];

articles['hello world'] = 'A "Hello, World!" program is a computer program that outputs "Hello, World!" on a display device. Being a very simple program in most programming languages, it is often used to illustrate to beginning programmers the basic syntax for constructing a working program. It is also used to verify that a language or system is operating correctly.';

function searchArticle(key){
  var payload = articles[key];
  if(payload === undefined){
    payload = EMPTY_PAYLOAD;
  }
  return payload;
}

function onButtonSearch(){
  var key = document.getElementById('js-key').value;
  var payload = searchArticle(key);
  document.getElementById('js-payload').innerText = payload;
}
