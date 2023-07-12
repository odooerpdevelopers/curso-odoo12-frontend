# -*- coding: utf-8 -*-
# (c) 2020 Juan Carlos Montoya  <jcmontoya@praxya.es>
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).*-

from odoo import fields, models


class AccountInvoice(models.Model):
    _inherit = 'account.invoice'

    manipulador = fields.Char(string='Manipulador')
