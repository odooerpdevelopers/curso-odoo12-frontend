odoo.define("library.Book", function (require) {
    var rpc = require("web.rpc");
    console.log("Fichero js library cargado");

    var cargar_registro = function (model, method, fields) {
        var ok = $.Deferred()
        rpc.query({
            model: model,
            method: method,
            fields: fields,
        }).then(function (books) {
            ok.resolve(books);
        });

        return ok.promise()
    };

    cargar_registro(
        "library.book",
        "search_read",
        ['id', 'name']).then(function (books) {
            console.log(books);

    });

});
