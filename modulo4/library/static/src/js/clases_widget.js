odoo.define("library.modulo4", function (require) {

    var Widget = require("web.Widget");
    //var rpc = require("web.rpc");
    var widgetRegistry = require('web.widget_registry');


    Library = Widget.extend({
        template: 'library.books',
        xmlDependencies: ['/library/static/src/xml/library.xml'],

        init: function (parent) {
            this._super.apply(this, arguments);
            this.books = []
            console.log("init widget ...")
        },

        willStart: function () {
            var def1 = this._super.apply(this, arguments)
            var def2 = this._load_data()
            //return $.when(def1, def2);
            return Promise.all([def1, def2]);
        },

        /**
         * @override
         */
        start: function () {
            var self = this;
            console.log("start widget ...");
            this.$el.on('click', function (evt) {
                // send notification
                // self.displayNotification({
                //     title: "Curso Odoo 13 Frontend",
                //     message: "Hello from a Widget!",
                //     type: 'info',
                //     sticky: true,
                // });
                // send action url
                return self.do_action({
                    type: 'ir.actions.act_url',
                    url: "/shop/category/cursos-1",
                });
            })
            return this._super.apply(this, arguments)

        },


        _load_data: function () {
            var self = this;
            console.log("load data widget begin method...");

            return self._rpc({
                route: '/library/data',
                // model: "library.book",
                // method: "dame_dato",
                // fields: ['id', 'name']
            }).then(function (books) {
                modelo = self
                self.books = books
                console.log(books, " zzzzzzzzzzzzzzzzzzzzzzzzzzz")
            });
        },
    });

    widgetRegistry.add('book_widget', Library);

    new Library()

    return Library;

});


