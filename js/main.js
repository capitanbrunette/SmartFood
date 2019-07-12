const KEY_BACK = 10009,
    KEY_EXIT = 10182,
    KEY_MENU = 18,
    KEY_ENTER = 13,
    KEY_LEFT = 37,
    KEY_UP = 38,
    KEY_RIGHT = 39,
    KEY_DOWN = 40,
    KEY_TOOLS = 10135,
    KEY_RED = 108,
    KEY_GREEN = 20,
    KEY_YELLOW = 21,
    KEY_BLUE = 406;

var i = 0,
    j = 0,
    toolActive = 0,
	mainScreen = 0;

window.onload = function() {
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
    if (e.keyCode === KEY_RIGHT || e.keyCode === KEY_LEFT) {
        console.log(target[i]);
        target[i].classList.remove("selected");
        if (i === 0) {
            i++;
        } else {
            i--;
        }
        target[i].classList.add("selected");
    }

    if (e.keyCode === KEY_ENTER) {
        document.getElementsByClassName("modal fade")[i].classList.add("show");
        document.getElementsByClassName("modal fade")[i].style["display"] = "block";
        document.getElementById("backdrop").style["display"] = "block";
        document.removeEventListener("keydown", keyListenerMaster, false);
        document.addEventListener("keydown", keyListenerSignIn, false);
    } else {
        e.preventDefault();
    }
}

function keyListenerSignIn(e) {
    var target = document.getElementsByClassName("modal fade")[i].getElementsByClassName("sign-input");
    if (e.keyCode === KEY_UP) {
        console.log(target[j]);
        target[j].classList.remove("selected");
        if (j > 0 && j <= target.length) {
            j--;
        }
        target[j].classList.add("selected");
    }

    if (e.keyCode === KEY_DOWN) {
        target[j].classList.remove("selected");
        if (j >= 0 && j < target.length - 1) {
            j++;
        }
        target[j].classList.add("selected");
    }
    /*if(e.keyCode === KEY_RIGHT || e.keyCode === KEY_LEFT){
		console.log(target[j]);
		target[j].classList.remove("selected");
		if(j === target.length-2){ j++;}else{j--;}
		target[j].classList.add("selected");
    }*/

    if (e.keyCode === KEY_ENTER) {
        if (j >= 0 || j < target.length - 2) {
            console.log("DEspleguem el teclat")
        }
        if (j === target.length - 2) {
            target[j].classList.remove("selected");
            signIn();
        } else if (j === target.length - 1) {
            document.getElementsByClassName("modal fade")[i].classList.remove("show");
            document.getElementsByClassName("modal fade")[i].style["display"] = "none";
            document.getElementById("backdrop").style["display"] = "none";
            document.removeEventListener("keydown", keyListenerSignIn, false);
            document.addEventListener("keydown", keyListenerMaster, false);
            target[j].classList.remove("selected");
            j = 0;
            target[j].classList.add("selected");
        }
    } else {
        e.preventDefault();
    }
}

