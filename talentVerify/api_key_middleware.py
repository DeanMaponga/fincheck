from django.http import HttpResponseForbidden

class APIKeyMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        api_key = request.META.get('HTTP_API_KEY')
        print(request.META.keys())
        print(api_key)
        if not api_key or not self.verify_api_key(api_key):
            return HttpResponseForbidden('Invalid API key.')

        response = self.get_response(request)
        return response

    def verify_api_key(self, api_key):
        print(api_key)
        return api_key == 'testKey'