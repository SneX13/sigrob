import logging
from typing import Callable

from django import http

log = logging.getLogger("django")


def log_response(http_method: Callable) -> Callable:
    def wrapped_http_method(request: http.HttpRequest) -> http.HttpResponse:
        response = http_method(request)
        log.info(response)
        return response

    return wrapped_http_method
