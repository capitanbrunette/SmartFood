const Airtable = require('airtable');
Airtable.configure({
    apiKey: 'keyNb4ZbKPKQ59R9K'
});
const base = Airtable.base('apps61lsWyWr8NNur');


//PROVES (TEMP)
var loggedUser="recXIH2KiEu6lOui1";  //veure com fer-ho dinàmic //TEMP

getRecepta("recZyEyBJMkrgWo3V"); //TEMP
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
            $receptaInfo.append($imatge);
    
            $(capa).append($receptaInfo);
            if(first){
            	$('.cover-image').attr("src",foto);
            	first = 0;
            }
        });

        fetchNextPage();
        document.getElementsByClassName("row")[0].getElementsByClassName("row-item")[0].classList.add("selected");
    }, function done(error) {
        console.log(error);
    });
};

function getRecepta(idRecepta,capa){
    var r = base('Receptes');
	r.find(idRecepta, function(err, record) {
        if (err) { console.error(err); return; }

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
        var fotos = getMediaFotosR(record.get('Fotos'),"capa");

        getStepsR(nom_recepta,"capa");
        getMediaVideosR(nom_recepta,"capa");
        getIngredientsR(nom_recepta,"capa");
        getTags(nom_recepta,"capa");
        //setFav("recZyEyBJMkrgWo3V",nom_recepta);
        
        incrementaVisitaR(idRecepta, visites);
        //consola([idRecepta,nom_recepta,comensals,temps_coccio,temps,temps_preparacio,entradeta,categoria,visites,created_time,last_visit,featured,favoritedBy,tags,fotos]);
        
        //MAQUETACIÓ AQUÍ

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
    }
    return fotos_out;
}

function getMediaVideosR(nom_recepta,capa){
    $(capa).empty();

    var v = base("Videos");
    v.select({
        filterByFormula: "{Recepta} = '"+nom_recepta+"'"
    }).firstPage(function(err, records) {
        if (err) { console.error(err); return; }
        records.forEach(function(record) {
            var url_video = record.get('URL');
            
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

var existeixUsuari=false; // variable global que es fa servir a existsUser per comprovar si l'usuari ja existeix. No hi ha hagut més remei que fer-ho amb variable global.

existsUser("rfesrmizo")
console.log("rfesrmizo "+existeixUsuari); //TEMP
existsUser("dfuertes")
console.log("dfuertes "+existeixUsuari); //TEMP

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
        existeixUsuari = true;
        console.log("existeix? "+userName+" "+existeixUsuari);
    });
    console.log("existeix? (fora) "+userName+" "+existeixUsuari);
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
    //comprova si l'usuari existeix. Retorna true o false.

}

function signInCheck(){
    //comprova si l'usuari existeix. Retorna true o false amb variable global.
}

//ALTRES FUNCIONS AUXILIARS

function consola(dades){ //funció per mostrar a la consola el contingut de l'array que li passem. Ho fem servir per debugar fàcilment.
    dades.forEach(function myFunction(item, index) {
        console.log('Retrieved ', "index[" + index + "]: " + item + "<br>");
      });
    
}
