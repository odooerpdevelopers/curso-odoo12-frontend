from odoo import fields, models


class Product(models.Model):
    _inherit = "product.template"

    description_2 = fields.Html(string="Descripcion Extendida")
