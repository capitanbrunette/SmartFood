
window.onload = function () {
    // TODO:: Do your initialization job
	    // add eventListener for tizenhwkey
	document.addEventListener('tizenhwkey', function(e) {
	    if(e.keyName == "back")
	try {
	    tizen.application.getCurrentApplication().exit();
	    //console.log(tizen.tvinputdevice.getSupportedKeys());
	} catch (ignore) {
	}
	});
    
};

function signIn(){
	  document.getElementById("master").style["display"]="none";
	  document.getElementById("master").style["visibility"]="hidden";
	  document.getElementById("home").style["display"]="inline";
	  $('.modal-backdrop').remove();
	  //Comentari de provAAAAAA
	  //initList();
};
