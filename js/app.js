var EMPTY_PAYLOAD = 'sorry, there is nothing for your request :c';
var articles = [];
var formMenu = document.forms.menu;
var formOutput = document.forms.contentInput;

/**
* @link http://www.w3schools.com/html/html5_webstorage.asp boo
*/



var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
var baseName = "articlesDB";
var storeName = "articles";
// indexedDB.deleteDatabase(baseName);
function connectDB(callback){
  var request = indexedDB.open(baseName, 1);
  request.onsuccess = function(){
    callback(event.target.result);
  }
  request.onupgradeneeded = function(e){
    e.currentTarget.result.createObjectStore(storeName, { keyPath: "name" });
    connectDB(callback);
  }
}
 
function addArticle(keyArticle, payloadArticle){
  connectDB(function(db){
    var request = db.transaction([storeName], "readwrite")
					.objectStore(storeName)
					.put({name: keyArticle, payload: payloadArticle});
    request.onsuccess = function(){
      return request.result;
    }
  });
}

function getArticle(keyArticle, callback){
  connectDB(function(db){
    var request = db.transaction([storeName], "readwrite")
					.objectStore(storeName)
					.get(keyArticle);
    request.onsuccess = function(){
      callback(request.result.payload);
    }
  });
}


function onButtonSearch(){
  var key = formMenu.keyInput.value;  
	getArticle(key, function(payload){
		formOutput.newKey.value = key;  
		document.getElementById('js-payload').innerHTML = payload; 
		if( payload === EMPTY_PAYLOAD){
		 	document.getElementById('js-add-block').style.display = 'inline';
		}
		else {
			document.getElementById('js-add-block').style.display = 'none'; 
		}    
	})	
}


function onButtonAdd(){
  var key = formOutput.newKey.value;
  var payload = tinyMCE.get('js-add').getContent({format : 'html'});
  document.getElementById('js-payload').innerHTML = payload;  
  addArticle(key, payload);
}

function onButtonNewAdd(){
  var key = formMenu.keyInput.value;
  formOutput.newKey.value = key;
  document.getElementById('js-payload').innerText = "";
  document.getElementById('js-add-block').style.display = 'inline';
}
