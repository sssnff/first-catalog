var EMPTY_PAYLOAD = 'sorry, there is nothing for your request :c';
var ACCES_USERS_ONLY = 'sorry, you can add smthng only if you logged in :c ';

var formMenu = document.forms.menu;
var formOutput = document.forms.contentInput;
var hasWriteAcces = false;
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
var baseName = "catalogDB";
var articlesStoreName = "articles";
var usersStoreName = "users";

var addBlock = document.getElementById('js-add-block');
var payloadElem = document.getElementById('js-payload');
var loginItem = document.getElementById('js-login');
var login = document.getElementById('inputLogin');
var pass = document.getElementById('inputPassword');


addBtn.onclick = function(event){
	onButtonNewAdd();
}

addBtn2.onclick = function(event){
	onButtonAdd();
}

searchButton.onclick = function(event){
	onButtonSearch();    
}

doLogin.onclick = function(event){
	addUser(login.value, pass.value);    
}


//indexedDB.deleteDatabase(baseName);

function connectDB(callback){
  var request = indexedDB.open(baseName, 1);
  request.onsuccess = function(){
    callback(event.target.result);
  }
  request.onupgradeneeded = function(e){
	var db = e.currentTarget.result;
    db.createObjectStore(articlesStoreName, { keyPath: "name" });
	db.createObjectStore(usersStoreName, { keyPath: "login" });
    connectDB(callback);
  }
}
 

function addArticle(keyArticle, payloadArticle){
  connectDB(function(db){
    var request = db.transaction([articlesStoreName], "readwrite")
					.objectStore(articlesStoreName)
					.put({name: keyArticle, payload: payloadArticle});
    request.onsuccess = function(){
    return request.result;
    }
  });
}


function addUser(user, userPass){
  connectDB(function(db){
    var request = db.transaction([usersStoreName], "readwrite")
					.objectStore(usersStoreName)
					.put({login: user, password: userPass});
    request.onsuccess = function(){
		hasWriteAcces = true;
    	return request.result;
    }
  });
}


function getArticle(keyArticle, callback){
  connectDB(function(db){
    var request = db.transaction([articlesStoreName], "readwrite")
					.objectStore(articlesStoreName)
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
        if(payload === EMPTY_PAYLOAD && !!hasWriteAcces){
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

function onButtonNewAdd(){
  if(!!hasWriteAcces){
	  var key = formMenu.keyInput.value;
	  formOutput.newKey.value = key;
	  payloadElem.innerText = "";
	  addBlock.style.display = 'inline';
    }
    else{
      payloadElem.innerText = ACCES_USERS_ONLY; 
    }
}
