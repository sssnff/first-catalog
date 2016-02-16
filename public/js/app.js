var EMPTY_PAYLOAD = 'sorry, there is nothing for your request :c';
var ACCES_USERS_ONLY = 'sorry, you can add smthng only if you logged in :c ';
var articles = [];
var formMenu = document.forms.menu;
var formOutput = document.forms.contentInput;
var hasWriteAcces = false;

var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
var baseName = "articlesDB";
var storeName = "articles";

var addBlock = document.getElementById('js-add-block');
var payloadElem = document.getElementById('js-payload');
var loginItem = document.getElementById('js-login');


addBtn.onclick = function(event){
	onButtonNewAdd(hasWriteAcces);
}

addBtn2.onclick = function(event){
	onButtonAdd();
}

searchButton.onclick = function(event){
	onButtonSearch(hasWriteAcces);    
}

//indexedDB.deleteDatabase(baseName);
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

function onButtonSearch(hasWriteAcces){
  var key = formMenu.keyInput.value; 
	  getArticle(key, function(payload){
		formOutput.newKey.value = key; 
        if(payload === EMPTY_PAYLOAD && hasWriteAcces === true){
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
     if(payload !== undefined){
         addBlock.style.display = 'none';            
        }
    else {
         addBlock.style.display = 'inline';
        } 
}

function onButtonNewAdd(hasWriteAcces){
  if(hasWriteAcces === true){
  var key = formMenu.keyInput.value;
  formOutput.newKey.value = key;
  payloadElem.innerText = "";
  addBlock.style.display = 'inline';
    }
    else{
      payloadElem.innerText = ACCES_USERS_ONLY; 
    }
}
