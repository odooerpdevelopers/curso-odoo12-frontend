odoo.define('atz_pos', function (require) {
    console.log("ATZ pos loaded");
    var PosModel = require('point_of_sale.models');
    var screens = require('point_of_sale.screens');
    var PaymentScreenWidget = screens.PaymentScreenWidget;
    var ClientListScreenWidget = screens.ClientListScreenWidget;

    PosModel.load_fields("res.partner", ['use_credit', 'caducidad']);
    PosModel.load_fields("product.product", ['is_fitosanitario', 'reg_num']);
    PosModel.load_fields("account.journal", ['use_credit', 'name']);

    var OrderSuper = PosModel.Order.prototype;
    PosModel.Order = PosModel.Order.extend({
        export_as_JSON: function () {
            self = this;
            var res = OrderSuper.export_as_JSON.apply(this, arguments);
            if (self.manipulador !== undefined) {
                res.manipulador = self.manipulador;
            }
            console.log(self);
            console.log(res);
            return res;
        },
    });


    ClientListScreenWidget.include({
        save_changes: function () {
            var self = this;
            this._super();
            console.log("save_changes method");

            var texto = self.$("#input_manipulador").val()
            var order = self.pos.get_order();
            order.manipulador = texto;
            console.log(order);

        },

        show: function (){
            var self = this;
            this._super();
            console.log("show method");
            var order = self.pos.get_order();
            if (order.manipulador !== undefined){
                self.$("#input_manipulador").val(order.manipulador)
            }
            console.log(order);
        },
    });


    PaymentScreenWidget.include({
        show: function () {
            var self = this;

            let has_product_fito = this.check_has_fitos();
            if (has_product_fito === true) {
                console.log("Hay productos fitos, necesario crear factura ...");
                this.click_invoice();

            }
            this._super();
        },
        click_paymentmethods: function (id) {
            var self = this;
            this._super(id);
            var res = this.check_has_credit_payment_method()
            if (res === true) {
                this.click_invoice();
            }


        },

        validate_order: function (options) {
            var order = this.pos.get_order();
            if (this.check_has_credit_payment_method()
                || this.check_has_fitos()) {
                console.log(order.is_to_invoice(), " to invoice");
                if (order.is_to_invoice() === false) {
                    this.gui.show_popup('error', {
                        'title': 'Invalid Order',
                        'body': 'Este pedido requiere Factura, por favor seleccione un cliente y modo Factura',
                    });
                    return;
                }

            }
            return this._super(options);
        },

        check_has_credit_payment_method: function () {
            var has_credit_payment = false;
            var order = this.pos.get_order();
            var payment_lines = this.pos.get_order().get_paymentlines();
            for (var i = 0; i < payment_lines.length; i++) {

                var cashregister = payment_lines[i].cashregister;
                if (cashregister) {
                    if (cashregister.journal.use_credit === true) {
                        has_credit_payment = true;
                    }
                }
                console.log(cashregister, " check_has_credit_payment_method ");
                break;
            }

            return has_credit_payment;

        },
        check_has_fitos: function () {
            var order = this.pos.get_order();
            var olines = order.get_orderlines();
            var has_product_fito = false;
            for (var i = 0; i < olines.length; i++) {
                var product = olines[i].product
                if (product.is_fitosanitario === true || product.reg_num) {
                    has_product_fito = true;
                    break;
                }
            }
            return has_product_fito;
        },
    });
});