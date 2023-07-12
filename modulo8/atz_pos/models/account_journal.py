# -*- coding: utf-8 -*-
# (c) 2020 Juan Carlos Montoya  <jcmontoya@praxya.es>
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).*-

from odoo import fields, models


class AccountJournal(models.Model):
    _inherit = "account.journal"

    use_credit = fields.Boolean(string="Use as credit")

