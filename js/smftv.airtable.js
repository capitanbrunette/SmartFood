const Airtable = require('airtable');
Airtable.configure({
    apiKey: 'keyNb4ZbKPKQ59R9K'
});
const base = Airtable.base('apps61lsWyWr8NNur');


//PROVES (TEMP)

/*getRecepta("recZyEyBJMkrgWo3V"); //TEMP*/
cerca(['hamburguesa','canelons','bistec'],"capa"); //TEMP


//FUNCIONS DE CONSULTA

/***
 * string capa --> id de la capa on ha de carregar
 * string vista --> vista que vols carregar
 * string taula --> taula on consultar
 * (opcional) string condicio --> condició de filtre
 * (obligatori) array ordre --> array ordenació
 * (opcional) string limit --> número de registres a retornar
 */
var loadReceptes = function(capa, vista, taula, condicio, ordre, limit) {
    $(capa).empty();

    var r = base(taula);
    var first = 1;

    r.select({
        sort: ordre,
        view: vista,
        filterByFormula: condicio,
        maxRecords: limit
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            //dades de la recepta
            var id = record.getId();
            var nom_recepta =  record.get('Nom recepta');
            var entradeta =  record.get('Entradeta');
            var foto = record.get('Fotos')[0].thumbnails.large.url;
            var fav = isUserFav(record.get('Users')); //boolean
            //consola([id,nom_recepta,entradeta,foto,fav]);

            //MAQUETACIÓ
            var $imatge = $('<img>').attr('class', "item-image");
            $imatge.attr("src", foto);
            var $receptaInfo = $('<div>');
            $receptaInfo.attr('class', "row-item");
            $receptaInfo.attr('id', id);
            $receptaInfo.append($imatge);
            $(capa).append($receptaInfo);
            if(first){
            	$('.cover-image').attr("src",foto);
            	first = 0;
            }
        });

        fetchNextPage();
        document.getElementsByClassName("row")[0].getElementsByClassName("row-item")[0].classList.add("selected");
        $('#'+document.getElementsByClassName("row")[0].getElementsByClassName("row-item")[0].id).animate({width:"380px", height:"288px"});
    }, function done(error) {
        console.log(error);
    });
};

function getRecepta(idRecepta,capa){
    var r = base('Receptes');
	r.find(idRecepta, function(err, record) {
        if (err) { console.error(err); return; }
        $(".flex-container").empty();

        var nom_recepta = record.get("Nom recepta");
        var comensals = record.get("Comensals");
        var temps_coccio = record.get("Temps de cocció (Minuts)");
        var temps = record.get("Temps");
        var temps_preparacio = record.get("Temps de preparació (Minuts)");
        var entradeta = record.get("Entradeta");
        var categoria = record.get("Categoria");
        var visites = record.get("Visites");
        var created_time = record.get("Creat");
        var last_visit = record.get("Última consulta");
        var featured = record.get("Featured");
        var favoritedBy = record.get("FavoritedBy");
        var steps = record.get("Steps");
        var fotos = getMediaFotosR(record.get('Fotos'),".flex-container");
        getStepsR(nom_recepta,"#steps");
        //getMediaFotosR(fotos_in,".flex-container");
        getMediaVideosR(nom_recepta,".flex-container");
        getIngredientsR(nom_recepta,"#ingredients");
        getTags(nom_recepta,"capa");
        //setFav("recZyEyBJMkrgWo3V",nom_recepta);

        incrementaVisitaR(idRecepta, visites);
        consola([idRecepta,nom_recepta,comensals,temps_coccio,temps,temps_preparacio,entradeta,categoria,visites,created_time,last_visit,featured,favoritedBy,tags,fotos]);

        //MAQUETACIÓ AQUÍ

        //MAQUETACIÓ
        $("#time").empty();
        $("#time").text(temps);
        $("#timehot").empty();
        $("#timehot").text(temps_coccio);
        $("#people").empty();
        $("#people").text(comensals);
        $("#views").empty();
        $("#views").text(visites);
        $("#numbersteps").empty();
        $("#numbersteps").text(steps.length);
        $("#title-recipe").empty();
        $("#title-recipe").append(nom_recepta);

    });
}

function getStepsR(nom_recepta,capa){
    $(capa).empty();

    var s = base("Steps");
    s.select({
        sort: [{field: "Ordre", direction: "asc"}],
        filterByFormula: "{Recepta} = '"+nom_recepta+"'"
    }).firstPage(function(err, records) {
        if (err) { console.error(err); return; }
        records.forEach(function(record) {
            var pas = record.get('Text');
            //MAQUETACIÓ AQUÍ
            var $step = $('<div>').attr('class', "step");
            $step.append(pas);
            $(capa).append($step);
        });
    });
}

function getMediaFotosR(fotos_in,capa){
    //recupera fotos retorna urls de les fotos en matriu de N files i dos columnes. A la primera columna el thumbnail i a la segona fullsize.
    var fotos_out = [];
    var i;
    for (i = 0; i < fotos_in.length; ++i) {
        fotos_out[i] = [];
        fotos_out[i][0]=fotos_in[i].thumbnails.large.url;
        fotos_out[i][1]=fotos_in[i].thumbnails.full.url;
        var $imagecontainer = $('<li>').attr('class', "flex-item");
        if(i == 0){
            $imagecontainer.addClass("selected");
        	$("#focus-image").attr("src",fotos_out[i][1]); //fotos_out[i][0]
        }
        var $image = $('<img>').attr('class', "thumbnail");
        $image.attr("src",fotos_out[i][0]);
        $imagecontainer.append($image);
        $(capa).append($imagecontainer);

    }
    return fotos_out;
}

