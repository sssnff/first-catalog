var EMPTY_PAYLOAD = 'sorry, there is nothing for your request :c';
var articles = [];
var formMenu = document.forms.menu;
var formOutput = document.forms.contentInput;


    var request = indexedDB.open("testDB", 2);
    var db; 

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

function addArticleLS(key, payload, db){
 // localStorage.setItem(key, payload); 
    
    var transaction = db.transaction([key],payload); 
    var objectStore = transaction.objectStore(key);
    
    request.onerror = function(event){ 
        console.log("Error opening DB", event);
    } 
    request.onupgradeneeded = function(event){
        console.log("Upgrading"); 
        db = event.target.result; 
        var objectStore = db.createObjectStore(key, { 
            keyPath : "rollNo" });
    };
    request.onsuccess = function(event){ 
        console.log("Success opening DB"); 
        db = event.target.result; 
    }
    
    transaction.oncomplete = function(event) { 
        console.log("Success"); 
    }; 
    transaction.onerror = function(event) { 
        console.log("Error");
    }; 
   
    objectStore.add({rollNo: rollNo, name: name});
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
  addArticleLS(key, payload, db);
}

function onButtonNewAdd(){
  var key = formMenu.keyInput.value;
  formOutput.newKey.value = key;
  document.getElementById('js-payload').innerText = "";
  document.getElementById('js-add-block').style.visibility = 'visible';
}
