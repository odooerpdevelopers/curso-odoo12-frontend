odoo.define("library.modulo4", function (require) {

    console.log("Fichero js library clases cargado");
    var core = require("web.core");
    var rpc = require("web.rpc");


    Library = core.Class.extend({
        init: function () {
            this.books = []
            this.name = ""
            this.id = 0
        },
    });


    var libr = new Library()

    console.log(libr.name)

});