function getMediaVideosR(nom_recepta,capa){

    var v = base("Videos");
    v.select({
        filterByFormula: "{Recepta} = '"+nom_recepta+"'"
    }).firstPage(function(err, records) {
        if (err) { console.error(err); return; }
        records.forEach(function(record) {
            var url_video = record.get('URL');
            var $container = $('<li>').attr('class', "flex-item");
            var video = $('<video />', {
                id: 'video',
                class: 'thumbnail',
                src: url_video,
                type: 'video/mp4',
                controls: true
            });
            $container.append(video);
            $(capa).append($container);
            //MAQUETACIÓ AQUÍ

            //console.log('Retrieved VIDEO:', url_video);
        });
    });
}
function getIngredientsR(nom_recepta,capa){
    $(capa).empty();

    var i = base("Ingredients");
    i.select({
        filterByFormula: "{Recepta} = '"+nom_recepta+"'"
    }).firstPage(function(err, records) {
        if (err) { console.error(err); return; }
        records.forEach(function(record) {
            var ingredient = record.get('Ingredient');

            //MAQUETACIÓ AQUÍ
            var $ingredient = $('<div>').attr('class', "step");
            $ingredient.append(ingredient);
            $(capa).append($ingredient);
            //console.log('Retrieved ING:', ingredient);
        });
    });
}

function getTags(nom_recepta,capa){
    $(capa).empty();

    var t = base("Tags");
    t.select({
        filterByFormula: "FIND(LOWER(\""+nom_recepta+"\"),LOWER({Receptes}))"
    }).firstPage(function(err, records) {
        if (err) { console.error(err); return; }
        records.forEach(function(record) {
            var tag = record.get('Name');

            //MAQUETACIÓ AQUÍ

            console.log('Retrieved TAG:', tag);
        });
    });
}

function isUserFav(favedUsers){
    var isFav = favedUsers.indexOf(loggedUser); //si el troba, retorna la posició a l'array (0 la primera)
    return isFav>=0;
}

function existsUser(userName){ //no sé si és la millor manera... (ENCARA NO FUNCIONA)
    var u = base('Users');
    u.select({
        maxRecords: 1,
        filterByFormula: "FIND(LOWER(\""+userName+"\"),LOWER({usuari}))"
    }).firstPage((err, records) => {
        if(err){
            console.error(err);
            return;
        }
        //VARIABLE GLOBAL (NI AIXÍ!)
        //existeixUsuari = records.length!=0;
        window.existeixUsuari = "1";
        console.log("existeix? "+userName+" "+window.existeixUsuari);
        //console.log(records);
    });

    console.log("existeix? (fora) "+userName+" "+window.existeixUsuari);
    //console.log(records);
}


function cerca(paraules,capa){
    $(capa).empty();
    var i;
    filtre = "OR(";
    for(i=0;i<paraules.length;++i){
        filtre = filtre + "FIND(LOWER('"+paraules[i]+"'),LOWER({Nom recepta}))"
        if(i!=paraules.length-1) filtre = filtre + ", ";
    }
    filtre = filtre + ")";

    var r = base("Receptes");
    r.select({
        filterByFormula: filtre
    }).firstPage(function(err, records) {
        if (err) { console.error(err); return; }
        records.forEach(function(record) {
            var pas = record.get('Text');

            //MAQUETACIÓ AQUÍ

        });
    });
}

//FUNCIONS D'ACTUALITZACIÓ

function incrementaVisitaR(idRecepta,visites){
    var r = base("Receptes");
    visites++;
	r.update(idRecepta, {
        "Visites": visites
      }, (err, record) => {
          if (err) {
            console.error(err)
            return
          }
      })
}

/*
function setFav(idUser,nom_recepta){
    var u = base("Users");
    var favs = getFavsU(idUser);
    favs.push(nom_recepta);
	u.update(idUser, {
        "Favorits": favs
      }, (err, record) => {
          if (err) {
            console.error(err)
            return
          }
      })
}

function getFavsU(idUser){
    var u = base('Users');
	u.find(idUser, function(err, record) {
        if (err) { console.error(err); return; }
        //var global...?
    });
}
*/

function addUser(nom,username,password,email){
    //FALTA -> comprova si l'usuari existeix. Retorna true o false.
    base('Users').create({
        "usuari": username,
        "Nom": nom,
        "Email": email,
        "Password": password
      }, function(err, record) {
          if (err) { console.error(err); return; }
          console.log(record.getId());
      });
}

function signInCheck(userName){
    //comprova si l'usuari existeix. Retorna true o false amb variable global.
    var u = base('Users');
    u.select({
        maxRecords: 1,
        filterByFormula: "FIND(LOWER(\""+userName+"\"),LOWER({usuari}))"
    }).firstPage((err, records) => {
        if(err){
            console.error(err);
            return;
        }
        if(records.length!=0){
            document.getElementById("userid").value="recXIH2KiEu6lOui1";
            //loggedUser="recXIH2KiEu6lOui1";
            console.log("dins if: "+loggedUser);
        }else{
            loggedUser="nouser";
            console.log("dins else: "+loggedUser);
        }

    });
    console.log("abans return: "+loggedUser);
    //return loggedUser;
}

//ALTRES FUNCIONS AUXILIARS

function consola(dades){ //funció per mostrar a la consola el contingut de l'array que li passem. Ho fem servir per debugar fàcilment.
    dades.forEach(function myFunction(item, index) {
        console.log('Retrieved ', "index[" + index + "]: " + item + "<br>");
      });

}


var prova = ["aaa","bbb","ccc"]; // An array with some objects

function callbackClosure(i, callback) {
  return function() {
    return callback(i);
  }
}

/*
for( var i = 0; i < prova.length; ++i )
{
  API.doSthWithCallbacks( callbackClosure( i, function(i) {
    prova[i] = 42+i;
  }) );
}

consola(prova);
*/