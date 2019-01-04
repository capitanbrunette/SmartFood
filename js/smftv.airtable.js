/*var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyL3uol5niAvCvWP'}).base('apps61lsWyWr8NNur');
*/

const Airtable = require('airtable');
Airtable.configure({
    apiKey: 'keyNb4ZbKPKQ59R9K'
});
const base = Airtable.base('apps61lsWyWr8NNur');

var loggedUser="recXIH2KiEu6lOui1";  //veure com fer-ho dinàmic

console.log("rfexcrmizo "+existsUser("rfexcrmizo"));
console.log("dfuertes "+existsUser("dfuertes"));

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
    var isFav = favedUsers.indexOf(loggedUser); //si el troba, retorna la posició a l'array (0 la primera)
    return isFav>=0;
}

function existsUser(userName){ //no sé si és la millor manera...
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
* getRecepta
* cerca
* blog
* getAvatars
* sign in
* sign up
* existsUser
*/