function keyListenerHome(e) {
	mainScreen = 0;
    var target = document.getElementsByClassName("row")[i].getElementsByClassName("row-item");
    
    if (e.keyCode === KEY_TOOLS) {
        document.removeEventListener("keydown", keyListenerHome, false);
        document.addEventListener("keydown", keyListenerMenu, false);

        console.log("soc TOOLS");
    }

    if (e.keyCode === KEY_UP) {
        /*if(i === 1){
   			$('.cover-box').show();
   			$('.list').css("max-height", "485px");
    	}*/
        target[j].classList.remove("selected");
        j = 0;
        if (i > 0 && i <= 2) {
            i--;
        }
        target = document.getElementsByClassName("row")[i].getElementsByClassName("row-item");
        target[j].classList.add("selected");
        reloadCoverImage();
        $('#row-container-' + (i)).slideDown("slow", "linear", $('#row-container-' + (i)).animate({
            opacity: 1
        }, 500));

    }

    if (e.keyCode === KEY_DOWN) {
        /*if(i === 0){
  		$('.cover-box').hide();
  		$('.list').css("max-height", "1080px");
  	}*/
        target[j].classList.remove("selected");
        j = 0;
        if (i >= 0 && i < 2) {
            i++;
        }
        target = document.getElementsByClassName("row")[i].getElementsByClassName("row-item");
        target[j].classList.add("selected");
        reloadCoverImage();
        $('#row-container-' + (i - 1)).slideUp("slow", "linear", $('#row-container-' + (i - 1)).animate({
            opacity: 0.5
        }, 500));
    }

    if (e.keyCode === KEY_RIGHT) {
        console.log(j);
        target[j].classList.remove("selected");
        console.log($('#' + target[j].id));
        /*$('#'+target[j].id).width = "350px";
		$('#'+target[j].id).height = "100%";*/

        if (j >= 0 && j < target.length - 1) {
            j++;
            console.log(j);
            if (j >= 4) {
                target[j - 4].style["display"] = "none";
                /*var $item = $('#'+target[j-4].id);
				$item.fadeOut(300);*/
            }
        }
        target[j].classList.add("selected");
        var $item = target[j];
        var $previous = target[j - 1];
        console.log($("row-0" + (i + 1) + "#" + target[j].id));
        $("row-0" + (i + 1) + "#" + target[j].id).animate({
            width: "380px",
            height: "288px"
        });
        $("row-0" + (i + 1) + "#" + target[j - 1].id).animate({
            width: "380px",
            height: "258px"
        });
        //$('#row-0'+(i+1)+target[j].id).animate({width:"380px", height:"288px"});
        //$('#'+target[j+1].id).width="350px";
        //$('#'+target[j+1].id).height="258px";
        //$('#row-0'+(i+1)+target[j-1].id).animate({width:"350px", height:"258px"});
        reloadCoverImage();
    }

    if (e.keyCode === KEY_LEFT) {
        target[j].classList.remove("selected");
        /*	$('#'+target[j].id).width = "350px";
		$('#'+target[j].id).height = "100%";*/
        if (j > 0 && j <= target.length - 1) {
            if (j >= 4) {
                console.log("ARRIBO I PETA");
                target[j - 4].style["display"] = "block";
            }
            j--;
            console.log(j);
        }
        target[j].classList.add("selected");
        $("row-0" + (i + 1) + "#" + target[j].id).animate({
            width: "380px",
            height: "288px"
        });
        $("row-0" + (i + 1) + "#" + target[j + 1].id).animate({
            width: "380px",
            height: "258px"
        });
        reloadCoverImage();

    }
    if (e.keyCode === KEY_ENTER) {
        var idRecepta = target[j].id;
        getRecepta(idRecepta, "capa");
        //setTimeout(3000);
        $("#main").hide(1000);
        $("#recipe").delay(1000).show(1000);
        document.removeEventListener("keydown", keyListenerHome, false);
        document.addEventListener("keydown", keyListenerRecipe, false);
    } else {
        e.preventDefault();
    }
}

function keyListenerKeyboard(e) {
    $("#recipe").hide(1000);
    $("#main").delay(1000).show(1000);
}

function keyListenerRecipe(e) {
	mainScreen = -1;
    console.log("EEP Estic dins");
    if (e.keyCode === KEY_BACK) {
        console.log("soc el back");
        document.removeEventListener("keydown", keyListenerRecipe, false);
        document.addEventListener("keydown", keyListenerHome, false);
        $("#recipe").hide(1000);
        $("#main").delay(1000).show(1000);
    }

    if (e.keyCode === KEY_MENU) {
        console.log("soc home");
        document.removeEventListener("keydown", keyListenerRecipe, false);
        document.addEventListener("keydown", keyListenerHome, false);
    }
    
    if (e.keyCode === KEY_TOOLS) {
        document.removeEventListener("keydown", keyListenerRecipe, false);
        document.addEventListener("keydown", keyListenerMenu, false);

        console.log("soc TOOLS");
    }
}


function keyListenerMenu(e) {
	
    console.log("soc TOOLS");
    var target = document.getElementsByClassName("icon-menu");
    console.log(target[toolActive])
    
    if (e.keyCode === KEY_LEFT) {
        if(toolActive != 0){
            target[toolActive].classList.remove("active-menu");
        	toolActive--;
            target[toolActive].classList.add("active-menu");
            console.log(target[toolActive])
        }
    }
    
    if (e.keyCode === KEY_RIGHT) {
        if(toolActive != 4){
            target[toolActive].classList.remove("active-menu");
        	toolActive++;
            target[toolActive].classList.add("active-menu");
            console.log(target[toolActive])
        }    
    }
    
    if (e.keyCode === KEY_ENTER) {
        jumpToScreen();  
    }
	
    if (e.keyCode === KEY_DOWN) {
        returnToEventListener();
    }
    
    if (e.keyCode === KEY_TOOLS) {
        returnToEventListener();

    }
}

function returnToEventListener(){
    document.removeEventListener("keydown", keyListenerMenu, false);
	switch (mainScreen) {
	case -1:
        document.addEventListener("keydown", keyListenerRecipe, false);
        console.log("RETORNO A RECIPES")
		break;
	default:
        document.addEventListener("keydown", keyListenerHome, false);
    	console.log("RETORNO A HOME")
		break;
	}
}


