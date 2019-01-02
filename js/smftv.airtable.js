var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyL3uol5niAvCvWP'}).base('apps61lsWyWr8NNur');

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
            console.log('Retrieved ', record.get('Nom recepta'));

            var $receptaInfo = $('<div>');
            $receptaInfo.attr('class', "test");
            $receptaInfo.attr('id-recepta', record.getId());
            $receptaInfo.append($('<h3>').text(record.get("Nom recepta")));
           // $receptaInfo.append($('<img src="'+record.get("Fotos")+'">'));
            //$receptaInfo.append($('<img>').attr('src',record.get('Fotos')));
            $(capa).append($receptaInfo);
        });

        fetchNextPage();
    }, function done(error) {
        console.log(error);
    });
};

var loadStepsRecepta = function(idRecepta){

};
