# -*- coding: utf-8 -*-
from odoo import http
from odoo.http import request


class GoogleAds(http.Controller):

    @http.route(['/ads.txt'], type='http', auth='public')
    def ads_txt(self, **kwargs):
        param_google = request.env["ir.config_parameter"].get_param(
            "google.ads.txt"
        )

        stop = True

        return request.render(
            "ejercicio_1.ads_txt",
            {'param1': param_google},
            mimetype="text/plain"
        )