function jumpToScreen(){
	switch (toolActive) {
		case 0:
			mainScreen = 0;
	        console.log("VAIG A HOME");
			startHome();
			break;
		case 1:
			mainScreen = 0;
	        console.log("VAIG A NEWS");
			loadNews();
			break;
		case 2:
			mainScreen = 0;
	        console.log("VAIG A BLOG");
			loadBlog();
			break;
		case 3:
			mainScreen = 0;
	        console.log("VAIG A FAV");
			loadFav();
			break;
		case 4:
			mainScreen = 0;
	        console.log("VAIG A SEARCH");
			loadSearch();
			break;
		default:
			mainScreen = -1;
	    	console.log("ERROR NO ESTA DINS DEL MARGE");
			break;
	}
}


function signIn() {
    //  console.log(tizen.tvinputdevice.getSupportedKeys());
	
	signInCheck($("#user_name").val(), $("#user_password").val());
	checkUserId();

	
	//$.when(signInCheck($("#user_name").val(), $("#user_password").val())).done(checkUserId());    
    
}

function checkUserId(){
	if( document.getElementById("userid").value == "nouser" || document.getElementById("userid").value == null){	
    	$("#user_name").val('');
    	$("#user_password").val('')
    	console.log("ERROOOOOOOOOOR");
    }else{    
        i = 0;
        j = 0;
        console.log("CORRECT USEEEEERRR")
        $("#master").fadeOut("slow", "linear", $("#home").show());
        $('.modal-backdrop').remove();
        document.removeEventListener("keydown", keyListenerSignIn, false);
    	startHome();
    }
}


function loadHomeInfo() {
    console.log("He entrat HOME");
    getUserData(document.getElementById("userid").value)
    //window.location.replace("index.html");
    $("#recipe").hide();
    $("#search").hide();
    $("#blog").hide();

    $("#main").show();

    var ordre = [{
        field: 'Nom recepta',
        direction: 'asc'
    }];
    
    var orderPopular = [{
        field: 'Visites',
        direction: 'desc'
    }];
    
    var limit = 10;
    loadReceptes("#row-01", "featured", "Receptes", "", ordre, limit);
    loadReceptes("#row-02", "popular", "Receptes", "", orderPopular, limit);
    loadReceptes("#row-03", "lastVisited", "Receptes", "", ordre, limit);

}

function loadFav() {
    //window.location.replace("index.html");
    $("#recipe").hide();
    $("#search").hide();
    $("#blog").hide();

    $("#main").show();

    clearMainDisplay();
    $("#row-title-01").append("My List");
    var loggedUserName = "dfuertes"; //aquí cal posar el username de l'usuari que estigui guardat a la sessió
    var capa = "#row-01";
    var vista = "favorited";
    var taula = "Receptes";
    var condicio = "FIND(LOWER(\"" + loggedUserName + "\"),LOWER({FavoritedBy}))>0";
    var ordre = [{
        field: 'Nom recepta',
        direction: 'asc'
    }];
    var limit = 100;
    loadReceptes(capa, vista, taula, condicio, ordre, limit);
}


function loadNews() {
    //window.location.replace("index.html");
    $("#recipe").hide();
    $("#search").hide();
    $("#blog").hide();
    $("#main").show();

    console.log("He entrat NEWS");
    clearMainDisplay();
    $("#row-title-01").append("Starters");
    $("#row-title-02").append("Main dishes");
    $("#row-title-03").append("Desserts");

    var ordre = [{
        field: 'Creat',
        direction: 'desc'
    }, {
        field: 'Nom recepta',
        direction: 'asc'
    }]
    var limit = 5;
    loadReceptes("#row-01", "Primers", "Receptes", "", ordre, limit);
    loadReceptes("#row-02", "Segons", "Receptes", "", ordre, limit);
    loadReceptes("#row-03", "Postres", "Receptes", "", ordre, limit);
}

function clearMainDisplay() {
    $("#row-01").empty();
    $("#row-02").empty();
    $("#row-03").empty();
    $("#row-title-01").empty();
    $("#row-title-02").empty();
    $("#row-title-03").empty();
}

function loadBlog() {

    $("#recipe").hide();
    $("#search").hide();
    $("#main").hide();

    $("#blog").show();
    //keyListenerBlog();
    //window.location.replace("blog.html");
}

function loadSearch() {
    //window.location.replace("index.html");
    $("#recipe").hide();
    $("#main").hide();
    $("#blog").hide();
    $("#search").show();

}

