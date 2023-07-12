# -*- coding: utf-8 -*-
# (c) 2020 Juan Carlos Montoya  <jcmontoya@praxya.es>
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).*-

from odoo import api, fields, models


class PosOrder(models.Model):
    _inherit = "pos.order"

    manipulador = fields.Char(string="Manipulador")

    @api.model
    def _order_fields(self, ui_order):
        res = super(PosOrder, self)._order_fields(ui_order)
        manipulador = ui_order.get("manipulador", False)
        if manipulador:
            res.update({'manipulador': manipulador})
        return res

    def _create_invoice(self):
        new_invoice = super(PosOrder, self)._create_invoice()
        statement = self.statement_ids.filtered(lambda x: x.journal_id.use_credit)
        if statement:
            domain = [('fixed_journal_id', '=', statement[0].journal_id.id)]
            payment_mode = self.env["account.payment.mode"].search(domain)
            if payment_mode:
                new_invoice.write({'payment_mode_id': payment_mode.id})

        return new_invoice

    def _prepare_invoice(self):
        res = super(PosOrder, self)._prepare_invoice()
        if self.manipulador:
            res.update({'manipulador': self.manipulador})
        return res
