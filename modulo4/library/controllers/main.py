# -*- coding: utf-8 -*-

import logging

logger = logging.getLogger(__name__)

from odoo import http
from odoo.http import request


class BookData(http.Controller):
    @http.route(['/library/data'], type='json', auth='user')
    def get_data(self, **kw):
        logger.info(" ********* enviando datos libros .... ************  ")
        books = request.env['library.book'].sudo().search_read(
            [],
            ['id', 'name'])

        return {'books': books}
