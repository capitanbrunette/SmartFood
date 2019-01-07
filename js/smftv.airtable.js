/*var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyL3uol5niAvCvWP'}).base('apps61lsWyWr8NNur');
*/

const Airtable = require('airtable');
Airtable.configure({
    apiKey: 'keyNb4ZbKPKQ59R9K'
});
const base = Airtable.base('apps61lsWyWr8NNur');

var loggedUser="recXIH2KiEu6lOui1";  //veure com fer-ho dinàmic //TEMP

//console.log("rfexcrmizo "+existsUser("rfexcrmizo")); //TEMP
//console.log("dfuertes "+existsUser("dfuertes")); //TEMP

getRecepta("recZyEyBJMkrgWo3V"); //TEMP

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
    
    var t = base(taula);
	var first = 1;
    
    t.select({
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

function getRecepta(idRecepta){
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
        var visites = record.get("Visites"); //TODO: visites++
        var created_time = record.get("Creat");
        var last_visit = record.get("Última consulta");
        var featured = record.get("Featured");
        var featuredBy = record.get("FavoritedBy");

        var steps = record.get("Steps");

        getSteps(nom_recepta);


        //consola([idRecepta,nom_recepta,comensals,temps_coccio,temps,temps_preparacio,entradeta,categoria,visites,created_time,last_visit,featured,featuredBy]);
        
        //MAQUETACIÓ AQUÍ
    });
}

function getSteps(nom_recepta){
    var s = base("Steps");
    var steps = [];
    s.select({
        sort: [{field: "Ordre", direction: "asc"}],
        filterByFormula: "{Recepta} = '"+nom_recepta+"'"
    }).firstPage(function(err, records) {
        if (err) { console.error(err); return; }
        records.forEach(function(record) {
            steps.push(record.get('Text'));
            //console.log('Retrieved', record.get('Text'));
        });
        consola(steps);
        //return steps;
    });
    consola(steps);
}


function isUserFav(favedUsers){
    var isFav = favedUsers.indexOf(loggedUser); //si el troba, retorna la posició a l'array (0 la primera)
    return isFav>=0;
}

function existsUser(userName){ //no sé si és la millor manera... (ENCARA NO FUNCIONA)
    var u = base('Users');
    var num_records = u.select({
        maxRecords: 1,
        filterByFormula: "FIND(LOWER(\""+userName+"\"),LOWER({usuari}))"
    }).firstPage((err, records) => {
        if(err){
            console.error(err);
            return;
        }
        console.log("num records (dins): "+records.length);
        return records.length;
    });

    console.log("num records (fora): "+num_records);
    return num_records == 0;
}

function consola(dades){ //funció per mostrar a la consola el contingut de l'array que li passem. Ho fem servir per debugar fàcilment.
    dades.forEach(function myFunction(item, index) {
        console.log('Retrieved ', "index[" + index + "]: " + item + "<br>");
      });
    
}


/*
- funcions:
* OK loadReceptes amb fotos
* OK isFav
* (COMENÇAT) getRecepta
* cerca
* blog
* getAvatars
* sign in 
* sign up
* (COMENÇAT) existsUser
*/