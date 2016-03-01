var EMPTY_PAYLOAD = 'sorry, there is nothing for your request :c';

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
var email = document.getElementById('inputEmail');
var pass = document.getElementById('inputPassword');
var off = document.getElementById('offline');
var on = document.getElementById('online');
var signUp = document.getElementById('loginBtn');
var addBtn = document.getElementById("addBtn");

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
    checkUser(email.value, pass.value, function(isSuccess){
        console.log(isSuccess);
        hasWriteAcces = isSuccess;
        if(isSuccess){
            on.style.display = 'inline'; 
            off.style.display = 'none';
            signUp.style.display = 'none';
            addBtn.disabled = false;
            addBtn.className += " btn-raised";
        }
    });
}

function connectDB(callback){
  var request = indexedDB.open(baseName, 1);
  request.onsuccess = function(){
    callback(event.target.result);
  }
  request.onupgradeneeded = function(e){
	var db = e.currentTarget.result;
    db.createObjectStore(articlesStoreName, { keyPath: "name" });
	db.createObjectStore(usersStoreName, { keyPath: "email" });
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
					.put({email: user, password: userPass});
    request.onsuccess = function(){	
    return request.result;
    }
  });
}

function checkUser(userEmail, userPass, callback){ 
  connectDB(function(db){
    var request = db.transaction([usersStoreName], "readwrite")
					.objectStore(usersStoreName)
					.get(userEmail);  
	request.onsuccess = function(){
		var result = request.result;
		if(result){
			callback(result.password === userPass);	
		} else {
			callback(false);
		}
    }
    request.onerror = function(){
        callback(false);
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
		payloadElem.style.display = 'inline';
		payloadElem.innerHTML = payload; 		
  })	
}

function onButtonAdd(){
  var key = formOutput.newKey.value;
  var payload = tinyMCE.get('js-add').getContent({format : 'html'});
  payloadElem.style.display = 'inline';
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
	  var key = formMenu.keyInput.value;
	  formOutput.newKey.value = key;
	  payloadElem.innerText = "";
	  addBlock.style.display = 'inline';
      payloadElem.style.display = 'none';     
}
