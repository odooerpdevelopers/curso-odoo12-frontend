# -*- coding: utf-8 -*-

from odoo import api, fields, models


class ResPartner(models.Model):
    _inherit ='res.partner'    
    
    carne = fields.Boolean(
        string='Posee carné Fitosanitario',
    )
    
    caducidad = fields.Date(
        string='Fecha de caducidad del carné fitosanitario',
    )

    
    nacimiento = fields.Date(
        string=' Fecha de nacimiento',
    )

    
    
    

    
    


    