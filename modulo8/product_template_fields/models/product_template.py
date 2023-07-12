# -*- coding: utf-8 -*-
# (c) 2020 Diego Gil  <dgil@praxya.es>
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).*-

from odoo import api, fields, models


class ProductTemplate(models.Model):
    _inherit = "product.template"
    
    is_fitosanitario = fields.Boolean(string='Es FitoSanitario')
    reg_num = fields.Char(string='Número registro')
    fabricante = fields.Char(string='Fabricante')
    formulacion = fields.Char(string='Formulación')
    baja = fields.Boolean(string='Baja')
    fecha_baja = fields.Date(string='Fecha baja',default=fields.Date.context_today)
