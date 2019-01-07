const RETURN_BUTTON = 10009, KEY_ENTER = 13, KEY_LEFT = 37, KEY_UP = 38, KEY_RIGHT = 39, KEY_DOWN = 40;
var i = 0, j = 0;

window.onload = function () {
    // TODO:: Do your initialization job
	    // add eventListener for tizenhwkey
	console.log("He executat el Event Listener de Tizen");
	
	document.addEventListener("keydown", keyListenerMaster, false);
	

	/*document.addEventListener(tizenhwkew, function(e) {
	    if(e.keyName === "back"){
	    	try {
	    	    tizen.application.getCurrentApplication().exit();
	    	    //console.log(tizen.tvinputdevice.getSupportedKeys());
	    	} catch (ignore) {
	    	}
	    }
	});*/
	
};

function keyListenerMaster(e) {
	var target = document.getElementById("sign-row").getElementsByClassName("sign-btns");
		if(e.keyCode === KEY_RIGHT || e.keyCode === KEY_LEFT){
			console.log(target[i]);
			target[i].classList.remove("selected");
			if(i === 0){ i++;}else{i--;}
			target[i].classList.add("selected");
	    }
		
	   if (e.keyCode === KEY_ENTER) {
		   document.getElementsByClassName("modal fade")[i].classList.add("show");
		   document.getElementsByClassName("modal fade")[i].style["display"]="block";
		   document.getElementById("backdrop").style["display"]="block";
		   document.removeEventListener("keydown", keyListenerMaster, false);
		   document.addEventListener("keydown", keyListenerSignIn, false);
	   };

	   e.preventDefault();
}

function keyListenerSignIn(e) {
	var target = document.getElementsByClassName("modal fade")[i].getElementsByClassName("sign-input");
	console.log(target);
	console.log(document.getElementsByClassName("modal fade")[0].getElementsByClassName("sign-input")[0]);
	if(e.keyCode === KEY_UP){
		console.log(target[j]);
		target[j].classList.remove("selected");
		if(j > 0 && j <= target.length){ j--;}
		target[j].classList.add("selected");
    }

    if(e.keyCode === KEY_DOWN){
    	console.log(target[j]);
		target[j].classList.remove("selected");
		if(j >= 0 && j < target.length-1){ j++;}
		target[j].classList.add("selected");
    }
	/*if(e.keyCode === KEY_RIGHT || e.keyCode === KEY_LEFT){
		console.log(target[j]);
		target[j].classList.remove("selected");
		if(j === target.length-2){ j++;}else{j--;}
		target[j].classList.add("selected");
    }*/
    
   if (e.keyCode === KEY_ENTER) {
     if(j >= 0 || j < target.length-2){ console.log("DEspleguem el teclat") }
     if(j === target.length-2){ 
    	 signIn(); 
    	 //Afegir listeners de HOME
     }else if (j === target.length-1){
    	 document.getElementsByClassName("modal fade")[i].classList.remove("show");
		 document.getElementsByClassName("modal fade")[i].style["display"]="none";
		 document.getElementById("backdrop").style["display"]="none";
		 document.removeEventListener("keydown", keyListenerSignIn, false);
		 document.addEventListener("keydown", keyListenerMaster, false);
		 target[j].classList.remove("selected");
		 j = 0;
		 target[j].classList.add("selected");
     }
   };
   //Afegir la opció de sortida
   e.preventDefault();
}

function keyListenerHome(e){
	console.log("FUNCIO HOMEKEY");
	console.log(i);
	var target = document.getElementsByClassName("row")[i].getElementsByClassName("row-item");

	if(e.keyCode === KEY_UP){
    	if(i === 1){
   			$('.cover-box').show();
   			$('.list').css("max-height", "485px");
    	}
		target[j].classList.remove("selected");
		j = 0;
		if(i > 0 && i <= 2){ i--;}
		target = document.getElementsByClassName("row")[i].getElementsByClassName("row-item");
		target[j].classList.add("selected");
		reloadCoverImage();
    }

    if(e.keyCode === KEY_DOWN){
    	if(i === 0){
    		$('.cover-box').hide();
    		$('.list').css("max-height", "1080px");
    	}
		target[j].classList.remove("selected");
		j = 0;
		if(i >= 0 && i < 2){ i++;}
		target = document.getElementsByClassName("row")[i].getElementsByClassName("row-item");
		target[j].classList.add("selected");
		reloadCoverImage();
    }
	if(e.keyCode === KEY_RIGHT){
		target[j].classList.remove("selected");
		if(j >= 0 && j < target.length-1){ j++;}
		target[j].classList.add("selected");
		reloadCoverImage();
	}
	if(e.keyCode === KEY_LEFT){
		target[j].classList.remove("selected");
		if(j > 0 && j <= target.length-1){ j--;}
		target[j].classList.add("selected");
		reloadCoverImage();
    }
	
	e.preventDefault();
}

function keyListenerKeyboard(){
	
}


function signIn(){
	i = 0; j = 0;
	  document.getElementById("master").style["display"]="none";
	  document.getElementById("home").style["display"]="inline";
	  $('.modal-backdrop').remove();
	  document.removeEventListener("keydown", keyListenerSignIn, false);
	  startHome();

	  //CAL REGISTRAR L'USUARI I FER COMPROVACIONS DE REGISTRE
	  console.log(tizen.tvinputdevice.getSupportedKeys());
};

function loadHomeInfo(){
	var ordre=[{field: 'Nom recepta', direction: 'asc'}];
    var limit=10;
    loadReceptes("#row-01","featured","Receptes","",ordre,limit);
    loadReceptes("#row-02","favorited","Receptes","",ordre,limit);
    loadReceptes("#row-03","popular","Receptes","",ordre,limit);
}

function reloadCoverImage(){
	var newSrc = document.getElementsByClassName("row")[i].getElementsByClassName("item-image")[j].src;
	$('.cover-image').attr("src",newSrc);
}

function startHome(){
	document.addEventListener("keydown", keyListenerHome, false);
	loadHomeInfo();
	setTimeout(reloadCoverImage, 10000);
    
    console.log("s'executa start home");
    console.log(document.getElementsByClassName("row")[0].getElementsByClassName("item-image"));


}
