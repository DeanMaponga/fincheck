from django.http import HttpResponseForbidden

class APIKeyMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        authorization_header = request.headers.get('Authorization')
        api_key = None
        if authorization_header:
            try:
                _, api_key = authorization_header.split('Bearer ')
            except ValueError:
                pass

        if not api_key or not self.verify_api_key(api_key):
            return HttpResponseForbidden('Invalid API key.')

        response = self.get_response(request)
        return response

    def verify_api_key(self, api_key):
        return api_key == 'testKey'