$(document).ready(function(){
    var popup = $('#sample1').mPopup();
    $('#loginBtn').on('click',function(e){
        e.preventDefault();
        popup.mPopup('open');
    });
});
        

   