function searchRecipe() {
    $("#row-search").empty();
    var paraules = ['hamburguesa', 'canelons', 'bistec'];
    var i;
    filtre = "OR(";
    for (i = 0; i < paraules.length; ++i) {
        filtre = filtre + "FIND(LOWER('" + paraules[i] + "'),LOWER({Nom recepta}))"
        if (i != paraules.length - 1) filtre = filtre + ", ";
    }
    filtre = filtre + ")";

    var ordre = [{
        field: 'Nom recepta',
        direction: 'asc'
    }];

    console.log(filtre);

    loadReceptes("#row-search", "Resum", "Receptes", filtre, ordre, 5);

    //cerca(['hamburguesa','canelons','bistec'],"row-search");
}



function reloadCoverImage() {
    var newSrc = document.getElementsByClassName("row")[i].getElementsByClassName("item-image")[j].src;
    $('.cover-image').attr("src", newSrc);
}

function startHome() {
    document.addEventListener("keydown", keyListenerHome, false);
    loadHomeInfo();
    //setTimeout(reloadCoverImage, 10000);

}

/************** FUNCIONS DEL TECLAT ********************/


$(function() {
    var keyboard = {
        'layout': [
            // alphanumeric keyboard type
            // text displayed on keyboard button, keyboard value, keycode, column span, new row
            [
                [
                    ['`', '`', 192, 0, true],
                    ['1', '1', 49, 0, false],
                    ['2', '2', 50, 0, false],
                    ['3', '3', 51, 0, false],
                    ['4', '4', 52, 0, false],
                    ['5', '5', 53, 0, false],
                    ['6', '6', 54, 0, false],
                    ['7', '7', 55, 0, false],
                    ['8', '8', 56, 0, false],
                    ['9', '9', 57, 0, false],
                    ['0', '0', 48, 0, false],
                    ['-', '-', 189, 0, false],
                    ['=', '=', 187, 0, false],
                    ['q', 'q', 81, 0, true],
                    ['w', 'w', 87, 0, false],
                    ['e', 'e', 69, 0, false],
                    ['r', 'r', 82, 0, false],
                    ['t', 't', 84, 0, false],
                    ['y', 'y', 89, 0, false],
                    ['u', 'u', 85, 0, false],
                    ['i', 'i', 73, 0, false],
                    ['o', 'o', 79, 0, false],
                    ['p', 'p', 80, 0, false],
                    ['[', '[', 219, 0, false],
                    [']', ']', 221, 0, false],
                    ['&#92;', '\\', 220, 0, false],
                    ['a', 'a', 65, 0, true],
                    ['s', 's', 83, 0, false],
                    ['d', 'd', 68, 0, false],
                    ['f', 'f', 70, 0, false],
                    ['g', 'g', 71, 0, false],
                    ['h', 'h', 72, 0, false],
                    ['j', 'j', 74, 0, false],
                    ['k', 'k', 75, 0, false],
                    ['l', 'l', 76, 0, false],
                    [';', ';', 186, 0, false],
                    ['&#39;', '\'', 222, 0, false],
                    ['Enter', '13', 13, 3, false],
                    ['Shift', '16', 16, 2, true],
                    ['z', 'z', 90, 0, false],
                    ['x', 'x', 88, 0, false],
                    ['c', 'c', 67, 0, false],
                    ['v', 'v', 86, 0, false],
                    ['b', 'b', 66, 0, false],
                    ['n', 'n', 78, 0, false],
                    ['m', 'm', 77, 0, false],
                    [',', ',', 188, 0, false],
                    ['.', '.', 190, 0, false],
                    ['/', '/', 191, 0, false],
                    ['Shift', '16', 16, 2, false],
                    ['Bksp', '8', 8, 3, true],
                    ['Space', '32', 32, 12, false],
                    ['Clear', '46', 46, 3, false],
                    ['Hide', '27', 27, 3, false]
                ]
            ]
        ]
    }
    $('input.jQKeyboard').initKeypad({
        'keyboardLayout': keyboard
    });
    
    $('input.selected').initKeypad({
        'keyboardLayout': keyboard
    });
});



/*==================================================================
							[ LOGIN JS]
====================================================================*/


(function ($) {
    "use strict";

    /*==================================================================
    [ Validate after type ]*/
    $('.validate-input .input100').each(function(){
        $(this).on('blur', function(){
            if(validate(this) == false){
                showValidate(this);
            }
            else {
                $(this).parent().addClass('true-validate');
            }
        })    
    })
  
  
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
           $(this).parent().removeClass('true-validate');
        });
    });

     function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');

        $(thisAlert).append('<span class="btn-hide-validate">&#xf135;</span>')
        $('.btn-hide-validate').each(function(){
            $(this).on('click',function(){
               hideValidate(this);
            });
        });
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).removeClass('alert-validate');
        $(thisAlert).find('.btn-hide-validate').remove();
    }
    
    

})(jQuery);