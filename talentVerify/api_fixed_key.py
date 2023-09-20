from rest_framework.authentication import TokenAuthentication
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed

class APIKeyAuthentication(BaseAuthentication):
    def authenticate(self, request):
        api_key = request.META.get('HTTP_API_KEY')
        if api_key != 'testKey':
            raise AuthenticationFailed('Invalid API Key.')
        return None, None

class FixedTokenAuthentication(TokenAuthentication):
    def authenticate_credentials(self, key):
        print(key)
        if key == 'testKey':
            return None, None
        return super().authenticate_credentials(key)