var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyL3uol5niAvCvWP'}).base('apps61lsWyWr8NNur');

var loggedUser="recXIH2KiEu6lOui1";  //veure com fer-ho dinàmic

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

    base(taula).select({
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
            consola([id,nom_recepta,entradeta,foto,fav]);

            //MAQUETACIÓ
            var $receptaInfo = $('<div>');
            $receptaInfo.attr('class', "test");
            $receptaInfo.attr('id-recepta', id);
            $receptaInfo.append($('<h3>').text(nom_recepta));
    
            $(capa).append($receptaInfo);
        });

        fetchNextPage();
    }, function done(error) {
        console.log(error);
    });
};


function isUserFav(favedUsers){
    isFav = favedUsers.indexOf(loggedUser); //si el troba, retorna la posició a l'array (0 la primera)
    return isFav>=0;
}

/** PENDENT
function existsUser(userName){ //no sé si és la millor manera...
    var exists = false;

    base('Users').select({
        // Selecting the first 3 records in Grid view:
        maxRecords: 1,
        filterByFormula: "FIND(LOWER(\""+userName+"\"),LOWER({usuari}))"
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.
        records.forEach(function(record) {
            exists = true;
            console.log("existeix")
        });
        fetchNextPage();
    
    }, function done(err) {
        if (err) { console.error(err); return; }
    });
    
    return exists;
}
*/

function consola(dades){ //funció per mostrar a la consola el contingut de l'array que li passem. Ho fem servir per debugar fàcilment.
    dades.forEach(function myFunction(item, index) {
        console.log('Retrieved ', "index[" + index + "]: " + item + "<br>");
      })
    
}


/*
- funcions:
* OK loadReceptes amb fotos
* OK isFav
* getRecepta
* cerca
* blog
* getAvatars
* sign in
* sign up
* existsUser
*/