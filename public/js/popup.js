$(document).ready(function(){
    var popup = $('#sample1').mPopup();
    $('#loginBtn').on('click',function(e){
        e.preventDefault();
        popup.mPopup('open');
    });
});
        
$(document).ready(function(){
    var popup = $('#sample2').mPopup();
    $('#signUpBtn').on('click',function(e){
        e.preventDefault();
        popup.mPopup('open');
    });
});
   