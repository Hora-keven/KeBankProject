# middleware.py

from django.core.cache import cache
from django.http import HttpResponseForbidden

class RequestLimitMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        client_ip = self.get_client_ip(request)
        cache_key = f'request_limit:{client_ip}'

        request_count = cache.get(cache_key, 0)

        request_limit = 10

        if request_count >= request_limit:
            return HttpResponseForbidden("Limite de requisições atingido. Tente novamente mais tarde.")

       
        cache.set(cache_key, request_count + 1, 60)

        response = self.get_response(request)
        return response

    def get_client_ip(self, request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip
