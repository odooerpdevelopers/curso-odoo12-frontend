# -*- coding: utf-8 -*-
# (c) 2020 Diego Gil  <dgil@praxya.es>
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).*-
{
    'name': "Atzeneta - ALM-Cambios en ficha producto",

    'summary': """ 
    Añade varios campos en la ficha de producto.
        """,

    'description': """   
    """,

    'author': "Praxya " "Diego Gil <dgil@praxya.es>",
    'website': "http://www.praxya.com",

    'category': 'Product',
    'version': '0.1',

    'depends': ['product'],

    # always loaded
    'data': [        
        'views/product_template_form_view.xml',
    ],
}
