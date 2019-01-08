const RETURN_BUTTON = 10009, KEY_ENTER = 13, KEY_LEFT = 37, KEY_UP = 38, KEY_RIGHT = 39, KEY_DOWN = 40;
var i = 0, j = 0;

window.onload = function () {
    // TODO:: Do your initialization job
	    // add eventListener for tizenhwkey
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
	   }else{
			  e.preventDefault();
		 }
}

function keyListenerSignIn(e) {
	var target = document.getElementsByClassName("modal fade")[i].getElementsByClassName("sign-input");
	if(e.keyCode === KEY_UP){
		console.log(target[j]);
		target[j].classList.remove("selected");
		if(j > 0 && j <= target.length){ j--;}
		target[j].classList.add("selected");
    }

    if(e.keyCode === KEY_DOWN){
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
   }else{
			e.preventDefault();
	 }
}

function keyListenerHome(e){
	console.log("FUNCIO HOMEKEY");
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
  }else{
			e.preventDefault();
	}
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
}

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
	//setTimeout(reloadCoverImage, 10000);

}


$(function(){
		var keyboard = {
				'layout': [
						// alphanumeric keyboard type
						// text displayed on keyboard button, keyboard value, keycode, column span, new row
						[
								[
										['`', '`', 192, 0, true], ['1', '1', 49, 0, false], ['2', '2', 50, 0, false], ['3', '3', 51, 0, false], ['4', '4', 52, 0, false], ['5', '5', 53, 0, false], ['6', '6', 54, 0, false],
										['7', '7', 55, 0, false], ['8', '8', 56, 0, false], ['9', '9', 57, 0, false], ['0', '0', 48, 0, false], ['-', '-', 189, 0, false], ['=', '=', 187, 0, false],
										['q', 'q', 81, 0, true], ['w', 'w', 87, 0, false], ['e', 'e', 69, 0, false], ['r', 'r', 82, 0, false], ['t', 't', 84, 0, false], ['y', 'y', 89, 0, false], ['u', 'u', 85, 0, false],
										['i', 'i', 73, 0, false], ['o', 'o', 79, 0, false], ['p', 'p', 80, 0, false], ['[', '[', 219, 0, false], [']', ']', 221, 0, false], ['&#92;', '\\', 220, 0, false],
										['a', 'a', 65, 0, true], ['s', 's', 83, 0, false], ['d', 'd', 68, 0, false], ['f', 'f', 70, 0, false], ['g', 'g', 71, 0, false], ['h', 'h', 72, 0, false], ['j', 'j', 74, 0, false],
										['k', 'k', 75, 0, false], ['l', 'l', 76, 0, false], [';', ';', 186, 0, false], ['&#39;', '\'', 222, 0, false], ['Enter', '13', 13, 3, false],
										['Shift', '16', 16, 2, true], ['z', 'z', 90, 0, false], ['x', 'x', 88, 0, false], ['c', 'c', 67, 0, false], ['v', 'v', 86, 0, false], ['b', 'b', 66, 0, false], ['n', 'n', 78, 0, false],
										['m', 'm', 77, 0, false], [',', ',', 188, 0, false], ['.', '.', 190, 0, false], ['/', '/', 191, 0, false], ['Shift', '16', 16, 2, false],
										['Bksp', '8', 8, 3, true], ['Space', '32', 32, 12, false], ['Clear', '46', 46, 3, false], ['Cancel', '27', 27, 3, false]
								]
						]
				]
		}
		$('input.jQKeyboard').initKeypad({'keyboardLayout': keyboard});
});
