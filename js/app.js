var EMPTY_PAYLOAD = 'sorry, there is nothing for your request :c';
var articles = [];
var formMenu = document.forms.menu;
var formOutput = document.forms.contentInput;

var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
var baseName = "articlesDB";
var storeName = "articles";

var addBlock = document.getElementById('js-add-block');
var payloadElem = document.getElementById('js-payload');

addBtn.onclick = function(event){
	onButtonNewAdd();
}

addBtn2.onclick = function(event){
	onButtonAdd();
}

searchButton.onclick = function(event){
	onButtonSearch();
}


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
		var result = request.result;
		if(result){
			callback(result.payload);	
		} else {
			callback(EMPTY_PAYLOAD);
		}
    }   
  });
}


function onButtonSearch(){
  var key = formMenu.keyInput.value; 
	  getArticle(key, function(payload){
		formOutput.newKey.value = key; 
        if(payload === EMPTY_PAYLOAD){
           addBlock.style.display = 'inline';
        }
        else {
            addBlock.style.display = 'none'; 
        }     
		payloadElem.innerHTML = payload; 		
  })	
}

function onButtonAdd(){
  var key = formOutput.newKey.value;
  var payload = tinyMCE.get('js-add').getContent({format : 'html'});
  payloadElem.innerHTML = payload;  
  addArticle(key, payload);
}


function onButtonNewAdd(){
  var key = formMenu.keyInput.value;
  formOutput.newKey.value = key;
  payloadElem.innerText = "";
  addBlock.style.display = 'inline';
}
